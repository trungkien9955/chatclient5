import React, { useState,useEffect } from 'react'
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import Input from '@mui/joy/Input';



 const Hobbies = ({userId}) => {
    const   [userHobbies, setUserHobbies] = useState([]);
    const [hobbies, setHobbies] = useState([]);
    const [results, setResults] = useState([]);
    const [newHobbies, setNewHobbies] = useState([]);
    const [hobbySearchValue, setHobbySearchValue] = useState('');
    const [input, setInput] = useState('');
    const [userHobbyIdCollection, setUserHobbyIdCollection] = useState();

    const fetchUserHobbies = () => {
        fetch("http://127.0.0.1:8000/api/user-hobbies/"+userId)
        .then((response) => response.json())
        .then((object)=>{
          console.log(object.userHobbies)
            setUserHobbies(object.userHobbies)
            setUserHobbyIdCollection(object.userHobbyIdCollection)
        })
    }
    const fetchHobbies = (value)=>{
        fetch("http://127.0.0.1:8000/api/hobbies")
           .then((response)=>response.json())
           .then((object)=>{
           const filteredHobbies =  object.hobbies.filter((hobby)=>{
                return value && hobby.name.toLowerCase().includes(value);
            })
            setResults(filteredHobbies);
           })
      }
      const handleChange = (value) => {
        setInput(value);
        fetchHobbies(value);
    }
      const addHobby = (hobby_id) => {
        fetch("http://127.0.0.1:8000/api/hobby/"+hobby_id)
          .then((response) => response.json())
          .then((object)=>{
            setUserHobbies(userHobbies => [...userHobbies, object.hobby])
          })
      }
      const removeHobby = (hobby_id) => {
        hobby_id = parseInt(hobby_id)
        const updatedHobbies =  userHobbies.filter(userHobby=>userHobby.id !== hobby_id)
        setUserHobbies(updatedHobbies)
      }
    useEffect(()=>{
        fetchUserHobbies();
    }, [])
  return (
    <>
    <div >
    <div className='d-flex'>
       {
        userHobbies.map((userHobby)=>{
            return   <>
            <Chip 
            variant="outlined"
            color="danger"
            endDecorator={
                <ChipDelete
                  data = {userHobby.id}
                  color="danger"
                  variant="plain"
                  onClick={(e)=>{
                    removeHobby(e.currentTarget.getAttribute('data'));console.log(e.currentTarget.getAttribute('data'))
                  }}
                >
                </ChipDelete>
              }
            >
            <img src = {userHobby.icon} style = {{width: "20px", height: "20px"}} ></img>
            <span>{userHobby.name}</span>      
            </Chip>
            </> 
        }) 
       }
  </div>
  <div className='d-flex'>
  {
   newHobbies.map((newHobby)=>{
              return    <div>
              <Chip
          size="sm"
          variant="outlined"
          color="danger"
          sx={{ p: "4px", m:"4px" }}
          endDecorator={<ChipDelete onDelete={() => alert('Delete')} />}
          data-hobbyId = {newHobby.id}
        >
              <img src = {newHobby.icon} style = {{width: "20px", height: "20px"}} ></img>
              <span>{newHobby.name}</span>      
              </Chip>
              </div>
   })
        }
  </div>
  </div>
   <Input 
   placeholder="Tìm sở thích..." 
   variant="outlined" 
   value = {input} 
   style = {{marginTop: "12px"}}
   onChange={(e)=> {
    handleChange(e.target.value)
  }}
   />
   <div className='hobby-dropdown'>
   {
       results.map((result)=>{
           if(userHobbyIdCollection.includes(result.id)){
           return <div
           key = {result.id}
           size="sm"
           variant="outlined"
           color="danger"
           sx={{ p: "4px", m:"4px" }}
           endDecorator={<ChipDelete onDelete={() => alert('Delete')} />}
           data-hobbyid = {result.id}
           onClick={(e)=>{
            addHobby(e.currentTarget.getAttribute('data-hobbyid'));
        }}
         >
               <img src = {result.icon} style = {{width: "20px", height: "20px"}} ></img>
               <span>{result.name}</span>      
               </div>
           }else {
           return <div
           key = {result.id}
           size="sm"
           variant="outlined"
           color="success"
           sx={{ p: "4px", m:"4px" }}
           data-hobbyid = {result.id}
           onClick={(e)=>{
            addHobby(e.currentTarget.getAttribute('data-hobbyid'));
        }}
         >
               <img src = {result.icon} style = {{width: "20px", height: "20px"}} ></img>
               <span>{result.name}</span>      
               </div>
           }
       })
   }
   </div>

   </>
  )
}
export default Hobbies;
