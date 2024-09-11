'use client';

import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = ({ title, endpoint, token }) => {
  const [altText, setAltText] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('altText', altText);
    formData.append('image', image);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage('Image uploaded successfully!');
      setAltText('');
      setImage(null);
    } catch (error) {
      setMessage('Error uploading image. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-lg text-black">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="mb-4">
        <label htmlFor="altText" className="block text-gray-700 font-bold mb-2">Alt Text:</label>
        <input
          type="text"
          id="altText"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image:</label>
        <input
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
        Upload Image
      </button>
      {message && <p className="mt-4 text-center font-semibold">{message}</p>}
    </form>
  );
};

export default ImageUploadForm;