import React, {useEffect, useRef} from 'react';

type Props = {
    images: string[],
}

const Canvas = ({images}: Props) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (context == null) throw new Error('Could not get context of canvas.');

        images.forEach((image) => {
            const img = new Image()
            img.src = image;
            img.onload = function () {
                context.drawImage(img, 0, 0)
            }
        })
    }, [images])

    return <canvas ref={canvasRef}/>
}

export default Canvas;
