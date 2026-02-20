import React, { useState, useEffect, useMemo } from 'react';
import { User, Mail, Hash, GraduationCap, School, Check, Loader2, X, Search, ChevronDown, BookOpen, Clock } from 'lucide-react';
import { ActionButton } from '../../../components/ui/ActionButton';
import { enrollmentService } from '../../../services/enrollmentService';
import { masterDataService } from '../../../services/masterDataService';
import { useQuery } from '@tanstack/react-query';
import type { PublicEnrollmentRequest } from '../../../types';

interface SolicitudModalProps {
    isOpen: boolean;
    onClose: () => void;
    onFinish: () => void;
}

const FloatingInput = ({ label, icon: Icon, value, onChange, type = "text", error, maxLength }: any) => {
    const hasValue = value !== undefined && value !== null && value.toString().length > 0;

    return (
        <div className="relative w-full group">
            <div className={`absolute left-4 top-[26px] -translate-y-1/2 z-10 transition-colors pointer-events-none
                ${error ? 'text-red-500' : 'text-slate-400 group-focus-within:text-[#ff8200]'}`}>
                {Icon}
            </div>
            <input
                type={type}
                value={value}
                onChange={onChange}
                onPaste={(e) => { if (label.toLowerCase().includes('trámite')) e.preventDefault(); }}
                onCopy={(e) => { if (label.toLowerCase().includes('trámite')) e.preventDefault(); }}
                maxLength={maxLength}
                placeholder=" "
                className={`peer w-full bg-slate-50 border-2 ${error ? 'border-red-200 focus:border-red-500' : 'border-slate-100 focus:border-[#ff8200]'} 
                rounded-2xl pl-12 pr-4 pt-6 pb-2 text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-orange-100/50`}
            />
            <label className={`absolute left-12 transition-all pointer-events-none
                ${hasValue
                    ? 'top-2 text-[10px] font-black uppercase tracking-widest text-[#ff8200]'
                    : 'top-[18px] text-base text-slate-400 peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-black peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-[#ff8200]'}`}>
                {label}
            </label>
            <div className="h-5">
                {error && <p className="text-[10px] text-red-500 font-bold mt-0.5 ml-4 animate-in fade-in slide-in-from-top-1 duration-200">{error}</p>}
            </div>
        </div>
    );
};

const FloatingSelect = ({ label, icon: Icon, value, onChange, options, error, loading = false }: any) => {
    const hasValue = value !== "" && value !== 0 && value !== undefined;

    return (
        <div className="relative w-full group">
            <div className={`absolute left-4 top-[26px] -translate-y-1/2 z-10 text-slate-400 pointer-events-none group-focus-within:text-[#ff8200]`}>
                {loading ? <Loader2 size={18} className="animate-spin" /> : Icon}
            </div>
            <select
                value={value}
                onChange={onChange}
                className={`peer w-full bg-slate-50 border-2 ${error ? 'border-red-200' : 'border-slate-100 focus:border-[#ff8200]'} 
                rounded-2xl pl-12 pr-10 pt-6 pb-2 text-sm font-bold outline-none transition-all appearance-none cursor-pointer text-slate-700`}
            >
                <option value="" hidden></option>
                {!loading && options.map((opt: any) => (
                    <option key={opt.id || opt.value} value={opt.id || opt.value} className="text-slate-700">
                        {opt.name || opt.label}
                    </option>
                ))}
            </select>
            <label className={`absolute left-12 transition-all pointer-events-none
                ${(hasValue)
                    ? 'top-2 text-[10px] font-black uppercase tracking-widest text-[#ff8200]'
                    : 'top-[18px] text-base text-slate-400 group-focus-within:top-2 group-focus-within:text-[10px] group-focus-within:font-black group-focus-within:uppercase group-focus-within:text-[#ff8200]'}`}>
                {label}
            </label>
            <ChevronDown size={16} className="absolute right-4 top-[26px] -translate-y-1/2 text-slate-400 pointer-events-none" />
            <div className="h-5">
                {error && <p className="text-[10px] text-red-500 font-bold mt-0.5 ml-4">{error}</p>}
            </div>
        </div>
    );
};

const SolicitudModal: React.FC<SolicitudModalProps> = ({ isOpen, onClose, onFinish }) => {
    const [form, setForm] = useState({
        firstName: '', lastName: '', dni: '', tramite: '', confirmTramite: '',
        email: '', genero: '', departmentId: 0, educationLevelId: 0,
        schoolId: 0, schoolNameOther: '', courseGrade: '', courseDivision: '', shiftId: 0
    });

    const [divisionType, setDivisionType] = useState<'letter' | 'number'>('letter');

    const gradeOptions = [
        { value: '1', label: '1° Año/Grado' },
        { value: '2', label: '2° Año/Grado' },
        { value: '3', label: '3° Año/Grado' },
        { value: '4', label: '4° Año/Grado' },
        { value: '5', label: '5° Año/Grado' },
        { value: '6', label: '6° Año/Grado' },
    ];

    const divisionOptions = useMemo(() => {
        if (divisionType === 'letter') {
            return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map(l => ({ value: l, label: l }));
        }
        return ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(n => ({ value: n, label: n }));
    }, [divisionType]);

    const [schoolSearch, setSchoolSearch] = useState('');
    const [showSchoolResults, setShowSchoolResults] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [captcha, setCaptcha] = useState({ a: 0, b: 0 });
    const [captchaAnswer, setCaptchaAnswer] = useState('');

    const generateRandomCaptcha = () => {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        setCaptcha({ a, b });
        setCaptchaAnswer('');
    };

    const { data: departments = [], isLoading: loadingDepts } = useQuery({
        queryKey: ['public-departments'],
        queryFn: masterDataService.getDepartments,
        enabled: isOpen
    });

    const { data: schools = [] } = useQuery({
        queryKey: ['public-schools'],
        queryFn: masterDataService.getSchools,
        enabled: isOpen
    });

    const { data: educationLevels = [] } = useQuery({
        queryKey: ['public-education-levels'],
        queryFn: masterDataService.getEducationLevels,
        enabled: isOpen
    });

    const filteredSchools = useMemo(() => {
        const query = schoolSearch.toLowerCase().trim();
        if (query.length < 3) return [];
        return schools.filter(s => s.name.toLowerCase().includes(query)).slice(0, 10);
    }, [schoolSearch, schools]);

    useEffect(() => {
        if (isOpen) {
            setErrors({});
            setSchoolSearch('');
            generateRandomCaptcha();
        }
    }, [isOpen]);

    const updateField = (field: string, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validar = () => {
        const e: Record<string, string> = {};
        if (!form.firstName.trim()) e.firstName = "Obligatorio";
        if (!form.lastName.trim()) e.lastName = "Obligatorio";
        if (!/^\d{7,8}$/.test(form.dni)) e.dni = "DNI inválido";
        if (!form.tramite) e.tramite = "Obligatorio";
        if (form.confirmTramite !== form.tramite) e.confirmTramite = "No coinciden";
        if (!form.email.includes('@')) e.email = "Email inválido";
        if (!form.genero) e.genero = "Obligatorio";
        if (form.departmentId === 0) e.departmentId = "Obligatorio";
        if (form.educationLevelId === 0) e.educationLevelId = "Obligatorio";
        if (form.schoolId === 0 && !form.schoolNameOther.trim()) e.school = "Obligatorio";
        if (!form.courseDivision) e.courseDivision = "Seleccione";
        if (!captchaAnswer || Number(captchaAnswer) !== (captcha.a + captcha.b)) e.captcha = "Incorrecto";

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleFinalizar = async () => {
        if (!validar()) return;
        setIsSubmitting(true);
        try {
            const payload: PublicEnrollmentRequest = {
                firstName: form.firstName,
                lastName: form.lastName,
                dni: form.dni,
                dniTramite: form.tramite,
                gender: form.genero,
                email: form.email,
                departmentId: form.departmentId,
                educationLevelId: form.educationLevelId,
                schoolId: form.schoolId,
                schoolNameOther: form.schoolId === -1 ? form.schoolNameOther : undefined,
                courseGrade: form.courseGrade,
                courseDivision: form.courseDivision,
                shiftId: form.shiftId,
            };
            await enrollmentService.submitPublicFoodRation(payload);
            onFinish();
        } catch (error) {
            alert("Error al enviar la solicitud.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-3xl w-full max-w-2xl my-auto overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="bg-[#2d2f33] text-white p-6 flex justify-between items-center border-b-4 border-[#ff8200]">
                    <div>
                        <h2 className="font-black uppercase tracking-tighter text-xl leading-none">Solicitud de Comedor</h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Inscripción Ciclo Lectivo</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X /></button>
                </div>

                <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto space-y-6">

                    {/* DATOS PERSONALES */}
                    <section>
                        <div className="flex items-center gap-2 text-[#ff8200] mb-4">
                            <User size={18} className="stroke-[3px]" />
                            <h3 className="font-black uppercase text-xs tracking-widest text-slate-700">Datos Personales</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                            <FloatingInput label="Nombre" icon={<User size={18} />} value={form.firstName} onChange={(e: any) => updateField('firstName', e.target.value)} error={errors.firstName} />
                            <FloatingInput label="Apellido" icon={<User size={18} />} value={form.lastName} onChange={(e: any) => updateField('lastName', e.target.value)} error={errors.lastName} />
                            <FloatingInput label="DNI" icon={<Hash size={18} />} value={form.dni} onChange={(e: any) => updateField('dni', e.target.value.replace(/\D/g, '').slice(0, 8))} error={errors.dni} />
                            <FloatingSelect
                                label="Género" icon={<User size={18} />} value={form.genero}
                                onChange={(e: any) => updateField('genero', e.target.value)}
                                options={[{ value: 'Masculino', label: 'Masculino' }, { value: 'Femenino', label: 'Femenino' }, { value: 'No Binario', label: 'No Binario' }]}
                                error={errors.genero}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 mt-2">
                            <FloatingInput label="N° Trámite DNI" icon={<Hash size={18} />} value={form.tramite} onChange={(e: any) => updateField('tramite', e.target.value.replace(/\D/g, '').slice(0, 11))} error={errors.tramite} />
                            <FloatingInput label="Confirmar Trámite" icon={<Check size={18} />} value={form.confirmTramite} onChange={(e: any) => updateField('confirmTramite', e.target.value.replace(/\D/g, '').slice(0, 11))} error={errors.confirmTramite} />
                        </div>
                    </section>

                    {/* SECCIÓN 2: CONTACTO Y UBICACIÓN */}
                    <section className="pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-[#ff8200] mb-4">
                            <Mail size={18} className="stroke-[3px]" />
                            <h3 className="font-black uppercase text-xs tracking-widest text-slate-700">Contacto y Residencia</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                            <FloatingInput
                                label="Email"
                                icon={<Mail size={18} />}
                                value={form.email}
                                onChange={(e: any) => updateField('email', e.target.value)}
                                error={errors.email}
                            />

                            <FloatingSelect
                                label="Departamento"
                                icon={<Hash size={18} />}
                                value={form.departmentId}
                                onChange={(e: any) => updateField('departmentId', Number(e.target.value))}
                                options={departments}
                                loading={loadingDepts}
                                error={errors.departmentId}
                            />
                        </div>
                    </section>

                    {/* ESCUELA */}
                    <section className="pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-[#ff8200] mb-4">
                            <GraduationCap size={18} className="stroke-[3px]" />
                            <h3 className="font-black uppercase text-xs tracking-widest text-slate-700">Información Escolar</h3>
                        </div>

                        <div className="space-y-2">
                            <FloatingSelect
                                label="Nivel Educativo" icon={<GraduationCap size={18} />}
                                value={form.educationLevelId} onChange={(e: any) => updateField('educationLevelId', Number(e.target.value))}
                                options={educationLevels} error={errors.educationLevelId}
                            />

                            <div className="flex flex-col md:flex-row gap-4 pt-2">
                                <div className="flex-[2]">
                                    <FloatingSelect
                                        label="Grado / Año" icon={<BookOpen size={18} />}
                                        value={form.courseGrade}
                                        onChange={(e: any) => updateField('courseGrade', e.target.value)}
                                        options={gradeOptions}
                                        error={errors.courseGrade}
                                    />
                                </div>

                                <div className="flex-[1.5] relative">
                                    <FloatingSelect
                                        label="División" icon={<Hash size={18} />}
                                        value={form.courseDivision}
                                        onChange={(e: any) => updateField('courseDivision', e.target.value)}
                                        options={divisionOptions}
                                        error={errors.courseDivision}
                                    />

                                    <div className="absolute right-3 -top-3 z-20 flex bg-white p-0.5 rounded-lg border border-slate-200 shadow-sm transition-all">
                                        <button
                                            type="button"
                                            onClick={() => { setDivisionType('letter'); updateField('courseDivision', ''); }}
                                            className={`px-2 py-0.5 rounded-md text-[9px] font-black transition-all ${divisionType === 'letter' ? 'bg-[#ff8200] text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            A
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => { setDivisionType('number'); updateField('courseDivision', ''); }}
                                            className={`px-2 py-0.5 rounded-md text-[9px] font-black transition-all ${divisionType === 'number' ? 'bg-[#ff8200] text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            1
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-[2]">
                                    <FloatingSelect
                                        label="Turno" icon={<Clock size={18} />}
                                        value={form.shiftId} onChange={(e: any) => updateField('shiftId', Number(e.target.value))}
                                        options={[{ id: 1, name: 'Mañana' }, { id: 2, name: 'Tarde' }, { id: 3, name: 'Noche' }, { id: 4, name: 'Vespertino' }]}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="relative mt-4">
                            <FloatingInput
                                label="Buscar Escuela (Escriba el nombre)" icon={<Search size={18} />}
                                value={schoolSearch}
                                onChange={(e: any) => { setSchoolSearch(e.target.value); setShowSchoolResults(true); if (form.schoolId !== 0) updateField('schoolId', 0); }}
                                error={errors.school}
                            />

                            {showSchoolResults && schoolSearch.length > 2 && (
                                <div className="absolute z-30 w-full mt-[-15px] bg-white border border-slate-200 rounded-2xl shadow-2xl max-h-48 overflow-y-auto p-2 animate-in fade-in zoom-in-95 duration-200">
                                    {filteredSchools.length > 0 ? (
                                        filteredSchools.map((s: any) => (
                                            <button key={s.id} type="button" onClick={() => { updateField('schoolId', s.id); setSchoolSearch(s.name); setShowSchoolResults(false); }} className="w-full text-left p-3 hover:bg-orange-50 rounded-xl flex items-center gap-3 transition-colors group">
                                                <School size={16} className="text-slate-400 group-hover:text-[#ff8200]" />
                                                <span className="text-sm font-bold text-slate-700">{s.name}</span>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="p-3 text-xs text-slate-400 italic">No se encontraron escuelas...</div>
                                    )}
                                    <button type="button" onClick={() => { updateField('schoolId', -1); setShowSchoolResults(false); }} className="w-full text-left p-3 hover:bg-blue-50 rounded-xl flex items-center gap-3 text-blue-600 border-t border-slate-100 mt-1">
                                        <X size={14} className="bg-blue-100 rounded-full p-0.5" />
                                        <span className="text-xs font-black uppercase tracking-widest">No está en la lista / Especificar</span>
                                    </button>
                                </div>
                            )}

                            {form.schoolId === -1 && (
                                <div className="mt-2 animate-in slide-in-from-top-2">
                                    <FloatingInput label="Nombre de la Escuela" icon={<School size={18} />} value={form.schoolNameOther} onChange={(e: any) => updateField('schoolNameOther', e.target.value)} />
                                </div>
                            )}
                        </div>
                    </section>

                    {/* CAPTCHA Y BOTÓN */}
                    <div className="bg-orange-50 p-5 rounded-3xl border-2 border-orange-100 flex flex-col md:flex-row items-center gap-4 mt-4">
                        <div className="flex-1 text-center md:text-left">
                            <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Seguridad</p>
                            <p className="text-lg font-black text-slate-700">¿Cuánto es <span className="text-[#ff8200]">{captcha.a} + {captcha.b}</span>?</p>
                        </div>
                        <div className="w-full md:w-32">
                            <FloatingInput label="Resultado" value={captchaAnswer} onChange={(e: any) => setCaptchaAnswer(e.target.value.replace(/\D/g, ''))} error={errors.captcha} />
                        </div>
                    </div>

                    <ActionButton
                        onClick={handleFinalizar}
                        className="w-full py-6 text-base shadow-xl"
                        icon={isSubmitting ? Loader2 : Check}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Procesando...' : 'Confirmar Inscripción'}
                    </ActionButton>
                </div>
            </div>
        </div>
    );
};

export default SolicitudModal;