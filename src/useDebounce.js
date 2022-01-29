import {useEffect, useState} from "react";


export default function useDebounce(left,right,delay){
    const [debouncedLeft,setDebouncedLeft] = useState(left)
    const [debouncedRight,setDebouncedRight] = useState(right)

    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebouncedLeft(left)
            setDebouncedRight(right)
        },delay)

        return ()=>{
            clearTimeout(handler)
        }
    },[left,right])


    return [debouncedLeft,debouncedRight];
}