import React, { useRef, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

const isYouTubeUrl = (url) => {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/.test(url);
};

const getYouTubeEmbedUrl = (url) => {
  const videoIdMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1` : '';
};

const VideoPlayerModal = ({ videoUrl, onClose, onComplete, lessonId }) => {
  const videoRef = useRef(null);
  const [watchedPercent, setWatchedPercent] = useState(0);
  const [hasReported, setHasReported] = useState(false);
  const isYouTube = isYouTubeUrl(videoUrl);

  useEffect(() => {
    if (!videoRef.current || isYouTube) return;

    const video = videoRef.current;

    const handleTimeUpdate = () => {
      const percent = (video.currentTime / video.duration) * 100;
      setWatchedPercent(percent);

      if (percent >= 80 && !hasReported) {
        setHasReported(true);
        onComplete?.(lessonId, percent);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoUrl, isYouTube, hasReported, lessonId, onComplete]);

  useEffect(() => {
    setWatchedPercent(0);
    setHasReported(false);
  }, [videoUrl]);

  return (
    <Modal show onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Lesson Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isYouTube ? (
          <>
            <div className="ratio ratio-16x9">
              <iframe
                src={getYouTubeEmbedUrl(videoUrl)}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-2 text-muted small">
              * YouTube progress tracking is not supported.
            </div>
          </>
        ) : (
          <>
            <video ref={videoRef} controls width="100%">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="mt-2 text-muted small">
              Watched: {watchedPercent.toFixed(1)}%
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default VideoPlayerModal;
