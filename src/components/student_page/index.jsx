import { Component } from '@tarojs/taro';
import './index.less';
import { getHomeWorkList } from '../../server';
import { AtCard } from 'taro-ui';
export default class StudentPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            homeWorkList: []
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

    render(){
        const { homeWorkList } = this.state;
        return (
            <View className="container">
                {
                    homeWorkList.length > 0 ? homeWorkList.map(item => 
                        <AtCard
                            key={item.id}
                            note=''
                            extra={item.createTime}
                            title={item.homeWorkName}
                            thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
                        >
                        {item.homeWorkRequest}
                        </AtCard>    
                    ) : <View>
                    <AtNoticebar>暂作业</AtNoticebar>
                </View>
                }
            </View>
        )
    }
}