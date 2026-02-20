import React, { useState } from 'react';
import Header from '../features/form/components/Header';
import Hero from '../features/form/components/Hero';
import ActionButtons from '../features/form/components/ActionButtons';
import Footer from '../features/form/components/Footer';
import SolicitudModal from '../features/form/components/SolicitudModal';
import ConsultaModal from '../features/form/components/ConsultaModal';
import MessageModal from '../features/form/components/MessageModal';
import type { MessageType } from '../features/form/components/MessageModal';

const FormPage: React.FC = () => {
    const [modals, setModals] = useState({
        solicitud: false,
        consulta: false,
        message: false
    });
    const [messageType, setMessageType] = useState<MessageType>('exito');

    const openModal = (name: keyof typeof modals) => {
        setModals(prev => ({ ...prev, [name]: true }));
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (name: keyof typeof modals) => {
        setModals(prev => ({ ...prev, [name]: false }));
        document.body.style.overflow = 'auto';
    };

    const handleSolicitudFinish = () => {
        closeModal('solicitud');
        setMessageType('exito');
        openModal('message');
    };

    return (
        <div className="bg-[#f4f7f9] font-sans min-h-screen">
            <Header />
            <Hero />
            <ActionButtons
                onOpenSolicitud={() => openModal('solicitud')}
                onOpenConsulta={() => openModal('consulta')}
                onOpenReclamo={() => {
                    setMessageType('reclamo');
                    openModal('message');
                }}
            />
            <Footer />

            <SolicitudModal
                isOpen={modals.solicitud}
                onClose={() => closeModal('solicitud')}
                onFinish={handleSolicitudFinish}
            />

            <ConsultaModal
                isOpen={modals.consulta}
                onClose={() => closeModal('consulta')}
            />

            <MessageModal
                isOpen={modals.message}
                type={messageType}
                onClose={() => closeModal('message')}
            />
        </div>
    );
};

export default FormPage;
