import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { imageUrl } from "../../utils/services";
import { Badge } from '@mui/material';
import { Stack } from 'react-bootstrap';
const RankItem = ({rank, img, name, heartCount}) => {
    return ( 
        <Stack 
        className="rank-item border-pr-weak px-1 py-2 border-left border-radius-sm"
        direction="horizontal"
        gap = {1}
        >
            <div className="rank-item-symbol">
                {
                    rank == 0 ? <EmojiEventsIcon sx={{fontSize: "28px", color: "gold"}}/> 
                    : rank == 1 ? <EmojiEventsIcon sx={{fontSize: "26px", color: "silver"}}/> 
                    :rank == 2 ?<EmojiEventsIcon sx={{fontSize: "22px", color: "#CD7F32"}}/> 
                    :rank == 3 ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-4-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M7.519 5.057c-.886 1.418-1.772 2.838-2.542 4.265v1.12H8.85V12h1.26v-1.559h1.007V9.334H10.11V4.002H8.176zM6.225 9.281v.053H8.85V5.063h-.065c-.867 1.33-1.787 2.806-2.56 4.218"/>
                    </svg>
                    :rank == 4 ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-5-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8.006 4.158c1.74 0 2.924-1.119 2.924-2.806 0-1.641-1.178-2.584-2.56-2.584-.897 0-1.442.421-1.612.68h-.064l.193-2.344h3.621V4.002H5.791L5.445 8.63h1.149c.193-.358.668-.809 1.435-.809.85 0 1.582.604 1.582 1.57 0 1.085-.779 1.682-1.57 1.682-.697 0-1.389-.31-1.53-1.031H5.276c.065 1.213 1.149 2.115 2.72 2.115Z"/>
                    </svg>
                    :rank == 5 ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-6-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.21 3.855c-1.868 0-3.116 1.395-3.116 4.407 0 1.183.228 2.039.597 2.642.569.926 1.477 1.254 2.409 1.254 1.629 0 2.847-1.013 2.847-2.783 0-1.676-1.254-2.555-2.508-2.555-1.125 0-1.752.61-1.98 1.155h-.082c-.012-1.946.727-3.036 1.805-3.036.802 0 1.213.457 1.312.815h1.29c-.06-.908-.962-1.899-2.573-1.899Zm-.099 4.008c-.92 0-1.564.65-1.564 1.576 0 1.032.703 1.635 1.558 1.635.868 0 1.553-.533 1.553-1.629 0-1.06-.744-1.582-1.547-1.582"/>
                    </svg>
                    :rank == 6 ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-7-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.37 5.11h3.972v.07L6.025 12H7.42l3.258-6.85V4.002H5.369v1.107Z"/>
                    </svg>
                    :rank == 7 ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-8-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-5.03 1.803c0-1.248-.943-1.84-1.646-1.992v-.065c.598-.187 1.336-.72 1.336-1.781 0-1.225-1.084-2.121-2.654-2.121s-2.66.896-2.66 2.12c0 1.044.709 1.589 1.33 1.782v.065c-.697.152-1.647.732-1.647 2.003 0 1.39 1.19 2.344 2.953 2.344 1.77 0 2.989-.96 2.989-2.355Zm-4.347-3.71c0 .739.586 1.255 1.383 1.255s1.377-.516 1.377-1.254c0-.733-.58-1.23-1.377-1.23s-1.383.497-1.383 1.23Zm-.281 3.645c0 .838.72 1.412 1.664 1.412.943 0 1.658-.574 1.658-1.412 0-.843-.715-1.424-1.658-1.424-.944 0-1.664.58-1.664 1.424"/>
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-9-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8.223 4.146c2.104 0 3.123-1.464 3.123-4.3 0-3.147-1.459-4.014-2.97-4.014-1.63 0-2.871 1.02-2.871 2.73 0 1.706 1.171 2.667 2.566 2.667 1.06 0 1.7-.557 1.934-1.184h.076c.047 1.67-.475 3.023-1.834 3.023-.71 0-1.149-.363-1.248-.72H5.258c.094.908.926 1.798 2.52 1.798Zm.118-3.972c.808 0 1.535-.528 1.535-1.594s-.668-1.676-1.56-1.676c-.838 0-1.517.616-1.517 1.659 0 1.072.708 1.61 1.54 1.61Z"/>
                    </svg>
                }
            </div>
            <div className="rank-item-heart-count">
            <Badge badgeContent={heartCount} color="error" sx={{fontSize: "12px"}}>
                <FavoriteIcon sx={{color: "#bb86fc"}} />
            </Badge>
            </div>
            <div className="rank-item-profile">
            <img src = {`${imageUrl}/profile_images/${img}`} style={{width: "32px", height: "32px", borderRadius: "50%"}}></img> 
            </div>
            <div className="rank-item-name">{name}</div>
            <hr/>
        </Stack>
     );
}
 
export default RankItem;