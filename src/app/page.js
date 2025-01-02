import KanbanBoard from "./kabam_board/KanbanBoard";

export default function Home() {
  return (
    <div className="grid grid-cols-[auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <KanbanBoard />
    </div>
  );
}
