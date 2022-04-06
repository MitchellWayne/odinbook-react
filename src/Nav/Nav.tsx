import './Nav.scss'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

import Main from './Main';
import { User } from '../interfaces/User';

function Nav() {
  const user: User = useSelector((state: RootState) => state.user.value as User);
  const [uiSelector, setUiSelector] = useState('default');

  return (
    <div className="Nav">
      <Main user={user}/>
    </div>
  )
}

export default Nav;