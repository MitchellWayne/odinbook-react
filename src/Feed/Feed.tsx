import { useEffect, useState } from 'react';
import { populateFeedList } from '../helpers/postAPI';
import { Post } from '../interfaces/Post';
import './Feed.scss';

function Feed (props: any) {
  const { user } = props;
  const [feed, setFeed] = useState<Post[]>([]);

  useEffect(() => {
    const getFeed = async () => {
      if (user) {
        let tempFeed = await populateFeedList(user);
        setFeed(tempFeed);
      }
    }
    getFeed()
  }, [user]);

  // useEffect(() => {
  //   console.log(feed);
  // }, [feed]);

  return (
    <div className="Feed">
      {user._id}
    </div>
  )
}

export default Feed;