import React from 'react';

function Tabs({ activeTab, setActiveTab }) {
    return (
        <div className="tabs">
            <button
                className={`tab-button ${activeTab === 'inspirations' ? 'active' : ''}`}
                onClick={() => setActiveTab('inspirations')}
            >
                All Inspirations
            </button>
            <button
                className={`tab-button ${activeTab === 'editorsPicks' ? 'active' : ''}`}
                onClick={() => setActiveTab('editorsPicks')}
            >
                Editor's Picks
            </button>
        </div>
    );
}

export default Tabs;
