import React, {Component} from 'react';
import {EthService} from "../../services/EthService";

class Token extends Component {
    constructor(props) {
        super(props);
        this.ethService = new EthService();
        this.state = {token: null};
    }

    componentDidMount() {
        this.ethService.enableEthConnection().then(() => {
            this.setState({account: this.ethService.account});
            this.ethService.getTokens(this.props.id).then(tokens => {
                this.setState({token: tokens});
            });
        });
    }

    onSale() {
        return this.state.token ? this.state.token._onSale ? 'Yes' : 'No' : '';
    }

    render() {
        const token = this.state.token ?
            <div className="token">
                <div><span>Name : {this.state.token._name}</span></div>
                <div><span>Location : {this.state.token._location}</span></div>
                <div><span>Price : {this.state.token._price}</span></div>
                <div><span>Living space : {this.state.token._livingSpace}</span></div>
                <div><span>Token type : {this.state.token.tokenType}</span></div>
                <div><span>On sale : {this.state.token._onSale ? 'Yes' : 'No'}</span></div>
            </div> : 'loading...';

        return (
            <div>
                <h1>id : {this.props.id}</h1>
                {token}
            </div>
        )
    }
}

export default Token;
