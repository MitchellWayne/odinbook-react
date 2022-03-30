import './Nav.scss'
import { useEffect } from 'react';
import { getUserInfo } from '../helpers/userAPI';

import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { addUser } from '../features/userSlice';

import { User } from '../interfaces/User';

import {ReactComponent as Profile} from '../icons/person_black_24dp.svg';

function Nav() {
  const user: User = useSelector((state: RootState) => state.user.value as User);
  const dispatch = useDispatch();

  // Reload User from cookie as needed
  useEffect(() => {
    const reloadUser = async () => {
      if (user._id === undefined) {
        let reloadUser = await getUserInfo();
        dispatch(addUser(reloadUser));
        console.log('Reloading user info');
      }
    }
    reloadUser();
    console.log(user);
  }, [dispatch, user]);

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