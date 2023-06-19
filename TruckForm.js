import { useState } from 'react'

export default function TruckForm({
    setTruck,
    setMine,
    setTare,
    setGross,
    setTicket,
    setPo
}){
    const [ error, setError ] = useState([])
    const [ success, setSuccess ] = useState(false)

}