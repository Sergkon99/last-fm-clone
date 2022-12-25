import { SearchArtist } from "../SearchArtist/SearchArtist"

export const SearchArtists = () => {
    return (
        <div className="section-wrapper">
            <div className="section-subcaption">Исполнители</div>
            <div className="section-blocks" id="search-artists">
                <SearchArtist />
                <SearchArtist />
                <SearchArtist />
                <SearchArtist />
            </div>
            <a className="section-more-results" href="https://www.last.fm/">Больше исполнителей...</a>
        </div>
    )
}