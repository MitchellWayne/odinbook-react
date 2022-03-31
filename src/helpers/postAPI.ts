import { Post } from "../interfaces/Post";
import { User } from "../interfaces/User";

export const populateFeedList = async (user: User) => {
  let populatedFeed: Post[] = [];
  if (user && user.friends) {
    user.friends.concat(user._id).forEach(async (userID) => {
      try {
        let response = await fetch(`/users/${userID}/posts`, {
          method: "GET",
          credentials: "include",
        });
        const postList = await response.json();
        postList.forEach((postObj: Post) => {
          populatedFeed.push(postObj);
          populatedFeed.sort(function(a,b){
            return new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf();
          });
        });
      } catch (err){
        console.log("Failed to get postlist by friendID")
      }
    });
  }
  return populatedFeed;
}