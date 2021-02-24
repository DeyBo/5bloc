import React, {Component} from 'react';
import {EthService} from "../../services/EthService";
import {Redirect} from "react-router";

class Token extends Component {
    constructor(props) {
        super(props);
        this.ethService = new EthService();

        this.state = {token: null, loading: true, navigate: false};
        this.buyToken = this.buyToken.bind(this);
    }

    componentDidMount() {
        this.ethService.enableEthConnection().then(() => {
            this.setState({account: this.ethService.account});
            this.ethService.getTokens(this.props.id).then(tokens => {
                this.setState({token: tokens, loading: false});
            });
        });
    }

    onSale() {
        return this.state.token ? this.state.token._onSale ? 'Yes' : 'No' : '';
    }

    buyToken() {
        this.setState({loading: true});
        const value = this.ethService.convertEtherInWei(this.state.token._price)
        this.ethService.contract.methods.buyToken(this.props.id).send({
            from: this.ethService.account,
            value
        }).once('receipt', () => {
            this.setState({navigate: true});
        })
    }

    render() {
        if (this.state.navigate) {
            return <Redirect to='/'/>
        }

        const token = !this.state.loading ? <div className="token">
            <div><span>Name : {this.state.token._name}</span></div>
            <div><span>Location : {this.state.token._location}</span></div>
            <div><span>Price : {this.state.token._price}</span></div>
            <div><span>Living space : {this.state.token._livingSpace}</span></div>
            <div><span>Token type : {this.state.token._tokenType}</span></div>
        </div> : 'loading...';

        return (
            <div>
                <h1>id : {this.props.id}</h1>
                {token}
                <button disabled={this.state.loading} onClick={this.buyToken}>Buy</button>
            </div>
        )
    }
}

export default Token;
