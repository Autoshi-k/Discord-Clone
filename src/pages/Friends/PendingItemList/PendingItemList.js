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
        image={request.image}
      />
      <div className='content'>
        <div className='user-name'>{request.name}<span>#{request.tag}</span></div>
        { request.direction && <div>{request.direction} Friend Request</div>}
      </div>
      <div className='actions'>
        { request.direction ? <ActionButton clear={true} user={user} req={request} /> : <ActionButton chat={true} user={user} req={request} /> }
        { request.direction === 'incoming' && <ActionButton check={true} user={user} req={request} /> }
      </div>
    </li>
      <Divider sx={{ color: '#40444B' }} />
      </>
  )
}

export default PendingItemList;