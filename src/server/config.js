import Taro from '@tarojs/taro';
const prefix = `http://wjw.mynatapp.cc:8085`;

const request = ( url, data = {}, method = 'GET',cb, header) => {
    Taro.request(
        {
          url: `${prefix}/${url}`,
          data: data,
          method: 'POST',
          header: Object.assign({'content-type' : "application/json"},header),
          success: (res) => {
              const { statusCode, data } = res;
              if(statusCode === 200){
                cb && cb(data);
              }else{
                  console.log(-1)
              }
          }
        }
      )
}

export default request;