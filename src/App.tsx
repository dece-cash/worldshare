import * as React from 'react';

import {Layout, Tabs, Space, Button, Descriptions,Tag,Menu,Rate,Statistic, Spin,Modal, List, message, Input, Divider,Radio, Row, Col} from 'antd'
import {UserOutlined,SyncOutlined} from '@ant-design/icons'
import copy from 'copy-text-to-clipboard/index'
import { WaterWave,Pie, yuan } from 'ant-design-pro/lib/Charts';
import './App.less';
import './css/style.css'
import service, {Account} from "./service/service";
import SelectAccount from './components/selectAccount'
import * as utils from './common/utils'
import contract, {Detail} from './service/contract'
import * as config from "./service/config";
import BigNumber from "bignumber.js";
import i18n from './i18n'

const {Header, Footer, Content} = Layout;
const {TabPane} = Tabs;

const QRCode = require('qrcode')

function callback(key: any) {
    console.log(key);
}
// const levels:Array<number> = [120000,360000,1200000,3600000,12000000];
const levels:Array<number> = [12,36,120,360,1200];
const levelMul = [3,4,5,5,5]

interface Visible {
    account:boolean
    deposit:boolean
    viewLevel:boolean
    buyLevel:boolean
    createAvatar:boolean
    withdraw:boolean
    avatarList:boolean
    generationList:boolean
    organizationChart:boolean
    listOfProfit:boolean
}
const optionsLevels  = [
    { label: 'Level 1', value: 0, disabled: false},
    { label: 'Level 2', value: 1, disabled: false},
    { label: 'Level 3', value: 2, disabled: false },
    { label: 'Level 4', value: 3, disabled: false },
    { label: 'Level 5', value: 4, disabled: false },
]

export interface State {
    account:Account
    accounts:Array<Account>
    visible:Visible
    detail?:Detail
    referCode?:string
    selectLevel:number
    investAmount?:string|number
    spining:boolean
    showChart:boolean

    profitLogs?:any
    avatarLogs?:any
    generationLogs?:any
}

class App extends React.Component<any,State> {

    state:State = {
        account:{name:"",pk:"",mainPKr:"",balance:new Map()},
        accounts:[],
        selectLevel:0,
        spining:false,
        showChart:false,
        visible:{account:false,deposit:false,viewLevel:false,buyLevel:false,createAvatar:false,withdraw:false,avatarList:false,generationList:false,organizationChart:false,listOfProfit:false },

    }

    componentDidMount(): void {
        const that = this;
        service.initDApp().catch();
        
        this.getAccountList().then((account:any)=>{
            that.getDetails(account)
            setTimeout(function () {
                that.setState({
                    showChart:true
                })
            },3000)
        });
    }

    async getAccountList (){
        const _accounts:Array<Account> = await service.accountList();
        const pk:any = localStorage.getItem("actPK")
        let ret:Account;
        if(pk){
            const act:Account = await service.accountDetail(pk)
            ret = act;
            this.setState({
                account:act,
                accounts:_accounts
            })
        }else{
            if(_accounts && _accounts.length>0){
                ret = _accounts[0];
                this.setState({
                    account:_accounts[0],
                    accounts:_accounts
                })
            }
        }
        return new Promise(resolve => {
            resolve(ret)
        })
    }

    getBalance = (cy:string) =>{
        const {account} = this.state;
        return utils.fromValue(account.balance.get(cy),18).toNumber().toFixed(3)
    }

    getBalanceNumber = (cy:string) =>{
        const {account} = this.state;
        return utils.fromValue(account.balance.get(cy),18).toNumber()
    }

    getDetails=(account:Account)=>{
        const that = this;
        if(!account){
            account = that.state.account;
        }
        if(account){
            contract.details(account.mainPKr).then((rest:Detail)=>{
                that.setState({
                    detail:rest,
                    selectLevel:rest.player.level,
                    spining:false
                })
            })
        }
    }

    register=()=>{
        const that = this;
        let {referCode,account,selectLevel,detail} = this.state;
        let amount = utils.toValue(levels[selectLevel],18);
        if(detail && detail.ID){
            referCode = "";
            amount = utils.toValue(levels[selectLevel] - detail.player.value.toNumber(),18);
        }else{
            if(!referCode){
                message.error("Please Input ReferCode")
                // return;
            }
        }
        contract.register(referCode,account,"DKRW",amount).then(hash=>{
            message.success("SUCCESSFULLY")
            that.setShowBuyModal(false)
            that.setState({spining:true})
            that.getTxStatus(hash).then(()=>{
                that.setState({spining:false})

            }).catch(e=>{
                if(e){
                    const err = typeof e =='string'?e:e.message;
                    message.error(err)
                }
            })
        }).catch(e=>{
            message.error(e)
        })
    }

    createAvatar=()=>{
        const that = this;
        const {account,selectLevel,detail} = this.state;
        let amount = utils.toValue(0,18);
        if(detail && detail.ID){
            amount = utils.toValue(levels[detail.player.level-1],18);
        }
        contract.register("",account,"DKRW",amount).then(hash=>{
            message.success("SUCCESSFULLY")
            that.setShowCreateAvatarModal(false)
            that.setState({spining:true})
            that.getTxStatus(hash).then(()=>{
                that.setState({spining:false})
            }).catch(e=>{
                if(e){
                    const err = typeof e =='string'?e:e.message;
                    message.error(err)
                }
            })
        }).catch(e=>{
            if(e){
                const err = typeof e =='string'?e:e.message;
                message.error(err)
            }
        })
    }

    async getTxStatus(hash:string){
        const that = this;
        const {account} = this.state;
        return new Promise(((resolve,reject) => {
            let id:any;
            id = setInterval(()=>{
                service.getTransactionReceipt(hash).then(rest=>{
                    if(rest){
                        clearInterval(id);
                        that.getAccountList().then(()=>{
                            that.getDetails(account)
                        });
                        resolve();
                    }
                }).catch(e=>{
                    if(e){
                        const err = typeof e =='string'?e:e.message;
                        message.error(err)
                    }
                    reject()
                })
            },5*1000)
        }))
    }

    withdraw=()=>{
        const that = this;
        const {account,detail} = this.state;
        if(detail && detail.player.canDrawupValue.toNumber()>0){
            contract.withdraw(account).then(hash=>{
                message.success("SUCCESSFULLY")
                that.setState({spining:true})
                that.getTxStatus(hash).then(()=>{
                    that.setState({spining:false})
                }).catch(e=>{
                    if(e){
                        const err = typeof e =='string'?e:e.message;
                        message.error(err)
                    }
                })
            }).catch(e=>{
                if(e){
                    const err = typeof e =='string'?e:e.message;
                    message.error(err)
                }
            })
        }
    }

    copyTo = (v:string)=>{
        copy(v);
        message.success("COPY SUCCESS")
    }


    setShowDepositModal = (f:boolean)=>{
        const {visible,account} = this.state;
        visible.deposit = f;
        if(!f){
            this.setState({
                visible:visible
            })
        }else{
            this.setState({
                visible:visible
            })

            setTimeout(()=>{
                let canvas = document.getElementById('canvas')
                if(canvas && account && account.mainPKr){
                    QRCode.toCanvas(canvas, account.mainPKr,{width:168,height:168}, function (error:any) {
                        console.log(error);
                    })
                }
            },200)
        }

    }

    setShowViewLevelModal = (f:boolean)=>{
        const {visible} = this.state;
        visible.viewLevel = f;
        this.setState({
            visible:visible
        })
    }
    setShowBuyModal = (f:boolean)=>{
        const {visible} = this.state;
        visible.buyLevel = f;
        this.setState({
            visible:visible
        })
    }
    setShowCreateAvatarModal = (f:boolean)=>{
        const {visible} = this.state;
        visible.createAvatar = f;
        this.setState({
            visible:visible
        })
    }
    setShowAvatarListModal = (f:boolean)=>{
        const {visible,detail} = this.state;
        visible.avatarList = f;
        if(f){
            service.getAvatarLogs(detail ? detail.ID:0).then((rest:any)=>{
                this.setState({
                    visible:visible,
                    avatarLogs:rest
                })
            })
        }else{
            this.setState({
                visible:visible,
            })
        }
    }
    setShowGenerationListModal = (f:boolean)=>{
        const {visible,detail} = this.state;
        visible.generationList = f;
        if(f){
            service.getGenerationLogs(detail ? detail.ID*2:0).then((restA:any)=>{
                service.getGenerationLogs(detail ? detail.ID*2+1:0).then((restB:any)=>{
                    this.setState({
                        visible:visible,
                        generationLogs:[restA,restB]
                    })
                })
            })
        }else{
            this.setState({
                visible:visible,
            })
        }
    }
    setShowOrganizationModal = (f:boolean)=>{
        const {visible} = this.state;
        visible.organizationChart = f;
        this.setState({
            visible:visible
        })
    }
    setShowListOfProfitModal = (f:boolean)=>{
        const {visible,detail} = this.state;
        visible.listOfProfit = f;
        if(f){
            service.getProfitLogs(detail ? detail.ID:0).then((rest:any)=>{
                this.setState({
                    visible:visible,
                    profitLogs:rest?rest.reverse():rest
                })
            })
        }else{
            this.setState({
                visible:visible,
            })
        }

    }

    setReferCode = (v:any)=>{
        this.setState({
            referCode:v.trim()
        })
    }

    setSelectLevel = (v:any)=>{
        console.log("setSelectLevel>>> ",v);
        this.setState({
            selectLevel:parseInt(v.target.value!)
        })
    }

    selectAccount = (account:Account)=>{
        if(account){
            const {visible} = this.state;
            visible.account = false;
            this.setState({account:account,visible:visible})
            this.getDetails(account);
            localStorage.setItem("actPK",account.pk)
        }
    }

    render() {

        const {visible,accounts,account,detail,selectLevel,spining,referCode,showChart,profitLogs,avatarLogs,generationLogs} = this.state;

        // selectLevel = detail && detail.ID? detail.player.level:selectLevel;
        const optionsLevelsTmp:Array<any>=[];
        for(let v of optionsLevels){
            optionsLevelsTmp.push({ label: v.label, value: v.value, disabled: v.disabled});
        }

        if(detail && detail.ID){
            for(let i=0;i< detail.player.level;i++){
                optionsLevelsTmp[i].disabled = true
            }
        }
        const salesPieData = [
            {
                x: i18n.t("recommend"),
                y: detail && detail.ID ? detail.player.recommendProfit.toNumber():0
            },
            {
                x: i18n.t("support"),
                y: detail && detail.ID ? detail.player.suportProfit.toNumber():0
            },
            {
                x: i18n.t("booster"),
                y: detail && detail.ID ? detail.player.boosterProfit.toNumber():0
            },
            {
                x: i18n.t("rollup"),
                y: detail && detail.ID ? detail.player.roolupProfit.toNumber():0
            }
        ];

        const percent = detail&&detail.ID ? parseFloat(detail.player.returnValue.dividedBy(detail.player.value.multipliedBy(levelMul[detail.player.level-1]).plus(detail.player.avatarValue)).multipliedBy(100).toFixed(2)):0;


        return <>
            <Layout>

                <Content
                    className="site-layout-background"
                >
                    <Spin tip="Pending..." spinning={spining}>
                        <div className="content" style={{minHeight: document.documentElement.clientHeight*0.88}}>

                            <h1>{i18n.t("accountInfo")}</h1>
                            <Row>
                                <Col span={18}>
                                    {account.name} ({utils.ellipsis(account.mainPKr)})
                                </Col>
                                <Col span={6}>
                                    <Button type="primary" size="small" onClick={()=>{visible.account = true;this.setState({visible:visible})}}>{i18n.t("switch")}</Button>
                                </Col>
                            </Row>
                            <Divider dashed/>
                            <Row>
                                <Col span={12} className="text-center">
                                    <Descriptions title={i18n.t("referId")} column={1}>
                                        <Descriptions.Item label={i18n.t("idA")}>{detail&&detail.idLeft} {detail&&detail.idLeft&&<Button type="ghost" size="small" onClick={()=>{this.copyTo(detail?detail.idLeft:"")}}>{i18n.t("copy")}</Button>}</Descriptions.Item>
                                        <Descriptions.Item label={i18n.t("idB")}>{detail&&detail.idRight} {detail&&detail.idRight&&<Button type="ghost" size="small" onClick={()=>{this.copyTo(detail?detail.idRight:"")}}>{i18n.t("copy")}</Button>}</Descriptions.Item>
                                        <Descriptions.Item label={i18n.t("referId")}>{detail&&detail.reffer}</Descriptions.Item>
                                    </Descriptions>
                                </Col>
                                <Col span={12} className="text-center">
                                    <Descriptions title={i18n.t("balance")} column={1}>
                                        <Descriptions.Item><Statistic title="DKRW" value={this.getBalance("DKRW")} precision={3} /></Descriptions.Item>
                                        <Descriptions.Item><Button type="primary" size="small" onClick={()=>this.setShowDepositModal(true)}>{i18n.t("deposit")}</Button></Descriptions.Item>
                                    </Descriptions>
                                </Col>
                            </Row>
                            <Divider dashed/>

                            <Row>
                                <Col span={24} className="text-center">
                                    <Descriptions title={i18n.t("package")+" "+i18n.t("level")} column={1}>
                                        <Descriptions.Item label="">
                                            <span className="level-font">{i18n.t("level")} {detail && detail.player.level}</span>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Col>
                                <Col span={24} className="text-center">
                                    <Descriptions title="" column={5}>
                                        <Descriptions.Item>{""}</Descriptions.Item>
                                        <Descriptions.Item><Button type="primary" block size="small" onClick={()=>{this.setShowViewLevelModal(true)}}>{i18n.t("view")}</Button></Descriptions.Item>
                                        <Descriptions.Item>{""}</Descriptions.Item>
                                        <Descriptions.Item><Button type="primary" block  size="small" disabled={!!(detail&&detail.reffer&&detail.player.level==5)} onClick={()=>{this.setShowBuyModal(true)}}>{detail && detail.ID?i18n.t("levelUp"):i18n.t("buy")}</Button></Descriptions.Item>
                                        <Descriptions.Item>{""}</Descriptions.Item>
                                        {/*<Descriptions.Item><Button type="primary" size="small">UPGRADE</Button></Descriptions.Item>*/}
                                    </Descriptions>
                                </Col>
                            </Row>
                            <Divider/>
                            <h1>{i18n.t("profitInfo")}</h1>
                            <Row>
                                <Col span={12} className="text-center">
                                    <Descriptions column={1}>
                                        <Descriptions.Item><Statistic title={i18n.t("profitPool")} value={detail && detail.ID ?detail.player.value.multipliedBy(levelMul[detail.player.level-1]).plus(detail.player.avatarValue).toNumber():0} precision={3} /></Descriptions.Item>
                                        <Descriptions.Item>{""}</Descriptions.Item>
                                    </Descriptions>
                                </Col>
                                <Col span={12} className="text-center">
                                    <Descriptions column={1}>
                                        <Descriptions.Item><Statistic title={i18n.t("profitDKRW")} value={detail&&detail.player.canDrawupValue.toNumber()} precision={3} /></Descriptions.Item>
                                        <Descriptions.Item><Button type="primary" size="small" disabled={(!(detail && detail.player.canDrawupValue.toNumber()>0))} onClick={()=>{
                                            this.withdraw()
                                        }}>{i18n.t("withdraw")}</Button></Descriptions.Item>
                                    </Descriptions>
                                </Col>
                            </Row>
                            <Divider dashed/>
                            <Row>
                                <Col span={24} className="text-center">
                                    {showChart?<WaterWave height={200} title={i18n.t("returnedPoint")} percent={percent} />:<Spin style={{height:200}} spinning={true} tip="loading..."></Spin>}
                                </Col>
                            </Row>
                            <Divider dashed/>
                            <Row>
                                <Col span={24} className="text-center">
                                    <Button type="primary" block onClick={()=>{this.setShowCreateAvatarModal(true)}} disabled={!(detail && detail.idLeft)}>{i18n.t("createAvatar")}</Button>
                                </Col>
                            </Row>
                            <Divider dashed/>
                            <Row>
                                <Col span={24} className="text-center">
                                    <Descriptions title="" column={2}>
                                        <Descriptions.Item><Button type="primary" block size="small" onClick={()=>{this.setShowAvatarListModal(true)}}>AVATAR LIST</Button></Descriptions.Item>
                                        <Descriptions.Item><Button type="primary" block size="small" onClick={()=>{this.setShowGenerationListModal(true)}}>GENERATION 1 LIST</Button></Descriptions.Item>
                                        {/*<Descriptions.Item><Button type="primary" block size="small" onClick={()=>{this.setShowOrganizationModal(true)}}>ORGANIZATION CHART</Button></Descriptions.Item>*/}
                                        <Descriptions.Item><Button type="primary" block size="small" onClick={()=>{this.setShowListOfProfitModal(true)}}>LIST OF PROFIT</Button></Descriptions.Item>
                                    </Descriptions>
                                </Col>
                            </Row>
                            <Divider dashed/>
                            <Row>
                                <Col span={24} className="text-center">
                                    <Descriptions title={i18n.t("boosterLevel")} column={1}>
                                        <Descriptions.Item>
                                            <Rate value={detail?detail.boosterLevel:0} />
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} className="text-center">
                                    <Descriptions title="" column={2}>
                                        <Descriptions.Item>
                                            <Statistic title={i18n.t("large")} value={detail&&detail.grand.toNumber()} precision={3} />
                                        </Descriptions.Item>
                                        <Descriptions.Item>
                                            <Statistic title={i18n.t("small")} value={detail&&detail.small.toNumber()} precision={3} />
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Col>
                            </Row>
                            <Divider dashed/>
                            <Row>
                                <Col span={24}>
                                    <Pie
                                        animate
                                        hasLegend
                                        title={i18n.t("totalProfit")}
                                        subTitle={i18n.t("DKRW")}
                                        total={() => (
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: toDKRW(salesPieData.reduce((pre, now) => now.y + pre, 0)),
                                                }}
                                            />
                                        )}
                                        data={salesPieData}
                                        valueFormat={val => <span dangerouslySetInnerHTML={{ __html: toDKRW(val) }} />}
                                        height={200}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Spin>


                    <div>
                        <SelectAccount visible={visible.account} accounts={accounts} onCancel={()=>{
                            visible.account = false;
                            this.setState({visible:visible})
                        }} onOk={(account)=>this.selectAccount(account)}
                        />

                        <Modal
                            visible={visible.deposit}
                            title="Deposit"
                            footer={[]}
                            closable
                            onCancel={()=>this.setShowDepositModal(false)}
                            maskClosable
                        >
                            <div className="qrcode">
                                <canvas id="canvas"></canvas><br/>
                                <div>{account.mainPKr}</div><br/>
                                <Button type="primary" size="small" onClick={()=>{
                                    this.copyTo(account.mainPKr)
                                }}>Copy</Button>
                            </div>
                        </Modal>

                        <Modal
                            visible={visible.viewLevel}
                            title="VIEW PACKAGE"
                            footer={[]}
                            closable
                            onCancel={()=>this.setShowViewLevelModal(false)}
                            maskClosable
                        >
                            <div className="text-center">
                                <Descriptions column={1}>
                                    <Descriptions.Item label="" className="level-border"><Statistic title="Level 1" value={levels[0]} precision={0} suffix={"DKRW"}/></Descriptions.Item>
                                    <Descriptions.Item label="" className="level-border"><Statistic title="Level 2" value={levels[1]} precision={0} suffix={"DKRW"}/></Descriptions.Item>
                                    <Descriptions.Item label="" className="level-border"><Statistic title="Level 3" value={levels[2]} precision={0} suffix={"DKRW"}/></Descriptions.Item>
                                    <Descriptions.Item label="" className="level-border"><Statistic title="Level 4" value={levels[3]} precision={0} suffix={"DKRW"}/></Descriptions.Item>
                                    <Descriptions.Item label="" className="level-border"><Statistic title="Level 5" value={levels[4]} precision={0} suffix={"DKRW"}/></Descriptions.Item>
                                </Descriptions>
                            </div>
                        </Modal>

                        <Modal
                            visible={visible.buyLevel}
                            title={(detail && detail.ID)?"PACKAGE LEVEL UP":"BUY PACKAGE LEVEL"}
                            footer={[]}
                            closable
                            onCancel={()=>this.setShowBuyModal(false)}
                            maskClosable
                        >
                            <div>
                                <Row>
                                    <Col span={9}>REFER ID</Col>
                                    <Col span={15}><Input type="text" onChange={(e)=>this.setReferCode(e.target.value)} autoFocus={!(detail && detail.reffer)} disabled={!!(detail && detail.reffer)} value={detail && detail.reffer?detail.reffer:referCode} onBlur={(e)=>this.setReferCode(e.target.value)} /></Col>
                                </Row>
                                <Divider dashed/>
                                <Row>
                                    <Col span={9}>Select Level</Col>
                                    <Col span={15}>
                                        <Radio.Group
                                            options={optionsLevelsTmp}
                                            onChange={this.setSelectLevel}
                                            value={selectLevel?selectLevel:0}
                                            optionType="button"
                                            buttonStyle="solid"
                                        />
                                    </Col>
                                </Row>
                                <Divider dashed/>
                                <Row>
                                    <Col span={9}>NECESSARY QUANTITY</Col>
                                    <Col span={15}><Statistic title="" value={selectLevel?levels[selectLevel]-(detail && detail.ID ? detail.player.value.toNumber():0):levels[0]} precision={0} suffix={"DKRW"}/></Col>
                                </Row>
                                <Divider dashed/>
                                <Row>
                                    <Col span={9}>AVAILABLE QUANTITY</Col>
                                    <Col span={15}><Statistic title="" value={this.getBalanceNumber("DKRW")} precision={3} suffix={"DKRW"}/></Col>
                                </Row>
                                <Divider dashed/>
                                <Row>
                                    <Col span={24}>
                                        <Button block type="primary" onClick={()=>{
                                            this.register();
                                        }}>{(detail && detail.ID)?"LEVEL UP":"BUY"}</Button>
                                    </Col>
                                </Row>
                            </div>
                        </Modal>

                        <Modal
                            visible={visible.createAvatar}
                            title="CREATE AVATAR PACKAGE"
                            footer={[]}
                            closable
                            onCancel={()=>this.setShowCreateAvatarModal(false)}
                            maskClosable
                        >
                            <div>
                                <Row className="text-center">
                                    <Col span={24}>
                                        <Descriptions title="MY AVATAR PACKAGE" column={1}>
                                            <Descriptions.Item label="">
                                                <span className="level-font">LEVEL {detail && detail.player.level}</span>
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                </Row>
                                <Divider dashed/>
                                <Row>
                                    <Col span={9}>NECESSARY QUANTITY</Col>
                                    <Col span={15}><Statistic title="" value={detail && detail.ID?levels[detail.player.level-1]:levels[0]} precision={0} suffix={"DKRW"}/></Col>
                                </Row>
                                <Divider dashed/>
                                <Row>
                                    <Col span={9}>AVAILABLE QUANTITY</Col>
                                    <Col span={15}><Statistic title="" value={this.getBalanceNumber("DKRW")} precision={3} suffix={"DKRW"}/></Col>
                                </Row>
                                <Divider dashed/>
                                <Row>
                                    <Col span={24}>
                                        <Button block type="primary" onClick={()=>{
                                            this.createAvatar();
                                        }}>CREATE AVATAR</Button>
                                    </Col>
                                </Row>
                            </div>
                        </Modal>

                        <Modal
                            visible={visible.avatarList}
                            title="AVATAR LIST"
                            footer={[]}
                            closable
                            onCancel={()=>this.setShowAvatarListModal(false)}
                            maskClosable
                        >
                            <div className="text-center modal-max-height">
                                <Row>
                                    <Col span={8}>LEVEL</Col><Col span={8}>REFER ID</Col><Col span={8}>CREATE DATE</Col>
                                </Row>
                                <Divider/>
                                {avatarLogs && avatarLogs.length>0 && avatarLogs.map((v:any)=>{
                                    return <div>
                                        <Row>
                                            <Col span={8}>{v.level}</Col><Col span={8}>{v.refferid}</Col><Col span={8}>{utils.formatDate(v.CreateDate*1000)}</Col>
                                        </Row>
                                        <Divider dashed/>
                                    </div>
                                })}
                            </div>
                        </Modal>

                        <Modal
                            visible={visible.generationList}
                            title="GENERATION LIST"
                            footer={[]}
                            closable
                            onCancel={()=>this.setShowGenerationListModal(false)}
                            maskClosable
                        >
                            <div className="text-center modal-max-height">
                                <Row>
                                    <Col span={12}>
                                        LEFT<br/>{detail && detail.idLeft}
                                    </Col>
                                    <Col span={12}>
                                        RIGHT<br/>{detail && detail.idRight}
                                    </Col>
                                </Row>
                                <Divider/>
                                <Row>
                                    <Col span={10}>
                                        {
                                            generationLogs&&generationLogs.length>0&&generationLogs[0]&&generationLogs[0].map((v:any,index:number)=>{
                                                return <div className="text-center">
                                                    ID A-{v.id}
                                                    </div>
                                            })
                                        }
                                    </Col>
                                    <Col span={2}>
                                        <Divider type="vertical"/>
                                    </Col>

                                    <Col span={10}>
                                        {
                                            generationLogs&&generationLogs.length>0&&generationLogs[1]&&generationLogs[1].map((v:any,index:number)=>{
                                                return <div className="text-center">
                                                    ID B-{v.id}
                                                </div>
                                            })
                                        }
                                    </Col>
                                </Row>

                            </div>
                        </Modal>

                        <Modal
                            visible={visible.organizationChart}
                            title="View Package Level"
                            footer={[]}
                            closable
                            onCancel={()=>this.setShowOrganizationModal(false)}
                            maskClosable
                        >
                            <div>
                                organizationChart
                            </div>
                        </Modal>

                        <Modal
                            visible={visible.listOfProfit}
                            title="PROFIT LIST"
                            footer={[]}
                            closable
                            onCancel={()=>this.setShowListOfProfitModal(false)}
                            maskClosable
                        >
                            <div className="text-center modal-max-height">
                                <Row>
                                    <Col span={3}>ID</Col><Col span={9}>Type</Col><Col span={8}>Value</Col><Col span={4}>Block</Col>
                                </Row>
                                <Divider/>
                                {profitLogs && profitLogs.length>0 && profitLogs.map((v:any,index:number)=>{
                                    return <div>
                                            <Row>
                                                <Col span={3}>{index+1}</Col><Col span={9}>{utils.toType(v.ptype)}</Col><Col span={8}>{utils.fromValue(v.value,18).toFixed(3,1)}</Col><Col span={4}>{new BigNumber(v.raw.blockNumber).toNumber()}</Col>
                                            </Row>
                                            <Divider dashed/>
                                        </div>

                                })}
                            </div>
                        </Modal>

                    </div>
                </Content>
                {/*<Footer className="footer">WORLD SHARE ©2020</Footer>*/}
            </Layout>
        </>;
    }
}

function toDKRW(v:any) {
    return v?v.toFixed(3):"0.000"
}

export default App;
