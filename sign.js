console.log('signing here')

const fs = require('fs')
const HttpProvider = require('ethjs-provider-http');
const Eth = require('ethjs-query');
var Web3 = require('web3');
// const eth = new Eth(new HttpProvider('http://localhost:8545'));

const eth = new Eth(new HttpProvider('https://ropsten.infura.io/SYGRk61NUc3yN4NNRs60'));

var web3 = new Web3(new Web3.providers.HttpProvider("http://ropsten.infura.io/SYGRk61NUc3yN4NNRs60"));


const sign = require('ethjs-signer').sign;
const BN = require('bignumber.js');

// const address = '0x0F6af8F8D7AAD198a7607C96fb74Ffa02C5eD86B';
// const privateKey = '0xecbcd9838f7f2afa6e809df8d7cdae69aa5dfc14d563ee98e97effd3f6a652f2';

const address = '0x42AA3D8a40C9Bd501f92617a280a539f3Cb6957A';
// const privateKey = '0xacc7b73429920495bdd342b1add8ad73e7ca92b8e5baeab358b5738af1825012';

const privateKey = '0x9e17765152afba785fb1e9d2333b2215230d5b2e6abeee11a84f82f85433aa76';


var contractFileName = "SelfKeyCrowdSale.json";
var contractSpecs = JSON.parse(fs.readFileSync("./build/contracts/" + contractFileName));
var abi = contractSpecs.abi;

// console.log('abi', abi)

//* reference */
// https://ethereum.stackexchange.com/questions/8736/how-to-call-my-contracts-function-using-sendtransaction

// /* example of sign one transaction of transafering ether */
eth.getTransactionCount(address).then((nonce) => {

	var contract = new web3.eth.Contract(abi, address)
	var callData = contract.methods.verifyKYC('0xd061bc63e751B0B878d36a45D97F8B9E08984674')

  eth.sendRawTransaction(sign({
    // account 1 (contract address / code from carlos)
    // to: '0x42AA3D8a40C9Bd501f92617a280a539f3Cb6957A',
    // account 2 (for transfer balance example)
    to: '0xd061bc63e751B0B878d36a45D97F8B9E08984674',
    value: 1234567,
    gas: new BN('2900000'),
    // when sending a raw transactions it's necessary to set the gas price, currently 0.00000002 ETH
    gasPrice: new BN('20000000000'),
    // data: callData, /* INVOKING HERE*/
    nonce: nonce,
  }, privateKey))
  .then((txHash) => {
    console.log('Transaction Hash', txHash);
  });
});



// var Tx = require('ethereumjs-tx')
// var privateKey2 = new Buffer('9e17765152afba785fb1e9d2333b2215230d5b2e6abeee11a84f82f85433aa76', 'hex')

// var rawTx = {
//   nonce: '0x00',
//   gasPrice: '0x09184e72a000', 
//   gasLimit: '0x2710',
//   to: '0x42AA3D8a40C9Bd501f92617a280a539f3Cb6957A', 
//   value: '0x00', 
//   data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
// }

// var tx = new Tx(rawTx)
// tx.sign(privateKey2)

// var serializedTx = tx.serialize()
// console.log(serializedTx.toString('hex'))


