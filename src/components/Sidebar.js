import SidebarUserInfo from "./SidebarUserInfo/SidebarUserInfo";

export function Sidebar({ children }) {
  return (
    <div className="sidebar">
      { children }
      <SidebarUserInfo />
    </div>
  )
}