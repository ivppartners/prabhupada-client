import { useEffect, useRef, useState } from "react";

// import components
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import "./audioplayer.css";
import images from "./images";

const getRandomInt=(max)=> {
  return Math.floor(Math.random() * max);
}

const AudioPlayer = ({id, tracks }) => {
  // states
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState();
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // reference
  const audioRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    var index = tracks.findIndex((track) => track.id === id);
    setTrackIndex(index);
    var track = {
      ...tracks[index],
      thumbnail: images[getRandomInt(images.length)]
    };
    setCurrentTrack(track);
  }, [id, tracks]);

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      var track = {
        ...tracks[0],
        thumbnail: images[getRandomInt(images.length)]
      };
      setCurrentTrack(track);
    } else {
      setTrackIndex(prev => prev + 1);
      var track = {
        ...tracks[trackIndex + 1],
        thumbnail: images[getRandomInt(images.length)]
      };
      setCurrentTrack(track);
    }
  };

  if (!currentTrack) return null;

  return (
    <div className="audio-player mt-5 mb-5">
      <div className="inner">
        <DisplayTrack
          {...{
            currentTrack,
            tracks,
            audioRef,
            setDuration,
            progressBarRef,
            handleNext,
          }}
        />
        <Controls
          {...{
            audioRef,
            progressBarRef,
            duration,
            setTimeProgress,
            tracks,
            trackIndex,
            setTrackIndex,
            setCurrentTrack,
            handleNext,
          }}
        />
        <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress, duration }}
        />
      </div>
    </div>
  );
};
export default AudioPlayer;
