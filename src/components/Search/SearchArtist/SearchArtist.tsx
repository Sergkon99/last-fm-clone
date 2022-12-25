export const SearchArtist = () => {
    return (
        <a className="section-blocks-item-ring" href="artistLink">
            <img className="section-blocks-item-ring-img" src="artistImg" alt="artistName" />
            <div className="section-blocks-item-ring-description">
                <div className="text-main">artistName</div>
                <div className="text-secondary">artistTags</div>
            </div>
        </a>
    )
}