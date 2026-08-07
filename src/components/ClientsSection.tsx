import { Link } from "@tanstack/react-router";

const WA = "50433635666";

const clientLogos: { imageUrl: string; large?: boolean }[] = [
  { imageUrl: "/__l5e/assets-v1/26cf497f-a2d1-44dc-a7d2-87a74825f41f/client-logo-01.png" },
  { imageUrl: "/__l5e/assets-v1/7839ef73-2c11-4a21-89cf-4c997f8458b1/client-logo-02.png" },
  { imageUrl: "/__l5e/assets-v1/f8a3ed29-fb1e-4a34-832a-374fb61e0ab2/client-logo-03.png" },
  { imageUrl: "/__l5e/assets-v1/094fb102-ab78-41be-9de0-1cff0bbdcc92/client-logo-04.png" },
  { imageUrl: "/__l5e/assets-v1/6184ef41-25d9-4ef4-8a00-20ba7f87c3f4/client-logo-05.png" },
  { imageUrl: "/__l5e/assets-v1/e4bd2fe4-d040-4285-96e0-022a38d53f9c/client-logo-06.png" },
  { imageUrl: "/__l5e/assets-v1/7ed0684b-fba6-4aaa-b9b9-5695ed338426/client-logo-08.png" },
  { imageUrl: "/__l5e/assets-v1/c754dc1a-af78-46f9-98aa-f625094e31ff/client-logo-09.png" },
  { imageUrl: "/__l5e/assets-v1/5bbd4432-1d9c-4820-b7d4-015c4a6f479c/client-logo-10.png" },
  { imageUrl: "/__l5e/assets-v1/61173e2e-3bd1-47f1-a443-9df4a7a41af8/client-logo-11.png" },
  { imageUrl: "/__l5e/assets-v1/6b096d76-d148-4e29-bcd0-9d39c76f0743/client-logo-12.png" },
  { imageUrl: "/__l5e/assets-v1/4068c3ab-801a-4bf3-a15a-7d18c704d369/client-logo-13.png" },
  { imageUrl: "/__l5e/assets-v1/3150e657-9492-46ae-9166-06c94d315749/client-logo-14.png" },
  { imageUrl: "/__l5e/assets-v1/c40e0216-30d3-43c3-97bd-ab286991bd19/client-logo-15.png" },
  { imageUrl: "/__l5e/assets-v1/77d374b4-1bfa-4da9-a269-140caba38f06/client-logo-17.png" },
  { imageUrl: "/__l5e/assets-v1/670f3070-f0de-49c2-a4b3-08efc704b9d3/client-logo-18.png" },
  { imageUrl: "/__l5e/assets-v1/eac7027c-355e-4428-bb2a-da5a4a2efb66/client-logo-19.png" },
  { imageUrl: "/__l5e/assets-v1/e36f8063-cfda-4d81-82a0-b5a6abd25834/client-logo-20.png" },
  { imageUrl: "/__l5e/assets-v1/079ad994-3938-4b49-954b-815052402faa/client-logo-21.png" },
  { imageUrl: "/__l5e/assets-v1/0bb77a98-2197-42a8-a2ec-edf58987e188/client-logo-22.png" },
  { imageUrl: "/__l5e/assets-v1/24ddf52e-0bb2-4b2b-8c33-b5bd883ea6ad/client-logo-23.png" },
  { imageUrl: "/__l5e/assets-v1/15bc66ba-ebd5-401d-bf34-b9a52911c0d4/client-logo-28.png" },
  { imageUrl: "/__l5e/assets-v1/bf075d2c-9748-4fca-b18b-00c42b771ce6/client-logo-29.png" },
  { imageUrl: "/__l5e/assets-v1/87749a35-8047-43e5-8188-a7f39ba2ec7d/client-logo-30.png" },
  { imageUrl: "/__l5e/assets-v1/42393029-2a9e-4bf6-89b3-aac5bd7e89a2/client-logo-35.png" },
  { imageUrl: "/__l5e/assets-v1/1a3d5517-125a-49ec-831e-e3a3d5b6d9d2/client-logo-36.png" },
  { imageUrl: "/__l5e/assets-v1/cd24ed10-ac89-4b4b-86cf-0bf95fba673d/client-logo-37.png" },
  { imageUrl: "/__l5e/assets-v1/c5561c5b-6e18-484f-983c-005ad2a46020/client-logo-38.png" },
  { imageUrl: "/__l5e/assets-v1/543672e8-d56c-4acb-8f54-e65768a26d1c/client-logo-39.png" },
  { imageUrl: "/__l5e/assets-v1/555a9589-2314-4554-8974-da4ba97524a2/client-logo-40.png" },
  { imageUrl: "/__l5e/assets-v1/cd1e5fde-ee2d-4d6e-aecc-32139aa16596/client-logo-41.png", large: true },
];

const stats = [
  { value: "50+", label: "clientes activos" },
  { value: "4", label: "años de experiencia" },
  { value: "6", label: "técnicas de impresión" },
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
          {clientLogos.map((c) => (
            <div
              key={c.imageUrl}
              className="flex h-24 items-center justify-center rounded-xl border border-border bg-white p-4 transition hover:shadow-card-soft"
            >
              <img
                src={c.imageUrl}
                alt=""
                className={`max-h-full max-w-full object-contain transition-transform ${c.large ? "scale-[1.33]" : ""}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
        <div
          className="relative overflow-hidden rounded-3xl px-6 py-12 text-center text-white sm:px-12 sm:py-16"
          style={{
            background:
              "linear-gradient(135deg, var(--brand-magenta) 0%, var(--brand-orange) 50%, var(--brand-cyan) 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              ¿Listo para unirte a nosotros?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-base text-white/90 sm:text-lg">
              Cotiza sin compromiso y descubre cómo podemos llevar tu marca al siguiente nivel.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/portafolio"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-[var(--brand-magenta)] shadow-lg transition hover:bg-white/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Ver Portafolio completo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
