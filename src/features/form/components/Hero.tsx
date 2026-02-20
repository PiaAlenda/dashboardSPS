import React from 'react';

const Hero: React.FC = () => {
    return (
        <div className="relative w-full">
            {/* Fondo de Sección - Altura de 500px y desenfoque controlado */}
            <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
                <img
                    src="/hero.webp"
                    alt="Fondo"
                    /* blur-[4px] es más sutil que blur-md, protege pero no deforma tanto */
                    className="absolute inset-0 w-full h-full object-cover blur-[4px] scale-105"
                />
                
                {/* Overlay oscuro y gradiente para suavizar la transición inferior */}
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0  via-transparent to-slate-50"></div>
            </section>

            {/* Contenedor de Contenido - El banner baja un poco más (-mt-20) */}
            <div className="max-w-[1200px] mx-auto px-4 relative z-20 -mt-20 md:-mt-28">
                <div className="flex flex-col items-center gap-10">
                    
                    {/* Imagen del Banner (Boleto Escolar) */}
                    <div className="w-full max-w-4xl shadow-2xl rounded-[2.5rem] overflow-hidden">
                        <img
                            src="/banner.webp"
                            alt="Boleto Escolar Gratuito"
                            className="w-full h-auto object-contain block"
                        />
                    </div>

                    {/* Imagen de Texto/Cuerpo (Bloque naranja) */}
                    <div className="w-full max-w-4xl shadow-xl rounded-[2.5rem] overflow-hidden bg-white mb-12">
                        <img
                            src="/text.webp"
                            alt="Información del Ministerio de Gobierno"
                            className="w-full h-auto object-contain block"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;