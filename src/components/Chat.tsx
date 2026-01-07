import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import type { City, Message, User } from '@/types';

interface ChatProps {
  theme: 'dark' | 'light';
  user: User | null;
}

export default function Chat({ theme, user }: ChatProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const mockCities: City[] = [
    { id: 1, name: 'Москва', region: 'Московская область', latitude: 55.7558, longitude: 37.6173 },
    { id: 2, name: 'Санкт-Петербург', region: 'Ленинградская область', latitude: 59.9311, longitude: 30.3609 },
    { id: 3, name: 'Новосибирск', region: 'Новосибирская область', latitude: 55.0084, longitude: 82.9357 },
    { id: 4, name: 'Екатеринбург', region: 'Свердловская область', latitude: 56.8389, longitude: 60.6057 },
    { id: 5, name: 'Казань', region: 'Республика Татарстан', latitude: 55.8304, longitude: 49.0661 },
  ];

  const mockMessages: Message[] = [
    {
      id: 1,
      city_id: selectedCity?.id || 1,
      user_id: 2,
      content: 'Привет всем! Кто сегодня на рыбалку?',
      message_type: 'text',
      is_edited: false,
      created_at: new Date(Date.now() - 3600000).toISOString(),
      user: { id: 2, email: '', username: 'Иван', avatar_url: '', experience_years: 0, total_catches: 0, rating: 0, created_at: '' },
    },
    {
      id: 2,
      city_id: selectedCity?.id || 1,
      user_id: 3,
      content: 'Я планирую к озеру поехать, может кто составит компанию?',
      message_type: 'text',
      is_edited: false,
      created_at: new Date(Date.now() - 1800000).toISOString(),
      user: { id: 3, email: '', username: 'Петр', avatar_url: '', experience_years: 0, total_catches: 0, rating: 0, created_at: '' },
    },
    {
      id: 3,
      city_id: selectedCity?.id || 1,
      user_id: 4,
      content: 'Вчера на Волге щуку поймал на 4 кг! 🎣',
      message_type: 'text',
      is_edited: false,
      created_at: new Date(Date.now() - 900000).toISOString(),
      user: { id: 4, email: '', username: 'Алексей', avatar_url: '', experience_years: 0, total_catches: 0, rating: 0, created_at: '' },
    },
  ];

  const filteredCities = mockCities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim() && selectedCity) {
      setMessage('');
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div
        className={`w-80 border-r ${
          theme === 'dark' ? 'border-[#2d3142] bg-[#1a1d2e]' : 'border-gray-200 bg-gray-50'
        } flex flex-col`}
      >
        <div className="p-4 border-b ${theme === 'dark' ? 'border-[#2d3142]' : 'border-gray-200'}">
          <div className="relative">
            <Icon
              name="Search"
              size={18}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            />
            <Input
              placeholder="Поиск города..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 ${
                theme === 'dark'
                  ? 'bg-[#252837] border-[#2d3142] text-white placeholder:text-gray-500'
                  : 'bg-white'
              }`}
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredCities.map((city) => (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city)}
                className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                  selectedCity?.id === city.id
                    ? theme === 'dark'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20'
                      : 'bg-blue-50'
                    : theme === 'dark'
                    ? 'hover:bg-[#252837]'
                    : 'hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                      theme === 'dark' ? 'bg-[#252837]' : 'bg-white'
                    }`}
                  >
                    🏙️
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-semibold truncate ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {city.name}
                    </p>
                    <p className={`text-sm truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {city.region}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {selectedCity ? (
        <div className="flex-1 flex flex-col">
          <div
            className={`p-4 border-b flex items-center justify-between ${
              theme === 'dark' ? 'border-[#2d3142] bg-[#252837]' : 'border-gray-200 bg-white'
            }`}
          >
            <div>
              <h2 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {selectedCity.name}
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Общий чат города
              </p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 max-w-3xl mx-auto">
              {mockMessages.map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage src={msg.user?.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-sm">
                      {msg.user?.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span
                        className={`font-semibold text-sm ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {msg.user?.username}
                      </span>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        {formatTime(msg.created_at)}
                      </span>
                    </div>
                    <div
                      className={`inline-block px-4 py-2 rounded-2xl ${
                        theme === 'dark' ? 'bg-[#252837]' : 'bg-gray-100'
                      }`}
                    >
                      <p className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                        {msg.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          <div
            className={`p-4 border-t ${
              theme === 'dark' ? 'border-[#2d3142] bg-[#252837]' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="max-w-3xl mx-auto flex gap-2">
              <Button variant="ghost" size="icon" className="flex-shrink-0 rounded-full">
                <Icon name="Paperclip" size={20} />
              </Button>
              <Input
                placeholder="Написать сообщение..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className={`${
                  theme === 'dark'
                    ? 'bg-[#1a1d2e] border-[#2d3142] text-white placeholder:text-gray-500'
                    : 'bg-gray-50'
                }`}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="flex-shrink-0 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">💬</div>
            <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Выберите город
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Общайтесь с рыбаками из вашего региона
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
