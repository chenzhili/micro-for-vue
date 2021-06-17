import { initQiankunApps, setQKState } from '@/utils/microUtils'
import render from '@/render'

// init 主项目
render({ loading: true })
// 初始化 乾坤
initQiankunApps()

// // 测试
// console.log(setQKState('test', {
//   user: 'test==================================='
// }))
