const PatientItem = ({ patient }) => {
  return (
    <div className="d-flex flex-row">
      <div>{patient.name}</div>
      <div className="ms-3">{patient.age}</div>
    </div>
  )
}

export default PatientItem
