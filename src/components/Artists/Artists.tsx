import { useState, useEffect } from 'react';
import { sendAPIRequest } from '../../server/api';
import { Artist } from "./Artist"

export const Artists = () => {
    const [artsits, setArtists] = useState([]);
    useEffect(() => {
        sendAPIRequest({method: 'chart.gettopartists', limit: 8})
            .then((response) => setArtists(response['artists']['artist']));
    }, []);

    return (
        <div className="section-wrapper">
            <div className="section-caption">Популярные исполнители</div>
            <div className="section-blocks" id="artists">
                {artsits.map((artist) => { return <Artist artist={artist} key={artist.name}/>; })}
            </div>
        </div>
    )
}