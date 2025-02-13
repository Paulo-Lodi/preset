"use client";

import { CreditCard, Box, FileText, Settings } from "lucide-react";

export default function Dashboard(){
    return (
        <><h1 className="text-4x1 font-bold text-gray-800 mb-8">Bem-vindo ao Sistema - Sistemagic Soluções</h1><div className="min-h-screen bg-gray-50 flex flex-xol items-center justify-center">
            <div className="text-center mb-6 ml-10">
                {/* Logo */}
                <img src="/logo.png" alt="Logo" className="w-80 h80 mx-auto" />
            </div>
            <div className="grid grid-cols-2 gap-6">
                {/* Botão para o módulo Financeiro */}
                <button
                    onClick={() => window.location.href = "/financeiro"}
                    className="w-64 h-40 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition duration-300"
                >
                    <CreditCard size={48} className="mb-4" />
                    <span className="text-lg font-medium">Financeiro</span>
                </button>

                {/* Botão para o módulo Estoque */}
                <button
                    onClick={() => window.location.href = "/estoque"}
                    className="w-64 h-40 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition duration-300"
                >
                    <Box size={48} className="mb-4" />
                    <span className="text-lg font-medium">Estoque</span>
                </button>

                {/* Botão para o módulo Cotações */}
                <button
                    onClick={() => window.location.href = "/cotacoes"}
                    className="w-64 h-40 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition duration-300"
                >
                    <FileText size={48} className="mb-4" />
                    <span className="text-lg font-medium">Cotações</span>
                </button>

                {/* Botão para as configurações */}
                <button
                    onClick={() => window.location.href = "/configuracoes"}
                    className="w-64 h-40 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition duration-300"
                >
                    <Settings size={48} className="mb-4" />
                    <span className="text-lg font-medium">Configurações</span>
                </button>
            </div>
        </div></>
    );
}