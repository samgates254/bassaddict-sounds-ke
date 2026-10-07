import { cache } from "react";

import { apiGet } from "@/lib/api/client";
import type { User } from "@/lib/api/types";

export const getMe = cache(() => apiGet<User>("/auth/me/", true));
