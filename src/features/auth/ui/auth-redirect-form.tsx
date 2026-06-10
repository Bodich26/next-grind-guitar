import { Link, Text } from "@chakra-ui/react";

type Props = {
  text: string;
  linkText: string;
  href: string;
};
export const AuthRedirectForm = ({ text, linkText, href }: Props) => {
  return (
    <Text textStyle="sm">
      {text}{" "}
      <Link href={href} color={"rose.700"}>
        [{linkText}]
      </Link>
    </Text>
  );
};
