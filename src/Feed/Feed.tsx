import './Feed.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

import FeedItem from '../FeedItem';
import { Post } from '../interfaces/Post';

function Feed (props: any) {
  const nav: boolean = useSelector((state: RootState) => state.nav.value);
  const { user } = props;
  const [feed, setFeed] = useState<Post[]>([]);

  // Load Feed Content via User & Friends Post lists
  useEffect(() => {
    const getFeed = async () => {
      setFeed([]);
      if (user && user.friends) {
        const users = user.friends.concat(user._id);
        users.forEach( async (userID: string) => {
          try {
            let response = await fetch(`/users/${userID}/posts`, {
              method: "GET",
              credentials: "include",
            });
            const postList = await response.json();
            postList.forEach((postObj: Post) => {
              setFeed((feed) => [...feed, postObj]
              .sort(function(a,b){
                return new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf();
              }));
            });
          } catch (err){
            console.log("Failed to get postlist by friendID");
          }
        });
      }
    }
    getFeed()
  }, [user]);

  return (
    <div className={`Feed ${nav ? 'Feed--navActive' : ''}`}>
      <div className="feedList">
      {
        feed && feed.length > 0 ?
        feed.map((post: Post) =>
        <FeedItem
          key={post._id}
          userid={user._id}
          post={post}
        />
        )
        :
        null

      }
      </div>
    </div>
  )
}

export default Feed;