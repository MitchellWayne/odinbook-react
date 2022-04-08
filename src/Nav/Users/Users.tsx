import './Users.scss';

function Users(props: any) {
  const { user, setUi } = props;
  return (
    <div className="Users">
      <button onClick={() => {setUi('default')}}>Back</button>
    </div>
  )
}

export default Users;