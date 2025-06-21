import React, { useState } from 'react';
import { FaSpinner, FaExclamationCircle } from 'react-icons/fa';

const VideoPlayer = ({
  videoUrl = '',
  poster = 'https://placehold.co/640x360/E0E0E0/888888?text=Loading+Video...',
  title = 'Course Video',
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isYouTube = videoUrl.includes('youtube.com/watch?v=');
  const youTubeEmbedUrl = isYouTube
    ? `https://www.youtube.com/embed/${videoUrl.split('v=')[1]}?autoplay=0&rel=0`
    : null;

  if (!videoUrl) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
        <p className="text-gray-600 dark:text-gray-300 text-lg text-center">No video available.</p>
      </div>
    );
  }

  return (
    <div className="relative pt-[56.25%] rounded-lg overflow-hidden shadow-md bg-black">
      {loading && !error && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/70 z-10">
          <FaSpinner className="animate-spin text-white text-3xl" />
        </div>
      )}

      {error && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-red-100 text-red-700 z-10">
          <FaExclamationCircle className="me-2" />
          Error loading video.
        </div>
      )}

      {isYouTube ? (
        <iframe
          className="absolute top-0 left-0 rounded-lg"
          src={youTubeEmbedUrl}
          title={title}
          frameBorder="0"
          width="100%"
          height="100%"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        ></iframe>
      ) : (
        <video
          className="absolute top-0 left-0 rounded-lg"
          controls
          playsInline
          width="100%"
          height="100%"
          poster={poster}
          onCanPlay={() => setLoading(false)}
          
          onError={(e) => {
            console.error('Video error:', e);
            setError(true);
            setLoading(false);
          }}
          onContextMenu={(e) => e.preventDefault()} // Disable right-click
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
