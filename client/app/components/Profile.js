import React, { useState, useEffect } from 'react';

const Profile = ({ profile, profileId }) => {
  const [picture, setPicture] = useState(undefined);

  useEffect(
    () => {
      const fetchData = async () => {
        const resPic = await fetch(`/api/img/${profileId}`);
        const picBlob = await resPic.blob();
        const pic = await URL.createObjectURL(picBlob);
        setPicture(pic);
      };
      fetchData();
    },
    [],
  );

  const {
    name, title, belts, 'favourite food': fav_food,
  } = profile;

  return (
    <div className="profile-page">
      <img src={picture} alt="Profile" />
      <div className="profile-details">
        <div className="field-key">name</div>
        <div className="field-value">{name}</div>
        <div className="field-key">title</div>
        <div className="field-value">{title}</div>
        <div className="field-key">favourite food</div>
        <div className="field-value">{fav_food}</div>
        <div className="field-key">belts</div>
        <ul>
          {
            belts.map((belt, idx) => (
              <li key={`${idx}-${belt}`} className="field-value-list">{belt}</li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default Profile;
