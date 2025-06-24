import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const UserDetails = () => {
  const { user, isAuthenticated, setUser } = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5001/api/user-profile-photo/${encodeURIComponent(user.email)}`)
        .then(res => {
          const { photoUrl, firstName, lastName, createdAt } = res.data;
          setFirstName(firstName);
          setLastName(lastName);
          setPhotoPreview(photoUrl);
          setCreatedAt(createdAt);

          if (typeof setUser === 'function') {
            setUser(prev => ({
              ...prev,
              profilePhotoUrl: photoUrl,
              givenName: firstName,
              familyName: lastName,
              createdAt,
            }));
          }
        })
        .catch(err => console.error('Failed to load user profile:', err));
    }
  }, [user?.email]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) {
      alert('Please select a profile image.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', selectedFile);
    formData.append('email', user.email);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);

    try {
      const res = await axios.post('http://localhost:5001/api/upload-profile-photo', formData);
      const imageUrl = res.data.imageUrl;

      setPhotoPreview(imageUrl);
      setSelectedFile(null);

      if (typeof setUser === 'function') {
        setUser((prev) => ({
          ...prev,
          profilePhotoUrl: imageUrl,
          givenName: firstName,
          familyName: lastName,
        }));
      }

      alert('✅ Profile updated successfully!');
    } catch (err) {
      console.error('❌ Upload failed:', err);
      alert('❌ Upload failed');
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Please sign in to view your profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-700">👤 My Profile</h1>

        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={photoPreview || '/default-avatar.png'}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-400 shadow-md"
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full shadow hover:bg-purple-700"
              title="Change Photo"
            >
              📷
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-lg">
          <div>
            <label className="font-semibold text-gray-600">First Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="font-semibold text-gray-600">Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="md:col-span-2">
            <p className="font-semibold text-gray-600">Email Address</p>
            <p>{user.email}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-semibold text-gray-600">Account Created</p>
            <p>{createdAt ? new Date(createdAt).toLocaleDateString() : 'Not available'}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            💾 Save Changes
          </button>
          <button
            onClick={() => window.history.back()}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            ⬅️ Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
