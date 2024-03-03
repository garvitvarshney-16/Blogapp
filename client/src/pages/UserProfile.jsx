import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.id;

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8000/api/users/${userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <img src={user.profilePicture} alt={`Profile of ${user.username}`} />
      <h3>{user.username}</h3>
      <p>Bio: {user.bio}</p>

      <h4>Posts by {user.username}</h4>
      <ul>
        {user.posts.map((post) => (
          <li key={post.id}>
            <p>{post.title}</p>
            {/* Additional post details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
