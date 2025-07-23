import React, { useState } from "react";
import "./NewsletterForm.css";

const NewsletterForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        confirmEmail: "",
        subscribe: false,
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        confirmEmail: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission state

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        if (name === "name" && value.trim() === "") {
            setErrors((prev) => ({ ...prev, name: "Please provide a name!" }));
        } else if (name === "name") {
            setErrors((prev) => ({ ...prev, name: "" }));
        }

        if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
            setErrors((prev) => ({ ...prev, email: "Please provide a valid email!" }));
        } else if (name === "email") {
            setErrors((prev) => ({ ...prev, email: "" }));
        }

        if (name === "confirmEmail") {
            if (value.trim() === "") {
                setErrors((prev) => ({ ...prev, confirmEmail: "Please confirm your email!" }));
            } else if (value !== formData.email) {
                setErrors((prev) => ({ ...prev, confirmEmail: "Emails do not match!" }));
            } else {
                setErrors((prev) => ({ ...prev, confirmEmail: "" }));
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            setErrors((prev) => ({ ...prev, name: "Please provide a name!" }));
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setErrors((prev) => ({ ...prev, email: "Please provide a valid email!" }));
            return;
        }
        if (formData.confirmEmail !== formData.email) {
            setErrors((prev) => ({ ...prev, confirmEmail: "Emails do not match!" }));
            return;
        }

        setIsSubmitted(true);
    };

    const handleOkClick = () => {
        setIsSubmitted(false);
        onClose();
    };

    if (isSubmitted) {
        return (
            <div className="thank-you-message">
                <h2>Thank You!</h2>
                <p>Your details have been submitted successfully.</p>
                <button onClick={handleOkClick} className="ok-button">OK</button>
            </div>
        );
    }

    return (
        <form className="newsletter-form" onSubmit={handleSubmit}>
            <h2>Subscribe to Our Newsletter</h2>
            <p>Stay updated with the latest trends and home decor ideas.</p>

            <div className="form-elements">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                />
                {errors.name && <span className="feedback-message">{errors.name}</span>}
            </div>

            <div className="form-elements">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="feedback-message">{errors.email}</span>}
            </div>

            <div className="form-elements">
                <label htmlFor="confirmEmail">Confirm Email:</label>
                <input
                    type="email"
                    id="confirmEmail"
                    name="confirmEmail"
                    value={formData.confirmEmail}
                    onChange={handleChange}
                    className={errors.confirmEmail ? "error" : ""}
                />
                {errors.confirmEmail && (
                    <span className="feedback-message">{errors.confirmEmail}</span>
                )}
            </div>

            <div className="form-elements">
                <label>
                    <input
                        type="checkbox"
                        name="subscribe"
                        checked={formData.subscribe}
                        onChange={handleChange}
                    />
                    Subscribe to updates and offers
                </label>
            </div>

            <div className="form-actions">
                <button type="submit" className="submit-button">
                    Submit
                </button>
                <button type="button" className="cancel-button" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default NewsletterForm;
