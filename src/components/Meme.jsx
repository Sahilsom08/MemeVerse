import React , { useState, useEffect }from "react"

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/23ls.jpg"
    })
    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    const downloadImg = () => {
        const imageUrl = meme.randomImage;
        fetch(imageUrl)
          .then((response) => response.blob())
          .then((blob) => {
            // Create a temporary anchor element
            const url = window.URL.createObjectURL(blob);
            const aTag = document.createElement("a");
            aTag.href = url;
    
            // Extract the filename from the URL
            const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    
            // Set the download attribute and filename
            aTag.setAttribute("download", filename);
            document.body.appendChild(aTag);
    
            // Simulate a click on the anchor element to start the download
            aTag.click();
    
            // Clean up the temporary anchor element
            aTag.parentNode.removeChild(aTag);
          })
          .catch((error) => {
            console.error("Error downloading image:", error);
          });
      };
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
            </div>
            <div className="btns">
                <button 
                    className="getMemeBtn btn"
                    onClick={getMemeImage}
                >
                    Get a new meme image 
                </button>
                <button onClick={downloadImg} className="downloadBtn btn">Download</button>
                </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}