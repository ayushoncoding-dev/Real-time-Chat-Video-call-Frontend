import { Link } from "react-router-dom";
import { LANGUAGE_TO_FLAG } from "../constants";


const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow w-full max-w-sm sm:max-w-md mx-auto">
  <div className="card-body p-3 sm:p-4">
    {/* USER INFO */}
    <div className="flex items-center gap-3 mb-3 flex-wrap sm:flex-nowrap text-center sm:text-left">
      <div className="avatar size-12 mx-auto sm:mx-0">
        <img
          src={friend.profilePic}
          alt={friend.fullName}
          className="rounded-full object-cover w-12 h-12"
        />
      </div>
      <h3 className="font-semibold truncate w-full sm:w-auto">
        {friend.fullName}
      </h3>
    </div>

    {/* BADGES */}
    <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-3">
      <span className="badge badge-secondary text-xs flex items-center gap-1">
        {getLanguageFlag(friend.nativeLanguage)}
        <span>Native: {friend.nativeLanguage}</span>
      </span>
      <span className="badge badge-outline text-xs flex items-center gap-1">
        {getLanguageFlag(friend.learningLanguage)}
        <span>Learning: {friend.learningLanguage}</span>
      </span>
    </div>

    {/* MESSAGE BUTTON */}
    <Link
      to={`/chat/${friend._id}`}
      className="btn btn-outline w-full text-sm sm:text-base"
    >
      Message
    </Link>
  </div>
</div>

  );
};
export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}