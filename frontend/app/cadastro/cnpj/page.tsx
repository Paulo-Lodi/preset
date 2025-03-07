"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { ArrowLeft, Building, Save, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/app/services/api";

export default function CadastroCnpj() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        cnpj: "",
        razaoSocial: "",
        nomeFantasia: "",
        inscricaoEstadual: "",
        telefone: "",
        celular: "",
        email: "",
        nomeContato: "",
        dataCadastro: new Date().toISOString().split('T')[0],
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        responsavel: "",
        observacoes: ""
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        
        // Apply CNPJ mask if the field is cnpj
        if (name === 'cnpj') {
            const cnpjValue = value.replace(/\D/g, ''); // Remove non-digits
            let formattedCnpj = '';
            
            if (cnpjValue.length <= 14) {
                // Apply CNPJ mask: 00.000.000/0000-00
                formattedCnpj = cnpjValue
                    .replace(/^(\d{2})(\d)/, '$1.$2')
                    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
                    .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
                
                setFormData(prev => ({ ...prev, [name]: formattedCnpj }));
                return;
            }
        }
        
        // Apply CEP mask if the field is cep
        if (name === 'cep') {
            const cepValue = value.replace(/\D/g, ''); // Remove non-digits
            let formattedCep = '';
            
            if (cepValue.length <= 8) {
                // Apply CEP mask: 00000-000
                formattedCep = cepValue
                    .replace(/^(\d{5})(\d)/, '$1-$2');
                
                setFormData(prev => ({ ...prev, [name]: formattedCep }));
                return;
            }
        }
        
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const buscarCep = async () => {
        const cepLimpo = formData.cep.replace(/\D/g, '');
        
        if (cepLimpo.length !== 8) {
            return; // CEP incompleto, não buscar 
        }

        setLoading(true);
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const data = await response.json();

            if (data.erro) {
                throw new Error("CEP não encontrado");
            }

            setFormData(prev => ({
                ...prev,
                endereco: data.logradouro || prev.endereco,
                bairro: data.bairro || prev.bairro,
                cidade: data.localidade || prev.cidade,
                estado: data.uf || prev.estado
            }));
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
            alert("Não foi possível encontrar o endereço para este CEP. Verifique se o CEP está correto.");
        } finally {
            setLoading(false);
        }
    };

    const consultarCNPJ = async (cnpj: string) => {
        // Remove any non-numeric characters
        const cnpjLimpo = cnpj.replace(/[^\d]/g, '');
        
        if (cnpjLimpo.length !== 14) {
            alert("CNPJ inválido");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`https://publica.cnpj.ws/cnpj/${cnpjLimpo}`);
            const data = await response.json();

            if (data.status === "ERROR") {
                throw new Error(data.message);
            }

            setFormData(prev => ({
                ...prev,
                razaoSocial: data.razao_social,
                nomeFantasia: data.estabelecimento.nome_fantasia || "",
                telefone: data.estabelecimento.ddd1 + data.estabelecimento.telefone1 || "",
                email: data.estabelecimento.email || "",
                cep: data.estabelecimento.cep || "",
                endereco: data.estabelecimento.logradouro || "",
                numero: data.estabelecimento.numero || "",
                complemento: data.estabelecimento.complemento || "",
                bairro: data.estabelecimento.bairro || "",
                cidade: data.estabelecimento.cidade.nome || "",
                estado: data.estabelecimento.estado.sigla || "",
            }));

            // Trigger CEP search if needed
            if (data.estabelecimento.cep) {
                await buscarCep();
            }

        } catch (error) {
            console.error("Erro ao consultar CNPJ:", error);
            alert("Erro ao consultar CNPJ. Verifique o número e tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    // Update the CNPJ input section to include a search button
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <div className="w-full p-4 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <img src="/logo.png" alt="Logo" className="h-12" />
                        <h1 className="ml-4 text-xl font-semibold text-gray-800">Sistema ERP</h1>
                    </div>
                    <Link href="/cadastro" className="flex items-center text-blue-600 hover:text-blue-800">
                        <ArrowLeft size={16} className="mr-1" />
                        <span>Voltar</span>
                    </Link>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="bg-gray-100 w-full py-2 px-4 border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <nav className="text-sm">
                        <ol className="list-none p-0 inline-flex">
                            <li className="flex items-center">
                                <Link href="/" className="text-gray-500 hover:text-blue-600">Dashboard</Link>
                                <span className="mx-2 text-gray-500">/</span>
                            </li>
                            <li className="flex items-center">
                                <Link href="/cadastro" className="text-gray-500 hover:text-blue-600">Cadastro</Link>
                                <span className="mx-2 text-gray-500">/</span>
                            </li>
                            <li className="text-blue-600 font-medium">Pessoa Jurídica</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Conteúdo principal */}
            <div className="flex-grow flex flex-col items-center p-6">
                <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl">
                    <div className="flex items-center mb-4">
                        <Building className="text-blue-600 mr-2" size={24} />
                        <h1 className="text-xl font-bold text-gray-800">Cadastro de Pessoa Jurídica</h1>
                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        // TODO: Implement form submission logic
                    }}>
                        {/* CNPJ Lookup Section - Destacado no topo */}
                        <div className="mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <Input
                                        label="CNPJ"
                                        name="cnpj"
                                        value={formData.cnpj}
                                        onChange={handleChange}
                                        placeholder="00.000.000/0000-00"
                                        required
                                        maxLength={18}
                                    />
                                </div>
                                <Button
                                    type="button"
                                    onClick={() => consultarCNPJ(formData.cnpj)}
                                    className="mt-[30px] bg-blue-600 text-white hover:bg-blue-700 h-[38px] px-3 rounded-md flex items-center justify-center"
                                    disabled={loading}
                                    title="Consultar CNPJ"
                                >
                                    <Search size={16} className="mr-1" />
                                    <span className="text-sm">Consultar</span>
                                </Button>
                            </div>
                            {loading && (
                                <p className="text-xs text-blue-600 mt-1 animate-pulse">
                                    Consultando CNPJ, aguarde...
                                </p>
                            )}
                        </div>

                        {/* Layout de duas colunas mais compacto */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            {/* Coluna 1: Dados da Empresa */}
                            <div className="space-y-4">
                                <h2 className="text-md font-semibold text-gray-700 border-b pb-1">Dados da Empresa</h2>
                                
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Input
                                            label="ID de Cadastro"
                                            name="id"
                                            value={formData.id}
                                            onChange={handleChange}
                                            placeholder="ID automático"
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Data de Cadastro"
                                            name="dataCadastro"
                                            type="date"
                                            value={formData.dataCadastro}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <Input
                                    label="Inscrição Estadual"
                                    name="inscricaoEstadual"
                                    value={formData.inscricaoEstadual}
                                    onChange={handleChange}
                                    placeholder="Inscrição Estadual"
                                />

                                <Input
                                    label="Razão Social"
                                    name="razaoSocial"
                                    value={formData.razaoSocial}
                                    onChange={handleChange}
                                    placeholder="Razão Social"
                                    required
                                />

                                <Input
                                    label="Nome Fantasia"
                                    name="nomeFantasia"
                                    value={formData.nomeFantasia}
                                    onChange={handleChange}
                                    placeholder="Nome Fantasia"
                                />

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Input
                                            label="Telefone Fixo"
                                            name="telefone"
                                            value={formData.telefone}
                                            onChange={handleChange}
                                            placeholder="(00) 0000-0000"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Telefone Celular"
                                            name="celular"
                                            value={formData.celular}
                                            onChange={handleChange}
                                            placeholder="(00) 00000-0000"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Input
                                            label="E-mail"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="email@empresa.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Nome de Contato"
                                            name="nomeContato"
                                            value={formData.nomeContato}
                                            onChange={handleChange}
                                            placeholder="Nome do contato"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Coluna 2: Endereço e Informações Adicionais */}
                            <div className="space-y-4">
                                <h2 className="text-md font-semibold text-gray-700 border-b pb-1">Endereço</h2>
                                
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Input
                                            label="CEP"
                                            name="cep"
                                            value={formData.cep}
                                            onChange={handleChange}
                                            onBlur={buscarCep}
                                            placeholder="00000-000"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Estado"
                                            name="estado"
                                            value={formData.estado}
                                            onChange={handleChange}
                                            placeholder="Estado"
                                            required
                                        />
                                    </div>
                                </div>

                                <Input
                                    label="Endereço"
                                    name="endereco"
                                    value={formData.endereco}
                                    onChange={handleChange}
                                    placeholder="Rua, Avenida, etc."
                                    required
                                />

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Input
                                            label="Número"
                                            name="numero"
                                            value={formData.numero}
                                            onChange={handleChange}
                                            placeholder="Número"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Complemento"
                                            name="complemento"
                                            value={formData.complemento}
                                            onChange={handleChange}
                                            placeholder="Complemento"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Input
                                            label="Bairro"
                                            name="bairro"
                                            value={formData.bairro}
                                            onChange={handleChange}
                                            placeholder="Bairro"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Cidade"
                                            name="cidade"
                                            value={formData.cidade}
                                            onChange={handleChange}
                                            placeholder="Cidade"
                                            required
                                        />
                                    </div>
                                </div>

                                <h2 className="text-md font-semibold mt-2 text-gray-700 border-b pb-1">Informações Adicionais</h2>
                                
                                <Input
                                    label="Nome do Responsável"
                                    name="responsavel"
                                    value={formData.responsavel}
                                    onChange={handleChange}
                                    placeholder="Nome do Responsável"
                                    required
                                />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Observações
                                    </label>
                                    <textarea
                                        name="observacoes"
                                        value={formData.observacoes}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Observações adicionais"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-4">
                            <Button
                                type="button"
                                onClick={() => router.push("/cadastro")}
                                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-600 text-white hover:bg-blue-700 flex items-center"
                                disabled={loading}
                            >
                                {loading ? "Salvando..." : (
                                    <>
                                        <Save size={18} className="mr-2" />
                                        Salvar Cadastro
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}