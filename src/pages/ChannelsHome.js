import React, { Component, useEffect, useState } from 'react';
import './ChannelsHome.css';
import ServerBar from '../components/ServerBar/ServerBar';
import DirectMessages from '../components/DirectMessages/DirectMessages';
import 'semantic-ui-css/semantic.min.css';
// import { Redirect } from "react-router";
import { Navigate } from 'react-router-dom';
import { render } from '@testing-library/react';


const isAuth = () => {
  return fetch('/api/user')
  .then(res => res.json())
  .then(data => data)
  .catch(err => console.log(err))
}

// class IsAuth {
//   constructor() {
//     super();

  
//   }
  
// }

class ChannelsHome extends React.Component {
  
  constructor(props) {
    super(props);
    
  }
  render() {
    const { name } = this.props;
    return (
      <div className="home-page">
        <>
          <ServerBar />
          <div></div>
          <DirectMessages />
        </>
       </div>
    );
 }
}

export default ChannelsHome;


// class ChannelsHome extends Component {
// // function ChannelsHome() {

//   // const [is_auth, setIs_auth] = useState('');
//   // const [isAuthChecked, setIsAuthChecked] = useState('');
  
//   // useEffect( () => {
//   // }, [])
  
// //   componentWillMount() {
// //     async function fetchUser() {
// //       setIs_auth(await isAuth());
// //       console.log('1');
// //     }
// //     fetchUser();
// // }

//   // useEffect(() => {
//   //   setIsAuthChecked(true);
//   // }, [is_auth]);

//   // const loggedIn = () => {
//   //   if (!is_auth) {
//   //     return true
//   //   } 
//   //   return false;
//       // <Navigate to="/login" />
//       // :
//       // <div className="home-page">
//       //     <>
//       //       <ServerBar />
//       //       <div></div>
//       //       <DirectMessages />
//       //     </>
//       // </div>
//   }

//   // console.log('fff', is_auth);
//   render() {
//     const x;

//     return (
//       <>
//       {console.log(2)}
//       { is_auth ?
//       <div className="home-page">
//            <>
//              <ServerBar />
//              <div></div>
//              <DirectMessages />
//            </>
//        </div>
//       : <Navigate to="/login" />
//        }
//       </>
//     );
//   }
// }

// export default ChannelsHome;
