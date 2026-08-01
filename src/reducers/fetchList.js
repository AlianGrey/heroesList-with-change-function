const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    deleteStatus: 'idle',
    heroAddingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //fetching
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }

        //deleting
        case 'HERO_DELETED':
            return {
                ...state,
                heroes: state.heroes.filter( item => item.id !== action.payload),
                deleteStatus: 'idle'
            }  
        case 'HERO_DELETE_ERROR':
            return {
                ...state,
                deleteStatus: 'error'
            }  

        //adding
        case 'HERO_ADDING' : 
            return {
                ...state,
                heroAddingStatus: 'loading',
            }
        case 'HERO_ADDED' : 
            return {
                ...state,
                heroes: [ ...state.heroes, action.payload],
                heroAddingStatus: 'idle',
            }
        case 'HERO_ADDING_ERROR' : 
            return {
                ...state,
                heroAddingStatus: 'error',
            }

        //filters loading
        case 'FILTERS_LOADING' : 
            return {
                ...state,
                filtersLoadingStatus: 'loading',
            }
        case 'FILTERS_LOADED' : 
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle',
            }
        case 'FILTERS_LOADING_ERROR' : 
            return {
                ...state,
                filtersLoadingStatus: 'error',
            }
        //установка фильтра для фильтрации
        case 'SET_FILTER' : 
            return {
                ...state,
                activeFilter: action.payload,
            }

        default: return state
    }
}

export default reducer;