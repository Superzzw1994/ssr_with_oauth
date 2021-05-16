import React, {useEffect} from 'react'
import axios from "axios";
import styled from "styled-components";
import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig()
const Title = styled.span`
  color: red;
  font-size: 12px;
`
const App = () => {
  useEffect(() => {
    axios.get('/api/user/info').then(res => console.log(res)).catch(e => console.log(e))
  }, [])
  return <div>123</div>
}

export default App
