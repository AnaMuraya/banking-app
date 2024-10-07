import { Statements, Withdraw } from '@/components'
import { StatementFilters } from '@/types'

export default function Page() {
  return (
    <div>
      <Withdraw />
      <Statements selectedFilter={StatementFilters.withdrawal} title={'Withdraw Statements'} />
    </div>
  )
}
