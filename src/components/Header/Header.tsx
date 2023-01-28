import { HeaderSearch } from "./HeaderSearch"

export const Header = () => {
    return (
        <div className="header">
            <a className="header-link" href="https://www.last.fm/">Last.fm</a>
            <HeaderSearch />
        </div>
    )
}