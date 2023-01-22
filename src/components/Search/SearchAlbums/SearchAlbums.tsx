import { useEffect, useState } from "react";
import { sendAPIRequest } from "../../../server/api";
import { SearchAlbum } from "../SearchAlbum/SearchAlbum"

export const SearchAlbums = (props) => {
    const {search} = props
    const [albums, setAlbums] = useState([]);
    useEffect(() => {
        sendAPIRequest({method: 'album.search', album: search, limit: 8})
            .then((response) => setAlbums(response['results']['albummatches']['album']));
    }, [search]);

    return (
        <div className="section-wrapper">
            <div className="section-subcaption">Альбомы</div>
            <div className="section-blocks" id="search-albums">
                {albums.map((album, idx) => { return <SearchAlbum album={album} key={album.name + idx}/>; })}
            </div>
            <a className="section-more-results" href="https://www.last.fm/">Больше альбомов...</a>
        </div>
    )
}