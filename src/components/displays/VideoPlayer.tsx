import React from 'react';

interface VideoPlayerProps {
  className?: string;
  minHeight?: number;
  posterUrl?: string;
  fallbackText?: string;
  sources: Array<{
    src: string;
    type: string;
  }>;
}

const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  return (
    <div
      className={props.className}
      style={{
        minHeight: props.minHeight,
      }}
    >
      <video
        width="100%"
        controls={true}
        controlsList="nodownload"
        poster={props.posterUrl}
      >
        {props.sources.map((src, index) => <source
          key={index.toFixed()}
          src={src.src}
          type={src.type}
        />)}
        {props.fallbackText ? props.fallbackText : null}
      </video>
    </div>

  );
};

export default VideoPlayer;
