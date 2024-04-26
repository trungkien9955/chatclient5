import { intlFormatDistance } from "date-fns"
import { useEffect, useState } from "react"

 const useCalculateTime = (time) => {
    const [timeDistance, setTimeDistance] = useState()
    useEffect(()=>{
        const getTime = async()=>{
            let timeDistance =  intlFormatDistance(time, Date.now())
        setTimeDistance(timeDistance)
        }
        getTime()
    }, [])
    
    return timeDistance
}
export default useCalculateTime