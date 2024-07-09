import { NavLink } from "react-router-dom";
import { MdMenuOpen } from "react-icons/md";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function Navbar() {

    const [showMenu, setShowMenu] = useState(false);

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <nav className="h-16 fixed top-0 left-0 z-20 w-full bg-slate-900 flex text-white justify-between items-center">
            <h1 className="ml-8 text-2xl">NewsMan</h1>

            <button className="md:hidden" onClick={handleShowMenu}>
                <MdMenuOpen className="w-12 h-12 p-2 rounded-md hover:bg-slate-700 mr-4" />
            </button>

            <div className={`h-screen w-56 bg-slate-900 md:hidden absolute ${!showMenu ? "-right-56" : "right-0"} top-0 transition-all`}>
                <div className="text-right mt-2">
                    <button onClick={handleShowMenu}>
                        <IoClose className="w-12 h-12 p-2 rounded-md hover:bg-slate-700 mr-4" />
                    </button>
                </div>
                <h1 className="text-2xl text-center py-16">NewsMan</h1>
                <ul className="flex flex-col items-center gap-6 text-xl">
                    <li onClick={handleShowMenu}><NavLink to="/" >Home</NavLink></li>
                    <li onClick={handleShowMenu}><NavLink to="/business">Business</NavLink></li>
                    <li onClick={handleShowMenu}><NavLink to="/entertainment">Entertainment</NavLink></li>
                    <li onClick={handleShowMenu}><NavLink to="/health">Health</NavLink></li>
                    <li onClick={handleShowMenu}><NavLink to="/science">Science</NavLink></li>
                    <li onClick={handleShowMenu}><NavLink to="/sports">Sports</NavLink></li>
                    <li onClick={handleShowMenu}><NavLink to="/technology">Technology</NavLink></li>
                </ul>
            </div>


            <ul className="gap-4 lg:gap-12 xl:gap-16 mr-8 hidden md:flex">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/business">Business</NavLink></li>
                <li><NavLink to="/entertainment">Entertainment</NavLink></li>
                <li><NavLink to="/health">Health</NavLink></li>
                <li><NavLink to="/science">Science</NavLink></li>
                <li><NavLink to="/sports">Sports</NavLink></li>
                <li><NavLink to="/technology">Technology</NavLink></li>
            </ul>
        </nav>
    )
}