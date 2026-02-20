import React from 'react';

const Footer: React.FC = () => {
    const socialIcons = {
        facebook: "https://cdn.simpleicons.org/facebook/white",
        x: "https://cdn.simpleicons.org/x/white",
        instagram: "https://cdn.simpleicons.org/instagram/white",
        youtube: "https://cdn.simpleicons.org/youtube/white",
    };

    return (
        <footer className="bg-[#2d2f33] text-white py-14 mt-10 border-t-4 border-[#ff8200]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="flex flex-col space-y-8">
                        <img
                            src="https://desarrollo.sanjuan.gob.ar/img/isologo-gob-sj-negativo.0446ce91.svg"
                            alt="Gobierno de San Juan"
                            className="h-12 object-contain self-start"
                        />
                        <div className="flex items-center gap-6">
                            <a href="#" target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-110 hover:opacity-70" title="Facebook">
                                <img src={socialIcons.facebook} alt="Facebook" className="w-6 h-6" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-110 hover:opacity-70" title="X (Twitter)">
                                <img src={socialIcons.x} alt="X" className="w-5 h-5" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-110 hover:opacity-70" title="Instagram">
                                <img src={socialIcons.instagram} alt="Instagram" className="w-6 h-6" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-110 hover:opacity-70" title="YouTube">
                                <img src={socialIcons.youtube} alt="YouTube" className="w-7 h-7" />
                            </a>
                        </div>
                        <img
                            src="https://boletoescolar.sanjuan.gob.ar/assets/Escudo-San-Juan-IOb4jG3Y.svg"
                            alt="Escudo San Juan"
                            className="w-10 brightness-0 invert opacity-60"
                        />
                    </div>
                    <div className="max-w-md">
                        <h4 className="font-black text-xl mb-4 tracking-tight leading-tight">
                            Ministerio de Gobierno <br />
                            <span className="text-[#ff8200] font-bold text-base uppercase tracking-[0.15em]">
                                Secretaría de Promoción Social
                            </span>
                        </h4>
                        
                        <div className="space-y-4 text-sm text-gray-400 font-medium">
                            <div className="flex items-start gap-3">
                                <div className="w-1 h-5 bg-[#ff8200] rounded-full mt-0.5 shrink-0" />
                                <p>Av. Libertador Gral. San Martín 750 Oeste - Capital. Centro Cívico, 1° Piso</p>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-1 h-5 bg-[#ff8200] rounded-full mt-0.5 shrink-0" />
                                <div>
                                    <p>Teléfono: <span className="text-gray-300">(0264) 430 6000</span></p>
                                    <p>Conmutador: <span className="text-gray-300">(0264) 429-5000</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 text-center">
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">
                        © 2026 Gobierno de San Juan · Todos los derechos reservados
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;