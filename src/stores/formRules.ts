import { defineStore } from 'pinia'
import { ref } from 'vue'

const rules = {
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 2, max: 15, message: '长度应该是 2 到 15 个字符', trigger: 'blur' }
  ],
  region: [
    {
      required: true,
      message: '请选择活动区',
      trigger: 'change'
    }
  ],
  count: [
    {
      required: true,
      message: '请选择活动计数',
      trigger: 'change'
    }
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: '请选一个日期',
      trigger: 'change'
    }
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: '请选择一个时间',
      trigger: 'change'
    }
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: '请至少选择一种活动类型',
      trigger: 'change'
    }
  ],
  resource: [
    {
      required: true,
      message: '请选择活动资源',
      trigger: 'change'
    }
  ],
  desc: [{ required: true, message: '请输入活动形式', trigger: 'blur' }]
}

const b = {
  a: 1
}

export const useFormRulesStore = defineStore('formRules', () => {
  return { formRules: ref(rules), b: ref(b) }
})