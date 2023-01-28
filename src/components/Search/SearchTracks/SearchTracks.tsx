import { useEffect, useState } from "react";
import { sendAPIRequest } from "../../../server/api";
import { SearchTrack } from "../SearchTrack/SearchTrack"

export const SearchTracks = (props) => {
    const {search} = props
    const [tracks, setTracks] = useState([]);
    useEffect(() => {
        sendAPIRequest({method: 'track.search', track: search, limit: 8})
            .then((response) => setTracks(response['results']['trackmatches']['track']));
    }, [search]);

    return (
        <div className="section-wrapper">
            <div className="section-subcaption">Треки</div>
            <div className="section-list" id="search-tracks">
                {tracks.map((track, idx) => { return <SearchTrack track={track} key={track.name + idx}/>; })}
            </div>
            <a className="section-more-results" href="https://www.last.fm/">Больше треков...</a>
        </div>
    )
}