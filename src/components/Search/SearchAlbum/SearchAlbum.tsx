import { useEffect, useState } from "react";
import { sendAPIRequest } from "../../../server/api";
import { getTagsString } from "../../../utils/common";

export const SearchAlbum = (props) => {
    const {album} = props;
    console.log('SearchAlbum', album);
    const [albumInfo, setAlbumInfo] = useState({});

    useEffect(() => {
        sendAPIRequest({method: 'album.getInfo', album: album['name'], artist: album['artist'], limit: 1})
            .then((response) => setAlbumInfo(response['album']));
    }, [album['name'], album['artist']]);
    console.log('trackInfo', albumInfo);

    let albumName = album['name'];
    let albumLink = album['url'];
    let albumImg = '';
    let albumTags = '';

    if(typeof albumInfo !== 'undefined') {
        albumName = albumInfo['name'];
        albumLink = albumInfo['url'];
        try {
            albumImg = albumInfo['image'][3]['#text'];
            albumTags = getTagsString(albumInfo['tags']['tag']);
        }
        catch
        {}
    }

    return (
        <div className="section-blocks-item-box">
            <a className="section-blocks-item-search-link" href={albumLink}>
            <div className="blacker_blur"></div>
            <img className="section-blocks-item-box-img" src={albumImg} alt="" />
            <div className="section-blocks-item-box-description">
                <div className="text-main-white">{albumName}</div>
                <div className="text-secondary">{albumTags}</div>
            </div>
            </a>
        </div>
    )
}