import React, { useState } from 'react';
import './DesignVault.css';
import Tabs from './Tabs';
import FilterSection from './FilterSection';
import InspirationGrid from './InspirationGrid';
import EditorsPicks from './EditorsPicks';
import inspirations from './inspirationsData.js';
import editorsPicks from './editorsPicksData';

function DesignVault({ savedEdits, toggleSaveEdit }) {
    const [roomType, setRoomType] = useState('All');
    const [designStyle, setDesignStyle] = useState('All');
    const [activeTab, setActiveTab] = useState('inspirations');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        if (tabName === 'inspirations') {
            setRoomType('All');
            setDesignStyle('All');
        }
    };

    const handleRoomTypeChange = (room) => {
        setRoomType(room);
        setDesignStyle('All');
    };

    const isItemSaved = (item) => {
        return savedEdits.some((edit) => edit.id === item.id);
    };

    const filteredInspirations = inspirations.filter((item) => {
        const roomMatch = roomType === 'All' || item.roomType === roomType;
        const styleMatch = designStyle === 'All' || item.designStyle === designStyle;
        return roomMatch && styleMatch;
    });

    return (
        <div className="design-vault">
            <header className="design-vault-header">
                <h1 className="title">Unlock Your Perfect Space</h1>
                <p>Browse our collection of beautifully designed rooms and find inspiration for your next project.</p>
            </header>

            <Tabs activeTab={activeTab} setActiveTab={handleTabClick} />

            {activeTab === 'inspirations' && (
                <>
                    <FilterSection
                        roomType={roomType}
                        setRoomType={handleRoomTypeChange}
                        designStyle={designStyle}
                        setDesignStyle={setDesignStyle}
                    />
                    <InspirationGrid
                        inspirations={filteredInspirations}
                        toggleSaveEdit={toggleSaveEdit}
                        isItemSaved={isItemSaved}
                    />
                </>
            )}

            {activeTab === 'editorsPicks' && (
                <EditorsPicks
                    editorsPicks={editorsPicks}
                    toggleSaveEdit={toggleSaveEdit}
                    isItemSaved={isItemSaved}
                />
            )}
        </div>
    );
}

export default DesignVault;
