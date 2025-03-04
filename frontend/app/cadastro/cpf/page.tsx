"use client";

import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { ArrowLeft, User, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/app/services/api";

export default function CadastroCpf() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        cpf: "",
        nome: "",
        dataNascimento: "",
        rg: "",
        orgaoEmissor: "",
        telefone: "",
        celular: "",
        email: "",
        profissao: "",
        estadoCivil: "",
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        observacoes: ""
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const buscarCep = async () => {
        if (formData.cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`);
                const data = await response.json();
                
                if (!data.erro) {
                    setFormData(prev => ({
                        ...prev,
                        endereco: data.logradouro,
                        bairro: data.bairro,
                        cidade: data.localidade,
                        estado: data.uf
                    }));
                }
            } catch (error) {
                console.error("Erro ao buscar CEP:", error);
            }
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await api.post('/clientes/fisico', formData);
            alert("Cliente cadastrado com sucesso!");
            router.push("/clientes");
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            alert("Erro ao cadastrar cliente. Verifique os dados e tente novamente.");
        } finally {
            setLoading(false);
        }
    };

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
                            <li className="text-blue-600 font-medium">Pessoa Física</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Conteúdo principal */}
            <div className="flex-grow flex flex-col items-center p-6">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-5xl">
                    <div className="flex items-center mb-6">
                        <User className="text-green-600 mr-3" size={28} />
                        <h1 className="text-2xl font-bold text-gray-800">Cadastro de Pessoa Física</h1>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Dados Pessoais */}
                            <div className="col-span-2">
                                <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Dados Pessoais</h2>
                            </div>
                            
                            <div>
                                <Input
                                    label="CPF"
                                    name="cpf"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    placeholder="000.000.000-00"
                                    required
                                />
                            </div>
                            
                            <div>
                                <Input
                                    label="RG"
                                    name="rg"
                                    value={formData.rg}
                                    onChange={handleChange}
                                    placeholder="00.000.000-0"
                                />
                            </div>
                            
                            <div>
                                <Input
                                    label="Órgão Emissor"
                                    name="orgaoEmissor"
                                    value={formData.orgaoEmissor}
                                    onChange={handleChange}
                                    placeholder="SSP/UF"
                                />
                            </div>
                            
                            <div className="col-span-2 md:col-span-1">
                                <Input
                                    label="Data de Nascimento"
                                    name="dataNascimento"
                                    type="date"
                                    value={formData.dataNascimento}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            <div className="col-span-2">
                                <Input
                                    label="Nome Completo"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    placeholder="Nome Completo"
                                    required
                                />
                            </div>
                            
                            <div>
                                <Input
                                    label="Profissão"
                                    name="profissao"
                                    value={formData.profissao}
                                    onChange={handleChange}
                                    placeholder="Profissão"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Estado Civil
                                </label>
                                <select
                                    name="estadoCivil"
                                    value={formData.estadoCivil}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Selecione</option>
                                    <option value="Solteiro(a)">Solteiro(a)</option>
                                    <option value="Casado(a)">Casado(a)</option>
                                    <option value="Divorciado(a)">Divorciado(a)</option>
                                    <option value="Viúvo(a)">Viúvo(a)</option>
                                    <option value="União Estável">União Estável</option>
                                </select>
                            </div>
                            
                            {/* Contato */}
                            <div className="col-span-2 mt-4">
                                <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Contato</h2>
                            </div>
                            
                            <div>
                                <Input
                                    label="Telefone"
                                    name="telefone"
                                    value={formData.telefone}
                                    onChange={handleChange}
                                    placeholder="(00) 0000-0000"
                                />
                            </div>
                            
                            <div>
                                <Input
                                    label="Celular"
                                    name="celular"
                                    value={formData.celular}
                                    onChange={handleChange}
                                    placeholder="(00) 00000-0000"
                                    required
                                />
                            </div>
                            
                            <div className="col-span-2">
                                <Input
                                    label="E-mail"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="email@exemplo.com"
                                    required
                                />
                            </div>
                            
                            {/* Endereço */}
                            <div className="col-span-2 mt-4">
                                <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Endereço</h2>
                            </div>
                            
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
                            
                            <div className="col-span-2 md:col-span-1">
                                <Input
                                    label="Endereço"
                                    name="endereco"
                                    value={formData.endereco}
                                    onChange={handleChange}
                                    placeholder="Rua, Avenida, etc."
                                    required
                                />
                            </div>
                            
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
                            
                            {/* Informações Adicionais */}
                            <div className="col-span-2 mt-4">
                                <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Informações Adicionais</h2>
                            </div>
                            
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Observações
                                </label>
                                <textarea
                                    name="observacoes"
                                    value={formData.observacoes}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Observações adicionais"
                                ></textarea>
                            </div>
                        </div>
                        
                        <div className="mt-8 flex justify-end space-x-4">
                            <Button
                                type="button"
                                onClick={() => router.push("/cadastro")}
                                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="bg-green-600 text-white hover:bg-green-700 flex items-center"
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