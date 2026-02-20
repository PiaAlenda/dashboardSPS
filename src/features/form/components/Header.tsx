import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();
    return (
        <header className="bg-[#ff8200] border-b border-gray-100 py-4 md:py-6 shadow-sm relative z-30">
            <div className="container mx-auto px-4 flex flex-row justify-between items-center gap-4">
                <div className="flex items-center cursor-pointer shrink-0">
                    <img
                        onClick={() => navigate('/')}
                        src="https://desarrollo.sanjuan.gob.ar/img/isologo-gob-sj-negativo.0446ce91.svg"
                        alt="Gobierno de San Juan"
                        className="h-10 md:h-12 w-auto object-contain"
                    />
                </div>
                <div className="flex items-center shrink-0">
                    <img
                        src="https://desarrollo.sanjuan.gob.ar/img/logo_ciudadano_digital.87f005ad.png"
                        alt="Ciudadano Digital"
                        className="h-10 md:h-12 w-auto object-contain"
                    />
                </div>                
            </div>
        </header>
    );
};

export default Header;