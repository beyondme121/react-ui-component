import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
function App() {
  return (
    <div>
      <Button disabled>hello</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>hello</Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com">baidu</Button>
    </div>
  );
}

export default App;
