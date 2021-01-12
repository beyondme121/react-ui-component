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