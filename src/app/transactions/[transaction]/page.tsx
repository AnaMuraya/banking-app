import { Deposit, FilterWrap, TabItem, Transfer, Withdraw } from '@/components'
import { TransactionTypes } from '@/types'

export default function Page({ params }: { params: { transaction: TransactionTypes } }) {
  return (
    <>
      <FilterWrap tab={params.transaction}>
        <div>
          <TabItem activeTab={params.transaction} content={TransactionTypes.deposit}>
            <Deposit />
          </TabItem>
          <TabItem activeTab={params.transaction} content={TransactionTypes.withdraw}>
            <Withdraw />
          </TabItem>
          <TabItem activeTab={params.transaction} content={TransactionTypes.transfer}>
            <Transfer />
          </TabItem>
        </div>
      </FilterWrap>
    </>
  )
}
