import {Link} from "react-router-dom"

const HospitalItem = ( { hospital } ) => {
    return (
        <div className="card m-4" style={{ width: '16rem' }}>
            <img src={hospital.image} className="card-img-top" alt={hospital.name} />
            <div className="card-body">
            <h5 className="card-title">{hospital.name}</h5>
            <p className="card-text">{hospital.description}</p>
            <Link to={`/hospital/${hospital.id}`} className="btn btn-primary">Goto Hospital</Link>
            </div>
        </div>
    )
}

export default HospitalItem
