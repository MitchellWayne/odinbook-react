import './Profile.scss';
import { reloadUser } from '../helpers/userAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

import { User } from '../interfaces/User';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type LocationState = { id: string };

function Profile(props: any) {
  const user: User = useSelector((state: RootState) => state.user.value as User);
  const nav: boolean = useSelector((state: RootState) => state.nav.value);

  const location = useLocation();
  const { id } = location.state as LocationState;
  // const [targetUser, setTargetUser] = useState(null); // We fetch target user id from navigate state
  const [postList, setPostList] = useState([]);
  const [userpfp, setUserpfp] = useState(null);
  const [userabout, setUserabout] = useState(null);

  useEffect(() => {
    console.log(id);
  }, [id])

  
  return (
    <div className="Profile">
      {/* <div className={`UserInfo ${nav ? "UserInfo--hidden" : ""}`}>
        <div className="UserInfo__profIcon">
          {
            userpfp ? 
            // <img className="UserInfo__icon UserInfo__icon--pfp" alt="user pfp" src={userpfp}></img>
            <label htmlFor="pfpupload">
              <img className={`UserInfo__icon ${currentUserIsTarget ? 'UserInfo__icon--pfp' : ""}`} alt="user pfp" src={userpfp}></img>
              {
                currentUserIsTarget ? 
                <input className="UserInfo__pfpUpload" type="file" id="pfpupload" 
                  accept=".jpeg, .jpg, .png"
                  onChange={e => handlePfpUpload(e)}
                />
                :
                null
              } 
            </label>
            :
            <label htmlFor="pfpupload">
              <Profile className={`UserInfo__icon ${currentUserIsTarget ? 'UserInfo__icon--pfp' : ""}`}/>
              {
                currentUserIsTarget ? 
                <input className="UserInfo__pfpUpload" type="file" id="pfpupload" 
                  accept=".jpeg, .jpg, .png"
                  onChange={e => handlePfpUpload(e)}
                />
                :
                null
              } 
            </label>
          }
        </div>
        <div className="UserInfo__about">
          {
            !editingabout ?
            <span>
              {
                user ?
                <span>{userabout ? userabout : "No additional information about this user."}</span>
                :
                <span>
                  No additional information about this user.
                </span>
              }
            </span>
            :
            <span>
              <textarea className="UserInfo__about--editing" value={userabout} onChange={e => setUserabout(e.target.value)}></textarea>
            </span>
          }    
          {
            currentUserIsTarget ? 
            <span>
              <hr className="separator"></hr>
                { 
                  editingabout ?
                  <button className="UserInfo__editBtn" onClick={handleUpdateAbout}>Finish editing</button>
                  :
                  <button className="UserInfo__editBtn" onClick={toggleEditingabout}>Edit About</button>
                }
            </span>
            :
            null
          }
        </div>
      </div>

      <div className={`FeedList ${optionsToggled ? "" : "FeedList--profile"}`}>
        {
          postList ?
          postList.map((item, i) =>
            <FeedItem 
              key={item._id}
              post={item}
              editing={true}
              currentUserIsTarget={currentUserIsTarget}
              profileItem={true}
            />
          )
          :
          null
        }
      </div> */}
    </div>
  )
}

export default Profile;