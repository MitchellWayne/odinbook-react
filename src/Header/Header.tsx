import './Header.scss';
import {ReactComponent as Profile} from '../icons/person_black_24dp.svg';

function Header() {
  return (
    <div className="Header">
      <a href="/#home" className="headerTextLogo">Odinbook</a>
      <div className="headerUtils">
        <button className="headerProfileOptions">
          <div className="profIconWrapper"><Profile className="profIcon"/></div>
        </button>
      </div>
    </div>
  )
}

export default Header;