"use client";

import { FC } from "react";
import { authenticationSignOutAction } from "@/app/actions/services/authAction";
import { FiLogOut } from "react-icons/fi";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export const DropDownContent: FC = () => {
  return (
    <DropdownMenuContent side="right">
      <DropdownMenuItem
        className="flex justify-between"
        onClick={() => authenticationSignOutAction()}
      >
        Sair <FiLogOut />
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
