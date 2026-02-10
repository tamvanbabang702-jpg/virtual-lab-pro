import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, FlaskConical, BookOpen, BarChart3, User } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';

const tabs = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/lab', icon: FlaskConical, label: 'Lab' },
  { path: '/experiments', icon: BookOpen, label: 'Experiments' },
  { path: '/progress', icon: BarChart3, label: 'Progress' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { loadFromStorage, updateStreak } = useAppStore();

  useEffect(() => {
    loadFromStorage().then(() => updateStreak());
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 overflow-auto pb-20">
        {children}
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border/50 backdrop-blur-xl">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
          {tabs.map(({ path, icon: Icon, label }) => {
            const active = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`relative flex flex-col items-center justify-center gap-0.5 w-14 h-14 rounded-xl transition-all duration-200 ${
                  active ? 'tab-active text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 1.5} />
                <span className="text-[10px] font-medium">{label}</span>
                {active && (
                  <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.8)]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
