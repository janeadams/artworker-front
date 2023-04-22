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

  console.log("currentUser: " + (currentUser ? currentUser.username : 'none'))
  console.log("userId: " + (userId ? userId : currentUser._id))

  const fetchProfile = async () => {
    if (userId) {
      console.log(`Fetching profile for ${userId}`)
      const user = await findUserById(userId ? userId : currentUser._id);
      setProfile(user);
      setIsOwnProfile(currentUser?._id === user?._id);
    } else {
      if (!currentUser) {
        navigate("/login");
        return;
      }
      else {
        const user = await findUserById(currentUser._id);
        setProfile(user);
        setIsOwnProfile(true);
        console.log('Welcome to your profile!')
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
    console.log(`likes: ${profile ? profile.likes : 'no profile!'}`)
    const populatedLikes = await getArtworks(profile.likes);
    console.log(populatedLikes)
    setLikes(populatedLikes);
    console.log()
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
      console.log("This isn't your profile")
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
              Welcome {currentUser.username}! You are a {currentUser.role.toLowerCase()}.
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

    <div className="row">
      <div className="col">
        <h2>Likes</h2>
        <div className="container">
          {likes && likes.map((art) => (ArtCard(art)))}
        </div>
      </div>
    </div>

    {follows && (
      <div className="row">
        <div className="col">
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
      </div>
    )}

    {following && (
      <div className="row">
        <div className="col">
          <h2>Following</h2>
          <ul className="list-group">
            {following.map((follow) => (
              <li key={follow.followed._id} className="list-group-item">
                <Link to={`/profile/${follow.followed._id}`}>
                  <h3>{follow.followed.username}</h3>
                  <h3>{follow.followed._id}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
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
