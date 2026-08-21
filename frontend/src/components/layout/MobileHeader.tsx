export function MobileHeader() {
  return (
    <header className="flex h-14 items-center border-b border-[var(--border)] px-4 md:hidden">
      <button className="text-xl">
        ☰
      </button>

      <span className="ml-3 text-sm font-semibold">
        Pyramid
      </span>
    </header>
  );
}