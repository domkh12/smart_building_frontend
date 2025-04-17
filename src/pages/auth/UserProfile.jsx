import { Button } from 'flowbite-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function UserProfile() {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div>
      <h1>User Profile</h1>
      {/* <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p> */}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default UserProfile
