function Header() {
    return (
        <div className="header">
            <a className="header-link" href="https://www.last.fm/">Last.fm</a>
            <div className="header-search">
                <input placeholder="Поиск музыки..." />
            </div>
        </div>
    )
}

export default Header;