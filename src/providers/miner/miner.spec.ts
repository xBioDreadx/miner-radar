import {inject} from "@angular/core/testing";
import {MockNgZone} from "../../../test-config/mocks-ionic";
import {MinerProvider} from "./miner";


describe('Provider: MinerProvider', () => {

  const preparedMiner = {
    miner: {
      minerId: "1",
      minerName: "testMiner"
    },
    message: {
      gpus: [{temperature: 95.356, fanSpeed: 75.639}, {temperature: 78.76, fanSpeed: 69.520}],
      uptime: 1205,
      pool: "tested pool",
      invalidEth: 1,
      invalidDcr: 2,
      switchesEth: 3,
      switchesDcr: 5,
      version: "1.10",
      status: true,
      comments: "too old comments",
      speedEth: 21.36,
      acceptedSharesEth: 20,
      rejectedSharesEth: 8,
      detaliedEth: [10, 11.36],
      speedDcr: 2.5,
      acceptedSharesDcr: 4,
      rejectedSharesDcr: 8,
      detaliedDcr: [1.25, 1.25]
    },
    settings: [
      {
        name: "Temperature",
        type: "C",
        enabled: true,
        low_value: -1,
        high_value: 95,
        muted: false
      },
      {
        name: "Fan Speed",
        type: "%",
        enabled: true,
        low_value: 20,
        high_value: -1,
        muted: false
      },
      {
        name: "Eth Speed",
        type: "MH/s",
        enabled: true,
        low_value: 0.5,
        high_value: -1,
        muted: true
      },
      {
        name: "Dcr Speed",
        type: "MH/s",
        enabled: false,
        low_value: -1,
        high_value: -1,
        muted: true
      }
    ]
  };


  it('testing setMiners function', () => {
    let minerProvider = new MinerProvider();
    minerProvider.setMiners([preparedMiner]).then(() => {
      expect(minerProvider.miners.length).toBeGreaterThan(0);
      expect(minerProvider.miners[0].gpus.length).toBeGreaterThan(0)
    })
  })

})
