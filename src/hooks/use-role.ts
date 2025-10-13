import { useState } from "react";

export function useRole(roleUser: "ADMIN" | "USER") {
  const [role, setRole] = useState<"ADMIN" | "USER">(roleUser);

  return [role, setRole];
}
