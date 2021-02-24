import React, {Component} from 'react';
import {EthService} from "../../services/EthService";
import {Redirect} from "react-router";

class CreateToken extends Component {
    constructor(props) {
        super(props);
        this.ethService = new EthService();

        this.state = {loading: false, navigate: false};
        this.createToken = this.createToken.bind(this);
    }

    componentDidMount() {
        this.ethService.enableEthConnection().then();
    }

    isValid(input) {
        const value = document.getElementById(input).value;
        return value !== '' && value !== null;
    }

    checkValidity() {
        const inputs = [
            'name',
            'location',
            'price',
            'livingSpace',
            'type'
        ];
        let valid = true;
        for (let input of inputs) {
            valid = this.isValid(input);
            if (!valid) return false;
        }
        return true;
    }

    createToken() {
        if (this.checkValidity()) {
            this.setState({loading: true});
            this.ethService.contract.methods.createToken(
                document.getElementById('name').value,
                document.getElementById('location').value,
                document.getElementById('price').value,
                document.getElementById('livingSpace').value,
                document.getElementById('type').value,
                []
            ).send({from: this.ethService.account}).once('receipt', (() => {
                this.setState({loading: false, navigate: true});
            }));
        }
    }

    render() {
        if (this.state.navigate) {
            return <Redirect to='/your-tokens'/>
        }

        const form = <form>
            <div>
                <label htmlFor="name">Name</label>
                <input disabled={this.state.loading} id="name" type="text"/>
            </div>
            <div>
                <label htmlFor="location">Location</label>
                <input disabled={this.state.loading} id="location" type="text"/>
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input disabled={this.state.loading} id="price" type="number"/>
            </div>
            <div>
                <label htmlFor="livingSpace">Living space</label>
                <input disabled={this.state.loading} id="livingSpace" type="number"/>
            </div>
            <div>
                <label htmlFor="type">Type</label>
                <input disabled={this.state.loading} id="type" type="text"/>
            </div>
        </form>;

        const createTokenButton = <button disabled={this.state.loading}
                                          onClick={this.createToken}>Create</button>;

        return (
            <div>
                <h1>Create token</h1>
                {form}
                <div>
                    {createTokenButton}{this.state.loading ? <span>Creating...</span> : null}
                </div>
            </div>
        )
    }
}

export default CreateToken;
