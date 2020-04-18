
import { Picker } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro'
import { AtInput, AtButton }  from 'taro-ui';
import { userRegister, getDeptList, userLogin } from '../../server';
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
        openid: 0
      }
    }

    componentDidMount(){
      const _this = this;
      Taro.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            userLogin(res.code, (res) => {
               if(res.code === '0'){
                  _this.setState({
                    openid: res.data.openid
                  })
               }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
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
      const { openid, userName, listIndex, List } = this.state;
        let params = {
          openid: openid,
          roleCode: 'student',
          userName: userName,
          deptId: List[listIndex].id
        };

        userRegister(params, res => {
          console.log('res',res);
          if(res.code === '0'){
            
          }
        })

    }

    render(){
      const { deptList, classList, classChecked, selectorChecked, List, listChecked, userName } = this.state;
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
              学院：<Text className="text-input">{selectorChecked}</Text>
            </View>
          </Picker>

          <Picker mode='selector' rangeKey='deptName' range={classList} onChange={this.onChangeClass}>
            <View className='picker'>
              专业<Text className="text-input">{classChecked}</Text>
            </View>
          </Picker>

          <Picker mode='selector' rangeKey='deptName' range={List} onChange={this.onChange}>
            <View className='picker'>
              班级<Text className="text-input">{listChecked}</Text>
            </View>
          </Picker>

          <AtButton type='primary' onClick={this.register}>注册</AtButton>
        </View>
      )
    }
}


export default Register;