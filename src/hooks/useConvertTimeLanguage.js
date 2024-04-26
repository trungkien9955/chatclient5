 const useConvertTimeLanguage = (timeString)=>{
    let vietnameseTimeLang = timeString.replace("now", "Vừa xong")
    vietnameseTimeLang = vietnameseTimeLang.replace("yesterday", "Hôm qua")
    vietnameseTimeLang = vietnameseTimeLang.replace("yesterday", "Ngày mai")
    vietnameseTimeLang = vietnameseTimeLang.replace("last week", "Tuần trước")
    vietnameseTimeLang = vietnameseTimeLang.replace("last month", "Tháng trước")
    vietnameseTimeLang = vietnameseTimeLang.replace("last quarter", "Quý trước")
    vietnameseTimeLang = vietnameseTimeLang.replace("last year", "Năm trước")
    vietnameseTimeLang = vietnameseTimeLang.replace("seconds ago", "giây trước")
    vietnameseTimeLang = vietnameseTimeLang.replace("second ago", "giây trước")
    vietnameseTimeLang = vietnameseTimeLang.replace("minute ago", "phút trước")
    vietnameseTimeLang = vietnameseTimeLang.replace("minutes ago", "phút trước")
    vietnameseTimeLang = vietnameseTimeLang.replace("hours ago", "giờ trước")
    vietnameseTimeLang = vietnameseTimeLang.replace("hour ago", "giờ trước")
    vietnameseTimeLang = vietnameseTimeLang.replace("days ago", "ngày trước")
    vietnameseTimeLang = vietnameseTimeLang.replace("weeks ago", "tuần trước")
    vietnameseTimeLang = vietnameseTimeLang.replace("months ago", "tháng trước")
    vietnameseTimeLang = vietnameseTimeLang.replace("quarters ago", "quý trước")
    vietnameseTimeLang = vietnameseTimeLang.replace("years ago", "năm trước")
    return vietnameseTimeLang
}
export default useConvertTimeLanguage