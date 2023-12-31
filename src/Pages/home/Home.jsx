import { useEffect, useState } from 'react'
import Header from '../../Components/header/Header'
import Posts from '../../Components/posts/Posts'
import SideBar from '../../Components/sidebar/SideBar'
import './home.css'
import axios from 'axios'
import { useLocation } from 'react-router'

export default function Home() {
    const [posts, setPosts] = useState([]);
    const { search } = useLocation()


    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/posts" + search)
            setPosts(res.data)
            console.log(res)
        }
        fetchPosts();
    }, [search])
    return (
        <>
            <Header />
            <div className="home">
                <Posts posts={posts} />
                <SideBar />
            </div>
        </>
    )
}
