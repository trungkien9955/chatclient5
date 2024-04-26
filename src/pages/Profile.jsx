import React, {useState, useEffect, useContext, useReducer} from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import OffCanvas from '../components/ui/OffCanvas';
import Hobbies from '../components/user/Hobbies';
import ChipDelete from '@mui/joy/ChipDelete';
import { AuthContext } from '../context/AuthContext';
import offCanvasReducer from '../reducer/offCanvasReducer';
import Offcanvas from 'react-bootstrap/Offcanvas';
//
import { baseUrl, getRequest, imageUrl, postRequest, postRequestForFormData } from '../utils/services';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {addDatingGoalId, getDatingGoals, getGenders, removeDatingGoalId, updateNewGenderId, updateUserUploadedProfileImage } from '../features/profileSlice';
import { addUserGalImages, updateUserProfileImage, removeGalImage, updateUserName, changeName, updateGalImage,  updateNewDatingCity, saveDatingCity, saveGender, saveDatingGoals, resetTempDatingGoalIdArray, addToTempDatingGoalIdArray, removeFromTempDatingGoalIdArray, getHobbySearchResults, resetTempHobbyIdArray, resetHobbySearchResults, resetTempHobbies, saveHobbies, resetTempKidOptId, saveKidOption, saveSmokingOption, saveDrinkingOption, resetTempSmokingOptId, resetTempDrinkingOptId, resetTempJobs, resetTempJobIdArray, resetJobSearchResults, saveJobs, saveEduOption, resetTempEduOptId, updateTempCollId, resetCollegeSearchResults, resetTempColl, resetTempCollId, saveCollegeOption, updateTempName, resetTempName, saveName, updateNewHomeCityId, saveHomeCity, updateTempHeight, resetTempHeight, saveHeight, updateTempWeight, saveWeight, saveBio, resetTempBio, updateTempRemovedGalImgId, resetTempRemovedGalImgId, saveProfImg, updateTempProfImg, resetTempProImg, updateTempGalImages, resetTempGalImages, saveGalImages, updateTempDob, saveDob } from '../features/authSlice';
import { showModal, showModalForGalImageRemoveConfirm, closeModal, resetModal, confirmModal, cancelModal, showModalForNameChange, alertSameName, alertValidName, showModalForRemovingGalImage, showDisabledConfirmBtnModal, showActiveConfirmBtnModal } from '../features/modalSlice';
import PageOffCanvas from '../components/ui/PageOffCanvas';
import { getCitiesForOffCanvas, closeOffCanvas, showOffCanvasForDatingCityChange, showOffCanvasDisabledConfirmBtn, showOffCanvasActiveConfirmBtn, prepareOffCanvasForGenderChange, updateData, prepareOffCanvasForDatingGoalsChange , closeOffCanvasForDatingGoalChange, prepareOffCanvasForHobby, prepareOffCanvasForKidOption, prepareOffCanvasForSmokingOptions, prepareOffCanvasForDrinkingOptions, prepareOffCanvasForJobs, prepareOffCanvasForEduOptions, prepareOffCanvasForColleges, resetOffCanvasAlert, prepareOffCanvasForName, closeBOff, showBOff, prepareOffCanvasForHomeCity, prepareOffCanvasForHeight, prepareOffCanvasForWeight, prepareOffCanvasForBio, prepareOffCanvasForRemovingGalImg, resetOffCanvas, prepareOffCanvasForProfileImg, prepareOffCanvasForProfImg, showOffCanvasAlertWithExternalData, prepareOffCanvasForGalImages, prepareOffCanvasForDob,  } from '../features/offCanvasSlice';
import OffCanvasConfirmBtn from '../components/ui/OffCanvasConfirmBtn';
import { Stack } from 'react-bootstrap';
import { Badge } from '@mui/material';
import HobbySearchResults from '../components/profile/HobbySearchResults';
import HobbySearch from '../components/profile/HobbySearch';
import TempHobbies from '../components/profile/TempHobbies';
import HobbyContainer from '../components/profile/HobbyContainer';
import NoBadgeHobbyContainer from '../components/profile/NoBadgeHobbyContainer';
import KidOption from '../components/profile/KidOption';
import SmokingOption from '../components/profile/SmokingOption';
import DrinkingOption from '../components/profile/DrinkingOption';
import JobSearch from '../components/profile/JobSearch';
import TempJobs from '../components/profile/TempJobs';
import NoBadgeJobContainer from '../components/profile/NoBadgeJobContainer';
import EduOption from '../components/profile/EduOption';
import CollegeSearch from '../components/profile/CollegeSearch';
import TempCollege from '../components/profile/TempCollege';
import NameChangeInput from '../components/profile/NameChange';
import BottomOffCanvas from '../components/ui/BottomOffCanvas';
import { getHeights, getWeights } from '../utils/dataCreator';
import CustomAxios from '../utils/CustomAxios';
import AxiosForFormData from '../utils/AxiosForFormData';
import BioInput from '../components/profile/BioInput';
import createFileName from '../utils/createFileName';
import UploadedImgContainer from '../components/profile/UploadImgContainer';
import UploadedGalImgContainer from '../components/profile/UploadedGalImgContainer';
import useConvertTimeLanguage from '../hooks/useConvertTimeLanguage';
import { intlFormatDistance, lightFormat } from 'date-fns';
import DobSelection from '../components/ui/DobSelection';
//date picker

const Profile = () => {
  const auth = useSelector(state=>state.auth)
  const user = auth.user
  const modal = useSelector(state=> state.modal)
  const offCanvas = useSelector(state=> state.offCanvas)
  const profile = useSelector(state=>state.profile)
  const [isConfirmed, setIsConfirmed] = useState(modal.isModalConfirmed)
  const dispatch = useDispatch()
  const [offCanvasShow, setOffCanvasShow] = useState(false);
  const handleOffCanvasClose = () => {
    setOffCanvasShow(false)
    setOffCanvasTitle("")
    setOffCanvasBody()
    dispatch(resetTempDatingGoalIdArray(auth.initialDatingGoalIdArray))
    dispatch(resetTempDatingGoalIdArray(auth.initialDatingGoalIdArray))
    dispatch(resetHobbySearchResults([]))
    dispatch(resetTempHobbies(auth.initialHobbies))
    dispatch(resetTempHobbyIdArray(auth.initialHobbyIdArray))
    dispatch(resetTempKidOptId(auth.iniKidOptId))
    dispatch(resetTempSmokingOptId(auth.iniSmokingOptId))
    dispatch(resetTempDrinkingOptId(auth.iniDrinkingOptId))
    dispatch(resetJobSearchResults([]))
    dispatch(resetTempJobs(auth.iniJobs))
    dispatch(resetTempJobIdArray(auth.iniJobIdArray))
    dispatch(resetTempEduOptId(auth.iniEduOptId))
    dispatch(resetCollegeSearchResults([]))
    dispatch(resetTempColl(auth.iniColl))
    dispatch(resetTempCollId(auth.iniCollId))
    dispatch(resetTempHeight(auth.iniHeight))
    dispatch(resetTempBio(auth.iniBio))
    dispatch(resetTempRemovedGalImgId(null))
    dispatch(closeOffCanvas())
    setUserUploadedGalImages([])
    setUserUploadedProfileImage(null)
    setProfileImgError(null)
    dispatch(resetTempProImg(null))
    dispatch(resetTempGalImages([]))
    dispatch(updateTempDob(auth.iniDob))
    dispatch(resetOffCanvas())

  };
  //page off
  const handleOffCanvasShow = () => {
    setOffCanvasShow(true)
  };
  const[offCanvasTitle, setOffCanvasTitle] = useState("");
  const[offCanvasBody, setOffCanvasBody] = useState("");
  const[offCanvasPlacement, setOffCanvasPlacement] = useState("top");
  //bOff
  const[bOffTitle, setBOffTitle] = useState("");
  const[bOffBody, setBOffBody] = useState("");
  const handleBOffClose = ()=>{
    dispatch(resetTempName(auth.iniName))
    dispatch(closeOffCanvas())
  }

 
  const [saveBtnStatus, setSaveBtnStatus] = useState('disabled');
  const [optionType, setOptionType] = useState('');
  const [dataType, setDataType] = useState('');
  const [userName, setUserName] = useState(user?.name)
  const [userIntro, setUserIntro] = useState()
  const [userDesc, setUserDesc] = useState()
  const [userDatingCity, setUserDatingCity] = useState(user?.datingCity?._id);
  const [userProfileImage, setUserProfileImage] = useState(user?.profileImage)
  const [userUploadedGalImages, setUserUploadedGalImages] = useState([]);
  const [userUploadedProfileImage, setUserUploadedProfileImage] = useState(null);
  const [profileImgError, setProfileImgError] = useState(null)

  const [fetchError, setFetchError] = useState(false) 
  const [cities, setCities] = useState([]);
  const handleUseNameChange = (value)=>{
    setUserName(value);
  }
  const handleUserIntroChange = (value)=>{
    setUserIntro(value);
  }
  const handleUserDescChange = (value)=>{
    setUserDesc(value);
  }
  const saveData =  async (e) =>{
    e.preventDefault()
    let actionName = e.target.getAttribute('action-name');
    if(actionName == "save-profile-image"){
    let data = new FormData();
    let userId = user._id;
    let fileName = createFileName(user.name)+ "-"+ Date.now()
    let ext =  userUploadedProfileImage.name.split('.').pop();
    data.append('userId', userId)
    data.append('fileName', fileName)
    data.append('ext', ext)
    data.append('profileImage', userUploadedProfileImage)
    dispatch(saveProfImg(data))
   }
   if(actionName == "save-gal-images"){
    let data = new FormData();
    let userId = user._id;
    data.append('userId', userId)
    let fileName = createFileName(user.name)+ "-gallery-image-"
    data.append("fileName", fileName)
    userUploadedGalImages.map((image)=>{
      data.append('galImages[]', image)
    })
    dispatch(saveGalImages(data))
   }
    
    if(actionName == "change-name"){
       dispatch(changeName({
        newName: auth.newName,
        userId: user._id
       }))
    }
    if(actionName == "save-dating-city"){
      dispatch(saveDatingCity({
       datingCityId: auth.newDatingCityId,
       userId: user._id
      }))
   }
   if(actionName == "save-home-city"){
    
    dispatch(saveHomeCity({
    userId: user?._id,
    homeCityId: auth.newHomeCityId,
    }))
 }
    if(actionName == "save-gender"){
      dispatch(saveGender(
        profile.newGenderId,
      ))
      }
    if(actionName == "save-dating-goals"){
        dispatch(saveDatingGoals({number: 1}))
      }
    if(actionName == "remove-gal-image"){
      let userId = user?._id
      let galImage = auth.tempRemovedGalImgId
      let data = {userId, galImage}
      dispatch(removeGalImage(data))
      }
      if(actionName == "save-hobbies"){
        const userId = auth.user?._id
        const hobbyIdArray = auth.tempHobbyIdArray
        dispatch(saveHobbies({userId, hobbyIdArray}))
      }
      if(actionName == "save-kid-option"){
        const userId = auth.user?._id
        const kidOptId = auth.tempKidOptId
        dispatch(saveKidOption({userId, kidOptId}))
      }
      if(actionName == "save-smoking-option"){
        const userId = auth.user?._id
        const smokingOptId = auth.tempSmokingOptId
        dispatch(saveSmokingOption({userId, smokingOptId}))
      }
      if(actionName == "save-drinking-option"){
        const userId = auth.user?._id
        const drinkingOptId = auth.tempDrinkingOptId
        dispatch(saveDrinkingOption({userId, drinkingOptId}))
      }
      if(actionName == "save-jobs"){
        const userId = auth.user?._id
        const jobIdArray = auth.tempJobIdArray
        dispatch(saveJobs({userId, jobIdArray}))
      }
      if(actionName == "save-edu-option"){
        const userId = auth.user?._id
        const eduOptId = auth.tempEduOptId
        dispatch(saveEduOption({userId, eduOptId}))
      }
      if(actionName == "save-college-option"){
        const userId = auth.user?._id
        const collId = auth.tempCollId
        dispatch(saveCollegeOption({userId, collId}))
      }
      if(actionName == "save-name-change"){
        dispatch(saveName({
         name: auth.tempName,
         userId: auth.user?._id
        }))
     }
     if(actionName == "save-dob"){
      dispatch(saveDob({
       userId: user?._id,
       dob: auth.tempDob
      }))
   }
     if(actionName == "save-bio"){
      dispatch(saveBio({
       bio: auth.tempBio,
       userId: auth.user?._id
      }))
   }
     if(actionName == "save-height"){
      dispatch(saveHeight({
        userId: user?._id,
        height: auth.tempHeight,
      }))
   }
   if(actionName == "save-weight"){
    dispatch(saveWeight({
      userId: user?._id,
      weight: auth.tempWeight,
    }))
 }
}
const handleDatingGoalChange = (e)=>{
  if(e.target.checked){

    dispatch(addToTempDatingGoalIdArray(e.target.value))
    dispatch(showOffCanvasActiveConfirmBtn())
  }else {
    dispatch(removeFromTempDatingGoalIdArray(e.target.value))
    dispatch(showOffCanvasActiveConfirmBtn())
  }
}
const showOffCanvasForName = () => {
  setBOffTitle('Thay đổi tên')
  setBOffBody(
    <div>
      <NameChangeInput />
    </div>
  )
dispatch(prepareOffCanvasForName())
dispatch(showBOff())
}
const showOffCanvasForBio = () => {
  setBOffTitle('Mô tả bản thân')
  setBOffBody(
    <BioInput />
  )
dispatch(prepareOffCanvasForBio())
dispatch(showBOff())
}
const showOffCanvasForDesc = () => {
  setBOffTitle('Mô tả bản thân')
  setBOffBody(
    <div>
      <NameChangeInput />
    </div>
  )
dispatch(prepareOffCanvasForName())
dispatch(showBOff())
}
  const showOffCanvasForGalImage = ()=>{
    setOffCanvasPlacement('end')
    setOffCanvasTitle(
      'Chọn hình ảnh'
    ); 
    setOffCanvasBody(
      <Stack>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control 
          type="file" 
          name = "galImages"
          multiple
          accept="image/*"
          onChange={(e)=>{
            let currentGalImgCount = user.galImages.length
            let uploadedImgCount = e.target.files.length
            if(currentGalImgCount + uploadedImgCount > 9){
              dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "danger",
                alertText: `Vượt quá giới hạn 9 ảnh`
            }))
            }else{
              dispatch(resetOffCanvasAlert())
              dispatch(showOffCanvasActiveConfirmBtn())
              setUserUploadedGalImages([...userUploadedGalImages, ...e.target.files]);
              if( e.target.files.length > 0){
                let tempImgArr = []
                let i
                for(i = 0; i< e.target.files.length; i++) {
                  let url = URL.createObjectURL(e.target.files[i])
                  tempImgArr.push(url)
                }
                console.log(tempImgArr)
                dispatch(updateTempGalImages(tempImgArr))
              }
            }
          }}
          />
        </Form.Group>
        <Stack>
          <UploadedGalImgContainer />
        </Stack>
      </Stack>
    ); 
    dispatch(prepareOffCanvasForGalImages())
    handleOffCanvasShow()
  }
  const showOffCanvasForProfileImage = ()=>{
    setOffCanvasPlacement('end')
    setOffCanvasTitle(
      'Chọn ảnh đại diện'
    ); 
    setOffCanvasBody(
      <Stack>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control 
        type="file" 
        accept="image/*"
        name = "profileImage"
        onChange={(e)=>{
          dispatch(resetOffCanvasAlert())
          setUserUploadedProfileImage(e.target.files[0]);
          dispatch(updateTempProfImg(URL.createObjectURL(e.target.files[0])))
          dispatch(showOffCanvasActiveConfirmBtn())

        }}
        />
      </Form.Group>
      
      <Stack>
        <UploadedImgContainer />
        </Stack>
      
    </Stack>
    ); 
    dispatch(prepareOffCanvasForProfImg())
    handleOffCanvasShow()
  }
  const showOffCanvasForRemovingGalImg = ()=>{
    setOffCanvasPlacement('end')
    setOffCanvasTitle(
      'Xác nhận xóa ảnh'
    ); 
    setOffCanvasBody(
      <Stack>
        <span>Ảnh này sẽ không thể khôi phục sau khi bị xóa?</span>
      </Stack>
    ); 
    dispatch(prepareOffCanvasForRemovingGalImg())
    dispatch(showOffCanvasActiveConfirmBtn())
    handleOffCanvasShow()
  }
  const showOffCanvasForDatingCity = ()=>{
          new Promise((resolve, reject)=>{
            const response =  CustomAxios.get(`/data/cities`);
            resolve(response)
          }).then((response)=>{
              setOffCanvasPlacement("end");
              setOffCanvasTitle('Chọn tỉnh/thành phố hẹn hò')
              setOffCanvasBody(
                <div className="col">
                <div  className="mb-3">
                  {
                     <FloatingLabel controlId="floatingSelect" label="Địa điểm hẹn hò">
                     <Form.Select 
                     aria-label="Floating label select example"
                     onChange={(e)=> {
                      if(e.target.value === user?.cityId?._id) {
                        dispatch(showOffCanvasDisabledConfirmBtn())
                      }else{
                        dispatch(showOffCanvasActiveConfirmBtn())
                      }
                      dispatch(updateNewDatingCity(e.target.value))
                    
                    }}
                      
                     >
                       {
                response?.data.map((city) => {
                               return <option key={city._id} value={city._id} selected = {city._id == user?.datingCity?._id} >{city.name}</option>
                           })
                       }
                     </Form.Select>
                   </FloatingLabel>
                  }
                </div>
                </div>
              )
            dispatch(showOffCanvasForDatingCityChange())
            handleOffCanvasShow()
            })
  }
  const showOffCanvasForHomeCity = ()=>{
    new Promise((resolve, reject)=>{
      const response =  CustomAxios.get(`/data/cities`);
      resolve(response)
    }).then((response)=>{
        setOffCanvasPlacement("end");
        setOffCanvasTitle('Chọn quê quán')
        setOffCanvasBody(
          <div className="col">
          <div  className="mb-3">
            {
               <FloatingLabel controlId="floatingSelect" label="Quê quán">
               <Form.Select 
               aria-label="Floating label select example"
               onChange={(e)=> {
                if(e.target.value === user?.homeCity?._id) {
                  dispatch(showOffCanvasDisabledConfirmBtn())
                }else{
                  dispatch(showOffCanvasActiveConfirmBtn())
                }
                dispatch(updateNewHomeCityId(e.target.value))
              }}
               >
                 {
          response?.data.map((city) => {
                         return <option key={city._id} value={city._id} selected = {city._id == user?.homeCity?._id} >{city.name}</option>
                     })
                 }
               </Form.Select>
             </FloatingLabel>
            }
          </div>
          </div>
        )
      dispatch(prepareOffCanvasForHomeCity())
      handleOffCanvasShow()
      })
}
const showOffCanvasForDob = ()=>{
  setOffCanvasPlacement("end");
  setOffCanvasTitle('Ngày sinh')
  setOffCanvasBody(
    <DobSelection />
  )
dispatch(prepareOffCanvasForDob())
handleOffCanvasShow()
}
const showOffCanvasForHeight = ()=>{
      const heights = getHeights()
      setOffCanvasPlacement("end");
      setOffCanvasTitle('Chọn chiều cao')
      setOffCanvasBody(
        <div className="col">
        <div  className="mb-3">
          {
             <FloatingLabel controlId="floatingSelect" label="Quê quán">
             <Form.Select 
             aria-label="Floating label select example"
             onChange={(e)=> {
              if(e.target.value === user?.height) {
                dispatch(showOffCanvasDisabledConfirmBtn())
              }else{
                dispatch(showOffCanvasActiveConfirmBtn())
              }
              dispatch(updateTempHeight(e.target.value))
            }}
             >
               {
        heights?.map((height, index) => {
                       return <option key={index} value={height} selected = {height == user?.height} >{height} cm</option>
                   })
               }
             </Form.Select>
           </FloatingLabel>
          }
        </div>
        </div>
      )
    dispatch(prepareOffCanvasForHeight())
    handleOffCanvasShow()
    
}
const showOffCanvasForWeight = ()=>{
  const weights = getWeights()
  setOffCanvasPlacement("end");
  setOffCanvasTitle('Chọn cân nặng')
  setOffCanvasBody(
    <div className="col">
    <div  className="mb-3">
      {
         <FloatingLabel controlId="floatingSelect" label="Cân nặng">
         <Form.Select 
         aria-label="Floating label select example"
         onChange={(e)=> {
          if(e.target.value === user?.weight) {
            dispatch(showOffCanvasDisabledConfirmBtn())
          }else{
            dispatch(showOffCanvasActiveConfirmBtn())
          }
          dispatch(updateTempWeight(e.target.value))
        }}
         >
           {
    weights?.map((weight, index) => {
                   return <option key={index} value={weight} selected = {weight == user?.weight} >{weight} kg</option>
               })
           }
         </Form.Select>
       </FloatingLabel>
      }
    </div>
    </div>
  )
dispatch(prepareOffCanvasForWeight())
handleOffCanvasShow()
}
  const showOffCanvasForGenders = () => {
    new Promise((resolve, reject)=>{
      const response =  CustomAxios.get(`/profile/genders`);
      resolve(response)
    }).then((response)=>{
        setOffCanvasPlacement("end");
        setOffCanvasTitle('Chọn giới tính')
        setOffCanvasBody(
          <div >
            {
              
              response?.data?.length > 0 && response?.data?.map((gender, index)=>{
                if(profile.innitialGenderId && gender._id === profile.innitialGenderId) {
                  return <Form.Check // prettier-ignore
                onClick={(e)=>{
                  dispatch(updateNewGenderId(gender._id))
                  dispatch(updateData(e.target.value))
                  dispatch(showOffCanvasActiveConfirmBtn())
                }}
                className='mb-2'
                key={index}
                type="radio"
                value={gender._id}
                label={gender.name}
                name = "gender-option"
                checked
                readOnly
              />
                }else{
                 return <Form.Check // prettier-ignore
                onClick={(e)=>{
                  dispatch(updateNewGenderId(gender._id))
                  dispatch(updateData(e.target.value))
                  dispatch(showOffCanvasActiveConfirmBtn())
                }}
                className='mb-2'
                key={index}
                type="radio"
                value={gender._id}
                label={gender.name}
                name = "gender-option"
                />
                }
              })
            }
          </div>
        )
      dispatch(prepareOffCanvasForGenderChange({tempDatingGoalIdArray: auth.initialDatingGoalIdArray}))
      handleOffCanvasShow()
      })
  }
  const showOffCanvasForJobs = () => {
    setOffCanvasPlacement("end");
    setOffCanvasTitle('Chọn nghề nghiệp')
    setOffCanvasBody(
      <Stack >
        <JobSearch />
        <TempJobs/>
      </Stack>
    )
  dispatch(prepareOffCanvasForJobs())
  handleOffCanvasShow()
}
const showOffCanvasForEduOptions = () => {
  new Promise((resolve, reject)=>{
    let response =  CustomAxios.get(`/profile/edu-options`);
    resolve(response)
  }).then((response)=>{
      setOffCanvasPlacement("end");
      setOffCanvasTitle('Chọn trình độ học vấn')
      setOffCanvasBody(
        <div >
          {
            response.data.length > 0 && response.data.map((eduOption, index)=>{
              return <EduOption key = {index} value = {eduOption._id} label = {eduOption.name} id = {eduOption._id} />
            })
          }
        </div>
      )
    dispatch(prepareOffCanvasForEduOptions())
    handleOffCanvasShow()
    })
}
const showOffCanvasForColleges = () => {

  setOffCanvasPlacement("end");
  setOffCanvasTitle('Chọn trường cao đẳng, đại học')
  setOffCanvasBody(
    <Stack >
      <CollegeSearch />
      <TempCollege/>
    </Stack>
  )
dispatch(prepareOffCanvasForColleges())
handleOffCanvasShow()

}
  const showOffCanvasForDatingGoals = () => {
    new Promise((resolve, reject)=>{
      let response =  CustomAxios.get(`/profile/dating-goals`);
      resolve(response)
    }).then((response)=>{
        setOffCanvasPlacement("end");
        setOffCanvasTitle('Chọn mục tiêu hẹn hò')
        setOffCanvasBody(
          <div >
            {
              response?.data.length > 0 && response?.data.map((datingGoal, index)=>{
              let isChecked = auth.tempDatingGoalIdArray && auth.tempDatingGoalIdArray.length > 0 && auth.tempDatingGoalIdArray.includes(datingGoal._id) 
                return <Form.Check // prettier-ignore
              className='mb-2'
              key={index}
              type="checkbox"
              value={datingGoal._id}
              label={datingGoal.name}
              name = "dating-goal-option"
              defaultChecked = {isChecked}
              onChange={(e)=>{
                handleDatingGoalChange(e)
              }}
            />
              
            }
              )
            }
          </div>
        )
      dispatch(prepareOffCanvasForDatingGoalsChange())
      handleOffCanvasShow()
      })
  }
  const showOffCanvasForHobbies = () => {

        setOffCanvasPlacement("end");
        setOffCanvasTitle('Chọn sở thích và hoạt động')
        setOffCanvasBody(
          <Stack >
            <HobbySearch />
            <TempHobbies/>
          </Stack>
        )
      dispatch(prepareOffCanvasForHobby())
      handleOffCanvasShow()
      
  }
  const showOffCanvasForKidOptions = () => {
    new Promise((resolve, reject)=>{
      const response =  CustomAxios.get(`/profile/kid-options`);
      resolve(response)
    }).then((response)=>{
        setOffCanvasPlacement("end");
        setOffCanvasTitle('Chọn tình trạng con cái')
        setOffCanvasBody(
          <div >
            {
              response?.data.length > 0 && response?.data.map((kidOption, index)=>{
                return <KidOption key = {index} value = {kidOption._id} label = {kidOption.name} id = {kidOption._id} />
              })
            }
          </div>
        )
      dispatch(prepareOffCanvasForKidOption())
      handleOffCanvasShow()
      })
  }
  const showOffCanvasForSmokingOptions = () => {
    new Promise((resolve, reject)=>{
      let response =  CustomAxios.get(`/profile/smoking-options`);
      response = response.data
      resolve(response)
    }).then((response)=>{
        setOffCanvasPlacement("end");
        setOffCanvasTitle('Chọn thói quen hút thuốc')
        setOffCanvasBody(
          <div >
            {
              response.length > 0 && response.map((smokingOption, index)=>{
                return <SmokingOption key = {index} value = {smokingOption._id} label = {smokingOption.name} id = {smokingOption._id} />
              })
            }
          </div>
        )
      dispatch(prepareOffCanvasForSmokingOptions())
      handleOffCanvasShow()
      })
  }
  const showOffCanvasForDrinkingOptions = () => {
    new Promise((resolve, reject)=>{
      let response =  CustomAxios.get(`/profile/drinking-options`);
      resolve(response)
      response = response.data
    }).then((response)=>{
        setOffCanvasPlacement("end");
        setOffCanvasTitle('Chọn thói quen uống rượu bia')
        setOffCanvasBody(
          <div >
            {
              response.length > 0 && response.map((drinkingOption, index)=>{
                return <DrinkingOption key = {index} value = {drinkingOption._id} label = {drinkingOption.name} id = {drinkingOption._id} />
              })
            }
          </div>
        )
      dispatch(prepareOffCanvasForDrinkingOptions())
      handleOffCanvasShow()
      })
  }
 return (
    <div className="profile-section">
      <PageOffCanvas 
      _offCanvasShow = {offCanvasShow} 
      _offCanvasPlacement  = {offCanvasPlacement}
      _offCanvasBody={offCanvasBody} 
      _offCanvasTitle={offCanvasTitle} 
      _handleOffCanvasClose = {handleOffCanvasClose}
      _handleOffCanvasConfirm={saveData}
      _offCanVasData = {offCanvas.data}
      _dataFromServer={offCanvas.dataFromServer}
      _confirmBtnName={offCanvas.confirmBtnName}
      _disabledConfirmBtn={offCanvas.disabledConfirmBtn}
      _loadingStatus={offCanvas.loadingStatus}
      _offCanvasActionName={offCanvas.actionName}
      _offCanvasShowAlert={offCanvas.alertShow}
      _offCanvasAlertVariant = {offCanvas.alertVariant}
      _offCanvasAlertText = {offCanvas.alertText}
      />
      <BottomOffCanvas 
          _offCanvasTitle = {bOffTitle} 
          _offCanvasBody = {bOffBody}
          _offCanvasShow = {offCanvas.bOffShow} 
          _handleOffCanvasClose= {handleBOffClose}
          _handleOffCanvasConfirm={saveData}
          _confirmBtnName={offCanvas.confirmBtnName}
          _disabledConfirmBtn={offCanvas.disabledConfirmBtn}
          _offCanvasActionName={offCanvas.actionName}
          _offCanvasAlertVariant= {offCanvas.alertVariant}
          _offCanvasAlertText= {offCanvas.alertText}
          _offCanvasShowAlert={offCanvas.alertShow}
          />
        <Stack className="page-header">
            <div className="page-title">Profile</div>
            <div className="page-desc">Bạn có thể tải lên ảnh, cập nhật thông tin và sở thích... ở trang này.</div>
            <hr />
        </Stack>
        {
          user?.profileImage?  <Container><img src={`${imageUrl}/profile_images/${user?.profileImage}`} alt="" style={{width: "100%"}}/></Container>
          :
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" fill="currentColor" className="bi bi-person-bounding-box faded" viewBox="0 0 16 16">
                  <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5"/>
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              </svg>
        }
        <Container>
            <Stack style={{paddingBottom: "60px"}}>
                <Stack className='align-items-center'>
                  <Button 
                  variant="outline-secondary" 
                  size="lg"
                  className='m-2'
                  onClick={(e)=>{
                    e.preventDefault()
                    showOffCanvasForProfileImage()
                  }}
                  >
                    {
                      user?.profileImage? "Thay đổi ảnh đại diện"
                      : "Thêm ảnh đại diện"
                    }
                  
                  </Button>
                </Stack>
                <h5>Ảnh bộ sưu tập</h5>
                  {
                    user?.galImages.length >0 ? <Row className='g-2'>
                    {
                      user?.galImages && 
                        user?.galImages.map((galImage, index)=> {
                          return         <Col xs = {4} key={index}>
                          <div className='gal-container'>
                            <img src = {`${imageUrl}/gal_images/${galImage}`} style={{width: "100%"}}></img>
                            <div 
                            className='gal-delete-btn-container'
                            data-image-id = {galImage}  
                            data-action-type = "removeGalImage"  
                            onClick={(e)=>{
                              dispatch(updateTempRemovedGalImgId(e.currentTarget.getAttribute('data-image-id')))
                              showOffCanvasForRemovingGalImg()
                            }}
                            >
                              &times;
                            </div>
                          </div>
                        </Col>
                        })
                    }
                  </Row>
                  :
                  <Row className='g-2'>
                      <Col xs = {4} >
                          <div className='gal-container'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" fill="currentColor" class="bi bi-person-badge-fill faded" viewBox="0 0 16 16">
                              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6m5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1z"/>
                          </svg>
                          </div>
                      </Col>
                      <Col xs = {4} >
                          <div className='gal-container'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" fill="currentColor" class="bi bi-person-badge-fill faded" viewBox="0 0 16 16">
                              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6m5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1z"/>
                          </svg>
                          </div>
                      </Col>
                      <Col xs = {4} >
                          <div className='gal-container'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" fill="currentColor" class="bi bi-person-badge-fill faded" viewBox="0 0 16 16">
                              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6m5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1z"/>
                          </svg>
                          </div>
                      </Col>
                  </Row>
                  }
                  <Stack className='align-items-center'>
                      {
                        user?.galImages?.length ==9 && <span>(Tối đa)</span>
                      }
                    <Button 
                    variant="outline-secondary" 
                    className='mt-2'
                    size="lg" 
                    disabled = {user?.galImages?.length ==9}
                    onClick={()=>{
                      showOffCanvasForGalImage()
                    }}
                    >
                    Thêm hình ảnh
                    </Button>
                </Stack>
                <h5>Thông tin cơ bản</h5>
                <FloatingLabel
                    controlId="floatingInput"
                    label={user?.createdAt? "Tham gia: "+useConvertTimeLanguage(intlFormatDistance(user?.createdAt, Date.now())):""}
                    className="mb-3"
                    >
                      <Form.Control 
                      type="text" 
                      value = {user?.lastSeen? "Lần hoạt động gần nhất: "+useConvertTimeLanguage(intlFormatDistance(user?.lastSeen, Date.now())):""}
                      readOnly
                      style={{cursor:"pointer"}}
                      />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Tên"
                    className="mb-3"
                    >
                      <Form.Control 
                      type="text" 
                      value = {user?.name? user?.name : ""}
                      onClick={showOffCanvasForName}
                      readOnly
                      style={{cursor:"pointer"}}
                      />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Ngày sinh"
                    className="mb-3"
                    >
                      <Form.Control 
                      type="text" 
                      value = {user?.dob ? lightFormat(new Date(user?.dob), 'dd-MM-yyyy'): ""}
                      onClick={showOffCanvasForDob}
                      readOnly
                      style={{cursor:"pointer"}}
                      />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Giới thiệu"
                    
                    className="mb-3"
                    >
                      <Form.Control 
                      type="text" 
                      value = {user?.bio}
                      maxLength={350}
                      onClick={showOffCanvasForBio}
                      readOnly
                      style={{cursor:"pointer"}}
                      />
              </FloatingLabel>
              <FloatingLabel
                    controlId="floatingInput"
                    label="Địa điểm hẹn hò"
                    className="mt-2"
                    onClick={()=> {
                      showOffCanvasForDatingCity()
                    }}
                  >
                      <Form.Control 
                      type="text" 
                      style={{cursor:"pointer"}}
                      value={user?.datingCity ? user?.datingCity?.name : "Chọn tỉnh/thành phố"}
                      readOnly
                      />
              </FloatingLabel>
              <FloatingLabel
                    controlId="floatingInput"
                    label="Quê quán"
                    className="mt-2"
                    onClick={()=> {
                      showOffCanvasForHomeCity()
                    }}
                  >
                      <Form.Control 
                      type="text" 
                      style={{cursor:"pointer"}}
                      value={user?.homeCity ? user?.homeCity?.name : "Chọn tỉnh/thành phố"}
                      readOnly
                      />
              </FloatingLabel>
              <FloatingLabel
                    controlId="floatingInput"
                    label="Giới tính"
                    className="mt-2"
                    onClick={()=> {
                      dispatch(getGenders())
                      showOffCanvasForGenders()
                    }}
                  >
                      <Form.Control 
                      type="text" 
                      style={{cursor:"pointer"}}
                      value={user?.gender ? user?.gender?.name : "Chọn giới tính"}
                      readOnly
                      />
              </FloatingLabel>
              <FloatingLabel
                      controlId="floatingInput"
                      label="Chiều cao"
                      className="mt-2"
                      onClick={()=> {
                        
                        showOffCanvasForHeight()
                      }}
                    >
                        <Form.Control 
                        type="text" 
                        style={{cursor:"pointer"}}
                        value={user?.height ? `${user?.height} cm` : "Chọn chiều cao"}
                        readOnly
                        />
              </FloatingLabel>
              <FloatingLabel
                      controlId="floatingInput"
                      label="Cân nặng"
                      className="mt-2"
                      onClick={()=> {
                        
                        showOffCanvasForWeight()
                      }}
                    >
                        <Form.Control 
                        type="text" 
                        style={{cursor:"pointer"}}
                        value={user?.weight ? `${user?.weight} kg` : "Chọn cân nặng"}
                        readOnly
                        />
              </FloatingLabel>
              <FloatingLabel
                      controlId="floatingInput"
                      label="Mục tiêu hẹn hò"
                      className="mt-2"
                      onClick={()=> {
                        dispatch(getDatingGoals())
                        showOffCanvasForDatingGoals()
                      }}
                    >
                        <Form.Control 
                        type="text" 
                        style={{cursor:"pointer"}}
                        value= {user?.datingGoals?.length > 0 ? user?.datingGoals?.map((datingGoal)=>{
                          return datingGoal.name
                        }) : "Chọn mục tiêu hẹn hò"}
                        readOnly
                        />
                </FloatingLabel>
                <Stack 
                  className="profile-item mt-2">
                    <h4>Nghề nghiệp</h4>
                    {
                      auth.user?.jobs?.length > 0? <Stack 
                      onClick={showOffCanvasForJobs}
                      className="jobs-container cursor-pointer" 
                      direction = "horizontal" 
                      gap = {3}
                      style={{flexWrap:"wrap"}}
                      >
                          {
                            auth.user.jobs.map((job, index)=>{
                              return <NoBadgeJobContainer key = {index} name = {job.name} />
                            })
                          }
                      </Stack>
                      : <span
                      className='px-2 py-3 border-radius-sm'
                      style= {{cursor: "pointer", border: "1px solid #bb86fc"}}
                      onClick={showOffCanvasForJobs}
                      >Chọn nghề nghiệp của bạn tại đây (Tối đa 3).</span>
                    }
                    {
                      auth.user?.jobs?.length == 3 && <span className='mt-2'>(Tối đa)</span>
                    }
                    <hr />
                </Stack>
                <Stack className="profile-item mt-2">
                      <h4>Học vấn</h4>
                      <FloatingLabel
                      controlId="floatingInput"
                      label="Trình độ"
                      className="mt-2"
                      onClick={()=> {
                        showOffCanvasForEduOptions()
                      }}
                    >
                        <Form.Control 
                        type="text" 
                        style={{cursor:"pointer"}}
                        value= {user?.eduOption? user?.eduOption.name: "Trình độ học vấn"}
                        readOnly
                        />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Trường CĐ, ĐH"
                      className="mt-2"
                      onClick={()=> {
                        showOffCanvasForColleges()
                      }}
                    >
                        <Form.Control 
                        type="text" 
                        style={{cursor:"pointer"}}
                        value= {user?.college? user?.college.name: "Chọn trường CĐ/ĐH đã/đang học."}
                        readOnly
                        />
                    </FloatingLabel>
                      <hr />
                  </Stack>
                  <Stack 
                    className="profile-item mt-2">
                      <h4>Sở thích và hoạt động</h4>
                      {
                        auth.user?.hobbies?.length > 0? <Stack 
                        onClick={showOffCanvasForHobbies}
                        className="hobbies-container cursor-pointer" 
                        direction = "horizontal" 
                        gap = {3}
                        style={{flexWrap:"wrap"}}
                        >
                            {
                              auth.user?.hobbies.map((hobby, index)=>{
                                return <NoBadgeHobbyContainer key = {index} name = {hobby.name} type = {hobby.type} />
                              })
                            }
                        </Stack>
                        : <span
                        className='px-2 py-3 border-radius-sm'
                        style= {{cursor: "pointer", border: "1px solid #bb86fc"}}
                        onClick={showOffCanvasForHobbies}
                        >Chọn sở thích và hoạt động của bạn tại đây.</span>
                      }
                      <hr />
                  </Stack>
                  <Stack className="profile-item mt-2">
                      <h4>Lối sống</h4>
                      <FloatingLabel
                      controlId="floatingInput"
                      label="Con cái"
                      className="mt-2"
                      onClick={()=> {
                        showOffCanvasForKidOptions()
                      }}
                    >
                        <Form.Control 
                        type="text" 
                        style={{cursor:"pointer"}}
                        value= {user?.kidOption? user?.kidOption.name: "Tình trạng con cái"}
                        readOnly
                        />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Hút thuốc"
                      className="mt-2"
                      onClick={()=> {
                        showOffCanvasForSmokingOptions()
                      }}
                    >
                        <Form.Control 
                        type="text" 
                        style={{cursor:"pointer"}}
                        value= {user?.smokingOption? user?.smokingOption.name: "Thói quen hút thuốc"}
                        readOnly
                        />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Uống rượu bia"
                      className="mt-2"
                      onClick={()=> {
                        showOffCanvasForDrinkingOptions()
                      }}
                    >
                        <Form.Control 
                        type="text" 
                        style={{cursor:"pointer"}}
                        value= {user?.drinkingOption? user?.drinkingOption.name: "Thói quen uống rượu bia"}
                        readOnly
                        />
                    </FloatingLabel>
                    <hr />
                  </Stack>
            </Stack>
        </Container>
 </div> 
 )
  
}
export default Profile;
