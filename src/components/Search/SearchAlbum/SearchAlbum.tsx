import { useEffect, useState } from "react";
import { sendAPIRequest } from "../../../server/api";
import { getTagsString } from "../../../utils/common";

export const SearchAlbum = (props) => {
    const {album} = props;
    const [albumInfo, setAlbumInfo] = useState({
        'link': album['url'],
        'name': album['name'],
        'img': '',
        'tags': ''
    });

    useEffect(() => {
        sendAPIRequest({method: 'album.getInfo', album: album['name'], artist: album['artist'], limit: 1})
            .then((response) => {
                const album = response['album'];
                if(album)
                    setAlbumInfo({
                        ...albumInfo,
                        'img': album['image'] ? album['image'][3]['#text'] : '',
                        'tags': getTagsString(albumInfo['tags'] ? albumInfo['tags']['tag'] : '')
                    });
            });
    }, [album]);

    return (
        <div className="section-blocks-item-box">
            <a className="section-blocks-item-search-link" href={albumInfo['link']}>
            <div className="blacker_blur"></div>
            <img className="section-blocks-item-box-img" src={albumInfo['img']} alt="" />
            <div className="section-blocks-item-box-description">
                <div className="text-main-white">{albumInfo['name']}</div>
                <div className="text-secondary">{albumInfo['tags']}</div>
            </div>
            </a>
        </div>
    )
}