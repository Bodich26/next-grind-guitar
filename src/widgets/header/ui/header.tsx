import { Container, Logo } from "@/shared";
import { Flame, Trophy } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <Container className="flex justify-between items-center py-4">
        <Logo />
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex items-center gap-2 border px-4 py-2 rounded-xl">
            <Flame className="text-orange-500" size={20} />
            <span className="font-semibold">{10} дней</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-ring">УРОВЕНЬ</div>
              <div className="font-bold text-2xl">{3}</div>
            </div>
            <div className="text-3xl">⭐</div>
          </div>
          <div className="flex items-center gap-2 border px-4 py-2 rounded-xl">
            <Trophy className="text-yellow-400" size={20} />
            <span className="font-bold">{433} XP</span>
          </div>
          <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-zinc-600">
            👤
          </div>
        </div>
      </Container>
    </header>
  );
};
