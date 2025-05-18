import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SongList = ({ token }) => {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [recognition, setRecognition] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get('https://song-app-server.onrender.com/api/songs', {
          headers: { 'x-auth-token': token },
        });
        setSongs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchFavorites = async () => {
      try {
        const res = await axios.get('https://song-app-server.onrender.com/api/songs/favorites', {
          headers: { 'x-auth-token': token },
        });
        setFavorites(res.data.map((song) => song._id));
      } catch (err) {
        console.error(err);
      }
    };
    fetchSongs();
    fetchFavorites();
  }, [token]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const rec = new window.webkitSpeechRecognition();
      rec.lang = 'en-US';
      rec.continuous = false;
      rec.interimResults = false;
      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        rec.stop();
      };
      setRecognition(rec);
    }
  }, []);

  const toggleFavorite = async (songId) => {
    try {
      await axios.post(
        `https://song-app-server.onrender.com/api/songs/favorite/${songId}`,
        {},
        { headers: { 'x-auth-token': token } }
      );
      setFavorites((prev) =>
        prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
      );
    } catch (err) {
      console.error(err);
    }
  };

  const startVoiceSearch = () => {
    if (recognition) {
      recognition.start();
    } else {
      alert('Voice recognition not supported in this browser');
    }
  };

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedSongs = filteredSongs.reduce((acc, song) => {
    const key = song.language === 'Hindi' ? `${song.decade}s Hindi` : 'English';
    acc[key] = acc[key] || [];
    acc[key].push(song);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Browse Songs</h2>
      <button
        onClick={startVoiceSearch}
        className="mb-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
      >
        Voice Search
      </button>
      {searchQuery && <p className="mb-4">Searching for: {searchQuery}</p>}
      {Object.keys(groupedSongs).map((group) => (
        <div key={group} className="mb-6">
          <h3 className="text-xl font-semibold">{group}</h3>
          <ul className="space-y-2 mt-2">
            {groupedSongs[group].map((song) => (
              <li
                key={song._id}
                className="flex justify-between items-center p-2 border rounded animate-slide-in"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => setSelectedSong(song._id === selectedSong?._id ? null : song)}
                >
                  <span className="font-medium">{song.title}</span> - {song.artist}
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => toggleFavorite(song._id)}
                    className={`mr-2 ${
                      favorites.includes(song._id) ? 'text-yellow-500' : 'text-gray-500'
                    }`}
                  >
                    ★
                  </button>
                  <button
                    onClick={() => setSelectedSong(song._id === selectedSong?._id ? null : song)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    {selectedSong?._id === song._id ? 'Close' : 'Play'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {selectedSong && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-bold">{selectedSong.title}</h3>
          <iframe
            style={{ borderRadius: '12px' }}
            src={selectedSong.audioUrl}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={`${selectedSong.title} Player`}
          ></iframe>
          <p className="text-sm text-gray-500 mt-2">
            Note: Log into Spotify to play this track.
          </p>
          <div className="mt-4">
            <h4 className="font-semibold">Lyrics</h4>
            <p className="whitespace-pre-line">{selectedSong.lyrics}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongList;