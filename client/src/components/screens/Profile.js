import { useState, useEffect } from "react";

export default function Profile() {
  const [profile, setProfile] = useState([])
  useEffect(() => {
    fetch("http://localhost:5000/mypost", {
      headers: {
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
    })
      .then(res => res.json())
      .then(result => {
        setProfile(result.myPost)
      })
  })


  return (
    <div className="profile">
      <div className="profileMain">
        <div>
          <img
            className="profileImg"
            src="https://images.unsplash.com/photo-1541534401786-2077eed87a74?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHBlcnNvbnxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="profile"
          />
        </div>
        <div>
          <h4>Samar.Badriddinov</h4>
          <div className="infoProfile">
            <p>99 posts</p>
            <p>99 followers</p>
            <p>99 following</p>
          </div>
        </div>
      </div>
      <div className="gallery">
        {profile.map(item => {
          return (
            <div className="img-item">
              <img
                src={item.photo}
                alt={item._id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
