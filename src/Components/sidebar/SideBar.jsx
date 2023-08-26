import axios from 'axios'
import { useEffect, useState } from 'react'
import './sidebar.css'
import { Link } from "react-router-dom"

export default function SideBar() {
    const [cats, setCats] = useState([])

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/categories");
            setCats(res.data)
        };
        getCats()
    }, [])
    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTittle">About Me</span>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOuSc7BLoUPkOQJwiTTrhYbYrqzyD0rcWfGwagPlzo1g&s" alt="" />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Harum cum quisquam incidunt consectetur illum repellat,
                    dolores officiis, vero distinctio alias molestias aperiam sapiente.
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTittle">Categories</span>
                <ul className="sidebarList">
                    {cats.map((c) => (
                        <Link to={`/?cat=${c.name}`} className="link">
                            <li className="sidebarListItem">{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTittle">Follow Us</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-square-facebook"></i>
                    <i className="sidebarIcon fa-brands fa-square-twitter"></i>
                    <i className="sidebarIcon fa-brands fa-square-instagram"></i>
                </div>
            </div>
        </div>
    )
}
