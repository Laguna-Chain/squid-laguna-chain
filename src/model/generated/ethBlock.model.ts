import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {EthTransaction} from "./ethTransaction.model"

@Entity_()
export class EthBlock {
  constructor(props?: Partial<EthBlock>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("int4", {nullable: true})
  number!: number | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  hash!: string | undefined | null

  @Column_("text", {nullable: false})
  parentHash!: string

  @Column_("int4", {nullable: true})
  baseFeePerGas!: number | undefined | null

  @Column_("text", {nullable: true})
  nonce!: string | undefined | null

  @Column_("text", {nullable: false})
  sha3Uncles!: string

  @Column_("text", {nullable: true})
  logsBloom!: string | undefined | null

  @Column_("text", {nullable: false})
  transactionsRoot!: string

  @Column_("text", {nullable: true})
  stateRoot!: string | undefined | null

  @Column_("text", {nullable: true})
  miner!: string | undefined | null

  @Column_("text", {nullable: true})
  difficulty!: string | undefined | null

  @Column_("text", {nullable: true})
  totalDifficulty!: string | undefined | null

  @Column_("text", {nullable: true})
  extraData!: string | undefined | null

  @Column_("int4", {nullable: true})
  size!: number | undefined | null

  @Column_("int4", {nullable: true})
  gasLimit!: number | undefined | null

  @Column_("int4", {nullable: true})
  gasUsed!: number | undefined | null

  @Column_("int4", {nullable: true})
  timestamp!: number | undefined | null

  @OneToMany_(() => EthTransaction, e => e.blockNumber)
  transactions!: EthTransaction[]

  @Column_("text", {array: true, nullable: true})
  uncles!: (string | undefined | null)[] | undefined | null
}
