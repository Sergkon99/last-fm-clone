import { useEffect, useState } from "react";
import { sendAPIRequest } from "../../../server/api";
import { getTagsString } from "../../../utils/common";

export const SearchArtist = (props) => {
    const {artist} = props;
    console.log('SearchArtist', artist);
    const [artistInfo, setArtistInfo] = useState({});

    useEffect(() => {
        sendAPIRequest({method: 'artist.getInfo', mbid: artist['mbid'], limit: 1})
            .then((response) => setArtistInfo(response['artist']));
    }, [artist['mbid']]);
    console.log('SearchArtist artistInfo', artistInfo);

    let artistName = artist['name'];
    let artistLink = artist['url'];
    let artistImg = artist['image'][3]['#text'];
    let artistTags = ''

    if(typeof artistInfo !== 'undefined') {
        artistName = artistInfo['name'];
        artistLink = artistInfo['url'];
        try {
            artistTags = getTagsString(artistInfo['toptags']['tag']);
        }
        catch
        {}
    }
    return (
        <a className="section-blocks-item-ring" href={artistLink}>
            <img className="section-blocks-item-ring-img" src={artistImg} alt={artistName} />
            <div className="section-blocks-item-ring-description">
                <div className="text-main">{artistName}</div>
                <div className="text-secondary">{artistTags}</div>
            </div>
        </a>
    )
}