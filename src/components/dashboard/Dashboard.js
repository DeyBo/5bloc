import React, {Component} from 'react';
import './Dashboard.css';
import {EthService} from "../../services/EthService";
import {Button, Card, ListGroup, Spinner} from "react-bootstrap";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.ethService = new EthService();

        this.state = {loading: true, tokens: [], tokensToDisplay: [], account: ''};

        this.emptyImageUrl = 'https://thumbs.dreamstime.com/b/black-linear-photo-camera-logo-like-no-image-available-black-linear-photo-camera-logo-like-no-image-available-flat-stroke-style-106031126.jpg';
    }

    componentDidMount() {
        this.ethService.enableEthConnection().then(() => {
            this.setState({account: this.ethService.account});
            this.ethService.getTokens().then(tokens => {
                this.setState({
                    tokens,
                    tokensToDisplay: tokens.filter(token =>
                        token.owner !== this.ethService.account &&
                        token._onSale
                    ),
                    loading: false
                });
            });
        });
    }

    getTokenId(token) {
        return this.state.tokens.indexOf(token);
    }

    render() {
        const cards = <div id="cards">
            {
                this.state.tokensToDisplay && this.state.tokensToDisplay.length > 0 &&
                this.state.tokensToDisplay.map((token, key) => {
                    return (
                        <div key={key} className="divCard">
                            <Card>
                                <Card.Img variant="top" src={token._images.length > 0 ? token._images[0] : this.emptyImageUrl}/>
                                <Card.Body>
                                    <Card.Title>{token._name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">In {token._location}</Card.Subtitle>
                                    <ListGroup>
                                        <ListGroup.Item><b>Price</b> : {token._price} eth</ListGroup.Item>
                                        <ListGroup.Item><b>Living space</b> : {token._livingSpace} m²</ListGroup.Item>
                                        <ListGroup.Item><b>Type</b> : {token._tokenType}</ListGroup.Item>
                                    </ListGroup>
                                    <Card.Link href={'/token/' + this.getTokenId(token)}>
                                        <Button className="mt-2" variant="dark">Go to token</Button>
                                    </Card.Link>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })
            }
        </div>;

        const loading = <div className="w-100 text-center"><Spinner animation="grow" variant="dark"/></div>;
        const noTokens = <span>no tokens available</span>
        const toDisplay = this.state.loading ?
            loading : this.state.tokensToDisplay.length > 0 ? cards : noTokens;

        return (
            <div id="dashboard">
                <h1 className="page-title">Tokens on sale</h1>
                {toDisplay}
            </div>
        )
    }
}

export default Dashboard;
