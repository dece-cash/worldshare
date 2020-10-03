export const address:string = "MZrKF9bGLcJRs15AynmuDwP9C41HJQtR1mEZr5BHzHd7PxRs6UFpFPh22534GmgUeaxjRzXUbd3kfwrYyCQ9tfT"

export const abi:any = [
    {
        "inputs": [],
        "name": "details",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "ID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "idLeft",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "idRight",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "leftAchievement",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rightAchievement",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "boosterLevel",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "refferId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "value",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "returnValue",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "canDrawupValue",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "level",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "recommendProfit",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "boosterProfit",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "roolupProfit",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "suportProfit",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "achievement",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "otherAchievement",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "avatarValue",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct worldShare.Player",
                        "name": "player",
                        "type": "tuple"
                    },
                    {
                        "internalType": "string",
                        "name": "reffer",
                        "type": "string"
                    }
                ],
                "internalType": "struct worldShare.Detail",
                "name": "detail",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "refferCode",
                "type": "string"
            }
        ],
        "name": "register",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
