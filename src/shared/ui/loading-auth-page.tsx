import { Card, Container } from "@/shared";
import { Loader2 } from "lucide-react";

interface LoadingPageProps {
  title?: string;
  text?: string;
}

export const LoadingAuthPage = ({
  title = "Загрузка страницы",
  text = "Подгружаем твои упражнения и прогресс",
}: LoadingPageProps) => {
  return (
    <Card className="max-w-[500px] w-full p-8 md:p-10 border border-border bg-card rounded-xl shadow-sm flex flex-col items-center relative overflow-hidden">
      {/* Фоновый мягкий свечение-акцент */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

      {/* Иконка лоадера в стиле Shadcn/Lucide */}
      <div className="p-4 rounded-full bg-primary/10 border border-primary/20 mb-6 text-primary">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>

      {/* Заголовок */}
      <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
        {title}
      </h3>

      {/* Описание */}
      <p className="text-sm md:text-base text-muted-foreground max-w-[360px]">
        {text}
      </p>
    </Card>
  );
};
