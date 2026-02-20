import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full h-18 lg:h-20 border-b border-white/10 bg-[#ff8200]/85 backdrop-blur-md px-4 md:px-8">
      <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center h-full py-4 cursor-pointer group" onClick={() => navigate('/')}>
          <img 
            src="https://desarrollo.sanjuan.gob.ar/img/isologo-gob-sj-negativo.0446ce91.svg" 
            alt="Gobierno de San Juan"
            className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white leading-tight">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-orange-100/90">
              {user?.role?.replace('ROLE_', '')}
            </p>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 shadow-sm
                ${isMenuOpen ? 'bg-white scale-95 shadow-md' : 'bg-white hover:bg-orange-50'}`}
            >
              <UserCircle 
                size={24} 
                strokeWidth={2}
                className={`transition-colors duration-200 ${isMenuOpen ? 'text-[#ff8200]' : 'text-[#ff8200]'}`} 
              />
            </button>

            {/* Dropdown  */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-slate-100 py-1 overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-1 duration-150 origin-top-right">
                <div className="px-3 py-2 border-b border-slate-50 bg-slate-50/30">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Opciones</p>
                </div>
                
                <div className="p-1">
                  <button
                    onClick={() => { navigate('/perfil'); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors group"
                  >
                    <UserIcon size={14} className="text-slate-400 group-hover:text-orange-500" />
                    Mi Perfil
                  </button>
                </div>

                <div className="mt-1 pt-1 border-t border-slate-100 p-1">
                  <button
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors group"
                  >
                    <LogOut size={14} className="text-red-400 group-hover:text-red-500" />
                    Cambiar de usuario
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};