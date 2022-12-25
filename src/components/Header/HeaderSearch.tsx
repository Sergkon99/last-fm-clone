import { useNavigate } from "react-router-dom";

export const HeaderSearch = () => {
    const navigate = useNavigate();

    const keyDownhandler = (e) => {
        if(e.key !== 'Enter')
            return;

        const searchValue = e.target.value;
        if(searchValue) {
            navigate(`/search/${searchValue}`);
        }
        e.stopPropagation();
    }

    return (
        <div className="header-search">
            <input placeholder="Поиск музыки..." onKeyDown={keyDownhandler}/>
        </div>
    )
}