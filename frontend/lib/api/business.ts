import { cache } from "react";

import { apiGet } from "@/lib/api/client";
import { FALLBACK_BUSINESS } from "@/lib/brand";
import type { BusinessSettings } from "@/lib/api/types";

export const getBusiness = cache(async (): Promise<{
  business: BusinessSettings;
  fromApi: boolean;
}> => {
  const result = await apiGet<BusinessSettings>("/business/");
  if (!result.ok) return { business: FALLBACK_BUSINESS, fromApi: false };
  return { business: result.data, fromApi: true };
});
