import { useState, useEffect } from 'react'
import axios from 'axios'

const useURLLoader = (url: string, deps: any[] = []) => {
  // 直接写null会把data 判断为null的类型, 所以要使用泛型显示的指定为any类型
  // const [data, setData] = useState(null)
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(url).then(result => {
      setData(result.data)
      setLoading(false)
    })
  }, deps)

  return [data, loading]
}

export default useURLLoader
