import React, { useState } from "react";
import seasonalTips from "./seasonalTips";
import NewsletterForm from "./NewsletterForm";
import "./Home.css";

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % seasonalTips.length);
    };

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + seasonalTips.length) % seasonalTips.length);
    };

    const toggleFormModal = () => {
        setIsFormOpen(!isFormOpen);
    };

    return (
        <div className="home-page">
            <h2>Where Inspiration Meets Your Home</h2>
            <h3>Your Seasonal Style Guide</h3>

            <div className="carousel-container">
                <button onClick={prevSlide} className="carousel-button prev">‹</button>
                <div className="carousel">
                    {seasonalTips.map((tip, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === currentIndex ? "active" : ""}`}
                            style={{
                                transform: `translateX(${(index - currentIndex) * 100}%)`,
                            }}
                        >
                            <img src={tip.imageUrl} alt={tip.altText} />
                            <div className="carousel-content">
                                <h4>{tip.title}</h4>
                                <p>{tip.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={nextSlide} className="carousel-button next">›</button>
            </div>

            <button onClick={toggleFormModal} className="open-form-button">Subscribe to Newsletter</button>

            {isFormOpen && (
                <>
                    <div className="modal-backdrop" onClick={toggleFormModal}></div>
                    <dialog open className="form-modal">
                        <NewsletterForm onClose={toggleFormModal} />
                    </dialog>
                </>
            )}
        </div>
    );
};

export default Home;
