import { createFileRoute, Link } from "@tanstack/react-router";
import { bookBySlug } from "@/data/library";
import { Disclaimer, useCopy } from "@/components/bits";

export const Route = createFileRoute("/library/$slug")({
  component: BookPage,
});

function BookPage() {
  const { slug } = Route.useParams();
  const { t, tx } = useCopy();
  const book = bookBySlug(slug);
  if (!book) return <p>{t("common.notFound")}</p>;
  return (
    <article className="grid gap-4">
      <Link to="/library" className="text-green">
        {t("common.back")}
      </Link>
      <h1 className="font-display text-4xl">{tx(book.en, book.ur)}</h1>
      {book.chapters.map((chapter) => (
        <section key={chapter.en} className="card p-4">
          <h2 className="font-display text-2xl">{tx(chapter.en, chapter.ur)}</h2>
          <div className="mt-2 grid gap-3">
            {tx(chapter.bodyEn.join("\n"), chapter.bodyUr.join("\n"))
              .split("\n")
              .map((p) => (
                <p key={p}>{p}</p>
              ))}
          </div>
        </section>
      ))}
      <Disclaimer />
    </article>
  );
}
