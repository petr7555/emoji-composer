import React, { useEffect, useRef } from 'react';

export type CanvasImage = {
  src: string;
};

type Props = {
  images: CanvasImage[];
};

const Canvas = ({ images }: Props): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context == null) throw new Error('Could not get context of canvas.');

    images.forEach((image) => {
      const img = new Image();
      img.src = image.src;
      img.onload = function () {
        context.drawImage(img, 0, 0);
      };
    });
  }, [images]);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
