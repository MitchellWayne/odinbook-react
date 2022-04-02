import './FeedItem.scss';

import {ReactComponent as Profile} from '../icons/person_black_24dp.svg';
import {ReactComponent as ThumbUp} from '../icons/thumb_up_black_24dp.svg';

import { Post } from '../interfaces/Post';
import { User } from '../interfaces/User';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../app/store';

const he = require('he');

function FeedItem(props: any) {
  const user: User = useSelector((state: RootState) => state.user.value as User);
  const post: Post = props.post;

  const [likeClass, setLikeClass] = useState("");

  const handleLike = async () => {
    if (!post.likes.includes(user._id)) {
      // Handle adding like
      try {
        let response = await fetch(`/users/${user._id}/posts/${post._id}/like`, {
          method: "POST",
          credentials: "include",
        });
  
        if(response.status === 200) {
          props.post.likes.push(user._id);
          setLikeClass("ThumbUp__container ThumbUp__container--liked");
          console.log("Successfully liked post");
        } else {
          console.log("Error on post like POST");
        }
      } catch {
        console.log("Error on try post like POST");
      }
    } 
    // Handle removing like
    else {
      try {
        let response = await fetch(`/users/${user._id}/posts/${props.post._id}/like`, {
          method: "DELETE",
          credentials: "include",
        });
  
        if(response.status === 200) {
          props.post.likes.splice(props.post.likes.indexOf(user._id), 1)
          setLikeClass("ThumbUp__container");
          console.log("Successfully unliked post");
        } else {
          console.log("Error on post like DELETE");
        }
      } catch {
        console.log("Error on try post like DELETE");
      }
    }
  };

  useEffect(() => {
    let calcClass = post.likes.includes(user._id) ? "ThumbUp__container ThumbUp__container--liked" : "ThumbUp__container";
    setLikeClass(calcClass);
  }, [post.likes, user._id]);

  return (
    <div className="FeedItem">
      <div className="FeedItem__header">
        <span className="flexWrapper">
          {
            !props.profileItem ?
            <span className="iconWrapper">
              {
                post.pfpURL ?
                <div className="FeedItem__profIcon">
                  <img
                    className="FeedItem__icon FeedItem__icon--pfp"
                    alt="user pfp"
                    src={`/users/${post.author}/pfpS3/${post.pfpURL}`}
                  />
                </div>
                :
                <Profile className="FeedItem__icon"/>
              }
            </span>
            :
            null
          }
          <div className="FeedItem__author">{post.authorString}</div>
        </span>
        {/* <span className="flexWrapper">
          {
            currentUserIsTarget ?
            <button className="EditItem__editBtn" onClick={deletePost}>Delete</button>
            :
            null
          }
          {
            currentUserIsTarget ?
            <span>
            {
              !editing ?
              <button className="EditItem__editBtn" onClick={toggleEdit}>Edit</button>
              :
              <button className="EditItem__editBtn" onClick={updatePost}>Done Editing</button>
            }
            </span>
            :
            null
          }
          <div className="FeedItem__timestamp">
            {new Date(props.post.timestamp).toLocaleDateString("en-US",
            { hour: '2-digit',
              hour12: 'true',
              minute: '2-digit',
            })}
            </div>
        </span> */}
      </div>
      <span>
        <div className="FeedItem__title">{he.decode(post.title)}</div>
        <div className="FeedItem__text">
          {he.decode(post.text)}
        </div>
      </span>
      {
        post.imgURL ?
        <div className="FeedItem__imgContainer">
          <img className={`FeedItem__img`} alt="associated post file preview"
            src={`/users/${post.author}/posts/${post._id}/imgS3/${post.imgURL}`}>
          </img>
        </div>
        :
        null
      }
      <div className="FeedItem__stats">
        <div className="FeedItem__likes">
          <button onClick={handleLike} className={likeClass}><ThumbUp className="ThumbUp__svg"/></button>
          {
            props.post.likes.length > 0 ?
            <span className="FeedItem__likeCount"> +{props.post.likes.length} Likes </span>
            :
            null
          }
        </div>
        <div className="FeedItem__isEdited"></div>
      </div>
    </div>
  )
}

export default FeedItem;