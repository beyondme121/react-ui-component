import React from 'react'
import { render, RenderResult } from '@testing-library/react'

import Menu, { MenuProps } from './menu'
import MenuItem, { MenuItemProps } from './menuItem'

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
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
      <MenuItem index={2}>xyz</MenuItem>
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

  })
  it('1. 给定默认的参数渲染正确的Menu和Item', () => { })

  it('2. 点击item切换激活index 并且 调用正确的回调函数', () => { })

  it('veritcal模式渲染正确的class', () => { })
})
