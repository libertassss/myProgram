import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import { AtTabBar, AtToast, AtButton } from 'taro-ui';
import { userLogin, userRegister, getDeptList } from '../../server';
import InitPage from '../../components/initPage';
import BottomTabBar from '../../components/bottomTabBar';
import StudentPage from '../../components/student_page';
import TeacherPage from '../../components/teacher_page';


export default class Index extends Component {
  constructor(props){
    super(props);
   
    this.state = {
      current: 0,
      openid: 0,
      deptList: [],
      token: 0,
      isLogin: 0,
      roleType: null
    }
  }

  componentWillMount () { }

  componentDidMount () { 
    
  }

  componentWillUnmount () { }

  componentDidShow () {
    const _this = this;
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
    wx.getStorage({
      key: 'roleType',
      success: (res) => {
        if(res.data){
          _this.setState({
            roleType: res.data
          })
        }
      }
    })
  }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '首页'
  }

  handleClick = (value) => {
    this.setState({
      current: value
    })
  }

  userLogin = () => {
    const _this = this;
      Taro.login({
        success: function (res) {
          if (res.code) {
           
            //发起网络请求
            userLogin(res.code, (res) => {
             console.log(res);
               if(res.code === '0'){
                  _this.setState({
                    openid: res.data.openid,
                    roleType: res.data.roleType,
                    token: res.data.token
                  });
                  wx.setStorage({
                    key: 'openid',
                    data: res.data.openid
                  });
                  wx.setStorage({
                    key: 'token',
                    data: res.data.token
                  });
                  wx.setStorage({
                    key: 'roleType',
                    data: res.data.roleType
                  });
               }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
  }

  studentRegister = () => {
    let params = {
      url: '../register/index'
    }
    Taro.navigateTo(params).then(res => {
    })
  }

  teacherRegister = () => {
    let params = {
      url: '../teacher_register/index'
    }
    Taro.navigateTo(params).then(res => {
    })
  }

  renderInitBtn = () => {
    const { openid } = this.state;
    if(openid){
      return <View>
        <InitPage teacherHandel={this.teacherRegister} studentHandel={this.studentRegister}/>
      </View>
    }
  }

  render () {
    const { openid, token, isLogin, roleType } = this.state;
    console.log('roleType', roleType);
    return (
      <View className="container">
        {
         roleType ? (roleType === 'teacher' ? 
          <TeacherPage token={token}/>
          : 
          <StudentPage token={token}/>
          )
          :
            ( openid ? 
            <View>
              <AtToast isOpened text="登录成功" ></AtToast>
              <InitPage teacherHandel={this.teacherRegister} studentHandel={this.studentRegister}></InitPage> 
            </View>
            :  
            <View className="user-login-btn">
              <AtButton type='primary' onClick={this.userLogin}>授权登录</AtButton>
            </View>
            )
        }
      </View>

    )
  }
}
