const Song = ({
  song,
  index,
  changeSong,
  isPlaying,
  currentSongIndex,
  formatTime,
  songDurations,
}) => {
  return (
    <button
      key={song.id}
      onClick={() => changeSong(index)}
      className={`flex flex-row text-white justify-between w-full p-4 border-2 border-primary hover:bg-primary duration-300 rounded-lg hover:-translate-y-1 hover:translate-x-1 hover:origin-top hover:font-semibold ${
        currentSongIndex === index && isPlaying ? "playing" : ""
      }`}
    >
      {song.title}
      <p className="text-white">
        {songDurations[song.id] && formatTime(songDurations[song.id])}
      </p>
    </button>
  );
};

export default Song;
