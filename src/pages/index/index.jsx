import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import { AtTabBar } from 'taro-ui'


export default class Index extends Component {
  constructor(props){
    super(props);
    this.tabList = [
      { title: '首页', iconType: 'home', text: '' },
      { title: '我的', iconType: 'user', text: '' },
    ];
    this.state = {
      current: 0
    }
  }

  componentWillMount () { }

  componentDidMount () { 
    Taro.login({
      success: function (res) {
        console.log(res);
        // if (res.code) {
        //   //发起网络请求
        //   Taro.request({
        //     url: 'https://test.com/onLogin',
        //     data: {
        //       code: res.code
        //     }
        //   })
        // } else {
        //   console.log('登录失败！' + res.errMsg)
        // }
      }
    })
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

  render () {
    const { current } = this.state;
    return (
      <AtTabBar
        fixed
        tabList={this.tabList}
        onClick={this.handleClick.bind(this)}
        current={current}
      />
    )
  }
}
