import React, { ChangeEvent, useState } from 'react';
import Canvas, { CanvasImage } from './components/Canvas';
import axios from 'axios';
import { ALERT_TIMEOUT } from './constants/constants';

type Vendor = {
  name: string;
  value: string;
};

const vendors: Vendor[] = [
  {
    name: 'Apple',
    value: 'apple',
  },
  {
    name: 'Microsoft',
    value: 'microsoft',
  },
];

const App = (): JSX.Element => {
  const [emojiName, setEmojiName] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<Vendor>(vendors[0]);
  const [alertText, setAlertText] = useState('');
  const [alertIsVisible, setAlertIsVisible] = useState(false);

  const [images, setImages] = useState<CanvasImage[]>([]);

  const handleVendorOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedVendor = vendors.find((vendor) => vendor.value === e.target.value);
    if (!selectedVendor) throw Error(`Could not find vendor ${e.target.value}.`);
    setSelectedVendor(selectedVendor);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let imgSrc;

    const processedEmojiName = emojiName.replaceAll(' ', '-');

    try {
      const { data } = await axios.get(
        `http://localhost:5001/emoji/${encodeURIComponent(processedEmojiName)}/${selectedVendor.value}`,
      );
      imgSrc = data;
    } catch (e) {
      setAlertText(`Could not get ${selectedVendor.name}'s emoji with name: ${emojiName}.`);
      setAlertIsVisible(true);
      setTimeout(() => setAlertIsVisible(false), ALERT_TIMEOUT);
    }

    setEmojiName('');
    const newImg = {
      src: imgSrc,
    };
    setImages((images) => [...images, newImg]);
  };

  return (
    <div>
      <div className="p-6 card bordered">
        {vendors.map((vendor) => (
          <div className="form-control" key={vendor.value}>
            <label className="cursor-pointer label">
              <span className="label-text">{vendor.name}</span>
              <input
                className="radio"
                type="radio"
                name="vendor-opt"
                value={vendor.value}
                checked={selectedVendor.value === vendor.value}
                onChange={handleVendorOptionChange}
              />
            </label>
          </div>
        ))}
      </div>
      <form className="form-control">
        <label className="label">
          <span className="label-text">Add emoji</span>
        </label>
        <div className="relative">
          <input
            className="w-full pr-16 input input-primary input-bordered"
            type="text"
            placeholder="e.g. 🤓 or 'red heart'"
            value={emojiName}
            onChange={(e) => setEmojiName(e.target.value)}
          />
          <button className="absolute top-0 right-0 rounded-l-none btn btn-primary" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </form>
      {alertIsVisible && (
        <div className="alert alert-error">
          <div className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 mx-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              ></path>
            </svg>
            <label>{alertText}</label>
          </div>
        </div>
      )}
      <Canvas images={images} />
    </div>
  );
};

export default App;
