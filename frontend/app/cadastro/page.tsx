"use client";

import { Button } from "@/components/Button";
import { Building, User, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Cadastro() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <div className="w-full p-4 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <img src="/logo.png" alt="Logo" className="h-12" />
                        <h1 className="ml-4 text-xl font-semibold text-gray-800">Sistema ERP</h1>
                    </div>
                    <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800">
                        <Home size={16} className="mr-1" />
                        <span>Dashboard</span>
                    </Link>
                </div>
            </div>
            
            {/* Breadcrumb */}
            <div className="bg-gray-100 w-full py-2 px-4 border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <nav className="text-sm">
                        <ol className="list-none p-0 inline-flex">
                            <li className="flex items-center">
                                <Link href="/dashboard" className="text-gray-500 hover:text-blue-600">Dashboard</Link>
                                <span className="mx-2 text-gray-500">/</span>
                            </li>
                            <li className="text-blue-600 font-medium">Cadastro</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Conteúdo principal */}
            <div className="flex-grow flex flex-col items-center justify-center p-6">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl">
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Escolha o Tipo de Cadastro</h1>
                    <p className="text-gray-600 mb-8 text-center">Selecione o tipo de cliente que deseja cadastrar no sistema</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Cadastro de Pessoa Juridica (CNPJ) */}
                        <Button
                            onClick={() => router.push("/cadastro/cnpj")}
                            className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition duration-300"
                        >
                            <Building size={48} className="mb-4" />
                            <span className="text-lg font-medium">Cliente Pessoa Jurídica</span>
                            <span className="text-sm opacity-80 mt-1">(CNPJ)</span>
                        </Button>

                        {/* Cadastro de Pessoa Fisica (CPF) */}
                        <Button
                            onClick={() => router.push("/cadastro/cpf")}
                            className="h-48 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition duration-300"
                        >
                            <User size={48} className="mb-4" />
                            <span className="text-lg font-medium">Cliente Pessoa Física</span>
                            <span className="text-sm opacity-80 mt-1">(CPF)</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}