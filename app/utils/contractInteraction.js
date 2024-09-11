import Web3 from "web3";
import contractABI from "../contractABI.json"; // Replace with actual ABI file

const contractAddress = "0x5e7e42f3B5eF5908B4b28ec494E51287f69736D2"; // Replace with your deployed contract address

let web3;
let contract;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // Initialize Web3 instance
  web3 = new Web3(window.ethereum);

  // Initialize contract instance
  contract = new web3.eth.Contract(contractABI, contractAddress);

  // Request account access if needed (prompts MetaMask to connect)
  window.ethereum.request({ method: "eth_requestAccounts" });
} else {
  console.log("Please install MetaMask to interact with this app.");
}

export const getBalance = async (address) => {
  return await contract.methods.balanceOf(address).call();
};

export const transferTokens = async (fromAddress, toAddress, amount) => {
  const valueInWei = web3.utils.toWei(amount.toString(), "ether"); // Adjust decimals as needed
  await contract.methods
    .transfer(toAddress, valueInWei)
    .send({ from: fromAddress });
};
