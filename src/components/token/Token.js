import React, {Component} from 'react';
import {EthService} from "../../services/EthService";
import {Redirect} from "react-router";
import {Button, Spinner} from "react-bootstrap";

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

        return (
            this.state.token ? <div>
                <h1 className="page-title">{this.state.token ? this.state.token._name : null}</h1>
                <div className="w-100 text-right">
                    <Button className="btn-dark" disabled={this.state.loading}
                            onClick={this.buyToken}>Buy token</Button>
                </div>
                <div className="m-3">
                    <div className="m-2"><b>Location</b> : {this.state.token._location}</div>
                    <div className="m-2"><b>Price</b> : {this.state.token._price} eth</div>
                    <div className="m-2"><b>Living space</b> : {this.state.token._livingSpace} m²</div>
                    <div className="m-2"><b>Type</b> : {this.state.token._tokenType}</div>
                </div>
                <hr/>
                <h3 className="m-3">Images</h3>
                <div className="m-3">
                    <img width="50%"
                        src="https://manager.groupe-bdl.com/web_content/modeles/114-modele-maison-individuelle-a-etage-1.jpg"
                        alt=""/>
                </div>
            </div> : <Spinner animation="grow" variant="black"/>
        )
    }
}

export default Token;
