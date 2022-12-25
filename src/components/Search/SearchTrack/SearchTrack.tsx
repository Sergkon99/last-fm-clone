import { useEffect, useState } from "react";
import { sendAPIRequest } from "../../../server/api";
import { getDurationString, getTagsString } from "../../../utils/common";

export const SearchTrack = (props) => {
    const {track} = props;
    console.log('track', track);
    const [trackInfo, setTrackInfo] = useState({});

    useEffect(() => {
        sendAPIRequest({method: 'track.getInfo', track: track['name'], artist: track['artist']['name'], limit: 1})
            .then((response) => setTrackInfo(response['track']));
    }, [track['name'], track['artist']['name']]);
    console.log('trackInfo', trackInfo);

    let trackTitle = track['name'];
    let trackLink = track['url'];
    let trackArtistName = track['artist']['name'] || 'Неизвестный исполнитель';
    let trackImg = track['image'][3]['#text'];
    let tracksTags = '';
    let trackDuration = 0;

    if(typeof trackInfo !== 'undefined') {
        trackTitle = trackInfo['name'];
        trackLink = trackInfo['url'];
        try {
            trackArtistName = (trackInfo['artist'] ?? {})['name'] || 'Неизвестный исполнитель';
            trackImg = (trackInfo['album'] ?? {})['image'][3]['#text'];
            tracksTags = getTagsString(trackInfo['toptags']['tag']);
            trackDuration = Math.floor(parseInt(trackInfo['duration']) / 1000);
        }
        catch
        {}
    }

    return (
        <a className="section-list-item remove-link-decoration" href={trackLink}>
            <img className="section-list-item-column" src={trackImg} alt="" />
            <div className="section-list-item-column">{trackTitle}</div>
            <div className="section-list-item-column">{trackArtistName}</div>
            <div className="section-list-item-column">{getDurationString(trackDuration)}</div>
        </a>
    )
}