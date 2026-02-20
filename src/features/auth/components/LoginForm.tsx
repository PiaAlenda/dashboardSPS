import React, { useState } from 'react';
import { User, Lock, ExternalLink } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';
import { ActionButton } from '../../../components/ui/ActionButton';

const ErrorMessage = ({ message }: { message: string }) => (
    <div className="rounded-xl bg-red-50 p-4 text-center text-xs font-bold text-red-500 border border-red-100 animate-in fade-in slide-in-from-top-2">
        {message}
    </div>
);

const FloatingInput = ({ 
    label, 
    type = "text", 
    value, 
    onChange, 
    icon 
}: { 
    label: string, 
    type?: string, 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    icon: React.ReactNode 
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const isFloating = isFocused || value.length > 0;

    return (
        <div className={`relative w-full group bg-white rounded-2xl border transition-all duration-200 
            ${isFocused ? 'border-black ring-1 ring-black shadow-md' : 'border-gray-200 shadow-sm'}`}>
            
            {/* Ícono centrado verticalmente respecto al contenedor */}
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 z-10 
                ${isFocused ? 'text-black' : 'text-gray-400'}`}>
                {icon}
            </div>

            {/* Etiqueta Flotante - Se mueve dentro del fondo blanco */}
            <label 
                className={`absolute left-11 transition-all duration-200 pointer-events-none z-10
                ${isFloating 
                    ? 'top-2 text-[10px] font-black text-gray-500 uppercase tracking-widest' 
                    : 'top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400'
                }`}
            >
                {label}
            </label>

            {/* Input con padding superior para dejar espacio a la etiqueta */}
            <input
                type={type}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full pl-11 pr-4 pt-6 pb-2 bg-transparent outline-none text-black font-bold rounded-2xl
                [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset] 
                [&:-webkit-autofill]:text-fill-black"
                placeholder=""
            />
        </div>
    );
};

export const LoginForm = () => {
    const { handleLogin, loading, error } = useLogin();
    const [formData, setFormData] = useState({ username: '', password: '' });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin(formData.username, formData.password);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {error && <ErrorMessage message={error} />}

            <div className="space-y-4">
                <FloatingInput
                    label="Usuario"
                    icon={<User size={18} />}
                    value={formData.username}
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                />

                <FloatingInput
                    label="Contraseña"
                    type="password"
                    icon={<Lock size={18} />}
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
            </div>

            <div className="pt-2">
                <ActionButton
                    type="submit"
                    disabled={loading}
                    isLoading={loading}
                    className="w-full py-4 text-sm bg-[#0f172a] hover:bg-zinc-900 text-white border-none rounded-2xl transition-all font-black shadow-xl active:scale-[0.98]"
                    icon={ExternalLink}
                >
                    {loading ? 'Verificando...' : 'Entrar al Sistema'}
                </ActionButton>
            </div>
        </form>
    );
};