console.log('signing here')

const fs = require('fs')
const HttpProvider = require('ethjs-provider-http');

const Eth = require('ethjs-query');
const eth = new Eth(new HttpProvider('https://ropsten.infura.io/SYGRk61NUc3yN4NNRs60'));

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://ropsten.infura.io/SYGRk61NUc3yN4NNRs60"));
const sign = require('ethjs-signer').sign;
const BN = require('bignumber.js');

const address = '0x42AA3D8a40C9Bd501f92617a280a539f3Cb6957A';

/* export from metamask from the 12 mnemonic keys provided by Carlos*/
const privateKey = '0x9e17765152afba785fb1e9d2333b2215230d5b2e6abeee11a84f82f85433aa76';

var contractFileName = "SelfKeyCrowdSale.json";
var contractSpecs = JSON.parse(fs.readFileSync("./build/contracts/" + contractFileName));
var abi = contractSpecs.abi;

eth.getTransactionCount(address).then((nonce) => {

	var contract = new web3.eth.Contract(abi, address)
	var callData = contract.methods.verifyKYC('0xd061bc63e751B0B878d36a45D97F8B9E08984674').encodeABI()
  
  eth.sendRawTransaction(sign({
    to: '0x06f5806bce5e76109c47019a70ecce8816e73a9d',
    gas: new BN('2900000'),
    gasPrice: new BN('20000000000'),
    data: callData,
    nonce: nonce,
  }, privateKey))
  .then((txHash) => {
    console.log('Transaction Hash', txHash);
  });
});

