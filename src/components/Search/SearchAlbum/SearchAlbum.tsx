export const SearchAlbum = () => {
    return (
        <div className="section-blocks-item-box">
            <a className="section-blocks-item-search-link" href="albumLink">
            <div className="blacker_blur"></div>
            <img className="section-blocks-item-box-img" src="albumImg" alt="" />
            <div className="section-blocks-item-box-description">
                <div className="text-main-white">albumName</div>
                <div className="text-secondary">albumTags</div>
            </div>
            </a>
        </div>
    )
}