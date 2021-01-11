import React from 'react'

interface IThemeProps {
  [key: string]: {
    color: string,
    background: string
  }
}
// 主题的配置
export const theme: IThemeProps = {
  'light': {
    color: '#000',
    background: '#eee'
  },
  'dark': {
    color: '#fff',
    background: '#222'
  }
}

// 创建全局context, 以便外面使用
export const ThemeContext = React.createContext(theme.light)