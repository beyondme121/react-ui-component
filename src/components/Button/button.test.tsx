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