import MessageContainer from '../MessageContainer/MessageContainer';
import './Chat.css';

export function Chat() {
  return (
    <div className="chat">
      hiii
      <MessageContainer role="first" />
      <MessageContainer role="other" />
    </div>
  )
}