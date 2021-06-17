<script>
import { h } from 'vue'
export default {
  name: 'TStyleTableColumn',
  props: {
    prop: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: 100
    }
  },
  setup () {},
  render () {
    return h(
      'div',
      { class: 't-style-table-column', style: { width: this.width + 'px' } },
      this.label
    )
  }
}
</script>
