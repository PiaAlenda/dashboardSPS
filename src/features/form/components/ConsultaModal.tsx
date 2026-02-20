import React from 'react';
import { Search, Hash, Check } from 'lucide-react';
import { CustomInput } from '../../../components/ui/CustomInput';
import { ActionButton } from '../../../components/ui/ActionButton';

interface ConsultaModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConsultaModal: React.FC<ConsultaModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-bg fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}>
            <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in border border-slate-100">
                <div className="bg-slate-900 text-white p-6 flex justify-between items-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff8200] opacity-10 blur-3xl -mr-16 -mt-16" />
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md">
                            <Search size={20} className="text-[#ff8200]" />
                        </div>
                        <h2 className="font-black uppercase tracking-tight">Consulta de Trámite</h2>
                    </div>
                    <button onClick={onClose} className="relative z-10 text-2xl hover:text-[#ff8200] transition-colors">&times;</button>
                </div>

                <div className="p-10 space-y-6">
                    <div className="text-center space-y-2 mb-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Ingrese sus datos para verificar el estado</p>
                    </div>

                    <div className="space-y-4">
                        <CustomInput
                            label="DNI"
                            placeholder="Ingrese DNI sin puntos"
                            icon={<Hash size={16} />}
                        />
                        <CustomInput
                            label="N° de trámite del DNI"
                            placeholder="Ingrese 11 números"
                            icon={<Hash size={16} />}
                        />
                    </div>

                    <ActionButton
                        onClick={() => alert('Buscando estado...')}
                        className="w-full py-5 text-sm"
                        icon={Check}
                    >
                        Consultar Estado
                    </ActionButton>
                </div>

                <div className="bg-slate-50 p-6 flex justify-end border-t border-slate-100">
                    <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Volver al inicio</button>
                </div>
            </div>
        </div>
    );
};

export default ConsultaModal;
