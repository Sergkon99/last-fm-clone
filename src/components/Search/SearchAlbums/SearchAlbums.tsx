import { SearchAlbum } from "../SearchAlbum/SearchAlbum"

export const SearchAlbums = () => {
    return (
        <div className="section-wrapper">
            <div className="section-subcaption">Альбомы</div>
            <div className="section-blocks" id="search-albums">
                <SearchAlbum />
                <SearchAlbum />
                <SearchAlbum />
                <SearchAlbum />
            </div>
            <a className="section-more-results" href="https://www.last.fm/">Больше альбомов...</a>
        </div>
    )
}