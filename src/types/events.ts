import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'

export type AccountId = Uint8Array;
export type Balance = bigint;

export class CurrenciesTransferEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Currencies.Transfer')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  Transfer succeeded (from, to, value, fees).
   */
  get transferEventData(): [AccountId, AccountId, Balance] {
    return this._chain.decodeEvent(this.event)
  }

}
