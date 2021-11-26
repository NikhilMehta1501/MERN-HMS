import {useState} from "react"
import DoctorItem from "./DoctorItem"

const DoctorList = () => {

  const [doctorsList, setdoctorsList] = useState([
    {
      id: 1,
      name: "Nikhil Mehta",
      age: 26
    },
    {
      id: 2,
      name: "Jhon Doe",
      age: 36
    },
    {
      id: 3,
      name: "Han Solo",
      age: 56
    }
  ]
  )

  return (
    <div className="d-flex flex-column">
      {doctorsList.map( (doctor) => <DoctorItem key={doctor.id} doctor={doctor} />  )}
    </div>
  )
}

export default DoctorList
