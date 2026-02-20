import React from 'react';
import { FileText, Search, MessageSquare } from 'lucide-react';

interface ActionButtonsProps {
    onOpenSolicitud: () => void;
    onOpenConsulta: () => void;
    onOpenReclamo: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onOpenSolicitud, onOpenConsulta, onOpenReclamo }) => {
    return (
        <main className="container mx-auto py-16 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {/* Registrá tu tarjeta */}
                <button
                    onClick={() => alert('Registrando tarjeta...')}
                    className="flex flex-col items-center justify-center p-6 bg-[#ff8200] text-white rounded-2xl shadow-lg transition-all hover:scale-105 hover:shadow-xl group min-h-[220px]"
                >
                    <div className="bg-white p-3 rounded-lg mb-4">
                        <img src="https://boletoescolar.sanjuan.gob.ar/assets/Logo_SUBE-N9C9D.svg" alt="SUBE" className="h-8 shadow-sm" style={{ filter: 'grayscale(1) brightness(0)' }} />
                    </div>
                    <span className="font-bold text-sm uppercase text-center leading-tight tracking-tight">Registrá tu<br />tarjeta SUBE</span>
                </button>

                {/* Solicitá Boleto */}
                <button
                    onClick={onOpenSolicitud}
                    className="flex flex-col items-center justify-center p-6 bg-[#ff8200] text-white rounded-2xl shadow-lg transition-all hover:scale-105 hover:shadow-xl group min-h-[220px]"
                >
                    <div className="bg-white/20 p-4 rounded-full mb-3">
                        <FileText size={40} />
                    </div>
                    <span className="font-bold text-sm uppercase text-center leading-tight mb-2">Solicitá Boleto</span>
                    <div className="bg-white px-4 py-1 rounded-lg shadow-sm">
                        <span className="text-[#ff8200] text-[10px] font-black uppercase tracking-widest">Gratuito</span>
                    </div>
                </button>

                {/* Consultá el estado */}
                <button
                    onClick={onOpenConsulta}
                    className="flex flex-col items-center justify-center p-6 bg-[#ff8200] text-white rounded-2xl shadow-lg transition-all hover:scale-105 hover:shadow-xl group min-h-[220px]"
                >
                    <div className="bg-white/20 p-4 rounded-full mb-3">
                        <Search size={40} />
                    </div>
                    <span className="font-bold text-sm uppercase text-center leading-tight">Consultá el<br />estado del trámite</span>
                </button>

                {/* Realizá o consultá reclamo */}
                <button
                    onClick={onOpenReclamo}
                    className="flex flex-col items-center justify-center p-6 bg-[#ff8200] text-white rounded-2xl shadow-lg transition-all hover:scale-105 hover:shadow-xl group min-h-[220px]"
                >
                    <div className="bg-white/20 p-4 rounded-2xl mb-3 border border-white/40">
                        <MessageSquare size={32} />
                    </div>
                    <span className="font-bold text-sm uppercase text-center leading-tight">Realizá o consultá<br />tu reclamo</span>
                </button>
            </div>
        </main>
    );
};

export default ActionButtons;
