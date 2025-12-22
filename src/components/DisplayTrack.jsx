import { BsMusicNoteBeamed } from 'react-icons/bs';
import { api_url } from '../dataService';
import dayjs from "dayjs";
import React from 'react';
import images from './images';

const DisplayTrack = ({
  currentTrack,
  tracks,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}) => {

  const [list, setList] = React.useState([]);

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  const renderTracks = (i) => (
    <li key={i.id} className={i.id == currentTrack.id ? "current" : null}>{i.pavadinimas}</li>
  )  

  React.useEffect(() => {
    var index = tracks.findIndex((track) => track.id === currentTrack.id);
    var start = index - 6;
    if (start < 0) start = 0;
    var end = start + 12;
    if (end > tracks.length) end = tracks.length;  
    setList(tracks.slice(start, end));

  }, [currentTrack]);
  
  return (
    <div>
      <audio
        src={api_url + `play/${currentTrack.id}`}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      <div className="audio-info">
        <div className="audio-image">
          {currentTrack.thumbnail ? (
            <img src={currentTrack.thumbnail} alt="audio avatar" />
          ) : (
            <img src={currentTrack.thumbnail} alt="audio avatar" />
            // <div className="icon-wrapper">
            //   <span className="audio-icon">
            //     <BsMusicNoteBeamed />
            //   </span>
            // </div>
          )}
        </div>
        <div className="text">
          <p className="title">{currentTrack.pavadinimas}</p>
          <p>{"A.C. Bhaktivedanta Svami Prabhupada"}</p>
          <p>{currentTrack.failo_data ? "Įkelta: " + dayjs(currentTrack.failo_data).format("YYYY-MM-DD")  : null}</p>
          <p>{currentTrack.data ? "Įrašyta: " + dayjs(currentTrack.data).format("YYYY-MM-DD") : null}</p>
          <p>{currentTrack.vieta ? "Įrašo vieta: " + currentTrack.vieta : null}</p>
          <p>{currentTrack.knyga ? "Knyga: " + currentTrack.knyga : null}</p>
          <p>{currentTrack.skyrius ? "Skyrius: " + currentTrack.skyrius : null}</p>
          <p>{currentTrack.tekstas ? "Tekstas: " + currentTrack.skyrius : null}</p>
          <p>{currentTrack.aprasymas ? "Papildomai: " + currentTrack.aprasymas : null}</p>
          <p>{currentTrack.aprasymas ? "Papildomai: " + currentTrack.aprasymas : null}</p>
        </div>
        <div className="text"><ul>{list.map(renderTracks)}</ul></div>
      </div>
    </div>
  );
};
export default DisplayTrack;