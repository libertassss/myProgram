
import './index.less';
import { AtButton } from 'taro-ui';

const InitPage = (props) => {

    const { studentHandel = () => {}, teacherHandel = () => {} } = props;

    return (
        <View className="init-page">
            <View className="teacher-box">
                <AtButton type='primary' onClick={teacherHandel} full={false}>教师</AtButton>
            </View>
            <View className="student-box">
                <AtButton type='primary' onClick={studentHandel} full={false}>学生</AtButton>
            </View>
        </View>
    )
}

export default InitPage;

