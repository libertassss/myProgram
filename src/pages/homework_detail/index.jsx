import { Component } from '@tarojs/taro'
import './index.less';
import { AtCard, AtToast, AtInput, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtTag } from 'taro-ui';
import { homeworkDetai, grade, saveMsg } from '../../server';
export default class HomeworkDetai extends Component {
    constructor(props){
        super(props);
        this.state = {
            homeWorkList: [],
            grade: false,
            text: '打分',
            value: '',
            gradeRes: false,
            optionsType: 1
        }
    }

    componentDidMount(){
        const { id, token } = this.$router.params;
        let params = {
            homeWorkId: id
        };
        homeworkDetai(params, {'Authorization': `Bearer ${token}`}, res => {
            console.log(res);
            if(res.code === '0'){
                this.setState({
                    homeWorkList: res.data
                })
            }
        })
    }

    grade = (id) => {
        this.setState({
            grade: true,
            text: '打分',
            nowId: id,
            optionsType: 1
        })
    }

    handleChange = (value) => {
        this.setState({
            value: value
        })
    }

    submitGrade = () => {
        const { token } = this.$router.params;
        const { value, nowId, optionsType } = this.state;
        this.setState({
            grade: false
        });
        console.log(optionsType)
        switch(optionsType){
            case 1: 
            let params = {
                grade: value,
                id: nowId
            }
            grade(params, {'Authorization': `Bearer ${token}`}, res => {
                console.log(res);
                if(res.code === '0'){
                    this.setState({
                        gradeRes: true
                    },() => {
                        setTimeout(()=>{this.setState({
                            gradeRes: false
                        })}, 500)
                    })
                }
            } )
            return;
            case 2:
                let param = {
                    commentContent: value,
                    myHomeWorkId: nowId
                }
                saveMsg(param, {'Authorization': `Bearer ${token}`}, res => {
                    if(res.code === '0'){
                        this.setState({
                            gradeRes: true
                        },() => {
                            setTimeout(()=>{this.setState({
                                gradeRes: false
                            })}, 500)
                        })
                    }
                })
                return;
        }
        
    }

    leaveMsg = (id) => {
        this.setState({
            grade: true,
            text: '留言',
            nowId: id,
            optionsType: 2
        })
    }

    dismissOpt = () => {
        this.setState({
            grade: false
        })
    }

    reply = () => {

    }

    

    render(){
        const { homeWorkList, grade, text, value, gradeRes }  = this.state;
        const { type } = this.$router.params;
        return (
            <View>
               { 
                    homeWorkList.length > 0 ? homeWorkList.map(item => 
                        <View className="item-card" key={item.id}>
                            <AtCard
                                note={item.userName}
                                extra={item.createTime}
                                title={item.userName}
                                thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
                            >
                            <View className="homework-path">{item.fileName}</View>
                            <View className="tag-list">
                            <AtTag size='small' circle onClick={this.leaveMsg.bind(this,item.id)}>评论</AtTag>
                            {
                                type === 'student' ? <AtTag size="small" circle >{item.grade ? `成绩-${item.grade}分` : '还未打分'}</AtTag>
                                : <AtTag size='small' circle onClick={this.grade.bind(this,item.id)}>{item.grade ? `成绩-${item.grade}分` :' 打分'}</AtTag>
                            }
                            </View>
                            </AtCard>
                            <View className="comment-list">
                            {
                                item.homeWorkCommentList.length > 0 && item.homeWorkCommentList.map( comment =>
                                    <View className="comment-item" key={comment.id} onClick={this.reply.bind(this,comment.id)}>
                                        {comment.userName}: {comment.commentContent}
                                    </View>    
                                )
                            }
                            </View>
                        </View>)
                    : <View>
                        <AtNoticebar>暂无提交</AtNoticebar>
                    </View>
                }

                <AtModal isOpened={grade}>
                    <AtModalHeader>{text}</AtModalHeader>
                    <AtModalContent>
                    <AtInput
                        name='value1'
                        title='评分'
                        type='text'
                        placeholder='评分'
                        value={value}
                        onChange={this.handleChange}
                    />
                    </AtModalContent>
                    <AtModalAction> <Button onClick={this.dismissOpt}>取消</Button> <Button onClick={this.submitGrade}>确定</Button> </AtModalAction>
                </AtModal>
                <AtToast isOpened={gradeRes} text="提交成功" ></AtToast>
            </View>
        )
    }
}