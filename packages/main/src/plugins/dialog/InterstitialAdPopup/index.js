import qlDialog from '../render'
import InterstitialAdPopup from './InterstitialAdPopup.vue'

function confirmDialog (options = { maskClose: false }) {
  return qlDialog(InterstitialAdPopup, options)
}

export default confirmDialog
