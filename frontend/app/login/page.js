"use client";

import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:8000/api/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);

            window.location.href = "/dashboard";
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Credenciais Inválidas, tente novamente!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg'gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-96"
            >
                <div className="flex justify-center mb-6">
                    <img src="/logo.png" alt="Logo Sistemagic" className="w-48"/>
                </div>
                {error && (
                    <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
                        {error}
                    </div>
                )}
                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                    </label>
                    <input 
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border rounded" 
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                        Senha
                    </label>
                    <input 
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border rounded" 
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}