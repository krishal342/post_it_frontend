/// this isnot in use
'use client'


import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { setProfile } from "@/redux/slices/profileSlice";
const FetchUser = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile/me`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(async response => {
                const resData = await response;
                dispatch(setProfile(resData));
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    },[])

    if (loading) return <div>Loading...</div>;
  return null;
}

export default FetchUser