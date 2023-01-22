import { useEffect, useState } from "react";
import { sendAPIRequest } from "../../../server/api";
import { getTagsString } from "../../../utils/common";

export const SearchArtist = (props) => {
    const {artist} = props;
    const [artistInfo, setArtistInfo] = useState({
        'link': artist['url'],
        'name': artist['name'],
        'img': artist['image'][3]['#text'],
        'tags': ''
    });

    useEffect(() => {
        sendAPIRequest({method: 'artist.getInfo', mbid: artist['mbid'], limit: 1})
            .then((response) => {
                const artist = response['artist'];
                if(artist)
                    setArtistInfo({
                        ...artistInfo,
                        'tags': getTagsString(artist['tags'] ? artist['tags']['tag'] : '')
                    });
            });
    }, [artist]);

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