export enum NavbarState {
    BOOKING_TABLE = 1,
    REPROT = 2,
    MANAGEMENT = 3,
}

export enum MenuState {
    NOT_SELECT = 0,
    HISTORY = 1,
    SUMARY_FARE = 2,
    DRIVER_INFO = 3,
    CAR_INFO = 4,
    ASSIGNMENT_JOB = 5,
}

export enum Role {
    OWNER = "contract owner",
    UNIVERSITY = "registered university",
    UNDEFINED = "undefined"
}

export const ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "oldOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnerSet",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_hash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_id",
                "type": "string"
            }
        ],
        "name": "addStudent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_university",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_universityName",
                "type": "string"
            }
        ],
        "name": "addUniversity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "changeOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_id",
                "type": "string"
            }
        ],
        "name": "deleteStudent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_university",
                "type": "address"
            }
        ],
        "name": "deleteUniversity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getOwner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_id",
                "type": "string"
            }
        ],
        "name": "getStudent",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "issuer",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "hash",
                        "type": "string"
                    }
                ],
                "internalType": "struct Certsvice.student",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_university",
                "type": "address"
            }
        ],
        "name": "getUniversity",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]