export const SearchTrack = () => {
    return (
        <a className="section-list-item remove-link-decoration" href="trackLink">
            <img className="section-list-item-column" src="trackImg" alt="" />
            <div className="section-list-item-column">trackTitle</div>
            <div className="section-list-item-column">trackArtistName</div>
            <div className="section-list-item-column">getDurationString(trackDuration)</div>
        </a>
    )
}