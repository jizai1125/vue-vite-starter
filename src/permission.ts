import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({
  showSpinner: false
})

router.beforeEach(async (to, from) => {
  // console.log('to', to)
  // console.log('from', from)
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})
