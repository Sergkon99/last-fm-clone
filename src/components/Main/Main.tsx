import { Artists } from "../Artists/Artists"
import { Tracks } from "../Tracks/Tracks"

export const Main = () => {
    return (
        <div className="main-page">
            <div className="main-content">
                {/* Исполнители */}
                <Artists />
                {/* Популярные треки */}
                <Tracks />
            </div>
        </div>
    )
}