import * as ss58 from '@subsquid/ss58'
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
} from '@subsquid/substrate-processor'
import { Store, TypeormDatabase } from '@subsquid/typeorm-store'
import { In } from 'typeorm'
import { Account, Transfer, Owner, ERC20Transfer } from './model'
import { EventContext } from './types/support'
import * as erc20 from './erc20'

const CONTRACT_ADDRESS = '0x5207202c27b646ceeb294ce516d4334edafbd771f869215cb070ba51dd7e2c72'

const processor = new SubstrateBatchProcessor()
  .setDataSource({
    archive: 'http://gateway:8000/graphql',
  })
  // .addContractsContractEmitted(CONTRACT_ADDRESS, {
  //     data: {
  //         event: {args: true}
  //     }
  // } as const).
  .addEvent('Tokens.Transfer', {
    data: { event: { args: true } },
  } as const)

type Item = BatchProcessorItem<typeof processor>
type Ctx = BatchContext<Store, Item>

processor.run(new TypeormDatabase(), async (ctx) => {
  let transfersData = getTransfers(ctx)

  let accountIds = new Set<string>()
  for (let t of transfersData) {
    accountIds.add(t.from)
    accountIds.add(t.to)
  }

  let accounts = await ctx.store.findBy(Account, { id: In([...accountIds]) }).then((accounts) => {
    return new Map(accounts.map((a) => [a.id, a]))
  })

  let transfers: Transfer[] = []

  for (let t of transfersData) {
    let { id, blockNumber, timestamp, extrinsicHash, amount, fee } = t

    let from = getAccount(accounts, t.from)
    let to = getAccount(accounts, t.to)

    transfers.push(
      new Transfer({
        id,
        blockNumber,
        timestamp,
        extrinsicHash,
        from,
        to,
        amount,
        fee,
      })
    )
  }

  await ctx.store.save(Array.from(accounts.values()))
  await ctx.store.insert(transfers)
})

interface TransferEvent {
  id: string
  blockNumber: number
  timestamp: Date
  extrinsicHash?: string
  from: string
  to: string
  amount: bigint
  fee?: bigint
}

interface TransferRecord {
  id: string
  from?: string
  to?: string
  amount: bigint
  block: number
  timestamp: Date
}

// function extractTransferRecords(ctx: Ctx): TransferRecord[] {
//     let records: TransferRecord[] = [];
//     for (let block of ctx.blocks) {
//         for (let item of block.items) {
//             if (item.name == 'Contracts.ContractEmitted' &&  item.event.args.contract == CONTRACT_ADDRESS) {
//                 let event = erc20.decodeEvent(item.event.args.data);
//                 if (event.__kind == 'Transfer') {
//                     records.push({
//                         id: item.event.id,
//                         from: event.from && ss58.codec(5).encode(event.from),
//                         to: event.to && ss58.codec(5).encode(event.to),
//                         amount: event.value,
//                         block: block.header.height,
//                         timestamp: new Date(block.header.timestamp)
//                     })
//                 }
//             }
//         }
//     }
//     return records
// }

function getTransfers(ctx: Ctx): TransferEvent[] {
  let transfers: TransferEvent[] = []
  const chain = ctx._chain
  for (let block of ctx.blocks) {
    for (let item of block.items) {
      if (item.name == 'Tokens.Transfer') {
        const event = item.event || (ctx as unknown as EventContext).event
        let { from, to, amount }: { from: Uint8Array; to: Uint8Array; amount: bigint } =
          chain.decodeEvent(event)

        transfers.push({
          id: item.event.id,
          blockNumber: block.header.height,
          timestamp: new Date(block.header.timestamp),
          // extrinsicHash: item.event.extrinsic?.hash,
          from: ss58.codec('kusama').encode(from),
          to: ss58.codec('kusama').encode(to),
          amount: amount,
          // fee: item.event.extrinsic?.fee || 0n
        })
      }
    }
  }
  return transfers
}

function getAccount(m: Map<string, Account>, id: string): Account {
  let acc = m.get(id)
  if (acc == null) {
    acc = new Account()
    acc.id = id
    m.set(id, acc)
  }
  return acc
}
