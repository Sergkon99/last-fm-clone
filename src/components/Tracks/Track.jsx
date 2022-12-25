import { useState, useEffect } from 'react';
import { sendAPIRequest } from '../../server/api';
import { getTagsString } from '../../utils/common'

export const Track = (props) => {
    const {track} = props;
    console.log('track', track);
    const [trackInfo, setTrackInfo] = useState({});

    useEffect(() => {
        sendAPIRequest({method: 'track.getInfo', track: track['name'], artist: track['artist']['name'], limit: 1})
            .then((response) => setTrackInfo(response['track']));
    }, []);
    console.log('trackInfo', trackInfo);

    let trackTitle = track['name'];
    let trackLink = track['url'];
    let trackArtistName = track['artist']['name'] || 'Неизвестный исполнитель';
    let trackImg = track['image'][3]['#text'];
    let tracksTags = ''

    if(typeof trackInfo !== 'undefined') {
        trackTitle = trackInfo['name'];
        trackLink = trackInfo['url'];
        try {
            trackArtistName = (trackInfo['artist'] ?? {})['name'] || 'Неизвестный исполнитель';
            trackImg = (trackInfo['album'] ?? {})['image'][3]['#text'];
            tracksTags = getTagsString(trackInfo['toptags']['tag']);
        }
        catch
        {}
    }

    return (
        <div className="section-blocks-rect-item">
            <a href={trackLink}>
                <img className="section-blocks-rect-item-img" src={trackImg} alt="" />
            </a>
            <div className="section-blocks-rect-item-description">
                <div className="text-main">{trackTitle}</div>
                <div className="text-main">{trackArtistName}</div>
                <div className="text-secondary">{tracksTags}</div>
            </div>
        </div>
    )
}