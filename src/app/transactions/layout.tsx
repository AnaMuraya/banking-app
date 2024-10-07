import { Tabs } from '@/components'

export default function TransactionsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Tabs>{children}</Tabs>
    </>
  )
}
