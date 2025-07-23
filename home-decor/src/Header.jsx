import React, { useState } from 'react';
import './Header.css';
import PageNav from './PageNav.jsx';

function Header({ gotoPage, profile, openProfileSettings,onLogoutClick }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="header">
            <div className="header-info">
                <img
                    src="/images/sabe-casa-logo.png"
                    className="header__logo"
                    alt="sabe-casa-logo"
                />
                <h1 className="header__title">Sabe Casa</h1>
                {profile && (
                <div className="profile__dropdown-container">
                    <img
                        src={(profile && profile.profilePicSrc) || '/images/person-icon.png'}
                        className="profile__picture"
                        alt="Profile Menu"
                        aria-expanded={isDropdownOpen}
                        onClick={toggleDropdown}
                    />
                    {isDropdownOpen && (
                        <ul className="dropdown-menu">
                            <li className="dropdown-item">
                                <p>{profile?.username || 'Guest'}</p>
                            </li>
                            <li className="dropdown-item">
                                <a href="#mySavedEdit" onClick={gotoPage}>
                                    My Saved Edit
                                </a>
                            </li>
                            <li className="dropdown-item">
                                <a href="#storeFavorites" onClick={gotoPage}>
                                    Store Favorites
                                </a>
                            </li>
                            <li className="dropdown-item">
                                <button onClick={openProfileSettings}>Edit Profile</button>
                            </li>
                            <li className="dropdown-item">
                                <button onClick={onLogoutClick}>Logout</button>
                            </li>
                        </ul>
                    )}
                </div>
                )}
            </div>

            <div className="header__nav-container">
            <div className="hamburger-menu" onClick={toggleMenu}>
                    <img src="/images/hamburger-menu.png" alt="hamburger menu"/>
                </div>
                <div className={`header__nav ${isMenuOpen ? 'open' : ''}`}>
                    <PageNav gotoPage={gotoPage}/>
                </div>
            </div>

        </header>
    );
}

export default Header;
