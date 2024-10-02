import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";


const SendInput = () => {

  const [message, setMessage] = useState("");  
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const {messages} = useSelector(store =>store.message);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // console.log(message)
      // console.log(res);
      // dispatch(setMessages([...messages , , res.data.newMessage] ))
      dispatch(setMessages([...messages , res.data.newMessage]));

    } catch (error) {
      console.log(error);
    } 
    // alert(meassage);
    setMessage("");
  };
  return (
    <form onSubmit={onSubmitHandler} className="px-4 my-3" action="">
      <div className="w-full relative">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Send A meassage ..."
          className="border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="absolute flex inset-y-0 end-0 items-center pr-4"
        >
          <IoMdSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
