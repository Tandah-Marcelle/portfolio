"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed. Please try again.');
            }

            router.push('/admin');
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please connect to the backend.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center relative overflow-hidden px-4">
            {/* Decorative Blob assets */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-secondary-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>

            <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/10 w-full max-w-md shadow-2xl relative z-10 animate-fade-in">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-white tracking-tight">
                        Portfolio <span className="text-secondary-400">Backoffice</span>
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">Sign in to edit your portfolio content</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-sm p-4 rounded-xl mb-6 flex items-center space-x-3">
                        <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Username</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                                <User size={18} />
                            </span>
                            <input
                                type="text"
                                placeholder="Enter admin username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-secondary-500 transition-colors text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                                <Lock size={18} />
                            </span>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-secondary-500 transition-colors text-sm"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-500 hover:to-secondary-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-secondary-500/10 active:scale-[0.98]"
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <button
                        onClick={() => router.push('/')}
                        className="text-xs text-gray-500 hover:text-white transition-colors duration-300"
                    >
                        ← Back to Portfolio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
