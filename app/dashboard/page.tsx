export default function Page() {
  return (
    <div className="flex flex-col h-full flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-white">
      <main className="flex flex-1 h-full w-full flex-col items-center justify-between p-4 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Dashboard
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            cards
          </p>
        </div>
      </main>
    </div>
  );
}
