import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import './singlepost.css'
import { Link } from "react-router-dom"
import { useContext } from 'react'
import { Context } from '../../context/Context'

export default function SinglePost() {
  const location = useLocation()
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({})
  const PF = "http://localhost:5000/images/"
  const { user } = useContext(Context);
  const [tittle, setTittle] = useState();
  const [desc, setDesc] = useState();
  const [updateMode, setUpdateMode] = useState();

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data)
      setTittle(res.data.tittle)
      setDesc(res.data.desc)
    };
    getPost()
  }, [path])

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username }
      })
      window.location.replace("/")
    } catch (err) {

    }
  }
  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        tittle,
        desc
      })
      //window.location.reload()
      setUpdateMode(false)
    } catch (err) {

    }
  }
  return (
    <div className='singlePost'>
      <div className="singlePostWrapper">
        {post.photo && (
          <img className='singlePostImage' src={PF + post.photo} alt="" />
        )}
        {
          updateMode ? (
            <input
              type="text"
              value={tittle}
              className='singlePostTittleInput'
              autoFocus
              onChange={(e) => setTittle(e.target.value)}
            />
          ) : (
            <h1 className='singlePostTittle'>
              {tittle}
              {post.username === user?.username && (
                <div className="singlePostEdit">
                  <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                  <i className="singlePostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
                </div>
              )}
            </h1>
          )
        }
        <div className="singlePostInfo">
          <span className='singlePostAuthor'>
            <Link to={`/?user=${post.username}`} className="link">
              Author: <b>{post.username}</b>
            </Link>
          </span>
          <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea className='singlePostDescInput' value={desc} onChange={(e) => setDesc(e.target.value)} />
        ) : (
          <p className='singlePostDesc'>
            {desc}
          </p>
        )}
        {updateMode &&
          <button className="singlePostButton" onClick={handleUpdate}>Update</button>
        }
      </div>
    </div >
  )
}
