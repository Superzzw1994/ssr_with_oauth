import App from 'next/app'
import 'antd/dist/antd.css'
import {Provider} from "react-redux";
import withRedux from "../lib/withRedux";

class MyApp extends App {
  static async getInitialProps(ctx) {
    const {Component} = ctx
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    return pageProps
  }

  render() {
    const {Component, store, ...rest} = this.props
    return <Provider store={store}>
      <Component {...rest}/>
    </Provider>
  }
}

export default withRedux(MyApp)
