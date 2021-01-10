import React, { useState } from 'react'
import useMousePosition from '../hooks/useMousePosition'
const LikeButton: React.FC = () => {
  // 将多个状态都进行拆分
  const [like, setLike] = useState(0)
  const [on, setOn] = useState(true)
  // 也可以将多个状态组合成一个对象传递
  const [obj, setObj] = useState({ like: 0, on: true })
  const position = useMousePosition()
  return (
    <div>
      <h3>in LinkButton: X: {position.x}, Y: {position.y}</h3>
      <button onClick={() => setLike(like + 1)}>{like}</button>
      <button onClick={() => setOn(!on)}>
        {on ? 'ON' : 'OFF'}
      </button>
      <button onClick={() => setObj({ like: obj.like + 1, on: obj.on })}>{obj.like}</button>
      <button onClick={() => setObj({ like: obj.like, on: !obj.on })}>
        {obj.on ? 'ON' : 'OFF'}
      </button>
    </div>
  )
}

export default LikeButton