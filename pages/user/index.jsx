import React from 'react'
import {withRouter} from "next/router";
import {connect} from "react-redux";

const User = (props) => {
  console.log(props)
  return <div>{props.name}</div>
}

export default connect((state) => state.user)(withRouter(User))
