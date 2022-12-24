function Main() {
    return (
        <div className="main-page">
            <div className="main-content">
                {/* Исполнители */}
                <div className="section-wrapper">
                    <div className="section-caption">Популярные исполнители</div>
                    <div className="section-blocks" id="artists"></div>
                </div>
                {/* Популярные треки */}
                <div className="section-wrapper">
                    <div className="section-caption">Популярные треки</div>
                    <div className="section-blocks"  id="tracks"></div>
                </div>
            </div>
        </div>
    )
}

export default Main;