import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  profileThunk,
  logoutThunk,
  updateUserThunk,
} from "../services/users/users-thunks";
import { useNavigate, useParams } from "react-router";
import { findLikesByUserId } from "../art/likes-service";
import { findUserById } from "../services/users/users-service";
import {
  userFollowsUser,
  findFollowsByFollowerId,
  findFollowsByFollowedId,
} from "../services/follows-service";
import { Link } from "react-router-dom";
import { getArtworks } from "../art/service";
import ArtCard from "../components/art-card";

function ProfileScreen() {
  const { currentUser } = useSelector((state) => state.users);
  const { userId } = useParams( );
  const [profile, setProfile] = useState({});
  const [likes, setLikes] = useState([]);
  const [following, setFollowing] = useState([]);
  const [follows, setFollows] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const fetchProfile = async () => {
    if (userId) {
      const user = await findUserById(userId);
      setProfile(user);
      setIsOwnProfile(currentUser?._id === user?._id);
    } else {
      if (!currentUser) {
        navigate("/login");
        return;
      }
      else {
        setProfile(currentUser);
        setIsOwnProfile(true);
      }
    }
  };  

  const fetchFollowing = async () => {
    const following = await findFollowsByFollowerId(profile._id);
    setFollowing(following);
  };
  const fetchFollowers = async () => {
    const follows = await findFollowsByFollowedId(profile._id);
    setFollows(follows);
  };
  const fetchLikes = async () => {
    console.log(`fetching likes for ${profile._id}`)
    const likes = await findLikesByUserId(profile._id);
    const populatedLikes = await getArtworks(likes);
    console.log(populatedLikes)
    setLikes(populatedLikes);
  };
  
  useEffect(() => {
    fetchProfile();
  }, [userId, currentUser]);

  useEffect(() => {
    console.log(profile);
    if (profile._id) {
      fetchLikes();
      fetchFollowing();
      fetchFollowers();
    }
  }, [profile]);

  const followUser = async () => {
    if (currentUser && !isOwnProfile) {
      await userFollowsUser(currentUser._id, profile._id);
    }
  };
  const updateProfile = async () => {
    await dispatch(updateUserThunk(profile));
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
  }, [userId]);

  return (
    <div className='container-narrow'>

      <div>
        {currentUser && (
          <div>
            <h2>
              Welcome {currentUser.username}!
            </h2>
          </div>
        )}
      </div>

      {profile._id && (
        <h1>
          {!isOwnProfile && (
            <button onClick={followUser} className="btn btn-primary float-end">
              Follow
            </button>
          )}
          Profile {profile.username}
        </h1>
      )}

      <div>
        <h2>Likes</h2>
        <div className="container">
        {likes && likes.map((art) => (ArtCard(art)))}
        </div>
      </div>

      {follows && (
        <div>
          <h2>Followers</h2>
          <ul className="list-group">
          {follows.map((follow) => (
                <li key={follow.follower._id} className="list-group-item">
                    <Link to={`/profile/${follow.follower._id}`}>
                        <h3>{follow.follower.username}</h3>
                        <h3>{follow.follower._id}</h3>
                    </Link>
                </li>
            ))}
          </ul>
        </div>
      )}

      {following && (
        <div>
          <h2>Following</h2>
          <ul className="list-group">
            {following.map((follow) => (
              <li key={follow.follower._id} className="list-group-item">
                <Link to={`/profile/${follow.followed._id}`}>
                  <h3>{follow.followed.username}</h3>
                  <h3>{follow.followed._id}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

  {isOwnProfile && (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          dispatch(logoutThunk());
          navigate("/admin");
        }}
      >
        Edit Profile
      </button>

      <button
        className="btn btn-danger"
        onClick={() => {
          dispatch(logoutThunk());
          navigate("/login");
        }}
      >
        Logout
      </button>
    </>
  )}
  </div>
)}

export default ProfileScreen;
