export type CustomerProfile = {
  location: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number | null;
  notes: string;
};

export type User = {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: "CUSTOMER" | "OWNER" | "DEVELOPER";
  profile: CustomerProfile;
};

export type Category = {
  name: string;
  slug: string;
  description: string;
  sort_order: number;
};

export type CategoryBrief = {
  name: string;
  slug: string;
};

export type ProductImage = {
  image_url: string;
  alt_text: string;
  is_primary: boolean;
  sort_order: number;
};

export type ProductListItem = {
  id: number;
  name: string;
  slug: string;
  brand: string;
  model_number: string;
  category: CategoryBrief;
  public_price: string | null;
  price_type: "FIXED" | "ON_REQUEST" | "CONTACT";
  stock_status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" | "ON_ORDER";
  featured: boolean;
  primary_image: ProductImage | null;
};

export type ProductDetail = ProductListItem & {
  description: string;
  specifications: unknown;
  images: ProductImage[];
};

export type CustomerPrice = {
  product: string;
  product_name: string;
  model_number: string;
  price: string;
  note: string;
};

export type Service = {
  name: string;
  slug: string;
  description: string;
  featured: boolean;
  sort_order: number;
};

export type EnquiryType =
  | "PRODUCT"
  | "INSTALLATION"
  | "DELIVERY"
  | "CUSTOM_BUILD"
  | "GENERAL";

export type Enquiry = {
  id: number;
  enquiry_type: EnquiryType;
  product: string | null;
  quantity: number;
  vehicle: string;
  location: string;
  message: string;
  status: "NEW" | "CONTACTED" | "QUOTED" | "COMPLETED" | "CANCELLED";
  owner_response: string;
  offered_price: string | null;
  delivery_fee: string | null;
  created_at: string;
  updated_at: string;
};

export type BusinessSettings = {
  business_name: string;
  tagline: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  address: string;
};

export type EnquiryDraft = {
  enquiry_type: EnquiryType;
  product?: string | null;
  quantity: number;
  vehicle: string;
  location: string;
  message: string;
};
