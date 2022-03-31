import './Home.scss'

import { useEffect } from 'react';
import { reloadUser } from '../helpers/userAPI';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';

import { User } from '../interfaces/User';
import Feed from '../Feed';

function Home() {
  const user: User = useSelector((state: RootState) => state.user.value as User);
  const dispatch = useDispatch();

  // Reload User from cookie
  useEffect(() => {
    reloadUser(user);
    console.log(user);
  }, [dispatch, user]);
  
  return (
    <div className="Home">
      <Feed user={user}/>
    </div>
  )
};

export default Home;