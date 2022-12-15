import dayjs from 'dayjs'
import { App } from 'vue'
export default {
  install(app: App<Element>) {
    app.directive('format', {
      mounted(el: Element) {
        el.innerHTML = dayjs(el.innerHTML).format('YYYY-MM-DD HH:mm:ss')
      },
    })
  },
}
