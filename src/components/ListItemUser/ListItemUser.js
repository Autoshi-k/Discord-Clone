import { Avatar, ListItemText } from "@mui/material";
import { PeopleAltIcon } from '@mui/icons-material/PeopleAlt';
import './ListItemUser.css';

export function ListItemUser({ name, image, size }) {
  const sizeAvatar = size ? size : 30;
  return (
    <div className="list-item-user">

      
      {image === 'PeopleAltIcon' ? 
      <PeopleAltIcon />
      :
      <Avatar sx={{ height: sizeAvatar, width: sizeAvatar }}>
        <img src={ image } alt="discord" height="40" />
      </Avatar>
    }
      
      <div className="user-name">{ name }</div>
    </div>
  )
}