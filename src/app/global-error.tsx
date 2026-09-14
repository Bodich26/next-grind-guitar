"use client";
import React from "react";
import { Button, Card, Container } from "@/shared";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html lang="ru">
      <body className="antialiased min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Container className="flex flex-col items-center justify-center text-center">
          <Card className="max-w-[550px] w-full p-8 md:p-10 border border-border bg-card rounded-xl shadow-sm flex flex-col items-center relative overflow-hidden">
            {/* Фоновый фоновый фокус-акцент */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-destructive/10 rounded-full blur-2xl pointer-events-none" />

            {/* Иконка фатального сбоя */}
            <div className="p-4 rounded-full bg-destructive/10 border border-destructive/20 mb-6 text-destructive">
              <AlertTriangle className="w-10 h-10" />
            </div>

            {/* Заголовок */}
            <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
              Порвалась струна
            </h3>

            {/* Описание ошибки */}
            <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-[420px]">
              Произошел критический сбой системы. Перегруз оказался слишком
              сильным.
            </p>

            {/* Текст ошибки из объекта error */}
            {error?.message && (
              <div className="w-full bg-muted/30 border border-border rounded-lg p-3 text-xs font-mono text-muted-foreground mb-6 truncate max-w-full">
                {error.message}
              </div>
            )}

            {/* Кнопка сброса ошибки */}
            <Button
              onClick={() => reset()}
              className="w-full sm:w-[260px] h-11 rounded-lg gap-2 font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Перенастроить гитару (Сброс)
            </Button>
          </Card>
        </Container>
      </body>
    </html>
  );
}
