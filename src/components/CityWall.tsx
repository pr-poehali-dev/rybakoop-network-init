import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import type { City, Post, User } from '@/types';

interface CityWallProps {
  theme: 'dark' | 'light';
  user: User | null;
  city: City;
}

export default function CityWall({ theme, user, city }: CityWallProps) {
  const [showNewPost, setShowNewPost] = useState(false);
  const [postText, setPostText] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [tags, setTags] = useState('');

  const mockPosts: Post[] = [
    {
      id: 1,
      user_id: 2,
      city_id: city.id,
      content: 'Вчера на речке поймал щуку на 5 кг! Какой азарт, братцы! 🎣',
      images: [],
      tags: ['щука', 'зимняя_рыбалка'],
      likes_count: 42,
      comments_count: 8,
      created_at: new Date(Date.now() - 7200000).toISOString(),
      updated_at: new Date(Date.now() - 7200000).toISOString(),
      user: {
        id: 2,
        email: '',
        username: 'Иван Рыбаков',
        avatar_url: '',
        experience_years: 5,
        total_catches: 150,
        rating: 720,
        created_at: '',
      },
    },
    {
      id: 2,
      user_id: 3,
      city_id: city.id,
      content: 'Ребята, кто знает хорошие места для карпа? Подскажите новичку!',
      images: [],
      tags: ['карп', 'помощь'],
      likes_count: 15,
      comments_count: 12,
      created_at: new Date(Date.now() - 14400000).toISOString(),
      updated_at: new Date(Date.now() - 14400000).toISOString(),
      user: {
        id: 3,
        email: '',
        username: 'Мария Озерная',
        avatar_url: '',
        experience_years: 1,
        total_catches: 23,
        rating: 240,
        created_at: '',
      },
    },
  ];

  const handlePost = () => {
    if (postText.trim()) {
      setPostText('');
      setSelectedImages([]);
      setTags('');
      setShowNewPost(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 60) return `${diffMins} мин назад`;
    if (diffHours < 24) return `${diffHours} ч назад`;
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <Card
        className={`p-6 ${theme === 'dark' ? 'bg-[#252837] border-[#2d3142]' : 'bg-white border-gray-200'}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">🏙️</div>
          <div>
            <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {city.name}
            </h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {city.region}
            </p>
          </div>
        </div>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Стена города — делитесь уловами, находками и историями с земляками!
        </p>
      </Card>

      {!showNewPost ? (
        <Card
          className={`p-4 ${theme === 'dark' ? 'bg-[#252837] border-[#2d3142]' : 'bg-white border-gray-200'}`}
        >
          <button
            onClick={() => setShowNewPost(true)}
            className={`w-full text-left px-4 py-3 rounded-xl ${
              theme === 'dark' ? 'bg-[#1a1d2e] text-gray-400' : 'bg-gray-50 text-gray-600'
            } hover:bg-opacity-80 transition-all`}
          >
            Поделитесь своим уловом или историей...
          </button>
        </Card>
      ) : (
        <Card
          className={`p-4 ${theme === 'dark' ? 'bg-[#252837] border-[#2d3142]' : 'bg-white border-gray-200'}`}
        >
          <Textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Расскажите о своём улове или рыбацкой истории..."
            className={`mb-3 min-h-[120px] ${
              theme === 'dark'
                ? 'bg-[#1a1d2e] border-[#2d3142] text-white placeholder:text-gray-500'
                : 'bg-gray-50'
            } rounded-xl resize-none`}
          />
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Теги: #щука #зимняя_рыбалка"
            className={`mb-3 ${
              theme === 'dark'
                ? 'bg-[#1a1d2e] border-[#2d3142] text-white placeholder:text-gray-500'
                : 'bg-gray-50'
            } rounded-xl`}
          />
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Icon name="Image" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Icon name="MapPin" size={20} />
            </Button>
            <div className="flex-1"></div>
            <Button
              variant="ghost"
              onClick={() => {
                setShowNewPost(false);
                setPostText('');
                setTags('');
              }}
              className="rounded-xl"
            >
              Отмена
            </Button>
            <Button
              onClick={handlePost}
              disabled={!postText.trim()}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              Опубликовать
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {mockPosts.map((post) => (
          <Card
            key={post.id}
            className={`p-4 ${theme === 'dark' ? 'bg-[#252837] border-[#2d3142]' : 'bg-white border-gray-200'}`}
          >
            <div className="flex gap-3 mb-3">
              <Avatar className="w-12 h-12 flex-shrink-0">
                <AvatarImage src={post.user?.avatar_url} />
                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
                  {post.user?.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {post.user?.username}
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {formatTime(post.created_at)}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Icon name="MoreVertical" size={18} />
                  </Button>
                </div>
              </div>
            </div>

            <p className={`mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{post.content}</p>

            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2 mb-3 flex-wrap">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`text-xs px-3 py-1 rounded-full ${
                      theme === 'dark'
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'bg-blue-50 text-blue-600'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className={`flex items-center gap-6 pt-3 border-t ${
              theme === 'dark' ? 'border-[#2d3142]' : 'border-gray-200'
            }`}>
              <button
                className={`flex items-center gap-2 ${
                  theme === 'dark' ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-500'
                } transition-colors`}
              >
                <Icon name="Heart" size={20} />
                <span className="text-sm">{post.likes_count}</span>
              </button>
              <button
                className={`flex items-center gap-2 ${
                  theme === 'dark' ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-500'
                } transition-colors`}
              >
                <Icon name="MessageCircle" size={20} />
                <span className="text-sm">{post.comments_count}</span>
              </button>
              <button
                className={`flex items-center gap-2 ${
                  theme === 'dark' ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-500'
                } transition-colors`}
              >
                <Icon name="Share2" size={20} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
