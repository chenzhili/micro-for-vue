export const installLoadmore = function (app) {
  app.directive('loadmore', {
    mounted (el, binding) {
      const selectWrap = el.querySelector('.el-table__body-wrapper') || el
      selectWrap.addEventListener('scroll', function (e) {
        const sign = 10
        if (!(Math.abs(el.leftS - e.target.scrollLeft) > 0 || (el.leftS === undefined && e.target.scrollLeft > 0))) {
          const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
          if (scrollDistance <= sign) {
            binding.value()
          }
        }
        el.leftS = e.target.scrollLeft
      })
    }
  })
}
