import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Favorites = ({ token }) => {
  const [favorites, setFavorites] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/songs/favorites', {
          headers: { 'x-auth-token': token },
        });
        setFavorites(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFavorites();
  }, [token]);

  const toggleFavorite = async (songId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/songs/favorite/${songId}`,
        {},
        { headers: { 'x-auth-token': token } }
      );
      setFavorites(favorites.filter((song) => song._id !== songId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Favorite Songs</h2>
      {favorites.length === 0 ? (
        <p>No favorite songs yet.</p>
      ) : (
        <ul className="space-y-2">
          {favorites.map((song) => (
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
                  className="mr-2 text-yellow-500"
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
      )}
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

export default Favorites;