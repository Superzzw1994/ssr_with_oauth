import App from 'next/app'
import 'antd/dist/antd.css'
import {Provider} from "react-redux";
import withRedux from "../lib/withRedux";
import BasicLayout from "../components/Layout";

const isServer = typeof window === "undefined"

class MyApp extends App {
  static async getInitialProps(ctx) {
    const {Component} = ctx
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : Object.assign({}, isServer ? {
      user: ctx.ctx.req.session.userInfo
    } : {})
    return pageProps
  }

  render() {
    const {Component, store, ...rest} = this.props
    return <Provider store={store}>
      <BasicLayout>
        <Component {...rest}/>
      </BasicLayout>
    </Provider>
  }
}

export default withRedux(MyApp)
