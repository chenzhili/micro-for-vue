export const installPullmore = function (app) {
  app.directive('pullmore', {
    mounted (el, binding) {
      const selectWrap = el.querySelector('.message-list') || el
      selectWrap.addEventListener('scroll', function (e) {
        if (!(Math.abs(el.leftS - e.target.scrollLeft) > 0 || (el.leftS === undefined && e.target.scrollLeft > 80))) {
          const sign = 0
          if (this.scrollTop <= sign) {
            binding.value()
          }
        }
        el.leftS = e.target.scrollLeft
      })
    }
  })
}
