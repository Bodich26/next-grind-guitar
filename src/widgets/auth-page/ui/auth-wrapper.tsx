import { Logo } from "@/shared";

export const AuthWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden text-foreground">
      {/* Декоративные мягкие световые пятна (теперь подстраиваются под твой primary цвет) */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[130px] -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] translate-y-1/3 pointer-events-none" />

      {/* Основной контейнер карточки */}
      <div className="w-full max-w-[1020px] flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-border shadow-2xl relative z-10 bg-card/60 backdrop-blur-xl">
        {/* Левая декоративная панель (видна только на десктопах) */}
        <div className="hidden lg:flex lg:w-5/12 relative flex-col justify-between p-10 xl:p-14 bg-muted/30 border-r border-border">
          {/* Мягкое внутреннее свечение акцента */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10">
            <Logo className="mb-12" />
            <h1 className="text-4xl xl:text-5xl font-black tracking-tight leading-none mb-6">
              Стань Лучше
              <br />
              Сегодня.
            </h1>

            <p className="text-muted-foreground text-base max-w-xs leading-relaxed">
              Твоё пространство для ежедневного гитарного прогресса.
            </p>
          </div>

          {/* Нижний блок тегов */}
          <div className="relative z-10 pt-8">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
              <li className="hover:text-primary transition-colors cursor-default">
                Техника
              </li>
              <li className="hover:text-primary transition-colors cursor-default">
                Рифы
              </li>
              <li className="hover:text-primary transition-colors cursor-default">
                Аккорды
              </li>
              <li className="hover:text-primary transition-colors cursor-default">
                Практика
              </li>
            </ul>
          </div>
        </div>

        {/* Правая панель — контентная область для формы (Login / Register) */}
        <div className="flex-1 flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-card">
          <div className="w-full max-w-md mx-auto">
            {/* Мобильный логотип */}
            <Logo className="lg:hidden mb-10" />

            {/* Сюда прокидывается сама форма Clerks / custom */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
