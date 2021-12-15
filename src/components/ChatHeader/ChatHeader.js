// import './ChatHeader.css';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Divider } from '@mui/material';


function ChatHeader() {
  return (
    <>
      <div className="chat-header">
        <DeleteOutlinedIcon sx={{ fontSize: 30 }} />
        <div>Shani</div>
        <div>status</div>
      </div>
      <Divider />
    </>
  )
}

export default ChatHeader;