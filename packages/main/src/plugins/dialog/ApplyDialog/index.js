import qlDialog from '../render'
import ApplyDialog from './ApplyDialog.vue'

function confirmDialog (options = { image: '', maskClose: false }) {
  return qlDialog(ApplyDialog, options)
}

export default confirmDialog
