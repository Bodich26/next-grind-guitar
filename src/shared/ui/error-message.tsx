type Props = {
  message: string;
  className?: string;
};

export const ErrorMessage = ({ message, className }: Props) => {
  return (
    <div
      className={`font-semibold text-sm md:text-md text-destructive text-center ${className}`}
    >
      {message}
    </div>
  );
};
