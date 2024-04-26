import { Stack } from "react-bootstrap";

import NextWeekIcon from '@mui/icons-material/NextWeek';
const NoBadgeJobContainer = ({ name}) => {
    return ( 
            
              <Stack className="job-container hoverable-inverse" direction = "horizontal" gap = {1}>
                 <NextWeekIcon/>
              <span>{name}</span>
              </Stack>
     );
}
 
export default NoBadgeJobContainer;