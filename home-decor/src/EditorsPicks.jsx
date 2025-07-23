import React from 'react';
import AddToSavedEdits from './AddToSavedEdits';
import './EditorsPicks.css';

function EditorPicks({ editorsPicks, toggleSaveEdit, isItemSaved }) {
    return (
        <div className="editors-picks-container">
            <h2 className="editors-picks-title">Editor's Picks</h2>
            <div className="editors-picks-grid">
                {editorsPicks.map((item, index) => (
                    <div key={index} className="editors-picks-item">
                        <div className="editors-picks-image-container">
                            <img
                                src={item.imageUrl}
                                alt={item.altText}
                                className="editors-inspiration-item-image"
                            />
                            <AddToSavedEdits
                                id={item.id}
                                title={item.title}
                                image={item.imageUrl}
                                description={item.description}
                                toggleSaveEdit={toggleSaveEdit}
                                isSaved={isItemSaved(item)}
                            />
                        </div>
                        <div className="editors-picks-info">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EditorPicks;
