import React from 'react';
import type { InputHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: React.ReactNode;
    error?: boolean;
    errorText?: string;
}

export const CustomInput = ({ label, icon, className = '', error, errorText, ...props }: InputProps) => {
    return (
        <div className={`${className} flex flex-col relative`}>
            <div className="relative group">
                {icon && (
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors z-20 
                        ${error ? 'text-red-500' : 'text-slate-400'} 
                        group-focus-within:text-[#ff8200]`}>
                        {icon}
                    </div>
                )}

                <input
                    {...props}
                    placeholder=" "
                    className={`peer w-full bg-slate-50 border-2 text-slate-900 text-sm rounded-2xl block 
                        ${icon ? 'pl-11' : 'pl-4'} pr-4 pt-6 pb-2 outline-none transition-all 
                        font-medium /* <--- Cambiado de font-bold a font-medium para que sea más fina */
                        ${error 
                            ? 'border-red-500 bg-red-50/30' 
                            : 'border-slate-100 focus:border-[#ff8200]'} 
                        placeholder-transparent focus:ring-0`} 
                />

                <label className={`absolute transition-all duration-200 pointer-events-none uppercase tracking-widest
                    ${icon ? 'left-11' : 'left-4'}
                    /* Label arriba */
                    top-2 text-[10px] font-bold /* <--- Cambiado de font-black a font-bold */
                    ${error ? 'text-red-500' : 'text-[#ff8200]'}
                    
                    /* Label como placeholder (al centro) */
                    peer-placeholder-shown:top-[18px] 
                    peer-placeholder-shown:text-sm 
                    peer-placeholder-shown:font-medium /* <--- Placeholder más fino también */
                    peer-placeholder-shown:text-slate-400
                    
                    /* Label al hacer foco */
                    peer-focus:top-2 
                    peer-focus:text-[10px] 
                    ${error ? 'peer-focus:text-red-500' : 'peer-focus:text-[#ff8200]'}`}>
                    {label}
                </label>
            </div>

            {error && errorText && (
                <div className="flex items-center gap-1 mt-1 ml-2 text-red-500 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={10} strokeWidth={3} />
                    <span className="text-[9px] font-bold uppercase tracking-wider">
                        {errorText}
                    </span>
                </div>
            )}
        </div>
    );
};