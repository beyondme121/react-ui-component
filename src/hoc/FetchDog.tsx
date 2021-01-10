// 一个请求dog图片的应用
import React from 'react'

interface IShowResult {
  message: string,
  status: string
}

// 组件接收一个泛型, 类型就是IShowResult
const DogShow: React.FC<{ data: IShowResult }> = ({ data }) => {
  console.log(data)
  return (
    <div>
      <h2>Dog show: {data.status}</h2>
      <img src={data.message} alt="" />
    </div>
  )
}

export default DogShow