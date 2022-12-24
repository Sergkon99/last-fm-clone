export const Artist = () => {
    const artistName = 'artistName'; //artistInfo['name'];
    const artistLink = 'artistLink'; // artistInfo['url'];
    const artistImg = 'artistImg'; //artistInfo['image'][3]['#text'];
    const artistTags = 'artistTags'; //getTagsString(artistInfo['tags']['tag']);
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