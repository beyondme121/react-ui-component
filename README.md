[TOC]



## 组件库笔记

## 代码结构和代码检查

- create-react-app 自带的 eslint 包含了代码检查功能 如使用===进行比较, 有问题！！

```js
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ]
}
```

### 样式解决方案分析

- inline css
- CSS-in-JS (style-component)
- Sass/Less antd

### 创建组件库的色彩体系

系统色板: 基础色版 + 中性色板
基础色版: `http://zhongguose.com/`
中性色板: antd 组件中的黑白灰

产品色板: 品牌色 +

品牌色: primary color + second color + 辅助色

creat-react-app 天生不支持 sass 的, 需要添加 node-sass
`yarn add node-sass`

## 定义色彩体系使用的变量

其中!default 表示如果用户对变量进行了赋值, scss 就不会将用户的变量的值对这里面的变量赋值了

- \_varibales.scss

```scss
// 中性色
$white: #fff !default;
$gray-100: #f8f9fa !default;
$gray-200: #e9ecef !default;
$gray-300: #dee2e6 !default;
$gray-400: #ced4da !default;
$gray-500: #adb5bd !default;
$gray-600: #6c757d !default;
$gray-700: #495057 !default;
$gray-800: #343a40 !default;
$gray-900: #212529 !default;
$black: #000 !default;

// 基础色
$blue: #0d6efd !default;
$indigo: #6610f2 !default;
$purple: #6f42c1 !default;
$pink: #d63384 !default;
$red: #dc3545 !default;
$orange: #fd7e14 !default;
$yellow: #fadb14 !default;
$green: #52c41a !default;
$teal: #20c997 !default;
$cyan: #17a2b8 !default;

// 系统色
$primary: $blue !default;
$secondary: $gray-600 !default;
$success: $green !default;
$info: $cyan !default;
$warning: $yellow !default;
$danger: $red !default;
$light: $gray-100 !default;
$dark: $gray-800 !default;
```

### 组件库样式变量分类

### normalize.css

基于 normalize.css 修改自己的 styles/\_reboot.scss 文件, 变量替换等操作

### 测试样式 引入其他模块

- scss 的 import 语法, 如果是以\_下划线命名的文件模块, 将被认为是 partial 的, 就是使用 scss 编译的.scss 文件不会打包出新的文件.
- 同时, import 时, 不用加下划线 只需要 @import `"variables";` 即可
  styles/index.scss, @import 样式

```scss
// 引入变量声明  注意加分号;
@import "variables";
// 引入reboot
@import "reboot";
```

### 组件中使用

- src/index.tsx, 同时在其他组件中使用即可

```tsx
import "./styles/index.scss";
```

### 下载 node-sass

```
npm config set registry https://registry.npm.taobao.org/
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
npm i node-sass -D
```

- 错误信息

```
./src/styles/index.scss (./node_modules/css-loader/dist/cjs.js??ref--5-oneOf-6-1!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader??ref--5-oneOf-6-3!./node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-6-4!./src/styles/index.scss)
Error: Node Sass version 5.0.0 is incompatible with ^4.0.0.
```

```
卸载已安装版本 npm uninstall node-sass
安装 npm install node-sass@4.14.1
```

## Button 组件

- 分类 primary, default, danger, link
- 大小 large, small
- 失效样式

考虑以上几种分类的接口定义

### 接口定义

```tsx
export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
  // 普通的可以不用写?
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Dange = 'danger',
  Link = 'link'
}

// 组件props的类型
interface BaseButtonProps {
  className?: string,
  disabled?: boolean,
  size?: ButtonSize,
  btnType?: ButtonType,
  children: React.ReactNode,
  href?: string
}
```

### 安装 classnames
`npm i classnames @types/classnames`

### 组件ts实现
```ts
import React from 'react'
import classNames from 'classnames'

// ----------------- 定义Button组件某属性的可枚举的类型 -----------------
export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

export enum ButtonSize {
  Large = 'lg',
  Small = 'small',
  Normal = 'normal'
}

// 定义组件接收的props的类型
interface BaseButtonProps {
  btnType?: ButtonType,
  size?: ButtonSize,
  children: React.ReactNode,
  className?: string,
  disabled?: boolean,
  href?: string
}

const Button: React.FC<BaseButtonProps> = (props) => {
  const { btnType, size, children, disabled, href } = props
  // 定义一个变量, 给button组件添加默认的前缀 btn, 并且给组件添加样式(联合class样式)
  // 如果object的key是变化的,可以采用[`btn-${xxx}`]: yyy的写法
  const classes = classNames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled  // 当属性btnType是link, 并且传入了disabled属性
  })
  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href}>{children}</a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled}>{children}</button>
    )
  }
}

// 添加Button的默认值
Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}

export default Button
```


### 样式的需求分析
- 文字padding的 line-height, color, 居中, cursor的变化, 
- 属性size, 由padding，font-size 控制的
- btnType: 由字体， 背景色, border color, hover的颜色，focus，disable颜色的变化， link-type与其他button不同, 另外一种

### 样式的模块化
1. 在_variables.scss中, 定义变量
```css
/**
* 边框和阴影
*/
$border-width: 1px !default;
$border-color: $gray-300 !default;

// 不同类型的 box shadow
$box-shadow-sm: 0 0.125rem 0.25rem rgba($black, 0.075) !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;
$box-shadow-lg: 0 1rem 3rem rgba($black, 0.175) !default;
$box-shadow-inset: inset 0 1px 2px rgba($black, 0.075) !default;

$border-radius: 0.25rem !default;
$border-radius-lg: 0.3rem !default;
$border-radius-sm: 0.2rem !default;
/**
 * 按钮
 */
$btn-font-weight: 400;
$btn-padding-y: 0.375rem !default;
$btn-padding-x: 0.75rem !default;
$btn-font-family: $font-family-base !default;
$btn-font-size: $font-size-base !default;
$btn-line-height: $line-height-base !default;

$btn-padding-y-sm: 0.25rem !default;
$btn-padding-x-sm: 0.5rem !default;
$btn-font-size-sm: $font-size-sm !default;

$btn-padding-y-lg: 0.5rem !default;
$btn-padding-x-lg: 1rem !default;
$btn-font-size-lg: $font-size-lg !default;

$btn-border-width: $border-width !default;

$btn-box-shadow: inset 0 1px 0 rgba($white, 0.15), 0 1px 1px rgba($black, 0.075) !default;
$btn-disabled-opacity: 0.65 !default;

$btn-link-color: $link-color !default;
$btn-link-hover-color: $link-hover-color !default;
$btn-link-disabled-color: $gray-600 !default;

$btn-border-radius: $border-radius !default;
$btn-border-radius-sm: $border-radius-sm !default;
$btn-border-radius-lg: $border-radius-lg !default;

$btn-transition: all 0.15s ease-in-out !default;
```

### 组件button的样式

#### 1. 基础样式

1. 使用variables的变量声明
2. Button/_style.scss, SASS- 局部文件(Partial), 以下划线开头
3. 在styles/index.scss 引入button的样式 , **index.scss本身在index.tsx被引入**
```scss
@import "../components/Button/style";
```
4. _style.scss
添加button组件的基础样式,不涉及到btnType和size的, 变量都是从variables.scss中获取
```scss
.btn {
  position: relative;
  display: inline-block;
  font-weight: $btn-font-weight;
  line-height: $btn-line-height;
  color: $body-color;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
  background-image: none;
  border: $btn-border-width solid transparent;
  padding: $btn-padding-y $btn-padding-x;
  font-size: $btn-font-size;
  border-radius: $border-radius;
  box-shadow: $btn-box-shadow;
  cursor: pointer;
  transition: $btn-transition;
  &.disabled,
  &[disabled] {
    cursor: not-allowed;
    opacity: $btn-disabled-opacity;
    > * {
      pointer-events: none;
    }
  }
}
```

#### 2. 特殊样式Type & Size
这两个属性中, **属性的设置都是类似的**, 我们可以使用sass中的**mixin**, 解决css的重用问题
1. src/styles/_mixin.scss
2. index.scss引入 `@import "mixin";`
3. 定义button 的 mixin 
```scss
// 修改button的 padding, font-size, border-radius
@mixin button-size($padding-y, $padding-x, $font-size, $border-radius) {
  padding: $padding-y $padding-x;
  font-size: $font-size;
  border-radius: $border-radius;
}
```
4. 在button的内部模块样式中使用 @include
```scss
@include button-size($btn-padding-y, $btn-padding-x, $btn-font-size, $border-radius);
```
```scss
// 使用mixin替换掉一行行的写, 类似函数
padding: $btn-padding-y $btn-padding-x;
font-size: $btn-font-size;
border-radius: $border-radius;
```

5. 增加large, small, type等类型的mixin
```scss
@mixin button-style(
  $background,
  $border-color,
  $color,
  $hover-background: lighten($background, 7.5%),
  $hover-border-color: lighten($border-color, 10%),
  $hover-color: $color
) {
  color: $color;
  background: $background;
  border-color: $border-color;
  &:hover {
    color: $hover-color;
    background: $hover-background;
    border-color: $hover-border-color;
  }
  &:focus,
  &.focus {
    color: $hover-color;
    background: $hover-background;
    border-color: $hover-border-color;
  }
  &[disabled],
  &.disabled {
    color: $color;
    background: $background;
    border-color: $border-color;
  }
}
```

6. src/component/button/_style.scss, 回到组件中的样式
```scss

.btn-lg {
  @include button-size(
    $btn-padding-y-lg,
    $btn-padding-x-lg,
    $btn-font-size-lg,
    $border-radius-lg
  );
}

.btn-sm {
  @include button-size(
    $btn-padding-y-sm,
    $btn-padding-x-sm,
    $btn-font-size-sm,
    $border-radius-sm
  );
}

.btn-primary {
  @include button-style($primary, $primary, $white);
}
.btn-danger {
  @include button-style($danger, $danger, $white);
}
.btn-default {
  @include button-style(
    $white,
    $gray-400,
    $body-color,
    $white,
    $primary,
    $primary
  );
}
// 连接按钮比较特殊 单独写
.btn-link {
  font-weight: $font-weight-normal;
  color: $btn-link-color;
  text-decoration: $link-decoration;
  box-shadow: none;
  &:hover {
    color: $btn-link-hover-color;
    text-decoration: $link-hover-decoration;
  }
  &:focus,
  &.focus {
    color: $btn-link-hover-color;
    text-decoration: $link-hover-decoration;
  }
  &[disabled],
  &.disabled {
    color: $btn-link-disabled-color;
    pointer-events: none;
  }
}
```

#### 3. 添加元素固有属性和方法

- Button接收的props是写死的, 并没有a和button元素自身native应该有的属性, 比如onClick属性都没有 并且直接添加onClick会报错
- 原生的a和button太多了，一个个加是不行的

解决思路
> 1. 定义一个类型别名, NativeButtonProps, **依据React提供的Button的类型,** 传递泛型规定的类型HTMLElement
> 2. 使用交叉类型[ & ], 把button自身的属性 和 自定义的属性 进行合并{就是merge}, 不能使用联合类型 [ | ],联合类型是a或者b的类型
> 3. 将必选的类型 变成可选的 Partial, ts的全局的utility type

```tsx
// 元素原生的属性
// button
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> & BaseButtonProps
// a连接
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> & BaseButtonProps
// 组合button 和 a, 并且设置a 和 button 所有的属性都是可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
```

#### 4. Button组件最终
```tsx
import React from 'react'
import classNames from 'classnames'

// ----------------- 定义Button组件某属性的可枚举的类型 -----------------
export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

export enum ButtonSize {
  Large = 'lg',
  Small = 'small',
  Normal = 'normal'
}

// 定义组件接收的props的类型
interface BaseButtonProps {
  btnType?: ButtonType,
  size?: ButtonSize,
  children: React.ReactNode,
  className?: string,       // 用户自定义的className
  disabled?: boolean,
  href?: string
}
// 元素原生的属性
// button
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> & BaseButtonProps
// a连接
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> & BaseButtonProps
// 组合button 和 a, 并且设置a 和 button 所有的属性都是可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>


const Button: React.FC<ButtonProps> = (props) => {
  const { btnType, size, children, disabled, href, className, ...restProps } = props
  // 定义一个变量, 给button组件添加默认的前缀 btn, 并且给组件添加样式(联合class样式)
  // 如果object的key是变化的,可以采用[`btn-${xxx}`]: yyy的写法
  const classes = classNames('btn',
    className,  // 增加用户自定义的class
    {
      [`btn-${btnType}`]: btnType,
      [`btn-${size}`]: size,
      'disabled': (btnType === ButtonType.Link) && disabled  // 当属性btnType是link, 并且传入了disabled属性 
    })
  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...restProps}>{children}</a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>{children}</button>
    )
  }
}

// 添加Button的默认值
Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}

export default Button
```




## 测试 jest 断言库

react 内置了 Jest, 直接使用 命令
`npx jest jest.test.js --watch` 持续监控文件的变化并执行命令进行测试

```js
// create-react-app 默认添加了jest
// npx jest jest.test.js --watch 执行测试
```

```js
test("test common matcher", () => {
  expect(2 + 2).toBe(4);
  expect(2 + 2).not.toBe(5);
});

test("test to be true or false", () => {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
});

test("test number", () => {
  expect(4).toBeGreaterThan(3);
  expect(2).toBeLessThan(3);
});

test("test object", () => {
  // expect({ name: "sanfeng" }).toBe({ name: "sanfeng" });  // toBe是完全相同, 比较对象的值是否相同使用 toEqual
  expect({ name: "hello" }).toEqual({ name: "hello" });
});
```

```text
npx jest jest.test.js --watch
Watch Usage: Press w to show more.
 PASS  ./jest.test.js
  √ test common matcher (1 ms)
  √ test to be true or false (1 ms)
  √ test number (3 ms)
  √ test object (1 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        0.508 s, estimated 1 s
Ran all test suites matching /jest.test.js/i.

Watch Usage: Press w to show more.
```



## React 测试工具 React Testing Library

package.json 中 工具是大于 3.3.0 版本的并且使用 create-react-app 脚手架官方推荐的 react 组件测试工具 jest-dom
"react-scripts": "4.0.1",
"@testing-library/jest-dom": "^5.11.4",

- 添加测试用例 components/Button/button.test.tsx

- button.test.tsx, 执行 npm run test

```tsx
import React from 'react'
import { render } from '@testing-library/react'
import Button from './button'

test("our first react test", () => {
  const wrapper = render(<Button>Nice</Button>)
  const element = wrapper.queryByText('Nice')
  expect(element).toBeTruthy()
})
```


## jest-dom
- 新建setupTests.ts 启动时, 在每次运行npm run test时, react-scirpt会先运行setupTest.ts文件, 用于全局通用的配置
- 测试文件就会多出一些方法,针对dom的测试
- create-react-app 高版本自带
- **当运行npm run test时, 在每次测试前的通用配置放在setupTests.ts这个文件**
```ts
import "@testing-library/jest-dom/extend-expect";
```

```ts
test("our first react test", () => {
  // const wrapper = render(<Button>Nice</Button>)
  // const element = wrapper.queryByText('Nice')
  // expect(element).toBeTruthy()
  // 断言判断元素是否出现在文档中
  expect(element).toBeInTheDocument()
})
```

### Button组件测试用例

1. 构思组件测试用例有哪些，然后进行分类，最后再一个个书写 describe

```bash
1. 检测普通功能, 是否加载到文档, 是否是button标签, class是否加上了, 按钮是否可点击
2. 检查特殊属性: type, size, 自定义的className的设置
3. 检查是a链接的情况, tagName是否是A, 因为button组件创建时要求btn-type='btn-link' && 有href属性才创建a链接
```



```ts
import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './button'// 从组件中引入type 类型

const defaultProps = {
  onClick: jest.fn()
}
// 定义特殊类型属性
const specialProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'demo'
}
// disable的属性
const disabledProps = {
  disabled: true,
  onClick: jest.fn()
}
// 对button组件进行分类
describe('test Button component', () => {
  /**
   * 1. 应该渲染一个button: 拿到的elment就是一个dom元素, 通过tagName判断
   * 2. 测试组件上有没有className
   * 3. 测试按钮的事件
   */
  it('should render the corrent default button', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    // queryByText('Nice') => HTMLElement | null 
    // element.tagName: 会报错, 因为element返回的类型是union type, 联合类型，可能是null, 所以不能调用上面的属性了
    const element = wrapper.getByText('Nice')
    // 1. 判断组件在文档中
    expect(element).toBeInTheDocument()
    // 2. 渲染的是一个button
    expect(element.tagName).toEqual('BUTTON')
    // @ts-ignore
    expect(element.disabled).toBeFalsy()
    expect(element).toHaveClass('btn btn-default')
    // 3. 判断组件上是否有onClick事件
    // 对元素进行点击
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
    // 4. 自定义属性校验
    // expect(element.disabled).toBeFalsy()
  })
  // 测试特殊属性 type size ...
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...specialProps}>特殊属性</Button>)
    const element = wrapper.getByText('特殊属性')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg demo')
  })

  // 测试 button的type是a 并且提供href 
  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(
      <Button btnType={ButtonType.Link} href="https://www.baidu.com">Link</Button>
    )
    let ele = wrapper.getByText('Link')
    expect(ele).toBeInTheDocument()
    expect(ele.tagName).toEqual('A')
    expect(ele).toHaveClass('btn btn-link')
    expect(ele).toHaveAttribute('href')
  })

  // 测试disabled属性
  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>disabled</Button>)
    const ele = wrapper.getByText('disabled')
    expect(ele).toBeInTheDocument()
    // @ts-ignore    注释会忽略下一行中产生的所有错误
    expect(ele.disabled).toBeTruthy()
    fireEvent.click(ele)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
```



## 2. Menu组件

组件分析

1. 分析模式 vertical horizatal, 激活index
2. 激活index，高亮，有disabled, 下拉菜单 水平的有折叠隐藏
3. 有状态修改, 父子组件传值 useState useContext等

![](C:\Users\CNZHLIU14\AppData\Roaming\Typora\typora-user-images\image-20210113133324804.png)

<img src="C:\Users\CNZHLIU14\AppData\Roaming\Typora\typora-user-images\image-20210113133511999.png"/>

<img src="C:\Users\CNZHLIU14\AppData\Roaming\Typora\typora-user-images\image-20210113134116068.png" alt="image-20210113134116068" style="zoom:80%;" />

<img src="C:\Users\CNZHLIU14\AppData\Roaming\Typora\typora-user-images\image-20210113134147624.png" alt="image-20210113134147624" style="zoom:80%;" />	



Menu组件

```ts
import React, { Children } from 'react'
import classNames from 'classnames'

type MenuMode = 'vertical' | 'horizontal'
export interface MenuProps {
  defaultIndex?: number,
  className?: string,
  mode?: MenuMode,
  style?: React.CSSProperties,
  onSelect?: (selectedIndex: number) => void
}

const Menu: React.FC<MenuProps> = props => {
  const { defaultIndex, className, mode, style, onSelect, children } = props
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical'
  })
  return (
    <ul className={classes} style={style}>
      {children}
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'vertical'
}
export default Menu
```



MenuItem

```ts
import React from 'react'
import classNames from 'classnames'

/**
 * index: item的索引
 */
export interface MenuItemProps {
  index?: number,
  disabled?: boolean,
  className?: string,
  style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = props => {
  const { index, disabled, className, style, children } = props
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    // 应该还有一个is-active, 是否被激活, 应该由父组件传递过来
  })
  return (
    <li className={classes} style={style}>
      {children}
    </li>
  )

}

export default MenuItem
```



### 2. 问题

1. Menu Item 组件不知道 Menu组件当前active的是哪一项，只有知道这个值才能高亮哪一个item
2. 不知道onSelect 的函数作为父组件的处理函数，怎样传递给子组件 Menu Item 进行处理
3. React数据流从上到下，父组件如何把数据传递给子组件



### 3. 只有children时透传值

遇到的问题: 需要把一些父组件的值传递给子组件, 比如当前激活的index, onSelect函数

但是menu这个父组件中的子组件部分是 {children}，这个通过props的方式就没法传递了

Context: 透传属性的好帮手

```tsx
<ul className={classes} style={style}>
    {children}
</ul>
```



1. 定义context的接口(优化onSelect的类型定义 类型别名 type XXX = ...)

2. 创建context 并导出, 供使用处使用

3. 因为用户点击某一个item, 就会修改当前的activeIndex, 

   所以父组件中需要state `**const** [currentActive, setActive] = useState(defaultIndex)`

4. 创建传递给子组件的context. 

   1. currentActive：当前激活的index
   2. onSelect??:是否把Menu上的onSelect直接传递给MenuItem呢? 其实在父组件中需要做2件事
      1. 除了调用onSelect之外, 用户定义的回调
      2. 点击item时，对应的active要进行变化 即更新状态







### 4. 第一版本实现

```ts
import React, { createContext, useState } from 'react'
import classNames from 'classnames'

type MenuMode = 'vertical' | 'horizontal'
type SelectCallback = (selectedIndex: number) => void

// 1. 
export interface MenuProps {
  defaultIndex?: number,
  className?: string,
  mode?: MenuMode,
  style?: React.CSSProperties,
  onSelect?: SelectCallback
}

// 通过使用context, 将父组件传递给子组件的属性的接口定义
interface IMenuContext {
  index: number,
  onSelect?: SelectCallback
}

export const MenuContext = createContext<IMenuContext>({ index: 0 })

const Menu: React.FC<MenuProps> = props => {
  const { defaultIndex, className, mode, style, onSelect, children } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('ux-menu', className, {
    'menu-vertical': mode === 'vertical'
  })

  const handleSelect = (index: number) => {
    // 1. 额外的操作: 更新currentIndex的所以, 以便通知子组件最新的index是多少
    setActive(index)
    if (onSelect) {
      // 执行用户自定义回调
      onSelect(index)
    }
  }
  // 创建context需要的值
  const contextValue: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleSelect
  }
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={contextValue}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'vertical'
}
export default Menu
```



- MenuItem

```ts
import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
/**
 * index: item的索引
 */
export interface MenuItemProps {
  index: number,
  disabled?: boolean,
  className?: string,
  style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = props => {
  const { index, disabled, className, style, children } = props
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    // 应该还有一个is-active, 是否被激活, 应该由父组件传递过来
    'is-active': index === context.index
  })
  // 定义什么情况下子组件调用父组件的方法
  const handleClick = () => {
    if (context.onSelect && !disabled) {
      // 调用父组件(context中的方法, 把自身上的props传递给父组件 <MenuItem index={1}>hello</MenuItem>)
      // 将组件自身的属性index 传递给了父组件的onSelect函数, 这个函数接受一个number类型的值, 就是item的索引index
      // 父组件更新activeIndex, 并执行用户自定义回调onSelect函数
      context.onSelect(index)
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

export default MenuItem
```



```ts
// App.tsx
import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

function App() {
  return (
    <div>
      <Menu onSelect={(index) => console.log(index)} mode="vertical">
        <MenuItem index={0}>
          hello
        </MenuItem>
        <MenuItem index={2} disabled>
          disabled
        </MenuItem>
        <MenuItem index={1}>
          world
        </MenuItem>
      </Menu>
    </div>
  );
}

export default App;

```



### 5. 父子组件传递index和函数的数据流

1. Menu给Menu Item传递当前激活的index, 目的是Item可以通过自身的props的index，来判断哪个item和activeIndex相等,然后设置className.

2. 传递一个callback, 在子组件上调用, 把被点击的item的index传递出来到父组件, 然后父组件做两件事
   1. 修改当前的activeIndex
   2. 执行onSelect用户自定义函数



### 6. 第一版不足

1. 使用MenuItem都必须传递index属性
2. Menu组件的子元素可以传递任何元素, 我只希望传递MenuItem组件，如果添加别的元素，给出警告



### 7. 添加Menu的样式

> [A Complete Guide to Flexbox | CSS-Tricks (css-tricks.com)](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

#### 1. 基本样式

```css
.ux-menu {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 1rem;
  list-style: none;
  border-bottom: $menu-border-width solid $menu-border-color;
  box-shadow: $menu-box-shadow;
  > .menu-item {
    padding: $menu-item-padding-y $menu-item-padding-x;
    cursor: pointer;
    transition: $menu-transition;
    &:hover,
    &:focus {
      text-decoration: none;
    }
    &.is-disabled {
      color: $menu-item-disabled-color;
      pointer-events: none;
      cursor: default;
    }
    &.is-active,
    &:hover {
      color: $menu-item-active-color;
      border-bottom: $menu-item-active-border-width solid
        $menu-item-active-color;
    }
  }
}
```

#### 2. 垂直

```scss
.menu-vertical {
  flex-direction: column;
  border-bottom: 0px;
  margin: 10px 20px;
  border-right: $menu-border-width solid $menu-border-color;
  .menu-item {
    border-left: $menu-item-active-border-width solid transparent;
    &.is-active,
    &:hover {
      border-bottom: 0;
      border-left: $menu-item-active-border-width solid $menu-item-active-color;
    }
  }
}
```



#### 3. 水平





### 8. 测试

1. 测试提供默认属性，会不会显示正确的class和行为



#### 1.  测试用例分类

```tsx
import React from 'react'
import { render } from '@testing-library/react'

describe('test Menu and MenuItem component', () => {
  it('1. 给定默认的参数渲染正确的Menu和Item', () => {

  })
  it('2. 点击item切换激活index 并且 调用正确的回调函数', () => {

  })
  it('veritcal模式渲染正确的class', () => {

  })
})
```



#### 2. 引入组件和设置props

```tsx
import Menu, { MenuProps } from './menu'
import MenuItem, { MenuItemProps } from './menuItem'

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn()
}
const testVerticalProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical'
}
```

#### 3. 定义测试组件

```tsx
const genMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>
        active
     </MenuItem>
      <MenuItem index={1} disabled>
        disabled
     </MenuItem>
      <MenuItem index={2}>
        xyz
     </MenuItem>
    </Menu>
  )
}
```



#### 4. 定义通用的测试内容

beforeEach()钩子

react-testing-library的测试理念, 测试用例越贴近用户的使用方法, 测试结果就会给你越大的信心

所以api通常是通过渲染元素的内容来取得这个节点，而不是通过通过class或者id

- menu组件中添加data-testid="test-menu",



```ts
import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, RenderResult, cleanup } from '@testing-library/react'

import Menu, { MenuProps } from './menu'
import MenuItem, { MenuItemProps } from './menuItem'

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test'  // 自定义的class
}
const testVerticalProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical',
}
// 定义测试组件
const genMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>active</MenuItem>
      <MenuItem index={1} disabled>
        disabled
      </MenuItem>
      <MenuItem index={100}>xyz</MenuItem>
    </Menu>
  )
}

// 定义通用变量的类型,否则返回值会丧失类型 如render(genMenu(testProps)) => any
let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {

  // 每个case开始前都会调用
  beforeEach(() => {
    wrapper = render(genMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    // wrapper.container.getElementsByClassName('...') 也可以
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })

  it('1. 给定默认的参数渲染正确的Menu和Item', () => {
    // 1. 检测在document中
    expect(menuElement).toBeInTheDocument()
    // 2. 有对应的class
    expect(menuElement).toHaveClass('ux-menu test')
    // 3. 检测渲染的li的数量是3个
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    // 4. index=0的class默认添加is-active的
    expect(activeElement).toHaveClass('menu-item is-active')
    // 5. disabled
    expect(disabledElement).toHaveClass('menu-item is-disabled')

  })

  it('2. 点击item切换激活index 并且 调用正确的回调函数', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    // 被点击的item, 自身元素应该被添加is-active类
    expect(thirdItem).toHaveClass('is-active')
    // 点击切换后, 原来的active的元素就应该没有了is-active类
    expect(activeElement).not.toHaveClass('is-active')
    // 点击第三个item, Menu组件的onSelect回调应该被调用, 并且第三个item的index是100, 因为元素props设置的就是100
    expect(testProps.onSelect).toHaveBeenCalledWith(100)
    // 测试disabled element, 点击后, 样式没有is-active, onSelect回调没有被调用
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })

  it('3. veritcal模式渲染正确的class', () => {
    cleanup()
    const wrapper = render(genMenu(testVerticalProps))
    const ele = wrapper.getByTestId('test-menu')
    expect(ele).toHaveClass('menu-vertical')
  })
})
```

在测试"veritcal模式渲染正确的class"时报错，因为会找到多个test-menu这个元素呢? 

因为在beforeEach这个钩子中渲染了一次,render, test case又渲染了一次,所以要手动清楚cleanup

```
test Menu and MenuItem component › veritcal模式渲染正确的class
   TestingLibraryElementError: Found multiple elements by: [data-testid="test-menu"]
```

那么为什么第二次的it测试,没有报错呢? 没有多个元素呢? 是因为testing library默认在it的最后默认调用cleanup!!!



###  9. 进一步增强Menu组件

#### 1.限制子组件的类型只能是MenuItem

现在是父组件一股脑的使用了children，增强是我们希望获得某种操控children的能力。想到在children上调用map方法进行增强。

直接在children上使用map是十分危险的事情。react文档上说，children是一个不透明的数据结构，可以是任意类型。可以是个数组，函数，对象等等。

那么如果是函数，直接在函数上调用map方法就会报错了。为了解决这个问题，react推出了2个帮助方法可以轻松的循环children

React.Children.map, React.Children.forEach.  如果children中有一些不符合规则的类型, 帮助方法就可以跳过这些类型



- 首先给MenuItem添加一个displayName，这个是react内置的静态属性，帮助我们判断类型
- 在父组件中Menu, 通过循环children, 拿出每一个child，就可以判断了

> MenuItem

```tsx
MenuItem.displayName = 'MenuItem'
```



>  Menu组件

```tsx
const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      // childElement.type.displayName
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        return child
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
}
```

> 测试, 增加一个li元素, 测试结果通过, 但是因为有li元素会warning

```tsx
// 定义测试组件
const genMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <li>hello</li>
    </Menu>
  )
}
```



#### 2. 自动添加index属性

如果能把某个属性混入到这个实例child中。React.cloneElement帮助方法

```tsx
if (displayName === 'MenuItem') {
    return React.cloneElement(childElement, {
    index
    })
} else {
	console.error('Warning: Menu has a child which is not a MenuItem component')
}
```

修改MenuItem的props的index为可选的

```tsx
export interface MenuItemProps {
  index?: number,
  disabled?: boolean,
  className?: string,
  style?: React.CSSProperties
}
```

```tsx
// 修改自组件, 此时index不是必须传的, 当有index并且为number才出发点击, 调用父类的函数,将index传递回父组件
const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === 'number') {
      // 调用父组件(context中的方法, 把自身上的props传递给父组件 <MenuItem index={1}>hello</MenuItem>)
      // 将组件自身的属性index 传递给了父组件的onSelect函数, 这个函数接受一个number类型的值, 就是item的索引index
      // 父组件更新activeIndex, 并执行用户自定义回调onSelect函数
      context.onSelect(index)
    }
}
```





### 10.下拉菜单SubMenu

#### 1. 增加下拉菜单的节点

```
<Menu.SubMenu>
...
</Menu.SubMenu>
```

1. 样式
2. 将下拉的内容全部显示出来
3. ...

```tsx
import React, { useContext, FunctionComponent, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'   // 父组件的上下文
// 7. 引入MenuItem的接口props类型定义
import { MenuItemProps } from './menuItem'

// 1. 定义自身组件的属性以及类型
export interface SubMenuProps {
  index?: number,
  title: string,
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  // 2. 解构所有接收的参数
  const { index, title, className, children } = props
  // 3. 引入上下文,拿到父组件中的值
  const context = useContext(MenuContext)
  // 4. 整合class样式
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.activeIndex === index
  })

  // 6. 处理渲染的下拉内容
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return child
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
    return (
      <ul className="ux-submenu">
        {childrenComponent}
      </ul>
    )
  }

  // 5. 渲染DOM (li包裹着div作为标题)
  return (
    <li key={index} className={classes}>
      <div className="submenu-title">
        {title}
      </div>
      {/* 下来菜单内容,依然不能使用children直接渲染submenu中的内容,因为依然要限制只有MenuItem, 使用renderChildren函数 */}
      {/* 8. 将处理好的children加入到组件中 */}
      {renderChildren()}
    </li>
  )
}

// 9. 增加displayName
SubMenu.displayName = "SubMenu"
export default SubMenu

// 10. 到App进行编写测试代码
// 11. 修改menu组件, 发现渲染renderChildren时没有显示下来菜单,  Menu组件中除了可以是MenuItem,还可以有SubMenu
```



App.tsx

```tsx
import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
function App() {
  return (
    <div>
      <Menu onSelect={(index) => console.log(index)} mode="vertical">
        <MenuItem >
          hello
        </MenuItem>
        <MenuItem disabled>
          disabled
        </MenuItem>
        <MenuItem >
          world
        </MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>
            产品
          </MenuItem>
          <MenuItem >
            区域
          </MenuItem>
        </SubMenu>
      </Menu>
    </div>
  );
}
export default App;
```



#### 2. 增加打开关闭功能

1. 设置display:none

```css
// _style.scss
.ux-submenu {
	display: none
}
```

2. 通过点击或者hover事件,给组件添加class, open,open样式为display: block; 添加open类. 增加state

```css
  .ux-submenu {
    // ...
  }
  // 增加显示的类
  .ux-submenu.menu-opened {
    display: block;
  }
```



**subMenu.tsx实现, 从第12步骤开始**

```tsx
import React, { useContext, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'   // 父组件的上下文
// 7. 引入MenuItem的接口props类型定义
import { MenuItemProps } from './menuItem'


// 1. 定义自身组件的属性以及类型
export interface SubMenuProps {
  index?: number,
  title: string,
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  // 2. 解构所有接收的参数
  const { index, title, className, children } = props
  // 3. 引入上下文,拿到父组件中的值
  const context = useContext(MenuContext)
  // 12. 添加submenu是否打开的状态, 通过事件修改状态, 影响下拉菜单的展开或隐藏
  const [menuOpen, setMenuOpen] = useState(false)
  // 4. 整合class样式
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.activeIndex === index
  })

  // 13. 添加submenu的class, 这里的e的类型是React.MouseEvent
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }

  // 6. 处理渲染的下拉内容
  const renderChildren = () => {
    // 14. 增加下拉菜单显示与隐藏的类, 不能写死ux-submenu, 根据状态值的true or false 添加open状态
    const subMenuClasses = classNames('ux-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return child
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
    return (
      // 15. 替换掉写死的 ux-submenu => subMenuClasses
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
    )
  }

  // 5. 渲染DOM (li包裹着div作为标题)
  return (
    <li key={index} className={classes}>
      {/* 16. div这个地方添加click事件, 触发显示或隐藏的事件 */}
      <div className="submenu-title" onClick={handleClick}>
        {title}
      </div>
      {/* 下来菜单内容,依然不能使用children直接渲染submenu中的内容,因为依然要限制只有MenuItem, 使用renderChildren函数 */}
      {/* 8. 将处理好的children加入到组件中 */}
      {renderChildren()}
    </li>
  )
}

// 9. 增加displayName
SubMenu.displayName = "SubMenu"
export default SubMenu

// 10. 到App进行编写测试代码
// 11. 修改menu组件, 发现渲染renderChildren时没有显示下来菜单,  Menu组件中除了可以是MenuItem,还可以有SubMenu
```



#### 3. 水平菜单修改hover显示隐藏 16步开始

通过menu中的mode选项,是水平还是垂直, subMenu就可以进行判断。所以只能通过context上下文拿到menu中的mode

- 增加menu中的IMenuContext接口属性定义

```tsx
// 通过使用context, 将父组件传递给子组件的属性的接口定义
interface IMenuContext {
  activeIndex: number,
  onSelect?: SelectCallback,
  mode?: MenuMode // 可选的
}
```

- Menu组件中加入mode到menuContext中

```tsx
// 创建context需要的值
const contextValue: IMenuContext = {
    activeIndex: currentActive ? currentActive : 0,
    onSelect: handleSelect,
    mode,
}
```

- subMenu组件中 可以通过这个mode来判断水平还是垂直模式, 水平的就是hover
- 水平是hover触发显示隐藏, 垂直是点击

```tsx
import React, { useContext, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'   // 父组件的上下文
// 7. 引入MenuItem的接口props类型定义
import { MenuItemProps } from './menuItem'

// 1. 定义自身组件的属性以及类型
export interface SubMenuProps {
  index?: number,
  title: string,
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  // 2. 解构所有接收的参数
  const { index, title, className, children } = props
  // 3. 引入上下文,拿到父组件中的值
  const context = useContext(MenuContext)
  // 12. 添加submenu是否打开的状态, 通过事件修改状态, 影响下拉菜单的展开或隐藏
  const [menuOpen, setMenuOpen] = useState(false)
  // 4. 整合class样式
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.activeIndex === index
  })

  // 13. 添加submenu的class, 这里的e的类型是React.MouseEvent
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }

  // 18. 让打开更加平滑
  let timer: any

  // 17. 处理鼠标hover事件的函数 处理mouseEnter, mouseLeave这两个事件
  /**
   * 
   * @param e 事件
   * @param toggle: 让下拉菜单是打开还是关闭 
   */
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 300)
  }

  // 19. 不能把handleClick和handleMouse一股脑的直接传递给subMenu的元素上, clickEvents 给title对应的div; hoverEvents给外层的li
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  // 20. hover事件,不是垂直就是水平模式时
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
    onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false)
  } : {}

  // 6. 处理渲染的下拉内容
  const renderChildren = () => {
    // 14. 增加下拉菜单显示与隐藏的类, 不能写死ux-submenu, 根据状态值的true or false 添加open状态
    const subMenuClasses = classNames('ux-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return child
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
    return (
      // 15. 替换掉写死的 ux-submenu => subMenuClasses
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
    )
  }

  // 5. 渲染DOM (li包裹着div作为标题)
  return (
    // 21. hover事件传递给外层
    <li key={index} className={classes} {...hoverEvents}>
      {/* 16. div这个地方添加click事件, 触发显示或隐藏的事件 onClick={handleClick}*/}
      {/* 22. click事件传递给标题 */}
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {/* 下来菜单内容,依然不能使用children直接渲染submenu中的内容,因为依然要限制只有MenuItem, 使用renderChildren函数 */}
      {/* 8. 将处理好的children加入到组件中 */}
      {renderChildren()}
    </li>
  )
}

// 9. 增加displayName
SubMenu.displayName = "SubMenu"
export default SubMenu

// 10. 到App进行编写测试代码
// 11. 修改menu组件, 发现渲染renderChildren时没有显示下来菜单,  Menu组件中除了可以是MenuItem,还可以有SubMenu
```



改进:  mode=垂直时, 下拉的menuItem点击事件不能被触发。subMenu的renderChildren时, 渲染childElement的时候需要把index传递进去, 但是被外层的index占用了。外层就是主menu的index占用了。



## SVG

react-fontawesome