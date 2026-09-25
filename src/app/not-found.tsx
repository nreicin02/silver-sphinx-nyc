import Link from "next/link";
export default function NotFound() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-32 text-center md:px-8">
      <p className="wordmark text-6xl">Not here.</p>
      <p className="mt-3 text-muted">That page does not exist, or the piece has found a home.</p>
      <Link href="/shop" className="btn btn-solid mt-8">Shop all pieces</Link>
    </section>
  );
}
