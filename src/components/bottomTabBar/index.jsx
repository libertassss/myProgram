
import { AtTabBar } from 'taro-ui';
import { Component } from '@tarojs/taro';



export default class BottomTabBar extends Component{
    constructor(props){
        super(props);
        this.tabList = [
            { title: '首页', iconType: 'home', text: '' },
            { title: '我的', iconType: 'user', text: '' },
        ];        
    }

    render(){
        const { onClick = () => {}, current } = props;
        return (
            <AtTabBar
            fixed
            tabList={this.tabList}
            onClick={onClick}
            current={current}
          />
        )
    }
};