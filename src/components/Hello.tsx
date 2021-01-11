import React, { useContext } from 'react'
import { ThemeContext } from './Theme'
interface IHelloProps {
  message?: string
}

const Hello: React.FC<IHelloProps> = (props) => {
  const context = useContext(ThemeContext)
  const style = {
    color: context.color,
    background: context.background
  }
  return (
    <div style={style}>
      <h2>{props.message}</h2>
      {props.children}
    </div>
  )
}
Hello.defaultProps = {
  message: "Hello Component"
}

export default Hello
