import React from "react";
import Web3 from "web3";

import ExobitsABI from '../contract/ReExoBits.json';

export default function Login(props) {

	const DoConnect = async () => {

		console.log('Connecting....');
		try {
			// Get network provider and web3 instance.
			const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
			// Request account access if needed
			await window.ethereum.request({ method: 'eth_requestAccounts' })
			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();
			// Get an instance of the contract so we can call our contract functions
			const networkId = await web3.eth.net.getId();
			const contractNetwork = ExobitsABI.networks[networkId];
			const instance = new web3.eth.Contract(
				ExobitsABI.abi, 
				contractNetwork && contractNetwork.address
			);
			props.callback({ web3, accounts, contract: instance });

		} catch (error) {
			// Catch any errors for any of the above operations.
			console.error("Could not connect to wallet.", error);
		}
	};

	// If not connected, display the connect button.
	if(!props.connected) return <button className="login" onClick={DoConnect}>Connect Wallet</button>;

	// Display the wallet address. Truncate it to save space.
	return <>[{props.address.slice(0,6)}]</>;
}