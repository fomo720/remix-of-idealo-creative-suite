const projects = [
  { title: "Menús para restaurantes", tag: "Restaurantes", gradient: "linear-gradient(135deg,#fb923c,#ec4899)" },
  { title: "Stickers de marca", tag: "Emprendedores", gradient: "linear-gradient(135deg,#22d3ee,#8b5cf6)" },
  { title: "Banners sublimados", tag: "Corporativo", gradient: "linear-gradient(135deg,#84cc16,#06b6d4)" },
  { title: "Empaques a medida", tag: "Retail", gradient: "linear-gradient(135deg,#f59e0b,#ef4444)" },
  { title: "Uniformes estampados", tag: "Textil", gradient: "linear-gradient(135deg,#a78bfa,#f472b6)" },
  { title: "Señalética corporativa", tag: "Empresas", gradient: "linear-gradient(135deg,#38bdf8,#818cf8)" },
];

export function Portfolio() {
  return (
    <section id="portafolio" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Portafolio</div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Proyectos que <span className="text-gradient-rainbow">mueven marcas</span>.
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Desde emprendimientos locales hasta cadenas de restaurantes: producción impecable, plazos cumplidos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="aspect-[4/5] w-full" style={{ background: p.gradient }}>
                <div className="flex h-full items-end p-6">
                  <div className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-foreground backdrop-blur">
                    #{String(i + 1).padStart(2, "0")} · {p.tag}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">Producción pesada · acabado premium</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
