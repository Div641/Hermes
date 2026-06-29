import React from 'react'
import { useSelector } from 'react-redux'
//using this reload pr  vapas login nhi khulega
const Dashboard = () => {

    const { user } = useSelector(state => state.auth)

    console.log(user)
    
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard