//Fetching for list
export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}
export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}
export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}
//delete for HeroesListItem
export const heroDeleteSuccess = (id) => {
    return {
        type: 'HERO_DELETE_SUCCESS',
        payload: id
    }
}
export const heroDeleteError = () => {
    return {
        type: 'HERO_DELETE_ERROR',
    }
}

//add new items HeroesAddForm
export const heroAdd = (hero) => {
    return {
        type: 'HERO_ADD',
        payload: hero
    }
}

export const heroAdding = () => {
    return {
        type: 'HERO_ADDING'
    }
}
export const heroAdded = (hero) => {
    return {
        type: 'HERO_ADDED',
        payload: hero
    }
}
export const heroAddingError = () => {
    return {
        type: 'HERO_ADDING_ERROR'
    }
}

//load filter in HeroesAddForm
export const filtersLoading = () => {
    return {
        type: 'FILTERS_LOADING'
    }
}
export const filtersLoaded = (filters) => {
    return {
        type: 'FILTERS_LOADED',
        payload: filters
    }
}
export const filtersLoadingError = () => {
    return {
        type: 'FILTERS_LOADING_ERROR'
    }
}
//filter для фильтрации списка
export const setFilter = (activeFilter) => {
    return {
        type: 'SET_FILTER',
        payload: activeFilter
    }
}