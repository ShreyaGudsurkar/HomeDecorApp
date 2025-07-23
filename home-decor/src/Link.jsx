import './Link.css';

function Link({ link, gotoPage,linkName }) {

    console.log("in Link"+link);
    return (
        <div>
            {link && (
                <a
                    href={link}
                    onClick={gotoPage}
                    className="cta-link"
                >
                    {linkName}
                </a>
            )}
        </div>
    );
}

export default Link;