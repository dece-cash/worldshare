import * as config from './config'
import service from "./service";
import BigNumber from "bignumber.js";
import * as utils from "../common/utils";
import { fromValue } from "../common/utils";
import { Account } from './service'

const Web3EthAbi = require('web3-eth-abi');
const bs58 = require('bs58')

const serojs = require("serojs")
const seropp = require("sero-pp")
const proxyAddr = bs58.encode(Buffer.from( bs58.decode(config.dkrwdelegateaddress).toString('hex') 
    + '0000000000000000000000000000000000000000000000000000000000000000', 'hex'))
export interface Params {
    from?: string
    to: string
    cy?: string
    value?: string
    gas?: string
    gasPrice?: string
    data?: string
}

export interface Player {
    refferId: number;
    value: BigNumber;
    returnValue: BigNumber;
    canDrawupValue: BigNumber;
    level: number;
    recommendProfit: BigNumber;
    boosterProfit: BigNumber;
    roolupProfit: BigNumber;
    suportProfit: BigNumber;

    achievement: BigNumber;
    otherAchievement: BigNumber;

    avatarValue: BigNumber;
    overflowValue: BigNumber;
}

export interface Detail {
    ID: number;
    idLeft: string;
    idRight: string;
    grand: BigNumber;
    small: BigNumber;
    boosterLevel: number;

    player: Player;
    reffer: string;
}

class Contract {

    contract: any;
    hbank: any;
    dkrwdelegate: any;
    swap: any;
    constructor() {
        this.contract = serojs.callContract(config.abi, config.address);
        this.hbank = serojs.callContract(config.hbankjson, config.hbankaddress);
        this.dkrwdelegate = serojs.callContract(config.dkrwdelegatejson, config.dkrwdelegateaddress);
        this.swap = serojs.callContract(config.swapjson, config.swapAddress);
    }

    async details(from: string): Promise<Detail> {


        const rest = await this.call("details", [], from);
        const details: Detail = {
            ID: parseInt(rest[0][0]),
            idLeft: rest[0][1],
            idRight: rest[0][2],
            grand: fromValue(rest[0][3], 18),
            small: fromValue(rest[0][4], 18),
            boosterLevel: parseInt(rest[0][5]),
            player: {
                refferId: parseInt(rest[0][6][0]),
                value: utils.fromValue(rest[0][6][1], 18),
                returnValue: utils.fromValue(rest[0][6][2], 18),
                canDrawupValue: utils.fromValue(rest[0][6][3], 18),
                level: parseInt(rest[0][6][4]),
                recommendProfit: utils.fromValue(rest[0][6][5], 18),
                boosterProfit: utils.fromValue(rest[0][6][6], 18),
                roolupProfit: utils.fromValue(rest[0][6][7], 18),
                suportProfit: utils.fromValue(rest[0][6][8], 18),
                achievement: utils.fromValue(rest[0][6][9], 18),
                otherAchievement: utils.fromValue(rest[0][6][10], 18),

                avatarValue: utils.fromValue(rest[0][6][11], 18),
                overflowValue: utils.fromValue(rest[0][6][12], 18),
            },
            reffer: rest[0][7],
        }
        return details;
    }

    async register(referCode: string | undefined, account: any, value: BigNumber): Promise<any> {
        return this.execute("register", [referCode ? referCode : ""], account, "DKRW", utils.toHex(value))
    }

    
    async proxyRegister(referCode: string | undefined, account: any, value: BigNumber): Promise<any> {
        return this.execute("doInvest", [referCode ? referCode : "", false], account, "DKRW", utils.toHex(value), this.dkrwdelegate)
    }

    async withdraw(account: any): Promise<any> {
        return this.execute("withdraw", [], account, "DECE", "0x0")
    }

    async getBalances(mainPKr: string): Promise<any> {
        return this.call("getBalances", [["DKRW"]], mainPKr, this.hbank)
    }

    async getShortAddress(pkr:any): Promise<any> {
        return new Promise((resolve, reject)=>{
            service.rpc("dece_getShortAddress", [pkr]).then(ret=>{
                resolve(ret);
            })
        })
    }

    async financing(referCode: string | undefined, account: any, value: BigNumber): Promise<any> {
        let shortAddr = await this.getShortAddress(account.mainPKr);
        let params = Web3EthAbi.encodeParameters(['address', 'string'], [shortAddr, referCode]);
        return this.execute("financing", [proxyAddr, "DKRW", value.toString(10), params], account, "DECE", "0x0", this.hbank)
    }
    // getUserInfo(mainPKr, callback) {
	// 	this.callMethod(hbank, 'getUserInfo', mainPKr, [mainPKr], function (res) {
	// 		callback(res);
	// 	})
    // }
    
    async getUserInfo(mainPKr:any) {
        return this.call('getUserInfo',[mainPKr],mainPKr,this.hbank);
    }

    async proxyFinancing(referCode: string | undefined, account: any, value: BigNumber): Promise<any> {

        let shortAddr = await this.getShortAddress(account.mainPKr);
        let params = Web3EthAbi.encodeParameters(['address', 'string'], [shortAddr, referCode]);
        return this.execute("financing", [params], account, "DKRW", value.toString(10), this.dkrwdelegate)
    }

    async call(method: string, args: Array<any>, from: string, contract?: any): Promise<any> {
        if (!contract) {
            contract = this.contract;
        }
        const packData: any = contract.packData(method, args)
        return new Promise((resolve, reject) => {
            const params: Params = {
                to: contract.address
            }
            params.from = from
            params.data = packData;

            service.rpc("dece_call", [params, "latest"]).then(data => {

                
                if (data != "0x") {
                    const rest: any = contract.unPackDataEx(method, data)
                    resolve(rest)
                } else {
                }
            }).catch(err => {
                reject(err)
            })

        })
    }


    async execute(method: string, args: Array<any>, account: Account, cy?: string, value?: string, contract?: any): Promise<any> {
        if (!contract) {
            contract = this.contract;
        }
        const packData: any = contract.packData(method, args, true)

        return new Promise((resolve, reject) => {
            const params: Params = {
                to: contract.address
            }
            params.from = account.mainPKr
            params.data = packData;
            if (cy) {
                params.cy = cy;
            }
            if (value) {
                params.value = value;
            }
            service.rpc("dece_estimateGas", [params]).then((data: any) => {
                params.gas = data;
                params.from = account.pk
                seropp.executeContract(params, function (hash: any, err: any) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(hash)
                    }
                })
            }).catch(e => {
                reject(e)
            })
        })
    }

}

const contract = new Contract();

export default contract