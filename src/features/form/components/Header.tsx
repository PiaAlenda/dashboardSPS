import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-[#ff8200] border-b border-gray-100 py-6 shadow-sm relative z-30">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Logo San Juan */}
                <div className="flex items-center">
                    <img
                        src="https://desarrollo.sanjuan.gob.ar/img/isologo-gob-sj-negativo.0446ce91.svg"
                        alt="Gobierno de San Juan"
                        className="h-12"
                    />
                </div>
                {/* Right Logo */}
                <div className="flex items-center">
                    <img
                        src="https://desarrollo.sanjuan.gob.ar/img/logo_ciudadano_digital.87f005ad.png"
                        alt="Ciudadano Digital"
                        className="h-12"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
