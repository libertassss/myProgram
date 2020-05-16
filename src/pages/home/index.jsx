import { Component } from '@tarojs/taro'
import './index.less';
import { getCode, endCode, signCode, getCodeList } from '../../server';
import { AtButton, AtCurtain, AtToast, AtFloatLayout, AtInput,AtList, AtListItem  } from 'taro-ui';
export default class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            token: '',
            roleType: '',
            getCode: false,
            text: '签到结束',
            code: '',
            endCode: false,
            studentCode: false,
            studentList: []
        }
    }

    componentDidShow(){
       
    }

    componentDidMount(){
        const _this = this;
        wx.getStorage({
            key: 'roleType',
            success: (res) => {
                console.log(res);
              if(res.data){
                _this.setState({
                  roleType: res.data
                })
              }
            }
        })
        wx.getStorage({
            key: 'token',
            success: (res) => {
              if(res.data){ 
                _this.setState({
                  token: res.data
                })
              }
            }
        })
    }

    studentCode = () => {
        this.setState({
            studentCode: true
        })
    }

    getCode = () => {
        const { token } = this.state;
        getCode({},{'Authorization': `Bearer ${token}`}, res => {
            console.log(res);
            if(res.code === '0'){
                this.setState({
                    code: res.data,
                    getCode: true
                })
            }
        })
    }

    handleClose = () => {
        this.setState({
            getCode: false
        })
    }

    endCode = () => {
        const { token } = this.state;
            endCode({},{'Authorization': `Bearer ${token}`}, res => {
                if(res.code === '0'){
                    this.setState({
                        endCode: true
                    }, () => {
                        setTimeout(()=>{
                            this.setState({
                                endCode: false,
                                text: '签到结束'
                            })
                        },500)
                    })
                }
            })
       
    }

    handleChange = (value) => {
        this.setState({
            code: value
        })
    }

    submitCode = () => {
        const { token, code } = this.state;
        signCode({code: code},{'Authorization': `Bearer ${token}`}, res => {
            if(res.code === '0'){
                this.setState({
                    getCode: true,
                    text: '签到成功'
                })
            }
        })
    }

    render(){
        const { token, roleType, getCode, code, endCode, studentCode, text } = this.state;
        console.log('===',roleType)
        return (
            <View className="container">
                {
                    token ? 
                    <View className="user-login-btn">
                    {
                        roleType && roleType == 'student' ? 
                        <View>
                            <AtButton type='primary' onClick={this.studentCode}>签到</AtButton>
                        </View>
                        :
                        <View>
                            <AtButton type='primary' onClick={this.getCode}>开始签到</AtButton>
                            <AtButton type='primary' onClick={this.endCode}>结束签到</AtButton>
                        </View>
                    }
                   
                  </View> : <View>请登录</View>
                }

            <AtCurtain
                isOpened={getCode}
                onClose={this.handleClose.bind(this)}
            >
               <View className="code">
                   {code}
               </View>
            </AtCurtain>

            <AtFloatLayout isOpened={studentCode} title="签到" onClose={this.handleClose.bind(this)}>
                <AtInput
                    name='value'
                    title='签到码'
                    type='number'
                    placeholder='请输入签到码'
                    value={code}
                    onChange={this.handleChange.bind(this)}
                />
                <AtButton type='primary' onClick={this.submitCode}>提交</AtButton>        

            </AtFloatLayout>

            <AtToast isOpened={endCode} text={text} ></AtToast>

            <AtList>
                {

                }
            </AtList>


            </View>
        )
    }
}