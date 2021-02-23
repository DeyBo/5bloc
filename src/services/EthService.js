import Web3 from "web3";
import {CONTRACT_ABI, CONTRACT_ADDRESS} from "../config";

export class EthService {

    web3;
    account;
    contract;

    enableEthConnection() {
        return new Promise(resolve => {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                window.ethereum.send('eth_requestAccounts');
                this.web3 = window.web3;
                this.web3.eth.getAccounts().then(accounts => {
                    this.account = accounts[0];
                    this.contract = new this.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
                    resolve(true);
                });
            } else {
                alert('Your browser don\'t support Ethereum connection, please install MetaMask (or other) !');
                resolve(false);
            }
        })
    }

    async getTokens(tokenId = null) {
        if (this.contract) {
            if (tokenId !== null) {
                return await this.contract.methods.getToken(tokenId).call();
            } else {
                const tokens = [];
                for (let i = 0; i <= 15; i++) {
                    const token = await this.contract.methods.getToken(i).call();
                    if (token._onSale) {
                        tokens.push(token);
                    }
                }
                return tokens;
            }
        }
    }
}
