import React from 'react'
import {Button, Layout} from "antd";

const {Header, Content, Footer} = Layout
const BasicLayout = props => {
  return <Layout>
    <Header>
      <span>23123123123</span>
    </Header>
    <Content>{props.children}</Content>
    <Footer>zzw1994529</Footer>
  </Layout>
}


export default BasicLayout
