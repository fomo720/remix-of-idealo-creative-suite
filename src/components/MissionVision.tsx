import { Target, Eye } from "lucide-react";

export function MissionVision() {
  return (
    <section id="mision-vision" className="border-y border-border bg-card/50 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-14 max-w-2xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Quiénes somos
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Nuestra <span className="text-gradient-rainbow">misión</span> y{" "}
            <span className="text-gradient-rainbow">visión</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:shadow-elegant">
            <div
              className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-30"
              style={{ background: "var(--brand-pink)" }}
            />
            <div className="relative">
              <div
                className="mb-5 grid h-12 w-12 place-items-center rounded-2xl text-white shadow-elegant"
                style={{ background: "var(--brand-pink)" }}
              >
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold leading-tight">Misión</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Convertir las ideas de nuestros clientes en piezas gráficas reales y
                memorables, ofreciendo soluciones de impresión y diseño profesional
                que ayuden a marcas, negocios y emprendedores de Honduras a comunicar,
                crecer y destacarse.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:shadow-elegant">
            <div
              className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-30"
              style={{ background: "var(--brand-blue)" }}
            />
            <div className="relative">
              <div
                className="mb-5 grid h-12 w-12 place-items-center rounded-2xl text-white shadow-elegant"
                style={{ background: "var(--brand-blue)" }}
              >
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold leading-tight">Visión</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Ser la imprenta y estudio creativo de referencia en Honduras,
                reconocidos por la calidad de nuestro trabajo, la atención cercana a
                cada cliente y la capacidad de hacer realidad cualquier idea —
                grande o pequeña— con un estándar profesional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
