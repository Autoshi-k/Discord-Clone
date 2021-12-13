import { Avatar, ListItemText } from "@mui/material";
import './ListItemUser.css';

export function ListItemUser({ name, image }) {
  return (
    <div className="list-item-user">
      <Avatar sx={{ height: 30, width: 30 }}>
        <img src={ image } alt="discord" height="40" />
      </Avatar>
      <div className="user-name">{ name }</div>
    </div>
  )
}