import React, {Component} from 'react'
import initStore from "../store";

const isServer = typeof window === "undefined"
const __NEXT_REDUX_STORE = '__NEXT_REDUX_STORE__'
const withRedux = (WrapComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.store = this.createStore(props.severSideData)
    }

    createStore = (initData) => {
      if (isServer) {
        return initStore(initData)
      }
      if (!window[__NEXT_REDUX_STORE]) {
        window[__NEXT_REDUX_STORE] = initStore(initData)
      }
      return window[__NEXT_REDUX_STORE]
    }

    static async getInitialProps(ctx) {
      const res = WrapComponent.getInitialProps ? await WrapComponent.getInitialProps(ctx) : {}
      const store = initStore()
      return {
        severSideData: {
          ...store.getState(),
          ...res
        }
      }
    }

    render() {
      const {severSideData, ...rest} = this.props
      return <WrapComponent {...rest} store={this.store}/>
    }
  }
}

export default withRedux
