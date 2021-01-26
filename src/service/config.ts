export const address: string = "48jaTaWHnoGivTRMdZHEUuDktA4hkL68qaJF5P1za52HQymezdtaJdmZTWJs1fuZmzbpW7sU3sUYGjW9hBwDcrEo"
export const hbankaddress: string = "2LaPfgdkTzWPxy6o2e81PFpU5oBAZdy58eE1ScdHGeeov9oxaAmBybJ8C2DBH8o7fKSjPgR25gTC7zDnGehymj4V"
export const dkrwdelegateaddress: string = "5sWtPb2ap1ABpHYM1uBEEMVLJgaYmRVLaxik9u83JUoiUubzmSKB5HwRhm2SKAuGzL7eE2gcTYMENuTJ5sqgy34k"
export const swapAddress: string = "5sDcSj6m1NL1ho5jczaFf1zYHG1yymW6WW1SsxxDnud92mrgjNDRZFGdNKDK15rJ3PC9Ca2HyWBgdi5YuLCX8yYc"

// test
// export const address: string = "5zxVuiiXFinR4FuqiEWFFnSxBzC4fPSfX8ZuYft7ZC2HApgY4CpcsQYdLXchUjF23Nd5yPq6hxtVtbhnuZEtcCdS"
// export const hbankaddress: string = "3rwbnbmvb5j4P5Rv4NXcoqGq3N4vKuZELE5Sua2M9Y9erqw7A1erpYvy3UDtQC8xowndvAue92inucUeJYJpsg9M"
// export const dkrwdelegateaddress: string = "5R9Dar4hT7u1U63DU8H9aU1uj1dYpA1786kN5Jec46zFXzkPi1KMqpChiNFM8YsREfzWzgLSYj9YM8mJYyVoaRdU"
// export const swapAddress: string = "5YX3dccXGu55ZUxUqXkzqEzCxQySHhSRe9wVKS8HNTbibYCgk62xgKRmQyeQM7jiFkuvFBDaXZ7MWv1kpNJJFQja"

export const abi: any = [
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
                            },
                            {
                                "internalType": "uint256",
                                "name": "overflowValue",
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

export const hbankjson: any = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_swap",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32[]",
                "name": "keys",
                "type": "bytes32[]"
            },
            {
                "internalType": "bool",
                "name": "flag",
                "type": "bool"
            }
        ],
        "name": "check",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "list",
                "type": "address[]"
            },
            {
                "internalType": "bool",
                "name": "flag",
                "type": "bool"
            }
        ],
        "name": "checkUsers",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_tokenA",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_tokenB",
                "type": "string"
            }
        ],
        "name": "exchange",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "financeAddr",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "tokenStr",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "params",
                "type": "bytes"
            }
        ],
        "name": "financing",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32[]",
                "name": "currencys",
                "type": "bytes32[]"
            }
        ],
        "name": "getBalances",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "cy",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lasttime",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Hbank.RetAsset[]",
                "name": "item",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCheckList",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "key",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "time",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "currency",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "status",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Hbank.RetCheck[]",
                "name": "retcheck",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32[]",
                "name": "currencys",
                "type": "bytes32[]"
            }
        ],
        "name": "getInterestsList",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "cy",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "iRate",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Hbank.RetInterest[]",
                "name": "item",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "currency",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "count",
                "type": "uint256"
            }
        ],
        "name": "getRecords",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "len",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "time",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum Hbank.OperateType",
                        "name": "rType",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct Hbank.Record[]",
                "name": "list",
                "type": "tuple[]"
            },
            {
                "internalType": "uint256[]",
                "name": "statusList",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getRegisterList",
        "outputs": [
            {
                "components": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "name",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "phone",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "email",
                                "type": "string"
                            },
                            {
                                "internalType": "bytes32",
                                "name": "code",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "enum Hbank.KycState",
                                "name": "state",
                                "type": "uint8"
                            }
                        ],
                        "internalType": "struct Hbank.UserInfo",
                        "name": "info",
                        "type": "tuple"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "internalType": "struct Hbank.RetuserInfo[]",
                "name": "retuserInfo",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "UserAddress",
                "type": "address"
            }
        ],
        "name": "getUserInfo",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "phone",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "email",
                        "type": "string"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "code",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "enum Hbank.KycState",
                        "name": "state",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct Hbank.UserInfo",
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
                "internalType": "uint256",
                "name": "pageIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "pageCount",
                "type": "uint256"
            }
        ],
        "name": "getUserInfoList",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "len",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "name",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "phone",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "email",
                                "type": "string"
                            },
                            {
                                "internalType": "bytes32",
                                "name": "code",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "enum Hbank.KycState",
                                "name": "state",
                                "type": "uint8"
                            }
                        ],
                        "internalType": "struct Hbank.UserInfo",
                        "name": "info",
                        "type": "tuple"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "internalType": "struct Hbank.RetuserInfo[]",
                "name": "retuserInfo",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "pageIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "pageCount",
                "type": "uint256"
            }
        ],
        "name": "getWithdrawList",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "len",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "key",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "time",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "currency",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "status",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Hbank.RetCheck[]",
                "name": "retcheck",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "token",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "hbankWithdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "interests",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "iRate",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "manager",
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
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "phone",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            }
        ],
        "name": "modifyInformation",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
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
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "recharge",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "phone",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "code",
                "type": "bytes32"
            }
        ],
        "name": "register",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_swap",
                "type": "address"
            }
        ],
        "name": "setHSwap",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "currency",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "iRate",
                "type": "uint256"
            }
        ],
        "name": "setInterest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_manager",
                "type": "address"
            }
        ],
        "name": "setManager",
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
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "currency",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "withDraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]

export const dkrwdelegatejson: any =[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_dkrw",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_baseInfo",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_hbank",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_hSwap",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "RewardLog",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "contractOwner",
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
		"inputs": [],
		"name": "dailyTapIn",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "estimateTapInTime",
				"type": "uint256"
			}
		],
		"name": "delegateQueryTotalRevenue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
			},
			{
				"internalType": "bool",
				"name": "flag",
				"type": "bool"
			}
		],
		"name": "doInvest",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "opData",
				"type": "bytes"
			}
		],
		"name": "financing",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "refferCode",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "investorAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "investmentAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "happenedTime",
				"type": "uint256"
			}
		],
		"name": "investAction",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "manager",
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
		"inputs": [],
		"name": "owner",
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
		"inputs": [],
		"name": "queryTapInRevenueCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "queryTapInRevenueDetail",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "queryTotalRevenue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "start",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "perPage",
				"type": "uint256"
			}
		],
		"name": "queryUserInvestment",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "investmentTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "investmentAmount",
						"type": "uint256"
					}
				],
				"internalType": "struct DkrwDelegate.Investment[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"internalType": "uint256",
				"name": "totalRecords",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "start",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "perPage",
				"type": "uint256"
			}
		],
		"name": "queryUserInvestmentTapInRevenue",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "tapInDatetime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tapInRewardAmount",
						"type": "uint256"
					}
				],
				"internalType": "struct DkrwDelegate.UserTapInDailyReward[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"internalType": "uint256",
				"name": "totalRecords",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "startIdx",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "perPage",
				"type": "uint256"
			}
		],
		"name": "queryUserRecommendRevenue",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "rewardTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rewardAmount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "uname",
						"type": "string"
					}
				],
				"internalType": "struct DkrwDelegate.RecommendReward[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"internalType": "uint256",
				"name": "totalRecords",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "queryUserRecommendRevenueCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "queryUserRecommendRevenueDetail",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "baseInfoAddress",
				"type": "address"
			}
		],
		"name": "setBaseInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "dkrwAddress",
				"type": "address"
			}
		],
		"name": "setDkrw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "bankAddress",
				"type": "address"
			}
		],
		"name": "setHBank",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "swapAddress",
				"type": "address"
			}
		],
		"name": "setHSwap",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_manager",
				"type": "address"
			}
		],
		"name": "setManager",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "tapInRecordsMapping",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "lastTapInTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
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
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userInvestmentsMapping",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "investmentTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "investmentAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userRecommendRewardListMapping",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "rewardTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rewardAmount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "uname",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userTotalRevenueMapping",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalTapInRevenue",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalRecommendRevenue",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tapInRewardEstimate",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "token",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]

export const swapjson: any = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "tokenA",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "tokenB",
                "type": "string"
            }
        ],
        "name": "delPair",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "token",
                "type": "string"
            }
        ],
        "name": "exchange",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "tokenA",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "tokenB",
                "type": "string"
            }
        ],
        "name": "getPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "keys",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "head",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "tail",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "len",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "manager",
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
        "inputs": [],
        "name": "owner",
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
                "internalType": "uint256",
                "name": "_start",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_end",
                "type": "uint256"
            }
        ],
        "name": "pairList",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "tokenA",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "tokenB",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "feeRate",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Swap.Pair[]",
                "name": "rets",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "pairs",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "tokenA",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "tokenB",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "feeRate",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "tokenA",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "tokenB",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "feeRate",
                "type": "uint256"
            }
        ],
        "name": "setFeeRate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_manager",
                "type": "address"
            }
        ],
        "name": "setManager",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "tokenA",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "tokenB",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "setPair",
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
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "token",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]
