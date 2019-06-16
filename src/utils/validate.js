/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor','root','root1','ab']
  return valid_map.indexOf(str.trim()) >= 0
}
/* 是否是手机号*/
export function isPhone(str) {
  // const reg = /^1[3|4|5|8][0-9]\d{8}$/;
  const reg =/^((13[0-9])|(14[5,7,9])|(15[0-3,5-9])|(17[0,1,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
  return reg.test(str);
}

/* 是否是公司邮箱*/
export function isWscnEmail(str) {
  const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return reg.test(str.trim());
}

/* 是否是公司邮箱*/
export function isWscnEmailLimited(str) {
  const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return reg.test(str.trim());
}



/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}


/* 数字 */
export function validatNumber(str) {
  const reg = /^[\d]+\.?[\d]+$/;
  return reg.test(str);
}

/* 整数 */
export function validatInteger(str) {
  const reg = /^[\d]+$/;
  return reg.test(str);
}

/* 小数 */
export function validatDecimal(str) {
  const reg = /^[\d]+\.[\d]+$/;
  return reg.test(str);
}

//字符长度40字符以内
// export function validateLength(str){
//   const reg = /^{2,3}$/
//   return reg.test(str);
// }


//账户非中文
export function accountType(str){
  const reg =/[^\u4e00-\u9fa5]+/

//  const reg=/^[^\u4e00-\u9fa5]{^8,30}$/
   return reg.test(str)
}

//密码校验
export function validatePassword(str){
  const reg = /^[a-zA-Z0-9]{6,16}$/
  return reg.test(str);
}

//6位数字短信验证码
export function validateMsg(str){
  const reg = /^[0-9]{6}$/
  return reg.test(str);
}


// 仅限字母、汉字、数字输入，长度为40字符以内
export function validateName(str){
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,40}$/
  return reg.test(str);
}

//名称仓库联系人验证，仅限汉字、字母、数字，长度为2-26字符
export function validateContact(str,miniLength,maxLength){
  let reg = new RegExp("^[\u4e00-\u9fa5a-zA-Z0-9]{" + miniLength + "," + maxLength +"}$")
  return reg.test(str);
}


//名称仓库联系人验证，仅限汉字、字母，长度为2-26字符
export function validateContactName(str){
  const reg = /^[\u4e00-\u9fa5a-zA-Z]{2,26}$/
  return reg.test(str);
}

//员工姓名验证
export function validateStaffNa(str){
  const reg = /^[\u4e00-\u9fa5a-zA-Z]{1,26}$/
  return reg.test(str);
}


//企业法人代表名称，仅限汉字、字母，长度为2-30字符
export function validateEnterpriseName(str){
  const reg = /^[\u4e00-\u9fa5a-zA-Z]{2,30}$/
  return reg.test(str);
}

// 企业注册资金范围 0.01
export function validateTwoDigitsEnterprisePrice(str){
  const reg = /^(?!0+(?:\.0+)?$)(?:999999999|999999999.0|999999999.00|[0-9]{1,8}(?:\.[0-9]{1,2})?)$/
  return reg.test(str);
}

//验证数字、字母、长度为18字符
export function validateOrgnization(str){
  const reg = /^[a-zA-Z0-9*]{18}$/
  return reg.test(str);
}

// 货物规格
export function validateWhType(str){
  const reg = /^[a-zA-Z0-9*]{1,40}$/
  return reg.test(str);
}

//验证邮编

export function validateZip(str){
  const reg = /^[1-9][0-9]{5}$/
  return reg.test(str);
}

//货物数量验证
export function validateNumber(str){
  const reg = /^[1-9][0-9]{0,2}$/
  return reg.test(str);
}

//货物单价验证
export function validateTwoDigitsPrice(str){
  const reg = /^(?!0+(?:\.0+)?$)(?:99999999|99999999.0|99999999.00|[0-9]{1,8}(?:\.[0-9]{1,2})?)$/
  return reg.test(str);
}

