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