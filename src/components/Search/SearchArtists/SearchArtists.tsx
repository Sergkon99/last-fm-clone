import { SearchArtist } from "../SearchArtist/SearchArtist"
import { sendAPIRequest } from "../../../server/api"
import { useEffect, useState } from "react";

export const SearchArtists = (props) => {
    const {search} = props
    const [artsits, setArtists] = useState([]);
    useEffect(() => {
        sendAPIRequest({method: 'artist.search', artist: search, limit: 8})
            .then((response) => setArtists(response['results']['artistmatches']['artist']));
    }, [search]);

    return (
        <div className="section-wrapper">
            <div className="section-subcaption">Исполнители</div>
            <div className="section-blocks" id="search-artists">
                {artsits.map((artist, idx) => { return <SearchArtist artist={artist} key={artist.name + idx}/>; })}
            </div>
            <a className="section-more-results" href="https://www.last.fm/">Больше исполнителей...</a>
        </div>
    )
}