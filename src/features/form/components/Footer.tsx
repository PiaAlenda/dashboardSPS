import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#2d2f33] text-white py-14 mt-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                    <div className="flex flex-col space-y-6">
                        <img
                            src="https://desarrollo.sanjuan.gob.ar/img/isologo-gob-sj-negativo.0446ce91.svg"
                            alt="Gobierno de San Juan"
                            className="h-14 brightness-0 invert object-contain self-start"
                        />
                        <div className="flex space-x-5 text-2xl">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-x-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-youtube"></i></a>
                        </div>
                        <img
                            src="https://boletoescolar.sanjuan.gob.ar/assets/Escudo-San-Juan-IOb4jG3Y.svg"
                            alt="Escudo San Juan"
                            className="w-12 brightness-0 invert opacity-90"
                        />
                    </div>
                    <div className="max-w-md">
                        <h4 className="font-bold text-lg mb-4">Ministerio de Gobierno / Secretaría de Tránsito y Transporte</h4>
                        <div className="space-y-2 text-sm text-gray-400 font-light">
                            <p>Av. Libertador Gral. San Martín 750 Oeste - Capital. Centro Cívico, 4º Piso - Núcleo 2 - Ingreso 6</p>
                            <p>Teléfono: (0264) 430 6000</p>
                            <p>Conmutador: (0264) 429-5000</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
