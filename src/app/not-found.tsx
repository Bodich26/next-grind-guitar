import Link from "next/link";
import { PUBLIC_ROUTES } from "@/../routes";
import { Button, Card, Container, Logo } from "@/shared";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-background text-foreground flex items-center justify-center py-12">
      <Container className="flex flex-col items-center justify-center text-center">
        <Card className="max-w-[550px] w-full p-8 md:p-10 border border-border bg-card rounded-xl shadow-sm flex flex-col items-center relative overflow-hidden">
          {/* Декоративный фоновый акцент */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

          {/* Иконка в гитарном стиле */}
          <Logo />

          {/* Число 404 */}
          <span className="text-6xl md:text-7xl font-extrabold font-mono text-primary tracking-tight mb-2">
            404
          </span>

          <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
            Зажгли не ту струну
          </h3>

          <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-[400px]">
            Потерялись в медиаторном тумане? Такой страницы или гитарного риффа
            в проекте Grind Guitar не существует.
          </p>

          {/* Кнопка возврата */}
          <Button
            asChild
            className="w-full sm:w-[260px] h-11 rounded-lg gap-2 font-medium"
          >
            <Link href={PUBLIC_ROUTES.HOME}>
              <Home className="w-4 h-4" />
              На главную сцену
            </Link>
          </Button>
        </Card>
      </Container>
    </section>
  );
}
