import type { BusinessSettings } from "@/lib/api/types";

/** Confirmed shop identity, used only if the business API cannot be reached. */
export const FALLBACK_BUSINESS: BusinessSettings = {
  business_name: "Bassaddict Sounds KE",
  tagline: "ADDICTED TO BASS. DRIVEN BY SOUND.",
  phone: "0794069405",
  whatsapp_number: "0794069405",
  email: "bassaddictsounds@gmail.com",
  address: "Ground Floor, New Loitoktok House, Luthuli Avenue, Nairobi, Kenya",
};

export const DEVELOPER = {
  credit: "Designed & Developed by Sam Gates",
  courtesy: "Developer Courtesy",
  whatsappDisplay: "+254111374435",
  whatsappDigits: "254111374435",
  email: "sangates.dev@gmail.com",
  emailAlt: "samgates.developer@gmail.com",
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/build", label: "Build My System" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
