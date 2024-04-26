import { Container } from "react-bootstrap";
import { baseUrl, getRequest, laravelGetRequest, laravelUrl, postRequest } from "../utils/services";
import { useState } from "react";
import {Button} from "react-bootstrap"
import { useDispatch } from "react-redux";
import { fetchStats } from "../features/statsSlice";
import CustomAxios from "../utils/CustomAxios";

const CreateData = () => {
    const dispatch = useDispatch()
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isDbLoading, setIsDbLoading] = useState(false)

    const [data, setData] = useState()
    const getData = async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        const response = await laravelGetRequest(`${laravelUrl}/cities`)
        setIsLoading(false)
         if (response.error) {
            setIsError(true)
         }
         console.log(response)
         setData(response.cities)

    }
    const getDistricts = async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        const response = await laravelGetRequest(`${laravelUrl}/all-districts`)
        setIsLoading(false)
         if (response.error) {
            setIsError(true)
         }
         console.log(response)
         setData(response.districts)
    }
    const getWards = async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        const response = await laravelGetRequest(`${laravelUrl}/all-wards`)
        setIsLoading(false)
         if (response.error) {
            setIsError(true)
         }
         console.log(response)
         setData(response.wards)
    }
    // const getHobbies = async(e)=>{
    //     e.preventDefault()
    //     setIsLoading(true)
    //     const response = await laravelGetRequest(`${laravelUrl}/all-hobbies`)
    //     setIsLoading(false)
    //      if (response.error) {
    //         setIsError(true)
    //      }
    //      console.log(response)
    //      setData(response.hobbies)
    // }
    const getHobbies = async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        const response = await CustomAxios.get("/profile/hobbies")
        setIsLoading(false)
         if (response.error) {
            setIsError(true)
         }
         setData(response.data)
    }
    const addData = async(e)=>{
        e.preventDefault()
        setIsDbLoading(true)
        let response = await CustomAxios.post(`/users/add-data`, data)
        response = response.data
        setIsDbLoading(false)
        if (response.error) {
            setIsError(true)
         }
         console.log(response)
    }
    const addProduct = async(e)=>{
        e.preventDefault()
        setIsDbLoading(true)
        let response = await CustomAxios.get(`/products/add-product`)
        response = response.data

        setIsDbLoading(false)
        if (response.error) {
            setIsError(true)
         }
         console.log(response)
    }
    const addDistricts = async(e)=>{
        e.preventDefault()
        setIsDbLoading(true)
        let response = await CustomAxios.post(`/users/add-districts`, data)
        response = response.data
        setIsDbLoading(false)
        if (response.error) {
            setIsError(true)
         }
         console.log(response)
    }
    const addWards = async(e)=>{
        e.preventDefault()
        setIsDbLoading(true)
        let response = await CustomAxios.post(`/users/add-wards`, data)
        response = response.data
        setIsDbLoading(false)
        if (response.error) {
            setIsError(true)
         }
         console.log(response)
    }
    const addCityId = async(e)=>{
        e.preventDefault()
        setIsDbLoading(true)
        let response = await CustomAxios.get(`/data/add-city-id`)
        response = response.data
        setIsDbLoading(false)
        if (response.error) {
            setIsError(true)
         }
         console.log(response)
    }
    const findUser = async(e)=>{
        e.preventDefault()
        setIsDbLoading(true)
        let response = await CustomAxios.get(`/data/find-user`)
        response = response.data

        setIsDbLoading(false)
        if (response.error) {
            setIsError(true)
         }else{
            setData(response.data)
         }
         
    }
    const addHobbies = async(e)=>{
        e.preventDefault()
        setIsDbLoading(true)
        let response = await CustomAxios.post(`${baseUrl}/data/add-hobbies`, JSON.stringify(data))
        response = response.data

        setIsDbLoading(false)
        if (response.error) {
            setIsError(true)
         }
         console.log(response)
    }
    const addHobbyField = async(e)=>{
        e.preventDefault()
        setIsDbLoading(true)
        let response = await CustomAxios.get(`/data/add-hobby-field`)
        response = response.data

        setIsDbLoading(false)
        if (response.error) {
            setIsError(true)
         }
         console.log(response)
    }
    const updateHobbies = async(e)=>{
        e.preventDefault()
        setIsDbLoading(true)
        let response = await CustomAxios.get(`/data/update-hobbies`)
        response = response.data

        setIsDbLoading(false)
        if (response.error) {
            setIsError(true)
         }
         console.log(response)
    }
    return ( <Container>
        <Button 
        className= "btn btn-secondary m-2"
        onClick={addProduct}
        >
            {isLoading ? "Đang xử lý" : "Thêm sản phẩm"}
        </Button>
        <Button 
        className= "btn btn-secondary m-2"
        onClick={addHobbyField}
        >
            {isLoading ? "Đang xử lý" : "Add hobby field"}
        </Button>
        <Button 
        className= "btn btn-secondary m-2"
        onClick={updateHobbies}
        >
            {isLoading ? "Đang xử lý" : "Update hobbies"}
        </Button>
        <Button 
        className= "btn btn-secondary m-2"
        onClick={getHobbies}
        >
            {isLoading ? "Đang xử lý" : "Fetch hobbies"}
        </Button>
        <Button 
        className= "btn btn-secondary m-2"
        onClick={findUser}
        >
            {isLoading ? "Đang xử lý" : "Tìm user"}
        </Button>
        <Button 
        className= "btn btn-secondary m-2"
        onClick={addCityId}
        >
            {isLoading ? "Đang xử lý" : "Thêm city id"}
        </Button>
        <Button 
        className= "btn btn-secondary"
        onClick={getData}
        >
            {isLoading ? "Đang xử lý" : "Tạo dữ liệu"}
        </Button>
        {/* <Button 
        className= "btn btn-secondary m-2"
        onClick={getDistricts}
        >
            {isLoading ? "Đang xử lý" : "Tạo dữ liệu huyện"}
        </Button>
        <Button 
        className= "btn btn-secondary m-2"
        onClick={getWards}
        >
            {isLoading ? "Đang xử lý" : "Tạo dữ liệu phường"}
        </Button> */}
        {
            data &&         <Button 
            className= "btn btn-success m-2"
            onClick={addData}
            >
                {isDbLoading ? "Đang xử lý" : "Đưa vào MongoDB"}
            </Button>
        }
                {
            data &&         <Button 
            className= "btn btn-success m-2"
            onClick={addDistricts}
            >
                {isDbLoading ? "Đang xử lý" : "Đưa huyện vào MongoDB"}
            </Button>
        }
                        {
            data &&         <Button 
            className= "btn btn-success m-2"
            onClick={addWards}
            >
                {isDbLoading ? "Đang xử lý" : "Đưa xã vào MongoDB"}
            </Button>
        }
                                {
            data &&         <Button 
            className= "btn btn-success m-2"
            onClick={addHobbies}
            >
                {isDbLoading ? "Đang xử lý" : "Đưa hobbies vào MongoDB"}
            </Button>
        }
        <Button 
        className= "btn btn-secondary m-2"
        onClick={()=>{
            dispatch(fetchStats())
        }}
        >
            {isLoading ? "Đang xử lý" : "Tạo dữ liệu thống kê"}
        </Button>
        <h4>Kết quả</h4>
        <div className="data-results">
            {isError && "Đã xảy ra lỗi."}
            {
                data?.length > 0 && data.map((item, index)=>{
                    return <span key = {index}>{item.name}-{item.id}</span>
                })
            }
        </div>
        </Container> );
}
 
export default CreateData;