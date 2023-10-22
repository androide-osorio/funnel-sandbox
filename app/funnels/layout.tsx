import AppBar from "@/app/components/AppBar";

export default function FunnelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppBar />
			<main className="h-full flex">
				{children}
			</main>
    </>
  );
}
