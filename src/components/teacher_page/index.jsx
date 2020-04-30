import { Component } from '@tarojs/taro'
import './index.less';
import { getCourse, upLoadCourse } from '../../server';
import { AtTabBar, AtButton, AtNoticebar, AtFab } from 'taro-ui';
import { View } from '@tarojs/components';
export default class TeacherPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            current: 0,
            courseList: []
        }
    }

    componentDidMount(){
        const { token } = this.props;
        getCourse({'Authorization': `Bearer ${token}`}, (res) => {
            if(res.code === 0 && res.data.length > 0){
                this.setState({
                    courseList: res.data
                })
            }
        })
    }

    handleClick = (value) => {
        this.setState({
            current: value
        })
    }

    addCourse = () => {
        const { token } = this.props;
        wx.chooseMessageFile({
            count: 10,
            type: 'all',
            success (res) {
              const tempFilePaths = (res.tempFiles)[0];
              wx.uploadFile({
                url: `http://wjw.mynatapp.cc/course/save/upload`,
                filePath: tempFilePaths.path,
                name: 'file',
                formData: {
                    'courseName': tempFilePaths.name,
                    file: tempFilePaths
                },
                header:{
                    'Authorization': `Bearer ${token}`
                },
                success: (res) => {
                    console.log(res);
                }
              })
             
            }
        })
    }

    renderContent = () => {
        const { current, courseList } = this.state;
        switch(current){
            case 0:
                {
                    return <View>
                        {

                            courseList.length > 0 ? <View></View> : <View>
                                <AtNoticebar>暂无课件</AtNoticebar>
                            </View>
                        }
                        <View className="add-course-btn">
                            <AtFab onClick={this.addCourse}>
                                <Text className='at-fab__icon at-icon at-icon-menu'>添加课件</Text>
                            </AtFab>
                        </View>
                    </View>
                }
            case 1:
                {
                    return <View>
                        {
                            courseList.length > 0 ? <View></View> : <View>
                                <AtNoticebar>暂无作业</AtNoticebar>
                            </View>
                        }
                        <View className="add-course-btn">
                            <AtFab onClick={this.addCourse}>
                                <Text className='at-fab__icon at-icon at-icon-menu'>布置作业</Text>
                            </AtFab>
                        </View>
                    </View>
                }
        }
    }

    render(){
        const { current } = this.state;
        return (
            <View className="container">
                <AtTabBar
                    tabList={[
                    { title: '我的课件', text: 8 },
                    { title: '我的作业' }
                    ]}
                    onClick={this.handleClick}
                    current={current}
                />
                {
                    this.renderContent()
                }
            </View>
        )
    }
}