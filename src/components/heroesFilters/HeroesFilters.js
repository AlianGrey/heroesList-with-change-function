import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {useHttp} from '../../hooks/http.hook';
import Spinner from "../spinner/Spinner";
import { filtersLoading, filtersLoaded, filtersLoadingError, setFilter } from '../../actions'
import classNames from "classnames";

const HeroesFilters = () => {
    const { filters, filtersLoadingStatus, activeFilter } = useSelector( state => state )
    const dispatch = useDispatch()
    const { request } = useHttp()
   
    useEffect(() => {
        dispatch(filtersLoading())
        request("http://localhost:3001/filters")
            .then( data => dispatch(filtersLoaded(data)))
            .catch( () => dispatch(filtersLoadingError()))
            // eslint-disable-next-line
    }, [])

/*     useEffect( () => {
        console.log(activeFilter)
    }, [activeFilter] ) */

    if ( filtersLoadingStatus === 'loading' ) {
        return <div className="d-flex justify-content-center"><Spinner/></div>
    } else if ( filtersLoadingStatus === 'error' ) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const filterList = (filterName) => {
        dispatch(setFilter(filterName))
    }

    const getFilters = (arr) => {
        return arr.map(item => {
            const btnClass = classNames('btn', {
		        [`btn-${item.class} active`]: item.name === activeFilter,
		        [`btn-${item.class}`]: item.name !== activeFilter
	        });

            return <button 
                        key={item.id} 
                        className= {btnClass}      
                        onClick={ () => filterList(item.name) }>
                    {item.label}
                    </button>
        })
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    { getFilters(filters) }
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;