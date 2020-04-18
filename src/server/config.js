import Taro from '@tarojs/taro';
const prefix = `http://wjw.mynatapp.cc`;

const request = ( url, data = {}, method = 'GET',cb, contentType = "application/json") => {
    Taro.request(
        {
          url: `${prefix}/${url}`,
          data: data,
          method: 'POST',
          header: {
            'content-type': contentType // 默认值
          },
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