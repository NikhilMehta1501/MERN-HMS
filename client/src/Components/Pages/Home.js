import { useState, useEffect } from "react";
import HospitalList from "./Hospital/HospitalList";
import { hospital1, hospital2, hospital3, hospital4, hospital5 } from "../../Assets/index";
import Axios from 'axios'

const Home = ({ userData, setUserData }) => {

  const refreshToken = async () => {
    try {
      // console.log('Refreshing Token');
      const res = await Axios({
        method: 'post',
        url: 'api/auth/refreshToken',
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        }
      })
      
      setUserData({ ...userData, token: res.data.token, expiresIn: res.data.expiresIn })
      // console.log('Token Refreshed!');
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  }

  useEffect(() => {
    if(!userData.token || !userData.expiresIn) return
    
    const interval = setInterval(() => {refreshToken()}, ( 60 * 5 * 1000) )

    return () => clearInterval(interval)
  }, [userData.token, userData.expiresIn ])

  const [hospitalList, setHospitalList] = useState([
    {
      id: 1,
      name: 'National Hospital',
      status: 'public',
      image: hospital1,
      description: 'National Hospital is the best hospital in the world with First Class, Top Notch, State-Of-The-Art Technologies'
    },
    {
      id: 2,
      name: 'Delhi National Hospital',
      status: 'private',
      image: hospital2,
      description: 'Delhi National Hospital is the best hospital in the world with First Class, Top Notch, State-Of-The-Art Technologies'
    }
  ])
  
  return (
      <HospitalList hospitalList={hospitalList} />
    )
}

export default Home
