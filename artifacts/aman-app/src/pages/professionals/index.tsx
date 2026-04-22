// src/pages/professionals/index.tsx
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "@/contexts/ChatContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { socket } from "@/lib/socket";

const Button = ({ children, onClick, disabled, className }: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);

const Card = ({ children }: any) => <div className="border rounded-lg p-4 shadow-sm bg-white">{children}</div>;
const CardHeader = ({ children }: any) => <div className="mb-2">{children}</div>;
const CardTitle = ({ children }: any) => <h3 className="text-lg font-semibold">{children}</h3>;
const CardContent = ({ children }: any) => <div>{children}</div>;
const Badge = ({ children, variant }: any) => (
  <span className={`inline-block px-2 py-1 text-xs rounded ${variant === 'default' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{children}</span>
);

interface Professional {
  id: number;
  username: string;
  role: string;
  specialty?: string;
  available?: boolean;
}

export default function ProfessionalsPage() {
  const { user } = useAuth();
  const { sendMessage } = useChat();
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [startingChat, setStartingChat] = useState<number | null>(null);
  const [anonymousMode, setAnonymousMode] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!socket.connected) return;

    const handleProfessionals = (data: Professional[]) => {
      setProfessionals(data);
      setLoading(false);
    };

    socket.emit('get professionals');
    socket.on('professionals', handleProfessionals);

    return () => {
      socket.off('professionals', handleProfessionals);
    };
  }, []);

  const toggleAnonymous = (id: number) => {
    setAnonymousMode(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleStartChat = async (professionalId: number) => {
    if (!user) return;
    setStartingChat(professionalId);
    const isAnon = anonymousMode[professionalId] || false;
    const greeting = t.chatSection.greetingMessage + (isAnon ? t.chatSection.greetingAnonymous : '');
    sendMessage(professionalId, greeting, isAnon);
    setTimeout(() => navigate('/chat'), 500);
  };

  if (!user) return <div className="p-6 text-center">{t.chatSection.loginRequired}</div>;
  if (loading) return <div className="p-6 text-center">{t.chatSection.loadingProfessionals}</div>;

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">{t.chatSection.professionals}</h1>
      <p className="text-gray-600 mb-8">{t.chatSection.professionalsDesc}</p>

      {professionals.length === 0 ? (
        <p className="text-center text-gray-500">{t.chatSection.noProfessionals}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {professionals.map((pro) => (
            <Card key={pro.id}>
              <CardHeader>
                <CardTitle>{pro.username}</CardTitle>
                <p className="text-sm text-gray-500">{pro.specialty || t.chatSection.specialty}</p>
              </CardHeader>
              <CardContent>
                <Badge variant={pro.available ? "default" : "secondary"}>
                  {pro.available ? t.chatSection.available : t.chatSection.unavailable}
                </Badge>
                <label className="flex items-center gap-2 mt-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={anonymousMode[pro.id] || false}
                    onChange={() => toggleAnonymous(pro.id)}
                  />
                  {t.chatSection.anonymousOption}
                </label>
                <Button
                  className="w-full mt-4"
                  onClick={() => handleStartChat(pro.id)}
                  disabled={!pro.available || startingChat === pro.id}
                >
                  {startingChat === pro.id ? t.chatSection.starting : t.chatSection.startChat}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}