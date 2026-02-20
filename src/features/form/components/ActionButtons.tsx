import React from 'react';
import { FileText, Search } from 'lucide-react';

interface ActionButtonsProps {
    onOpenSolicitud: () => void;
    onOpenConsulta: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onOpenSolicitud, onOpenConsulta }) => {
    return (
        <main className="container mx-auto py-8 px-4">
            <div className="flex flex-wrap justify-center items-center gap-6 max-w-6xl mx-auto">
                <button
                    onClick={onOpenSolicitud}
                    className="flex flex-col items-center justify-center p-6 bg-[#ff8200] text-white rounded-[2.5rem] shadow-lg transition-all hover:scale-105 hover:shadow-xl group min-h-[220px] w-full sm:w-[260px]"
                >
                    <div className="bg-white/20 p-4 rounded-full mb-3 group-hover:bg-white/30 transition-colors">
                        <FileText size={40} />
                    </div>
                    <span className="font-black text-sm uppercase text-center leading-tight mb-2 tracking-tight">Inscribirse </span>
                    <div className="bg-white px-4 py-1 rounded-lg shadow-sm group-hover:bg-slate-50">
                        <span className="text-[#ff8200] text-[10px] font-black uppercase tracking-widest">Gratuito</span>
                    </div>
                </button>

                <button
                    onClick={onOpenConsulta}
                    className="flex flex-col items-center justify-center p-6 bg-[#ff8200] text-white rounded-[2.5rem] shadow-lg transition-all hover:scale-105 hover:shadow-xl group min-h-[220px] w-full sm:w-[260px]"
                >
                    <div className="bg-white/20 p-4 rounded-full mb-3 group-hover:bg-white/30 transition-colors">
                        <Search size={40} />
                    </div>
                    <span className="font-black text-sm uppercase text-center leading-tight tracking-tight">Consultá el<br />estado del trámite</span>
                </button>

            </div>
        </main>
    );
};

export default ActionButtons;