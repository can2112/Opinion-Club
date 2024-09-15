import ConnectButton from '@/components/ConnectButton'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>WalletConnect App</h1>
      <ConnectButton />
    </main>
  )
}
