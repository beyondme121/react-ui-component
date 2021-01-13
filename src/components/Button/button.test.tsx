import React from 'react'
import { render } from '@testing-library/react'
import Button from './button'

test("our first react test", () => {
  const wrapper = render(<Button>Nice</Button>)
  const element = wrapper.queryByText('Nice')
  expect(element).toBeTruthy()
  // 断言元素是否出现在文档中
  expect(element).toBeInTheDocument()
})

// 对button组件进行分类
describe('test Button component', () => {
  it('should render the corrent default button', () => {
    const wrapper = render(<Button>Nice</Button>)
    const element = wrapper.queryByText('Nice')  //  HTMLElement | null  => 返回值类型 可能是null
  })
  it('should render the corrent component based on different props', () => {

  })
  it('should render a link when btnType equals link and href is provided', () => {

  })
  it('should render disabled button when disabled set to true', () => {

  })
})