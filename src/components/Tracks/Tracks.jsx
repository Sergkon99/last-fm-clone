import { useState, useEffect } from 'react';
import { Track } from "./Track"
import { sendAPIRequest } from '../../server/api';

export const Tracks = () => {
    const [tracks, setTracks] = useState([]);
    useEffect(() => {
        sendAPIRequest({method: 'chart.gettoptracks', limit: 8})
            .then((response) => setTracks(response['tracks']['track']));
    }, []);
    console.log('top tracks', tracks);

    return (
        <div className="section-wrapper">
            <div className="section-caption">Популярные треки</div>
            <div className="section-blocks"  id="tracks">
                {tracks.map((track) => { return <Track track={track} key={track.name}/>; })}
            </div>
        </div>
    )
}