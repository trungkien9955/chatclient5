import { bgImgStore } from "../utils/BgImgStore";
const getBgImg = ()=>{
    const bgImg = "/src/assets/bg-images/" + bgImgStore[Math.floor(Math.random()*bgImgStore.length)];
    return bgImg
}
export default getBgImg

 