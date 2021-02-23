import React, {Component} from 'react';
import {EthService} from "../../services/EthService";

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
                        <td>{token._livingSpace}</td>
                        <td>{token._tokenType}</td>
                        <td>{token._onSale ? 'Yes' : 'No'}</td>
                    </tr>
                )
            })
            }
            </tbody>
        </table>;

        const toDisplay = this.state.tokens.length > 0 ? table : <span>loading...</span>

        return (
            <div className="dashboard">
                <h1>Hello World !</h1>
                <p>Your account : {this.state.account}</p>
                {toDisplay}
                {/*<button onClick={this.createToken}>Add token</button>*/}
            </div>
        )
    }
}

export default Dashboard;
