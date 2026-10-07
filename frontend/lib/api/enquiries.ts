import { cache } from "react";

import { apiGet } from "@/lib/api/client";
import type { Enquiry } from "@/lib/api/types";

export const getMyEnquiries = cache(() => apiGet<Enquiry[]>("/me/enquiries/", true));
