import React from 'react'

interface IHelloProps {
  message?: string
}
const Hello: React.FC<IHelloProps> = (props) => {
  return (
    <>
      <h2>{props.message}</h2>
      {props.children}
    </>
  )
}
Hello.defaultProps = {
  message: "Hello Component"
}

export default Hello
