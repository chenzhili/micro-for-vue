import { getCurrentInstance } from 'vue'

export const eventHelper = () => {
  const _this = getCurrentInstance()

  const handleEvent = (name, event, row, column) => {
    _this.emit(`row-${name}`, row, column, event)
  }

  const handleClick = (event, row, column) => {
    handleEvent('click', event, row, column)
  }

  return {
    handleClick
  }
}
