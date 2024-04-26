import { Stack } from "react-bootstrap";
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
const NoBadgeHobbyContainer = ({name, type}) => {
    return ( 
            
              <Stack className="hobby-container hoverable-inverse" direction = "horizontal" gap = {1}>
              {
                type == "Music"? <LibraryMusicIcon/>: type == "Film"? <TheatersIcon/>: type== "Food"?<RestaurantIcon/>: type == "Art"?<AutoFixHighIcon/>: type == "Outdoor"?<DeckIcon/>: type == "Pet"?<PetsIcon/>: type == "Social"?<Diversity2Icon/>: type == "Travel"?<LocalAirportIcon/>: type == "Personal"?<Face2Icon/>: type == "Shopping"?<ShoppingCartIcon/>: type == "Sport"?<SportsSoccerIcon/>: type == "Tech"?<ImportantDevicesIcon/>: type == "Drink"?<WineBarIcon/>: type == "Fitness"?<FitnessCenterIcon/>: type == "Game"?<SportsEsportsIcon/>: type == "Business"?<NextWeekIcon/>: null
              }
              <span>{name}</span>
              </Stack>
     );
}
 
export default NoBadgeHobbyContainer;