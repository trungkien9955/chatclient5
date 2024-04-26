import { Accordion, Container, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
import { bT07, rL05 } from "../components/ui/FramerMotion";

const Instructions = () => {
    const navigate = useNavigate()
    return ( <div className="instructions-section ">
            <motion.div
            variants={rL05}
            initial= "hidden"
            animate = "visible"
            exit= "exit"
            >
            <Stack className="page-header">
                <div className="page-title">Hướng dẫn sử dụng Amo Dating,</div>
                <div className="page-desc">Thông tin cơ bản để bạn sử dụng Amo Dating một cách hiệu quả.</div>
                <hr />
            </Stack>
            </motion.div>
            
          <Stack className="surface-5 w-100 h-100">
          <motion.div
            variants={bT07}
            initial= "hidden"
            animate = "visible"
            exit= "exit"
          >
            <Stack 
            gap={3}
            className="instructions-wrapper surface-4 px-3 py-5 mt-2 border-radius w-100 h-100">
                <Accordion defaultActiveKey="0" flush alwaysOpen>
                    <Accordion.Item eventKey="0" className="custom-acc-item">
                        <Accordion.Header>
                            <Stack direction="horizontal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-heart-pulse-fill" viewBox="0 0 16 16">
                                    <path d="M1.475 9C2.702 10.84 4.779 12.871 8 15c3.221-2.129 5.298-4.16 6.525-6H12a.5.5 0 0 1-.464-.314l-1.457-3.642-1.598 5.593a.5.5 0 0 1-.945.049L5.889 6.568l-1.473 2.21A.5.5 0 0 1 4 9z"/>
                                    <path d="M.88 8C-2.427 1.68 4.41-2 7.823 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C11.59-2 18.426 1.68 15.12 8h-2.783l-1.874-4.686a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8z"/>
                                </svg>
                                <span className="ms-1">Hướng dẫn chung</span>
                            </Stack>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Stack 
                                gap={2}
                                className="instructions-container light-text">
                                <Stack 
                                    direction="horizontal"
                                    gap={2}
                                    className="px-2 py-3 surface-1 border-radius-sm border-pr-weak box-shadow-black-right-bottom"
                                    >
                                        <span className="ms-4">Amo Dating hoạt động dựa trên quy trình đơn giản: Bạn cung cấp thông tin và mô tả về bản thân, Amo Dating sẽ hiển thị cho bạn những người dùng có nhiều điểm tương đồng với bạn. Khi bạn sử dụng bộ lọc, trang chủ Amo Dating sẽ chỉ hiển thị những người dùng đáp ứng đúng tiêu chí bạn đã lựa chọn.</span>
                                </Stack>
                                <Stack 
                                    direction="horizontal"
                                    className="px-2 py-3 surface-1 border-radius-sm border-pr-weak box-shadow-black-right-bottom"
                                    >
                                        <span className="ms-4">Để bắt đầu sử dụng Amo Dating, bạn cần vào trang <span className="link-pr cursor-pointer" onClick={()=>{navigate("/profile")}}>Profile</span> và cập nhật thông tin của bản thân.</span>
                                </Stack>
                                <Stack 
                                    direction="horizontal"
                                    className="px-2 py-3 surface-1 border-radius-sm border-pr-weak box-shadow-black-right-bottom"
                                    >
                                        <span className="ms-4">Tại trang <span className="link-pr cursor-pointer" onClick={()=>{navigate("/profile")}}>Profile</span> bạn có thể tải lên ảnh đại diện, và các ảnh mô tả khác (nếu có). Đối với ảnh mô tả, bạn có thể tải lên nhiều ảnh cùng một lúc (Tối đa 9 ảnh).</span>
                                </Stack>
                                <Stack 
                                    direction="horizontal"
                                    className="px-2 py-3 surface-1 border-radius-sm border-pr-weak box-shadow-black-right-bottom"
                                    >
                                        <span className="ps-4">Bạn càng cập nhật đầy đủ thông tin cá nhân, cơ hội bạn xuất hiện trên trang chủ của người dùng khác càng cao.</span>
                                </Stack>
                            </Stack>
                    </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                                <Stack direction="horizontal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-heart-pulse-fill" viewBox="0 0 16 16">
                                        <path d="M1.475 9C2.702 10.84 4.779 12.871 8 15c3.221-2.129 5.298-4.16 6.525-6H12a.5.5 0 0 1-.464-.314l-1.457-3.642-1.598 5.593a.5.5 0 0 1-.945.049L5.889 6.568l-1.473 2.21A.5.5 0 0 1 4 9z"/>
                                        <path d="M.88 8C-2.427 1.68 4.41-2 7.823 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C11.59-2 18.426 1.68 15.12 8h-2.783l-1.874-4.686a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8z"/>
                                    </svg>
                                    <span className="ms-1">Tìm người theo ý bạn</span>
                                </Stack>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Stack
                             gap={2}
                             className="instructions-container light-text"
                            >
                                <Stack 
                                    direction="horizontal"
                                    className="px-2 py-3 surface-1 border-radius-sm border-pr-weak box-shadow-black-right-bottom"
                                    >
                                        <span className="ms-4">Khi bạn hoàn thành chọn địa điểm hẹn hò, <span className="link-pr cursor-pointer" onClick={()=>{navigate("/profile")}}>Trang chủ</span> sẽ tự động hiển thị những người dùng cùng thành phố với bạn.</span>
                                </Stack>
                                <Stack 
                                    direction="horizontal"
                                    className="px-2 py-3 surface-1 border-radius-sm border-pr-weak box-shadow-black-right-bottom"
                                    >
                                        <span className="ms-4">Bạn có thể tùy chỉnh người nào sẽ xuất hiện trên <span className="link-pr cursor-pointer" onClick={()=>{navigate("/profile")}}>Trang chủ</span> của bạn bằng cách tùy chỉnh <span className="link-pr cursor-pointer" onClick={()=>{navigate("/profile")}}>Bộ lọc</span>.</span>
                                </Stack>
                                <Stack 
                                    direction="horizontal"
                                    className="px-2 py-3 surface-1 border-radius-sm border-pr-weak box-shadow-black-right-bottom"
                                    >
                                        <span className="ms-4"><span className="link-pr cursor-pointer" onClick={()=>{navigate("/profile")}}>Bộ lọc</span> sẽ tự động lưu, và lần sau bạn đăng nhập, trang chủ sẽ hiển thị người dùng theo bộ lọc mà bạn đã lựa chọn trước đó.</span>
                                </Stack>
                                <Stack 
                                    direction="horizontal"
                                    className="px-2 py-3 surface-1 border-radius-sm border-pr-weak box-shadow-black-right-bottom"
                                    >
                                        <span className="ms-4"><span className="link-pr cursor-pointer" onClick={()=>{navigate("/profile")}}>Trang chủ</span> sẽ hiển thị 1 người dùng tại một thời điểm, bạn có thể lựa chọn Xem thông tin, Thích hoặc Bỏ qua người dùng đó.</span>
                                </Stack>
                            </Stack>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2" className="custom-acc-item">
                        <Accordion.Header>
                            <Stack direction="horizontal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-heart-pulse-fill" viewBox="0 0 16 16">
                                    <path d="M1.475 9C2.702 10.84 4.779 12.871 8 15c3.221-2.129 5.298-4.16 6.525-6H12a.5.5 0 0 1-.464-.314l-1.457-3.642-1.598 5.593a.5.5 0 0 1-.945.049L5.889 6.568l-1.473 2.21A.5.5 0 0 1 4 9z"/>
                                    <path d="M.88 8C-2.427 1.68 4.41-2 7.823 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C11.59-2 18.426 1.68 15.12 8h-2.783l-1.874-4.686a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8z"/>
                                </svg>
                                <span className="ms-1">Gửi tim, nhận tim và chat</span>
                            </Stack>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Stack 
                                gap={2}
                                className="instructions-container light-text">
                                <Stack 
                                    direction="horizontal"
                                    className="px-2 py-3 surface-1 border-radius-sm border-pr-weak box-shadow-black-right-bottom"
                                    >
                                        <span className="ms-4">Khi bạn thích (bằng cách nhấp vào biểu tượng trái tim) một người dùng, hệ thống sẽ gửi thông báo đến người dùng đó. Nếu người đó thích lại bạn, hai bạn sẽ được "Match" và thanh chat sẽ được tự động mở ở trang <span className="link-pr cursor-pointer" onClick={()=>{navigate("/chat")}}>Chat</span> để hai bạn có thể chát với nhau.</span>
                                </Stack>
                                <Stack 
                                    direction="horizontal"
                                    className="px-2 py-3 surface-1 border-radius-sm border-pr-weak box-shadow-black-right-bottom"
                                    >
                                        <span className="ms-4">Bạn có thể xem lại những ai bạn đã thích tại trang <span className="link-pr cursor-pointer" onClick={()=>{navigate("/chat")}}>Xem ai thích bạn</span>. Bạn nên kiên nhẫn chờ người ấy thích lại, nhưng nếu chờ mãi mà không thấy gì, thì khả năng cao là cô ấy (anh ấy) chảnh, chứ chắc chắn không phải tại bạn.</span>
                                </Stack>
                                <Stack 
                                    direction="horizontal"
                                    className="px-2 py-3 surface-1 border-radius-sm border-pr-weak box-shadow-black-right-bottom"
                                    >
                                        <span className="ms-4">Khi ai đó gửi tim cho bạn, bạn sẽ nhận được thông báo. Bạn cũng có thể xem <span className="link-pr cursor-pointer" onClick={()=>{navigate("/chat")}}>Xem bạn thích ai</span>. Tại đây bạn có thể xem thông tin, gửi tim lại, hoặc bỏ qua.</span>
                                </Stack>
                            </Stack>
                    </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3" className="custom-acc-item">
                        <Accordion.Header>
                            <Stack direction="horizontal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-heart-pulse-fill" viewBox="0 0 16 16">
                                    <path d="M1.475 9C2.702 10.84 4.779 12.871 8 15c3.221-2.129 5.298-4.16 6.525-6H12a.5.5 0 0 1-.464-.314l-1.457-3.642-1.598 5.593a.5.5 0 0 1-.945.049L5.889 6.568l-1.473 2.21A.5.5 0 0 1 4 9z"/>
                                    <path d="M.88 8C-2.427 1.68 4.41-2 7.823 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C11.59-2 18.426 1.68 15.12 8h-2.783l-1.874-4.686a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8z"/>
                                </svg>
                                <span className="ms-1">Về Amo Dating</span>
                            </Stack>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Stack 
                                gap={2}
                                className="instructions-container light-text">
                                <Stack 
                                    direction="horizontal"
                                    className="px-2 py-3 surface-1 border-radius-sm border-pr-weak box-shadow-black-right-bottom"
                                    >
                                        <span className="ms-4">Sự ra đời của các ứng dụng hẹn hò đã giúp việc kết bạn, làm quen và tìm kiếm các mối quan hệ trở nên dễ dàng hơn.</span>
                                </Stack>
                                <Stack 
                                    direction="horizontal"
                                    className="px-2 py-3 surface-1 border-radius-sm border-pr-weak box-shadow-black-right-bottom"
                                    >
                                        <span className="ms-4">Thế nhưng đây cũng là môi trường ưa thích của những kẻ xấu lợi dụng tạo nhiều tài khoản ảo về phục vụ cho những mục đích xấu, khiến cho môi trường hẹn hò trực tuyến xấu đi, và những người dùng chân chính phát sinh tâm lý e ngại, dè chừng và chán nản.</span>
                                </Stack>
                                <Stack 
                                    direction="horizontal"
                                    className="px-2 py-3 surface-1 border-radius-sm border-pr-weak box-shadow-black-right-bottom"
                                    >
                                        <span className="ms-4">Amo Dating ra đời để giải quyết vấn đề tài khoản ảo tràn lan trên các ứng dụng hẹn hò phổ biến hiện nay như Tinder, Facebook Dating, ...</span>
                                </Stack>
                                <Stack 
                                    direction="horizontal"
                                    className="px-2 py-3 surface-1 border-radius-sm border-pr-weak box-shadow-black-right-bottom"
                                    >
                                        <span className="ms-4">Amo Dating mong muốn lấy lại môi trường hẹn trong sạch, người thật việc thật, để đảm bảo những người thực sự có nhu cầu tìm kiếm người yêu, bạn trai, bạn gái tìm được một nửa đúng ý mình mà vẫn có thời gian tập trung cho công việc hay sở thích của riêng mình.</span>
                                </Stack>
                                <Stack 
                                    direction="horizontal"
                                    className="px-2 py-3 surface-1 border-radius-sm border-pr-weak box-shadow-black-right-bottom"
                                    >
                                        <span className="ms-4">Cộng đồng của Amo Dating sẽ luôn định hình là cộng đồng nhỏ để tránh lực lượng tài khoản ảo đánh hơi thấy. Khi được các bạn ủng hộ và lượng người dùng khá, Amo Dating sẽ chuyển sang hình thức xác thực tài khoản bằng SMS để hạn chế tài khoản ảo tham gia.</span>
                                </Stack>
                                <Stack 
                                    direction="horizontal"
                                    className="px-2 py-3 surface-1 border-radius-sm border-pr-weak box-shadow-black-right-bottom"
                                    >
                                        <span className="ms-4">Là một nền tảng hẹn hò, Amo Dating chỉ thành công và có ích khi có đông đảo người thật tham gia để chúng ta dễ tìm thấy nhau, có nhiều lựa chọn hơn. Vì vậy sự tham gia của bạn sẽ góp phần quan trọng cho cộng đồng chúng ta.</span>
                                </Stack>
                            </Stack>
                    </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Stack>
          </motion.div>
          </Stack>

    </div> );
}
 
export default Instructions;