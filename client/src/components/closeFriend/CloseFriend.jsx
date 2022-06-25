import axios from "axios";
import "./closeFriend.css";
import {useState} from 'react';
export default function CloseFriend(user) {
  console.log(user)
  const [u, setUser] = useState(null);
  const [p, setpic] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const getUser = async () => {
    try {
      
      const res = await axios("/users?userId=" + user.user._id);
      setUser(res.data.username);
      setpic(res.data.profilePicture);
    } catch (err) {
      console.log(err);
    }
  };
  getUser();
  const kl={textDecoration:"none",color:"black"};
  return (
    <a href={"/profile/"+u} style={kl}>
    <li className="sidebarFriend">
    
    <img
                  src={
                    p
                      ? PF + p
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="sidebarFriendImg"
                />
      <span className="sidebarFriendName">{u}</span>
    </li>
    </a>
  );
}
