import React, {Component} from 'react';
import {EthService} from "../../services/EthService";
import {Link} from "react-router-dom";

class Token extends Component {
    constructor(props) {
        super(props);
        this.ethService = new EthService();
        this.state = {token: null, canUpdate: false};
        console.log(this.props.edit);
    }

    componentDidMount() {
        this.ethService.enableEthConnection().then(() => {
            this.setState({account: this.ethService.account});
            this.ethService.getTokens(this.props.id).then(tokens => {
                this.setState({token: tokens});
                this.ethService.getTokenOwner(this.props.id).then(tokenOwner => {
                    this.setState({canUpdate: tokenOwner !== this.ethService.account});
                });
            });
        });
    }

    onSale() {
        return this.state.token ? this.state.token._onSale ? 'Yes' : 'No' : '';
    }

    render() {
        const token = this.state.token ? <div className="token">
            <div><span>Name : {this.state.token._name}</span></div>
            <div><span>Location : {this.state.token._location}</span></div>
            <div><span>Price : {this.state.token._price}</span></div>
            <div><span>Living space : {this.state.token._livingSpace}</span></div>
            <div><span>Token type : {this.state.token.tokenType}</span></div>
            <div><span>On sale : {this.state.token._onSale ? 'Yes' : 'No'}</span></div>
        </div> : 'loading...';

        const updateButton = <Link to={'/token/' + this.props.id + '/edit'}>
            <button>Update token</button>
        </Link>;

        return (
            <div>
                <h1>id : {this.props.id}</h1>
                {(this.state.canUpdate && !this.props.edit) ? updateButton : ''}
                {token}
            </div>
        )
    }
}

export default Token;
