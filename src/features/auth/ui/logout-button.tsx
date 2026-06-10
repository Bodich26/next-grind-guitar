"use client";
import { signOut } from "../api/actions";
import { CustomIcon } from "@/shared";
import { Box } from "@chakra-ui/react";
import { LogOut } from "lucide-react";
type Props = {
  className: string;
};
export const LogoutButton = ({ className }: Props) => {
  const handleLogout = async () => await signOut();

  return (
    <Box as={"div"} className={className}>
      <CustomIcon
        icon={LogOut}
        onClick={handleLogout}
        iconHeight={26}
        iconWidth={26}
      />
    </Box>
  );
};
