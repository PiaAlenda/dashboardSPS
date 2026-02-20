import React from 'react';

export type MessageType = 'exito' | 'reclamo';

interface MessageModalProps {
    isOpen: boolean;
    type: MessageType;
    onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ isOpen, type, onClose }) => {
    if (!isOpen) return null;

    let icon = "✅";
    let iconClass = "text-green-500 text-6xl mb-4";
    let title = "¡Enviado!";
    let text = "Tu solicitud ha sido registrada correctamente. Revisá tu email.";

    if (type === 'reclamo') {
        icon = "⏳";
        iconClass = "text-orange-500 text-6xl mb-4";
        title = "En Proceso";
        text = "Tu reclamo se encuentra actualmente en proceso de revisión por nuestro equipo.";
    }

    return (
        <div className="modal-bg fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}>
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-fade-in">
                <div className={iconClass}>{icon}</div>
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-gray-600 mb-6">{text}</p>
                <button onClick={onClose} className="bg-[#2185C5] text-white px-8 py-2 rounded-full font-bold">Entendido</button>
            </div>
        </div>
    );
};

export default MessageModal;
