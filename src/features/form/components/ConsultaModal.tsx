import React, { useState } from 'react';
import { Search, Hash, Check, AlertCircle, Loader2, Clock, XCircle, FileCheck, HelpCircle } from 'lucide-react';
import { enrollmentService } from '../../../services/enrollmentService';
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
    const [loading, setLoading] = useState(false);
    const [statusResult, setStatusResult] = useState<any>(null);
    const [error, setError] = useState<{ field: string; message: string } | null>(null);

    const getStatusConfig = (status: string) => {
        const s = status?.toUpperCase() || '';
        if (s.includes('APROBADO')) return { icon: FileCheck, color: 'text-green-500', bg: 'bg-green-50', label: 'Inscripción Aprobada' };
        if (s.includes('RECHAZADO')) return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Inscripción Rechazada' };
        if (s.includes('CANCELADO')) return { icon: XCircle, color: 'text-slate-500', bg: 'bg-slate-50', label: 'Inscripción Cancelada' };
        if (s.includes('PROCESO') || s.includes('PENDIENTE')) return { icon: Clock, color: 'text-[#ff8200]', bg: 'bg-orange-50', label: 'En Proceso de Revisión' };
        return { icon: HelpCircle, color: 'text-blue-500', bg: 'bg-blue-50', label: status || 'Estado Desconocido' };
    };

    if (!isOpen) return null;

    const handleNumberChange = (value: string, limit: number, setter: (val: string) => void) => {
        const onlyNums = value.replace(/[^0-9]/g, '');
        if (onlyNums.length <= limit) {
            setter(onlyNums);
            if (error) setError(null);
        }
    };

    const handleConsultar = async () => {
        if (dni.length < 7) {
            setError({ field: 'dni', message: 'DNI inválido (mínimo 7 números)' });
            return;
        }
        if (tramite.length !== 11) {
            setError({ field: 'tramite', message: 'El trámite debe tener 11 números' });
            return;
        }

        setLoading(true);
        setStatusResult(null);
        setError(null);

        try {
            const response = await enrollmentService.getStatus(dni, tramite);
            setStatusResult(response);
        } catch (err: any) {
            console.error(err);
            setError({
                field: 'general',
                message: err.response?.data?.message || 'No se encontró una inscripción con esos datos.'
            });
        } finally {
            setLoading(false);
        }
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

                    <div className="space-y-6">
                        {error?.field === 'general' && (
                            <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-3 animate-shake">
                                <AlertCircle className="text-red-500 mt-0.5" size={18} />
                                <div>
                                    <p className="text-xs font-bold text-red-700 uppercase tracking-tight">Error de Consulta</p>
                                    <p className="text-[11px] text-red-600 font-medium leading-tight mt-0.5">{error.message}</p>
                                </div>
                            </div>
                        )}

                        {statusResult && (
                            <div className={`p-6 rounded-[24px] border border-slate-100 shadow-sm animate-fade-in ${getStatusConfig(statusResult.status).bg}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl bg-white shadow-sm ${getStatusConfig(statusResult.status).color}`}>
                                        {React.createElement(getStatusConfig(statusResult.status).icon, { size: 24 })}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Estado Actual</p>
                                        <h3 className={`text-lg font-black uppercase tracking-tight ${getStatusConfig(statusResult.status).color}`}>
                                            {getStatusConfig(statusResult.status).label}
                                        </h3>
                                    </div>
                                </div>
                                {statusResult.observation && (
                                    <div className="mt-4 pt-4 border-t border-black/5">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Observaciones</p>
                                        <p className="text-xs text-slate-600 font-medium italic">"{statusResult.observation}"</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <ActionButton
                            onClick={handleConsultar}
                            className="w-full py-5 text-sm"
                            icon={loading ? undefined : Check}
                            disabled={loading || !dni || !tramite}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 size={18} className="animate-spin" />
                                    <span>Consultando...</span>
                                </div>
                            ) : (
                                "Consultar Estado"
                            )}
                        </ActionButton>
                    </div>
                </div>

                <div className="bg-slate-50 p-6 flex justify-end border-t border-slate-100">
                    <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Volver al inicio</button>
                </div>
            </div>
        </div>
    );
};

export default ConsultaModal;