import './PageNav.css';
import menu from './menu';

function PageNav({ className, gotoPage }) {


    const list = menu.map( item => {
        return (
            <li key={item.name} className="global-nav__item">
                <a
                    className="global-nav__link"
                    href={item.path}
                    onClick={gotoPage}
                >
                    {item.name}
                </a>
            </li>
        );
    });

    return (
        <nav className={`global-nav ${className}`}>
            <ul className="global-nav__list">
                { list }
            </ul>
        </nav>
    );
}

export default PageNav;