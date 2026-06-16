import { Button, CardFooter } from "@/shared";
import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  isLoading: boolean;
  linkRedirect: string;
  actionError: string;
  actionSuccess: string;
  buttonText: string;
  buttonActionText: string;
  descriptionText: string;
  linkText: string;
  buttonIcon?: LucideIcon;
};

export const FormFooter = (props: Props) => {
  return (
    <CardFooter className="flex flex-col gap-4 pt-4 bg-transparent border-0 mt-5">
      <Button
        type="submit"
        disabled={props.isLoading}
        className="w-full h-12 font-semibold rounded-2xl text-base transition-all"
      >
        {props.isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            {props.buttonActionText}
          </div>
        ) : (
          <>
            {props.buttonText}
            {props.buttonIcon && <props.buttonIcon className="ml-2 h-4 w-4" />}
          </>
        )}
      </Button>
      <div className="text-center text-sm pt-2">
        {props.descriptionText}{" "}
        <Link
          href={props.linkRedirect}
          className="text-primary font-medium transition-colors"
        >
          {props.linkText}
        </Link>
      </div>
      {props.actionSuccess && (
        <div className="text-primary text-sm text-center">
          {props.actionSuccess}
        </div>
      )}
      {props.actionError && (
        <div className="text-destructive text-sm text-center">
          {props.actionError}
        </div>
      )}
    </CardFooter>
  );
};
