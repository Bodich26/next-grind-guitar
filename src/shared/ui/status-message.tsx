type Props = {
  message: string;
  className?: string;
};

export const StatusMessage = ({ message, className }: Props) => {
  return (
    <div className={`text-sm text-muted-foreground text-center ${className}`}>
      {message}
    </div>
  );
};
