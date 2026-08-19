import { CheckCircle2, AlertTriangle } from "lucide-react";

interface FormStatusProps {
  error?: string;
  success?: string;
}

export const FormStatus = ({ error, success }: FormStatusProps) => {
  if (!error && !success) return null;

  return (
    <div className="w-full text-sm font-medium transition-all duration-200">
      {/* Блок Успеха */}
      {success && (
        <div className="flex items-center gap-x-2 rounded-md bg-primary/15 p-3 text-primary border border-primary-20">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <p>{success}</p>
        </div>
      )}

      {/* Блок Ошибки */}
      {error && (
        <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-destructive border border-destructive/20">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};
