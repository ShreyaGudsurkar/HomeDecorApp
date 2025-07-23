import {useEffect, useState} from 'react';
import "./App.css";
import Header from './Header';
import Home from './Home';
import About from './About';
import DesignVault from "./DesignVault";
import Profile from './EditProfile.jsx';
import Footer from './Footer';
import profilePictureMapper from './profilePictureMapper.js';
import MySavedEdit from './MySavedEdit.jsx';
import SkipLinks from "./SkipLinks.jsx";
import ProductCatalog from './ProductCatalog';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import ModalWrapper from "./ModalWrapper.jsx";
import StoreFavorites from "./StoreFavorites.jsx";



function App() {
    const [page, setPage] = useState('#home');
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [profile, setProfile] = useState({
        username: '',
        profilePic: 'profilePic1',
    });
    const [showProfileSettings, setShowProfileSettings] = useState(false);
    const [savedEdits, setSavedEdits] = useState([]);

    const handleLoginSuccess = (user) => {
        setLoggedInUser(user);
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        setShowLogin(false);
    };

    const handleLogout = () => {
        setLoggedInUser(null);
        localStorage.removeItem('loggedInUser');
        setPage('#home');
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser));
        }
    }, []);


    const handleRegisterSuccess = () => {
        setShowRegister(false);
        setShowLogin(true);
    };

    function gotoPage(e) {
        e.preventDefault();
        setPage(e.target.hash);
        setShowProfileSettings(false);
    }

    function openProfileSettings() {
        setShowProfileSettings(true);
    }

    function closeProfileSettings() {
        setShowProfileSettings(false);
    }

    const toggleSaveEdit = (item) => {
        setSavedEdits((prev) => {

            const exists = prev.some((edit) => edit.id === item.id);

            if (exists) {
                const updatedEdits = prev.filter((edit) => edit.id !== item.id);
                return updatedEdits;
            } else {

                const updatedEdits = [...prev, item];
                return updatedEdits;
            }
        });
    };

    useEffect(() => {
        const hash = window.location.hash;

        if (hash.startsWith('#store-success')) {
            setPage('#store');
        } else if (hash === '#store-cancel') {
            setPage('#store');
        } else {
            setPage(hash || '#home');
        }
    }, []);



    const removeFromSaved = (item) => {
        setSavedEdits((prev) => prev.filter((edit) => edit.title !== item.title));
    };

    return (
        <div className="app">
            <SkipLinks />
            <Header
                gotoPage={gotoPage}
                profile={loggedInUser ?{
                    ...profile,
                    profilePicSrc: profilePictureMapper[profile.profilePic],
                    username: loggedInUser.username
                }: null}
                openProfileSettings={openProfileSettings}
                onLoginClick={() => setShowLogin(true)}
                onRegisterClick={() => setShowRegister(true)}
                onLogoutClick={handleLogout}
            />
            <main className="main-content" id="main-content">
                {showProfileSettings && (
                    <Profile
                        profile={profile}
                        setProfile={setProfile}
                        closeProfileSettings={closeProfileSettings}
                    />
                )}
                {!showProfileSettings && (
                    <>
                        {page === '#home' && <Home />}
                        {page === '#about' && <About gotoPage={gotoPage} />}
                        {page === '#designVault' && (
                            <DesignVault
                                savedEdits={savedEdits}
                                toggleSaveEdit={toggleSaveEdit}
                            />
                        )}
                        {page === '#mySavedEdit' && (
                            <MySavedEdit
                                savedEdits={savedEdits}
                                removeFromSaved={removeFromSaved}
                            />
                        )}
                        {page === '#storeFavorites' && (
                            <StoreFavorites
                                loggedInUser={loggedInUser}
                            />
                        )}
                        {page === '#store' && (
                            <ProductCatalog
                                loggedInUser={loggedInUser}
                                toggleSaveEdit={toggleSaveEdit}
                                setShowLogin={setShowLogin}
                            />
                        )}

                    </>
                )}
            </main>
            {showLogin && (
                <ModalWrapper title="Login" onClose={() => setShowLogin(false)}>
                    <LoginForm
                        onLoginSuccess={handleLoginSuccess}
                        onClose={() => setShowLogin(false)}
                        onRegisterClick={() => {
                            setShowLogin(false);
                            setShowRegister(true);
                        }}
                    />
                </ModalWrapper>
            )}

            {showRegister && (
                <ModalWrapper title="Register" onClose={() => setShowRegister(false)}>
                    <RegisterForm
                        onRegisterSuccess={handleRegisterSuccess}
                    />
                </ModalWrapper>
            )}


            <Footer />
        </div>
    );
}

export default App;
