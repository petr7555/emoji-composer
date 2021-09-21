import React, {useState} from 'react';
import Canvas from "./components/Canvas";
import './App.css';
import axios from "axios";

function App() {
    const [emojiName, setEmojiName] = useState("");
    const [images, setImages] = useState<string[]>([]);

    const handleClick = async () => {
        const {data} = await axios.get(`http://localhost:5001/emoji/${emojiName}`);
        setEmojiName("");
        setImages(images => [...images, data])
    }

    return (
        <div>
            <input placeholder="Emoji name" value={emojiName} onChange={(e) => setEmojiName(e.target.value)}/>
            <button onClick={handleClick}>Add emoji</button>
            <Canvas images={images}/>
        </div>
    );
}

export default App;
