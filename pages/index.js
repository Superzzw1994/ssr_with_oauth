import React from 'react'
import {Button} from "antd";
import Header from "../components/Header";
import Link from "next/link";
import styled from "styled-components";

const Title = styled.span`
  color: red;
  font-size: 12px;
`
const App = () => {
  return <div className={'name'}>
    <Header>
      <Link href={'/user?id=1'} as={'/user/1'} title={'用户'}>
        <Button>用户</Button>
      </Link>
      <Link href={'/content'} title={'内容'}>
        <Button>内容</Button>
      </Link>
    </Header>
    <Title>
      zzw666!
    </Title>
    <style jsx>
      {
        `.name {
          color: red;
        }`
      }
    </style>
  </div>
}

export default App
