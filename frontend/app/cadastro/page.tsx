"use client";

import { Button } from "@/components/Button";
import { Building, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Cadastro() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="mb-6 flex justify-center w-full">
                {/* Logo */}
                <img src="/logo.png" alt="Logo" className="w-80 h-auto mx-auto" />
            </div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800" />
            {/* Cadastro de Pessoa Juridica (CNPJ) */}
            <Button
                onClick={() => router.push("/cadastro/cnpj")}
                className="w-64 h-40 bg-gradient-to-r from-blue-500 to-blue-600text-white rounded-xl shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition duration-300"
            >
                <Building size={48} className="mb-4" />
                <span className="text-lg font-medium">Cliente Pessoa Jurídica (CNPJ)</span>
            </Button>

            {/* Cadastro de Pessoa Fisica (CPF) */}
            <Button
                onClick={() => router.push("/cadastro/cpf")}
                className="w-64 h-40 bg-gradient-to-r from-blue-500 to-blue-600text-white rounded-xl shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition duration-300"
            >
                <Building size={48} className="mb-4" />
                <span className="text-lg font-medium">Cliente Pessoa Física (CPF)</span>
            </Button>
        </div>
    )
}