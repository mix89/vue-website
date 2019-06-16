import {
  validateStaffNa,
  validatePassword,
  validateMsg,
  accountType,
  isPhone,
  isWscnEmail,
  validateName,
  validateContactName,
  validateWhType,
  validateTwoDigitsPrice,
  validateNumber,
  validateOrgnization,
  validateEnterpriseName,
  validateTwoDigitsEnterprisePrice,
  validateZip,
  isWscnEmailLimited
} from "@/utils/validate";


// 账号
export let validateAccount = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入正确的手机号码或邮箱地址！"));
  }
 
  if (!accountType(value)) {
    return callback(new Error("邮箱地址长度为8-30个字符且不含中文！"))
  }
  if (value.length < 8 || value.length > 30) {
    return callback(new Error("邮箱地址长度为8-30个字符且不含中文！"))
  }

  if (!isWscnEmail(value) && !isPhone(value)) {
    return callback(new Error("请输入正确的手机号码或邮箱地址！"));
  }
  callback();
}

//登录页密码验证
export let validateLoginPassword = (rule, value, callback) => {
  if (!value) {
     return callback(new Error("请输入密码，密码只支持数字和字母！"));
  }
  if(!validatePassword(value)){
     return callback(new Error("密码只支持数字和字母,长度6-16个字符！"));
  }
  callback();
}


//验证6位数验证码
export let validatemsgCode = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入正确的6位数字验证码！"));
  }
  if(!validateMsg(value)){
    return callback(new Error("请输入正确的6位数字验证码！"));
  }
 callback();
}





//验证电话
export let validateContactPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入正确的联系电话！"));
  }
  if (!isPhone(value)) {
    return callback(new Error("请输入正确的联系电话！"));
  }
  callback();
}

//验证邮编 选填验证
export let validateZipCodeOptional = (rule, value, callback) => {
  if (value != "") {
    if (!validateZip(value)) {
      return callback(new Error("请输入正确的邮政编码！"));
    }
    callback();
  } else {
    callback();
  }
}

//验证邮箱 选填验证
export let validateEmailOptional = (rule, value, callback) => {
  if (value != "") {
    if (!isWscnEmail(value)) {
      return callback(new Error("请输入正确的邮箱地址！"));
    }
    callback();
  } else {
    callback();
  }
}






//--新增企业
//企业统一社会信用代码
export let validateOrgnizationCode = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入正确的18位企业组织机构代码！"));
  }
  if (!validateOrgnization(value)) {
    return callback(new Error("请输入正确的18位企业组织机构代码！"));
  }
  callback();
}

//企业法人代表
export let validateEnterpriseRepresent = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入正确的法人代表"));
  }
  if (!validateEnterpriseName(value)) {
    return callback(new Error("仅限汉字、字母，长度为2-30字符"));
  }
  callback();
}


//企业注册资金
export let validateRegisterMoney = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入企业注册资金！"));
  }
  if(value<1){
    return callback(new Error("仅限数字输入，可输入范围为：1-999999999.99，最多可输入小数点后两位")); 
  }
  if (!validateTwoDigitsEnterprisePrice(value)) {
    return callback(new Error("仅限数字输入，可输入范围为：1-999999999.99，最多可输入小数点后两位"));
  }

 
  callback();
};

//企业联系人
export let validateEnterpriseContact = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入企业联系人"));
  }
  if (!validateContactName(value)) {
    return callback(new Error("仅限汉字、字母，长度为2-26字符"));
  }
  callback();
}




//仓单号
export let validateWhNum = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入正确的仓单号"));
  }
  if (!validateName(value)) {
    return callback(new Error("仅限字母、汉字、数字输入，长度为40字符以内"));
  }
  callback();
}
//仓库名称
export let validateWhName = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入仓库名称"));
  }
  if (!validateName(value)) {
    return callback(new Error("仅限字母、汉字、数字输入，长度为40字符以内"));
  }
  callback();
}
//仓库联系人
export let validateWhContact = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入仓库联系人"));
  }
  if (!validateContactName(value)) {
    return callback(new Error("仅限汉字、字母，长度为2-26字符"));
  }
  callback();
}

//仓库联系电话
export let validateWhContactPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入正确的联系电话！"));
  }
  if (!isPhone(value)) {
    return callback(new Error("请输入正确的联系电话！"));
  }
  callback();
}


//应收单
export let validateReNum = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入质押物相关编号!"));
  }
  if (!validateName(value)) {
    return callback(new Error("仅限字母、汉字、数字输入，长度为40字符以内"));
  }
  callback();
}

//买方名称
export let validateBuyName = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入买方名称！"));
  }
  if (!validateName(value)) {
    return callback(new Error("仅限字母、汉字、数字输入，长度为40字符以内"));
  }
  callback();
}

//卖方名称
export let validateSellName = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入卖方名称！"));
  }
  if (!validateName(value)) {
    return callback(new Error("仅限字母、汉字、数字输入，长度为40字符以内"));
  }
  callback();
}



//--货物验证  

export let validateGoodsType = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入正确的货物规格"));
  }
  if (!validateWhType(value)) {
    return callback(new Error("仅限数字、字母、*号，长度为40字符以内"));
  }
  callback();
}

//货物单价
export let validateGoodsPrice = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请选输入单价"));
  }
  if (!validateTwoDigitsPrice(value)) {
    return callback(new Error("仅限数字输入，可输入范围为：0.01-99999999.99，最多可输入小数点后两位"));
  }
  callback();
}

//货物数量
export let validateGoodsNumber = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入正确的数量"));
  }
  if (!validateNumber(value)) {
    return callback(new Error("仅限数字输入，可输入范围为1-999的正整数"));
  }
  callback();
}

//价值评估
//货物价值评估验证
export let validateValuePrice = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入评估价值"));
  }
  if (!validateTwoDigitsPrice(value)) {
    return callback(new Error("仅限数字输入，可输入范围为：0.01-99999999.99，最多可输入小数点后两位"));
  }
  callback();
}

//货物备注验证
export let validateValueDesc = (rule, value, callback) => {
  if (value != "") {
    if (value) {
      return callback(new Error("字符长度在100个以内"));
    }
    callback();
  } else {
    callback();
  }
}

//员工姓名验证
export let validateStaffName = (rule, value, callback) => {
  // if (!value) {
  //   return callback(new Error("请输入正确的员工姓名"));
  // }
  if (!validateStaffNa(value) && value!='') {
    return callback(new Error("仅限汉字、字母，长度为26个字符以内"));
  }
  callback();
}