import React from "react";
import "./SkipLinks.css";

const SkipLinks = () => {
    return (
        <nav aria-label="Skip links" className="skip-links">
            <a href="#main-content" className="skip-link">
                Skip to Main Content
            </a>
        </nav>
    );
};

export default SkipLinks;
