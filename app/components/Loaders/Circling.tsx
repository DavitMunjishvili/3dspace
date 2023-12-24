export default function CirclingLoader({ small = false }: { small: boolean }) {
  if (small) {
    return (
      <div className="aspect-square w-4 animate-spin rounded-full border border-indigo-50 border-b-indigo-950"></div>
    );
  }

  return (
    <div className="flex p-4">
      <div className="animate-spin rounded-full border-2 border-indigo-100 border-b-indigo-900 p-4"></div>
    </div>
  );
}
