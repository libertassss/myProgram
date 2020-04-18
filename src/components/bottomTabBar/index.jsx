
import { AtTabBar } from 'taro-ui';

const tabList = [
    { title: '首页', iconType: 'home', text: '' },
    { title: '我的', iconType: 'user', text: '' },
];

const BottomTabBar = (props) => {
    const { onClick = () => {}, current } = props;
    return (
        <AtTabBar
          fixed
          tabList={tabList}
          onClick={onClick}
          current={current}
        />
    )
}

export default BottomTabBar;