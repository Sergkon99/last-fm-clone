import { useEffect, useState } from "react";
import { sendAPIRequest } from "../../../server/api";
import { getDurationString, getTagsString } from "../../../utils/common";

export const SearchTrack = (props) => {
    const {track} = props;
    const [trackInfo, setTrackInfo] = useState({
        'link': track['url'],
        'img': track['image'][3]['#text'],
        'title': track['name'],
        'artsitName': track['artist']['name'],
        'duration': '0'
    });

    useEffect(() => {
        sendAPIRequest({method: 'track.getInfo', track: track['name'], artist: track['artist'], limit: 1})
            .then((response) => {
                const track = response['track'];
                if(track)
                    setTrackInfo({
                        ...trackInfo,
                        'img': track['album'] ? track['album']['image'][3]['#text'] : trackInfo['img'],
                        'duration': getDurationString(Math.floor(parseInt(track['duration']) / 1000))
                    });
            });
    }, [track]);

    return (
        <a className="section-list-item remove-link-decoration" href={trackInfo['link']}>
            <img className="section-list-item-column" src={trackInfo['img']} alt="" />
            <div className="section-list-item-column">{trackInfo['title']}</div>
            <div className="section-list-item-column">{trackInfo['artsitName']}</div>
            <div className="section-list-item-column">{trackInfo['duration']}</div>
        </a>
    )
}