import { PHONE_REG, EMAIL_REG } from "@/utils/validate"
import { getAesString } from '@/utils/index'
const PWD_REG = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/g
// 表单类型 1：注册2：登录3：忘记密码
// 手机密码登录
export const PHONE_PWD_LOGIN = {
  rules: {
    phone: [
      { required: true, message: "请输入手机号", trigger: ["blur", "change"] },
      {
        message: "请输入正确的手机号码",
        pattern: PHONE_REG,
        trigger: ["blur", "change"]
      }
    ],
    password: [
      { required: true, message: "请输入密码", trigger: ["blur", "change"] },
      { message: '密码不符合规定，6-12位密码，英文（大小写）+数字格式', pattern: PWD_REG, trigger: ["blur", "change"] }
    ]
  },
  forms: [
    {
      item: { prop: "phone" },
      type: "phone",
      attrs: { placeholder: "请输入手机号" }
    },
    {
      item: { prop: "password" },
      type: "password",
      attrs: { placeholder: "请输入密码" },
      encrypt: true
    }
  ],
  config: { type: 2, submitText: "登录", numVerify: true }
}

// 手机验证码登录
export const PHONE_AUTHCODE_LOGIN = {
  rules: {
    phone: [
      { required: true, message: "请输入手机号", trigger: ["blur", "change"] },
      {
        message: "请输入正确的手机号码",
        pattern: PHONE_REG,
        trigger: ["blur", "change"]
      }
    ],
    numVerify: [
      { required: true, message: "请输入图形验证码", trigger: ["blur", "change"] },
      { max: 4, min: 4, message: '验证码为4位纯数字', trigger: ["blur", "change"] }
    ],
    authcode: [
      { required: true, message: "请输入验证码", trigger: ["blur", "change"] },
      { max: 4, min: 4, message: '验证码为4位纯数字', trigger: ["blur", "change"] }
    ]
  },
  forms: [
    {
      item: { prop: "phone" },
      type: "phone",
      attrs: { placeholder: "请输入手机号" },
      verify: true
    },
    {
      item: { prop: "numVerify" },
      type: "numVerify",
      attrs: { placeholder: "请输入图形验证码" },
      encrypt: true
    },
    {
      item: { prop: "authcode" },
      type: "authcode",
      attrs: { placeholder: "请输入验证码" },
      encrypt: true
    }
  ],
  config: { type: 2, submitText: "登录" }
}

// 学号登录
export const STUNUM_LOGIN = {
  rules: {
    school: [
      { required: true, message: "请选择您的学校", trigger: ["blur", "change"] }
    ],
    stuNum: [
      { required: true, message: "请输入您的学号", trigger: ["blur", "change"] }
    ],
    password: [
      { required: true, message: "请输入密码", trigger: ["blur", "change"] },
      { message: '密码不符合规定，6-12位密码，英文（大小写）+数字格式', pattern: PWD_REG, trigger: ["blur", "change"] }
    ]
  },
  forms: [
    {
      item: { prop: "school" },
      type: "select",
      attrs: { placeholder: "请输入您的学校", filterable: true, 'no-match-text': '无匹配数据', 'no-data-text': '无数据' }
    },
    {
      item: { prop: "stuNum" },
      type: "input",
      attrs: { placeholder: "请输入您的学号" }
    },
    {
      item: { prop: "password" },
      type: "password",
      attrs: { placeholder: "请输入密码" },
      encrypt: true
    }
  ],
  config: { submitText: '登录' }
}

// 通过邮箱找回密码 输入邮箱
export const INPUT_MAIL = {
  rules: {
    mail: [
      { required: true, message: "请输入绑定的邮箱地址", trigger: ["blur", "change"] },
      {
        message: "请输入正确格式的邮箱地址",
        pattern: EMAIL_REG,
        trigger: ["blur", "change"]
      }
    ]
  },
  forms: [
    {
      item: { prop: "mail" },
      type: "input",
      attrs: { placeholder: "请输入绑定的邮箱地址", onkeypress: "if(event.keyCode==13 || event.which==13){return false;}" }
    }
  ],
  config: {
    submitText: '下一步',
    title: '通过邮箱找回'
  }
}

// 通过邮箱找回密码
export const FINDBYMAIL = {
  rules: {
    authcode: [
      { required: true, message: "请输入验证码", trigger: ["blur", "change"] }
    ],
    pwd: [
      { required: true, message: "6-12位密码，英文（大小写）+数字格式", trigger: ["blur", "change"] },
      { message: '密码不符合规定，6-12位密码，英文（大小写）+数字格式', pattern: PWD_REG, trigger: ["blur", "change"] }
    ],
    pwdVerify: [
      { required: true, message: "请再次输入密码", trigger: ["blur", "change"] },
      { message: '密码不符合规定，6-12位密码，英文（大小写）+数字格式', pattern: PWD_REG, trigger: ["blur", "change"] }
    ]
  },
  forms: [
    {
      item: { prop: "authcode" },
      type: "mailCaptcha",
      attrs: { placeholder: "请输入验证码" },
      encrypt: true
    },
    {
      item: { prop: "pwd" },
      type: "password",
      pwdConfirm: 'target',
      attrs: { placeholder: "6-12位密码，英文（大小写）+数字格式" },
      encrypt: true
    },
    {
      item: { prop: "pwdVerify" },
      type: "password",
      pwdConfirm: 'confirm',
      attrs: { placeholder: "请再次输入密码" }
    }
  ],
  config: {
    submitText: '重置并登录',
    title: '通过邮箱找回'
  }
}

// 通过手机找回密码
export const FINDBYPHONE = {
  rules: {
    phone: [
      { required: true, message: "请输入手机号", trigger: ["blur", "change"] },
      {
        message: "请输入正确的手机号码",
        pattern: PHONE_REG,
        trigger: ["blur", "change"]
      }
    ],
    numVerify: [
      { required: true, message: "请输入图形验证码", trigger: ["blur", "change"] },
      { max: 4, min: 4, message: '验证码为4位纯数字', trigger: ["blur", "change"] }
    ],
    authcode: [{ required: true, message: "请输入验证码", trigger: ["blur", "change"] }],
    pwd: [
      { required: true, message: "请输入密码", trigger: ["blur", "change"] },
      { message: '密码不符合规定，6-12位密码，英文（大小写）+数字格式', pattern: PWD_REG, trigger: ["blur", "change"] }
    ],
    pwdConfirm: [
      { required: true, message: "请再次输入密码", trigger: ["blur", "change"] },
      { message: '密码不符合规定，6-12位密码，英文（大小写）+数字格式', pattern: PWD_REG, trigger: ["blur", "change"] }
    ]
  },
  forms: [
    {
      item: { prop: "phone" },
      type: "phone",
      attrs: { placeholder: "请输入注册时绑定的手机号" },
      verify: true
    },
    {
      item: { prop: "numVerify" },
      type: "numVerify",
      attrs: { placeholder: "请输入图形验证码" }
    },
    {
      item: { prop: "authcode" },
      type: "authcode",
      attrs: { placeholder: "请输入验证码" },
      encrypt: true
    },
    {
      item: { prop: "pwd" },
      type: "password",
      pwdConfirm: 'target',
      attrs: { placeholder: "6-12位密码，英文（大小写）+数字格式" },
      encrypt: true
    },
    {
      item: { prop: "pwdConfirm" },
      type: "password",
      pwdConfirm: 'confirm',
      attrs: { placeholder: "请再次输入密码" }
    }
  ],
  config: {
    type: 3,
    submitText: '重置并登录',
    title: '通过手机号找回'
  }
}

// 注册
export const REGISTER = {
  rules: {
    phone: [
      { required: true, message: "请输入手机号", trigger: ["blur", "change"] },
      {
        message: "请输入正确的手机号码",
        pattern: PHONE_REG,
        trigger: "blur"
      }
    ],
    numVerify: [
      { required: true, message: "请输入图形验证码", trigger: ["blur", "change"] },
      { max: 4, min: 4, message: '验证码为4位纯数字', trigger: ["blur", "change"] }
    ],
    authcode: [
      { required: true, message: "请输入短信验证码", trigger: ["blur", "change"] },
      { max: 4, min: 4, message: '验证码为4位纯数字', trigger: ["blur", "change"] }
    ],
    pwd: [
      { required: true, message: "请输入密码", trigger: ["blur", "change"] },
      { message: '密码不符合规定，6-12位密码，英文（大小写）+数字格式', pattern: PWD_REG, trigger: ["blur", "change"] }
    ]
  },
  forms: [
    {
      item: { prop: "phone" },
      type: "phone",
      attrs: { placeholder: "请输入手机号" },
      verify: true
    },
    {
      item: { prop: "numVerify" },
      type: "numVerify",
      attrs: { placeholder: "请输入图形验证码" },
      encrypt: true
    },
    {
      item: { prop: "authcode" },
      type: "authcode",
      attrs: { placeholder: "请输入验证码" },
      encrypt: true
    },
    {
      item: { prop: "pwd" },
      type: "password",
      attrs: { placeholder: "6-12位密码，英文（大小写）+数字格式" },
      encrypt: true
    }
  ],
  config: {
    type: 1,
    title: '注册',
    submitText: '立即注册'
  }
}

export const BIND_MOBILE = {
  rules: {
    phone: [
      { required: true, message: "请输入手机号", trigger: ["blur", "change"] },
      {
        message: "请输入正确的手机号码",
        pattern: PHONE_REG,
        trigger: ["blur", "change"]
      }
    ],
    numVerify: [
      { required: true, message: "请输入图形验证码", trigger: ["blur", "change"] },
      { max: 4, min: 4, message: '验证码为4位纯数字', trigger: ["blur", "change"] }
    ],
    authcode: [
      { required: true, message: "请输入短信验证码", trigger: ["blur", "change"] },
      { max: 4, min: 4, message: '验证码为4位纯数字', trigger: ["blur", "change"] }
    ]
  },
  forms: [
    {
      item: { prop: "phone" },
      type: "phone",
      attrs: { placeholder: "请输入手机号" },
      verify: true
    },
    {
      item: { prop: "numVerify" },
      type: "numVerify",
      attrs: { placeholder: "请输入图形验证码" },
      encrypt: true
    },
    {
      item: { prop: "authcode" },
      type: "authcode",
      attrs: { placeholder: "请输入验证码" },
      encrypt: true
    }
  ],
  config: {
    type: 4,
    title: '绑定手机号',
    submitText: '进入首页'
  }
}
