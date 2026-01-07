import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type Screen = 'auth' | 'feed' | 'friends' | 'profile';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('auth');
  const [isLogin, setIsLogin] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [postText, setPostText] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const { toast } = useToast();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark');
  };

  const handleAuth = () => {
    toast({ title: 'Добро пожаловать в РыбаКоп!' });
    setScreen('feed');
  };

  const handlePost = () => {
    if (postText.trim()) {
      toast({ title: 'Пост опубликован!' });
      setPostText('');
      setShowNewPost(false);
    }
  };

  const friends = [
    { id: 1, name: 'Иван', avatar: '🎣', status: 'Щука 5кг!' },
    { id: 2, name: 'Петр', avatar: '🐟', status: 'На Волге' },
    { id: 3, name: 'Мария', avatar: '🌊', status: 'Карп поймала' },
    { id: 4, name: 'Алексей', avatar: '🎯', status: 'Рыбак года' },
    { id: 5, name: 'Ольга', avatar: '⚓', status: 'На озере' },
    { id: 6, name: 'Дмитрий', avatar: '🏆', status: 'Судак 3кг' },
  ];

  const posts = [
    {
      id: 1,
      author: 'Юрий Рыболов',
      avatar: '🎣',
      time: '2 часа назад',
      text: 'Поймал щуку на 7 кг! Вот это улов! Использовал воблер Rapala. Погода отличная, клёв был с утра.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      likes: 42,
      comments: 8,
    },
    {
      id: 2,
      author: 'Анна Фишер',
      avatar: '🌊',
      time: '5 часов назад',
      text: 'Сегодня на Волге! Карп на 4кг, день удался! Друзья, кто еще на реке?',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      likes: 38,
      comments: 12,
    },
  ];

  if (screen === 'auth') {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#1a1d2e]' : 'bg-gradient-to-br from-blue-50 to-cyan-50'} flex items-center justify-center p-4 transition-colors duration-300`}>
        <Card className={`w-full max-w-md p-8 ${theme === 'dark' ? 'bg-[#252837] border-[#2d3142]' : 'bg-white border-gray-200'} transition-colors duration-300`}>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🎣</div>
              <div>
                <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>РыбаКоп</h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Сообщество рыбаков</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={20} />
            </Button>
          </div>

          <div className="flex gap-2 mb-6">
            <Button
              onClick={() => setIsLogin(true)}
              variant={isLogin ? 'default' : 'ghost'}
              className="flex-1 rounded-full"
            >
              Вход
            </Button>
            <Button
              onClick={() => setIsLogin(false)}
              variant={!isLogin ? 'default' : 'ghost'}
              className="flex-1 rounded-full"
            >
              Регистрация
            </Button>
          </div>

          <div className="space-y-4">
            <Input
              placeholder="Email"
              type="email"
              className={`${theme === 'dark' ? 'bg-[#1a1d2e] border-[#2d3142] text-white placeholder:text-gray-500' : 'bg-gray-50'} rounded-xl`}
            />
            <Input
              placeholder="Пароль"
              type="password"
              className={`${theme === 'dark' ? 'bg-[#1a1d2e] border-[#2d3142] text-white placeholder:text-gray-500' : 'bg-gray-50'} rounded-xl`}
            />
            {!isLogin && (
              <Input
                placeholder="Имя"
                className={`${theme === 'dark' ? 'bg-[#1a1d2e] border-[#2d3142] text-white placeholder:text-gray-500' : 'bg-gray-50'} rounded-xl`}
              />
            )}
            <Button onClick={handleAuth} className="w-full rounded-xl h-12 text-base font-semibold">
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#1a1d2e]' : 'bg-gray-50'} pb-20 transition-colors duration-300`}>
      <div className={`sticky top-0 z-10 ${theme === 'dark' ? 'bg-[#252837]' : 'bg-white'} border-b ${theme === 'dark' ? 'border-[#2d3142]' : 'border-gray-200'} transition-colors duration-300`}>
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🎣</div>
            <div>
              <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>РыбаКоп</h1>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {screen === 'feed' && 'Лента'}
                {screen === 'friends' && 'Друзья рыбаки'}
                {screen === 'profile' && 'Мой профиль'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Icon name="Search" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Icon name="Bell" size={20} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        {screen === 'feed' && (
          <div className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {friends.map((friend) => (
                <div key={friend.id} className="flex flex-col items-center gap-2 min-w-[80px]">
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-full ${theme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gradient-to-br from-blue-400 to-cyan-400'} flex items-center justify-center text-2xl border-2 ${theme === 'dark' ? 'border-[#252837]' : 'border-white'}`}>
                      {friend.avatar}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 ${theme === 'dark' ? 'border-[#252837]' : 'border-white'}`}></div>
                  </div>
                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{friend.name}</span>
                </div>
              ))}
            </div>

            {!showNewPost ? (
              <Card className={`p-4 ${theme === 'dark' ? 'bg-[#252837] border-[#2d3142]' : 'bg-white border-gray-200'} transition-colors duration-300`}>
                <button
                  onClick={() => setShowNewPost(true)}
                  className={`w-full text-left px-4 py-3 rounded-xl ${theme === 'dark' ? 'bg-[#1a1d2e] text-gray-400' : 'bg-gray-50 text-gray-600'} hover:bg-opacity-80 transition-all`}
                >
                  Поделись своим уловом...
                </button>
              </Card>
            ) : (
              <Card className={`p-4 ${theme === 'dark' ? 'bg-[#252837] border-[#2d3142]' : 'bg-white border-gray-200'} transition-colors duration-300`}>
                <Textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Расскажи о своей рыбалке..."
                  className={`mb-3 min-h-[100px] ${theme === 'dark' ? 'bg-[#1a1d2e] border-[#2d3142] text-white placeholder:text-gray-500' : 'bg-gray-50'} rounded-xl`}
                />
                <div className="flex gap-2">
                  <Button onClick={handlePost} className="flex-1 rounded-xl">
                    <Icon name="Send" size={16} className="mr-2" />
                    Опубликовать
                  </Button>
                  <Button onClick={() => setShowNewPost(false)} variant="outline" className={`${theme === 'dark' ? 'border-[#2d3142]' : ''} rounded-xl`}>
                    Отмена
                  </Button>
                </div>
              </Card>
            )}

            {posts.map((post) => (
              <Card key={post.id} className={`overflow-hidden ${theme === 'dark' ? 'bg-[#252837] border-[#2d3142]' : 'bg-white border-gray-200'} transition-colors duration-300`}>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-gradient-to-br from-cyan-500 to-blue-500' : 'bg-gradient-to-br from-blue-400 to-cyan-400'} flex items-center justify-center text-xl`}>
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{post.author}</p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{post.time}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Icon name="MoreVertical" size={20} />
                    </Button>
                  </div>
                  <p className={`mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{post.text}</p>
                </div>
                <img src={post.image} alt="Улов" className="w-full aspect-[4/3] object-cover" />
                <div className={`p-4 flex items-center gap-6 border-t ${theme === 'dark' ? 'border-[#2d3142]' : 'border-gray-200'}`}>
                  <Button variant="ghost" size="sm" className={`gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} rounded-xl`}>
                    <Icon name="Heart" size={20} />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className={`gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} rounded-xl`}>
                    <Icon name="MessageCircle" size={20} />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} rounded-xl`}>
                    <Icon name="Share2" size={20} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {screen === 'friends' && (
          <div className="space-y-4">
            <Card className={`p-6 text-center ${theme === 'dark' ? 'bg-[#252837] border-[#2d3142]' : 'bg-white border-gray-200'} transition-colors duration-300`}>
              <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Друзья рыбаки</h2>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                Найди друзей по увлечению. Делись опытом и трофеями.
              </p>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              {friends.map((friend) => (
                <Card key={friend.id} className={`p-4 text-center ${theme === 'dark' ? 'bg-[#252837] border-[#2d3142]' : 'bg-white border-gray-200'} transition-colors duration-300`}>
                  <div className={`w-20 h-20 rounded-full ${theme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gradient-to-br from-blue-400 to-cyan-400'} flex items-center justify-center text-3xl mx-auto mb-3`}>
                    {friend.avatar}
                  </div>
                  <p className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{friend.name}</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-3`}>{friend.status}</p>
                  <Button size="sm" className="w-full rounded-xl">
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Добавить
                  </Button>
                </Card>
              ))}
            </div>

            <Button className="w-full rounded-xl h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Найти ещё рыбаков
            </Button>
          </div>
        )}

        {screen === 'profile' && (
          <div className="space-y-4">
            <Card className={`p-6 ${theme === 'dark' ? 'bg-[#252837] border-[#2d3142]' : 'bg-white border-gray-200'} transition-colors duration-300`}>
              <div className="flex flex-col items-center mb-6">
                <div className={`w-24 h-24 rounded-full ${theme === 'dark' ? 'bg-gradient-to-br from-cyan-500 to-blue-500' : 'bg-gradient-to-br from-blue-400 to-cyan-400'} flex items-center justify-center text-4xl mb-3`}>
                  🎣
                </div>
                <h2 className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Юрий Рыболов</h2>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>@yury_fisherman</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>127</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Постов</p>
                </div>
                <div className="text-center">
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>342</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Друзей</p>
                </div>
                <div className="text-center">
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>89</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Трофеев</p>
                </div>
              </div>

              <Button variant="outline" className={`w-full rounded-xl ${theme === 'dark' ? 'border-[#2d3142]' : ''}`}>
                <Icon name="Edit" size={16} className="mr-2" />
                Редактировать профиль
              </Button>
            </Card>

            <Card className={`p-4 ${theme === 'dark' ? 'bg-[#252837] border-[#2d3142]' : 'bg-white border-gray-200'} transition-colors duration-300`}>
              <h3 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Достижения</h3>
              <div className="grid grid-cols-4 gap-3">
                {['🏆', '🎯', '⭐', '🥇', '🎖️', '👑', '💎', '🔥'].map((emoji, i) => (
                  <div key={i} className={`aspect-square rounded-xl ${theme === 'dark' ? 'bg-[#1a1d2e]' : 'bg-gray-50'} flex items-center justify-center text-2xl`}>
                    {emoji}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      <div className={`fixed bottom-0 left-0 right-0 ${theme === 'dark' ? 'bg-[#252837]' : 'bg-white'} border-t ${theme === 'dark' ? 'border-[#2d3142]' : 'border-gray-200'} transition-colors duration-300`}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-around">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setScreen('feed')}
            className={`rounded-full ${screen === 'feed' ? 'text-primary' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <Icon name="Home" size={24} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setScreen('friends')}
            className={`rounded-full ${screen === 'friends' ? 'text-primary' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <Icon name="Users" size={24} />
          </Button>
          <Button
            size="icon"
            onClick={() => setShowNewPost(true)}
            className="rounded-full w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            <Icon name="Plus" size={28} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <Icon name="MessageSquare" size={24} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setScreen('profile')}
            className={`rounded-full ${screen === 'profile' ? 'text-primary' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <Icon name="User" size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
