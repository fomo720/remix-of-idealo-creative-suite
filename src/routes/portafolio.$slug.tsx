import { useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, MessageCircle, Play } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getProjectBySlug, projects } from "@/lib/portfolio-data";

const WHATSAPP = "50433635666";

export const Route = createFileRoute("/portafolio/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Proyecto no encontrado — Idealo" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    const title = `${project.title} — Portafolio Idealo`;
    const description = project.description ?? project.subtitle;
    const meta = [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ];
    if (project.image) {
      meta.push({ property: "og:image", content: project.image });
      meta.push({ name: "twitter:image", content: project.image });
    }
    return { meta };
  },
  component: ProjectDetail,
  notFoundComponent: NotFoundProject,
});

function NotFoundProject() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Proyecto no encontrado</h1>
        <p className="mt-3 text-muted-foreground">Ese proyecto no existe o fue movido.</p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:underline">
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Link>
      </main>
      <Footer />
    </div>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const related = projects.filter((p) => p.type === project.type && p.slug !== project.slug).slice(0, 3);
  const mensaje = `Hola Idealo 👋 Me interesa *${project.title}*. ¿Me pueden cotizar?`;
  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
  const [playingVideo, setPlayingVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    setPlayingVideo(true);
    setTimeout(() => {
      const v = videoRef.current;
      if (v) {
        v.muted = true;
        v.play().catch(() => {});
      }
    }, 20);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <a href={`/portafolio?tipo=${encodeURIComponent(project.type)}`} className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Volver al portafolio
        </a>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div
            className="relative overflow-hidden rounded-3xl border border-border"
            style={{ background: project.bg ?? "#0a0a0a" }}
          >
            <div className="relative aspect-square w-full">
              {project.video && playingVideo ? (
                <video
                  ref={videoRef}
                  src={project.video}
                  poster={project.image}
                  muted
                  playsInline
                  controls
                  autoPlay
                  loop
                  className="absolute inset-0 h-full w-full object-contain bg-black"
                />
              ) : (
                <>
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`absolute inset-0 h-full w-full ${project.fit === "contain" ? "object-contain p-6" : "object-cover"}`}
                    />
                  )}
                  {project.video && (
                    <button
                      type="button"
                      onClick={handlePlay}
                      className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 transition hover:bg-black/20"
                      aria-label="Reproducir video"
                    >
                      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-xl ring-4 ring-white/40 transition group-hover:scale-105">
                        <Play className="h-9 w-9 translate-x-0.5 text-black" fill="currentColor" />
                      </span>
                    </button>
                  )}
                </>
              )}
              {project.watermark && !playingVideo && (
                <div className="absolute left-4 top-4 z-10 rounded-xl bg-white/90 px-3 py-1.5 shadow-lg backdrop-blur">
                  <img src={project.watermark} alt="Idealo" className="h-7 w-auto sm:h-8" />
                </div>
              )}
            </div>
            {project.extraImages && project.extraImages.length > 0 && (
              <div className="grid grid-cols-2 gap-2 border-t border-border/60 p-2">
                {project.extraImages.map((src, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-white/60">
                    <img src={src} alt={`${project.title} — vista ${i + 2}`} className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>


          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {project.tag} · {project.type}
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{project.subtitle}</p>

            {project.description && (
              <p className="mt-6 text-base leading-relaxed text-foreground/90">{project.description}</p>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <ul className="mt-8 space-y-3">
                {project.highlights.map((h: string) => (
                  <li key={h} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-foreground text-background">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-95"
              >
                <MessageCircle className="h-5 w-5" /> Cotizar por WhatsApp
              </a>
              <Link
                to="/cotizar"
                search={{ producto: project.title } as never}
                className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-foreground/40"
              >
                Más opciones de contacto
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold">También en {project.type}</h2>
              <a href={`/portafolio?tipo=${encodeURIComponent(project.type)}`} className="text-sm text-muted-foreground hover:text-foreground">
                Ver todo →
              </a>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/portafolio/$slug"
                  params={{ slug: p.slug }}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden" style={{ background: p.bg }}>
                    {p.image && (
                      <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold">{p.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
