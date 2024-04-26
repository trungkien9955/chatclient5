import { useEffect, useState } from "react"

export const useHeights = ()=>{
    const [heights, setHeights] = useState([])
    useEffect(()=>{
        const calHeight = ()=>{
            let i = 140 
            let heightCals = []
            while(i<190){
                heightCals.push(i)
                i++
            }
            setHeights(heightCals)
        }
        calHeight()
    }, [])
    return heights
}
export const getHeights = ()=>{
    let i = 140 
    let heights = []
    while(i<191){
        heights.push(i)
        i++
    }
    return heights
}
export const getWeights = ()=>{
    let i = 35 
    let weights = []
    while(i<81){
        weights.push(i)
        i++
    }
    return weights
}