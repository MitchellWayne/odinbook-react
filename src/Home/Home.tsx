import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

function Home() {
  const user = useSelector((state: RootState) => state.user.value)

  useEffect(() => {
    console.log(user);
  }, [user])
  
  return (
    <div className="Home">
    </div>
  )
};

export default Home;