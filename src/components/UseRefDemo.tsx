import React, { useRef, useEffect, useState } from 'react'

const UseRefDemo: React.FC = () => {
  // const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const domRef = useRef<HTMLInputElement>(null)
  const didMountRef = useRef(false)

  useEffect(() => {
    if (domRef && domRef.current) {
      domRef.current.focus()
    }
  })

  useEffect(() => {
    if (didMountRef.current) {
      console.log('updated')
    } else {
      console.log('init')
      didMountRef.current = true
    }
  }, [didMountRef.current])

  // 状态闭包
  // const handleClosure = () => {
  //   setTimeout(() => {
  //     console.log(count)
  //   }, 3000)
  // }

  const handleRef = () => {
    setTimeout(() => {
      console.log(countRef.current)
    }, 3000)
  }

  const handleRefClick = () => {
    countRef.current += 1
    console.log(countRef.current)
  }

  return (
    <div>
      {/* 状态: {count} ,  */}
      ref: {countRef.current}
      <div>
        <input type="text" ref={domRef} />
        {/* <button onClick={() => setCount(count + 1)}>+1 状态</button> */}
        <button onClick={handleRefClick}>+1 ref</button>
        {/* <button onClick={handleClosure}>状态打印</button> */}
        <button onClick={handleRef}>ref打印</button>
      </div>
    </div>
  )
}
export default UseRefDemo