import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
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
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    // 应该还有一个is-active, 是否被激活, 应该由父组件传递过来
    'is-active': context.activeIndex === index
  })
  // 定义什么情况下子组件调用父组件的方法
  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === 'number') {
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
MenuItem.displayName = 'MenuItem'

export default MenuItem