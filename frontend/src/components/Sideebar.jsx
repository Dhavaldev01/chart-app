import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import { useSelector , useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";

const Sideebar = () => {

  const [search , setSerch] = useState('');
  const {otherUsers} = useSelector(store=>store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const logoutHandler = async() =>{
    try {
      const res  = await axios.get('http://localhost:3000/api/v1/user/logout');
      // console.log(res.data);
      navigate("/login")
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setMessages(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));
    } catch (error) {  
      console.log(error);
    }
  }

  const searchSubmitHandler = (e) =>{
    e.preventDefault();
      // alert(search)
      const conversationUser = otherUsers?.find((user) =>user.fullname.toLowerCase().includes(search.toLowerCase()));
      if(conversationUser){
        dispatch(setOtherUsers([conversationUser]));
      } else{
        toast.error("User not found");
      }
  }

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form onSubmit={searchSubmitHandler} action=" " className="flex items-center gap-2">
        <input
        value={search}
        onChange={(e)=>{setSerch(e.target.value)}}
          className="input input-bordered rounded-md"
          type="text"
          placeholder="search.."
        />
        <button type="submit" className="btn  bg-slate-500 text-white">
            <FiSearch className="w-6 h-6 outline-none"/>
            </button>
      </form>
      <div className="divider px-3"></div>
    <OtherUsers/>
    <div className="mt-2">
        <button onClick ={logoutHandler}className="btn btn-sm">Logout</button>
    </div>
    
    </div>
  );
};

export default Sideebar;
