import { useState } from 'react'
import {useParams} from 'react-router'
import DoctorList from '../Doctor/DoctorList'
import PatientList from '../Patient/PatientList'


const Hospital = () => {

  const { id } = useParams()

  const [isDoctorTab, setisDoctorTab] = useState(true)

  const toggleTabType = () => setisDoctorTab(!isDoctorTab)

  return (
    <div className="d-flex mt-5">
      <div className="tabs ms-5 flex-grow-5">
        <ul className="nav nav-pills nav-fill d-flex flex-column">
          <li className="nav-item">
            <button onClick={()=>toggleTabType()} className={`nav-link ${ isDoctorTab ? 'active': '' }` }>Doctor</button>
          </li>
          <li className="nav-item">
            <button onClick={()=>toggleTabType()} className={`nav-link ${ isDoctorTab ? '': 'active' }` }>Patients</button>
          </li>
        </ul>
      </div>
      <div className="main-section ms-5 flex-grow-1">
        <div className={isDoctorTab ? '': 'd-none'}>
          <DoctorList/>
        </div>
        <div className={isDoctorTab ? 'd-none': ''}>
          <PatientList/>
        </div>
      </div>
    </div>
  )
}

export default Hospital
