var baseUrl='/api';
// var baseUrl='';

// 登录
var login=baseUrl+'/login'
//查询管理员
var findManage=baseUrl+'/findManage'
// 添加管理员
var addManage=baseUrl+'/addManage'
var updateManage=baseUrl+'/updateManage'
var delManage=baseUrl+'/delManage'

var findUser=baseUrl+'/findUser'
// 添加管理员
var addUser=baseUrl+'/addUser'
var updateUser=baseUrl+'/updateUser'
var delUser=baseUrl+'/delUser'

var findNews=baseUrl+'/findNews'
// 添加管理员
var addNews=baseUrl+'/addNews'
var updateNews=baseUrl+'/updateNews'
var delNews=baseUrl+'/delNews'

var findDevice=baseUrl+'/findDevice'
// 添加管理员
var addDevice=baseUrl+'/addDevice'
var updateDevice=baseUrl+'/updateDevice'
var delDevice=baseUrl+'/delDevice'
//退出
var exit=baseUrl+'/exit'

export default {
    login,
    findManage,
    addManage,
    updateManage,
    delManage,
    findUser,
    addUser,
    updateUser,
    delUser,
    findNews,
    addNews,
    updateNews,
    delNews,
    findDevice,
    addDevice,
    updateDevice,
    delDevice,
    exit
}