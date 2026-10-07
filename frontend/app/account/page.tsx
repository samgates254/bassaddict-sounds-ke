import type { Metadata } from "next";
import Link from "next/link";

import { getMe } from "@/lib/api/auth";
import { getMyEnquiries } from "@/lib/api/enquiries";
import { getMyPrices } from "@/lib/api/products";
import { displayName, enquiryTypeLabel, formatWhen, statusLabel } from "@/lib/format";

export const metadata: Metadata = { title: "Account" };

export default async function AccountPage() {
  const me = await getMe();
  if (!me.ok) return null;
  const [prices, enquiries] = await Promise.all([getMyPrices(), getMyEnquiries()]);
  const recent = enquiries.ok ? enquiries.data.slice(0, 3) : [];
  const latest = recent[0];

  return (
    <div>
      <h1 className="break-words font-display text-5xl font-medium tracking-tight">{displayName(me.data)}</h1>
      <p className="mt-2 text-mute">Customer account. Shop management stays in Django Admin.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Summary label="Special prices" value={prices.ok ? String(prices.data.length) : "—"} />
        <Summary label="Enquiries" value={enquiries.ok ? String(enquiries.data.length) : "—"} />
        <Summary label="Phone" value={me.data.phone || "Not set"} />
      </div>
      {!prices.ok || !enquiries.ok ? (
        <p className="mt-4 text-sm text-ember">
          Some account details could not be loaded. Please check your connection and try again.
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="btn btn-ember" href="/account/prices">
          My prices
        </Link>
        <Link className="btn btn-line" href="/account/enquiries">
          My enquiries
        </Link>
        <Link className="btn btn-line" href="/account/profile">
          Profile
        </Link>
      </div>
      <h2 className="mt-10 font-display text-3xl tracking-wide">Latest enquiry</h2>
      {!latest ? (
        <p className="mt-3 text-mute">You have not sent an enquiry yet.</p>
      ) : (
        <article className="mt-4 border-t border-white/10 pt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-2xl tracking-wide">
              {enquiryTypeLabel(latest.enquiry_type)}
            </h3>
            <p className="text-sm text-steel">{statusLabel(latest.status)}</p>
          </div>
          <p className="mt-1 text-sm text-mute">{formatWhen(latest.created_at)}</p>
          <p className="mt-3 line-clamp-4 whitespace-pre-wrap">{latest.message}</p>
        </article>
      )}
      {recent.length > 1 ? (
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {recent.slice(1).map((enquiry) => (
            <li key={enquiry.id} className="flex items-baseline justify-between gap-4 py-3">
              <span>{enquiryTypeLabel(enquiry.enquiry_type)}</span>
              <span className="text-sm text-steel">{statusLabel(enquiry.status)}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-white/10 pt-4">
      <p className="label">{label}</p>
      <p className="mt-2 break-words font-display text-3xl tracking-wide">{value}</p>
    </div>
  );
}
