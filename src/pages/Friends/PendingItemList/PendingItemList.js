import { Divider } from "@mui/material"
import StatusIcon from "../../../Utilities/StatusIcon";
import ActionButton from "../../../Utilities/ActionButton";
import { useSelector } from "react-redux";

const PendingItemList = ({ request }) => {
  const user = useSelector(state => state.user.value);

    return (
    <>
    <li className="friend-item-list">
      <StatusIcon 
        badge={true}
        currentStatus={request.statusId}
        alt={request.name}
        image={request.avatar}
      />
      <div className='content'>
        <div className='user-name'>{request.name} {request.friendId}<span>#{request.tag}</span></div>
        { !request.confirmed && <div>{`${request.initiateBy === user.id ? 'Outgoing' : 'Incoming'}`} Friend Request</div>}
      </div>
      <div className='actions'>
        { !request.confirmed ? <ActionButton clear={true} friendId={request.friendId} req={request} /> : <ActionButton chat={true} user={user} req={request} /> }
        { request.initiateBy !== user.id && <ActionButton check={true} friendId={request.friendId} req={request} /> }
      </div>
    </li>
      <Divider sx={{ color: '#40444B' }} />
      </>
  )
}

export default PendingItemList;