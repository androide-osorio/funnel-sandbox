export default function FunnelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav>Upper nav will be here</nav>
			<main>
				{children}
			</main>
    </>
  );
}
