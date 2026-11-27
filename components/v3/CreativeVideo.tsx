import React, { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  label: string;
  className?: string;
};

/**
 * Video inside a .sx-cr-art card. Muted + looping, it starts when the card
 * scrolls into view and pauses when it leaves (nothing downloads before that).
 * Click toggles play/pause; the export's ▶ badge shows while paused.
 * With prefers-reduced-motion it never autoplays.
 */
const CreativeVideo: React.FC<Props> = ({ src, label, className = '' }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload === 'none') video.preload = 'metadata';
          if (!reduced && !userPaused.current) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <button
      type="button"
      className={`sx-cr-art sx-cr-video ${className}`}
      onClick={toggle}
      aria-label={`${playing ? 'Pause' : 'Play'} ${label}`}
    >
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {!playing && <span className="sx-play" aria-hidden="true">▶</span>}
    </button>
  );
};

export default CreativeVideo;
