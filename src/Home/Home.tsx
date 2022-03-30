import { useEffect } from 'react';
import { getUserInfo } from '../helpers/userAPI';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { addUser } from '../features/userSlice';

import { User } from '../interfaces/User';

function Home() {
  const user: User = useSelector((state: RootState) => state.user.value as User);
  const dispatch = useDispatch();

  // Reload User from cookie
  useEffect(() => {
    const reloadUser = async () => {
      if (user._id === undefined) {
        let reloadUser = await getUserInfo();
        dispatch(addUser(reloadUser));
      }
    }
    reloadUser();
    console.log(user);
  }, [dispatch, user]);
  
  return (
    <div className="Home">
    </div>
  )
};

export default Home;