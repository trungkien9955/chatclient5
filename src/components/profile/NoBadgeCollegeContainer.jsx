import { Stack } from "react-bootstrap";
import SchoolIcon from '@mui/icons-material/School';

const NoBadgeCollegeContainer = ({ name}) => {
    return ( 
            
              <Stack className="job-container hoverable-inverse" direction = "horizontal" gap = {1}>
                 <SchoolIcon/>
              <span>{name}</span>
              </Stack>
     );
}
 
export default NoBadgeCollegeContainer;