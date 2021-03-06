import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {useReducer } from 'react';
import Reducers from '../../context/AuthReducer';
export default function Topbar() {
  
 
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(Reducers, {
    user:user,
    isFetching: false,
    error: false,
  });
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ReConnect</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="topbarLink" style={{color:"white"}}>Homepage</span>
          </Link>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem"  style={{color:"white"}}>
          <Link to="/messenger" style={{ textDecoration: "none" }}>
            <Chat />
            <span className="topbarIconBadge">2</span>
            </Link>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarLinks">
            <Link to="/logout" style={{ textDecoration: "none" }}>
              <span className="topbarLink" style={{color:"white"}} onClick={()=>{
                dispatch({type:"LOGIN_START"});
                state.user=null;
                console.log(user);
              }}>Logout</span>
            </Link>
        </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
