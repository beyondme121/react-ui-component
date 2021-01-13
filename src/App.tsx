import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

function App() {
  return (
    <div>
      <Menu onSelect={(index) => console.log(index)} mode="vertical">
        <MenuItem index={0}>
          hello
        </MenuItem>
        <MenuItem index={2} disabled>
          disabled
        </MenuItem>
        <MenuItem index={1}>
          world
        </MenuItem>
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
