import { Component } from '@tarojs/taro';
import './index.less';
import { getHomeWorkList, saveMsg, saveHomeWork } from '../../server';
import { AtCard, AtTag, AtFloatLayout, AtTextarea, AtButton, AtToast } from 'taro-ui';
import prefix from '../../server/config';
export default class StudentPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            homeWorkList: [],
            isOpened: false,
            message: '',
            nowHomeWorkId: 0,
            isLeaveMsg: false,
            text: '留言成功'
        }
    }

    componentDidMount(){
        const { token } = this.props;
        getHomeWorkList({},{'Authorization': `Bearer ${token}`}, (res) => {
            console.log(res);
            if(res.code === '0'){
                this.setState({
                    homeWorkList: res.data
                })
            }

        })  
    }

    leaveMsg = (id) => {
        this.setState({
            isOpened: true,
            nowHomeWorkId: id
        })
    }

    handleClose = () => {
        this.setState({
            isOpened: false
        })
    }

    handleChange = (value) => {
        this.setState({
            message: value
        })
    }

    submitMsg = () => {
        const { nowHomeWorkId, message } = this.state;
        const { token } = this.props;
        let params = {
            commentContent: message,
            myHomeWorkId: nowHomeWorkId
        }

        saveMsg(params, {'Authorization': `Bearer ${token}`}, res => {
            console.log(res);
            if(res.code === '0'){
                this.setState({
                    isLeaveMsg: true,
                    text: '留言成功'
                })
            }
        })
    }

    submitHomeWork = (id, type="submit") => {
        const { token } = this.props;
        const _this = this;
        let url = "myHomeWork/save/upload";
        if(type == 'update'){
            url= `myHomeWork/update/upload`;
        }
        if(type == 'submit')
        wx.chooseMessageFile({
            count: 10,
            type: 'all',
            success (res) {
              const tempFilePaths = (res.tempFiles)[0];
              wx.uploadFile({
                url: `${prefix}/${url}`,
                filePath: tempFilePaths.path,
                name: 'file',
                formData: {
                    'homeWorkId': id,
                    file: tempFilePaths
                },
                header:{
                    'Authorization': `Bearer ${token}`
                },
                success: (res) => {
                    _this.setState({
                        isLeaveMsg: true,
                        text: '提交作业成功'
                    })
                }
              })
            }
        })
        else
        wx.chooseMessageFile({
            count: 10,
            type: 'all',
            success (res) {
              const tempFilePaths = (res.tempFiles)[0];
              wx.uploadFile({
                url: `${prefix}/${url}`,
                filePath: tempFilePaths.path,
                name: 'file',
                formData: {
                    'id': id,
                    file: tempFilePaths
                },
                header:{
                    'Authorization': `Bearer ${token}`
                },
                success: (res) => {
                    _this.setState({
                        isLeaveMsg: true,
                        text: '更新作业成功'
                    })
                }
              })
            }
        })
    }

    goDetai = (id) => {
        const { token } = this.props;
        let params = {
            url: `../../pages/homework_detail/index?id=${id}&token=${token}&type=student`
        }
        Taro.navigateTo(params).then(res => {})
    }

    render(){
        const { homeWorkList, isOpened, message, isLeaveMsg, text } = this.state;
        return (
            <View className="container">
                {
                    homeWorkList.length > 0 ? homeWorkList.map(item => 
                        <View className="item-card" key={item.id}>
                        <AtCard
                            note=''
                            extra={item.createTime}
                            title={item.homeWorkName}
                            thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
                        >
                        <View>{item.homeWorkRequest}</View>
                        <View className="tag-list">
                            {/* <AtTag size='small' circle onClick={() => this.leaveMsg(item.id)}>留言</AtTag> */}
                            <AtTag size='small' circle onClick={() => this.submitHomeWork(item.id)}>提交作业</AtTag>
                            <AtTag size='small' circle onClick={() => this.submitHomeWork(item.id) }>作业更新</AtTag>
                            <AtTag size='small' circle  onClick={() => this.goDetai(item.id)}>查看留言</AtTag>
                        </View>
                        
                        </AtCard>  
                        </View>  
                    ) : <View>
                    <AtNoticebar>暂无作业</AtNoticebar>
                </View>
                }
               <AtFloatLayout isOpened={isOpened} title="留言" onClose={this.handleClose.bind(this)}>
                <AtTextarea
                    value={message}
                    onChange={this.handleChange}
                    maxLength={200}
                    placeholder='你的问题是...'
                />
                <View className="submit-btn"><AtButton type='primary' onClick={this.submitMsg}>提交</AtButton></View>
                </AtFloatLayout>
                
                <AtToast isOpened={isLeaveMsg} text={text} ></AtToast>
               
            </View>
        )
    }
}