import { Stack } from "react-bootstrap";

const HobbiesContainer = ({hobbies}) => {
    return ( 
        <Stack
        className="hobbies-container"
        direction = "horizontal" 
          gap = {3}
        >
            {
                hobbies && hobbies.length > 0 && hobbies.map((hobby)=>{
                    return <span></span>
                })
            }
        </Stack>
     );
}
 
export default HobbiesContainer;