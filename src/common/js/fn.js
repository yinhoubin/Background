import axios from 'axios'

//未登录处理
function errCallback(obj, d) {
    obj.$message({
        message: d.data.info,
        type: 'warning'
    });
    obj.$router.replace('/login')
    return;
}

function httpurl(obj, url, method, param,callback) {
    var params = 'params'
    if (method == "post" || method == "POST") {
        params = 'data'
    }
    axios({
        url: url,
        method: method,
        [params]: param
    }).then(d => {
        if (d.data.code == -1) {
            errCallback(obj, d);
        }
        // console.log(d)
        callback(d)
    })
}

export default {
    errCallback, httpurl
}

