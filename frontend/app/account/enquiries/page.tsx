import type { Metadata } from "next";
import Link from "next/link";

import { EmptyState } from "@/components/empty-state";
import { EnquiryForm } from "@/components/enquiry-form";
import { ErrorState } from "@/components/error-state";
import { getBusiness } from "@/lib/api/business";
import { getMyEnquiries } from "@/lib/api/enquiries";
import { enquiryTypeLabel, formatKes, formatWhen, statusLabel } from "@/lib/format";

export const metadata: Metadata = { title: "My enquiries" };

export default async function EnquiriesPage() {
  const [enquiries, businessResult] = await Promise.all([getMyEnquiries(), getBusiness()]);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
      <div>
        <h1 className="font-display text-5xl font-medium tracking-tight">My enquiries</h1>
        <p className="mt-3 text-mute">Only enquiries sent from this account.</p>
        <div className="mt-6">
          {!enquiries.ok ? (
            <ErrorState title="Unable to load your enquiries.">
              <p>Please check your connection and try again.</p>
            </ErrorState>
          ) : enquiries.data.length === 0 ? (
            <EmptyState title="No enquiries yet.">
              <p>Send one from a product, the build form, or the form on this page.</p>
            </EmptyState>
          ) : (
            <ul className="grid gap-4">
              {enquiries.data.map((enquiry) => (
                <li key={enquiry.id} className="border-t border-white/10 py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-display text-2xl tracking-wide">
                      {enquiryTypeLabel(enquiry.enquiry_type)}
                    </h2>
                    <p className="text-sm text-steel">{statusLabel(enquiry.status)}</p>
                  </div>
                  <p className="mt-1 text-sm text-mute">{formatWhen(enquiry.created_at)}</p>
                  {enquiry.product ? (
                    <p className="mt-3 text-sm">
                      Product:{" "}
                      <Link className="underline" href={`/products/${enquiry.product}`}>
                        {enquiry.product}
                      </Link>
                    </p>
                  ) : null}
                  {enquiry.vehicle ? <p className="text-sm">Vehicle: {enquiry.vehicle}</p> : null}
                  {enquiry.location ? <p className="text-sm">Location: {enquiry.location}</p> : null}
                  <p className="mt-3 whitespace-pre-wrap">{enquiry.message}</p>
                  {enquiry.owner_response ? (
                    <p className="mt-4 border-t border-line pt-3 text-sm">
                      <span className="label">Workshop reply</span>
                      <span className="mt-2 block whitespace-pre-wrap">{enquiry.owner_response}</span>
                    </p>
                  ) : null}
                  <p className="mt-3 text-sm text-steel">
                    Offered price: {formatKes(enquiry.offered_price) ?? "Not quoted"}
                    <span className="mx-2">·</span>
                    Delivery fee: {formatKes(enquiry.delivery_fee) ?? "Not quoted"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <EnquiryForm
        signedIn
        whatsappNumber={businessResult.business.whatsapp_number}
        nextPath="/account/enquiries"
      />
    </div>
  );
}
