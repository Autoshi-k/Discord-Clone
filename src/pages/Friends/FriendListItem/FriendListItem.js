import { Divider } from "@mui/material"
import StatusIcon from "../../../Utilities/StatusIcon";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useContext } from "react";
import { SocketContext } from "../../../context/socket";
import { useSelector } from "react-redux";

const PendingItemList = ({ request, pending }) => {
  const user = useSelector(state => state.user.value);

  const socket = useContext(SocketContext);
  
  const chatBtn = () => {
    socket.emit('remove friend request', { requestId: [user.id, request.id] });
  }
  
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
        <div className='user-name'>{request.name}<span>#{request.tag}djkskfjdk</span></div>
      </div>
      <div className='actions'>
        <div className='negative' onClick={() => chatBtn()}>
          <ChatBubbleIcon />
        </div>
      </div>
    </li>
      <Divider sx={{ color: '#40444B' }} />
      </>
  )
}

export default PendingItemList;