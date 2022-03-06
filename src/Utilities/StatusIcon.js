import { Avatar, Badge } from "@mui/material";

const StatusIcon = ({badge, currentStatus, image, alt}) => {
  const mapStatus = ['offline', 'online', 'idle', 'notDisturb'];
  return (
    <>
    {
      badge ? 
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <div className='icon-backgound'>
            <div className={`icon ${mapStatus[currentStatus]}`}></div>
          </div>
        }
      >
        <Avatar sx={{ height: 32, width: 32 }} src={image} alt={ alt } />
      </Badge>
      :
      <div className={`icon ${mapStatus[currentStatus]}`}></div>
    }
      
    </>
  )
}

export default StatusIcon;