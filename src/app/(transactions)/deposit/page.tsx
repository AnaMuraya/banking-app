import { Deposit, Statements } from '@/components'
import { StatementFilters } from '@/types'

export default function Page() {
  return (
    <div>
      <Deposit />
      <Statements selectedFilter={StatementFilters.deposit} title={'Deposit Statements'} />
    </div>
  )
}
