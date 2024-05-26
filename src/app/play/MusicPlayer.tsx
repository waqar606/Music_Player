import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeDown,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import "@/app/musicplayer.css";
import MusicAnimation from "@/components/MusicAnimation";
import MusicPlayAnima from "@/components/MusicPlayAnima";

interface MusicPlayerProps {
  audioURL: string;
}

const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioURL }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(
    (Number(localStorage.getItem("volume")) == 0
      ? 100
      : Number(localStorage.getItem("volume"))) || 100
  );
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setIsPlaying(true);
  }, [audioURL]);

  const handlePlayPause = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
    } else if (audioRef.current) {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const mute = () => {
    if (audioRef.current) {
      if (audioRef.current.volume === 0) {
        audioRef.current.volume = 1;
        setVolume(100);
      } else {
        audioRef.current.volume = 0;
        setVolume(0);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const progressPercent = (currentTime / duration) * 100;
      setProgress(progressPercent);
      setCurrentTime(currentTime);
      setDuration(duration);
    }
  };

  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const progressValue = parseFloat(e.target.value);
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const currentTime = (progressValue / 100) * duration;
      audioRef.current.currentTime = currentTime;
      setProgress(progressValue);
      setCurrentTime(currentTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volumeValue = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = volumeValue / 100;
      localStorage.setItem("volume", String(volumeValue));
      setVolume(volumeValue);
    }
  };

  const forwardSong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 5;
    }
  };

  const backwardSong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 5;
    }
  };

  return (
    <>
      {!audioURL ? (
        <div className="empty">
          Please search and select a song first to play
        </div>
      ) : (
        <div className="player-holder">
          {isPlaying ? <MusicPlayAnima /> : ""}
          <div id="container"></div>
          <audio
            autoPlay
            ref={audioRef}
            src={audioURL}
            onTimeUpdate={handleTimeUpdate}
          />
          <div className="player-controls">
            <div className="player-controllers-holder">
              <a onClick={backwardSong} className="player-controllers">
                <FontAwesomeIcon icon={faBackward} />
              </a>
              <a
                onClick={handlePlayPause}
                className="player-controllers player-controllers-1"
              >
                {isPlaying ? (
                  <FontAwesomeIcon icon={faPause} />
                ) : (
                  <FontAwesomeIcon icon={faPlay} />
                )}
              </a>
              <a onClick={forwardSong} className="player-controllers ">
                <FontAwesomeIcon icon={faForward} />
              </a>
            </div>
          </div>
          <div className="player-controls">
            <a onClick={mute} className="player-controllers">
              {volume > 20 ? (
                <FontAwesomeIcon icon={faVolumeUp} />
              ) : (
                <FontAwesomeIcon icon={faVolumeDown} />
              )}
            </a>
            <input
              type="range"
              className="volume"
              min={0}
              max={100}
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
          <div className="jojo">
            <span className="current-time">{formatTime(currentTime)}</span>
            <input
              type="range"
              className="duration"
              min={0}
              max={100}
              value={progress}
              onChange={handleProgressBarChange}
            />
            <span className="current-time">{formatTime(duration)}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
