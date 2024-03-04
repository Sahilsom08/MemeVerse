import React from "react";
import TrollFace from "../../public/Images/TrollFace.png"

function Header() {
    return (
        <header className="header">
            <img className="header--image" src={TrollFace}/>
            <h2 className="header--title">Meme Generator</h2>
        </header>
    )
}

export default Header