import HospitalItem from "./HospitalItem";

const HospitalList = ({ hospitalList }) => {
  
  return (
    <div className="d-flex flex-wrap justify-content-evenly">
      {hospitalList.map((hospital) => (<HospitalItem key={hospital.id} hospital={hospital}></HospitalItem>))  }
    </div>
  )
}

export default HospitalList
