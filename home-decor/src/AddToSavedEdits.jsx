import './AddtoSavedEdits.css';


function AddToSavedEdits({ id, title, image, description, toggleSaveEdit, isSaved }) {

    const handleToggle = () => {
        toggleSaveEdit({ id, title, image, description });

    };

    return (
        <button
            className="favorite-icon"
            onClick={handleToggle}
            aria-label={isSaved ? "Remove from My Saved Edit" : "Add to My Saved Edit"}
        >
            <img
                src={isSaved ? "/images/heart-filled.png" : "/images/heart-outline.png"}
                alt={isSaved ? "Added to favorites" : "Removed from favorites"}
                className="favorite-icon-img"
            />
        </button>
    );
}

export default AddToSavedEdits;
