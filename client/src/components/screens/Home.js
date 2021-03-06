import { useState, useEffect, useContext } from "react";
import "./css/Home.css";
import HomeSideBar from "./HomeSideBar";
import { UserContext } from "../../App";

export default function Home() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/allpost", {
      headers: {
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const unlikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const commentPost = (text, postId) => {
    fetch("http://localhost:5000/comments", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (postId) => {
    fetch(`http://localhost:5000/deletepost/${postId}`, {
      method: "delete",
      headers: {
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((s) => s._id !== result);
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <div className="post__items">
        <div className="left__side">
          {data
            .map((item) => {
              return (
                <div className="card" key={item._id}>
                  <p className="card-title postedBy">{item.postedBy.name}</p>
                  <div className="card-image">
                    <img src={item.photo} alt={item._id} />
                  </div>
                  <div className="card-content">
                    {item.likes.includes(state._id) ? (
                      <i
                        className="material-icons"
                        onClick={() => unlikePost(item._id)}
                      >
                        thumb_down
                      </i>
                    ) : (
                      <i
                        className="material-icons"
                        onClick={() => likePost(item._id)}
                      >
                        thumb_up
                      </i>
                    )}
                    <a
                      style={{ margin: "0 10px" }}
                      className="modal-trigger material-icons"
                      href="#modal1"
                      onClick={() => setShowComments(!showComments)}
                    >
                      comment
                    </a>
                    <a href="#delete">
                      {item.postedBy._id === state._id && (
                        <i
                          onClick={() => deletePost(item._id)}
                          className="material-icons"
                        >
                          delete_forever
                        </i>
                      )}
                    </a>
                    <p>{item.likes.length} likes</p>
                    <h4 style={{ margin: 0 }}>{item.title}</h4>
                    <p style={{ marginTop: 5 }}>
                      Maqola: <b>{item.body}</b>
                    </p>
                    {showComments ? (
                      item.comments.map((s) => (
                        <div className="commentPost">
                          <h6>{s.text}</h6>
                          <p>
                            Posted By <b>{s.postedBy.name}</b>
                          </p>
                        </div>
                      ))
                    ) : (
                      <p style={{ opacity: 0.6 }}>
                        Comments: {item.comments.length}
                      </p>
                    )}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        commentPost(e.target[0].value, item._id);
                        e.target[0].value = "";
                      }}
                    >
                      <input type="text" placeholder="Add A Comment" />
                    </form>
                  </div>
                </div>
              );
            })
            .reverse()}
        </div>
        <div className="right__side">
          <h2 style={{ color: "#fff", fontFamily: "'Grand Hotel', cursive" }}>
            Mening postlarim
          </h2>
          <HomeSideBar />
        </div>
      </div>
    </div>
  );
}
