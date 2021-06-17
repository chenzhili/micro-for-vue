/**
 * 全局运算方法
 */

const dcmAdd = function (arg1, arg2) {
  var r1, r2, m
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (accMul(arg1, m) + accMul(arg2, m)) / m
}

const dcmSub = function (arg1, arg2) {
  var r1, r2, m
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (accMul(arg1, m) - accMul(arg2, m)) / m
}

const accMul = function (arg1, arg2) {
  var m = 0
  var s1 = arg1.toString()
  var s2 = arg2.toString()
  try {
    m += s1.split(".")[1].length
  } catch (e) {
    m = 0
  }
  try {
    m += s2.split(".")[1].length
  } catch (e) {
    m = 0
  }
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  )
}

const accDiv = function (arg1, arg2) {
  var t1 = 0
  var t2 = 0
  var r1
  var r2
  try {
    t1 = arg1.toString().split(".")[1].length
  } catch (e) {
    t1 = 0
  }
  try {
    t2 = arg2.toString().split(".")[1].length
  } catch (e) {
    t2 = 0
  }
  r1 = Number(arg1.toString().replace(".", ""))
  r2 = Number(arg2.toString().replace(".", ""))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}

const methods = {
  dcmAdd,
  dcmSub,
  accMul,
  accDiv
}
const setupGlobalFun = (app) => {
  for (const key in methods) {
    app.config.globalProperties['$' + key] = methods[key]
  }
}

export default setupGlobalFun
