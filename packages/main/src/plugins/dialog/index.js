import InterstitialAdPopup from './InterstitialAdPopup'
import ConfirmDialog from './ConfirmDialog'
import ApplyDialog from './ApplyDialog'

const closeAllDialog = () => {
  document.querySelectorAll('.ql-dialog').forEach(item => document.body.removeChild(item))
}

const setupGlobalDialog = (app) => {
  app.config.globalProperties.$confirmDialog = ConfirmDialog
  app.config.globalProperties.$interstitialAd = InterstitialAdPopup
  app.config.globalProperties.$applyDialog = ApplyDialog
  app.config.globalProperties.$closeAllDialog = closeAllDialog
}

export default setupGlobalDialog
