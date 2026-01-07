import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import type { User, Screen } from '@/types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  theme: 'dark' | 'light';
}

export default function Sidebar({ isOpen, onClose, user, currentScreen, onNavigate, theme }: SidebarProps) {
  const menuItems = [
    { id: 'feed' as Screen, label: 'Лента', icon: 'Home' },
    { id: 'chat' as Screen, label: 'Чаты', icon: 'MessageCircle' },
    { id: 'city' as Screen, label: 'Города', icon: 'Map' },
    { id: 'profile' as Screen, label: 'Профиль', icon: 'User' },
    { id: 'map' as Screen, label: 'Карта уловов', icon: 'MapPin' },
    { id: 'leaderboard' as Screen, label: 'Рейтинг', icon: 'Trophy' },
    { id: 'search' as Screen, label: 'Поиск', icon: 'Search' },
  ];

  const handleNavigate = (screen: Screen) => {
    onNavigate(screen);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed left-0 top-0 bottom-0 w-80 z-50 ${
              theme === 'dark' ? 'bg-[#1a1d2e]' : 'bg-white'
            } shadow-2xl`}
          >
            <div className="flex flex-col h-full">
              <div className={`p-6 border-b ${theme === 'dark' ? 'border-[#2d3142]' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user?.avatar_url} />
                      <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
                        {user?.username.substring(0, 2).toUpperCase() || 'РК'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {user?.username || 'Рыбак'}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Рейтинг: {user?.rating || 0}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="rounded-full"
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                        currentScreen === item.id
                          ? theme === 'dark'
                            ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400'
                            : 'bg-blue-50 text-blue-600'
                          : theme === 'dark'
                          ? 'text-gray-300 hover:bg-[#252837]'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon name={item.icon} size={20} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className={`p-4 border-t ${theme === 'dark' ? 'border-[#2d3142]' : 'border-gray-200'}`}>
                <div className={`flex items-center gap-3 p-4 rounded-xl ${
                  theme === 'dark' ? 'bg-[#252837]' : 'bg-gray-50'
                }`}>
                  <div className="text-2xl">🎣</div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Поймано рыбы
                    </p>
                    <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`}>
                      {user?.total_catches || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
