export default function Page() {
  return (
    <main className="flex flex-1 h-full w-full flex-col items-center justify-between p-4 sm:items-start">
      <div className="text-center sm:items-start sm:text-left">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
          Dashboard
        </h1>
        <h2 className="text-muted-foreground">Last synced</h2>
        <p className="max-w-md text-lg leading-8 text-zinc-600">cards</p>
      </div>
    </main>
  );
}
