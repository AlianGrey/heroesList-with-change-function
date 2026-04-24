import {useHttp} from '../../hooks/http.hook';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../spinner/Spinner';
import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import './heroesList.scss'


const HeroesList = () => {
    const {heroes, heroesLoadingStatus, activeFilter} = useSelector(state => state);
    const [ deletingId, setDeletingId ] = useState(null)
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        let filtered =[]
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        filtered = arr.filter ( item => {
            if (activeFilter === 'all') return true;
            return item.element === activeFilter;
        })

        if ( filtered.length === 0 ) {
            return (
                <CSSTransition key="empty" timeout={300} classNames="hero">
                    <h5 className="text-center mt-5">Нет соответствующих элементов</h5>
                </CSSTransition>
            )
        } 

        return filtered.map( props => (
            <CSSTransition key={props.id} timeout={300} classNames="hero">
                <HeroesListItem 
                    {...props}
                    deletingId={deletingId}
                    setDeletingId={setDeletingId}/> 
            </CSSTransition>
        ))
    }

    const elements = renderHeroesList(heroes);
    return (
       <TransitionGroup component="ul"> 
                {elements}
        </TransitionGroup >
    )
}

export default HeroesList;