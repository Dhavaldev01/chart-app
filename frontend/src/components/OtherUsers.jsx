import OrtherUser from "./OrtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  // my custom hook
  useGetOtherUsers();

  const { otherUsers } = useSelector((store) => store.user);

  if (!otherUsers) return;

  return (
    <div className="overflow-auto flex-1">
      {otherUsers?.map((user) => {
        return <OrtherUser key={user._id} user={user} />;
      })}
    </div>
  );
};

export default OtherUsers;
