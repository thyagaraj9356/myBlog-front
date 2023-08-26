import './header.css'

export default function Header() {
    return (
        <div className='header'>
            <div className="headerTittles">
                <span className='headerTittleSm'>welcome to</span>
                <span className='headerTittleLg'>Monster's Blog</span>
            </div>
            <img className='headerImg' src="https://i.pinimg.com/736x/89/04/4c/89044c7b98f5a17d1b6ac4e96073d28b.jpg" alt="" />
        </div>
    )
}
