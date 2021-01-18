import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
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
  activeIndex: number,
  onSelect?: SelectCallback,
  mode?: MenuMode         // 可选的
}

export const MenuContext = createContext<IMenuContext>({ activeIndex: 0 })

const Menu: React.FC<MenuProps> = props => {
  const { defaultIndex, className, mode, style, onSelect, children } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('ux-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'      // 增加submenu的样式考虑
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
    activeIndex: currentActive ? currentActive : 0,
    onSelect: handleSelect,
    mode,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      // childElement.type.displayName
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index
        })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={contextValue}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'vertical'
}
export default Menu