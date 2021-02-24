import React, {Component} from 'react';
import {EthService} from "../../services/EthService";
import {Link} from "react-router-dom";

class UserTokens extends Component {
    constructor(props) {
        super(props);
        this.ethService = new EthService();

        this.state = {loading: true, tokens: [], tokensToDisplay: [], account: '', createToken: false};
        this.updateTokenSaleState = this.updateTokenSaleState.bind(this);
    }

    componentDidMount() {
        this.ethService.enableEthConnection().then(() => {
            this.setState({account: this.ethService.account});
            this.getUserTokens();
        });
    }

    getUserTokens() {
        this.ethService.getTokens().then(tokens => {
            this.setState({
                tokens,
                tokensToDisplay: tokens.filter(token => token.owner === this.state.account)
            });
            this.setState({loading: false});
        });
    }

    getTokenId(token) {
        return this.state.tokens.indexOf(token);
    }

    updateTokenSaleState(token) {
        this.setState({loading: true});
        token._onSale ? this.removeTokenFromSale(token) : this.putTokenOnSale(token);
    }

    putTokenOnSale(token) {
        this.ethService.contract.methods.putTokenUpForSale(this.getTokenId(token))
            .send({from: this.ethService.account}).once('receipt', (receipt) => {
                this.getUserTokens();
            });
    }

    removeTokenFromSale(token) {
        this.ethService.contract.methods.removeFromSale(this.getTokenId(token))
            .send({from: this.ethService.account}).once('receipt', (receipt) => {
                this.getUserTokens();
            });
    }

    render() {
        const table = <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Price</th>
                <th>Living Space</th>
                <th>Type</th>
                <th>On sale</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {this.state.tokensToDisplay && this.state.tokensToDisplay.length > 0 &&
            this.state.tokensToDisplay.map((token, key) => {
                return (
                    <tr key={key}>
                        <td>{token._name}</td>
                        <td>{token._location}</td>
                        <td>{token._price}</td>
                        <td>{token._livingSpace}</td>
                        <td>{token._tokenType}</td>
                        <td>{token._onSale ? 'Yes' : 'No'}</td>
                        <td>
                            <button onClick={() => this.updateTokenSaleState(token)}>
                                {token._onSale ? 'Remove from sale' : 'Put on sale'}</button>
                        </td>
                    </tr>
                )
            })
            }
            </tbody>
        </table>

        const loading = <span>loading...</span>;
        const noTokens = <span>you don't have tokens</span>;
        const toDisplay = this.state.loading ?
            loading : this.state.tokensToDisplay.length > 0 ? table : noTokens;

        return (
            <div className="user-tokens">
                <h1>Your tokens :</h1>
                <div>
                    <Link to="/token/create"><button>Create token</button></Link>
                </div>
                {toDisplay}
            </div>
        )
    }
}

export default UserTokens;
