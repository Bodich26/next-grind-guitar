import { CardDescription, CardHeader, CardTitle } from "@/shared";

type Props = {
  titles: string;
  text: string;
};
export const FormHeader = ({ titles, text }: Props) => {
  return (
    <CardHeader className="space-y-3">
      <CardTitle className="text-3xl font-bold text-center">{titles}</CardTitle>
      <CardDescription className="text-center text-[15px]">
        {text}
      </CardDescription>
    </CardHeader>
  );
};
