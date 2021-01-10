## Hello World

```js
import React from "react";
const Hello = (props: any) => {
  return <h2>{props.message}</h2>;
};
export default Hello;
```

### 约束 props

定义接口约束 props

```ts
interface IHelloProps {
  message: string;
}
const Hello = (props: IHelloProps) => {
  return <h2>{props.message}</h2>;
};
```

### 使用 React 官方定义的 type

- FunctionComponent 是官方的 interface, 描述函数的, 点进去看看 react/index.d.ts FunctionComponent
- FunctionComponent 接收一个泛型, 默认为{}对象, 就可以将 IHelloProps 作为类型传递给组件
- 这样 props 就有了 props.children , 函数就有了 defaultProps 等属性

```ts
interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}
```

#### 增强了组件的内容

```ts
interface IHelloProps {
  message?: string; // 默认参数 接口就是可选的了
}
const Hello: React.FunctionComponent<IHelloProps> = (props) => {
  return (
    <>
      <h2>{props.message}</h2>
      {props.children}
    </>
  );
};
// 默认参数
Hello.defaultProps = {
  message: "Hello Component",
};

// App.tsx
import Hello from "./components/Hello";
function App() {
  return (
    <div className="App">
      <Hello />
      <Hello message="hello..." />
    </div>
  );
}
```

`type FC<P = {}> = FunctionComponent<P>;`

```ts
// 简写 FC是类型别名
const Hello: React.FC<IHelloProps> = (props) => {
  return (
    <>
      <h2>{props.message}</h2>
      {props.children}
    </>
  );
};
```

## 自定义 hook

### 鼠标跟踪

```ts
import React, { useState, useEffect } from "react";
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("mousemove", updateMouse);

    return () => {
      document.removeEventListener("mousemove", updateMouse);
    };
  }, []);
  return position;
};

export default useMousePosition;
```

### 使用自定义 hook

在任意组件中可以直接引入并调用 useXXX, 返回自定义 hook 返回的值就是调用 useXXX 的结果

```ts
// App.tsx
import useMousePosition from "./hooks/useMousePosition";
function App() {
  const position = useMousePosition();
  return (
    <div className="App">
      <h2>
        in App: X: {position.x}, Y: {position.y}
      </h2>
    </div>
  );
}
```

### HOC

函数,接收组件,返回新组件 hoc/withLoader.tsx

```ts
import React from "react";
import axios from "axios";

interface ILoaderState {
  data: any;
  isLoading: boolean;
}
interface ILoaderProps {
  data: any;
}

const withLoader = <P extends ILoaderState>(
  WrappedComponent: React.ComponentType<P>,
  url: string
) => {
  return class LoaderComponent extends React.Component<
    Partial<ILoaderProps>,
    ILoaderState
  > {
    constructor(props: any) {
      super(props);
      this.state = {
        data: null,
        isLoading: false,
      };
    }
    componentDidMount() {
      this.setState({
        isLoading: true,
      });
      axios.get(url).then((result) => {
        this.setState({
          data: result.data,
          isLoading: false,
        });
      });
    }
    render() {
      const { data, isLoading } = this.state;
      return (
        <>
          {isLoading || !data ? (
            <p>data is Loading</p>
          ) : (
            <WrappedComponent {...(this.props as P)} data={data} />
          )}
        </>
      );
    }
  };
};
export default withLoader;
```

- 高阶组件需要一个容器组件, 高阶才能对原有的容器组件进行功能增强
- DogShow

```tsx
// 一个请求dog图片的应用
import React from "react";
// 接收参数的结构
interface IShowResult {
  message: string;
  status: string;
}
// 组件接收一个泛型, 类型就是IShowResult
const DogShow: React.FC<{ data: IShowResult }> = ({ data }) => {
  return (
    <div>
      <h2>Dog show: {data.status}</h2>
      <img src={data.message} alt="" />
    </div>
  );
};

export default DogShow;
```

```ts
// App
import withLoader from "./hoc/withLoader";
interface IShowResult {
  message: string;
  status: string;
}

// 组件接收一个泛型, 类型就是IShowResult
const DogShow: React.FC<{ data: IShowResult }> = ({ data }) => {
  console.log(data);
  return (
    <div>
      <h2>Dog show: {data.status}</h2>
      <img src={data.message} alt="" />
    </div>
  );
};

function App() {
  const WrappedDogShow = withLoader(
    DogShow,
    "https://dog.ceo/api/breeds/image/random"
  );
  return (
    <div className="App">
      <WrappedDogShow />
    </div>
  );
}
```

### HOC 的弊端

1. loading 的显示与否是一段逻辑代码, HOC 却要添加多余的节点, 比如 div
2. 难以理解
3. 被包裹的组件中, props 的 data 不知道从哪里来的

### 自定义 hook 的优点

```tsx
import { useState, useEffect } from "react";
import axios from "axios";

const useURLLoader = (url: string, deps: any[] = []) => {
  // 直接写null会把data 判断为null的类型, 所以要使用泛型显示的指定为any类型
  // const [data, setData] = useState(null)
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(url).then((result) => {
      setData(result.data);
      setLoading(false);
    });
  }, deps);

  return [data, loading];
};
export default useURLLoader;
```

- App 调用

```ts
import useURLLoader from "./hooks/useURLLoader";
// 容器组件使用的数据类型定义
interface IShowResult {
  message: string;
  status: string;
}
const DogShow: React.FC<{ data: IShowResult }> = ({ data }) => {
  return (
    <div>
      <h2>Dog show: {data.status}</h2>
      <img src={data.message} alt="" />
    </div>
  );
};
function App() {
  const [show, setShow] = useState(true);
  const [
    data,
    loading,
  ] = useURLLoader("https://dog.ceo/api/breeds/image/random", [show]);
  // data是any类型, 我们希望将其转换为 返回结果的类型 IShowResult
  const dogResult = data as IShowResult;
  return (
    <div className="App">
      <button onClick={() => setShow(!show)}>axios dog picture</button>
      {loading ? (
        <p>读取中</p>
      ) : (
        <img src={dogResult && dogResult.message} alt="" />
      )}
    </div>
  );
}
```

- 增加个 button,改变组件的状态, 重新渲染组件或者添加 deps
