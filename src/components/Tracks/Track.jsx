import { useState, useEffect } from 'react';
import { sendAPIRequest } from '../../server/api';
import { getTagsString } from '../../utils/common'

export const Track = (props) => {
    const {track} = props;
    const [trackInfo, setTrackInfo] = useState({
        'title': track['name'],
        'link': track['url'],
        'artist': track['artist']['name'] || 'Неизвестный исполнитель',
        'img': track['image'][3]['#text'],
        'tags': ''
    });
    const [fullTrackInfo, setFullTrackInfo] = useState({});

    useEffect(() => {
        sendAPIRequest({method: 'track.getInfo', track: track['name'], artist: track['artist']['name'], limit: 1})
            .then((response) => {
                const track = response['track'];
                if(track)
                    setFullTrackInfo({
                        'title': trackInfo['title'] || track['name'],
                        'link': trackInfo['link'] || track['url'],
                        'artist': (track['artist'] ? track['artist']['name'] : trackInfo['artist']) || 'Неизвестный исполнитель',
                        'img':  track['album'] ? track['album']['image'][3]['#text'] : trackInfo['img'],
                        'tags': getTagsString(track['toptags'] ? track['toptags']['tag'] : '')
                    });
            });
    }, []);

    useEffect(() => {
        setTrackInfo({...trackInfo, ...fullTrackInfo});
    }, [fullTrackInfo]);

    return (
        <div className="section-blocks-rect-item">
            <a href={trackInfo['link']}>
                <img className="section-blocks-rect-item-img" src={trackInfo['img']} alt="" />
            </a>
            <div className="section-blocks-rect-item-description">
                <div className="text-main">{trackInfo['title']}</div>
                <div className="text-main">{trackInfo['artist']}</div>
                <div className="text-secondary">{trackInfo['tags']}</div>
            </div>
        </div>
    )
}