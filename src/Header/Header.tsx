import './Header.scss';
import { useState } from 'react';

import {ReactComponent as Profile} from '../icons/person_black_24dp.svg';

import Nav from '../Nav';

function Header() {
  const [navToggled, setNavToggled] = useState(false);

  return (
    <>
      <div className="Header">
        <a href="/#/home" className="headerTextLogo">Odinbook</a>
        <div className="headerUtils">
          <button className="headerNavToggle" onClick={() => {setNavToggled(!navToggled)}}>
            <div className="profIconWrapper"><Profile className="profIcon"/></div>
          </button>
        </div>
      </div>
      {
        navToggled ?
        <Nav />
        :
        null
      }
    </>
  )
}

export default Header;