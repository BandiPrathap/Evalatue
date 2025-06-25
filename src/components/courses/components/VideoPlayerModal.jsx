import React, { useRef, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

const isYouTubeUrl = (url) => {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/.test(url);
};

const getYouTubeVideoId = (url) => {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

const loadYouTubeAPI = () => {
  if (window.YT && window.YT.Player) return Promise.resolve();
  return new Promise((resolve) => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => resolve();
  });
};

const VideoPlayerModal = ({ videoUrl, onClose, onComplete, lessonId }) => {
  const videoRef = useRef(null);
  const [watchedPercent, setWatchedPercent] = useState(0);
  const [hasReported, setHasReported] = useState(false);
  const isYouTube = isYouTubeUrl(videoUrl);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isYouTube) return;

    const setupPlayer = async () => {
      await loadYouTubeAPI();
      const videoId = getYouTubeVideoId(videoUrl);

      playerRef.current = new window.YT.Player(videoRef.current, {
        videoId,
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              clearInterval(intervalRef.current);
              intervalRef.current = setInterval(() => {
                const player = playerRef.current;
                const duration = player.getDuration();
                const currentTime = player.getCurrentTime();
                const percent = (currentTime / duration) * 100;
                setWatchedPercent(percent);
                if (percent >= 80 && !hasReported) {
                  setHasReported(true);
                  onComplete?.(lessonId, percent);
                }
              }, 1000);
            } else if (event.data === window.YT.PlayerState.ENDED || event.data === window.YT.PlayerState.PAUSED) {
              clearInterval(intervalRef.current);
            }
          }
        }
      });
    };

    setupPlayer();

    return () => {
      clearInterval(intervalRef.current);
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
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
              <div ref={videoRef}></div>
            </div>
            {/* <div className="mt-2 text-muted small">
              Watched: {watchedPercent.toFixed(1)}%
            </div> */}
          </>
        ) : (
          <>
            <video ref={videoRef} controls width="100%">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* <div className="mt-2 text-muted small">
              Watched: {watchedPercent.toFixed(1)}%
            </div> */}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default VideoPlayerModal;
