import React, {Component} from 'react';
import {EthService} from "../../services/EthService";
import {Link} from "react-router-dom";
import {Button, Spinner, Table} from "react-bootstrap";
import editImg from '../../edit_black.png';

class UserTokens extends Component {
    constructor(props) {
        super(props);
        this.ethService = new EthService();

        this.state = {loading: true, tokens: [], tokensToDisplay: [], account: ''};
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
            .send({from: this.ethService.account}).once('receipt', () => {
                this.getUserTokens();
            });
    }

    getTokenEditUrl(token) {
        return '/token/' + this.getTokenId(token) + '/edit';
    }

    render() {
        const table = <Table>
            <thead>
            <tr>
                <th/>
                <th>Name</th>
                <th>Location</th>
                <th>Price (eth)</th>
                <th>Living space (m²)</th>
                <th>Type</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {this.state.tokensToDisplay && this.state.tokensToDisplay.length > 0 &&
            this.state.tokensToDisplay.map((token, key) => {
                return (
                    <tr key={key}>
                        <td><Link to={this.getTokenEditUrl(token)}><img src={editImg} alt="Edit token"/></Link></td>
                        <td>{token._name}</td>
                        <td>{token._location}</td>
                        <td>{token._price}</td>
                        <td>{token._livingSpace}</td>
                        <td>{token._tokenType}</td>
                        <td className="p-2">
                            <Button className="btn-dark" onClick={() => this.updateTokenSaleState(token)}
                                    disabled={this.state.loading}>
                                {token._onSale ? 'Remove from sale' : 'Put on sale'}
                            </Button>
                        </td>
                    </tr>
                )
            })
            }
            </tbody>
        </Table>

        const loading = <div className="w-100 text-center"><Spinner animation="grow"/></div>;
        const noTokens = <div className="m-3">You don't have tokens</div>;
        const toDisplay = this.state.loading ?
            loading : this.state.tokensToDisplay.length > 0 ? table : noTokens;

        return (
            <div className="user-tokens">
                <h1 className="page-title">Your tokens :</h1>
                <div className="w-100 text-right m-3">
                    <Link to="/token/create"><Button className="btn-dark" disabled={this.state.loading}>Create token</Button></Link>
                </div>
                {toDisplay}
            </div>
        )
    }
}

export default UserTokens;
