import { v4 as uuidv4 } from "uuid";    //uuidv4();         // result for example  'ab16e731-6cee-424d-81a0-5929e9bdb0cc'
import { useSelector, useDispatch } from "react-redux"
import {useHttp} from '../../hooks/http.hook';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup' 
import Spinner from "../spinner/Spinner";
import { useEffect } from "react";
import { heroAdding, heroAdded, heroAddingError, filtersLoaded, filtersLoadingError } from '../../actions'

const HeroesAddForm = () => {
    const { heroAddingStatus, filters, filtersLoadingStatus } = useSelector( state => state )
    const dispatch = useDispatch()
    const { request } = useHttp()

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then( data => dispatch(filtersLoaded(data)))
            .catch( () => dispatch(filtersLoadingError()))
            // eslint-disable-next-line
    }, [])

    const addHero = (newHero) => {
        dispatch(heroAdding())
        request("http://localhost:3001/heroes", 'POST', JSON.stringify(newHero))
            .then(() => dispatch(heroAdded(newHero)))
            .catch(() => dispatch(heroAddingError()))
    }

    if (heroAddingStatus === 'loading') {
        return <div className="d-flex justify-content-center"><Spinner/></div>
    } else if (heroAddingStatus === 'error' || filtersLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const getFiltersName = (arr) => {
        return arr.map(item => {
            return <option key={item.id}  value={item.name}>{item.label}</option>
        })
    }
    
    return (
        <Formik
            initialValues = {{
            name: '',
            description: '',
            element: '',
            }}
            validationSchema = { Yup.object({
                name: Yup.string()
                        .min(3, 'Минимум 3 символа!')
                        .required('Обязательное поле!'),
                description: Yup.string()
                        .min(10, 'Минимум 10 символов!')
                        .required('Обязательное поле!'),
                element: Yup.string()
                        .required('Необходимо выбрать свойство!')
            })}
            onSubmit = { ( values, { resetForm} ) => {
                const newHero = {
                    id: uuidv4(),
                    name: values.name,
                    description: values.description,
                    element: values.element,
                }
                addHero(newHero)
                console.log( JSON.stringify(newHero, null, 2) ) 
                resetForm() }
            }     
        >
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field 
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"/>
                    <ErrorMessage name='name' component='div' className='error'/>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label fs-4">Описание</label>
                    <Field 
                        name="description" 
                        className="form-control" 
                        id="description" 
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}
                        as="textarea"/>
                    <ErrorMessage name='description' component='div' className='error'/>
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field 
                        className="form-select" 
                        id="element" 
                        name="element"
                        as="select">
                        <option value=''>Я владею элементом...</option>
                        { getFiltersName(filters) }
                    </Field>
                    <ErrorMessage name='element' component='div' className='error'/>
                </div>

                <button type="submit" className="btn btn-primary">
                    Создать
                </button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;