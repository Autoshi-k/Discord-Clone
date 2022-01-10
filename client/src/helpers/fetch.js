// import { login } from '../actions'

// export const userAuthentication = (isLogin) => {
//   (fetch('/api/channels', { 
//     method: 'GET', 
//     headers: {
//       "content-type": "application/json",
//       Authorization: localStorage.getItem("auth-token")
//     } })
//     .then(res => res.json()))
//     .then(data => { 
//       dispatch(login(data[0]));
//       if (isLogin) {
//         const objData = data[0];
//         localStorage.setItem('user-data', JSON.stringify({ id: objData.id, displayName: objData.username, tag: objData.tag }));
//         localStorage.setItem('email', objData.email);
//       }
//     })
//     .catch(err => console.log(err))
//   // .catch(err => console.log(err))
// }