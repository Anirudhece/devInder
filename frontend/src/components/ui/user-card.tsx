const UserCard = ({ feed }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = feed;
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
            <button className="btn btn-primary">Ignore</button>{" "}
            <button className="btn btn-secondary ">Interested</button>
          </div>
        </div>
      </div>
  );
};

export default UserCard;
