import { CheckCircle2, Clock, X } from 'lucide-react';

export type MessageType = 'exito' | 'reclamo';

interface MessageModalProps {
    isOpen: boolean;
    type: MessageType;
    onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ isOpen, type, onClose }) => {
    if (!isOpen) return null;

    const isExito = type === 'exito';

    return (
        <div className="modal-bg fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100 relative overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Decorative background element */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 ${isExito ? 'bg-green-400' : 'bg-orange-400'}`} />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 rounded-full"
                >
                    <X size={16} />
                </button>

                <div className="mb-6 flex justify-center">
                    <div className={`p-4 rounded-full ${isExito ? 'bg-green-50 text-green-500' : 'bg-orange-50 text-orange-500'}`}>
                        {isExito ? <CheckCircle2 size={48} strokeWidth={1.5} /> : <Clock size={48} strokeWidth={1.5} />}
                    </div>
                </div>

                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-3">
                    {isExito ? 'Inscripción Exitosa' : 'Solicitud Recibida'}
                </h2>

                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 px-2">
                    {isExito
                        ? 'Su solicitud de beneficio de ración alimentaria ha sido procesada correctamente en nuestro sistema central.'
                        : 'Su consulta ha sido registrada y se encuentra actualmente en proceso de revisión por nuestro equipo administrativo.'}
                </p>

                <button
                    onClick={onClose}
                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white transition-all active:scale-[0.98] shadow-lg
                        ${isExito ? 'bg-green-500 hover:bg-green-600 shadow-green-200' : 'bg-orange-500 hover:bg-orange-600 shadow-orange-200'}`}
                >
                    Finalizar y Salir
                </button>
            </div>
        </div>
    );
};

export default MessageModal;
