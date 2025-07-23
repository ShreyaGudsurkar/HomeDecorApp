import React from 'react';
import './MySavedEdit.css';

function MySavedEdit({ savedEdits, removeFromSaved }) {

    console.log("My Saved Edit Items:", savedEdits);

    return (
        <div className="my-saved-edit">
            <h2>My Saved Edit</h2>
            {savedEdits.length === 0 ? (
                <p>No items saved yet!</p>
            ) : (
                <div className="saved-edit-grid">
                    {savedEdits.map((item, index) => (
                        <div key={index} className="saved-edit-item">
                            <img src={item.image} alt={item.title} className="saved-edit-img" />
                            <div className="saved-edit-info">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <button
                                    className="remove-button"
                                    onClick={() => removeFromSaved(item)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MySavedEdit;
