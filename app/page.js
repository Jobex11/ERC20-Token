"use client";
import React, { useState, useEffect } from "react";
import { getBalance, transferTokens } from "./utils/contractInteraction";

const Home = () => {
  const [userAccount, setUserAccount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    // Get the current user's MetaMask account
    const loadAccount = async () => {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setUserAccount(accounts[0]);
      const balance = await getBalance(accounts[0]);
      setBalance(balance);
    };

    loadAccount();
  }, []);

  const handleTransfer = async () => {
    try {
      await transferTokens(userAccount, recipient, amount);
      alert("Transfer successful!");
    } catch (error) {
      console.error("Transfer failed", error);
    }
  };

  return (
    <div>
      <h1>Simple ERC-20 Token App</h1>
      <p>Your account: {userAccount}</p>
      <p>Your balance: {balance}</p>

      <div>
        <input
          type="text"
          placeholder="Recipient address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleTransfer}>Transfer Tokens</button>
      </div>
    </div>
  );
};

export default Home;
