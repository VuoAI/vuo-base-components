import React, { useState } from 'react';
import { Media } from '@vuo/models/Media';

interface MediaInputProps {
  media: Media;
  setMedia: React.Dispatch<React.SetStateAction<Media>>;
}

function MediaInput(props: MediaInputProps) {
  const { media, setMedia } = props;

  const [image, setImage] = useState<string>(media.image || '');
  const [video, setVideo] = useState<string>(media.video || '');

  const updateMedia = () => {
    setMedia({ image, video });
  };

  return (
    <div>
      <div>Media</div>
      <input value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" />
      <input value={video} onChange={e => setVideo(e.target.value)} placeholder="Video URL" />
      <button type="button" onClick={updateMedia}>Update Media</button>
    </div>
  );
};

export default MediaInput;
