export default function Page() {
  return (
    <div className="flex flex-col h-full flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 h-full w-full flex-col items-center justify-between p-4 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
            Dashboard
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600">
            cards
          </p>
        </div>
      </main>
    </div>
  );
}
