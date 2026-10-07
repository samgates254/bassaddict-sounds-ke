import type { Metadata } from "next";

import { getMe } from "@/lib/api/auth";
import { displayName } from "@/lib/format";

export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage() {
  const me = await getMe();
  if (!me.ok) return null;
  const user = me.data;
  const profile = user.profile;
  const vehicle = [profile.vehicle_year, profile.vehicle_make, profile.vehicle_model]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-5xl tracking-wide">Profile</h1>
      <p className="mt-3 text-mute">
        This is read-only. Profile editing is not available until a later API phase.
      </p>
      <dl className="mt-8 divide-y divide-line border-y border-line">
        <Row label="Name" value={displayName(user)} />
        <Row label="Email" value={user.email} />
        <Row label="Phone" value={user.phone || "Not set"} />
        <Row label="Location" value={profile.location || "Not set"} />
        <Row label="Vehicle" value={vehicle || "Not set"} />
        <Row label="Notes" value={profile.notes || "None"} />
      </dl>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
      <dt className="label">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
