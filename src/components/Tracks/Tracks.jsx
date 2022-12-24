import { Track } from "./Track"

export const Tracks = () => {
    return (
        <div className="section-wrapper">
            <div className="section-caption">Популярные треки</div>
            <div className="section-blocks"  id="tracks">
                <Track />
                <Track />
                <Track />
                <Track />
                <Track />
                <Track />
            </div>
        </div>
    )
}