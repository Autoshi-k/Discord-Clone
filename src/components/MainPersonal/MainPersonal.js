import { Chat } from "../Chat/Chat";
import { Sidebar } from "../Sidebar/Sidebar";
import './MainPersonal.css'

export function MainPersonal() {
  return (
  <div className="main-personal">
    <Sidebar />
    <Chat />
  </div>
  )
}

export default MainPersonal;