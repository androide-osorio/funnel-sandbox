import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Funnel inspector</h1>
      <p>check user files in indexed DB. If there are funnels, show a list</p>
      <p>if there are no funnels, show an upload area</p>
    </main>
  )
}
