import { BuildForm } from "@/components/build-form";
import { getMe } from "@/lib/api/auth";
import { getBusiness } from "@/lib/api/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Build my sound system",
  path: "/build",
  description:
    "Send Bassaddict Sounds KE the vehicle, budget, and the system you want. This is a consultation enquiry, not a checkout.",
});

export default async function BuildPage() {
  const [me, businessResult] = await Promise.all([getMe(), getBusiness()]);

  return (
    <div className="site py-10">
      <p className="label">Custom build</p>
      <h1 className="mt-2 max-w-3xl font-display text-5xl leading-none tracking-wide">
        Build my sound system
      </h1>
      <p className="mt-4 max-w-2xl text-mute">
        Tell the workshop the car, the budget, and what you want from the system: deep
        bass, volume, a clean balance, a full upgrade, or a competition setup. This is
        a custom-build enquiry. There is no automatic recommendation and no payment.
      </p>
      <div className="mt-8 max-w-3xl">
        <BuildForm
          signedIn={me.ok}
          whatsappNumber={businessResult.business.whatsapp_number}
        />
      </div>
    </div>
  );
}
