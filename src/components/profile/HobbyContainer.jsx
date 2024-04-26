import { Badge } from "@mui/material";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import TheatersIcon from '@mui/icons-material/Theaters';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeckIcon from '@mui/icons-material/Deck';
import PetsIcon from '@mui/icons-material/Pets';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import Face2Icon from '@mui/icons-material/Face2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import WineBarIcon from '@mui/icons-material/WineBar';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import NextWeekIcon from '@mui/icons-material/NextWeek';
import { Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeFromTempHobbies, removeFromTempHobbyIdArray } from "../../features/authSlice";
const HobbyContainer = ({name, type, hobbyId}) => {
    const dispatch = useDispatch()
    return ( 
            <Badge 
              color="secondary" 
              className="hoverable"
              
              badgeContent={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" hobby-id = {hobbyId}
              onClick = {(e)=>{
                dispatch(removeFromTempHobbies(e.target.getAttribute("hobby-id")))
                dispatch(removeFromTempHobbyIdArray(e.target.getAttribute("hobby-id")))
            }}
              >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              
            </svg>
            }  
           
              >
              <Stack className="hobby-container " direction = "horizontal" gap = {1}>
              {
                type == "Music"? <LibraryMusicIcon/>: type == "Film"? <TheatersIcon/>: type== "Food"?<RestaurantIcon/>: type == "Art"?<AutoFixHighIcon/>: type == "Outdoor"?<DeckIcon/>: type == "Pet"?<PetsIcon/>: type == "Social"?<Diversity2Icon/>: type == "Travel"?<LocalAirportIcon/>: type == "Personal"?<Face2Icon/>: type == "Shopping"?<ShoppingCartIcon/>: type == "Sport"?<SportsSoccerIcon/>: type == "Tech"?<ImportantDevicesIcon/>: type == "Drink"?<WineBarIcon/>: type == "Fitness"?<FitnessCenterIcon/>: type == "Game"?<SportsEsportsIcon/>: type == "Business"?<NextWeekIcon/>: null
              }
              <span>{name}</span>
              </Stack>
              </Badge>
     );
}
 
export default HobbyContainer;