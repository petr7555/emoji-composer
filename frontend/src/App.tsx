import React, { useState } from 'react';
import Canvas, { CanvasImage } from './components/Canvas';
import axios from 'axios';

const vendors = [
  {
    name: 'Apple',
    value: 'apple',
  },
];

const App = (): JSX.Element => {
  const [emojiName, setEmojiName] = useState('');
  const [vendor, setVendor] = useState('apple');
  const [images, setImages] = useState<CanvasImage[]>([]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setEmojiName('');
    // TODO "could not get emoji ..." when fails
    const { data: imgSrc } = await axios.get(`http://localhost:5001/emoji/${encodeURIComponent(emojiName)}/${vendor}`);
    const newImg = {
      src: imgSrc,
    };
    setImages((images) => [...images, newImg]);
  };

  return (
    <div>
      <div className="p-6 card bordered">
        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text">Apple</span>
            <input className="radio" type="radio" name="vendor-opt" />
          </label>
        </div>
        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text">Microsoft</span>
            <input className="radio" type="radio" name="vendor-opt" />
          </label>
        </div>
      </div>
      <form className="form-control">
        <label className="label">
          <span className="label-text">Add emoji</span>
        </label>
        <div className="relative">
          <input
            className="w-full pr-16 input input-primary input-bordered"
            type="text"
            placeholder="e.g. 🤓"
            value={emojiName}
            onChange={(e) => setEmojiName(e.target.value)}
          />
          <button className="absolute top-0 right-0 rounded-l-none btn btn-primary" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </form>
      <Canvas images={images} />
    </div>
  );
};

export default App;
