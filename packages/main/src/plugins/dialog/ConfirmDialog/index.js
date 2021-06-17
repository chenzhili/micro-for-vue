import qlDialog from '../render'
import ConfirmDialog from './ConfirmDialog.vue'

function confirmDialog (options = { message: '请输入提示', sub: '', maskClose: false }) {
  return qlDialog(ConfirmDialog, options)
}

export default confirmDialog
