import React from 'react';
import Link from './Link';
import './About.css';

function About ({gotoPage}){

    return (
        <div className="about-page">

            <header className="about-header">
                <h2>Welcome to Sabe Casa</h2>
                <p>Your space. Your story. Let’s create something beautiful together.</p>
            </header>

            <section className="about-mission">
                <h3>Our Mission</h3>
                <p>
                    At Sabe Casa, we inspire and empower you to transform your living spaces
                    into personalized sanctuaries.
                </p>
            </section>

            <section className="about-features">
                <div className="feature">
                    <img src="/images/seasonal-decor-tips.jpg" alt="Fresh pink tulips with a woven basket on a table"/>
                    <h4>Seasonal Decor Tips</h4>
                    <p>Fresh ideas tailored to every season.</p>
                </div>
                <div className="feature">
                    <img src="/images/edit-studio.jpg" alt="a creative desk with magazine edits and laptop"/>
                    <h4>Build Your Edit Studio</h4>
                    <p>Save, organize, and visualize your designs.</p>
                </div>
                <div className="feature">
                    <img src="/images/inspiration-to-store.jpg" alt="Design board transitioning into a shopping experience"/>
                    <h4>From Inspiration to Purchase</h4>
                    <p>
                        Love something you saw in the Design Vault? Many of your favorite pieces can be found in our
                        Store, ready to be wishlisted or purchased.
                    </p>
                </div>
                <div className="feature">
                    <img src="/images/whats-next.jpg"
                         alt="Close-up of a paint roller applying a coat of light blue paint on a white wall"/>
                    <h4>What’s Next?</h4>
                    <p>
                        Imagine the freedom to design rooms with ease using an intuitive drag-and-drop tool.
                        A future feature to inspire creativity and transform ideas into beautifully designed spaces.
                    </p>
                </div>
            </section>


            <div className="cta-section">
                <h3>Ready to Explore?</h3>
                <p>Discover our curated designs and ideas in the Design Vault.</p>
                <Link link="#designVault" gotoPage={gotoPage} linkName="Go to Design Vault"/>
            </div>
        </div>
    );
}

export default About;
