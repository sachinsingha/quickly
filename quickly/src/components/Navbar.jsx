import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMoon, faSun, faCog } from '@fortawesome/free-solid-svg-icons';

function Navbar({ toggleSidebar, toggleTheme, openModal, isDarkMode, translations }) {
    return (
        <nav className="navbar">
            <h1>{translations.appTitle}</h1>
            <div className="nav-buttons">
                <button onClick={toggleSidebar} title={translations.categories.all}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <button onClick={toggleTheme} title={translations.modal.toggleTheme || 'Toggle Theme'}>
                    <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
                </button>
                <button onClick={openModal} title={translations.modal.title}>
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
