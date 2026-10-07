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
    <div className="site grid gap-16 py-16 md:py-24 lg:grid-cols-12">
      <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
        <p className="label">Custom build</p>
        <h1 className="poster mt-5 font-display text-[clamp(3.2rem,6vw,5.6rem)]">
          Tell us what you're driving.
        </h1>
        <p className="mt-8 max-w-sm font-display text-2xl font-medium tracking-tight sm:text-3xl">
          We'll help you build the sound.
        </p>
        <p className="mt-6 max-w-sm text-mute">
          The car, the budget, and what you want from the system. This is a consultation. There is no automatic recommendation and no payment.
        </p>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        <BuildForm
          signedIn={me.ok}
          whatsappNumber={businessResult.business.whatsapp_number}
        />
      </div>
    </div>
  );
}
