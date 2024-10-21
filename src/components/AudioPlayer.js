import { useState, useRef, useEffect, useMemo } from "react";
import Song from "./Song";
import BottomUI from "./BottomUI";

const AudioPlayer = () => {
  // Example list of songs
  const songs = useMemo(
    () => [
      {
        id: "1",
        title: "يستجيب الرب ليك",
        src: "/2.mp3",
      },
      {
        id: "2",
        title: "علشان خاطر العدرا يارب",
        src: "/3.mp3",
      },
      {
        id: "3",
        title: "جيت افضفضلك",
        src: "/1.mp3",
      },
      {
        id: "4",
        title: "و ليه هنخاف",
        src: "/4.mp3",
      },
      {
        id: "5",
        title: "وقت الصلاة",
        src: "/5.mp3",
      },
      {
        id: "6",
        title: "ورقة علي المذبح",
        src: "/6.mp3",
      },
      {
        id: "7",
        title: "إتطمن خايف ليه اطمن",
        src: "/7.mp3",
      },
      {
        id: "8",
        title: "احنا مين",
        src: "/8.mp3",
      },
      {
        id: "9",
        title: "يا عدرا عايز معجزة",
        src: "/9.mp3",
      },
      {
        id: "10",
        title: "رشو الورد",
        src: "/10.mp3",
      },
      {
        id: "11",
        title: "بيرتبلك",
        src: "/11.mp3",
      },
    ],
    []
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const [songDurations, setSongDurations] = useState({});

  useEffect(() => {
    // When the audio is loaded, set the duration
    const setAudioData = () => {
      setDuration(audioRef.current.duration);
      setCurrentTime(audioRef.current.currentTime);
    };

    // Update current time while the audio is playing
    const setAudioTime = () => setCurrentTime(audioRef.current.currentTime);

    // Play next song when the current one ends
    const playNextSong = () => {
      const nextSongIndex = (currentSongIndex + 1) % songs.length; // Loop back to the first song if it's the last one
      changeSong(nextSongIndex);
    };

    audioRef.current.addEventListener("loadeddata", setAudioData);
    audioRef.current.addEventListener("timeupdate", setAudioTime);
    audioRef.current.addEventListener("ended", playNextSong); // Add this line

    if (audioRef.current) {
      audioRef.current.removeEventListener("loadeddata", setAudioData);
      audioRef.current.removeEventListener("timeupdate", setAudioTime);
      audioRef.current.removeEventListener("ended", playNextSong);
    }
  }, [currentSongIndex, songs.length]);

  useEffect(() => {
    // When the audio is loaded, set the duration
    const setAudioData = () => {
      setDuration(audioRef.current.duration);
      setCurrentTime(audioRef.current.currentTime);
    };

    // Update current time while the audio is playing
    const setAudioTime = () => setCurrentTime(audioRef.current.currentTime);

    audioRef.current.addEventListener("loadeddata", setAudioData);
    audioRef.current.addEventListener("timeupdate", setAudioTime);

    return () => {
      // Check if audioRef.current exists before removing event listeners
      if (audioRef.current) {
        audioRef.current.removeEventListener("loadeddata", setAudioData);
        audioRef.current.removeEventListener("timeupdate", setAudioTime);
      }
    };
  }, []);

  const setAudioTime = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const changeSong = (index) => {
    setCurrentSongIndex(index);
    audioRef.current.pause();
    setIsPlaying(false);
    setCurrentTime(0);
    audioRef.current.load();
    audioRef.current.play();
    setIsPlaying(true);
  };

  const playNextSong = () => {
    const nextSongIndex = (currentSongIndex + 1) % songs.length; // Ga naar het volgende nummer, of ga terug naar het begin als het het laatste nummer is.
    changeSong(nextSongIndex);
  };
  const playPreviousSong = () => {
    // If the current song has already been playing for more than 3 seconds, rewind to the start.
    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else {
      // Otherwise, go to the previous song (or the last song if it's the first one).
      const prevSongIndex =
        (currentSongIndex - 1 + songs.length) % songs.length;
      changeSong(prevSongIndex);
    }
  };
  useEffect(() => {
    // When the audio is loaded, set the duration
    const setAudioData = () => {
      setDuration(audioRef.current.duration);
      setCurrentTime(audioRef.current.currentTime);
    };

    // Update current time while the audio is playing
    const setAudioTime = () => setCurrentTime(audioRef.current.currentTime);

    // Play next song when the current one ends
    const playNextSong = () => {
      const nextSongIndex = (currentSongIndex + 1) % songs.length; // Loop back to the first song if it's the last one
      changeSong(nextSongIndex);
    };

    audioRef.current.addEventListener("loadeddata", setAudioData);
    audioRef.current.addEventListener("timeupdate", setAudioTime);
    audioRef.current.addEventListener("ended", playNextSong); // Add this line

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("loadeddata", setAudioData);
        audioRef.current.removeEventListener("timeupdate", setAudioTime);
        audioRef.current.removeEventListener("ended", playNextSong);
      }
    };
  }, [currentSongIndex, songs.length]);

  useEffect(() => {
    const loadSongDurations = async () => {
      const durations = {};

      for (const song of songs) {
        const audio = new Audio(song.src);
        await new Promise((resolve) => {
          audio.addEventListener("loadedmetadata", () => {
            durations[song.id] = audio.duration;
            resolve();
          });
        });
      }

      setSongDurations(durations);
    };

    loadSongDurations();
  }, [songs]);

  return (
    // Audio player container and title
    <div className=" flex flex-col items-center justify-center w-full">
      <h2 className="text-white text-4xl font-bold pb-2">kiro player</h2>

      {/* Audio player */}
      <div className="w-[95vw] rounded-lg max-w-xl bg-secondary  items-center justify-center flex flex-col p-5">
        {/* Song list */}
        <div className="bg-black w-full overflow-y-scroll max-h-80">
          {songs.map((song, index) => (
            <Song
              song={song}
              index={index}
              changeSong={changeSong}
              isPlaying={isPlaying}
              currentSongIndex={currentSongIndex}
              formatTime={formatTime}
              songDurations={songDurations}
            />
          ))}
        </div>

        {/* Audio */}
        <audio ref={audioRef} className="hidden">
          <source src={songs[currentSongIndex].src} type="audio/wav" />
        </audio>

        {/* Title of the song */}
        <h3 className="text-white text-xl font-normal mt-5">
        ترنيمة - {songs[currentSongIndex].title} 
        </h3>

        {/* Bottom UI */}
        <BottomUI
          togglePlay={togglePlay}
          isPlaying={isPlaying}
          playPreviousSong={playPreviousSong}
          playNextSong={playNextSong}
          duration={duration}
          currentTime={currentTime}
          setAudioTime={setAudioTime}
          formatTime={formatTime}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
