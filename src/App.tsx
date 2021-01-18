import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
function App() {
  return (
    <div>
      <Menu onSelect={(index) => console.log(index)} mode="vertical">
        <MenuItem >
          hello
        </MenuItem>
        <MenuItem disabled>
          disabled
        </MenuItem>
        <MenuItem >
          world
        </MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>
            产品
          </MenuItem>
          <MenuItem >
            区域
          </MenuItem>
        </SubMenu>
      </Menu>
      {/* <Button disabled>hello</Button>
      <Button onClick={e => console.log(e)} className="custom">CLICK</Button>
      <Button href="http://www.baidu.com" btnType={ButtonType.Link} target="_blank">hello</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>hello</Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Small}>world</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>hello</Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com">baidu</Button> */}
    </div>
  );
}

export default App;
