import { Component, useState } from '@tarojs/taro'
import { AtForm, AtInput, AtButton } from 'taro-ui'

const AddHomeWork  = (props) => {

    const [ homeWorkName, setHomeWorkName ] = useState();
    const [ homeWorkRequest, setHomeWorkRequest ] = useState();
    
    const handleChange = (value) => {
        console.log(value)
        // setHomeWorkName(value);
    };

    const handleChangeRequest = (value) => {
        console.log(value)
        // setHomeWorkRequest(value);
    }



    return (
        <View className="container">
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
                onChange={handleChange.bind(this, 'value')} 
            />
            <AtInput 
                name='value' 
                title='作业要求' 
                type='text' 
                placeholder='请输入作业要求' 
                value={homeWorkRequest} 
                onChange={handleChangeRequest.bind(this, 'value')} 
            />
            <AtButton formType='submit'>提交</AtButton>
            <AtButton formType='reset'>重置</AtButton>
            </AtForm>
        </View>
    )

};

export default AddHomeWork;
