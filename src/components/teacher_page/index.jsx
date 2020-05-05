import { Component } from '@tarojs/taro'
import './index.less';
import { getCourse, upLoadCourse, getHomeWork, getDeptList, saveOrUpdateHomeWork } from '../../server';
import { AtTabBar, AtButton, AtNoticebar, AtFab, AtCard, AtInput, AtForm } from 'taro-ui';
import { View } from '@tarojs/components';
import Register from '../../pages/register';
export default class TeacherPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            current: 0,
            courseList: [],
            selectorChecked: null,
            deptList: [],
            classList: [],
            List: [],
            listChecked: null,
            classChecked: null,
            nowDeptIndex: 0,
            nowClassIndex: 0,
            listIndex: 0,
            addHomeWork: false,
            homeWorkName: '',
            homeWorkRequest: ''

        }
    }

    componentDidMount(){
        const { token } = this.props;
        getCourse({'Authorization': `Bearer ${token}`}, (res) => {
            if(res.code === '0' && res.data.length > 0){
                this.setState({
                    courseList: res.data
                })
            }
        });
        let param = {
            parentId: 0
          };
          getDeptList(param, (res) => {
            if(res.code === '0'){
              this.setState({
                deptList: res.data,
                selectorChecked: res.data[0].deptName
              })
              getDeptList({parentId: res.data[0].id}, (res) => {
                if(res.code === '0'){
                    this.setState({
                      classList: res.data,
                      classChecked: res.data[0].deptName
                    })
                    getDeptList({parentId: res.data[0].id}, (res) => {
                      if(res.code === '0'){
                        this.setState({
                          List: res.data,
                          listChecked: res.data[0].deptName
                        })
                      }
                    })
                }
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
                url: `http://120.24.42.240:8085/course/save/upload`,
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

    onChangeDept = (e) => {
        const index = e.detail.value;
        const { deptList } = this.state;
        this.setState({
          selectorChecked: deptList[index].deptName,
          nowDeptIndex: index
        });
        let params = {
          parentId: deptList[index].id
        };
        getDeptList(params, (res) => {
          if(res.code === '0'){
            this.setState({
              classList: res.data,
              classChecked: res.data[0].deptName
            })
            getDeptList({parentId: res.data[0].id}, (res) => {
              if(res.code === '0'){
                this.setState({
                  List: res.data,
                  listChecked: res.data[0].deptName
                })
              }
            })
          }
        })
    }

    onChangeClass = (e) => {
        let { classList } = this.state;
        const index = e.detail.value;
        this.setState({
          selectorChecked: classList[index].deptName,
          nowClassIndex: index
        });
        let params = {
          parentId: classList[index].id
        };
        getDeptList(params, res => {
          if(res.code === '0'){
            this.setState({
              List: res.data,
              listChecked: res.data[0].deptName
            })
          }
        })
    }

    onChange = (e) => {
        const index = e.detail.value;
        const { List } = this.state;
        this.setState({
          listChecked: List[index].deptName,
          listIndex: index
        });
    }

    SearchHomeWork = () => {
       
    }

    handleChangeRequest = (value) => {
        this.setState({
            homeWorkRequest: value
        })
    }
    handleChange = (value) => {
        this.setState({
            homeWorkName:value
        })
    }

    onSubmit = () => {
        const { homeWorkName, homeWorkRequest, List, listIndex } = this.state;
        const { token } = this.props;
        let params = {
            homeWorkName: homeWorkName,
            homeWorkRequest: homeWorkRequest,
            deptId: List[listIndex].id
        }
        saveOrUpdateHomeWork(params,{'Authorization': `Bearer ${token}`}, res => {
            console.log('res',res);
        } )
    }

    addHomeWork = () => {
        this.setState({
            addHomeWork: true
        })
        // let params = {
        //     url: '../../pages/add_homework/index'
        // }
        // Taro.navigateTo(params).then(res => {})
    }

   
    renderContent = () => {
        const { current, courseList, deptList, selectorChecked, classList, classChecked, List, listChecked, homeWorkName, homeWorkRequest, addHomeWork } = this.state;
        console.log(addHomeWork);
        switch(current){
            case 0:
                {
                    return <View>
                        {

                            courseList.length > 0 ? <View>
                                {
                                    courseList.map((item,index) => 
                                        <AtCard
                                            key={item.id}
                                            note='小Tips'
                                            extra={item.createTime}
                                            title={item.courseName}
                                            thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
                                        >
                                            这也是内容区 可以随意定义功能
                                        </AtCard>
                                    )
                                }
                            </View> : <View>
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
                        <View>
                        <Picker mode='selector' rangeKey='deptName' range={deptList} onChange={this.onChangeDept}>
                            <View className='picker'>
                            <View className="picker-title">学院</View><Text className="text-input">{selectorChecked}</Text>
                            </View>
                        </Picker>
                        <Picker mode='selector' rangeKey='deptName' range={classList} onChange={this.onChangeClass}>
                            <View className='picker'>
                            <View className="picker-title">专业</View><Text className="text-input">{classChecked}</Text>
                            </View>
                        </Picker>
                        <Picker mode='selector' rangeKey='deptName' range={List} onChange={this.onChange}>
                            <View className='picker'>
                            <View className="picker-title">班级</View><Text className="text-input">{listChecked}</Text>
                            </View>
                        </Picker>
                        </View>
                       
                        <View className="add-course-btn">
                            <AtFab onClick={this.addHomeWork}>
                                <Text className='at-fab__icon at-icon at-icon-menu'>布置作业</Text>
                            </AtFab>
                        </View>
                        <View className="search-homeWork-btn">
                            <AtFab onClick={this.SearchHomeWork}>
                                <Text className='at-fab__icon at-icon at-icon-menu'>查看作业</Text>
                            </AtFab>
                        </View>
                    </View>
                }
        }
    }

    render(){
        const { current, addHomeWork, homeWorkName, homeWorkRequest } = this.state;
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
                 {
                            addHomeWork && current === 1 ? <View>
                               <AtForm
                                    onSubmit={this.onSubmit}
                                    onReset={this.onReset}
                                >
                                <AtInput 
                                    name='value' 
                                    title='作业名称' 
                                    type='text' 
                                    placeholder='请输入作业名称' 
                                    value={homeWorkName} 
                                    onChange={this.handleChange} 
                                />
                                <AtInput 
                                    name='value' 
                                    title='作业要求' 
                                    type='text' 
                                    placeholder='请输入作业要求' 
                                    value={homeWorkRequest} 
                                    onChange={this.handleChangeRequest} 
                                />
                                <AtButton formType='submit'>提交</AtButton>
                                <AtButton formType='reset'>重置</AtButton>
                                </AtForm> 
                            </View> : null
                        }
            </View>
        )
    }
}