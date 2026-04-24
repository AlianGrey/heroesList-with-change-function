import {useHttp} from '../../hooks/http.hook';
import { heroDeleteSuccess, heroDeleteError } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../spinner/Spinner';
import userImg from '../../assets/default_user.png'

const HeroesListItem = ({ id, name, description, element, deletingId, setDeletingId }) => {
	const { deleteStatus } = useSelector(state => state)

	const dispatch = useDispatch();
	const {request } = useHttp();

	const deleteHero = (id) => {
		setDeletingId(id)
		request(`http://localhost:3001/heroes/${id}`, 'DELETE')
			.then( () => dispatch(heroDeleteSuccess(id)) )
			.catch( () => dispatch(heroDeleteError()) )
			.finally( () => setDeletingId(null) ) 
	}

	let elementClassName;

	switch (element) {
		case "fire":
			elementClassName = "bg-danger bg-gradient";
			break;
		case "water":
			elementClassName = "bg-primary bg-gradient";
			break;
		case "wind":
			elementClassName = "bg-success bg-gradient";
			break;
		case "earth":
			elementClassName = "bg-secondary bg-gradient";
			break;
		default:
			elementClassName = "bg-warning bg-gradient";
	}

	if ( deletingId === id) {
		return <div className="d-flex justify-content-center"> <Spinner/> </div> 
	} else if ( deleteStatus === 'error' ) { 
		return  <h5 className="text-center mt-5">Ошибка удаления</h5> 
	}

	return (
		<li
			className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}
		>
		
			<img
				src={userImg}
				className="img-fluid w-25 d-inline"
				alt="unknown hero"
				style={{ objectFit: "cover" }}
			/>
			<div className="card-body">
				<h3 className="card-title">{name}</h3>
				<p className="card-text">{description}</p>
			</div>
			<span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
				 <button
					type="button"
					className="btn-close btn-close"
					aria-label="Close"
					onClick={()=> deleteHero(id)}
				></button>
			</span>
		</li>
	);
};

export default HeroesListItem;
