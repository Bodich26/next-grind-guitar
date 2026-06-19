import { Logo } from "@/shared";

export const AuthWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />

      {/* Декоративные световые пятна */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] -translate-y-1/3" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[130px] translate-y-1/3" />

      <div className="w-full max-w-[1020px] flex flex-col lg:flex-row rounded-3xl overflow-hidden border border-zinc-800/80 shadow-2xl relative z-10 bg-zinc-900/95 backdrop-blur-xl">
        {/* Левая декоративная панель */}
        <div className="hidden lg:flex lg:w-5/12 relative flex-col justify-between p-10 xl:p-14 bg-gradient-to-br from-zinc-900 to-zinc-950">
          {/* Дополнительное свечение */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10" />

          <div className="relative z-10">
            <Logo className="mb-12" />
            <h1 className="text-5xl xl:text-6xl font-black mb-6">
              Стань Лучше
              <br />
              Сегодня.
            </h1>

            <p className="text-zinc-400 text-lg max-w-xs">
              Твоё пространство для ежедневного гитарного прогресса
            </p>
          </div>

          {/* Нижний блок */}
          <div className="relative z-10 pt-8">
            <ul className="flex gap-5 text-sm text-ring">
              <li>Техника</li>
              <li>Рифы</li>
              <li>Аккорды</li>
              <li>Практика</li>
            </ul>
          </div>
        </div>

        {/* Правая панель — форма (светлее) */}
        <div className="flex-1 flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-zinc-900">
          <div className="w-full max-w-md mx-auto">
            {/* Мобильный заголовок */}
            <Logo className="lg:hidden mb-12" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
