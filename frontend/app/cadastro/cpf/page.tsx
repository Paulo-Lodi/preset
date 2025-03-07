"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { ArrowLeft, User, Save, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/app/services/api";

export default function CadastroCpf() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
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

        // Apply CPF mask if the field is cpf
        if (name === 'cpf') {
            const cpfValue = value.replace(/\D/g, ''); // Remove non-digits
            let formattedCpf = '';

            if (cpfValue.length <= 11) {
                // Apply CPF mask: 000.000.000-00
                formattedCpf = cpfValue
                    .replace(/^(\d{3})(\d)/, '$1.$2')
                    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
                    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');

                setFormData(prev => ({ ...prev, [name]: formattedCpf }));
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

    // Helper function to format date from API to input format (YYYY-MM-DD)
    const formatDateForInput = (dateString: string) => {
        try {
            const parts = dateString.split('/');
            if (parts.length === 3) {
                return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            }
            return dateString;
        } catch (e) {
            return dateString;
        }
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

    const consultarCPF = async (cpf: string) => {
        if (!cpf || cpf.length < 14) {
            alert("Por favor, informe um CPF válido");
            return;
        }

        setLoading(true);
        try {
            // Implement CPF consultation logic here
            // This is a placeholder for the API call
            const response = await api.get(`/consulta/cpf/${cpf.replace(/\D/g, '')}`);
            const data = response.data;

            // Update form with the data from API
            setFormData(prev => ({
                ...prev,
                nome: data.nome || "",
                // Add other fields that might come from the API
            }));

        } catch (error) {
            console.error("Erro ao consultar CPF:", error);
            alert("Erro ao consultar CPF. Verifique o número e tente novamente.");
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
                <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl">
                    <div className="flex items-center mb-4">
                        <User className="text-green-600 mr-2" size={24} />
                        <h1 className="text-xl font-bold text-gray-800">Cadastro de Pessoa Física</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* CPF Lookup Section - Destacado no topo - adjusted to match CNPJ page */}
                        <div className="mb-4 bg-green-50 p-3 rounded-lg border border-green-100">
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <Input
                                        label="CPF"
                                        name="cpf"
                                        value={formData.cpf}
                                        onChange={handleChange}
                                        placeholder="000.000.000-00"
                                        required
                                        maxLength={14}
                                    />
                                </div>
                                <Button
                                    type="button"
                                    onClick={() => consultarCPF(formData.cpf)}
                                    className="mt-[30px] bg-green-600 text-white hover:bg-green-700 h-[38px] px-3 rounded-md flex items-center justify-center"
                                    disabled={loading}
                                    title="Consultar CPF"
                                >
                                    <Search size={16} className="mr-1" />
                                    <span className="text-sm">Consultar</span>
                                </Button>
                            </div>
                            {loading && (
                                <p className="text-xs text-green-600 mt-1 animate-pulse">
                                    Consultando CPF, aguarde...
                                </p>
                            )}
                        </div>

                        {/* Layout de duas colunas - remains the same */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            {/* Coluna 1: Dados Pessoais */}
                            <div className="space-y-4">
                                <h2 className="text-md font-semibold text-gray-700 border-b pb-1">Dados Pessoais</h2>
                                
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
                                            label="Data de Nascimento"
                                            name="dataNascimento"
                                            type="date"
                                            value={formData.dataNascimento}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <Input
                                    label="Nome Completo"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    placeholder="Nome Completo"
                                    required
                                />

                                <div className="grid grid-cols-2 gap-3">
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
                                </div>

                                <div className="grid grid-cols-2 gap-3">
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
                                </div>

                                <div className="grid grid-cols-2 gap-3">
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
                                </div>

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

// Helper function to format phone numbers
const formatPhone = (phone: string | undefined) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
        return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (cleaned.length === 10) {
        return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }
    return phone;
};

// Helper function to format CEP
const formatCEP = (cep: string | undefined) => {
    if (!cep) return '';
    const cleaned = cep.replace(/\D/g, '');
    return cleaned.replace(/^(\d{5})(\d{3})$/, '$1-$2');
};