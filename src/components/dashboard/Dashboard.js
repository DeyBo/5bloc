import React, {Component} from 'react';
import {EthService} from "../../services/EthService";
import {Link} from "react-router-dom";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.ethService = new EthService();

        this.state = {tokens: [], account: ''};
    }

    componentDidMount() {
        this.ethService.enableEthConnection().then(() => {
            this.setState({account: this.ethService.account});
            this.ethService.getTokens().then(tokens => {
                this.setState({tokens});
            });
        });
    }

    getTokenId(token) {
        return this.state.tokens.indexOf(token);
    }

    render() {
        const table = <table>
            <thead>
            <tr>
                <th>Nom</th>
                <th>Ville</th>
                <th>Prix</th>
                <th>Espace à vivre</th>
                <th>Type</th>
                <th>On sale</th>
                <th/>
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
                            <td><Link to={'/token/' + this.getTokenId(token)}>Go to token</Link></td>
                        </tr>
                    )
                }
            })
            }
            </tbody>
        </table>;

        const toDisplay = this.state.tokens.length > 0 ? table : <span>loading...</span>

        return (
            <div className="dashboard">
                <h1>Tokens on sale :</h1>
                {toDisplay}
                {/*<button onClick={this.createToken}>Add token</button>*/}
            </div>
        )
    }
}

export default Dashboard;
