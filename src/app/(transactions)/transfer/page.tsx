import { Statements, Transfer } from '@/components'
import { StatementFilters } from '@/types'

export default function Page() {
  return (
    <div>
      <Transfer />
      <Statements selectedFilter={StatementFilters.transfer} title={'Transfer Statements'} />
    </div>
  )
}
