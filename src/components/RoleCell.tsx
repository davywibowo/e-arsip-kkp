"use client";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";

interface RoleCellProps {
  roleUser: "ADMIN" | "USER";
}

export default function RoleCell(props: RoleCellProps) {
  const { roleUser } = props;
  const [role, setRole] = useState<"ADMIN" | "USER">(roleUser);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Badge
          variant={"default"}
          className={cn(
            role === "ADMIN" ? "bg-blue-500" : "",
            "cursor-pointer"
          )}
        >
          {role}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Change role this user</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={role}
          onValueChange={(e) => setRole(e as typeof role)}
        >
          <DropdownMenuRadioItem value={"ADMIN" as typeof role}>
            Admin
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"USER" as typeof role}>
            User
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
