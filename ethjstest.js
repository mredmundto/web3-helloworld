const fs = require ('fs');
const Eth = require('ethjs');
const eth = new Eth(new Eth.HttpProvider('https://ropsten.infura.io/SYGRk61NUc3yN4NNRs60'));

// Load crowdsale contract
// var crowdsaleAddress = "0x9f5a27e6d2323196e195743f28fbe817988dfdef";  // old Ropsten address
var crowdsaleAddress = "0x84def590841e04465324417e1df30a93f8574b17";  // new Ropsten address

//var crowdsaleAddress = "0x0fADd0F343cF32b5B0c3C3830Fb1dCaa6d6cb80e";  // Local geth test
var crowdsaleABIFile = "SelfKeyCrowdsale.json";
var crowdsaleSpecs = JSON.parse(fs.readFileSync("./build/contracts/" + crowdsaleABIFile));
var crowdsaleABI = crowdsaleSpecs.abi;
var CrowdSaleContract = eth.contract(crowdsaleABI);
var crowdsaleInstance = CrowdSaleContract.at(crowdsaleAddress);

// Uncomment to retrieve Token contract address
/*crowdsaleInstance.token().catch((error) => {
  console.log("Error: " + error);
}).then(function(result) {

  console.log("Token contract address = " + result[0]);
});*/

var tokenAddress = "0x5bc2d3b62f3546e1ac3b34ef0d956d5df7fc64be";    // Ropsten

// Load Token contract
var tokenABIFile = "SelfKeyToken.json";
var tokenSpecs = JSON.parse(fs.readFileSync("./build/contracts/" + tokenABIFile));
var tokenABI = tokenSpecs.abi;
var TokenContract = eth.contract(tokenABI);
var tokenInstance = TokenContract.at(tokenAddress);

var startDate, endDate;

/*tokenInstance.totalSupply().catch((error) => {
  console.log("Error: " + error);
}).then((result) => {
  console.log("Supply = " + JSON.stringify(Number(result[0])));
});*/

crowdsaleInstance.startTime().then((result) => {
  startDate = new Date(result[0]*1000);
  console.log("startTime = " + startDate);
});

crowdsaleInstance.endTime().then((result) => {
  endDate = new Date(result[0]*1000);
  console.log("endTime = " + endDate);
});

crowdsaleInstance.weiRaised().catch(console.log).then((result) => {
  console.log("Wei raised = " + result[0]);
});

crowdsaleInstance.isFinalized().catch(console.log).then((result) => {
  console.log("Finalized = " + result[0]);
});

var coinbase = "0xf5a7f6cd92907d2C27EfBeB659aC1BC26D72f077";    // contract owner address

// Verify KYC status of address (add to whitelist)
var simon = "0xCab4683212cb196Cec9CebDE693686A30f80f062";
var joonas = "0xBDAfD143430AA27ff48741FB6CEBe5877270ff06";
var gio = "0xd96969247b51187da3bf6418b3ed39304ae2006c";
var carlos = "0x91914Eb360b1a665d48F88eCc563BB16e260D75C";

// FAILS: eth_sendTransaction not allowed
/*crowdsaleInstance.verifyKYC(simon, {from: coinbase}).then(function(result) {
  console.log(result);
});*/

crowdsaleInstance.lockedBalance(carlos).then(function(result) {
  console.log("Carlos balance = " + result[0]);
});

crowdsaleInstance.lockedBalance(gio).then(function(result) {
  console.log("Gio balance = " + result[0]);
});

// FAILS: eth_sendTransaction not allowed
/*crowdsaleInstance.addPrecommitment(simon, 1000000000000000000, 50, 0, {from: coinbase}).then(function(result) {
  console.log(result);
});*/
