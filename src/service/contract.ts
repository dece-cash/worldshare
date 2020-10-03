import * as config from './config'
import service from "./service";
import BigNumber from "bignumber.js";
import * as utils from "../common/utils";
import {fromValue} from "../common/utils";
import {Account} from './service'

const serojs = require("serojs")
const seropp = require("sero-pp")

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
    refferId:number;
    value:BigNumber;
    returnValue:BigNumber;
    canDrawupValue:BigNumber;
    level:number;
    recommendProfit:BigNumber;
    boosterProfit:BigNumber;
    roolupProfit:BigNumber;
    suportProfit:BigNumber;

    achievement:BigNumber;
    otherAchievement:BigNumber;

    avatarValue:BigNumber;
}

export interface Detail {
    ID:number;
    idLeft:string;
    idRight:string;
    grand:BigNumber;
    small:BigNumber;
    boosterLevel:number;

    player:Player;
    reffer:string;
}

class Contract {

    contract: any;

    constructor() {
        this.contract = serojs.callContract(config.abi, config.address)

    }

    async details(from:string):Promise<Detail>{
        const rest = await this.call("details",[],from);
        console.log("rest>>> ",rest);

        const details:Detail =  {
            ID:parseInt(rest[0][0]),
            idLeft:rest[0][1],
            idRight:rest[0][2],
            grand:fromValue(rest[0][3],18),
            small:fromValue(rest[0][4],18),
            boosterLevel:parseInt(rest[0][5]),
            player:{
                refferId:parseInt(rest[0][6][0]),
                value:utils.fromValue(rest[0][6][1],18),
                returnValue:utils.fromValue(rest[0][6][2],18),
                canDrawupValue:utils.fromValue(rest[0][6][3],18),
                level:parseInt(rest[0][6][4]),
                recommendProfit:utils.fromValue(rest[0][6][5],18),
                boosterProfit:utils.fromValue(rest[0][6][6],18),
                roolupProfit:utils.fromValue(rest[0][6][7],18),
                suportProfit:utils.fromValue(rest[0][6][8],18),

                achievement:utils.fromValue(rest[0][6][9],18),
                otherAchievement:utils.fromValue(rest[0][6][10],18),

                avatarValue:utils.fromValue(rest[0][6][11],18),
            },
            reffer:rest[0][7],
        }
        console.log("details>>>>",details);
        return details;
    }

    async register(referCode:string|undefined,account:any,cy:string,value:BigNumber):Promise<any>{
        return this.execute("register",[referCode?referCode:""],account,cy,utils.toHex(value))
    }

    async withdraw(account:any):Promise<any>{
        return this.execute("withdraw",[],account,"DECE","0x0")
    }

    async call(method: string, args: Array<any>, from: string): Promise<any> {
        const packData: any = this.contract.packData(method, args, true)
        const contract = this.contract;
        return new Promise((resolve, reject) => {
            const params: Params = {
                to: this.contract.address
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

    async execute(method: string, args: Array<any>, account: Account, cy?: string, value?: string): Promise<any> {
        const packData: any = this.contract.packData(method, args, true)

        return new Promise((resolve, reject) => {
            const params: Params = {
                to: this.contract.address
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