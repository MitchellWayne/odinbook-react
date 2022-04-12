import './Profile.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useLocation } from 'react-router-dom';

import { User } from '../interfaces/User';
import { Post } from '../interfaces/Post';

type LocationState = { id: string };

function Profile(props: any) {
  const user: User = useSelector((state: RootState) => state.user.value as User);
  const nav: boolean = useSelector((state: RootState) => state.nav.value);

  // id holds target user._id
  const location = useLocation();
  const { id } = location.state as LocationState;

  const [postList, setPostList] = useState<Post[]>([]);
  const [targetUser, setTargetUser] = useState<User>();

  useEffect(() => {
    console.log(id);
  }, [id])

  useEffect(() => {
    const populateFeedList = async () => {      
      if (id !== null) {
        setPostList([]);
        try {
          let response = await fetch(`/users/${id}/posts`, {
            method: "GET",
            credentials: "include",
          });

          const userPostList = await response.json();
          userPostList.forEach((postObj: Post) => {
            setPostList((postList) => [...postList, postObj]
            .sort(function(a,b){
              return new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf();
            }));
          });
        } catch (err){
          console.log("Failed to get postlist by userID")
        }
      }
    };  

    const getUserInfo = async () => {
      try {
        let response = await fetch(`/users/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const parsedResponse = await response.json();
  
        if(response.status === 200) {
          setTargetUser(parsedResponse);
        } else {
          console.log("Error on GET by user id")
        }
      } catch {
        console.log("Error on GET by user id block")
      }
    };

    populateFeedList();
    getUserInfo();
  }, [id]);

  useEffect(() => {
    console.log(targetUser);
    console.log(postList);
  }, [postList, targetUser]);

  
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