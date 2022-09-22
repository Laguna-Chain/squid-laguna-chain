import { bool, _void, str, u32, Enum, Struct, Vector } from "scale-ts"
// import { DecodedEvent } from '@polkadot/api-contract/types';
import { Abi } from '@polkadot/api-contract';
import { ApiPromise, WsProvider } from '@polkadot/api';

// Construct
const testFn = async () => {
  const wsProvider = new WsProvider('wss://laguna-chain-dev.hydrogenx.tk');
  const api = await ApiPromise.create({ provider: wsProvider });


  const ADDR = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

  // Retrieve the last timestamp
  const now = await api.query.timestamp.now();
  console.log("now: ", now);

  const test = await api.query.tokens.accounts("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY", "NativeToken")
  console.log("test: ", test["free"].toHuman());

  // console.log("api.query.tokens.accounts: ", );
  // Retrieve the account balance & nonce via the system module
  // const { nonce, data: balance } = await api.query.system.account(ADDR);

};
testFn()


const erc20ABI = {
  "contract": {
    "authors": [
      "unknown"
    ],
    "name": "ERC20",
    "version": "0.0.1"
  },
  "metadataVersion": "0.1.0",
  "source": {
    "compiler": "solang 0.1.12",
    "hash": "0xd11024c360b63795261aed52a67a8b4e23b4a852ca482352747c6b5bf3888ec2",
    "language": "Solidity 0.1.12",
    "wasm": ""
  },
  "spec": {
    "constructors": [
      {
        "args": [
          {
            "name": "_name",
            "type": {
              "display_name": [
                "String"
              ],
              "type": 1
            }
          },
          {
            "name": "_symbol",
            "type": {
              "display_name": [
                "String"
              ],
              "type": 1
            }
          },
          {
            "name": "_initialSupply",
            "type": {
              "display_name": [
                "u256"
              ],
              "type": 3
            }
          }
        ],
        "docs": [
          ""
        ],
        "name": "new",
        "selector": "0x835a15cb"
      }
    ],
    "events": [
      {
        "args": [
          {
            "indexed": true,
            "name": "from",
            "type": {
              "display_name": [
                "AccountId"
              ],
              "type": 5
            }
          },
          {
            "indexed": true,
            "name": "to",
            "type": {
              "display_name": [
                "AccountId"
              ],
              "type": 5
            }
          },
          {
            "indexed": false,
            "name": "value",
            "type": {
              "display_name": [
                "u256"
              ],
              "type": 3
            }
          }
        ],
        "docs": [
          ""
        ],
        "name": "Transfer"
      },
      {
        "args": [
          {
            "indexed": true,
            "name": "owner",
            "type": {
              "display_name": [
                "AccountId"
              ],
              "type": 5
            }
          },
          {
            "indexed": true,
            "name": "spender",
            "type": {
              "display_name": [
                "AccountId"
              ],
              "type": 5
            }
          },
          {
            "indexed": false,
            "name": "value",
            "type": {
              "display_name": [
                "u256"
              ],
              "type": 3
            }
          }
        ],
        "docs": [
          ""
        ],
        "name": "Approval"
      }
    ],
    "messages": [
      {
        "args": [],
        "docs": [
          ""
        ],
        "mutates": false,
        "name": "name",
        "payable": false,
        "return_type": {
          "display_name": [
            "String"
          ],
          "type": 1
        },
        "selector": "0x06fdde03"
      },
      {
        "args": [],
        "docs": [
          ""
        ],
        "mutates": false,
        "name": "symbol",
        "payable": false,
        "return_type": {
          "display_name": [
            "String"
          ],
          "type": 1
        },
        "selector": "0x95d89b41"
      },
      {
        "args": [],
        "docs": [
          ""
        ],
        "mutates": false,
        "name": "decimals",
        "payable": false,
        "return_type": {
          "display_name": [
            "u8"
          ],
          "type": 2
        },
        "selector": "0x313ce567"
      },
      {
        "args": [],
        "docs": [
          ""
        ],
        "mutates": false,
        "name": "totalSupply",
        "payable": false,
        "return_type": {
          "display_name": [
            "u256"
          ],
          "type": 3
        },
        "selector": "0x18160ddd"
      },
      {
        "args": [
          {
            "name": "",
            "type": {
              "display_name": [
                "AccountId"
              ],
              "type": 5
            }
          }
        ],
        "docs": [
          ""
        ],
        "mutates": false,
        "name": "balanceOf",
        "payable": false,
        "return_type": {
          "display_name": [
            "u256"
          ],
          "type": 3
        },
        "selector": "0x70a08231"
      },
      {
        "args": [
          {
            "name": "",
            "type": {
              "display_name": [
                "AccountId"
              ],
              "type": 5
            }
          },
          {
            "name": "",
            "type": {
              "display_name": [
                "AccountId"
              ],
              "type": 5
            }
          }
        ],
        "docs": [
          ""
        ],
        "mutates": false,
        "name": "allowance",
        "payable": false,
        "return_type": {
          "display_name": [
            "u256"
          ],
          "type": 3
        },
        "selector": "0xdd62ed3e"
      },
      {
        "args": [
          {
            "name": "to",
            "type": {
              "display_name": [
                "AccountId"
              ],
              "type": 5
            }
          },
          {
            "name": "value",
            "type": {
              "display_name": [
                "u256"
              ],
              "type": 3
            }
          }
        ],
        "docs": [
          ""
        ],
        "mutates": true,
        "name": "transfer",
        "payable": false,
        "return_type": {
          "display_name": [
            "bool"
          ],
          "type": 6
        },
        "selector": "0xa9059cbb"
      },
      {
        "args": [
          {
            "name": "spender",
            "type": {
              "display_name": [
                "AccountId"
              ],
              "type": 5
            }
          },
          {
            "name": "value",
            "type": {
              "display_name": [
                "u256"
              ],
              "type": 3
            }
          }
        ],
        "docs": [
          ""
        ],
        "mutates": true,
        "name": "approve",
        "payable": false,
        "return_type": {
          "display_name": [
            "bool"
          ],
          "type": 6
        },
        "selector": "0x095ea7b3"
      },
      {
        "args": [
          {
            "name": "from",
            "type": {
              "display_name": [
                "AccountId"
              ],
              "type": 5
            }
          },
          {
            "name": "to",
            "type": {
              "display_name": [
                "AccountId"
              ],
              "type": 5
            }
          },
          {
            "name": "value",
            "type": {
              "display_name": [
                "u256"
              ],
              "type": 3
            }
          }
        ],
        "docs": [
          ""
        ],
        "mutates": true,
        "name": "transferFrom",
        "payable": false,
        "return_type": {
          "display_name": [
            "bool"
          ],
          "type": 6
        },
        "selector": "0x23b872dd"
      }
    ]
  },
  "storage": {
    "struct": {
      "fields": [
        {
          "layout": {
            "cell": {
              "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
              "ty": 1
            }
          },
          "name": "name"
        },
        {
          "layout": {
            "cell": {
              "key": "0x0000000000000000000000000000000000000000000000000000000000000001",
              "ty": 1
            }
          },
          "name": "symbol"
        },
        {
          "layout": {
            "cell": {
              "key": "0x0000000000000000000000000000000000000000000000000000000000000002",
              "ty": 2
            }
          },
          "name": "decimals"
        },
        {
          "layout": {
            "cell": {
              "key": "0x0000000000000000000000000000000000000000000000000000000000000003",
              "ty": 3
            }
          },
          "name": "totalSupply"
        }
      ]
    }
  },
  "types": [
    {
      "def": {
        "primitive": "str"
      }
    },
    {
      "def": {
        "primitive": "u8"
      }
    },
    {
      "def": {
        "primitive": "u256"
      }
    },
    {
      "def": {
        "array": {
          "len": 32,
          "type": 2
        }
      }
    },
    {
      "def": {
        "composite": {
          "fields": [
            {
              "type": 4
            }
          ]
        }
      },
      "path": [
        "AccountId"
      ]
    },
    {
      "def": {
        "primitive": "bool"
      }
    }
  ]
}

const myCodec = Struct({
  args: Vector(Struct({
    indexed: bool,
    name: str,
    type: Struct({
      display_name: Vector(str),
      type: u32
    })
  })),
  docs: Vector(str),
  name: str
});

const myCodec2 = Struct({
  id: u32,
  name: str,
  friendIds: Vector(u32),
  event: Enum({
    _void,
    one: str,
    many: Vector(str),
    allOrNothing: bool,
  }),
})

const encodedCodec2 = Buffer.from(myCodec2.enc({
  event: { tag: "one", value: 5 },
  name: "Some name",
  id: 100,
  friendIds: [1, 2, 3],
})).toString('hex')

// console.log(myCodec2.dec(myCodec2.enc({
//   event: { tag: "one", value: 5 },
//   name: "Some name",
//   id: 100,
//   friendIds: [1, 2, 3],
// })))
const test = [ 255,
  255,
  99,
  167,
  179,
  182,
  224,
  13,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0]

  // let hex = Buffer.from(test).toString('hex');
  // console.log("hex: ", hex)


const abi =  new Abi(erc20ABI);
// 00000064a7b3b6e00d000000000000000000000000000000000000000000000000
// 00000064a7b3b6e00d000000000000000000000000000000000000000000000000
// console.log("buffer: ", Buffer.from("00000064a7b3b6e00d000000000000000000000000000000000000000000000000", 'hex'));
// a9059cbb1cbd2d43530a44705ad088af313e18f80b53ef16b36177cd4b77b846f2a5f07c000064a7b3b6e00d000000000000000000000000000000000000000000000000
// const uint8array = Uint8Array.from(Buffer.from("00ffff63a7b3b6e00d000000000000000000000000000000000000000000000000", 'hex'));
const uint8array = Uint8Array.from(Buffer.from("00000064a7b3b6e00d000000000000000000000000000000000000000000000000", 'hex'));
// console.log("uint8array: ", uint8array, "start: ", uint8array[0]);
// const newuint8Array = Uint8Array.from([255, 255, 99, 167, 179, 182, 224, 13,
//   0,   0,   0,  0,   0,   0,   0,   0,  0,
//   0,   0,   0,  0,   0,   0,   0,   0,  0,
//   0,   0,   0,  0,   0,   0])
const decodedEvent = abi.decodeEvent(uint8array);
// decodedEvent.event.args.map(e => e.toJSON())
// console.log(decodedEvent.args);
// console.log("uint8array: ", uint8array);
// console.log("decodedEvent.event.fromU8a", decodedEvent.event.fromU8a(newuint8Array ))
// console.log("decodedEvent.args[2]", decodedEvent.args[2]);

// console.log("0", decodedEvent.event.args[0]);
// console.log("1", decodedEvent.event.args[1]);
// console.log("2", decodedEvent.event.args[2]);

// console.log(myCodec.dec("00000064a7b3b6e00d000000000000000000000000000000000000000000000000"))
// console.log("uint8array", myCodec.dec(Uint8Array.from(Buffer.from("00000064a7b3b6e00d000000000000000000000000000000000000000000000000", 'hex'))))
// {"args": [
//   {
//     "indexed": true,
//     "name": "from",
//     "type": {
//       "display_name": [
//         "AccountId"
//       ],
//       "type": 5
//     }
//   },
//   {
//     "indexed": true,
//     "name": "to",
//     "type": {
//       "display_name": [
//         "AccountId"
//       ],
//       "type": 5
//     }
//   },
//   {
//     "indexed": false,
//     "name": "value",
//     "type": {
//       "display_name": [
//         "u256"
//       ],
//       "type": 1
//     }
//   }
// ],
// "docs": [
//   ""
// ],
// "name": "Transfer"}
// console.log("test : ", myCodec.dec("0x00000064a7b3b6e00d000000000000000000000000000000000000000000000000"))

