import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'unit',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Unit = require('./containers/UnitContainer').default
      const reducer = require('./modules/unit').default

      /*  Add the reducer to the store on key 'unit'  */
      injectReducer(store, { key: 'unit', reducer })

      /*  Return getComponent   */
      cb(null, Unit)

      /* Webpack named bundle   */
    }, 'unit')
  },
  onEnter: ({params}, replace) => {
    const user = store.getState().user

    if (!user || !user.user_id) {
      // Redirect to login page
      return replace('/')
    }
  },
})
