import './Users.scss';
import { useEffect, useState } from 'react';
import { User } from '../../interfaces/User';

import {ReactComponent as Profile} from '../../icons/person_black_24dp.svg';

function Users(props: any) {
  const { user, setUi } = props;
  const [searchInput, setSearchInput] = useState('');
  const [userlist, setUserlist] = useState<User[]>([]);

  useEffect(() => {
    const findUsers = async () => {
      setUserlist([]);
      try {
        let response = 
          await fetch(`/users?namefilter=${searchInput.toLowerCase()}`, 
          {
            method: "GET",
            credentials: "include",
          });

        const parsedResponse = await response.json();
  
        if(response.status === 200) {
          parsedResponse.forEach((userObj: User) => {
            setUserlist((userlist) => [...userlist, userObj]);
          });
        } else {
          console.log("Error on GET users");
        }
      } catch {
        console.log("Error on try GET users");
      }

    };
    findUsers();
  }, [searchInput]);

  return (
    <div className="Users">
      <div className='Users__return'>
        <button onClick={() => {setUi('default')}}>Back</button>
      </div>
      <div className="Users__search">
        <input onChange={e => setSearchInput(e.target.value)} type="text" name="users" id="users" placeholder='Search for users'/>
      </div>
      <hr className="Users__separator"></hr>
      <ul className="Users__searchResults">
      {
        userlist.map((user: User, i) => {
          return (
            <li className="UserItem" key={i}>
              <span className="UserItem__primaryInfo">
                {
                  user.pfpURL ?
                  <div className="UserItem__pfp">
                    <img className="profileIcon profileIcon--pfp" alt="user pfp"
                      src={`/users/${user._id}/pfpS3/${user.pfpURL}`}>  
                    </img>
                  </div>
                  :
                  <div className="UserItem__pfp"><Profile className="profileIcon"/></div>
                }
                <div className="UserItem__fullname">
                  {`${user.firstname} ${user.lastname}`}
                </div>
              </span>
              {/* <span className="UserItem__secondaryInfo">
                {
                  !areFriends(props.user._id) && !reqExists(props.user._id) ?
                  <span>
                    <button className={uiadd} onClick={() => friendReq(props.user._id)}><AddFriend className="UserItem__add--Icon"/></button>
                    <div className={uireqstatus}>Request sent!</div>
                  </span>
                  :
                  null
                }
                {
                  !areFriends(props.user._id) && reqExists(props.user._id) ?
                  <div className="UserItem__reqStatus">Request pending...</div>
                  :
                  null
                }
              </span> */}
            </li>
          )
        })
      }
      </ul>
    </div>
  )
}

export default Users;