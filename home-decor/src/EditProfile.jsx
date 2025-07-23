import React, { useState } from 'react';
import './Profile.css';
import profilePictureMapper from './profilePictureMapper.js';

function EditProfile({ profile, setProfile, closeProfileSettings }) {
    const [newUsername, setNewUsername] = useState(profile.username);
    const [newProfilePic, setNewProfilePic] = useState(profile.profilePic);

    const handleSave = (e) => {
        e.preventDefault();
        setProfile({ ...profile, username: newUsername, profilePic: newProfilePic });
        closeProfileSettings();
    };

    return (
        <>
            <div className="modal-backdrop" onClick={closeProfileSettings} aria-hidden="true"></div>
            <dialog
                open
                className="profile-modal"
                aria-labelledby="edit-profile-title"
                aria-modal="true"
            >
                <form onSubmit={handleSave}>
                    <h2 id="edit-profile-title">Edit Profile</h2>

                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            aria-label="Enter your username"
                        />
                    </div>

                    <div>
                        <label>Select Profile Picture:</label>
                        <div className="profile-picture-options">
                            {Object.entries(profilePictureMapper).map(([key, src]) => (
                                <button
                                    key={key}
                                    type="button"
                                    className={`profile-picture-option ${
                                        newProfilePic === key ? 'selected' : ''
                                    }`}
                                    onClick={() => setNewProfilePic(key)}
                                    aria-pressed={newProfilePic === key}
                                    aria-label={`Select profile picture ${key}`}
                                >
                                    <img src={src} alt={key} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="submit" className="save-button">
                            Save
                        </button>
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={closeProfileSettings}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </dialog>
        </>
    );
}

export default EditProfile;
