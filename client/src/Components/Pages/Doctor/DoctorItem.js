const DoctorItem = ({ doctor }) => {
  return (
    <div className="d-flex flex-row">
      <div>{doctor.name}</div>
      <div className="ms-3">{doctor.age}</div>
    </div>
  )
}

export default DoctorItem
