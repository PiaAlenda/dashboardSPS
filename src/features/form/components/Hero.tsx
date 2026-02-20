import React from 'react';

const Hero: React.FC = () => {
    return (
        <div className="relative w-full bg-slate-50">
            {/* 1. SECCIÓN SUPERIOR (Efecto Borroso de cámara más sutil) */}
            <section className="relative w-full h-[250px] md:h-[500px] overflow-hidden bg-gray-200">
                <img
                    src="/hero.webp"
                    alt="Fondo"
                    /* Blur reducido a [3.5px] para que sea visible pero estilizado */
                    className="absolute inset-0 w-full h-full object-cover blur-[3px] saturate-[1.1] scale-105"
                />
                <div className="absolute inset-0 bg-black/10"></div>
            </section>
            <div className="max-w-[1200px] mx-auto px-6 relative z-20 -mt-16 md:-mt-28">
                <div className="flex flex-col items-center gap-6 md:gap-10">
                    <div className="w-full max-w-4xl shadow-2xl rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border-[3px] border-white/90">
                        <img
                            src="/banner.webp"
                            alt="Boleto Escolar Gratuito"
                            className="w-full h-auto object-contain block"
                        />
                    </div>

                    {/* Imagen de Texto (Bloque naranja tipo cuaderno) */}
                    <div className="w-full max-w-4xl shadow-xl rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-white mb-8">
                        <img
                            src="/text.webp"
                            alt="Información"
                            className="w-full h-auto object-contain block"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;