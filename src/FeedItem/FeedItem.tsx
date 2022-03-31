import './FeedItem.scss';

import {ReactComponent as Profile} from '../icons/person_black_24dp.svg';
import {ReactComponent as ThumbUp} from '../icons/thumb_up_black_24dp.svg';

import { Post } from '../interfaces/Post';

const he = require('he');

function FeedItem(props: any) {
  const post: Post = props.post;
  return (
    <div className="FeedItem">
      <div className="FeedItem__header">
        <span className="flexWrapper">
          {
            !props.profileItem ?
            <span>
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
    </div>
  )
}

export default FeedItem;