## 组件库笔记

## 代码结构和代码检查

- create-react-app 自带的 eslint 包含了代码检查功能 如使用===进行比较, 有问题！！

```js
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ]
}
```

### 样式解决方案分析

- inline css
- CSS-in-JS (style-component)
- Sass/Less antd

### 创建组件库的色彩体系

系统色板: 基础色版 + 中性色板
基础色版: `http://zhongguose.com/`
中性色板: antd 组件中的黑白灰

产品色板: 品牌色 +

品牌色: primary color + second color + 辅助色

creat-react-app 天生不支持 sass 的, 需要添加 node-sass
`yarn add node-sass`

## 定义色彩体系使用的变量

其中!default 表示如果用户对变量进行了赋值, scss 就不会将用户的变量的值对这里面的变量赋值了

- \_varibales.scss

```scss
// 中性色
$white: #fff !default;
$gray-100: #f8f9fa !default;
$gray-200: #e9ecef !default;
$gray-300: #dee2e6 !default;
$gray-400: #ced4da !default;
$gray-500: #adb5bd !default;
$gray-600: #6c757d !default;
$gray-700: #495057 !default;
$gray-800: #343a40 !default;
$gray-900: #212529 !default;
$black: #000 !default;

// 基础色
$blue: #0d6efd !default;
$indigo: #6610f2 !default;
$purple: #6f42c1 !default;
$pink: #d63384 !default;
$red: #dc3545 !default;
$orange: #fd7e14 !default;
$yellow: #fadb14 !default;
$green: #52c41a !default;
$teal: #20c997 !default;
$cyan: #17a2b8 !default;

// 系统色
$primary: $blue !default;
$secondary: $gray-600 !default;
$success: $green !default;
$info: $cyan !default;
$warning: $yellow !default;
$danger: $red !default;
$light: $gray-100 !default;
$dark: $gray-800 !default;
```

### 组件库样式变量分类
