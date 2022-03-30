import './Nav.scss'

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

import { User } from '../interfaces/User';

import {ReactComponent as Profile} from '../icons/person_black_24dp.svg';

function Nav() {
  const user: User = useSelector((state: RootState) => state.user.value as User);

  return (
    <div className="Nav">
      <span>
        {
          user.pfpURL ?
          <img className="profPicContainer" alt="user pfp"
            src={`/users/${user._id}/pfpS3/${user.pfpURL}`}>
          </img>
          :
          <div className="profPicContainer"><Profile className="profPic"/></div>
        }
        <ul className="optionList">
          <li>
            <Link
              className="option"
              to="/profile">
              My Profile
            </Link>
          </li>
          <li><button className="option" >Friends</button></li>
          <li><a className="option" href="/#/post">Create Post</a></li>
          <li><a className="option" href="/#/users">Find Users</a></li>
          <li><button className="option">Log Out</button></li>
        </ul>
      </span>
    </div>
  )
}

export default Nav;