import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { getStrangerProfile, logoutUserfromHome, saveFilter, updateDCityId_tempFilter, updateGender_TempFilter, updateHCityId_tempFilter, updateJob_tempFilter, updateNotiAsRead, updateWeightAbove_TempFilter, updateWeightBelow_TempFilter, updateheightAbove_TempFilter, updateheightBelow_TempFilter } from '../../features/homeSlice';
import { Button, Col, FloatingLabel, Form, Row, Stack } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import {  getHeights, getWeights } from '../../utils/dataCreator';
import CustomAxios from '../../utils/CustomAxios';

 const FilterOffCanvas = ({  
    _filterOffCanvasShow, 
    _handleFilterOffCanvasClose,
}) => {
    const dispatch = useDispatch()
    const home = useSelector(state=> state.home)
    const userId = useSelector(state=>state.auth.user?._id)
    const filter = home.filter
    const tempFilter = home.tempFilter
    const [genders, setGenders] = useState([])
    const [jobs, setJobs] = useState([])
    const [cities, setCities] = useState([])
    const heights = getHeights()
    const weights = getWeights()
    useEffect(()=>{
        const fetchGenders = async()=>{
            const response = await CustomAxios.get("/profile/genders")
            const genders = response.data
            if(genders.length > 0){
                setGenders(genders)
            }
        }
        const fetchJobs = async()=>{
            const response = await CustomAxios.get("/profile/jobs")
            const jobs = response.data
            if(jobs.length > 0){
                setJobs(jobs)
            }
        }
        const fetchCities = async()=>{
            const response = await CustomAxios.get("/data/cities")
            const cities = response.data
            if(cities.length > 0){
                setCities(cities)
            }
        }
        fetchGenders()
        fetchJobs()
        fetchCities()
    }, [])
      return (
    <Offcanvas show={_filterOffCanvasShow}  onHide={_handleFilterOffCanvasClose} placement="end" className= "filter-offcanvas">
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>
            <div className='custom-offcanvas-title'>Bộ lọc</div>
        </Offcanvas.Title>
    </Offcanvas.Header>
    <hr />
    <Offcanvas.Body>
      <Stack className="filter-container" direction='vertical'  gap={2}>
      <FloatingLabel controlId="floatingSelect" label="Giới tính">
            <Form.Select 
            aria-label="Giới tính"
            onChange={(e)=>{
                console.log("change")
                dispatch(updateGender_TempFilter(e.target.value))
            }}
            >
            {
                    genders.length > 0  && genders.map((gender, index) => {
                    return <option key={index} value={gender._id} selected = {gender._id == filter.gender} >{gender.name}</option>
                })
            }
            </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Công việc">
            <Form.Select 
            aria-label="Công việc"
            onChange={(e)=>{
                dispatch(updateJob_tempFilter(e.target.value))
            }}
            >
                 <option  defaultValue="" selected >Việc gì cũng yêu</option>
            {
                
                    jobs.length > 0  && jobs.map((job, index) => {
                    return <option key={index} value={job._id} selected = {job._id == filter.job} >{job.name}</option>
                })
            }
            </Form.Select>
        </FloatingLabel>
        <Stack>
            <span>Chiều cao</span>
            <Stack 
                direction='horizontal'
                gap={2}
                >
                <FloatingLabel controlId="height-above" label="Trên" style={{width: "50%"}}>
                    <Form.Select 
                    aria-label="Trên"
                    onChange={(e)=>{
                        dispatch(updateheightAbove_TempFilter(parseInt(e.target.value)))
                    }}
                    >
                         <option  defaultValue="" selected >Không chọn</option>
                    {
                        
                        heights.length > 0  && heights.map((height, index) => {
                            return <option key={index} value={height} selected = {filter.heightAbove && height == filter.heightAbove} >{height} cm</option>
                        })
                    }
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="height-below" label="Dưới" style={{width: "50%"}}>
                    <Form.Select 
                    aria-label="Dưới"
                    onChange={(e)=>{
                        dispatch(updateheightBelow_TempFilter(parseInt(e.target.value)))
                    }}
                    >
                     <option  defaultValue="" selected >Không chọn</option>
                    {
                        
                        heights.length > 0  && heights.map((height, index) => {
                            return <option key={index} value={height} selected = {filter.heightBelow && height == filter.heightBelow} >{height} cm</option>
                        })
                    }
                    </Form.Select>
                </FloatingLabel>
            </Stack>
        </Stack>
        <Stack>
            <span>Cân nặng</span>
            <Stack direction='horizontal' gap={2}>
                <FloatingLabel controlId="floatingSelect" label="Trên" style={{width: "50%"}}>
                <Form.Select 
                aria-label="Trên"
                onChange={(e)=>{
                    dispatch(updateWeightAbove_TempFilter(parseInt(e.target.value)))
                }}
                >
                    <option  defaultValue="" selected >Không chọn</option>
                {
                    weights.length > 0  && weights.map((weight, index) => {
                        return <option key={index} value={weight} selected = {filter.weightAbove &&  weight == filter.weightAbove} >{weight} kg</option>
                    })
                }
                </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="floatingSelect" label="Dưới" style={{width: "50%"}}>
                <Form.Select 
                aria-label="Dưới"
                onChange={(e)=>{
                    dispatch(updateWeightBelow_TempFilter(parseInt(e.target.value)))
                }}
                >
                    <option  defaultValue="" selected >Không chọn</option>
                {
                    weights.length > 0  && weights.map((weight, index) => {
                        return <option key={index} value={weight} selected = {filter.weightBelow && weight == filter.weightBelow} >{weight} kg</option>
                    })
                }
                </Form.Select>
                </FloatingLabel>
            </Stack>
        </Stack>
        <FloatingLabel controlId="floatingSelect" label="Địa điểm">
            <Form.Select 
            aria-label="Địa điểm"
            onChange={(e)=>{
                dispatch(updateDCityId_tempFilter(e.target.value))
            }}
            >
            {
                cities.length > 0  && cities.map((city, index) => {
                    return <option key={index} value={city._id} selected = {city._id == filter.dCityId} >{city.name}</option>
                })
            }
            </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Quê quán">
            <Form.Select 
            aria-label="Quê quán"
            onChange={(e)=>{
                dispatch(updateHCityId_tempFilter(e.target.value))
            }}
            >
                <option  defaultValue="" selected >Đang ế quá, quê đâu cũng quất</option>
            {
                
                cities.length > 0  && cities.map((city, index) => {
                    return <option key={index} value={city._id} selected = {city._id == filter.hCityId} >{city.name}</option>
                })
            }
            </Form.Select>
        </FloatingLabel>
        <Stack>
            <Button 
            variant = "success" 
            style={{backgroundColor: "#bb86fc", 
            border: "none", width: "50%", 
            margin: "auto"}}
            className={JSON.stringify(filter)==JSON.stringify(tempFilter) ? "faded cursor-not-allowed ": "cursor-pointer"}
            disabled = {JSON.stringify(filter)==JSON.stringify(tempFilter)}
            onClick={()=>{
                dispatch(saveFilter({userId: userId, filter: tempFilter}))
            }}
            >Lưu thay đổi</Button>
        </Stack>
      </Stack>
    </Offcanvas.Body>
</Offcanvas>
  )
}
export default FilterOffCanvas;
