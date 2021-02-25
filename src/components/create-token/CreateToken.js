import React, {Component} from 'react';
import {EthService} from "../../services/EthService";
import {Redirect} from "react-router";
import {Button, Form} from "react-bootstrap";

class CreateToken extends Component {
    constructor(props) {
        super(props);
        this.ethService = new EthService();

        this.state = {loading: true, navigate: false, token: null, saving: false};
        this.createToken = this.createToken.bind(this);
        this.editToken = this.editToken.bind(this);

        this.inputs = [
            '_name',
            '_location',
            '_price',
            '_livingSpace',
            '_tokenType'
        ];
    }

    componentDidMount() {
        this.ethService.enableEthConnection().then(() => {
            if (this.props.edit) {
                this.getToken();
            } else {
                this.setState({loading: false});
            }
        });
    }

    getToken() {
        this.ethService.getTokens(this.props.id).then(token => {
            this.setState({token});
            for (let input of this.inputs) {
                document.getElementById(input).value = token[input];
            }
            document.getElementById('_onSale').checked = token._onSale;
            this.setState({loading: false, saving: false});
        });
    }

    isValid(input) {
        const value = document.getElementById(input).value;
        return value !== '' && value !== null;
    }

    checkValidity() {
        let valid = true;
        for (let input of this.inputs) {
            valid = this.isValid(input);
            if (!valid) return false;
        }
        return true;
    }

    createToken() {
        if (this.checkValidity()) {
            this.setState({loading: true, saving: true});
            this.ethService.contract.methods.createToken(
                document.getElementById('_name').value,
                document.getElementById('_location').value,
                document.getElementById('_price').value,
                document.getElementById('_livingSpace').value,
                document.getElementById('_tokenType').value,
                []
            ).send({from: this.ethService.account}).once('receipt', (() => {
                this.setState({saving: false, navigate: true});
            }));
        }
    }

    editToken() {
        if (this.checkValidity() && this.isValid('_onSale')) {
            this.setState({loading: true, saving: true});
            this.ethService.contract.methods.editTokenAttributes(
                this.props.id,
                document.getElementById('_name').value,
                document.getElementById('_location').value,
                document.getElementById('_price').value,
                document.getElementById('_livingSpace').value,
                document.getElementById('_tokenType').value,
                [],
                document.getElementById('_onSale').checked
            ).send({from: this.ethService.account}).once('receipt', (() => {
                this.getToken();
            }));
        }
    }

    render() {
        if (this.state.navigate) {
            return <Redirect to='/your-tokens'/>
        }

        const form = <Form>
            <Form.Group>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control disabled={this.state.loading} id="_name" type="text"/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="location">Location</Form.Label>
                <Form.Control disabled={this.state.loading} id="_location" type="text"/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="price">Price (€)</Form.Label>
                <Form.Control disabled={this.state.loading} id="_price" type="number"/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="livingSpace">Living space (m²)</Form.Label>
                <Form.Control disabled={this.state.loading} id="_livingSpace" type="number"/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="type">Type</Form.Label>
                <Form.Control disabled={this.state.loading} id="_tokenType" type="text"/>
            </Form.Group>
            {this.props.edit ?
                <Form.Group>
                    <Form.Check label="On sale" disabled={this.state.loading} id="_onSale" type="checkbox"/>
                </Form.Group>
            : null}
        </Form>;

        const createTokenButton = <Button className="btn-dark" disabled={this.state.loading}
                                          onClick={this.props.edit ? this.editToken : this.createToken}>{this.props.edit ? 'Edit' : 'Create'}</Button>;

        const buttonSpan = <span>{this.props.edit ? 'Editing' : 'Creating'}...</span>;

        return (
            <div id="token-edition">
                <h1 className="page-title">Create token</h1>
                {form}
                <div>
                    {createTokenButton}{this.state.saving ? buttonSpan : null}
                </div>
            </div>
        )
    }
}

export default CreateToken;
