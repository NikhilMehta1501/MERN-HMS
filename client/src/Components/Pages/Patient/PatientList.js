import {useState} from "react"
import PatientItem from "./PatientItem"

const PatientList = () => {

  const [patientsList, setpatientsList] = useState([
    {
      id: 1,
      name: "Jhon Doe",
      age: 26
    },
    {
      id: 2,
      name: "Han Solo",
      age: 36
    },
    {
      id: 3,
      name: "Nikhil Mehta",
      age: 56
    }
  ]
  )

  return (
    <div className="d-flex flex-column">
      {patientsList.map( (patient) => <PatientItem key={patient.id} patient={patient} />  )}
    </div>
  )
}

export default PatientList
