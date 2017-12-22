console.log('web3 hello world here')

var Web3 = require('web3');
var fs = require('fs'); 
var web3 = new Web3(new Web3.providers.HttpProvider("http://ropsten.infura.io/SYGRk61NUc3yN4NNRs60"));

var contractAddress = "0x84def590841e04465324417e1df30a93f8574b17"; 

var tokenAddress = "0x69744a70e140502bbb63ba5699c15797975285b1"; 

var contractFileName = "SelfKeyToken.json";
var contractSpecs = JSON.parse(fs.readFileSync("./build/contracts/" + contractFileName));
var abi = contractSpecs.abi;

console.log('abi', abi)
var crowdsaleInstance = new web3.eth.Contract(abi, contractAddress);

console.log(crowdsaleInstance)

// not working
crowdsaleInstance.weiRaised().then(function(res){
	console.log(res)
})

// not working
crowdsaleInstance.weiRaised.call(function(err, res){
	console.log(err, res)
})


