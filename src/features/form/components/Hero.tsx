import React from 'react';

const Hero: React.FC = () => {
    return (
        <>
            <section className="relative w-full h-[450px] flex items-center justify-center overflow-hidden">
                <img
                    src="/hero.webp"
                    alt="Fondo"
                    className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
                />
                <div className="absolute inset-0 bg-black/30"></div>
            </section>

            <div className="container mx-auto px-4 relative z-20">
                <div className="max-w-5xl mx-auto -mt-32 mb-10">
                    <img
                        src="/banner.webp"
                        alt="banner"
                        className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
                    />
                </div>
``                <img
                    src="/text.webp"
                    alt="text"
                    className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
                />
            </div>
        </>
    );
};

export default Hero;
