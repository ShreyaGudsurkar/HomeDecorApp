import React from 'react';

function FilterSection({ roomType, setRoomType, designStyle, setDesignStyle }) {
    return (
        <div className="filter-section">

            <div className="room-type-filters">
                <button onClick={() => setRoomType('All')}>All Rooms</button>
                <button onClick={() => setRoomType('Living Room')}>Living Room</button>
                <button onClick={() => setRoomType('Bedroom')}>Bedroom</button>
                <button onClick={() => setRoomType('Kitchen')}>Kitchen</button>
            </div>


            {roomType !== 'All' && (
                <div className="style-filters">
                    <button onClick={() => setDesignStyle('All')}>All Styles</button>
                    <button onClick={() => setDesignStyle('Minimalist')}>Minimalist</button>
                    <button onClick={() => setDesignStyle('Bohemian')}>Bohemian</button>
                    <button onClick={() => setDesignStyle('Rustic')}>Rustic</button>
                </div>
            )}
        </div>
    );
}

export default FilterSection;
