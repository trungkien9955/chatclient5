import { Col, Container, Row, Stack } from "react-bootstrap";
import {  useDispatch, useSelector } from 'react-redux';
import UserProfile from "../components/user/UserProfile";
import RankItem from "../components/stats/RankItem";
import BarChart from "../components/stats/TotalUserChart";
import DoughnutChart from "../components/stats/DoughnutChart";
import LineChart from "../components/stats/LineChart";
import { Link, useSearchParams } from 'react-router-dom';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import {motion} from 'framer-motion'
import { fetchStats } from "../features/statsSlice";
import { useEffect } from "react";

const pageHeaderVariants = {
    hidden: {
        x: '100vw',
        opacity: 0,
    }, 
    visible: {
        opacity: 1,
        x: 0,
        transition: {delay: 0.5, duration:  0.5}
    },
    exit: {
        x: '100vw',
        transition: {ease: "easeInOut"}
    }
}
const containerVariants = {
    hidden: {
        y: '100vh',
        opacity: 0,
    }, 
    visible: {
        opacity: 1,
        y: 0,
        transition: {delay: 0.5, duration:  0.5}
    },
    exit: {
        y: '100vh',
        transition: {ease: "easeInOut"}
    }
}
const Stats = () => {
    const dispatch = useDispatch()
    const stats = useSelector(state=>state.stats)
    const user = useSelector(state=>state.auth.user)
    const onlineUsers = useSelector(state=>state.chat.onlineUsers)
    const onlineUsersInCity = onlineUsers.filter((user)=>user.dCityId == user?.datingCity?._id)
    const onlineUsersInCityCount = onlineUsersInCity.length
    const topUsers = stats.topUsers
    const users = stats.users
    const totalOnlineUsers = useSelector(state=>state.chat.onlineUsers.length)

    const userData = {
        labels: ["Nam", "Nữ"],
        datasets: [{
            label:"Số người:",
            data: [stats.mUserCount, stats.fUserCount],
            backgroundColor: ["#03dac6", "#bb86fc"]
        }]
    }
    useEffect(()=>{
        dispatch(fetchStats({dCityId: user?.datingCity?._id}))
    }, [])
    return ( 
        <div 
        className="stats-section"
        style={{fontSize: "12px"}}
        >
        <motion.div
        variants = {pageHeaderVariants}
        initial = "hidden"
        animate = "visible"
        exit = "exit"
        >
        <Stack 
        className="page-header"
        >
        <div className="page-title">Thống kê</div>
        <div className="page-desc">Xem bảng xếp hạng, thống kê người dùng, ...</div>
        </Stack>
        </motion.div>
        <motion.div
                        variants = {containerVariants}
                        initial = "hidden"
                        animate = "visible"
                        exit = "exit"
        >

        <Container 
        className="stats p-1 surface-4">
            <Row>
                <Col lg = {7} xs= {7}>
                    <Stack className="p-1 surface-2 box-shadow-black-right-bottom " style={{borderRadius: "0.5rem", minHeight: "80vh", marginBottom:"64px"}}>
                        <Stack direction="horizontal" gap={1} className="p-2">
                        <VolunteerActivismIcon/>
                        Ai nhận tim nhiều nhất?
                        </Stack>
                        <Stack 
                        direction="vertical" 
                        className="top-user-container p-1"
                        gap={1}
                        >
                            {
                                users && users.length > 0 && <>
                                    {
                                        users.map((user, index)=>{
                                            return <RankItem key = {index} rank = {index} img = {user.profileImage} name = {user.name} heartCount = {user.fans.length}/>
                                        })
                                    }
                                </>
                            }
                        </Stack>
                    </Stack>
                </Col>
                <Col lg = {5} xs= {5}>
                    <Stack direction="vertical" gap={4} className="py-4">
                        <Stack className="py-2 px-2 surface-2 box-shadow-black-right-bottom" style={{borderRadius: "0.5rem" }}>
                            <DoughnutChart chartData={userData}/>
                            <Stack direction="horizontal" gap={1}>
                                <GroupsIcon/>
                                <span>Toàn ứng dụng</span>
                            </Stack>
                            <hr />
                            <Stack direction="horizontal" gap={1}>
                                Tổng người dùng: <span className="color-pr fw-bold">{stats.totalUser}</span>
                            </Stack>
                            <Stack direction="horizontal" gap={1}>
                               Nữ: <span className="color-pr fw-bold">{stats.fUserCount}</span>
                            </Stack>
                            <Stack direction="horizontal" gap={1}>
                               Nam: <span className="color-pr fw-bold">{stats.mUserCount}</span>
                            </Stack>
                            <Stack direction="horizontal" gap={1}>
                                Tổng online: <span className="color-pr fw-bold">{totalOnlineUsers}</span>
                            </Stack>
                            <Stack direction="horizontal" gap={1}>
                                Tổng match: <span className="color-pr fw-bold">{stats.matchCount}</span>
                            </Stack>
                        </Stack>
                        <Stack className="py-3 px-2 surface-2 box-shadow-black-right-bottom" style={{borderRadius: "0.5rem" }}>
                            <Stack direction="horizontal" gap={1}>
                                <PersonIcon/>
                                <span>Dành cho bạn</span>
                            </Stack>
                            <hr />
                            <Stack direction="horizontal" gap={1}>
                                Người dùng tại {user?.datingCity?.name}: <span className="color-pr fw-bold">{stats.cityUserCount}</span>
                            </Stack>
                            <Stack direction="horizontal" gap={1}>
                                Online tại {user?.datingCity?.name}: <span className="color-pr fw-bold">{onlineUsersInCityCount}</span>
                            </Stack>
                            <Stack direction="horizontal" gap={1}>
                                Người thích bạn: <span className="color-pr fw-bold">{user?.fans.length}</span>
                            </Stack>
                            <Stack direction="horizontal" gap={1}>
                                Người bạn thích: <span className="color-pr fw-bold">{user?.likedStrangers.length}</span>
                            </Stack>
                            <Stack direction="horizontal" gap={1}>
                                Match: <span className="color-pr fw-bold">{user?.chats?.length}</span>
                            </Stack>
                        </Stack>
                    </Stack>
                </Col>
            </Row>
        </Container>
        </motion.div>
        </div>
     );
}
 
export default Stats;