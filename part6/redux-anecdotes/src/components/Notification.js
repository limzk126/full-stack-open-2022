import { useSelector, useDispatch } from 'react-redux';

const Notification = () => {
  const notifcation = useSelector(state => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notifcation.content}
    </div>
  )
}

export default Notification