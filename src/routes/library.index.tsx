import { createFileRoute, Link } from "@tanstack/react-router";
import { BOOKS } from "@/data/library";
import { Disclaimer, Ltr, useCopy } from "@/components/bits";

export const Route = createFileRoute("/library/")({
  component: LibraryPage,
});

function LibraryPage() {
  const { t, tx } = useCopy();
  return (
    <div className="grid gap-4">
      <h1 className="font-display text-4xl">{t("library.title")}</h1>
      <p className="text-muted">{t("library.copyright")}</p>
      <div className="grid gap-3">
        {BOOKS.map((book) => (
          <Link key={book.slug} to="/library/$slug" params={{ slug: book.slug }} className="card block p-4">
            <span className="font-display text-2xl">{tx(book.en, book.ur)}</span>
            <span className="mt-1 block text-muted">{tx(book.blurbEn, book.blurbUr)}</span>
            <Ltr>
              <span className="text-sm text-green">{book.minutes} {t("library.minutes")}</span>
            </Ltr>
          </Link>
        ))}
      </div>
      <Disclaimer />
    </div>
  );
}
