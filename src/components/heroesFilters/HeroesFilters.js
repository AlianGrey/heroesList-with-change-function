// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {useHttp} from '../../hooks/http.hook';
import Spinner from "../spinner/Spinner";
import { filtersLoading, filtersLoaded, filtersLoadingError } from '../../actions'

const HeroesFilters = () => {
    const { filters, filtersLoadingStatus } = useSelector( state => state )
    const dispatch = useDispatch()
    const { request } = useHttp()

    useEffect(() => {
        dispatch(filtersLoading())
        request("http://localhost:3001/filters")
            .then( data => dispatch(filtersLoaded(data)))
            .catch( () => dispatch(filtersLoadingError()))
            // eslint-disable-next-line
    }, [])

    if ( filtersLoadingStatus === 'loading' ) {
        return <div className="d-flex justify-content-center"><Spinner/></div>
    } else if ( filtersLoadingStatus === 'error' ) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const getFilters = (arr) => {
        return arr.map(item => {
            return <button key={item.id} className={`btn ${item.class}`}>{item.label}</button>
        })
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
{/*                     <button className="btn btn-outline-dark active">Все</button> */}
                    { getFilters(filters) }
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;