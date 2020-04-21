import { Component } from '@tarojs/taro'
import './index.less';
export default class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            
        }
    }

    render(){
        return (
            <View className="container">
                welcom student!
            </View>
        )
    }
}