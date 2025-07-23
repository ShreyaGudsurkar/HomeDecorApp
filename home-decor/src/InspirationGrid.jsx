import AddToSavedEdits from './AddToSavedEdits';
import './InspirationGrid.css';

function InspirationGrid({ inspirations, toggleSaveEdit, isItemSaved }) {
    return (
        <div className="inspiration-grid">
            {inspirations.map((item, index) => (
                <div key={index} className="inspiration-item">
                    <div className="image-container">
                        <img src={item.imageUrl} alt={item.altText} className="inspiration-item-image" />
                        <AddToSavedEdits
                            id={item.id}
                            title={item.title}
                            image={item.imageUrl}
                            description={item.description}
                            toggleSaveEdit={toggleSaveEdit}
                            isSaved={isItemSaved(item)}
                        />
                    </div>
                    <div className="inspiration-info">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default InspirationGrid;
