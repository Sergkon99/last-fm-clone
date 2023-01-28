import { useParams } from "react-router-dom";
import { SearchAlbums } from "./SearchAlbums/SearchAlbums";
import { SearchArtists } from "./SearchArtists/SearchArtists";
import { SearchTracks } from "./SearchTracks/SearchTracks";

export const Search = () => {
    const { searchValue } = useParams();

    return (
        <div className="main-page">
            <div className="search-content">
                <div className="section-caption" id="search-section-caption">Результаты поиска "{searchValue}"</div>
                {/* Поиск - исполнители */}
                <SearchArtists search={searchValue} />
                {/* Поиск - альбомы */}
                <SearchAlbums search={searchValue} />
                {/* Поиск - треки */}
                <SearchTracks search={searchValue} />
            </div>
        </div>
    )
}