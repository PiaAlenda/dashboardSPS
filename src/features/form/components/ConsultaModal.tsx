import React, { useState } from 'react';
import { Search, Hash, Check, AlertCircle } from 'lucide-react';
import { CustomInput } from '../../../components/ui/CustomInput';
import { ActionButton } from '../../../components/ui/ActionButton';

interface ConsultaModalProps {
    isOpen: boolean;
    onClose: () => void;
}
// ... (imports permanecen igual)

const ConsultaModal: React.FC<ConsultaModalProps> = ({ isOpen, onClose }) => {
    const [dni, setDni] = useState('');
    const [tramite, setTramite] = useState('');
    const [error, setError] = useState<{ field: string; message: string } | null>(null);

    if (!isOpen) return null;

    const handleNumberChange = (value: string, limit: number, setter: (val: string) => void) => {
        const onlyNums = value.replace(/[^0-9]/g, '');
        if (onlyNums.length <= limit) {
            setter(onlyNums);
            if (error) setError(null);
        }
    };

    const handleConsultar = () => {
        if (dni.length < 7) {
            setError({ field: 'dni', message: 'DNI inválido (mínimo 7 números)' });
            return;
        }
        if (tramite.length !== 11) {
            setError({ field: 'tramite', message: 'El trámite debe tener 11 números' });
            return;
        }
        alert('Buscando estado...');
    };

    return (
        <div className="modal-bg fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}>
            <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in border border-slate-100">
                
                {/* Header idéntico al anterior */}
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

                <div className="p-10 space-y-10">
                    <div className="text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Validación de Identidad</p>
                    </div>

                    <div className="space-y-8">
                        {/* Campo DNI */}
                        <div className="relative">
                            <CustomInput
                                label="DNI"
                                placeholder=" " // IMPORTANTE: Un espacio para activar el efecto flotante
                                icon={<Hash size={16} />}
                                value={dni}
                                onChange={(e) => handleNumberChange(e.target.value, 8, setDni)}
                                // Pasamos el estado de error al componente
                                error={error?.field === 'dni'} 
                                className={error?.field === 'dni' ? 'border-red-500' : ''}
                            />
                            {error?.field === 'dni' && (
                                <div className="flex items-center gap-1 mt-1.5 text-red-500 absolute">
                                    <AlertCircle size={12} strokeWidth={3} />
                                    <span className="text-[10px] font-black uppercase tracking-wider">{error.message}</span>
                                </div>
                            )}
                        </div>

                        {/* Campo Trámite */}
                        <div className="relative">
                            <CustomInput
                                label="N° de trámite del DNI"
                                placeholder=" " 
                                icon={<Hash size={16} />}
                                value={tramite}
                                onChange={(e) => handleNumberChange(e.target.value, 11, setTramite)}
                                error={error?.field === 'tramite'}
                                className={error?.field === 'tramite' ? 'border-red-500' : ''}
                            />
                            {error?.field === 'tramite' && (
                                <div className="flex items-center gap-1 mt-1.5 text-red-500 absolute">
                                    <AlertCircle size={12} strokeWidth={3} />
                                    <span className="text-[10px] font-black uppercase tracking-wider">{error.message}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <ActionButton
                        onClick={handleConsultar}
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