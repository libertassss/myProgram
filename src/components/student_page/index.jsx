import { Component } from '@tarojs/taro';
import './index.less';
import { getHomeWork } from '../../server';
export default class StudentPage extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    componentDidMount(){
        const { token } = this.props;
        getHomeWork({'Authorization': `Bearer ${token}`}, (res) => {
            console.log(res);
        })  
    }

    render(){
        return (
            <View className="container">
                welcom student!
            </View>
        )
    }
}