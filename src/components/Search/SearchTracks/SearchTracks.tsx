import { SearchTrack } from "../SearchTrack/SearchTrack"

export const SearchTracks = () => {
    return (
        <div className="section-wrapper">
            <div className="section-subcaption">Треки</div>
            <div className="section-list" id="search-tracks">
                <SearchTrack />
                <SearchTrack />
                <SearchTrack />
            </div>
            <a className="section-more-results" href="https://www.last.fm/">Больше треков...</a>
        </div>
    )
}