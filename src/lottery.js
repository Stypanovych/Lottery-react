import web3 from "./web3";

const abi = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
        inputs: [],
        name: 'enter',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getPlayers',
        outputs: [[Object]],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'managerAddress',
        outputs: [{ name: "", type: "address" }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'pickWinner',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [[Object]],
        name: 'players',
        outputs: [[Object]],
        stateMutability: 'view',
        type: 'function'
    }
];

const address = '0xc5C5E7279A03bC68599008e1c58dB768F0054048';

export default new web3.eth.Contract(abi, address);