import React, { useState } from 'react';
// import Hello from './components/Hello'
// import LikeButton from './components/LikeButton'
import useMousePosition from './hooks/useMousePosition'
// import withLoader from './hoc/withLoader'
import useURLLoader from './hooks/useURLLoader';

interface IShowResult {
  message: string,
  status: string
}

// 组件接收一个泛型, 类型就是IShowResult
const DogShow: React.FC<{ data: IShowResult }> = ({ data }) => {
  return (
    <div>
      <h2>Dog show: {data.status}</h2>
      <img src={data.message} alt="" />
    </div>
  )
}


function App() {
  const [show, setShow] = useState(true)
  const position = useMousePosition()
  // const WrappedDogShow = withLoader(DogShow, 'https://dog.ceo/api/breeds/image/random')
  const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random', [show])
  // data是any类型, 我们希望将其转换为 返回结果的类型 IShowResult
  const dogResult = data as IShowResult
  return (
    <div className="App">
      { show ? 'hello' : 'world'}
      { loading ? <p>读取中</p> : <img src={dogResult && dogResult.message} alt="" />}
      <button onClick={() => setShow(!show)}>axios dog picture</button>
    </div>
  );
}

export default App;
