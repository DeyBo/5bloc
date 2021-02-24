import React, {Component} from 'react';
import {EthService} from "../../services/EthService";
import {Link} from "react-router-dom";

class UserTokens extends Component {
    constructor(props) {
        super(props);
        this.ethService = new EthService();

        this.state = {loading: true, tokens: [], account: '', createToken: false};
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
                tokens: tokens.filter(token => token.owner === this.state.account)
            });
            this.setState({loading: false});
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
            </tr>
            </thead>
            <tbody>
            {this.state.tokens && this.state.tokens.length > 0 &&
            this.state.tokens.map((token, key) => {
                if (token._onSale) {
                    return (
                        <tr key={key}>
                            <td>{token._name}</td>
                            <td>{token._location}</td>
                            <td>{token._price}</td>
                            <td>{token._livingSpace}</td>
                            <td>{token._tokenType}</td>
                            <td>{token._onSale ? 'Yes' : 'No'}</td>
                        </tr>
                    )
                }
            })
            }
            </tbody>
        </table>

        const loading = <span>loading...</span>;
        const noTokens = <span>you don't have tokens</span>;
        const toDisplay = this.state.loading ?
            loading : this.state.tokens.length > 0 ? table : noTokens;

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
