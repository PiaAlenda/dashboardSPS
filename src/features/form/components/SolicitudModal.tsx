import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Hash, GraduationCap, Clock, School, Check } from 'lucide-react';
import { CustomInput } from '../../../components/ui/CustomInput';
import { ActionButton } from '../../../components/ui/ActionButton';

interface SolicitudModalProps {
    isOpen: boolean;
    onClose: () => void;
    onFinish: () => void;
}

const SolicitudModal: React.FC<SolicitudModalProps> = ({ isOpen, onClose, onFinish }) => {
    const [dni, setDni] = useState('');
    const [tramite, setTramite] = useState('');
    const [confirmTramite, setConfirmTramite] = useState('');
    const [genero, setGenero] = useState('');
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    if (!isOpen) return null;

    const validarPaso1 = () => {
        const newErrors: Record<string, boolean> = {};

        if (!/^\d{7,8}$/.test(dni)) newErrors.dni = true;
        if (!/^\d{11}$/.test(tramite)) newErrors.tramite = true;
        if (confirmTramite !== tramite || confirmTramite === "") newErrors.confirm = true;
        if (genero === "") newErrors.genero = true;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFinalizar = () => {
        if (validarPaso1()) {
            onFinish();
        }
    };

    return (
        <div className="modal-bg fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}>
            <div className="bg-white rounded-xl w-full max-w-2xl my-8 overflow-hidden shadow-2xl animate-fade-in relative">
                <div className="bg-[#413f41] text-white p-4 flex justify-between items-center">
                    <h2 className="font-bold text-lg">Formulario de Solicitud</h2>
                    <button onClick={onClose} className="text-2xl hover:text-gray-300">&times;</button>
                </div>

                <div className="p-6 md:p-10 max-h-[80vh] overflow-y-auto">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-[#ff8200] border-b-2 border-orange-100 pb-2">
                            <User size={20} className="font-bold" />
                            <h3 className="font-black uppercase tracking-tight text-lg">Datos Personales</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <CustomInput
                                label="Nombre"
                                placeholder="Ingrese nombre"
                                icon={<User size={16} />}
                            />
                            <CustomInput
                                label="Apellido"
                                placeholder="Ingrese apellido"
                                icon={<User size={16} />}
                            />

                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Departamento</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff8200]">
                                        <MapPin size={16} />
                                    </div>
                                    <select className="w-full bg-slate-50 border-2 border-slate-100 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-[#ff8200] block pl-11 p-3.5 outline-none transition-all font-bold appearance-none">
                                        <option>Seleccioná un departamento</option>
                                        <option>Capital</option>
                                        <option>Rivadavia</option>
                                        <option>Santa Lucía</option>
                                    </select>
                                </div>
                            </div>

                            <CustomInput
                                label="E-mail del beneficiario"
                                type="email"
                                placeholder="ejemplo@email.com"
                                icon={<Mail size={16} />}
                            />

                            <CustomInput
                                label="Número de celular"
                                className="md:col-span-2"
                                placeholder="Ej: 2644123456"
                                icon={<Phone size={16} />}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-slate-100 pt-6">
                            <CustomInput
                                label="DNI"
                                value={dni}
                                onChange={(e) => setDni(e.target.value)}
                                placeholder="Ingrese DNI sin puntos"
                                icon={<Hash size={16} />}
                                className={errors.dni ? 'animate-shake' : ''}
                            />

                            <CustomInput
                                label="N° de trámite del DNI"
                                value={tramite}
                                onChange={(e) => setTramite(e.target.value)}
                                placeholder="11 dígitos"
                                icon={<Hash size={16} />}
                                className={errors.tramite ? 'animate-shake' : ''}
                            />

                            <CustomInput
                                label="Confirmar N° de trámite"
                                value={confirmTramite}
                                onChange={(e) => setConfirmTramite(e.target.value)}
                                placeholder="Reingrese número"
                                icon={<Hash size={16} />}
                                className={errors.confirm ? 'animate-shake' : ''}
                            />

                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Género</label>
                                <select
                                    value={genero}
                                    onChange={(e) => setGenero(e.target.value)}
                                    className={`w-full bg-slate-50 border-2 ${errors.genero ? 'border-red-200' : 'border-slate-100'} text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-[#ff8200] block p-3.5 outline-none transition-all font-bold`}
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="No Binario">No Binario</option>
                                </select>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-6">
                            <div className="flex items-center gap-2 text-[#ff8200] border-b-2 border-orange-100 pb-2 mb-4">
                                <GraduationCap size={20} className="font-bold" />
                                <h3 className="font-black uppercase tracking-tight text-lg">Educación</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nivel Educativo</label>
                                    <select className="w-full bg-slate-50 border-2 border-slate-100 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-[#ff8200] block p-3.5 outline-none transition-all font-bold">
                                        <option>Seleccione una opción</option>
                                        <option>Inicial</option>
                                        <option>Primario</option>
                                        <option>Secundario</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Grado/Año</label>
                                    <select className="w-full bg-slate-50 border-2 border-slate-100 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-[#ff8200] block p-3.5 outline-none transition-all font-bold">
                                        <option>Seleccione una opción</option>
                                        <option>1°</option>
                                        <option>2°</option>
                                        <option>3°</option>
                                        <option>4°</option>
                                        <option>5°</option>
                                        <option>6°</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Turno</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff8200]">
                                            <Clock size={16} />
                                        </div>
                                        <select className="w-full bg-slate-50 border-2 border-slate-100 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-[#ff8200] block pl-11 p-3.5 outline-none transition-all font-bold appearance-none">
                                            <option>Seleccione una opción</option>
                                            <option>Mañana</option>
                                            <option>Tarde</option>
                                            <option>Noche</option>
                                        </select>
                                    </div>
                                </div>
                                <CustomInput label="Escuela" placeholder="Buscar escuela..." icon={<School size={16} />} />
                            </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-2 border-dashed border-slate-100">
                            Resuelva el captcha para continuar
                        </div>

                        <div className="flex justify-center pt-4">
                            <ActionButton
                                onClick={handleFinalizar}
                                className="w-full md:w-auto px-16 py-5 text-sm"
                                icon={Check}
                            >
                                Enviar Solicitud
                            </ActionButton>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-6 flex justify-end border-t border-slate-100">
                    <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Cerrar Formulario</button>
                </div>
            </div>
        </div>
    );
};

export default SolicitudModal;
