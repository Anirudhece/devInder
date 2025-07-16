import { callRequestSendApi } from "@/api_handlers/request";
import { removeUserFromfeed } from "@/lib/features/feeds/feedSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ feed }) => {
  const dispatch = useDispatch();

  const { firstName, lastName, photoUrl, age, gender, about } = feed;

  const handleSendRequest = async (status: string) => {
    try {
      const sendRequest = await callRequestSendApi(status, feed._id);

      if (!sendRequest.success) {
        throw new Error(`sendRequest Failed.`);
      }

      dispatch(removeUserFromfeed(sendRequest.data.toUserId));
    } catch (error) {
      console.log(`error in sendRequest ❗️ : `, error);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-lg">
      <figure>
        <img
          src={
            photoUrl ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd6fmlVq4miD1EDbbneFGhfZmqOKEODX5mwk14WnkqBoBcsclU99QVhpTGri8wpY1Mc-M&usqp=CAU"
          }
          alt="profileImage"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <span>
          {age} {gender}
        </span>
        <p>{about}</p>
        <div className="card-actions justify-between mt-4">
          <button
            onClick={() => handleSendRequest("ignored")}
            className="btn btn-primary"
          >
            Ignore
          </button>{" "}
          <button
            onClick={() => handleSendRequest("interested")}
            className="btn btn-secondary "
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
