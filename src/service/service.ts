import axios from 'axios'
import * as config from './config'
import i18n from '../i18n'
const seropp= require("sero-pp")

export interface Account {
    pk:string
    mainPKr:string
    balance:Map<string,string>
    name:string
    isCurrent?:boolean
}

class Service {

    id:number
    logRpc:string

    constructor(){
        this.id = 0;
        this.logRpc = "https://event.dece.cash";
    }

    async rpc(method:string, args:any){
        let host = localStorage.getItem("host");
        if(!host){
            await this.initDApp();
            host = localStorage.getItem("host");
        }
        const data: any = {
            id: this.id++,
            method: method,
            params: args
        }
        return new Promise((resolve, reject) => {
            if(!host){
                reject(new Error("rpc unset !"))
            }else{
                axios.post(host, data).then((resp: any) => {
                    if(resp.data && resp.data.error){
                        reject(resp.data.error.message)
                    }else if(resp.data && resp.data.result){
                        resolve(resp.data.result)
                    }
                }).catch((e:any) => {
                    reject(e)
                })
            }
        })
    }

    async accountList():Promise<Array<Account>>{
        return new Promise((resolve, reject) => {
            seropp.getAccountList(function (data:Array<any>,err:any) {
                if(err){
                    reject(err)
                }else{
                    let retMap:Array<Account> = [];
                    if(data){
                        data.forEach((v => {
                            retMap.push({
                                pk:v.PK,
                                mainPKr:v.MainPKr,
                                balance:v.Balance,
                                name:v.Name,
                                isCurrent:v.IsCurrent
                            })
                        }))
                    }
                    resolve(retMap)
                }
            })
        })
    }

    async accountDetail(pk:string):Promise<Account>{
        return new Promise((resolve, reject) => {
            seropp.getAccountDetail(pk,function (data:any,err:any) {
                if(err){
                    reject(err)
                }else{
                    resolve({
                        pk:data.PK,
                        mainPKr:data.MainPKr,
                        balance:data.Balance,
                        name:data.Name,
                        isCurrent:data.IsCurrent
                    })
                }
            })
        })
    }

    async initDApp(){
        const dapp = {
            name: "WORLD SHARE",
            contractAddress: config.address,
            github: "https://github.com/",
            author: "dece",
            url: window.location.origin+window.location.pathname,
            logo: window.location.origin+window.location.pathname +"images/logo.png",

            barColor:"#36519d",
            navColor:"#36519d",
            barMode:"dark",
            navMode:"light"
        }

        seropp.init(dapp,function (rest:any,err:any) {

            return new Promise((resolve,reject)=>{
                if(err){
                    reject(err)
                }else{
                    seropp.getInfo(function (data:any) {
                        if(data){
                            localStorage.setItem("language",data.language);
                            localStorage.setItem("host",data.rpc)
                            i18n.changeLanguage(data.language).then(() => {
                            });
                        }
                        resolve()
                    })
                }
            })
        });

    }

    async getTransactionReceipt(hash:string){
        const that = this;
        return new Promise((resolve, reject)=>{
            that.rpc("dece_getTransactionReceipt",[hash]).then((rest:any)=>{
                resolve(rest)
            }).catch(e=>{
                reject(e)
            })
        })
    }

    async getAvatarLogs(id:number){
        return new Promise((resolve, reject)=>{
            const data: any = {
                id: this.id++,
                method: "share_getAvatarLog",
                params: [id]
            }
            axios.post(this.logRpc, data).then((resp: any) => {
                if(resp.data && resp.data.error){
                    reject(resp.data.error.message)
                }else if(resp.data){
                    resolve(resp.data.result)
                }
            }).catch((e:any) => {
                reject(e)
            })
        })
    }

    async getProfitLogs(id:number){
        return new Promise((resolve, reject)=>{
            const data: any = {
                id: this.id++,
                method: "share_getProfitLog",
                params: [id]
            }
            axios.post(this.logRpc, data).then((resp: any) => {
                if(resp.data && resp.data.error){
                    reject(resp.data.error.message)
                }else if(resp.data){
                    resolve(resp.data.result)
                }
            }).catch((e:any) => {
                reject(e)
            })
        })
    }

    async getGenerationLogs(id:number){
        return new Promise((resolve, reject)=>{
            const data: any = {
                id: this.id++,
                method: "share_getGenerationLog",
                params: [id]
            }
            axios.post(this.logRpc, data).then((resp: any) => {
                if(resp.data && resp.data.error){
                    reject(resp.data.error.message)
                }else if(resp.data){
                    resolve(resp.data.result)
                }
            }).catch((e:any) => {
                reject(e)
            })
        })
    }

}
const service = new Service();


export default service