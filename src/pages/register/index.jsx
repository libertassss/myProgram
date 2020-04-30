
import { Picker, View } from '@tarojs/components';
import { Component } from '@tarojs/taro'
import { AtInput, AtButton, AtToast }  from 'taro-ui';
import { userRegister, getDeptList, deletUser } from '../../server';
import './index.less';


class Register extends Component {
    constructor(props){
      super(props);
      this.state = {
        selectorChecked: null,
        deptList: [],
        classList: [],
        List: [],
        listChecked: null,
        classChecked: null,
        nowDeptIndex: 0,
        nowClassIndex: 0,
        listIndex: 0,
        userName: '',
        openid: 0,
        token: 0
      }
    }

    componentDidMount(){
      
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

    onChange = () => {
        const index = e.detail.value;
        const { List } = this.state;
        this.setState({
          listChecked: List[index].deptName,
          listIndex: index
        });
    }

    handleChange= (value) => {
      console.log(value);
      this.setState({
        userName: value
      })
    }

    register = () => {
      const { userName, listIndex, List } = this.state;
      wx.getStorage({
        key: 'openid',
        success: (res) => {
          let params = {
            openid: res.data,
            roleCode: 'student',
            userName: userName,
            deptId: List[listIndex].id
          };
          userRegister(params, res => {
            console.log('res',res);
            if(res.code === '0'){
              const { token } = res.data;
              this.setState({
                token: token
              },() => {
                wx.switchTab({
                  url: `../index/index`
                })
              });
              wx.setStorage({
                key: 'token',
                data: token
              });
              wx.setStorage({
                key: 'roleType',
                data: 'student'
              })
            }
          })
        }
      })
    }

    deletregister = () => {
      wx.getStorage({
        key: 'openid',
        success: (res) => {
          deletUser(res.data, (msg) => {
            console.log(msg)
          })
        }
      })
    }

    render(){
      const { deptList, classList, classChecked, selectorChecked, List, listChecked, userName, token } = this.state;
      return (
        <View className="container">
          <AtInput
              name='value1'
              title='姓名'
              type='text'
              placeholder='姓名'
              value={userName}
              onChange={this.handleChange}
          />
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

        
          <AtButton type='primary' onClick={this.register}>注册</AtButton>
       
          <AtButton className="register-btn" type='primary' onClick={this.deletregister}>删除</AtButton>
          {
            token ? <AtToast isOpened text="注册成功" ></AtToast> : null
          }
        </View>
      )
    }
}


export default Register;