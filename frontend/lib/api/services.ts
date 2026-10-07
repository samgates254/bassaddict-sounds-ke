import { cache } from "react";

import { apiGet } from "@/lib/api/client";
import type { Service } from "@/lib/api/types";

export const getServices = cache(() => apiGet<Service[]>("/services/"));
