import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import {EthBlock} from "./ethBlock.model"

@Entity_()
export class EthTransaction {
  constructor(props?: Partial<EthTransaction>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("text", {nullable: false})
  hash!: string

  @Column_("int4", {nullable: false})
  nonce!: number

  @Column_("text", {nullable: true})
  blockHash!: string | undefined | null

  @Index_()
  @ManyToOne_(() => EthBlock, {nullable: true})
  blockNumber!: EthBlock | undefined | null

  @Column_("int4", {nullable: true})
  transactionIndex!: number | undefined | null

  @Column_("text", {nullable: false})
  from!: string

  @Column_("text", {nullable: false})
  to!: string

  @Column_("text", {nullable: true})
  value!: string | undefined | null

  @Column_("text", {nullable: true})
  gasPrice!: string | undefined | null

  @Column_("int4", {nullable: true})
  gas!: number | undefined | null

  @Column_("text", {nullable: true})
  input!: string | undefined | null
}
