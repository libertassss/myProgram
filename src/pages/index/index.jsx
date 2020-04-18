import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import { AtTabBar, Picker } from 'taro-ui';
import { userLogin, userRegister, getDeptList } from '../../server';
import InitPage from '../../components/initPage';
import BottomTabBar from '../../components/bottomTabBar';


export default class Index extends Component {
  constructor(props){
    super(props);
   
    this.state = {
      current: 0,
      openid: 0,
      deptList: []
    }
  }

  componentWillMount () { }

  componentDidMount () { 
    const _this = this;
    // Taro.login({
    //   success: function (res) {
    //     if (res.code) {
    //       //发起网络请求
    //       userLogin(res.code, (res) => {
    //          if(res.code === '0'){
    //             _this.setState({
    //               openid: res.data.openid
    //             })
    //          }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '首页'
  }

  handleClick = (value) => {
    this.setState({
      current: value
    })
  }

  teacherRegister = () => {
    let params = {
      url: '../register/index'
    }
    Taro.navigateTo(params).then(res => {
    })
  }

  studentRegister = () => {

  }

  render () {
    const { current } = this.state;
    return (
      <View className="container">
        {/* <BottomTabBar onClick={this.handleClick} current={current} /> */}

        <InitPage studentHandel={this.studentRegister} teacherHandel={this.teacherRegister} />
      </View>

    )
  }
}
