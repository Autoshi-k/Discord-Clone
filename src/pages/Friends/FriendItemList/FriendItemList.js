import { Divider } from "@mui/material"
import StatusIcon from "../../../Utilities/StatusIcon";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useContext } from "react";
import { SocketContext } from "../../../context/socket";
import { useSelector } from "react-redux";

const FriendItemList = ({isSender, request}) => {
  const user = useSelector(state => state.user.value);

  const socket = useContext(SocketContext);
  const ignoreBtn = () => {
    socket.emit('remove friend request', { requestId: [user.id, request.id] });
  }
  
  const addBtn = () => {
    socket.emit('remove friend request', { requestId: [user.id, request.id] });
    socket.emit('accept friend request', { requestId: [user.id, request.id] });
  }
  console.log(request);
  return (
    <>
    <li className="friend-item-list">
      <StatusIcon 
        badge={true}
        currentStatus={request.statusId}
        alt={request.name}
        image={request.image}
      />
      <div className='content'>
        <div className='user-name'>{request.name}<span>#{request.tag}</span></div>
        <div>{request.direction} Friend Request</div>
      </div>
      <div className='actions'>
        <div className='negative' onClick={() => ignoreBtn()}>
          <ClearIcon />
        </div>
        { 
          request.direction === 'incoming' &&
          <div className='positive' onClick={() => addBtn()}>
            <CheckIcon />
          </div>
        }
      </div>
    </li>
      <Divider sx={{ color: '#40444B' }} />
      </>
  )
}

export default FriendItemList;