export const PRO_STUDY_FORM = {
  alias: 'educationPcc',
  forms: [
    {
      prop: "agencyName",
      attrs: { placeholder: "* 学校名称" }
    },
    {
      prop: "contacts",
      attrs: { placeholder: "* 教师名称" }
    },
    {
      prop: "jobTitle",
      attrs: { placeholder: "* 教师职务" }
    },
    {
      prop: "tel",
      attrs: { placeholder: "* 联系电话" }
    },
    {
      prop: "content",
      attrs: { placeholder: "* 合作说明", type: "textarea" }
    }
  ],
  rules: {
    agencyName: [{ required: true, message: "请输入学校名称", trigger: "blur" }],
    contacts: [{ required: true, message: "请输入教师名称", trigger: "blur" }],
    jobTitle: [{ required: true, message: "请输入教师职务", trigger: "blur" }],
    tel: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
    content: [{ required: true, message: "请输入合作说明", trigger: "blur" }]
  }
}

export const CHANNEL_COOP_FORM = {
  alias: 'educationCc',
  forms: [
    {
      prop: "agencyName",
      attrs: { placeholder: "* 企业名称" }
    },
    {
      prop: "address",
      attrs: { placeholder: "* 企业地址" }
    },
    {
      prop: "contacts",
      attrs: { placeholder: "* 分负责人名称" }
    },
    {
      prop: "tel",
      attrs: { placeholder: "* 负责人电话" }
    },
    {
      prop: "content",
      attrs: { placeholder: "* 合作说明", type: "textarea" }
    }
  ],
  rules: {
    agencyName: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
    address: [{ required: true, message: "请输入企业地址", trigger: "blur" }],
    contacts: [{ required: true, message: "请输入分负责人名称", trigger: "blur" }],
    tel: [{ required: true, message: "请输入负责人电话", trigger: "blur" }],
    content: [{ required: true, message: "请输入合作说明", trigger: "blur" }]
  }
}

export const TRY_APPLY_FORM = {
  alias: 'educationPt',
  forms: [
    {
      prop: "agencyName",
      attrs: { placeholder: "* 学校名称" }
    },
    {
      prop: "contacts",
      attrs: { placeholder: "* 教师名称" }
    },
    {
      prop: "jobTitle",
      attrs: { placeholder: "* 教师职务" }
    },
    {
      prop: "tel",
      attrs: { placeholder: "* 联系电话" }
    },
    {
      prop: "applySubject",
      attrs: { placeholder: "* 申请系统" }
    },
    {
      prop: "content",
      attrs: { placeholder: "* 合作说明", type: "textarea" }
    }
  ],
  rules: {
    agencyName: [{ required: true, message: "请输入学校名称", trigger: "blur" }],
    contacts: [{ required: true, message: "请输入教师名称", trigger: "blur" }],
    jobTitle: [{ required: true, message: "请输入教师职务", trigger: "blur" }],
    tel: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
    applySubject: [{ required: true, message: "请输入申请系统", trigger: "blur" }],
    content: [{ required: true, message: "请输入合作说明", trigger: "blur" }]
  }
}
