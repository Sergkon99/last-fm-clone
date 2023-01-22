import { useState, useEffect } from 'react';
import { sendAPIRequest } from '../../server/api';
import { getTagsString } from '../../utils/common'

export const Artist = (props) => {
    const {artist} = props;
    const [artistInfo, setArtistInfo] = useState({
        'name': artist['name'],
        'link': artist['url'],
        'img': artist['image'][3]['#text'],
        'tags': ''
    });
    const [fullArtistInfo, setFullArtistInfo] = useState({});

    useEffect(() => {
        sendAPIRequest({method: 'artist.getInfo', mbid: artist['mbid'], limit: 1})
            .then((response) => {
                const artist = response['artist'];
                if(artist)
                    setFullArtistInfo({
                        'name': artistInfo['name'] || artist['name'],
                        'link': artistInfo['url'] || artist['url'],
                        'img': artistInfo['img'],
                        'tags': getTagsString(artist['tags'] ? artist['tags']['tag'] : '')
                    });
            });
    }, []);

    useEffect(() => {
        setArtistInfo({...artistInfo, ...fullArtistInfo});
    }, [fullArtistInfo]);

    return (
        <a className="section-blocks-item-ring" href={artistInfo['link']}>
            <img className="section-blocks-item-ring-img" src={artistInfo['img']} alt={artistInfo['name']} />
            <div className="section-blocks-item-ring-description">
                <div className="text-main">{artistInfo['name']}</div>
                <div className="text-secondary">{artistInfo['tags']}</div>
            </div>
        </a>
    )
}