import React, {Component} from 'react';
import Web3 from "web3";
import './App.css';
import {CONTRACT_ABI, CONTRACT_ADDRESS} from "./config";

class App extends Component {
    componentWillMount() {
        this.enableEthConnection();
        this.loadBlockchainData();
    }

    enableEthConnection() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
            return true;
        }
        alert('Your browser don\'t support Ethereum connection, please install MetaMask (or other) !');
        return false;
    }

    loadBlockchainData() {
        const web3 = window.web3;
        if (web3) {
            web3.eth.getAccounts().then(accounts => {
                this.setState({account: accounts[0]});
                const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
                this.setState({contract});
                this.setState({tokens: []});
                for (let i = 0; i <= 15; i++) {
                    contract.methods.getToken(i).call().then(token => {
                        if (token._onSale) {
                            this.setState({
                                tokens: [...this.state.tokens, token]
                            });
                        }
                    });
                }
            });
        }
    }

    constructor(props) {
        super(props);
        this.state = {account: ''};
    }

    render() {
        return (
            <div className="container">
                <h1>Hello World !</h1>
                <p>Your account : {this.state.account}</p>
                <table>
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Ville</th>
                        <th>Prix</th>
                        <th>Espace à vivre</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.tokens && this.state.tokens.length > 0 &&
                    this.state.tokens.map((token, key) => {
                        return (
                            <tr key={key}>
                                <td>{token._name}</td>
                                <td>{token._location}</td>
                                <td>{token._price}</td>
                                <td>{token._livingPrice}</td>
                                <td>{token._tokenType}</td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
            </div>
        )
    }

    createToken() {
        this.state.contract.methods.createToken(
            {
                _name: 'TEST_DAPP_NAME',
                _location: 'TEST_DAPP_LOCATION',
                _price: 100,
                _livingSpace: 200,
                _tokenType: 'Villa',
                _images: []
            }
        ).send({from: this.state.account})
    }
}

export default App;
