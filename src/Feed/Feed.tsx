import './Feed.scss';

import { useEffect, useState } from 'react';

import FeedItem from '../FeedItem';

import { Post } from '../interfaces/Post';

function Feed (props: any) {
  const { user } = props;
  const [feed, setFeed] = useState<Post[]>([]);

  // Load Feed Content via User & Friends Post lists
  useEffect(() => {
    const getFeed = async () => {
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

  // useEffect(() => {
  //   // console.log(Array.isArray(feed));
  //   // console.log(feed.length);
  //   console.log(feed);
  // },[feed])

  return (
    <div className="Feed">
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