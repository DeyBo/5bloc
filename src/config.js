export const CONTRACT_ADDRESS = '0xF8D35889D68c119e869d0696a7E7bd0BAD327233';

export const CONTRACT_ABI = [{
    "inputs": [],
    "stateMutability": "payable",
    "type": "constructor"
}, {
    "inputs": [{"internalType": "uint256", "name": "idToken", "type": "uint256"}],
    "name": "buyToken",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_commissionPart", "type": "uint256"}],
    "name": "changeCommissionPart",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "contractOwner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "string", "name": "_name", "type": "string"}, {
        "internalType": "string",
        "name": "_location",
        "type": "string"
    }, {"internalType": "uint256", "name": "_price", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "_livingSpace",
        "type": "uint256"
    }, {"internalType": "string", "name": "_tokenType", "type": "string"}, {
        "internalType": "string[]",
        "name": "_images",
        "type": "string[]"
    }],
    "name": "createToken",
    "outputs": [{"internalType": "uint256", "name": "idToken", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "idToken", "type": "uint256"}, {
        "internalType": "string",
        "name": "_name",
        "type": "string"
    }, {"internalType": "string", "name": "_location", "type": "string"}, {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "_livingSpace", "type": "uint256"}, {
        "internalType": "string",
        "name": "_tokenType",
        "type": "string"
    }, {"internalType": "string[]", "name": "_images", "type": "string[]"}, {
        "internalType": "bool",
        "name": "_onSale",
        "type": "bool"
    }], "name": "editTokenAttributes", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "idToken", "type": "uint256"}],
    "name": "getToken",
    "outputs": [{"internalType": "string", "name": "_name", "type": "string"}, {
        "internalType": "string",
        "name": "_location",
        "type": "string"
    }, {"internalType": "uint256", "name": "_price", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "_livingSpace",
        "type": "uint256"
    }, {"internalType": "string", "name": "_tokenType", "type": "string"}, {
        "internalType": "string[]",
        "name": "_images",
        "type": "string[]"
    }, {"internalType": "bool", "name": "_onSale", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "idToken", "type": "uint256"}],
    "name": "putTokenUpForSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "idToken", "type": "uint256"}],
    "name": "removeFromSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "tokenOwner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "tokens",
    "outputs": [{"internalType": "string", "name": "name", "type": "string"}, {
        "internalType": "string",
        "name": "location",
        "type": "string"
    }, {"internalType": "uint256", "name": "price", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "livingSpace",
        "type": "uint256"
    }, {"internalType": "string", "name": "tokenType", "type": "string"}, {
        "internalType": "bool",
        "name": "onSale",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "totalTokens",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {"inputs": [], "name": "withdrawComissionPart", "outputs": [], "stateMutability": "payable", "type": "function"}];
