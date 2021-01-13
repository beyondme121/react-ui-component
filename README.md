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

