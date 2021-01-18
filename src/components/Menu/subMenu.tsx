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
  // 20. hover事件
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