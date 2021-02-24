import React, {Component} from 'react';
import {EthService} from "../../services/EthService";
import {Redirect} from "react-router";
import {Button, Form} from "react-bootstrap";

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

        const form = <Form>
            <Form.Group>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control disabled={this.state.loading} id="name" type="text"/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="location">Location</Form.Label>
                <Form.Control disabled={this.state.loading} id="location" type="text"/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="price">Price (€)</Form.Label>
                <Form.Control disabled={this.state.loading} id="price" type="number"/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="livingSpace">Living space (m²)</Form.Label>
                <Form.Control disabled={this.state.loading} id="livingSpace" type="number"/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="type">Type</Form.Label>
                <Form.Control disabled={this.state.loading} id="type" type="text"/>
            </Form.Group>
        </Form>;

        const createTokenButton = <Button className="btn-dark" disabled={this.state.loading}
                                          onClick={this.createToken}>Create</Button>;

        return (
            <div>
                <h1 className="page-title">Create token</h1>
                {form}
                <div>
                    {createTokenButton}{this.state.loading ? <span>Creating...</span> : null}
                </div>
            </div>
        )
    }
}

export default CreateToken;
