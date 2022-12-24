export const Track = () => {
    const trackTitle = 'trackTitle'; //trackInfo['name'];
    const trackLink = 'trackLink'; // trackInfo['url'];
    const trackArtistName = 'trackArtistName'; //(trackInfo['artist'] ?? {})['name'] || 'Неизвестный исполнитель';
    const trackImg = 'trackImg'; //(trackInfo['album'] ?? {})['image'][3]['#text'];
    const tracksTags = 'tracksTags'; //getTagsString(trackInfo['toptags']['tag']);

    return (
        <div className="section-blocks-rect-item">
            <a href={trackLink}>
                <img class="section-blocks-rect-item-img" src={trackImg} alt="" />
            </a>
            <div className="section-blocks-rect-item-description">
                <div className="text-main">{trackTitle}</div>
                <div className="text-main">{trackArtistName}</div>
                <div className="text-secondary">{tracksTags}</div>
            </div>
        </div>
    )
}