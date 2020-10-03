import * as React from 'react';

import {Modal,List}  from 'antd'
import {Account} from '../service/service'
import * as utils from '../common/utils'

interface Props {
    visible:boolean
    accounts:Array<Account>
    onOk:(account:Account)=>void;
    onCancel:()=>void;
}
class SelectAccount extends React.Component<any,Props> {

    props:Props

    constructor(props:Props) {
        super(props);
        this.props = props;
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <Modal
            visible={this.props.visible}
            title="SWITCH ACCOUNT"
            footer={[]}
            closable
            onCancel={this.props.onCancel}
            maskClosable
            >
                <List
                    size="small"
                    bordered
                    dataSource={this.props.accounts}
                    renderItem={(item:Account) => <List.Item onClick={()=>this.props.onOk(item)}>{item.name}({utils.ellipsis(item.mainPKr)})</List.Item>}
                />
            </Modal>
        );
    }
}

export default SelectAccount