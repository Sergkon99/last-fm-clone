import { Artist } from "./Artist"

export const Artists = () => {
    return (
        <div className="section-wrapper">
            <div className="section-caption">Популярные исполнители</div>
            <div className="section-blocks" id="artists">
                <Artist />
                <Artist />
                <Artist />
                <Artist />
                <Artist />
                <Artist />
                <Artist />
                <Artist />
            </div>
        </div>
    )
}