import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components';
import { AtInput, AtButton, AtToast }  from 'taro-ui';
import { userRegister } from '../../server';
import './index.less';

export default class StudentRegister extends Component {
    constructor(props){
        super(props);

        this.state = {
            token: 0,
            userName: ''
        }
    }

    handleChange = (value) => {
        this.setState({
            userName: value
          })
    }

    register = () => {
        const { userName } = this.state;
        wx.getStorage({
            key: 'openid',
            success: (res) => {
              let params = {
                openid: res.data,
                roleCode: 'teacher',
                userName: userName,
              };
              userRegister(params, res => {
                console.log('res',res);
                if(res.code === '0'){
                  const { token } = res.data;
                  this.setState({
                    token: token
                  },() => {
                    wx.switchTab({
                        url: `../index/index`
                    })
                  });
                  wx.setStorage({
                    key: 'token',
                    data: token
                  });
                }
              })
            }
          })
    }


    render(){
        const { userName, token } = this.state;
        return (
            <View className="container">
                <AtInput
                    name='value2'
                    title='姓名'
                    type='text'
                    placeholder='姓名'
                    value={userName}
                    onChange={this.handleChange}
                />
                <AtButton className="register-btn" type='primary' onClick={this.register}>注册</AtButton>
                {
                    token ? <AtToast isOpened text="注册成功" ></AtToast> : null
                }
            </View>
        )
    }
}