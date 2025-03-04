"use client";

import { Button } from "@/components/Button";
import { CreditCard, Box, FileText, Settings, UserPlus, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard(){
    const router = useRouter();
    
    const handleLogout = () => {
        // You might want to add any logout logic here (clearing tokens, etc.)
        router.push("/login");
    };
    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header with logo and logout button */}
            <div className="bg-white p-4 shadow-sm flex justify-between items-center">
                <div className="flex items-center">
                    <img src="/logo.png" alt="Logo" className="h-12" />
                    <h1 className="ml-4 text-xl font-semibold text-gray-800">Sistemagic Soluções</h1>
                </div>
                <Button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center"
                >
                    <LogOut size={18} className="mr-2" />
                    <span>Sair</span>
                </Button>
            </div>
            
            {/* Main content */}
            <div className="flex-grow flex flex-col items-center justify-center p-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Bem-vindo ao Sistema</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Botão para o módulo de cadastro */}
                    <Button
                        onClick={() => router.push("/cadastro")}
                        className="w-64 h-40 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition duration-300"
                    >
                        <UserPlus size={48} className="mb-4" />
                        <span className="text-lg font-medium">Cadastro</span>
                    </Button>
                    
                    {/* Botão para o módulo Financeiro */}
                    <Button
                        onClick={() => router.push("/financeiro")}
                        className="w-64 h-40 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition duration-300"
                    >
                        <CreditCard size={48} className="mb-4" />
                        <span className="text-lg font-medium">Financeiro</span>
                    </Button>

                    {/* Botão para o módulo Estoque */}
                    <Button
                        onClick={() => router.push("/estoque")}
                        className="w-64 h-40 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition duration-300"
                    >
                        <Box size={48} className="mb-4" />
                        <span className="text-lg font-medium">Estoque</span>
                    </Button>

                    {/* Botão para o módulo Cotações */}
                    <Button
                        onClick={() => router.push("/cotacoes")}
                        className="w-64 h-40 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition duration-300"
                    >
                        <FileText size={48} className="mb-4" />
                        <span className="text-lg font-medium">Cotações</span>
                    </Button>

                    {/* Botão para as configurações */}
                    <Button
                        onClick={() => router.push("/configuracoes")}
                        className="w-64 h-40 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition duration-300"
                    >
                        <Settings size={48} className="mb-4" />
                        <span className="text-lg font-medium">Configurações</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}