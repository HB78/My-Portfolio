import React from 'react'

function Welcome({message, email, name}) {
  return (
    <div>
      <p>{email} - {name}</p>
      <p>{message}</p>
    </div>
  )
}

export default Welcome
