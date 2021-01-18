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
      <MenuItem >active</MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>xyz</MenuItem>
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
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    // 测试disabled element, 点击后, 样式没有is-active, onSelect回调没有被调用
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })

  it('veritcal模式渲染正确的class', () => {
    cleanup()
    const wrapper = render(genMenu(testVerticalProps))
    const ele = wrapper.getByTestId('test-menu')
    expect(ele).toHaveClass('menu-vertical')
  })
})
