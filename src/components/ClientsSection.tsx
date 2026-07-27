import logo1 from "@/assets/clients/logo-1.png.asset.json";
import logo2 from "@/assets/clients/logo-2.png.asset.json";
import logo3 from "@/assets/clients/logo-3.png.asset.json";
import logo4 from "@/assets/clients/logo-4.png.asset.json";
import logo5 from "@/assets/clients/logo-5.png.asset.json";
import logo6 from "@/assets/clients/logo-6.png.asset.json";
import logo7 from "@/assets/clients/logo-7.png.asset.json";
import logo8 from "@/assets/clients/logo-8.png.asset.json";
import logo9 from "@/assets/clients/logo-9.png.asset.json";
import logo10 from "@/assets/clients/logo-10.png.asset.json";
import logo11 from "@/assets/clients/logo-11.png.asset.json";
import logo12 from "@/assets/clients/logo-12.png.asset.json";
import logo13 from "@/assets/clients/logo-13.png.asset.json";
import logo14 from "@/assets/clients/logo-14.png.asset.json";
import logo15 from "@/assets/clients/logo-15.png.asset.json";
import logo16 from "@/assets/clients/logo-16.png.asset.json";
import logo17 from "@/assets/clients/logo-17.png.asset.json";
import logo18 from "@/assets/clients/logo-18.png.asset.json";
import logo19 from "@/assets/clients/logo-19.png.asset.json";
import logo20 from "@/assets/clients/logo-20.png.asset.json";
import logo21 from "@/assets/clients/logo-21.png.asset.json";
import logo22 from "@/assets/clients/logo-22.png.asset.json";
import logo23 from "@/assets/clients/logo-23.png.asset.json";
import logo24 from "@/assets/clients/logo-24.png.asset.json";
import logo25 from "@/assets/clients/logo-25.png.asset.json";
import logo26 from "@/assets/clients/logo-26.png.asset.json";
import logo27 from "@/assets/clients/logo-27.png.asset.json";
import logo28 from "@/assets/clients/logo-28.png.asset.json";
import logo29 from "@/assets/clients/logo-29.png.asset.json";
import logo30 from "@/assets/clients/logo-30.png.asset.json";
import logo31 from "@/assets/clients/logo-31.png.asset.json";
import logo32 from "@/assets/clients/logo-32.png.asset.json";
import logo33 from "@/assets/clients/logo-33.png.asset.json";
import logo34 from "@/assets/clients/logo-34.png.asset.json";
import logo35 from "@/assets/clients/logo-35.png.asset.json";
import logo36 from "@/assets/clients/logo-36.png.asset.json";
import logo37 from "@/assets/clients/logo-37.png.asset.json";
import logo38 from "@/assets/clients/logo-38.png.asset.json";
import logo39 from "@/assets/clients/logo-39.png.asset.json";
import logo40 from "@/assets/clients/logo-40.png.asset.json";

const clientLogos: { imageUrl: string }[] = [
  logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10,
  logo11, logo12, logo13, logo14, logo15, logo16, logo17, logo18, logo19, logo20,
  logo21, logo22, logo23, logo24, logo25, logo26, logo27, logo28, logo29, logo30,
  logo31, logo32, logo33, logo34, logo35, logo36, logo37, logo38, logo39, logo40,
].map((a) => ({ imageUrl: a.url }));

const stats = [
  { value: "50+", label: "clientes activos" },
  { value: "5+", label: "años de experiencia" },
  { value: "8", label: "técnicas de impresión" },
];

export function ClientsSection() {
  return (
    <section id="clientes" className="bg-background">
      {/* Banner en gradiente Idealo */}
      <div
        className="relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(135deg, var(--brand-magenta) 0%, var(--brand-cyan) 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Empresas que confían en Idealo
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
            Desde pequeños negocios hasta grandes marcas, cientos de empresas
            nos eligen para llevar su imagen al siguiente nivel.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-full border border-white/25 bg-white/15 px-5 py-2 text-sm font-semibold backdrop-blur"
              >
                <span className="font-bold">{s.value}</span>{" "}
                <span className="font-normal text-white/90">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grilla de logos */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="mb-10 text-center">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Nuestros clientes
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Marcas que ya trabajan con nosotros
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {clientLogos.map((c, i) => (
            <div
              key={i}
              className="flex h-24 items-center justify-center rounded-xl border border-border bg-white p-4 transition hover:shadow-card-soft"
            >
              <img
                src={c.imageUrl}
                alt=""
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
