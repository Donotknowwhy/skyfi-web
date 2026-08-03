"use client";

import { trackPageView } from "@/app/utils/trackingHelper";
import { useRouter } from "@/i18n/navigation";
import { useLocale } from 'next-intl';
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
export const datamockTermsAndConditions = {
    vi: {
        title: 'ĐIỀU KIỆN GIAO DỊCH CHUNG', content: `
<div class="sub-container">
<p >
    <span >Chào mừng Khách Hàng đến với Ứng dụng bán hàng online chính thức được thiết lập và sở hữu bởi CÔNG TY TNHH GALAXY DIGITAL HOLDINGS (sau đây gọi là “<strong>Galaxy Holdings</strong>” hay &nbsp;“<strong>chúng tôi</strong>”).</span>
</p>
<p >
    <span ><strong>Về chúng tôi:</strong></span>
</p>
<p >
    <span >- <strong>Đơn vị cung cấp dịch vụ viễn thông:&nbsp;</strong>CÔNG TY TNHH GALAXY DIGITAL HOLDINGS</span>
</p>
<p >
    <span >- <strong>Số giấy phép cung cấp dịch vụ viễn thông</strong>: </span><span style="font-size:12.0pt;line-height:150%;">41/GP-CVT do Bộ Thông tin và Truyền thông cấp ngày 06/02/2025.</span>
</p>
<p >
    <span >- <strong>Giấy chứng đăng ký kinh doanh:&nbsp;</strong></span><span style="font-size:12.0pt;line-height:150%;">0316951481 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 13 tháng 08 năm 2021.</span>
</p>
<p >
    <span >- <strong>Địa chỉ:&nbsp;</strong></span><span style="font-size:12.0pt;line-height:150%;">Tòa nhà PV Gas, 673 Nguyễn Hữu Thọ, Phước Kiển, Nhà Bè, TP. HCM, Việt Nam</span>
</p>
<p >
    <span >- <strong>Điện thoại:&nbsp;</strong></span><span style="font-size:12.0pt;line-height:150%;">028 7300 6555</span>
</p>
<p >
    <span >- <strong>Thư điện tử:</strong>&nbsp;</span><a href="mailto:customercare@skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" lang="EN-GB">customercare@skyfi.vn</span></a>
</p>
<p >
    <span >- <strong>Số điện thoại phản ánh chất lượng dịch vụ:</strong>&nbsp;19006605</span>
</p>
<p >
    <span >Khi Khách Hàng truy cập vào Ứng dụng của chúng tôi có nghĩa là Khách Hàng đồng ý với Điều khoản và Điều kiện này và&nbsp;</span><a href="https://www.vietnamobile.com.vn/product/chinh-sach/thong-bao-xu-ly-du-lieu-ca-nhan/"><span style="color:windowtext;font-size:12.0pt;line-height:150%;text-decoration:none;text-underline:none;" lang="EN-GB">Chính sách bảo vệ dữ liệu cá nhân</span></a><span >. Chúng tôi có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản và Điều kiện này, vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên Ứng dụng mà không cần thông báo trước. Khi Khách Hàng tiếp tục sử dụng Ứng dụng, sau khi các thay đổi về Quy định và Điều kiện được đăng tải, có nghĩa là Khách Hàng đã chấp nhận những thay đổi đó. Khách Hàng vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của chúng tôi.</span>
</p>
<p >
    <span ><strong>1. PHẠM VI ÁP DỤNG</strong></span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>1.1. Điều Khoản Và Điều Kiện sẽ được áp dụng cho Khách Hàng:</strong></span></i>
</p>
<p >
    <span >- Mua sản phẩm và sử dụng dịch vụ (“<strong>Sản Phẩm</strong>”) của Galaxy Holdings.&nbsp;&nbsp;&nbsp;</span>
</p>
<p >
    <span >- Có nhu cầu được giao Sản Phẩm đến các địa điểm phù hợp với&nbsp;Chính sách giao hàng&nbsp;đăng tải trên Ứng dụng vào từng thời điểm.</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>1.2. Khách Hàng khi tiến hành mua Sản Phẩm trên Ứng dụng phải cung cấp các giấy tờ sau để tiến hành&nbsp;giao kết hợp đồng theo mẫu, điều kiện giao dịch chung:</strong></span></i>
</p>
<p >
    <span >- Trường hợp là cá nhân: bản chính hộ chiếu, thẻ căn cước công dân, thẻ căn cước, căn cước điện tử hoặc tài khoản định danh điện tử còn thời hạn sử dụng đối với người có quốc tịch Việt Nam hoặc hộ chiếu còn thời hạn lưu hành tại Việt Nam đối với người có quốc tịch nước ngoài (sau đây gọi chung là giấy tờ tùy thân);</span>
</p>
<p >
    <span >- Trường hợp là tổ chức: bản chính hay bản sao được chứng thực từ bản chính quyết định thành lập hoặc giấy chứng nhận đăng ký kinh doanh và đăng ký thuế hoặc giấy phép đầu tư hoặc giấy chứng nhận đăng ký doanh nghiệp (sau đây gọi chung là giấy chứng nhận pháp nhân), giấy tờ tùy thân của người đại diện theo pháp luật của tổ chức. Đối với dịch vụ viễn thông di động, tổ chức phải gửi kèm theo danh sách các cá nhân thuộc tổ chức (có xác nhận hợp pháp của tổ chức) được phép sử dụng dịch vụ viễn thông theo hợp đồng theo mẫu, điều kiện giao dịch chung mà tổ chức giao kết với doanh nghiệp viễn thông (trường hợp tổ chức giao cho người sử dụng) đồng thời kèm theo bản chính giấy tờ tùy thân của từng cá nhân. Trường hợp Khách Hàng giao kết hợp đồng theo mẫu, điều kiện giao dịch chung không phải là người đại diện theo pháp luật của tổ chức thì phải cung cấp văn bản ủy quyền hợp pháp của người đại diện theo pháp luật và giấy tờ tùy thân của mình;</span>
</p>
<p >
    <span >- Đối với Khách Hàng dưới 14 tuổi hoặc người được giám hộ theo quy định của Bộ Luật Dân sự, việc giao kết hợp đồng theo mẫu, điều kiện giao dịch chung phải do cha, mẹ hoặc người giám hộ thực hiện.</span>
</p>
<p >
    <span >(Áp dụng theo Nghị định Số: 163/2024/NĐ-CP của Chính phủ ngày 24 tháng 12 năm 2024</span><span style="font-size:12.0pt;letter-spacing:.1pt;line-height:150%;">).</span>
</p>
<p >
    <span ><strong>2. CÁC ĐIỀU KIỆN HOẶC HẠN CHẾ TRONG VIỆC CUNG CẤP HÀNG HÓA VÀ DỊCH VỤ</strong></span>
</p>
<p >
    <span >- Để đảm bảo tính công bằng và quyền lợi của Khách Hàng là người tiêu dùng cuối cùng, Galaxy Holdings có quyền áp dụng các điều kiện hạn chế trong việc triển khai các chương trình khuyến mại: không giới hạn, giới hạn về số lượng sản phẩm tối đa trong mỗi chương trình khuyến mại mà một Khách Hàng được mua, giới hạn về mục đích mua gói sản phẩm (chỉ sử dụng cho tiêu dùng, không được kinh doanh, mua đi bán lại…), hoặc các giới hạn khác (nếu có) được quy định chi tiết trong từng Chương trình khuyến mại. Các điều kiện hạn chế này sau đây được gọi là Chính sách khuyến mại.</span>
</p>
<p >
    <span >Vì vậy, Galaxy Holdings có quyền không xác nhận, từ chối, hủy hoặc thu hồi lại các sản phẩm đã bàn giao vi phạm bất kỳ nội dung nào trong Chính sách khuyến mại.</span>
</p>
<p >
    <span >- Galaxy Holdings có quyền từ chối cung cấp Sản Phẩm trong trường hợp các cá nhân, tổ chức không đáp ứng một trong các nội dung sau: xuất trình giấy tờ để đăng ký thông tin thuê bao không đúng quy định hoặc giấy tờ để đăng ký thông tin thuê bao được xuất trình không rõ, không bảo đảm việc số hóa giấy tờ được rõ ràng, sắc nét, đầy đủ thông tin hoặc giấy tờ tùy thân có thông tin không trùng khớp sau xác thực hoặc không xác thực được.</span>
</p>
<p >
    <span ><strong>3. CHÍNH SÁCH KIỂM HÀNG</strong></span>
</p>
<p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:27.0pt;text-align:justify;">
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>3.1.&nbsp;&nbsp; Các bước đặt hàng</strong></span></i>
</p>
<p >
    <span >- Khi Khách Hàng đặt hàng tại&nbsp;Ứng dụng, chúng tôi sẽ nhận được yêu cầu đặt hàng và gửi đến Khách Hàng mã số đơn hàng.</span>
</p>
<p >
    <span >- Để yêu cầu đặt hàng được xác nhận nhanh chóng, Khách Hàng vui lòng cung cấp đúng và đầy đủ các thông tin liên quan đến việc giao nhận, hoặc các điều khoản và điều kiện của chương trình khuyến mãi (nếu có) mà Khách Hàng tham gia.</span>
</p>
<p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:27.0pt;text-align:justify;">
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>3.2.&nbsp;&nbsp; Chính sách kiểm hàng</strong></span></i>
</p>
<p >
    <span >- Các Sản Phẩm cam kết đúng với mô tả chi tiết trên Ứng dụng.&nbsp;</span>
</p>
<p >
    <span >- Đối với eSIM: sau khi mua Sản Phẩm và thanh toán thành công, Khách hàng sẽ nhận được thông báo của Galaxy Holdings qua email về thông tin eSIM đã mua. Khi tiếp nhận thông tin, Khách Hàng vui lòng kiểm tra thông tin eSIM. Các Sản Phẩm eSIM không giao hàng trực tiếp, nên không có chính sách kiểm hàng.</span>
</p>
<p >
    <span >- Đối với SIM vật lý: Sau khi thanh toán và nhận Sản Phẩm, Khách Hàng kiểm tra số lượng, niêm phong, thông tin mẫu mã, thời hạn sử dụng so với đơn đặt hàng.&nbsp;</span>
</p>
<p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:9.0pt;text-align:justify;">
    <span ><strong>4. CHÍNH SÁCH ĐỔI, TRẢ SẢN PHẨM</strong></span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">Chính sách đổi, trả Sản Phẩm của Ứng dụng quy định các lý do chấp nhận, yêu cầu cho sản phẩm được trả lại và thời gian xử lý trả hàng cho Khách Hàng.</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.1. Lý do chấp nhận trả hàng</strong></span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Sản Phẩm bị mất niêm phong, bị giao sai về số lượng, thông tin và mẫu mã so với đơn đặt hàng.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;Sản Phẩm bị hỏng do lỗi của nhà sản xuất (hỏng hóc về kỹ thuật, lỗi về thiết kế, nội dung) hoặc lỗi trong quá trình vận chuyển (bị biến dạng, trầy xước, nứt vỡ v.v.).</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;Sản Phẩm hết hạn sử dụng trước hoặc vào ngày sản phẩm được giao cho Khách Hàng.</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.2. Yêu cầu cho sản phẩm trả hàng</strong></span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.2.1. Điều kiện trả hàng:</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Sản Phẩm còn nguyên vẹn, đầy đủ nhãn mác, theo quy cách ban đầu (trừ trường hợp Sản Phẩm bị lỗi hoặc bị hư hại trong quá trình vận chuyển).</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;Sản Phẩm còn thời hạn sử dụng.&nbsp;</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Sản Phẩm không bị dơ bẩn, không có dấu hiệu đã qua sử dụng.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;Khách Hàng còn giữ xác nhận về việc đã mua hàng tại Ứng dụng (số đơn hàng, hóa đơn mua hàng điện tử, biên nhận giao hàng, sao kê của ngân hàng…).</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.2.2. Thời gian áp dụng trả hàng:</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Trừ khi được quy định khác đi trong phần giới thiệu về Sản Phẩm trên Ứng dụng, Khách Hàng có thời hạn 02 ngày kể từ ngày nhận hàng để gửi yêu cầu trả lại.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.2.3. Địa điểm trả hàng:</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Khách Hàng mang Sản Phẩm cùng với giấy tờ, giấy tờ xác nhận về việc đã mua hàng tại Ứng dụng (mã đơn hàng, hóa đơn mua hàng điện tử, biên nhận giao hàng,…) đến Cửa hàng giao dịch của Galaxy Holdings hoặc gửi qua đường bưu chính về địa chỉ sau: Điểm cung cấp dịch viễn thông của Galaxy Holdings theo thỏa thuận của hai Bên.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.2.4. Thời điểm yêu cầu trả hàng sẽ được căn cứ theo:</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Nếu Khách Hàng gửi theo đường bưu chính hay chuyển phát: thời điểm tính theo dấu biên nhận của bưu điện hay đơn vị chuyển phát.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;Nếu Khách Hàng tự mang/gửi hàng tới trung tâm đổi trả: thời điểm tính khi nhân viên Galaxy Holdings tiếp nhận sản phẩm trả lại từ Khách Hàng.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.2.5. Chi phí trả hàng</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Đối với các Sản Phẩm trả lại do lỗi của Galaxy Holdings hoặc nhà cung cấp (NCC), Khách Hàng sẽ được miễn phí trả lại Sản Phẩm. Khách Hàng chịu các chi phí vận chuyển đổi trả Sản Phẩm hoặc các chi phí khác phải trả cho bên thứ ba.</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.3. Quy định hoàn tiền&nbsp;</strong></span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.3.1. Nguyên tắc hoàn tiền</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;Hoàn tiền được thực hiện khi Khách Hàng đã thanh toán cho Galaxy Holdings nhưng sau đó phát sinh các vấn đề: hết hàng hoặc Khách Hàng đã nhận hàng nhưng có yêu cầu đổi, trả Sản Phẩm theo quy định tại Điều 4.2.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Không áp dụng đối với các yêu cầu hoàn tiền dưới 1.000 đồng.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;Thời gian xử lý hoàn tiền tính theo ngày làm việc (không bao gồm thứ Bảy, Chủ nhật, các ngày Lễ, Tết được nghỉ theo quy định).</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;Hoàn tiền khi Khách Hàng sử dụng mã quà tặng: trong các trường hợp đặc biệt được Galaxy Holdings chấp nhận hoàn tiền khi Khách Hàng sử dụng mã quà tặng, Galaxy Holdings sẽ không hoàn lại khoản giá trị mã quà tặng Khách Hàng đã sử dụng mà chỉ hoàn lại khoản tiền Khách Hàng thực tế bỏ ra khi mua hàng.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.3.2. Phương thức hoàn tiền</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;Hoàn tiền thông qua chuyển khoản ngân hàng: Khách hàng liên hệ Tổng đài CSKH của Galaxy Holdings, cung cấp các thông tin và làm theo hướng dẫn.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.3.3. Thời gian xử lý</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Galaxy Holdings sẽ gửi kết quả phản hồi yêu cầu hoàn trả tới Khách Hàng thông qua email hoặc/và tin nhắn SMS trong vòng tối đa 07 ngày làm việc kể từ khi Galaxy Holdings nhận lại Sản Phẩm.</span>
</p>
<p >
    <span >Lưu ý:&nbsp;</span><span style="font-size:12.0pt;line-height:150%;">Galaxy Holdings&nbsp;không chịu trách nhiệm trong các trường hợp Sản Phẩm hỏng hóc trong quá trình vận chuyển đến trung tâm đổi trả Galaxy Holdings.</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.4. Sửa đổi</strong></span></i>
</p>
<p >
    <span >- Sau khi mua Sản Phẩm, các thông tin và gói dữ liệu Sản Phẩm không thể thay đổi hoặc tùy chỉnh dựa trên các yêu cầu cụ thể; chúng được cung cấp nguyên trạng.</span>
</p>
<p >
    <span >- Để biết thêm thông tin chi tiết, quý khách vui lòng liên hệ Bộ phận chăm sóc khách hàng skyfi.vn hoặc vui lòng liên hệ: 1900 6605 để được trợ giúp. Xin cảm ơn!</span>
</p>
<p >
    <span ><strong>5. CHÍNH SÁCH BẢO HÀNH</strong></span>
</p>
<p >
    <span >Chính sách bảo hành&nbsp;</span><span style="font-family:&quot;Segoe UI Symbol&quot;,sans-serif;font-size:12.0pt;line-height:150%;" lang="EN-GB">🗹</span><span > Có&nbsp;</span><span style="font-family:&quot;Segoe UI Symbol&quot;,sans-serif;font-size:12.0pt;line-height:150%;" lang="EN-GB">❑</span><span > Không</span>
</p>
<p >
    <span ><strong>6. NGHĨA VỤ CỦA GALAXY HOLDINGS VÀ KHÁCH HÀNG</strong></span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>6.1. Nghĩa vụ của Galaxy Holdings</strong></span></i>
</p>
<p >
    <span >- Đảm bảo chất lượng dịch vụ cung cấp cho Khách Hàng theo đúng chất lượng dịch vụ mà Galaxy Holdings công bố, được niêm yết trên website&nbsp;</span><a href="https://Skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" lang="EN-GB">https://Skyfi.vn</span></a><span >, Úng dụng SkyFi và tại các điểm cung cấp dịch vụ viễn thông của Galaxy Holdings và cung cấp cho Khách Hàng trước khi giao kết Hợp đồng cung cấp và sử dụng dịch vụ viễn thông di động mặt đất (hình thức thanh toán trả trước), Bản xác nhận thông tin thuê bao, Điều kiện giao dịch chung;</span>
</p>
<p >
    <span >- Bảo đảm tính đúng, đủ, chính xác giá dịch vụ theo Hợp đồng cung cấp và sử dụng dịch vụ viễn thông di động mặt đất (hình thức thanh toán trả trước), Bản xác nhận thông tin thuê bao, Điều kiện giao dịch chung;</span>
</p>
<p >
    <span >- Thông báo cho Khách Hàng về việc nộp phí để tiếp tục sử dụng dịch vụ theo cách thức đã được thỏa thuận tối thiểu 07 ngày làm việc trước ngày hết hạn sử dụng dịch vụ;</span>
</p>
<p >
    <span >- Thông báo cho Khách Hàng về thởi điểm kết thúc cung cấp dịch vụ theo cách thức đã được thỏa thuận tối thiểu 07 ngày làm việc trước ngày chấm dứt cung cấp dịch vụ;</span>
</p>
<p >
    <span >- Thực hiện bảo mật thông tin của Khách Hàng, chỉ sử dụng, chuyển giao thông tin của Khách Hàng cho bất kỳ bên thứ ba nào khi được Khách Hàng đồng ý trừ trường hợp theo thỏa thuận giữa hai bên hoặc theo yêu cầu của cơ quan nhà nước hoặc pháp luật có quy định khác;</span>
</p>
<p >
    <span >- Khôi phục việc sử dụng Dịch vụ của Khách Hàng sau khi Khách hàng hoàn thành nghĩa vụ của mình đối với trường hợp tạm ngừng cung cấp Dịch vụ (trừ các số thuê bao đã thu hồi và tái sử dụng) theo thời hạn quy định;</span>
</p>
<p >
    <span >- Kịp thời kiểm tra, giải quyết khi Khách Hàng thông báo sự cố về chất lượng Dịch vụ;</span>
</p>
<p >
    <span >- Giải quyết khiếu nại của Khách Hàng theo thời gian quy định của pháp luật;</span>
</p>
<p >
    <span >- Thông báo cho Khách Hàng thông trong trường hợp ngừng kinh doanh dịch vụ viễn thông ít nhất 30 ngày trước khi chính thức ngừng kinh doanh dịch vụ viễn thông. Galaxy Holdings chỉ ngừng kinh doanh một phần hoặc toàn bộ dịch vụ viễn thông nếu đáp ứng đủ các điều kiện sau đây: (a) có phương án bảo đảm quyền, lợi ích hợp pháp của người sử dụng dịch vụ viễn thông theo Hợp đồng cung cấp và sử dụng dịch vụ viễn thông di động mặt đất (hình thức thanh toán trả trước), Bản xác nhận thông tin thuê bao, Điều kiện giao dịch chung cung cấp và sử dụng dịch vụ viễn thông đã giao kết và của các bên có liên quan; và (b) đã thông báo cho cơ quan nhà nước có thẩm quyền về việc ngừng kinh doanh dịch vụ viễn thông.</span>
</p>
<p >
    <span >- Galaxy Holdings có trách nhiệm đảm bảo các đối tác của mình phải bảo mật thông tin của Khách Hàng theo quy định của pháp luật. Điều khoản này áp dụng trong trường hợp Khách Hàng đồng ý để Galaxy Holdings cung cấp thông tin của Khách Hàng cho đối tác của Galaxy Holdings với mục đích được thỏa thuận.&nbsp;</span>
</p>
<p >
    <span >- Chịu sự kiểm soát của cơ quan nhà nước có thẩm quyền và thực hiện các quy định về bảo đảm an toàn cơ sở hạ tầng viễn thông và an ninh thông tin.</span>
</p>
<p >
    <span >- Bảo đảm cho thuê bao viễn thông được giữ nguyên số thuê bao viễn thông khi thay đổi doanh nghiệp cung cấp dịch vụ viễn thông trong cùng một loại hình dịch vụ viễn thông theo quy định của pháp luật.</span>
</p>
<p >
    <span >- Cung cấp dịch vụ cho người sử dụng dịch vụ viễn thông có thông tin thuê bao viễn thông đầy đủ, trùng khớp với thông tin trên giấy tờ tùy thân đã xuất trình khi giao kết Hợp đồng cung cấp và sử dụng dịch vụ viễn thông di động mặt đất (hình thức thanh toán trả trước), Bản xác nhận thông tin thuê bao, Điều kiện giao dịch chung theo quy định của pháp luật;</span>
</p>
<p >
    <span >- Thực hiện xác thực, lưu giữ, sử dụng thông tin thuê bao viễn thông và xử lý SIM có thông tin thuê bao viễn thông không đầy đủ, không chính xác;</span>
</p>
<p >
    <span >- Phòng, chống, ngăn chặn tin nhắn, cuộc gọi vi phạm pháp luật theo quy định của Chính phủ;</span>
</p>
<p >
    <span >- Ngừng cung cấp dịch vụ viễn thông đối với thuê bao viễn thông vi phạm pháp luật về viễn thông.</span>
</p>
<p >
    <span >- Galaxy Holdings cam kết chấp hành toàn bộ Hợp đồng cung cấp và sử dụng dịch vụ viễn thông di động mặt đất (hình thức thanh toán trả trước), Bản xác nhận thông tin thuê bao, Điều kiện giao dịch chung của Galaxy Holdings, kể cả các sửa đổi, bổ sung tại từng thời điểm sau khi Hợp đồng cung cấp và sử dụng dịch vụ viễn thông di động mặt đất (hình thức thanh toán trả trước), Bản xác nhận thông tin thuê bao, Điều kiện giao dịch chung đã được cơ quan nhà nước có thẩm quyền phê duyệt, được đăng tải trước tối thiểu 5 (năm) ngày trước khi áp dụng, đặt tại quầy hoặc trên website https://Skyfi.vn, Ứng dụng SkyFi của Galaxy Holdings và được cung cấp cho Khách Hàng trước khi hai bên ký kết Hợp đồng cung cấp và sử dụng dịch vụ viễn thông di động mặt đất (hình thức thanh toán trả trước), Bản xác nhận thông tin thuê bao, Điều kiện giao dịch chung. Khách Hàng được quyền chấm dứt sử dụng dịch vụ nếu không đồng ý với các sửa đổi, bổ sung này. Trường hợp Khách Hàng tiếp tục sử dụng dịch vụ đồng nghĩa với việc đã đồng ý và các sửa đổi, bổ sung này sẽ được áp dụng kể từ thời điểm Hợp đồng cung cấp và sử dụng dịch vụ viễn thông di động mặt đất (hình thức thanh toán trả trước), Bản xác nhận thông tin thuê bao, Điều kiện giao dịch chung được cơ quan nhà nước có thẩm quyền phê duyệt. Các quy định của Hợp đồng cung cấp và sử dụng dịch vụ viễn thông di động mặt đất (hình thức thanh toán trả trước), Bản xác nhận thông tin thuê bao, Điều kiện giao dịch chung áp dụng đối với Bên sử dụng dịch vụ là người tiêu dùng theo quy định tại khoản 1, Điều 3 Luật Bảo vệ quyền lợi người tiêu dùng.</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>6.2. Nghĩa vụ của Khách Hàng</strong></span></i>
</p>
<p >
    <span >- Thanh toán đầy đủ và đúng hạn tiền sử dụng dịch vụ viễn thông;</span>
</p>
<p >
    <span >- Bồi thường thiệt hại trực tiếp do lỗi của mình gây ra cho Galaxy Holdings, đại lý dịch vụ viễn thông;</span>
</p>
<p >
    <span >- Chịu trách nhiệm trước pháp luật trong việc sử dụng số thuê bao viễn thông do mình đã giao kết Hợp đồng cung cấp và sử dụng dịch vụ viễn thông di động mặt đất (hình thức thanh toán trả trước), Điều kiện giao dịch chung với Galaxy Holdings;</span>
</p>
<p >
    <span >- Chịu trách nhiệm trước pháp luật về nội dung thông tin mà mình gửi, lưu giữ trên mạng viễn thông;</span>
</p>
<p >
    <span >- Không được sử dụng cơ sở hạ tầng viễn thông của Galaxy Holdings để kinh doanh dịch vụ viễn thông.&nbsp;</span>
</p>
<p >
    <span >- Không được sử dụng mạng viễn thông nhằm đe dọa, quấy rối, xuyên tạc, vu khống, xúc phạm uy tín, danh dự, nhân phẩm của cá nhân/tổ chức khác;&nbsp;</span>
</p>
<p >
    <span >- Cung cấp chính xác các thông tin trong Hợp đồng cung cấp và sử dụng dịch vụ viễn thông di động mặt đất (hình thức thanh toán trả trước), Bản xác nhận thông tin thuê bao theo đúng các quy định của Nhà nước;&nbsp;</span>
</p>
<p >
    <span >- Có trách nhiệm cập nhật lại thông tin thuê bao theo quy định khi có thay đổi giấy tờ hoặc khi phát hiện thông tin thuê bao của mình không chính xác hoặc khi nhận được thông báo của Galaxy Holdings về thông tin không đúng quy định;&nbsp;</span>
</p>
<p >
    <span >- Không sử dụng thông tin trên giấy tờ tùy thân của mình để thực hiện giao kết Hợp đồng cung cấp và sử dụng dịch vụ viễn thông di động mặt đất (hình thức thanh toán trả trước), Bản xác nhận thông tin thuê bao, Điều kiện giao dịch chung cung cấp và sử dụng dịch vụ viễn thông di động mặt đất cho người khác, trừ trường hợp được pháp luật cho phép;&nbsp;</span>
</p>
<p >
    <span >- Bảo vệ mật khẩu, khóa mật mã và thiết bị đầu cuối của mình;</span>
</p>
<p >
    <span >- Trong trường hợp mất SIM, khách hàng phải đến ngay các điểm giao dịch của Galaxy Holdings hoặc sử dụng ứng dụng (app) SkyFi để làm thủ tục cấp lại SIM mới hoặc yêu cầu Galaxy Holdings tạm ngừng cung cấp Dịch vụ chiều đi. Trong trường hợp Khách hàng không thực hiện theo quy định trên, Khách hàng vẫn phải thanh toán cước phát sinh cho đến khi chính thức thông báo cho Galaxy Holdings, đồng thời Galaxy Holdings không có nghĩa vụ phải hoàn lại tiền cước phát sinh nêu trên. Trong trường hợp khẩn cấp, khách hàng có thể gọi đến số 19006605 để báo tạm khóa chiều gọi đi;</span>
</p>
<p >
    <span >- Khách hàng cam kết chấp hành toàn bộ Hợp đồng cung cấp và sử dụng dịch vụ viễn thông di động mặt đất (hình thức thanh toán trả trước), Bản xác nhận thông tin thuê bao, Điều kiện giao dịch chung của Galaxy Holdings, kể cả các sửa đổi, bổ sung tại từng thời điểm sau khi Hợp đồng cung cấp và sử dụng dịch vụ viễn thông di động mặt đất (hình thức thanh toán trả trước), Bản xác nhận thông tin thuê bao, Điều kiện giao dịch chung đã được cơ quan nhà nước có thẩm quyền phê duyệt, được đăng tải trước tối thiểu 5 (năm) ngày trước khi áp dụng, đặt tại quầy hoặc trên website https://Skyfi.vn, ứng dụng SkyFi của Galaxy Holdings và được cung cấp cho Khách Hàng trước khi hai bên ký kết Hợp đồng cung cấp và sử dụng dịch vụ viễn thông di động mặt đất (hình thức thanh toán trả trước), Bản xác nhận thông tin thuê bao, Điều kiện giao dịch chung. Khách Hàng được quyền chấm dứt sử dụng dịch vụ nếu không đồng ý với các sửa đổi, bổ sung này. Trường hợp Khách Hàng tiếp tục sử dụng dịch vụ đồng nghĩa với việc đã đồng ý và các sửa đổi, bổ sung này sẽ được áp dụng kể từ thời điểm Hợp đồng cung cấp và sử dụng dịch vụ viễn thông di động mặt đất (hình thức thanh toán trả trước), Bản xác nhận thông tin thuê bao, Điều kiện giao dịch chung được cơ quan nhà nước có thẩm quyền phê duyệt. Các quy định của Hợp đồng cung cấp và sử dụng dịch vụ viễn thông di động mặt đất (hình thức thanh toán trả trước), Bản xác nhận thông tin thuê bao, Điều kiện giao dịch chung áp dụng đối với Bên sử dụng dịch vụ là người tiêu dùng theo quy định tại khoản 1, Điều 3 Luật Bảo vệ quyền lợi người tiêu dùng.</span>
</p>
<p >
    <span ><strong>7. TIÊU CHUẨN CHẤT LƯỢNG DỊCH VỤ</strong></span>
</p>
<p >
    <span >Galaxy Holdings cung cấp dịch vụ theo tiêu chuẩn chất lượng dịch vụ đã được công bố với Bộ Khoa học và Công nghệ và được niêm yết trên Website https:\\\\skyfi.vn và Ứng dụng SkyFi.</span>
</p>
<p >
    <span ><strong>8. GIÁ CẢ &amp; THANH TOÁN</strong></span>
</p>
<p >
    <i><span >-&nbsp;</span></i><span >Giá của Sản Phẩm có thể đã bao gồm hoặc chưa bao gồm thuế giá trị gia tăng và được mô tả cụ thể trên trang giới thiệu Sản Phẩm. Trong mọi trường hợp, giá của Sản Phẩm không bao gồm phí vận chuyển.&nbsp;</span>
</p>
<p >
    <i><span >-&nbsp;</span></i><span >Khách Hàng thanh toán giá trị của đơn đặt hàng trước khi nhận Sản Phẩm của Đơn Đặt Hàng đó. Khi Khách Hàng nhấn (click) vào nút “Thanh toán” để tiến hành thanh toán đơn đặt hàng có nghĩa là (i) Khách Hàng xác nhận đã rà soát thông tin đơn đặt hàng; và (ii) Khách Hàng đồng ý là Điều Khoản Và Điều Kiện sẽ được áp dụng cho giao dịch mua Sản Phẩm trong đơn đơn đặt hàng đó.</span>
</p>
<p >
    <i><span >-&nbsp;</span></i><span >Galaxy Holdings có quyền từ chối hình thức thanh toán bằng thẻ tín dụng của Khách Hàng trong một số trường hợp theo quyết định của chúng tôi.</span>
</p>
<p >
    <i><span >- Để đảm bảo an toàn thanh toán, Khách Hàng lưu ý:</span></i>
</p>
<p >
    <span >+&nbsp;Chỉ thực hiện thanh toán trực tuyến tại cửa sổ liên kết từ Ứng dụng chuyển đến;</span>
</p>
<p >
    <span >+ Sử dụng và bảo quản thẻ (thẻ tín dụng, thẻ ATM, thẻ mua hàng…) và thông tin tài khoản/thông tin thẻ cẩn thận;</span>
</p>
<p >
    <span >+ Không cho người khác mượn hoặc sử dụng thẻ để mua hàng tại Ứng dụng. Ngay khi phát hiện giao dịch phát sinh bất thường nào tại Ứng dụng, Khách Hàng cần liên hệ ngay với tổng đài chăm sóc Khách Hàng của chúng tôi theo số:&nbsp;<strong>19006605</strong>&nbsp;(sau đây gọi là “Tổng đài CSKH”) hoặc tổng đài của Ngân hàng phát hành thẻ để được xử lý kịp thời;</span>
</p>
<p >
    <span >+ Trong mọi trường hợp, với thẻ tín dụng/ghi nợ quốc tế, Khách Hàng vui lòng không để lộ số CVV/CVC/CSC (là mã số bảo mật, bộ ba kí tự số được in ở mặt sau của thẻ) để bảo mật thông tin thẻ;</span>
</p>
<p style="line-height:150%;margin-bottom:.0001pt;text-align:justify;">
    <span style="font-size:12.0pt;line-height:150%;">&nbsp;</span><span ><strong>9. VẬN CHUYỂN VÀ GIAO NHẬN SẢN PHẨM</strong></span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.1. Phạm vi giao hàng</strong></span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Galaxy Holdings phục vụ giao hàng cho Khách Hàng đến địa điểm theo yêu cầu của Khách Hàng trên Toàn quốc (*).</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;">(*) Đơn hàng sẽ được giao tới tận nhà của Khách Hàng, ngoại trừ các trường hợp hạn chế như khu vực văn phòng, chung cư cao tầng có quy định hạn chế ra vào. Trong các trường hợp hạn chế này, nếu Khách Hàng có nhu cầu giao tận nhà, vui lòng gọi Tổng đài CSKH để được hỗ trợ.</span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp; Người được Khách Hàng chỉ định nhận Sản Phẩm trên đơn đặt hàng hoặc bằng điện thoại như quy định tại Điều này được gọi chung là&nbsp;"Người Nhận Hàng".</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Khi được Galaxy Holdings yêu cầu, Người Nhận Hàng phải xuất trình giấy tờ tùy thân như giấy tờ tùy thân để nhân viên giao hàng kiểm tra trước khi nhận hàng.</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.2. Thời gian giao hàng</strong></span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">Thời gian giao hàng:&nbsp;<strong>Theo quy định từ đối tác vận chuyển của Galaxy Holdings</strong></span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.3. Phí giao hàng</strong></span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Phí giao hàng sẽ được thông báo theo từng đơn hàng dựa vào khu vực và thời điểm giao hàng.</span>
</p>
<p >
    <i><span >-&nbsp;</span></i><span >Người Nhận Hàng phải kiểm tra Sản Phẩm và ký vào Phiếu giao hàng khi nhận Sản Phẩm tùy theo chính sách của đơn vị vận chuyển. Rủi ro và quyền sở hữu Sản Phẩm sẽ được chuyển cho Khách Hàng từ thời điểm Người Nhận Hàng ký vào Phiếu giao hàng. Khách Hàng cần giữ lại Phiếu giao hàng để đối soát hoặc để giải quyết các vấn đề có thể phát sinh liên quan đến Sản Phẩm (nếu có). Sau thời hạn đổi trả Sản Phẩm quy định tại Chính sách đổi trả, các vấn đề có thể phát sinh liên quan đến Sản Phẩm (nếu có) sẽ không được xử lý.</span>
</p>
<p >
    <span ><strong>10. CHĂM SÓC KHÁCH HÀNG &amp; XỬ LÝ KHIẾU NẠI</strong></span>
</p>
<p >
    <span >- Trong trường hợp có bất kỳ thắc mắc hay khiếu nại nào, bao gồm nhưng không giới hạn ở chất lượng hàng hóa/dịch vụ, việc giao Sản Phẩm, thái độ của nhân viên giao hàng, việc đổi/ trả Sản Phẩm,… Khách Hàng có thể liên hệ với Tổng đài CSKH&nbsp;<strong>19006605&nbsp;</strong>hoặc địa chỉ email&nbsp;</span><a href="mailto:customercare@skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" lang="EN-GB">customercare@skyfi.vn</span></a>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;</span><span >Khi liên hệ với Tổng đài CSKH, Khách Hàng phải cung cấp mã số đơn đặt hàng ghi trong email hoặc tin nhắn xác nhận đơn đặt hàng mà Galaxy Holdings đã gửi cho Khách Hàng. Tổng đài CSKH sẽ tiếp nhận và phản hồi lại cho Khách Hàng trong thời gian sớm nhất.</span>
</p>
<p >
    <span ><strong>11. BẢO MẬT THÔNG TIN</strong></span>
</p>
<p >
    <span >- Ứng dụng của chúng tôi coi trọng việc bảo mật thông tin và sử dụng các biện pháp tốt nhất bảo vệ thông tin và việc thanh toán của Khách Hàng. Thông tin của Khách Hàng trong quá trình thanh toán sẽ được mã hóa để đảm bảo an toàn. Sau khi Khách Hàng hoàn thành quá trình đặt hàng, Khách Hàng sẽ thoát khỏi chế độ an toàn.</span>
</p>
<p >
    <span >- Khách Hàng không được sử dụng bất kỳ chương trình, công cụ hay hình thức nào khác để can thiệp vào hệ thống hay làm thay đổi cấu trúc dữ liệu. Ứng dụng cũng nghiêm cấm việc phát tán, truyền bá hay cổ vũ cho bất kỳ hoạt động nào nhằm can thiệp, phá hoại hay xâm nhập vào dữ liệu của hệ thống. Cá nhân hay tổ chức vi phạm sẽ bị tước bỏ mọi quyền lợi cũng như sẽ bị truy tố trước pháp luật nếu cần thiết.</span>
</p>
<p >
    <span >- Mọi thông tin giao dịch sẽ được bảo mật nhưng trong trường hợp cơ quan pháp luật yêu cầu, chúng tôi sẽ buộc phải cung cấp những thông tin này cho các cơ quan pháp luật.</span>
</p>
<p >
    <span >- Khi thực hiện thanh toán qua mạng quý khách lưu ý các chi tiết sau:</span>
</p>
<p >
    <span >+&nbsp;Chỉ sử dụng Ứng dụng có chứng chỉ thanh toán an toàn.</span>
</p>
<p >
    <span >+ Tuyệt đối không cho người khác mượn thẻ tín dụng hoặc tài khoản của mình để thực hiện thanh toán tại&nbsp;Ứng dụng.</span>
</p>
<p >
    <span >+ Trong trường hợp phát sinh giao dịch ngoài ý muốn, quý khách vui lòng thông báo cho Tổng đài CSKH để có thể hỗ trợ kịp thời.</span>
</p>
<p >
    <span >+ Kiểm tra tài khoản ngân hàng của mình thường xuyên để đảm bảo tất cả giao dịch qua thẻ đều nằm trong tầm kiểm soát.</span>
</p>
<p >
    <span ><strong>12. GIỚI HẠN TRÁCH NHIỆM</strong></span>
</p>
<p >
    <span >- Trong mọi trường hợp, Galaxy Holdings không chịu trách nhiệm đối với mọi thiệt hại/mất mát/tổn thất/hư hỏng mà Khách Hàng phải chịu sau thời điểm rủi ro được chuyển từ Galaxy Holdings sang Khách Hàng.</span>
</p>
<p >
    <span >- Đối với các phần quà tặng kèm của Galaxy Holdings khi Khách Hàng mua Sản Phẩm qua Ứng dụng: Nhân viên Galaxy Holdings/ Kênh phân phối và khách hàng bán buôn có nghĩa vụ thực hiện đăng ký thông tin thuê bao cho người sử dụng cuối cùng theo quy định của Bộ Khoa học và Công nghệ.</span>
</p>
<p >
    <span ><strong>13. ĐIỀU KHOẢN CHUNG</strong></span>
</p>
<p >
    <span >- Các quy định được dẫn chiếu trong Điều Khoản Chung này là một phần không thể tách rời của Điều Khoản Và Điều Kiện.</span>
</p>
<p >
    <span >- Galaxy Holdings và Khách Hàng có trách nhiệm thực hiện mọi nghĩa vụ quy định tại Điều Khoản Và Điều Kiện này.</span>
</p>
<p >
    <span >- Nếu bất kỳ nội dung nào của các Điều Khoản Và Điều kiện này bị bất kỳ cơ quan có thẩm quyền xem là vô hiệu hoặc không thể thực hiện toàn bộ hoặc một phần, thì tính hiệu lực của các nội dung khác trong Điều Khoản Và Điều kiện này sẽ không bị ảnh hưởng.</span>
</p>
<p >
    <span >- Điều Khoản Và Điều Kiện này và mọi vấn đề phát sinh trong quan hệ hợp đồng giữa Galaxy Holdings và Khách Hàng sẽ được hiểu và điều chỉnh theo quy định của luật pháp Việt Nam. Mọi tranh chấp, khác biệt, khiếu nại phát sinh từ/hoặc liên quan đến nội dung của Điều Khoản Và Điều Kiện này sẽ được giải quyết thông qua thương lượng trên tinh thần thiện chí trong vòng ba mươi (30) ngày. Nếu không thể giải quyết trong thời hạn ba mươi (30) ngày này, tranh chấp, khiếu nại trên có thể được giải quyết tại cơ quan tòa án có thẩm quyền.</span>
</p>
<p style="background:white;line-height:150%;margin-bottom:.0001pt;text-align:center;" align="center">
    <span ><strong>---------------***---------------</strong></span>
</p></div>`,
    },
    en: {
        title: 'GENERAL TRANSACTION TERMS AND CONDITIONS',
        content: `<div class="sub-container">
<p >
    <span >Welcome, Customer, to the official online sales application established and owned by GALAXY DIGITAL HOLDINGS COMPANY LIMITED (hereinafter referred to as "<strong>Galaxy Holdings</strong>" or &nbsp;"<strong>we</strong>").</span>
</p>
<p >
    <span ><strong>About us:</strong></span>
</p>
<p >
    <span >- <strong>Telecommunications service provider:&nbsp;</strong>GALAXY DIGITAL HOLDINGS COMPANY LIMITED</span>
</p>
<p >
    <span >- <strong>Telecommunications service license number</strong>: </span><span style="font-size:12.0pt;line-height:150%;">41/GP-CVT issued by the Ministry of Information and Communications on February 06, 2025.</span>
</p>
<p >
    <span >- <strong>Business registration certificate:&nbsp;</strong></span><span style="font-size:12.0pt;line-height:150%;">0316951481 issued by the Department of Planning and Investment of Ho Chi Minh City on August 13, 2021.</span>
</p>
<p >
    <span >- <strong>Address:&nbsp;</strong></span><span style="font-size:12.0pt;line-height:150%;">PV Gas Building, 673 Nguyen Huu Tho, Phuoc Kien, Nha Be, HCMC, Vietnam</span>
</p>
<p >
    <span >- <strong>Phone:&nbsp;</strong></span><span style="font-size:12.0pt;line-height:150%;">028 7300 6555</span>
</p>
<p >
    <span >- <strong>Email:</strong>&nbsp;</span><a href="mailto:customercare@skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" lang="EN-GB">customercare@skyfi.vn</span></a>
</p>
<p >
    <span >- <strong>Service quality feedback hotline:</strong>&nbsp;19006605</span>
</p>
<p >
    <span >When Customers access our Application, it means Customers agree to these Terms and Conditions and the&nbsp;</span><a href="https://www.vietnamobile.com.vn/product/chinh-sach/thong-bao-xu-ly-du-lieu-ca-nhan/"><span style="color:windowtext;font-size:12.0pt;line-height:150%;text-decoration:none;text-underline:none;" lang="EN-GB">Personal Data Protection Policy</span></a><span >. We reserve the right to change, modify, add or remove any part of these Terms and Conditions at any time. Changes are effective immediately upon posting on the Application without prior notice. When Customers continue to use the Application after the changes to the Terms and Conditions are posted, it means Customers have accepted those changes. Customers are kindly requested to check regularly for our updates.</span>
</p>
<p >
    <span ><strong>1. SCOPE OF APPLICATION</strong></span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>1.1. Terms and Conditions will apply to Customers:</strong></span></i>
</p>
<p >
    <span >- Purchasing products and using services ("<strong>Products</strong>") of Galaxy Holdings.&nbsp;&nbsp;&nbsp;</span>
</p>
<p >
    <span >- Wishing to have Products delivered to locations consistent with the Delivery Policy published on the Application from time to time.</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>1.2. Customers, when purchasing Products on the Application, must provide the following documents to conclude the standard form contract, general transaction conditions:</strong></span></i>
</p>
<p >
    <span >- For individuals: original passport, citizen identification card, ID card, electronic ID or electronic identification account valid for use for Vietnamese citizens or passport valid for circulation in Vietnam for foreign citizens (hereinafter collectively referred to as personal identification documents);</span>
</p>
<p >
    <span >- For organizations: original or certified copy of the establishment decision or business registration certificate and tax registration or investment license or enterprise registration certificate (hereinafter collectively referred to as legal entity certificate), personal identification documents of the legal representative of the organization. For mobile telecommunications services, organizations must attach a list of individuals within the organization (legally certified by the organization) allowed to use telecommunications services according to the standard form contract, general transaction conditions that the organization enters into with the telecommunications enterprise (if the organization assigns to the user) and also attach the original personal identification documents of each individual. If the Customer concluding the standard form contract, general transaction conditions is not the legal representative of the organization, they must provide a valid power of attorney from the legal representative and their personal identification documents;</span>
</p>
<p >
    <span >- For Customers under 14 years old or persons under guardianship as prescribed by the Civil Code, the conclusion of the standard form contract, general transaction conditions must be performed by parents or guardians.</span>
</p>
<p >
    <span >(Applied according to Decree No.: 163/2024/ND-CP of the Government dated December 24, 2024</span><span style="font-size:12.0pt;letter-spacing:.1pt;line-height:150%;">).</span>
</p>
<p >
    <span ><strong>2. CONDITIONS OR LIMITATIONS IN THE PROVISION OF GOODS AND SERVICES</strong></span>
</p>
<p >
    <span >- To ensure fairness and the rights of Customers as end consumers, Galaxy Holdings reserves the right to apply restrictive conditions in implementing promotional programs: not limited to, limitations on the maximum quantity of products in each promotional program that a Customer can purchase, limitations on the purpose of purchasing product packages (only for consumption, not for business, resale...), or other limitations (if any) specified in detail in each Promotional Program. These restrictive conditions are hereinafter referred to as the Promotional Policy.</span>
</p>
<p >
    <span >Therefore, Galaxy Holdings reserves the right to not confirm, refuse, cancel or withdraw products that have been handed over in violation of any content in the Promotional Policy.</span>
</p>
<p >
    <span >- Galaxy Holdings reserves the right to refuse to provide Products in cases where individuals or organizations do not meet one of the following criteria: presenting documents for subscriber information registration not in accordance with regulations or documents presented for subscriber information registration are unclear, do not ensure clear, sharp, complete digitization of documents or personal identification documents have inconsistent information after verification or cannot be verified.</span>
</p>
<p >
    <span ><strong>3. INSPECTION POLICY</strong></span>
</p>
<p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:27.0pt;text-align:justify;">
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>3.1.&nbsp;&nbsp; Ordering steps</strong></span></i>
</p>
<p >
    <span >- When Customers place an order on the&nbsp;Application, we will receive the order request and send the Customer an order number.</span>
</p>
<p >
    <span >- For the order request to be confirmed quickly, Customers should provide accurate and complete information related to delivery, or the terms and conditions of the promotional program (if any) in which the Customer participates.</span>
</p>
<p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:27.0pt;text-align:justify;">
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>3.2.&nbsp;&nbsp; Product Inspection Policy</strong></span></i>
</p>
<p >
    <span >- Products are committed to matching the detailed description on the Application.&nbsp;</span>
</p>
<p >
    <span >- For eSIM: after purchasing the Product and successful payment, Customers will receive a notification from Galaxy Holdings via email about the purchased eSIM information. Upon receiving the information, Customers are kindly requested to check the eSIM information. eSIM Products are not delivered directly, so there is no product inspection policy.</span>
</p>
<p >
    <span >- For physical SIM: After payment and receiving the Product, Customers check the quantity, seal, model information, and expiration date against the order.</span>
</p>
<p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:9.0pt;text-align:justify;">
    <span ><strong>4. PRODUCT EXCHANGE AND RETURN POLICY</strong></span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">The Application's Product exchange and return policy specifies the acceptable reasons, requirements for returned products, and processing time for customer returns.</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.1. Reasons for accepting returns</strong></span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- The Product is unsealed, incorrectly delivered in quantity, information, or model compared to the order.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;The Product is damaged due to manufacturer's fault (technical damage, design flaws, content) or damage during transport (deformed, scratched, cracked, etc.).</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;The Product expires on or before the date it is delivered to the Customer.</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.2. Requirements for returned products</strong></span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.2.1. Return conditions:</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- The Product must be intact, with full labels, and in its original specifications (except for Products that are defective or damaged during transport).</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;The Product must still be within its shelf life.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- The Product must not be dirty or show signs of prior use.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;The Customer must retain confirmation of purchase on the Application (order number, electronic purchase invoice, delivery receipt, bank statement, etc.).</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.2.2. Return application period:</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Unless otherwise specified in the Product introduction section on the Application, Customers have a period of 02 days from the date of receipt to submit a return request.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.2.3. Return location:</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Customers bring the Product along with documents, purchase confirmation documents from the Application (order number, electronic purchase invoice, delivery receipt, etc.) to a Galaxy Holdings transaction store or send it by postal service to the following address: Galaxy Holdings' telecommunications service provision point as agreed by both Parties.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.2.4. The time for requesting a return will be based on:</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- If the Customer sends by postal or express delivery: the time is calculated according to the post office or delivery unit's receipt stamp.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;If the Customer personally brings/sends the goods to the return center: the time is calculated when Galaxy Holdings staff receive the returned product from the Customer.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.2.5. Return costs</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- For Products returned due to fault of Galaxy Holdings or the supplier (NCC), the Customer will be exempt from return shipping fees. The Customer bears the shipping costs for exchanging or returning Products or other costs payable to third parties.</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.3. Refund policy&nbsp;</strong></span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.3.1. Refund principles</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;Refunds are made when the Customer has paid Galaxy Holdings but then issues arise: out of stock or the Customer has received the goods but requests an exchange or return of the Product as specified in Article 4.2.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Not applicable for refund requests under 1,000 VND.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;Refund processing time is calculated in business days (excluding Saturdays, Sundays, holidays, and Tet holidays as regulated).</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;Refunds when Customers use gift codes: in special cases where Galaxy Holdings accepts refunds when Customers use gift codes, Galaxy Holdings will not refund the value of the gift code used by the Customer but only the amount actually spent by the Customer when purchasing.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.3.2. Refund method</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;Refund via bank transfer: Customers contact Galaxy Holdings Customer Service Hotline, provide information, and follow instructions.</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.3.3. Processing time</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Galaxy Holdings will send refund request feedback results to Customers via email and/or SMS within a maximum of 07 business days from when Galaxy Holdings receives the Product back.</span>
</p>
<p >
    <span >Note:&nbsp;</span><span style="font-size:12.0pt;line-height:150%;">Galaxy Holdings&nbsp;is not responsible for Products damaged during transportation to the Galaxy Holdings return center.</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.4. Modifications</strong></span></i>
</p>
<p >
    <span >- After purchasing the Product, product information and data packages cannot be changed or customized based on specific requests; they are provided as-is.</span>
</p>
<p >
    <span >- For more detailed information, please contact skyfi.vn Customer Service Department or call: 1900 6605 for assistance. Thank you!</span>
</p>
<p >
    <span ><strong>5. WARRANTY POLICY</strong></span>
</p>
<p >
    <span >Warranty Policy&nbsp;</span><span style="font-family:&quot;Segoe UI Symbol&quot;,sans-serif;font-size:12.0pt;line-height:150%;" lang="EN-GB">🗹</span><span > Yes&nbsp;</span><span style="font-family:&quot;Segoe UI Symbol&quot;,sans-serif;font-size:12.0pt;line-height:150%;" lang="EN-GB">❑</span><span > No</span>
</p>
<p >
    <span ><strong>6. OBLIGATIONS OF GALAXY HOLDINGS AND CUSTOMERS</strong></span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>6.1. Obligations of Galaxy Holdings</strong></span></i>
</p>
<p >
    <span >- Ensure the quality of services provided to Customers in accordance with the service quality announced by Galaxy Holdings, listed on the website&nbsp;</span><a href="https://Skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" lang="EN-GB">https://Skyfi.vn</span></a><span >, SkyFi Application and at Galaxy Holdings' telecommunications service points and provided to Customers before concluding the Ground Mobile Telecommunications Service Provision and Usage Contract (prepaid payment method), Subscriber Information Confirmation Form, General Transaction Conditions;</span>
</p>
<p >
    <span >- Ensure the correctness, sufficiency, and accuracy of service prices according to the Ground Mobile Telecommunications Service Provision and Usage Contract (prepaid payment method), Subscriber Information Confirmation Form, General Transaction Conditions;</span>
</p>
<p >
    <span >- Notify Customers about fee payment to continue using the service in the agreed manner at least 07 working days before the service expiration date;</span>
</p>
<p >
    <span >- Notify Customers about the service termination time in the agreed manner at least 07 working days before the service termination date;</span>
</p>
<p >
    <span >- Maintain confidentiality of Customer information, only use, transfer Customer information to any third party with the Customer's consent, except as agreed between the two parties or at the request of state agencies or as otherwise provided by law;</span>
</p>
<p >
    <span >- Restore the Customer's use of the Service after the Customer fulfills their obligations in cases of temporary service suspension (excluding subscribers that have been reclaimed and re-used) within the stipulated period;</span>
</p>
<p >
    <span >- Promptly inspect and resolve issues when the Customer reports service quality problems;</span>
</p>
<p >
    <span >- Resolve Customer complaints within the legal timeframe;</span>
</p>
<p >
    <span >- Inform the Customer in case of cessation of telecommunications business at least 30 days before the official cessation of telecommunications business. Galaxy Holdings shall only cease part or all of its telecommunications services if the following conditions are met: (a) there is a plan to ensure the legitimate rights and interests of telecommunications service users according to the Terrestrial Mobile Telecommunications Service Provision and Usage Contract (prepaid payment method), Subscriber Information Confirmation, and General Transaction Conditions for telecommunications service provision and usage that have been concluded, and of related parties; and (b) the competent state authority has been notified of the cessation of telecommunications business.</span>
</p>
<p >
    <span >- Galaxy Holdings is responsible for ensuring that its partners maintain the confidentiality of Customer information in accordance with legal regulations. This clause applies when the Customer agrees for Galaxy Holdings to provide Customer information to Galaxy Holdings' partners for an agreed purpose. &nbsp;</span>
</p>
<p >
    <span >- Subject to the control of competent state agencies and comply with regulations on ensuring telecommunications infrastructure safety and information security.</span>
</p>
<p >
    <span >- Ensure that telecommunications subscribers can retain their telecommunications numbers when changing telecommunications service providers within the same type of telecommunications service as stipulated by law.</span>
</p>
<p >
    <span >- Provide services to telecommunications service users whose telecommunications subscriber information is complete and matches the information on the identification documents presented when concluding the Terrestrial Mobile Telecommunications Service Provision and Usage Contract (prepaid payment method), Subscriber Information Confirmation, and General Transaction Conditions in accordance with legal regulations;</span>
</p>
<p >
    <span >- Perform authentication, storage, use of telecommunications subscriber information, and handle SIM cards with incomplete or inaccurate telecommunications subscriber information;</span>
</p>
<p >
    <span >- Prevent and stop messages and calls that violate the law as stipulated by the Government;</span>
</p>
<p >
    <span >- Stop providing telecommunications services to telecommunications subscribers who violate telecommunications laws.</span>
</p>
<p >
    <span >- Galaxy Holdings commits to comply with the entire Terrestrial Mobile Telecommunications Service Provision and Usage Contract (prepaid payment method), Subscriber Information Confirmation, and General Transaction Conditions of Galaxy Holdings, including amendments and supplements at each time after the Terrestrial Mobile Telecommunications Service Provision and Usage Contract (prepaid payment method), Subscriber Information Confirmation, and General Transaction Conditions have been approved by the competent state agency, published at least 5 (five) days before application, placed at the counter or on the website https://Skyfi.vn, SkyFi Application of Galaxy Holdings, and provided to the Customer before both parties sign the Terrestrial Mobile Telecommunications Service Provision and Usage Contract (prepaid payment method), Subscriber Information Confirmation, and General Transaction Conditions. The Customer has the right to terminate the service if they do not agree with these amendments and supplements. If the Customer continues to use the service, it means they have agreed, and these amendments and supplements will apply from the time the Terrestrial Mobile Telecommunications Service Provision and Usage Contract (prepaid payment method), Subscriber Information Confirmation, and General Transaction Conditions are approved by the competent state agency. The provisions of the Terrestrial Mobile Telecommunications Service Provision and Usage Contract (prepaid payment method), Subscriber Information Confirmation, and General Transaction Conditions apply to the Service User who is a consumer as stipulated in Clause 1, Article 3 of the Law on Protection of Consumer Rights.</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>6.2. Customer Obligations</strong></span></i>
</p>
<p >
    <span >- Pay telecommunications service fees fully and on time;</span>
</p>
<p >
    <span >- Compensate for direct damages caused by their fault to Galaxy Holdings, telecommunications service agents;</span>
</p>
<p >
    <span >- Be responsible before the law for the use of the telecommunications subscriber number for which they have concluded the Terrestrial Mobile Telecommunications Service Provision and Usage Contract (prepaid payment method), General Transaction Conditions with Galaxy Holdings;</span>
</p>
<p >
    <span >- Be responsible before the law for the content of information they send and store on the telecommunications network;</span>
</p>
<p >
    <span >- Not use Galaxy Holdings' telecommunications infrastructure for telecommunications business purposes. &nbsp;</span>
</p>
<p >
    <span >- Not use the telecommunications network to threaten, harass, distort, slander, insult the reputation, honor, or dignity of other individuals/organizations; &nbsp;</span>
</p>
<p >
    <span >- Provide accurate information in the Terrestrial Mobile Telecommunications Service Provision and Usage Contract (prepaid payment method), Subscriber Information Confirmation in accordance with State regulations; &nbsp;</span>
</p>
<p >
    <span >- Be responsible for updating subscriber information as regulated when there are changes in identification documents or when discovering that their subscriber information is inaccurate or when receiving a notice from Galaxy Holdings about incorrect information; &nbsp;</span>
</p>
<p >
    <span >- Not use information on their identification documents to conclude the Terrestrial Mobile Telecommunications Service Provision and Usage Contract (prepaid payment method), Subscriber Information Confirmation, General Transaction Conditions for providing and using terrestrial mobile telecommunications services for others, except where permitted by law; &nbsp;</span>
</p>
<p >
    <span >- Protect their password, encryption key, and terminal equipment;</span>
</p>
<p >
    <span >- In case of SIM loss, the customer must immediately go to Galaxy Holdings transaction points or use the SkyFi application (app) to perform procedures for reissuing a new SIM or request Galaxy Holdings to temporarily suspend outbound Service. If the Customer does not comply with the above regulations, the Customer must still pay for the incurred charges until official notification to Galaxy Holdings, and Galaxy Holdings is not obligated to refund the aforementioned incurred charges. In urgent cases, customers can call 19006605 to report a temporary lockout of outbound calls;</span>
</p>
<p >
    <span >- The Customer commits to comply with the entire Terrestrial Mobile Telecommunications Service Provision and Usage Contract (prepaid payment method), Subscriber Information Confirmation, and General Transaction Conditions of Galaxy Holdings, including amendments and supplements at each time after the Terrestrial Mobile Telecommunications Service Provision and Usage Contract (prepaid payment method), Subscriber Information Confirmation, and General Transaction Conditions have been approved by the competent state agency, published at least 5 (five) days before application, placed at the counter or on the website https://Skyfi.vn, SkyFi application of Galaxy Holdings, and provided to the Customer before both parties sign the Terrestrial Mobile Telecommunications Service Provision and Usage Contract (prepaid payment method), Subscriber Information Confirmation, and General Transaction Conditions. The Customer has the right to terminate the service if they do not agree with these amendments and supplements. If the Customer continues to use the service, it means they have agreed, and these amendments and supplements will apply from the time the Terrestrial Mobile Telecommunications Service Provision and Usage Contract (prepaid payment method), Subscriber Information Confirmation, and General Transaction Conditions are approved by the competent state agency. The provisions of the Terrestrial Mobile Telecommunications Service Provision and Usage Contract (prepaid payment method), Subscriber Information Confirmation, and General Transaction Conditions apply to the Service User who is a consumer as stipulated in Clause 1, Article 3 of the Law on Protection of Consumer Rights.</span>
</p>
<p >
    <span ><strong>7. SERVICE QUALITY STANDARDS</strong></span>
</p>
<p >
    <span >Galaxy Holdings provides services according to the service quality standards announced to the Ministry of Science and Technology and listed on the Website https:\\\\\\\\skyfi.vn and the SkyFi Application.</span>
</p>
<p >
    <span ><strong>8. PRICE &amp; PAYMENT</strong></span>
</p>
<p >
    <i><span >-&nbsp;</span></i><span >The price of the Product may or may not include value-added tax and is specifically described on the Product introduction page. In all cases, the price of the Product does not include shipping fees. &nbsp;</span>
</p>
<p >
    <i><span >-&nbsp;</span></i><span >The Customer pays the value of the order before receiving the Product of that Order. When the Customer clicks the "Pay" button to proceed with payment for the order, it means that (i) the Customer confirms having reviewed the order information; and (ii) the Customer agrees that the Terms and Conditions will apply to the purchase transaction of the Product in that order.</span>
</p>
<p >
    <i><span >-&nbsp;</span></i><span >Galaxy Holdings reserves the right to refuse the Customer's credit card payment method in certain cases at our discretion.</span>
</p>
<p >
    <i><span >- To ensure payment security, customers should note:</span></i>
</p>
<p >
    <span >+&nbsp;Only make online payments at the linked window from the Application;</span>
</p>
<p >
    <span >+ Use and store cards (credit cards, ATM cards, shopping cards, etc.) and account/card information carefully;</span>
</p>
<p >
    <span >+ Do not lend or allow others to use your card to purchase goods on the Application. Immediately upon detecting any abnormal transactions on the Application, the Customer should immediately contact our Customer Service Hotline at: &nbsp;<strong>19006605</strong>&nbsp;(hereinafter referred to as “CSH”) or the hotline of the card-issuing Bank for timely processing;</span>
</p>
<p >
    <span >+ In all cases, for international credit/debit cards, please do not reveal the CVV/CVC/CSC number (which is a security code, a three-digit set of characters printed on the back of the card) to protect card information;</span>
</p>
<p style="line-height:150%;margin-bottom:.0001pt;text-align:justify;">
    <span style="font-size:12.0pt;line-height:150%;">&nbsp;</span><span ><strong>9. PRODUCT SHIPPING AND DELIVERY</strong></span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.1. Delivery Scope</strong></span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Galaxy Holdings provides delivery services to Customers at the location requested by the Customer nationwide (*).</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;">(*) Orders will be delivered to the Customer's home, except for restricted cases such as office areas or high-rise apartments with restricted access regulations. In these restricted cases, if the Customer wishes for home delivery, please call the Customer Service Hotline for assistance.</span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp; The person designated by the Customer to receive the Product on the order or by phone as stipulated in this Article shall be collectively referred to as "Recipient".</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- When requested by Galaxy Holdings, the Recipient must present identification documents to the delivery staff for verification before receiving the goods.</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.2. Delivery Time</strong></span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">Delivery time:&nbsp;<strong>As per the regulations of Galaxy Holdings' shipping partners</strong></span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.3. Delivery Fee</strong></span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Delivery fees will be notified for each order based on the area and delivery time.</span>
</p>
<p >
    <i><span >-&nbsp;</span></i><span >The Recipient must inspect the Product and sign the Delivery Note upon receipt of the Product according to the shipping unit's policy. Risk and ownership of the Product will be transferred to the Customer from the time the Recipient signs the Delivery Note. The Customer should keep the Delivery Note for reconciliation or to resolve any issues that may arise related to the Product (if any). After the Product return period specified in the Return Policy, any issues that may arise related to the Product (if any) will not be processed.</span>
</p>
<p >
    <span ><strong>10. CUSTOMER CARE &amp; COMPLAINT HANDLING</strong></span>
</p>
<p >
    <span >- In case of any questions or complaints, including but not limited to product/service quality, product delivery, delivery staff's attitude, product exchange/return, etc., the Customer can contact the Customer Service Hotline&nbsp;<strong>19006605&nbsp;</strong>or email address&nbsp;</span><a href="mailto:customercare@skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" lang="EN-GB">customercare@skyfi.vn</span></a>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;</span><span >When contacting the Customer Service Hotline, the Customer must provide the order number recorded in the email or order confirmation message that Galaxy Holdings sent to the Customer. The Customer Service Hotline will receive and respond to the Customer as soon as possible.</span>
</p>
<p >
    <span ><strong>11. INFORMATION SECURITY</strong></span>
</p>
<p >
    <span >- Our Application prioritizes information security and uses the best measures to protect customer information and payments. Customer information during the payment process will be encrypted to ensure safety. After the Customer completes the ordering process, the Customer will exit the secure mode.</span>
</p>
<p >
    <span >- The Customer is not allowed to use any program, tool, or other form to interfere with the system or alter the data structure. The Application also strictly prohibits the dissemination, propagation, or encouragement of any activity intended to interfere with, destroy, or infiltrate the system's data. Individuals or organizations that violate these provisions will have all their rights revoked and will be prosecuted before the law if necessary.</span>
</p>
<p >
    <span >- All transaction information will be kept confidential, but in case law enforcement agencies request it, we will be forced to provide this information to them.</span>
</p>
<p >
    <span >- When making online payments, please note the following details:</span>
</p>
<p >
    <span >+&nbsp;Only use applications with secure payment certificates.</span>
</p>
<p >
    <span >+ Absolutely do not lend your credit card or account to others to make payments on the Application.</span>
</p>
<p >
    <span >+ In case of unintended transactions, please notify the Customer Service Hotline for timely assistance.</span>
</p>
<p >
    <span >+ Regularly check your bank account to ensure all card transactions are under control.</span>
</p>
<p >
    <span ><strong>12. LIMITATION OF LIABILITY</strong></span>
</p>
<p >
    <span >- In no event shall Galaxy Holdings be liable for any damage/loss/harm/damage incurred by the Customer after the risk has been transferred from Galaxy Holdings to the Customer.</span>
</p>
<p >
    <span >- For promotional gifts provided by Galaxy Holdings when customers purchase Products through the Application: Galaxy Holdings staff/Distribution channels and wholesale customers are obligated to register subscriber information for the end-user in accordance with the regulations of the Ministry of Science and Technology.</span>
</p>
<p >
    <span ><strong>13. GENERAL PROVISIONS</strong></span>
</p>
<p >
    <span >- The provisions referenced in these General Terms are an integral part of the Terms and Conditions.</span>
</p>
<p >
    <span >- Galaxy Holdings and the Customer are responsible for fulfilling all obligations stipulated in these Terms and Conditions.</span>
</p>
<p >
    <span >- If any content of these Terms and Conditions is deemed invalid or unenforceable in whole or in part by any competent authority, the validity of the other content in these Terms and Conditions shall not be affected.</span>
</p>
<p >
    <span >- These Terms and Conditions and all matters arising in the contractual relationship between Galaxy Holdings and the Customer shall be interpreted and governed by the laws of Vietnam. All disputes, differences, and claims arising from or related to the content of these Terms and Conditions shall be resolved through good-faith negotiation within thirty (30) days. If a resolution cannot be reached within this thirty (30) day period, the dispute or claim may be resolved by the competent court.</span>
</p>
</div>`
    },
    ja: {
        title: '一般取引条件',
        content: `<div class="sub-container">
<div class="sub-container">
<p >
    <span >お客様を、GALAXY DIGITAL HOLDINGS Co., Ltd.（以下「<strong>Galaxy Holdings</strong>」または「<strong>当社</strong>」といいます）が設立および所有する公式オンライン販売アプリケーションへようこそお迎えいたします。</span>
</p>
<p >
    <span ><strong>当社について：</strong></span>
</p>
<p >
    <span >- <strong>電気通信サービス提供事業者：&nbsp;</strong>GALAXY DIGITAL HOLDINGS Co., Ltd.</span>
</p>
<p >
    <span >- <strong>電気通信サービス提供ライセンス番号</strong>: </span><span style="font-size:12.0pt;line-height:150%;">情報通信省が2025年02月06日に発行した41/GP-CVT。</span>
</p>
<p >
    <span >- <strong>事業登録証明書番号：&nbsp;</strong></span><span style="font-size:12.0pt;line-height:150%;">ホーチミン市計画投資局が2021年08月13日に発行した0316951481。</span>
</p>
<p >
    <span >- <strong>住所：&nbsp;</strong></span><span style="font-size:12.0pt;line-height:150%;">ベトナム、ホーチミン市、ニャーベー、フックキエン、グエンフートー通り673、PV Gasビル</span>
</p>
<p >
    <span >- <strong>電話番号：&nbsp;</strong></span><span style="font-size:12.0pt;line-height:150%;">028 7300 6555</span>
</p>
<p >
    <span >- <strong>電子メール:</strong>&nbsp;</span><a href="mailto:customercare@skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" lang="EN-GB">customercare@skyfi.vn</span></a>
</p>
<p >
    <span >- <strong>サービス品質に関する苦情受付電話番号：</strong>&nbsp;19006605</span>
</p>
<p >
    <span >お客様が当社のアプリケーションにアクセスすることにより、お客様は本利用規約および&nbsp;</span><a href="https://www.vietnamobile.com.vn/product/chinh-sach/thong-bao-xu-ly-du-lieu-ca-nhan/"><span style="color:windowtext;font-size:12.0pt;line-height:150%;text-decoration:none;text-underline:none;" lang="EN-GB">個人データ保護方針</span></a><span >に同意したものとみなされます。当社は、本利用規約のいかなる部分も、いつでも変更、修正、追加または削除する権利を留保します。変更は、事前の通知なしに、アプリケーションに掲載された時点から直ちに効力を生じます。お客様が、規約および条件の変更が掲載された後も引き続きアプリケーションをご利用になる場合、お客様はその変更を受け入れたことになります。お客様には、当社の変更を更新するために、定期的にご確認いただくようお願いいたします。</span>
</p>
<p >
    <span ><strong>1. 適用範囲</strong></span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>1.1. 本利用規約は、以下のお客様に適用されます。</strong></span></i>
</p>
<p >
    <span >- Galaxy Holdingsの製品およびサービス（以下「<strong>製品</strong>」といいます）を購入し、利用するお客様。&nbsp;&nbsp;&nbsp;</span>
</p>
<p >
    <span >- その時点においてアプリケーションに掲載されている配送方針に適合する場所に製品の配送を希望するお客様。</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>1.2. アプリケーションで製品を購入するお客様は、定型約款、一般取引条件に従って契約を締結するために、以下の書類を提出する必要があります。</strong></span></i>
</p>
<p >
    <span >- 個人の場合：ベトナム国籍を有する者については有効期限内のパスポート、市民IDカード、IDカード、電子ID、または電子認証アカウントの原本、または外国籍を有する者についてはベトナム国内で有効なパスポートの原本（以下、総称して身分証明書といいます）。</span>
</p>
<p >
    <span >- 組織の場合：設立決定書または事業登録および納税証明書、もしくは投資許可証、もしくは企業登録証明書の原本または原本からの認証コピー（以下、総称して法人証明書といいます）、および組織の法定代理人の身分証明書。移動体電気通信サービスの場合、組織は、組織が電気通信事業者と締結した定型約款、一般取引条件に従って電気通信サービスを利用することを許可された、組織に属する個人のリスト（組織による合法的な確認済み）を、各個人の身分証明書の原本と併せて提出する必要があります（組織が利用者を引き渡す場合）。お客様が組織の法定代理人ではない者が定型約款、一般取引条件を締結する場合、法定代理人による合法的な委任状と自身の身分証明書を提出する必要があります。</span>
</p>
<p >
    <span >- 14歳未満のお客様、または民法によって定められた被後見人の場合、定型約款、一般取引条件の締結は、その父、母、または後見人が行う必要があります。</span>
</p>
<p >
    <span >（2024年12月24日付の政府の政令第163/2024/NĐ-CP号に基づく適用</span><span style="font-size:12.0pt;letter-spacing:.1pt;line-height:150%;">）</span>
</p>
<p >
    <span ><strong>2. 商品およびサービスの提供における条件または制限</strong></span>
</p>
<p >
    <span >- 公平性を確保し、最終消費者であるお客様の利益を守るため、Galaxy Holdingsは、プロモーションプログラムの実施において、制限条件を適用する権利を有します。これには、各プロモーションプログラムでお客様が購入できる製品の最大数量の制限、製品パッケージの購入目的の制限（消費のみを目的とし、商業目的や転売等は不可）、またはその他の制限（もしあれば）が含まれ、これらは各プロモーションプログラム内で詳細に規定されます。これらの制限条件は、以下、プロモーション方針と称します。</span>
</p>
<p >
    <span >したがって、Galaxy Holdingsは、プロモーション方針のいずれかの内容に違反する、確認されていない、拒否された、キャンセルされた、または引き渡し済みの製品を取り消す権利を有します。</span>
</p>
<p >
    <span >- Galaxy Holdingsは、以下のいずれかの内容を満たさない個人または組織に対し、製品の提供を拒否する権利を有します。具体的には、加入者情報登録のために提示された書類が規定通りでない、または提示された加入者情報登録のための書類が不明瞭である、書類のデジタル化が鮮明でなく、情報が不完全である、あるいは認証後に身分証明書の情報が一致しない、または認証できない場合です。</span>
</p>
<p >
 <p >
    <span ><strong>3. 検品方針 (または「製品検査方針」)</strong></span>
</p>
<p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:27.0pt;text-align:justify;">
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>3.1. ご注文の手順</strong></span></i>
</p>
<p >
    <span >- お客様がアプリケーションでご注文された際、当社はご注文リクエストを受け取り、お客様にご注文番号を送信いたします。</span>
</p>
<p >
    <span >- ご注文リクエストを迅速に確定するために、お客様は配送に関する情報、またはお客様が参加されるプロモーションプログラム（もしあれば）の条件および規定に関する情報を、正確かつ完全にご提供ください。</span>
</p>
<p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:27.0pt;text-align:justify;">
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>3.2. 検品方針</strong></span></i>
</p>
<p >
    <span >- 製品は、アプリケーション上の詳細な説明と合致していることを保証いたします。&nbsp;</span>
</p>
<p >
    <span >- eSIMの場合：製品の購入と支払いが完了した後、お客様には購入されたeSIMの情報に関するGalaxy Holdingsからの通知が電子メールで届きます。情報を受け取られた際、お客様はeSIMの情報を確認していただくようお願いいたします。eSIM製品は直接配送されないため、検品方針はございません。</span>
</p>
<p >
    <span >- 物理SIMの場合：支払いと製品の受け取り後、お客様は数量、封印、モデル情報、および有効期限が注文内容と比較して正しいことを確認してください。&nbsp;</span>
</p>
<p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:9.0pt;text-align:justify;">
    <span ><strong>4. 製品の交換・返品方針</strong></span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">アプリケーションの製品の交換・返品方針は、返品が認められる理由、返品される製品に求められる要件、およびお客様への返品処理にかかる期間を規定しています。</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.1. 返品が認められる理由</strong></span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- 製品の封印が失われている、または数量、情報、モデルが注文内容と異なって配送された場合。</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;製造元の過失（技術的欠陥、設計上の欠陥、内容の欠陥）または配送中の過失（変形、傷、ひび割れなど）により製品が損傷している場合。</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;製品の有効期限が、お客様への配達日以前または配達日に満了している場合。</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.2. 返品される製品に求められる要件</strong></span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.2.1. 返品条件：</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- 製品が完全で、元の梱包どおりにすべてのラベルが付いていること（製品に欠陥があるか、配送中に損傷した場合は除く）。</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;製品の有効期限が残っていること。&nbsp;</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- 製品に汚れがなく、使用された形跡がないこと。</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;お客様がアプリケーションでの購入を確認できるもの（注文番号、電子購入請求書、配達受領書、銀行取引明細書など）を保持していること。</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.2.2. 返品適用期間：</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- アプリケーション上の製品紹介で別途規定されていない限り、お客様は製品受領日から**02日以内**に返品リクエストを送信する期限があります。</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.2.3. 返品場所：</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- お客様は、製品および書類、アプリケーションで購入したことを確認できる書類（注文番号、電子購入請求書、配達受領書など）を、Galaxy Holdingsの取引店舗に持参するか、または以下の住所宛てに郵送してください：両当事者の合意によるGalaxy Holdingsの電気通信サービス提供拠点。</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.2.4. 返品リクエストの時点は、以下に基づいて決定されます。</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- お客様が郵便または宅配便で送付する場合：郵便局または宅配業者による受領印の日付。</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;お客様が交換・返品センターに直接持参/送付する場合：Galaxy Holdingsの従業員がお客様からの返品製品を受領した時点。</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.2.5. 返品費用</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Galaxy Holdingsまたはサプライヤー（NCC）の過失による返品製品の場合、お客様は製品の返品費用を免除されます。製品の交換・返品にかかる輸送料金、または第三者に支払うその他の費用は、お客様のご負担となります。</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.3. 返金規定&nbsp;</strong></span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.3.1. 返金の原則</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;返金は、お客様がGalaxy Holdingsに支払いを行った後、在庫切れの問題が発生した場合、またはお客様が製品を受け取ったが第4.2項の規定に従って製品の交換・返品を要求した場合に実施されます。</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- 1,000ベトナムドン未満の返金リクエストには適用されません。</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;返金処理期間は営業日（土曜日、日曜日、規定により休日の祝祭日、テト休暇を除く）で計算されます。</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;ギフトコードをご利用いただいた場合の返金：お客様がギフトコードをご利用になり、Galaxy Holdingsが返金を認める特別な場合、Galaxy Holdingsは、お客様が利用されたギフトコードの価値相当額は返金せず、お客様が実際に購入時に支払われた金額のみを返金いたします。</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.3.2. 返金方法</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;銀行振込による返金：お客様はGalaxy Holdingsのカスタマーサービスセンターにご連絡いただき、情報を提供し、指示に従ってください。</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">4.3.3. 処理期間</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Galaxy Holdingsは、製品を再度受領してから**最大07営業日以内**に、電子メールまたは/およびSMSを通じてお客様に返金リクエストの応答結果を送信いたします。</span>
</p>
<p >
    <span >注：&nbsp;</span><span style="font-size:12.0pt;line-height:150%;">Galaxy Holdingsの交換・返品センターへの輸送中に製品が損傷した場合、Galaxy Holdingsはその責任を負いません。</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.4. 変更</strong></span></i>
</p>
<p >
    <span >- 製品購入後、製品の情報およびデータパッケージは、特定の要求に基づいて変更またはカスタマイズすることはできません。これらは現状のまま提供されます。</span>
</p>
<p >
    <span >- 詳細については、skyfi.vn のカスタマーケア部門までお問い合わせいただくか、または1900 6605までご連絡ください。ご協力ありがとうございます！</span>
</p>
<p >
    <span ><strong>5. 保証方針</strong></span>
</p>
<p >
    <span >保証方針&nbsp;</span><span style="font-family:&quot;Segoe UI Symbol&quot;,sans-serif;font-size:12.0pt;line-height:150%;" lang="EN-GB">🗹</span><span > 有り&nbsp;</span><span style="font-family:&quot;Segoe UI Symbol&quot;,sans-serif;font-size:12.0pt;line-height:150%;" lang="EN-GB">❑</span><span > 無し</span>
</p>
<p >
    <span ><strong>6. GALAXY HOLDINGSおよびお客様の義務</strong></span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>6.1. Galaxy Holdingsの義務</strong></span></i>
</p>
<p >
    <span >- Galaxy Holdingsが公表し、ウェブサイト&nbsp;</span><a href="https://Skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" lang="EN-GB">https://Skyfi.vn</span></a><span >、SkyFiアプリケーション、およびGalaxy Holdingsの電気通信サービス提供拠点で掲示しているサービス品質に完全に合致したサービス品質を、お客様に提供することを保証すること。また、地上移動体電気通信サービス提供および利用契約（プリペイド決済形式）、加入者情報確認書、一般取引条件を締結する前にお客様に提供すること。</span>
</p>
<p >
    <span >- 地上移動体電気通信サービス提供および利用契約（プリペイド決済形式）、加入者情報確認書、一般取引条件に基づき、サービス価格の正確性、完全性、正確さを保証すること。</span>
</p>
<p >
    <span >- サービス利用期限が切れる日の少なくとも**07営業日**前までに、合意された方法で、サービス継続利用のための料金納付についてお客様に通知すること。</span>
</p>
<p >
    <span >- サービス提供が終了する日の少なくとも**07営業日**前までに、合意された方法で、サービス提供終了時期についてお客様に通知すること。</span>
</p>
<p >
    <span >- お客様の情報の秘密を保護し、両当事者間の合意による場合、または国家機関の要求による場合、もしくは法令に別段の定めがある場合を除き、お客様の同意がある場合にのみ、お客様の情報を利用し、第三者に提供すること。</span>
</p>
<p >
    <span >- サービスの一時停止後、お客様が義務を履行した場合、規定の期限内にサービスの利用を回復させること（回収され再利用された加入者番号を除く）。</span>
</p>
<p >
    <span >- お客様がサービスの品質に関する問題点を通知した際、速やかに確認し、解決すること。</span>
</p>
<p >
    <span >- 法令に定める期間内にお客様の苦情を解決すること。</span>
</p>
<p >
    <span >- 電気通信事業の停止を正式に行う**少なくとも30日前**に、電気通信事業の停止についてお客様に通知すること。Galaxy Holdingsは、以下の条件をすべて満たした場合にのみ、電気通信サービスの一部または全部の事業を停止するものとします。(a) 締結済みの地上移動体電気通信サービス提供および利用契約（プリペイド決済形式）、加入者情報確認書、一般取引条件に基づく電気通信サービス利用者および関連当事者の法的権利および利益を確保するための措置を講じていること、および (b) 電気通信事業の停止について権限のある国家機関に通知していること。</span>
</p>
<p >
    <span >- Galaxy Holdingsは、その提携先が法令の規定に従ってお客様の情報を秘密にすることを保証する責任を負います。本条項は、お客様が合意された目的でGalaxy Holdingsがお客様の情報を提携先に提供することに同意した場合に適用されます。&nbsp;</span>
</p>
<p >
    <span >- 権限のある国家機関の管理下にあり、電気通信インフラストラクチャの安全性および情報セキュリティの確保に関する規定を実施すること。</span>
</p>
<p >
    <span >- 法令の規定に従い、同一種類の電気通信サービス内で電気通信サービス提供事業者を変更する際に、電気通信加入者が電気通信加入者番号を維持できるように保証すること。</span>
</p>
<p >
    <span >- 地上移動体電気通信サービス提供および利用契約（プリペイド決済形式）、加入者情報確認書、一般取引条件を締結する際に提示された身分証明書の情報と完全に一致する、完全な電気通信加入者情報を有する電気通信サービス利用者に対しサービスを提供すること。</span>
</p>
<p >
    <span >- 電気通信加入者情報の認証、保管、利用、および情報が不完全または不正確な電気通信加入者情報を持つSIMの処理を行うこと。</span>
</p>
<p >
    <span >- 政府の規定に従い、法令に違反するテキストメッセージおよび通話の予防、防止、阻止を行うこと。</span>
</p>
<p >
    <span >- 電気通信法に違反する電気通信加入者に対し、電気通信サービスの提供を停止すること。</span>
</p>
<p >
    <span >- Galaxy Holdingsは、権限のある国家機関によって承認された後、地上移動体電気通信サービス提供および利用契約（プリペイド決済形式）、加入者情報確認書、一般取引条件が適用される**少なくとも5日**前に、その全てが適用される、店頭またはウェブサイト https://Skyfi.vn、Galaxy HoldingsのSkyFiアプリケーションに掲載され、両当事者が契約を締結する前にお客様に提供される、地上移動体電気通信サービス提供および利用契約（プリペイド決済形式）、加入者情報確認書、一般取引条件の全て、および随時の修正・追加に同意し、遵守することを約束します。お客様は、これらの修正・追加に同意しない場合、サービスの利用を終了する権利を有します。お客様が引き続きサービスを利用する場合、これらの修正・追加に同意したものと見なされ、地上移動体電気通信サービス提供および利用契約（プリペイド決済形式）、加入者情報確認書、一般取引条件が権限のある国家機関によって承認された時点から適用されます。地上移動体電気通信サービス提供および利用契約（プリペイド決済形式）、加入者情報確認書、一般取引条件の規定は、消費者権利保護法第3条第1項に規定される消費者であるサービス利用者に対し適用されます。</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>6.2. お客様の義務</strong></span></i>
</p>
<p >
    <span >- 電気通信サービスの利用料金を完全かつ期限内に支払うこと。</span>
</p>
<p >
    <span >- お客様自身の過失によりGalaxy Holdings、または電気通信サービス代理店に生じた直接的な損害を賠償すること。</span>
</p>
<p >
    <span >- お客様自身がGalaxy Holdingsと地上移動体電気通信サービス提供および利用契約（プリペイド決済形式）、一般取引条件を締結した電気通信加入者番号の利用に関して、法的な責任を負うこと。</span>
</p>
<p >
    <span >- 電気通信ネットワークに送信または保存する情報の内容について、法的な責任を負うこと。</span>
</p>
<p >
    <span >- 電気通信事業を目的として、Galaxy Holdingsの電気通信インフラストラクチャを利用してはならないこと。&nbsp;</span>
</p>
<p >
    <span >- 他の個人/組織の信用、名誉、人格を脅迫、嫌がらせ、歪曲、誹謗中傷、侮辱するために電気通信ネットワークを利用してはならないこと。&nbsp;</span>
</p>
<p >
    <span >- 地上移動体電気通信サービス提供および利用契約（プリペイド決済形式）、加入者情報確認書に記載された情報を、国の規定に従って正確に提供すること。&nbsp;</span>
</p>
<p >
    <span >- 書類の変更があった場合、または自身の加入者情報が不正確であると判明した場合、またはGalaxy Holdingsから規定外の情報である旨の通知を受け取った場合、規定に従って加入者情報を更新する責任を負うこと。&nbsp;</span>
</p>
<p >
    <span >- 法令で許可されている場合を除き、自身の身分証明書の情報を使用して、他の人のために地上移動体電気通信サービス提供および利用契約（プリペイド決済形式）、加入者情報確認書、地上移動体電気通信サービス提供および利用の一般取引条件を締結してはならないこと。&nbsp;</span>
</p>
<p >
    <span >- パスワード、暗号キー、および自身の端末機器を保護すること。</span>
</p>
<p >
    <span >- SIMを紛失した場合、お客様は直ちにGalaxy Holdingsの取引窓口に行くか、またはSkyFiアプリケーション（アプリ）を使用して、新しいSIMの再発行手続きを行うか、またはGalaxy Holdingsに発信サービスの一時停止を要求すること。お客様が上記の規定に従わなかった場合、Galaxy Holdingsに正式に通知するまでの間に発生した料金の支払いは引き続きお客様の責任となり、同時にGalaxy Holdingsは上記の発生した料金を払い戻す義務を負いません。緊急の場合、お客様は19006605に電話して発信の一時停止を通知することができます。</span>
</p>
<p >
    <span >- お客様は、権限のある国家機関によって承認された後、地上移動体電気通信サービス提供および利用契約（プリペイド決済形式）、加入者情報確認書、一般取引条件が適用される**少なくとも5日**前に、その全てが適用される、店頭またはウェブサイト https://Skyfi.vn、Galaxy HoldingsのSkyFiアプリケーションに掲載され、両当事者が契約を締結する前にお客様に提供される、地上移動体電気通信サービス提供および利用契約（プリペイド決済形式）、加入者情報確認書、一般取引条件の全て、および随時の修正・追加に同意し、遵守することを約束します。お客様は、これらの修正・追加に同意しない場合、サービスの利用を終了する権利を有します。お客様が引き続きサービスを利用する場合、これらの修正・追加に同意したものと見なされ、地上移動体電気通信サービス提供および利用契約（プリペイド決済形式）、加入者情報確認書、一般取引条件が権限のある国家機関によって承認された時点から適用されます。地上移動体電気通信サービス提供および利用契約（プリペイド決済形式）、加入者情報確認書、一般取引条件の規定は、消費者権利保護法第3条第1項に規定される消費者であるサービス利用者に対し適用されます。</span>
</p>
<p >
  <p >
    <span ><strong>7. サービス品質基準</strong></span>
</p>
<p >
    <span >Galaxy Holdingsは、科学技術省に公表され、ウェブサイト https:\\\\\\\\skyfi.vn およびSkyFiアプリケーションに掲示されているサービス品質基準に従ってサービスを提供します。</span>
</p>
<p >
    <span ><strong>8. 価格と支払い</strong></span>
</p>
<p >
    <i><span >-&nbsp;</span></i><span >製品の価格には、付加価値税が含まれている場合と含まれていない場合があり、製品紹介ページに具体的に記載されています。いかなる場合も、製品の価格には送料は含まれていません。&nbsp;</span>
</p>
<p >
    <i><span >-&nbsp;</span></i><span >お客様は、注文された製品を受け取る前に、その注文の代金を支払うものとします。お客様が注文の支払いを実行するために「支払い」ボタンをクリック（押す）したことは、(i) お客様が注文情報を確認したこと、および (ii) お客様が本利用規約が当該注文の製品購入取引に適用されることに同意したことを意味します。</span>
</p>
<p >
    <i><span >-&nbsp;</span></i><span >Galaxy Holdingsは、当社の判断により、特定の状況においてお客様のクレジットカードによる支払い方法を拒否する権利を有します。</span>
</p>
<p >
    <i><span >- 支払いにおける安全性を確保するため、お客様は以下にご留意ください。</span></i>
</p>
<p >
    <span >+&nbsp;オンライン支払いは、アプリケーションから転送されたリンク先のウィンドウでのみ実行すること。</span>
</p>
<p >
    <span >+ カード（クレジットカード、ATMカード、購入カードなど）および口座情報/カード情報を慎重に使用および保管すること。</span>
</p>
<p >
    <span >+ 他人にカードを貸与したり、アプリケーションでの購入に使用させたりしないこと。アプリケーションで異常な取引が発生したことを発見した場合、お客様は直ちに当社のカスタマーサービスホットライン：&nbsp;<strong>19006605</strong>&nbsp;（以下「CSKHホットライン」といいます）またはカード発行銀行のホットラインに連絡し、迅速な対応を求めること。</span>
</p>
<p >
    <span >+ いかなる場合でも、国際クレジットカード/デビットカードの場合、お客様はカード情報のセキュリティを確保するために、CVV/CVC/CSC番号（カード裏面に印刷されているセキュリティコード、3桁の数字）を決して漏らさないようお願いいたします。</span>
</p>
<p style="line-height:150%;margin-bottom:.0001pt;text-align:justify;">
    <span style="font-size:12.0pt;line-height:150%;">&nbsp;</span><span ><strong>9. 製品の輸送および引渡し</strong></span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.1. 配送範囲</strong></span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Galaxy Holdingsは、全国（*）のお客様の要求する場所へ製品を配送いたします。</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;">（*）オフィスエリアや立ち入り制限がある高層マンションなど、制限がある場合を除き、ご注文はすべてお客様のご自宅まで配送されます。このような制限がある場合で、お客様がご自宅への配送をご希望される場合は、CSKHホットラインにお電話にてご相談ください。</span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp; お客様が注文書または電話で製品の受領者に指定した人（本条の規定による）は、総称して「**受領者**」と呼ばれます。</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- Galaxy Holdingsから要求された場合、受領者は製品を受け取る前に、配達員が確認できるよう、身分証明書などの書類を提示する必要があります。</span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.2. 配送期間</strong></span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">配送期間：&nbsp;<strong>Galaxy Holdingsの配送パートナーの規定による</strong></span>
</p>
<p >
    <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.3. 配送料金</strong></span></i>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">- 配送料金は、配送地域および配送時期に基づいて、注文ごとに通知されます。</span>
</p>
<p >
    <i><span >-&nbsp;</span></i><span >受領者は、製品を受け取る際に、配送業者の規定に従って製品を検査し、配送伝票に署名しなければなりません。製品のリスクと所有権は、受領者が配送伝票に署名した時点でお客様に移転します。お客様は、照合のため、または製品に関連して発生する可能性のある問題（もしあれば）を解決するために、配送伝票を保管する必要があります。製品の交換・返品方針に定める交換・返品期間が過ぎた後、製品に関連して発生する可能性のある問題（もしあれば）は処理されません。</span>
</p>
<p >
    <span ><strong>10. お客様サポートおよび苦情処理</strong></span>
</p>
<p >
    <span >- 製品/サービスの品質、製品の配送、配達員の態度、製品の交換/返品などを含みますが、これらに限定されない、ご質問や苦情がある場合は、CSKHホットライン **19006605** または電子メールアドレス&nbsp;</span><a href="mailto:customercare@skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" lang="EN-GB">customercare@skyfi.vn</span></a><span > までご連絡ください。</span>
</p>
<p >
    <span style="font-size:12.0pt;line-height:150%;">-&nbsp;</span><span >CSKHホットラインに連絡する際、お客様はGalaxy Holdingsがお客様に送信した注文確認の電子メールまたはSMSに記載されている注文番号を提供しなければなりません。CSKHホットラインはこれを受け付け、最短時間でお客様に返答いたします。</span>
</p>
<p >
    <span ><strong>11. 情報の機密保持</strong></span>
</p>
<p >
    <span >- 当社のアプリケーションは、情報の機密保持を重視し、お客様の情報および支払いを保護するための最善の措置を使用しています。支払いプロセス中のお客様の情報は、安全性を確保するために暗号化されます。お客様が注文プロセスを完了すると、安全モードを終了します。</span>
</p>
<p >
    <span >- お客様は、システムに干渉したり、データ構造を変更したりするためのいかなるプログラム、ツール、またはその他の形式も使用してはなりません。また、アプリケーションは、システムのデータに干渉、破壊、または侵入を目的としたあらゆる活動の拡散、伝播、または推奨を厳しく禁じます。違反した個人または組織は、すべての権利を剥奪され、必要に応じて法的に訴追されます。</span>
</p>
<p >
    <span >- すべての取引情報は機密保持されますが、法執行機関から要求があった場合、当社はこれらの情報を法執行機関に提供することを余儀なくされます。</span>
</p>
<p >
    <span >- オンラインで支払いを行う際、お客様は以下の詳細に注意してください。</span>
</p>
<p >
    <span >+&nbsp;安全な支払い認証を持つアプリケーションのみを使用すること。</span>
</p>
<p >
    <span >+ アプリケーションでの支払いのために、絶対に他人にクレジットカードや自分のアカウントを貸与しないこと。</span>
</p>
<p >
    <span >+ 意図しない取引が発生した場合、迅速なサポートを受けるためにCSKHホットラインに通知してください。</span>
</p>
<p >
    <span >+ すべてのカード取引が管理下にあることを確認するために、銀行口座を頻繁に確認すること。</span>
</p>
<p >
    <span ><strong>12. 責任の限定</strong></span>
</p>
<p >
    <span >- いかなる場合も、Galaxy Holdingsは、リスクがGalaxy Holdingsからお客様に移転した時点以降にお客様が被るあらゆる損害/損失/損傷/破損について責任を負いません。</span>
</p>
<p >
    <span >- お客様がアプリケーションを通じて製品を購入した際にGalaxy Holdingsが提供する付随的なギフトについて：Galaxy Holdingsの従業員/販売チャネルおよび卸売顧客は、科学技術省の規定に従い、最終利用者向けの加入者情報の登録を実施する義務があります。</span>
</p>
<p >
    <span ><strong>13. 一般条項</strong></span>
</p>
<p >
    <span >- 本一般条項で参照される規定は、本利用規約の不可分の一部を構成します。</span>
</p>
<p >
    <span >- Galaxy Holdingsとお客様は、本利用規約に規定されたすべての義務を履行する責任を負います。</span>
</p>
<p >
    <span >- 本利用規約のいずれかの内容が、権限のある機関によって全部または一部が無効または執行不能と見なされた場合でも、本利用規約の他の内容の有効性には影響を与えません。</span>
</p>
<p >
    <span >- 本利用規約、およびGalaxy Holdingsとお客様との間の契約関係から生じるすべての問題は、ベトナムの法律に基づいて解釈され、規制されます。本利用規約の内容から、またはそれに関連して生じるすべての紛争、相違、苦情は、30日以内に誠意をもって交渉を通じて解決されるものとします。この30日の期間内に解決できない場合、当該紛争または苦情は、権限のある裁判所によって解決されることがあります。</span>
</p>
<p style="background:white;line-height:150%;margin-bottom:.0001pt;text-align:center;" align="center">
    <span ><strong>---------------***---------------</strong></span>
</p>
</div>`
    },
    ko: {
        title: '일반 거래 조건', content: `<div class="sub-container"><p > <span >GALAXY DIGITAL HOLDINGS COMPANY LIMITED(이하 "<strong>Galaxy Holdings</strong>" 또는 "<strong>당사</strong>")가 설립 및 소유한 공식 온라인 판매 애플리케이션에 오신 것을 환영합니다.</span></p><p > <span ><strong>회사 소개:</strong></span></p><p > <span >- <strong>통신 서비스 제공자:</strong>GALAXY DIGITAL HOLDINGS COMPANY LIMITED</span></p><p > <span >- <strong>통신 서비스 제공 허가 번호</strong>: </span><span style="font-size:12.0pt;line-height:150%;">41/GP-CVT do 정보통신부 발행 2025년 2월 6일 통신.</span></p><p > <span >- <strong>사업자등록증:&nbsp;</strong></span><span style="font-size:12.0pt;line-height:150%;">0316951481, 호치민시 기획투자부에서 2021년 8월 13일에 발급.</span></p><p > <span >- <strong>주소:&nbsp;</strong></span><span style="font-size:12.0pt;line-height:150%;">PV 가스 빌딩, 673 Nguyen Huu Tho, Phuoc Kien, Nha Be, City. 베트남 호치민</span></p><p > <span >- <strong>전화:</strong></span><span style="font-size:12.0pt;line-height:150%;">028 7300 6555</span></p><p > <span >- <strong>이메일:</strong></span><a href="mailto:customercare@skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" lang="EN-GB">customercare@skyfi.vn</span></a> 
</p> 
<p > <span >- <strong>전화번호는 서비스 품질을 반영합니다:</strong>&nbsp;19006605</span></p><p > <span>고객이 당사 애플리케이션에 접속하는 것은 본 이용 약관 및&nbsp;</span><a href="https://www.vietnamobile.com.vn/product/chinh-sach/thong-bao-xu-ly-du-lieu-ca-nhan/"><span style="color:windowtext;font-size:12.0pt;line-height:150%;text-decoration:none;text-underline:none;" lang="EN-GB">개인정보보호정책</span></a><span >에 동의하는 것을 의미합니다. 당사는 언제든지 본 이용 약관의 모든 내용을 변경, 수정, 추가 또는 삭제할 권리를 보유합니다. 변경 사항은 사전 고지 없이 애플리케이션에 게시되는 즉시 적용됩니다. 고객이 이용 약관 변경 사항이 게시된 후에도 애플리케이션을 계속 사용하는 경우, 이는 고객이 해당 변경 사항에 동의한 것으로 간주됩니다. 변경 사항을 정기적으로 확인하여 업데이트해 주시기 바랍니다.</span></p><p > <span ><strong>1. 적용 범위</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>1.1. 이용 약관은 다음과 같은 고객에게 적용됩니다.</strong></span></i></p><p > <span >- Galaxy Holdings의 제품을 구매하고 서비스("<strong>제품</strong>")를 사용하는 경우.&nbsp;&nbsp;&nbsp;</span></p><p > <span >- 애플리케이션에 수시로 게시되는 배송 정책에 따라 제품을 배송해야 하는 경우.</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>1.2. 애플리케이션에서 제품을 구매할 때 고객은 양식 및 일반 거래 조건에 따라 계약을 체결하기 위해 다음 서류를 제공해야 합니다.</strong></span></i></p> 
<p > 
<span>- 개인의 경우: 베트남 국민의 경우 여권 원본, 시민 신분증, 신분증, 전자 신분증 또는 유효 기간이 있는 전자 신분증 계좌 또는 외국인의 경우 베트남에서 유효 기간이 있는 여권(이하 신분증이라고 함);</span></p><p > <span>- 조직의 경우: 설립 결정서 원본 또는 공증 사본, 사업자 등록증 및 세무 등록증 또는 투자 허가증 또는 기업 등록증(이하 법인 증명서라고 함) 원본 또는 공증 사본, 조직의 법적 대리인의 신분증. 이동 통신 서비스의 경우 조직은 조직이 통신 기업과 체결한 표준 계약 및 일반 거래 조건에 따라 통신 서비스를 사용할 수 있는 조직 소속 개인 목록(조직의 법적 확인 필요)과 각 개인의 신분증 원본을 첨부해야 합니다(조직이 사용자에게 제공하는 경우). 표준양식 및 일반 거래조건에 따라 계약을 체결하는 고객이 해당 기관의 법적 대리인이 아닌 경우, 법적 대리인의 법적 위임장 및 신분증을 제출해야 합니다.</span></p><p > <span>- 14세 미만 고객 또는 민법에서 규정하는 보호자의 경우, 표준양식 및 일반 거래조건에 따른 계약 체결은 아버지, 어머니 또는 보호자가 수행해야 합니다.</span></p><p > <span>(2024년 12월 24일자 정부령 163/2024/ND-CP에 따라 적용됨</span><span style="font-size:12.0pt;letter-spacing:.1pt;line-height:150%;">).</span></p><p > <span ><strong>2. 상품 및 서비스 제공의 조건 또는 제한</strong></span></p><p > <span>- 공정성과 최종 소비자로서의 고객의 이익을 보장하기 위해 Galaxy Holdings는 프로모션 프로그램을 시행하는 데 제한 조건을 적용할 권리가 있습니다. 제한 없음, 고객이 구매할 수 있는 각 프로모션 프로그램의 최대 제품 수 제한, 제품 패키지 구매 목적 제한(소비 전용, 사업용 아님, 재판매 등) 또는 각 프로모션 프로그램에 자세히 명시된 기타 제한(있는 경우). 이러한 제한 사항은 이하 프로모션 정책이라 합니다.</span> 
</p><p > <span>따라서 Galaxy Holdings는 프로모션 정책의 내용을 위반하는 배송된 상품을 확인, 거부, 취소 또는 회수하지 않을 권리가 있습니다.</span></p><p > <span>- Galaxy Holdings는 개인 또는 단체가 다음 내용 중 하나를 충족하지 않는 경우 상품 제공을 거부할 권리가 있습니다.규정에 맞지 않는 가입자 정보 등록 서류를 제시하거나 제시된 가입자 정보 등록 서류가 불분명하거나 서류의 디지털화가 명확하고 명확하며 완전한 정보를 가지고 있는지 확인하지 않거나 신분 증명서에 인증 후 일치하지 않는 정보가 있거나 인증할 수 없는 경우</span></p><p > <span ><strong>3. 결제 정책</strong></span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:27.0pt;text-align:justify;"> <i><span style="font-size:12.0pt;line-height:150%;"><strong>3.1.&nbsp;&nbsp; 주문 단계</strong></span></i></p><p > <span >- 고객이 애플리케이션에서 주문을 하면, 당사는 주문 요청을 수신하고 고객에게 주문 번호를 보냅니다.</span></p><p > <span >- 주문 요청이 신속하게 확인되려면, 고객은 배송과 관련된 정확하고 완전한 정보 또는 고객이 참여하는 프로모션 프로그램의 약관(있는 경우)을 제공해야 합니다.</span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:27.0pt;text-align:justify;"> <i><span style="font-size:12.0pt;line-height:150%;"><strong>3.2.&nbsp;&nbsp; 제품 검사 정책</strong></span></i></p><p > <span >- 제품은 애플리케이션의 상세 설명과 일치하도록 최선을 다하고 있습니다.&nbsp;</span> 
</p> 
<p > <span >- eSIM의 경우: 제품 구매 및 결제가 완료되면 Galaxy Holdings에서 구매한 eSIM 정보에 대한 이메일을 발송합니다. 정보를 수신한 고객은 eSIM 정보를 확인해야 합니다. eSIM 제품은 직접 배송되지 않으므로 제품 검사 정책이 없습니다.</span></p><p > <span >- 실물 SIM의 경우: 결제 및 제품 수령 후 고객은 주문 내역과 수량, 씰, 모델 정보 및 유효기간을 비교해야 합니다.&nbsp;</span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:9.0pt;text-align:justify;"> <span ><strong>4. 제품 교환 및 반품 정책</strong></span></p><p > <span style="font-size:12.0pt;line-height:150%;">애플리케이션의 제품 교환 및 반품 정책은 반품 사유, 반품 요건 및 고객의 반품 처리 기간을 규정합니다.</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.1. 반품 수락 사유</strong></span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">- 제품이 개봉되어 주문과 비교하여 잘못된 수량, 정보 및 모델로 배송되었습니다.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;제조업체 오류(기술적 결함, 설계 오류, 내용 오류) 또는 운송 중 오류(변형, 긁힘, 균열 등)로 인해 제품이 손상된 경우.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;제품이 고객에게 배송된 날짜 또는 그 이전에 만료된 경우.</span></p><p > 
<i><span style="font-size:12.0pt;line-height:150%;"><strong>4.2. 반품 상품에 대한 요구 사항</strong></span></i> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.1. 반품 조건:</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 제품이 손상되지 않았고, 라벨이 모두 붙어 있으며, 원래 사양에 부합합니다(운송 중 제품에 결함이 있거나 손상된 경우는 제외).</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 제품이 유통기한 내에 있습니다.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 제품이 더럽지 않고 사용된 흔적이 없습니다.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 고객이 은행의 애플리케이션(주문 번호, 전자 구매 송장, 배송 영수증, 명세서)에서 구매 확인을 여전히 가지고 있습니다.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.2. 반품 가능 기간:</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 애플리케이션의 제품 소개에 달리 명시되지 않는 한, 고객은 수령일로부터 2일 이내에 반품을 요청해야 합니다.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.3. 반품 장소:</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 고객은 제품과 함께 서류, 애플리케이션에서 구매를 확인하는 서류(주문 코드, 전자 구매 송장 , 배송 영수증 등)를 Galaxy Holdings의 거래 매장으로 가져오거나 두 당사자의 합의에 따라 다음 주소로 우편으로 보냅니다. Galaxy Holdings의 통신 서비스 지점.</span> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.4. 반품 요청 시간은 다음에 따라 계산됩니다.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 고객이 우편 또는 배달로 보내는 경우: 시간은 우체국 또는 배달 단위의 영수증 스탬프에 따라 계산됩니다.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 고객이 직접 반품 센터로 상품을 가져오거나 보내는 경우: 시간은 Galaxy Holdings 직원이 고객으로부터 반품 상품을 수령하는 시점에 계산됩니다.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.5. 반품 비용</span></p><p> <span style="font-size:12.0pt;line-height:150%;">- Galaxy Holdings 또는 공급업체(NCC) 오류로 인해 반품된 제품의 경우, 고객은 제품 반품에서 면제됩니다. 고객은 제품 반품 시 발생하는 배송비 또는 제3자에게 지불해야 하는 기타 비용을 부담해야 합니다.</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.3. 환불 정책&nbsp;</strong></span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">4.3.1. 환불 원칙</span></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;환불은 고객이 Galaxy Holdings에 대금을 지불한 후 문제가 발생한 경우 이루어집니다.재고가 없거나 고객이 상품을 받았지만 제 4.2조의 규정에 따라 교환 또는 반품을 요청한 경우입니다.</span> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">- 1,000 VND 미만의 환불 요청에는 적용되지 않습니다.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;환불 처리 시간은 영업일(규정에 따라 토요일, 일요일, 공휴일 및 설날 공휴일 제외)로 계산됩니다.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;고객이 기프트 코드를 사용했을 때 환불: Galaxy Holdings가 고객이 기프트 코드를 사용했을 때 환불을 허용하는 특별한 경우, Galaxy Holdings는 고객이 사용한 기프트 코드의 가치를 환불하지 않고 고객이 구매 시 실제로 지출한 금액만 환불합니다.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">4.3.2. 환불 방법</span></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;은행 송금을 통한 환불: 고객은 Galaxy Holdings 고객 서비스 센터에 연락하여 정보를 제공하고 지침을 따릅니다.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">4.3.3. 처리 시간</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- Galaxy Holdings는 Galaxy Holdings가 반품 제품을 수령한 날로부터 최대 7영업일 이내에 이메일 또는/및 SMS를 통해 고객에게 반품 요청 응답을 보냅니다.</span></p><p > <span >참고:</span><span style="font-size:12.0pt;line-height:150%;">Galaxy Holdings는 Galaxy Holdings 반품 센터로 운송하는 동안 제품이 손상된 경우 책임을 지지 않습니다.</span> 
</p> 
<p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.4. 수정</strong></span></i></p><p > <span >- 제품을 구매한 후에는 제품 정보 및 데이터 패키지를 특정 요구 사항에 따라 변경하거나 사용자 지정할 수 없습니다. 있는 그대로 제공됩니다.</span></p><p > <span >- 더 자세한 내용은 skyfi.vn 고객 서비스 센터에 문의하시거나 1900 6605번으로 전화해 주세요. 감사합니다!</span></p><p > <span ><strong>5. 보증 정책</strong></span></p><p > <span >보증 정책&nbsp;</span><span style="font-family:&quot;Segoe UI Symbol&quot;,sans-serif;font-size:12.0pt;line-height:150%;" lang="EN-GB"> 🗹 </span><span > 네&nbsp;</span><span style="font-family:&quot;Segoe UI Symbol&quot;,sans-serif;font-size:12.0pt;line-height:150%;" lang="EN-GB"> </span><span > 아니요</span> 
</p><p > <span ><strong>6. GALAXY HOLDINGS 및 고객의 의무</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>6.1. Galaxy Holdings의 의무</strong></span></i></p><p > <span >- Galaxy Holdings가 웹사이트에 공표하고 명시한 서비스 품질에 따라 고객에게 제공되는 서비스 품질을 보장합니다.</span><a href="https://Skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" lang="EN-GB">https://Skyfi.vn</span></a><span >, SkyFi 애플리케이션 및 Galaxy Holdings의 통신 서비스 지점에서 지상파 이동통신 서비스 제공 및 이용 계약(선불 결제), 가입자 정보 확인, 일반 거래 조건에 따라 고객에게 제공되며, 서비스 가격이 정확하고 완전하며 정확하게 계산되도록 보장합니다.</span></p> <p 
> 
<span >- 서비스 만료일 최소 7일 전에 합의된 방식으로 서비스 사용을 계속하기 위한 요금 지불에 대해 고객에게 알립니다.</span></p><p > <span >- 서비스 제공 종료 시점에 대해 합의된 방식으로 서비스 제공 종료일 최소 7일 전에 고객에게 알립니다.</span></p><p > <span >- 고객 정보는 기밀로 유지하고, 제3자에게만 사용하고 양도합니다. 고객의 동의가 있는 경우, 단, 양 당사자 간 합의 또는 국가기관의 요구가 있거나 법률에 달리 정한 경우는 제외합니다.</span></p><p > <span>- 서비스 제공이 일시적으로 중단된 경우(해지 및 재사용된 가입자 번호는 제외) 고객이 의무를 이행한 후 정해진 기간 내에 고객의 서비스 이용을 복구합니다.</span></p><p > <span>- 고객이 서비스 품질에 대한 문제를 보고한 경우 신속하게 확인하고 해결합니다.</span></p><p > <span>- 법률에 정한 기간 내에 고객의 불만을 해결합니다.</span></p><p > <span>- 통신서비스 사업을 중단한 경우 통신서비스 사업을 공식적으로 중단하기 최소 30일 전에 고객에게 통지합니다. 갤럭시홀딩스는 다음 각 호의 어느 하나에 해당하는 경우에만 전기통신 서비스 제공을 일부 또는 전부 중단합니다. (a) 지상파 이동통신 서비스 제공 및 이용 계약(선불결제 양식), 가입자 정보 확인, 이미 체결한 전기통신 서비스 제공 및 이용 일반 거래 조건 및 관련 당사자에 따른 전기통신 서비스 이용자의 합법적 권익을 보장할 계획이 있는 경우, (b) 전기통신 서비스 중단 사실을 관할 국가기관에 통지한 경우</span> 
</p><p> <span>- 갤럭시홀딩스는 법률에 따라 협력사가 고객 정보를 비밀로 유지하도록 할 책임이 있습니다. 본 조항은 고객이 Galaxy Holdings가 합의된 목적을 위해 Galaxy Holdings의 파트너에게 고객 정보를 제공하는 데 동의하는 경우에 적용됩니다.&nbsp;</span></p><p > <span >- 유능한 국가 기관의 관리를 받고 전기통신 인프라의 안전 및 정보 보안을 보장하는 규정을 준수합니다.</span></p><p > <span >- 전기통신 가입자가 법률에서 규정하는 동일한 유형의 전기통신 서비스 내에서 전기통신 서비스 제공자를 변경할 때 전기통신 가입자 번호를 유지하도록 합니다.</span></p><p > <span >- 지상 이동통신 서비스 제공 및 이용 계약(선불 결제 양식), 가입자 정보 확인, 법률에서 규정하는 일반 거래 조건과 일치하는 완전한 전기통신 가입자 정보를 사용하여 전기통신 서비스 이용자에게 서비스를 제공합니다.</span></p><p > <span >- 전기통신 가입자 정보를 인증, 저장, 사용하고 불완전하거나 부정확한 전기통신 가입자 정보가 있는 SIM 카드를 처리합니다.</span></p><p > <span >- 방지, 퇴치 및 차단 정부 규정에 따른 불법 메시지 및 통화;</span></p><p> <span>- 통신법을 위반하는 통신 가입자에게 통신 서비스 제공을 중단합니다.</span></p><p> <span>- Galaxy Holdings는 지상파 이동통신 서비스 제공 및 이용 계약(선불 결제 양식), 가입자 정보 확인, Galaxy Holdings의 일반 거래 약관(지상파 이동통신 서비스 제공 및 이용 계약(선불 결제 양식), 가입자 정보 확인, 일반 거래 약관이 관할 국가 기관의 승인을 받고, 신청 최소 5일 전에 게시되고, 카운터 또는 웹사이트 https://Skyfi.vn, Galaxy Holdings의 SkyFi 애플리케이션에 게시되고, 양 당사자가 지상파 이동통신 서비스 제공 및 이용 계약(선불 결제 양식), 가입자 정보 확인, 일반 거래 약관에 서명하기 전에 고객에게 제공되는 모든 내용을 준수할 것을 약속합니다. 고객은 이러한 수정 및 추가 내용에 동의하지 않을 경우 서비스 이용을 해지할 권리가 있습니다. 고객이 서비스를 계속 이용하는 경우, 이는 고객이 동의한 것으로 간주되며, 본 개정 및 추가 약관은 지상파 이동통신 서비스 제공 및 이용 계약(선불 결제 양식), 가입자 정보 확인, 일반 거래 조건 등이 관할 국가기관의 승인을 받은 시점부터 적용됩니다. 지상파 이동통신 서비스 제공 및 이용 계약(선불 결제 양식), 가입자 정보 확인, 일반 거래 조건 등의 규정은 소비자권익보호법 제3조 제1항에 따른 소비자인 서비스 이용자에게 적용됩니다.</span> 
</p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>6.2. 고객의 의무</strong></span></i></p><p > <span >- 통신 서비스 대금을 전액 및 정시에 지불합니다.</span></p><p > <span >- Galaxy Holdings 및 통신 서비스 대리점에 대한 자신의 귀책사유로 인해 발생한 직접적인 손해를 배상합니다.</span></p><p > <span >- Galaxy Holdings와 지상파 이동통신 서비스 제공 및 이용 계약(선불 결제 형태), 일반 거래 약관을 체결한 통신 가입자 번호 사용에 대해 법적 책임을 집니다.</span></p><p > <span >- 통신망에 전송하고 저장하는 정보의 내용에 대해 법적 책임을 집니다.</span></p> < 
p > 
<span >- Galaxy Holdings의 통신 인프라를 이용하여 통신 서비스 사업을 수행하지 않습니다.&nbsp;</span></p><p > <span >- 통신망을 이용하여 Galaxy Holdings의 명예, 명예 또는 존엄성을 위협, 괴롭히거나, 왜곡, 중상 또는 모욕하지 않습니다. 다른 개인/단체의 제품;&nbsp;</span></p><p > <span >- 지상파 이동통신 서비스 제공 및 이용 계약(선불 결제 양식), 국가 규정에 따른 가입자 정보 확인에 정확한 정보를 제공하십시오.&nbsp;</span></p><p > <span >- 서류에 변경이 있거나 가입자 정보가 부정확하다는 사실을 발견한 경우 또는 Galaxy Holdings로부터 규정에 맞지 않는 정보에 대한 통지를 받은 경우 규정에 따라 가입자 정보를 업데이트할 책임이 있습니다.&nbsp;</span></p><p > <span >- 법률에 의해 허용되는 경우를 제외하고 지상파 이동통신 서비스 제공 및 이용 계약(선불 결제 양식), 가입자 정보 확인, 타인을 위한 지상파 이동통신 서비스 제공 및 이용에 대한 일반 약관을 체결하기 위해 신분증 정보를 사용하지 마십시오.&nbsp;</span></p><p > <span >- 비밀번호, 패스코드 및 단말기를 보호하십시오.</span></p><p > <span >- 다음과 같은 경우 SIM 분실 시, 고객은 즉시 갤럭시 홀딩스 거래 지점을 방문하거나 SkyFi 앱(앱)을 이용하여 새 SIM 재발급 절차를 완료하거나 갤럭시 홀딩스에 아웃바운드 서비스 일시 중단을 요청해야 합니다. 고객이 위 규정을 준수하지 않을 경우, 갤럭시 홀딩스에 공식적으로 통지하기 전까지 발생한 수수료를 납부해야 하며, 갤럭시 홀딩스는 위 발생한 수수료를 환불할 의무가 없습니다. 긴급 상황 발생 시, 고객은 19006605로 전화하여 발신 전화를 일시적으로 차단할 수 있습니다.</span></p><p > 
<span>- 고객은 지상파 이동통신 서비스 제공 및 이용 계약(선불 결제 방식), 가입자 정보 확인, 갤럭시 홀딩스의 일반 거래 약관(매번 수정 및 추가되는 내용 포함)을 준수할 것을 약속합니다. 지상파 이동통신 서비스 제공 및 이용 계약(선불 결제 방식), 가입자 정보 확인, 일반 거래 약관은 관할 국가 기관의 승인을 받고, 신청 최소 5일 전에 게시되며, 카운터 또는 갤럭시 홀딩스의 웹사이트 https://Skyfi.vn, SkyFi 애플리케이션에 게시되고, 양 당사자가 지상파 이동통신 서비스 제공 및 이용 계약(선불 결제 방식), 가입자 정보 확인, 갤럭시 홀딩스의 일반 거래 약관에 서명하기 전에 고객에게 제공됩니다. 고객은 이러한 수정 및 추가 내용에 동의하지 않을 경우 서비스 사용을 해지할 권리가 있습니다. 고객이 서비스를 계속 이용하는 경우, 이는 고객이 동의한 것으로 간주되며, 이러한 변경 및 보완 사항은 지상파 이동통신 서비스 제공 및 이용 계약(선불 결제 양식), 가입자 정보 확인 및 일반 거래 조건이 관할 국가 기관에서 승인되는 시점부터 적용됩니다. 지상파 이동통신 서비스 제공 및 이용 계약(선불 결제 양식), 가입자 정보 확인 및 일반 거래 조건의 조항은 소비자권익보호법 제3조 제1항에 따른 소비자인 서비스 이용자에게 적용됩니다.</span> 
</p><p > <span ><strong>7. 서비스 품질 기준</strong></span></p><p > <span>갤럭시 홀딩스는 과학기술부에 고시되고 웹사이트 https:\\\\skyfi.vn 및 SkyFi 애플리케이션에 게시된 서비스 품질 기준에 따라 서비스를 제공합니다.</span></p><p > <span ><strong>8. 가격 및 결제</strong></span></p><p > <i><span >-&nbsp;</span></i><span >제품 가격에는 부가가치세가 포함될 수도 있고 포함되지 않을 수도 있으며, 이는 제품 소개 페이지에 구체적으로 명시되어 있습니다. 모든 경우, 제품 가격에는 배송비가 포함되지 않습니다.&nbsp;</span></p><p > <i><span >-&nbsp;</span></i><span >고객은 주문 상품을 수령하기 전에 주문 금액을 결제해야 합니다. 고객이 "결제" 버튼을 클릭하여 주문 결제를 진행하는 것은 (i) 고객이 주문 정보를 검토했음을 확인하는 것을 의미합니다. (ii) 고객은 해당 주문의 제품 구매에 이용 약관이 적용되는 데 동의합니다.</span> 
</p><p > <i><span >-&nbsp;</span></i><span >Galaxy Holdings는 재량에 따라 특정 경우에 고객의 신용카드 결제를 거부할 권리가 있습니다.</span></p><p > <i><span >- 결제 보안을 위해 고객은 다음 사항에 유의해야 합니다.</span></i></p><p > <span >+&nbsp;애플리케이션의 링크 창에서만 온라인 결제를 하십시오.</span></p><p > <span >+ 카드(신용카드, ATM 카드, 구매 카드...)와 계좌 정보/카드 정보를 주의해서 사용하고 보관하십시오.</span></p><p > <span >+ 애플리케이션에서 구매하기 위해 카드를 빌려주거나 다른 사람에게 사용하도록 하지 마십시오. 애플리케이션에서 비정상적인 거래가 감지되면 고객은 즉시 고객센터(&nbsp;<strong>19006605</strong>&nbsp;)(이하 "고객센터") 또는 카드 발급 은행 콜센터에 연락하여 적절한 처리를 받아야 합니다.</span></p><p > <span >+ 어떠한 경우에도 국제 신용카드/직불카드의 경우, 고객은 카드 정보를 보호하기 위해 CVV/CVC/CSC 번호(보안 코드, 카드 뒷면에 인쇄된 세 자리 숫자)를 공개하지 않도록 요청받습니다.</span></p><p style="line-height:150%;margin-bottom:.0001pt;text-align:justify;"> <span style="font-size:12.0pt;line-height:150%;">&nbsp;</span><span ><strong>9. 제품 운송 및 배송</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.1. 배송 범위 </strong></span></i> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">- Galaxy Holdings는 전국의 고객이 요청한 지역으로 배송합니다(*).</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;">(*) 사무실, 출입 제한 규정이 있는 고층 아파트 등 제한된 경우를 제외하고 주문은 고객의 자택으로 배송됩니다. 이러한 제한된 경우 고객이 자택 배송을 원하시면 고객 서비스 센터에 문의하십시오.</span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp; 본 조에 규정된 대로 주문 또는 전화로 제품을 수령하도록 고객이 지정한 사람을 통칭하여 "수령인"이라고 합니다.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- Galaxy Holdings의 요청이 있는 경우, 수령인은 상품을 수령하기 전에 배송 직원에게 확인을 위해 신분증 등 신분 증명서를 제시해야 합니다.</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.2. 배송 시간</strong></span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">배송 시간:<strong>Galaxy Holdings 배송 파트너 규정에 따름</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.3. 배송비</strong></span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">- 배송비는 배송 지역 및 배송 시간에 따라 주문 건별로 별도 안내됩니다.</span></p> 
<p > 
<i><span >-&nbsp;</span></i><span >수취인은 배송 단위의 정책에 따라 제품을 수령하는 즉시 제품을 확인하고 배송 영수증에 서명해야 합니다. 제품의 위험 및 소유권은 수취인이 배송 영수증에 서명하는 시점부터 고객에게 이전됩니다. 고객은 제품 관련 문제(있는 경우) 해결 또는 조정을 위해 배송 영수증을 보관해야 합니다. 반품 정책에 명시된 제품 반품 기간 이후에는 제품 관련 문제(있는 경우)가 해결되지 않습니다.</span></p><p > <span ><strong>10. 고객 관리 및 불만 처리</strong></span></p><p > <span >- 상품/서비스 품질, 제품 배송, 배송 직원의 태도, 제품 교환/반품 등을 포함하되 이에 국한되지 않는 문의나 불만 사항이 있는 경우, 고객은 고객 서비스 센터<strong>19006605</strong> 또는 이메일 주소</span><a href="mailto:customercare@skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;"로 문의하실 수 있습니다. lang="EN-GB">customercare@skyfi.vn</span></a></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;</span><span>고객 서비스 센터에 문의하실 경우, Galaxy Holdings에서 발송한 이메일 또는 주문 확인 메시지에 명시된 주문 번호를 알려주셔야 합니다. 고객 서비스 센터는 최대한 빨리 고객의 문의를 접수하고 답변해 드리겠습니다.</span></p><p > <span ><strong>11. 정보 보안</strong></span></p><p > <span >- 당사 애플리케이션은 정보 보안을 중시하며 고객 정보와 결제 정보를 보호하기 위해 최선의 조치를 취하고 있습니다. 결제 과정에서 발생하는 고객 정보는 보안을 위해 암호화됩니다. 주문 절차를 완료한 후에는 안전 모드를 종료해야 합니다.</span></p><p > <span >- 고객은 어떠한 프로그램, 도구 또는 기타 양식을 사용하여 시스템을 방해하거나 데이터 구조를 변경할 수 없습니다. 또한 본 애플리케이션은 시스템 데이터를 방해, 파괴 또는 침투하는 것을 목표로 하는 모든 활동의 배포, 전파 또는 장려를 엄격히 금지합니다. 위반하는 개인이나 단체는 모든 권리를 박탈당하고 필요한 경우 법적 조치를 받게 됩니다.</span> 
</p><p > <span >- 모든 거래 정보는 비밀로 유지되지만, 법 집행 기관의 요청이 있을 경우 법 집행 기관에 이 정보를 제공해야 합니다.</span></p><p > <span >- 온라인 결제 시 다음 사항에 유의하세요.</span></p><p > <span >+ 안전한 결제 인증서가 있는 애플리케이션만 사용하세요.</span></p><p > <span >+ 애플리케이션에서 결제하기 위해 신용카드나 계좌를 타인에게 절대 빌려주지 마세요.</span></p><p > <span >+ 예상치 못한 거래가 발생한 경우, 적시에 지원을 받을 수 있도록 고객센터에 알려주세요.</span></p><p > <span >+ 카드를 통한 모든 거래가 제대로 처리되고 있는지 정기적으로 은행 계좌를 확인하세요.</span></p><p > <span ><strong>12. 책임의 한계</strong></span></p><p > <span>- 어떠한 경우에도 Galaxy Holdings는 위험이 Galaxy Holdings에서 고객에게 이전된 이후 고객이 부담해야 하는 손상/손실/손실/손상에 대해 책임을 지지 않습니다.</span></p><p > <span>- 고객이 애플리케이션을 통해 제품을 구매할 때 Galaxy Holdings가 제공하는 선물의 경우: Galaxy Holdings 직원/유통 채널 및 도매 고객은 과학기술부 규정에 따라 최종 사용자의 구독자 정보를 등록해야 합니다.</span> 
</p><p > <span ><strong>13. 일반 약관</strong></span></p><p > <span>- 본 일반 약관에 언급된 조항은 이용 약관의 불가분의 일부입니다.</span></p><p > <span>- Galaxy Holdings와 고객은 본 이용 약관에 명시된 모든 의무를 이행할 책임이 있습니다.</span></p><p > <span>- 본 이용 약관의 내용이 유능한 기관에 의해 전체 또는 일부가 무효 또는 집행 불가능하다고 간주되는 경우, 본 이용 약관의 다른 내용의 유효성에는 영향을 미치지 않습니다.</span></p><p > <span>- 본 이용 약관 및 Galaxy Holdings와 고객 간의 계약 관계에서 발생하는 모든 문제는 베트남 법률의 조항에 따라 해석되고 적용됩니다. 본 이용 약관의 내용으로 인해 발생하거나 관련된 모든 분쟁, 의견 차이 또는 불만은 삼십(30)일 이내에 선의의 협상을 통해 해결해야 합니다. 이 30일(30) 기간 내에 해결되지 않을 경우, 위 분쟁 또는 불만 사항은 유능한 법원에서 해결될 수 있습니다.</span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;text-align:center;" align="center"> <span ><strong>---------------***---------------</strong></span></p></div>`,
    },
    ru: {
        title: 'ОБЩИЕ УСЛОВИЯ ТОРГОВЛИ', content: `<div class="sub-container"><p > <span >Приветствуем клиентов в официальном приложении для онлайн-продаж, созданном и принадлежащем GALAXY DIGITAL HOLDINGS COMPANY LIMITED (далее именуемой «<strong>Galaxy Holdings</strong>» или «<strong>мы</strong>»).</span></p><p > <span ><strong>О нас:</strong></span></p><p > <span >- <strong>Поставщик телекоммуникационных услуг:</strong>GALAXY DIGITAL HOLDINGS COMPANY LIMITED</span></p><p > <span >- <strong>Номер лицензии на предоставление телекоммуникационных услуг</strong>: </span><span style="font-size:12.0pt;line-height:150%;">41/GP-CVT do Выдано Министерством информации и коммуникаций 6 февраля 2025 г.</span></p><p > <span >- <strong>Свидетельство о регистрации предприятия:&nbsp;</strong></span><span style="font-size:12.0pt;line-height:150%;">0316951481 выдано Департаментом планирования и инвестиций города Хошимин 13 августа 2021 г.</span></p><p > <span >- <strong>Адрес:&nbsp;</strong></span><span style="font-size:12.0pt;line-height:150%;">Здание PV Gas, 673 Nguyen Huu Tho, Phuoc Kien, Nha Be, City. HCM, Вьетнам</span></p><p > <span >- <strong>Телефон:</strong></span><span style="font-size:12.0pt;line-height:150%;">028 7300 6555</span></p><p > <span >- <strong>Электронная почта:</strong></span><a href="mailto:customercare@skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" lang="EN-GB">customercare@skyfi.vn</span></a> 
</p> 
<p > <span >- <strong>Номер телефона отражает качество обслуживания:</strong>&nbsp;19006605</span></p><p > <span >Когда Клиенты получают доступ к нашему Приложению, это означает, что Клиенты соглашаются с настоящими Условиями и положениями и&nbsp;</span><a href="https://www.vietnamobile.com.vn/product/chinh-sach/thong-bao-xu-ly-du-lieu-ca-nhan/"><span style="color:windowtext;font-size:12.0pt;line-height:150%;text-decoration:none;text-underline:none;" lang="EN-GB">Политикой защиты персональных данных</span></a><span >. Мы оставляем за собой право изменять, модифицировать, добавлять или удалять любую часть настоящих Условий в любое время. Изменения вступают в силу немедленно после публикации в Приложении без предварительного уведомления. Если Клиент продолжает использовать Приложение после публикации изменений в Условиях, это означает, что Клиент принял эти изменения. Пожалуйста, регулярно проверяйте актуальность наших изменений.</span></p><p > <span ><strong>1. ОБЛАСТЬ ПРИМЕНЕНИЯ</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>1.1. Условия и положения применяются к Клиентам, которые:</strong></span></i></p><p > <span >- Покупают продукты и пользуются услугами («<strong>Продукты</strong>») Galaxy Holdings.&nbsp;&nbsp;&nbsp;</span></p><p > <span >- Имеют потребность в доставке Продуктов в места назначения в соответствии с Политикой доставки, которая время от времени публикуется в Приложении.</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>1.2. При покупке Продукции в Приложении Клиентам необходимо предоставить следующие документы для заключения договора в соответствии с формой и общими условиями сделки:</strong></span></i></p> 
<p > 
<span >- Для физических лиц: оригинал паспорта, удостоверения личности гражданина, удостоверения личности, электронной идентификационной карты или электронного идентификационного счета с действительным сроком действия для граждан Вьетнама или паспорт с действительным сроком обращения на территории Вьетнама для иностранных граждан (далее именуемые документами, удостоверяющими личность);</span></p><p > <span >- Для организаций: оригинал или заверенная копия оригинала решения о создании или свидетельства о регистрации бизнеса и налогового учета или инвестиционной лицензии или свидетельства о регистрации предприятия (далее именуемого свидетельством о юридическом лице), документы, удостоверяющие личность законного представителя организации. При оказании услуг мобильной связи организация обязана предоставить список физических лиц, входящих в организацию (с юридическим подтверждением организации), которым разрешено пользоваться услугами связи в соответствии с типовым договором и общими условиями сделки, заключенными организацией с предприятием связи (в случае, если организация осуществляет доставку услуг пользователю), а также оригиналы документов, удостоверяющих личность каждого физического лица. В случае, если Заказчик, заключающий договор в соответствии с типовой формой и общими условиями сделки, не является законным представителем организации, он/она должен/должна предоставить законный документ о полномочиях законного представителя и документы, удостоверяющие его/ее личность;</span></p><p > <span >- Для Заказчиков, не достигших 14 лет или лиц, находящихся под опекой в соответствии с Гражданским кодексом, заключение договора в соответствии с типовой формой и общими условиями сделки должно быть осуществлено отцом, матерью или опекуном.</span></p><p > <span >(Применяется в соответствии с Постановлением Правительства № 163/2024/ND-CP от 24 декабря 2024 г.</span><span style="font-size:12.0pt;letter-spacing:.1pt;line-height:150%;">).</span></p><p > <span ><strong>2. УСЛОВИЯ ИЛИ ОГРАНИЧЕНИЯ ПРИ ПРЕДОСТАВЛЕНИИ ТОВАРОВ И УСЛУГ</strong></span></p><p > <span >- В целях обеспечения справедливости и интересов Клиентов как конечных потребителей Galaxy Holdings имеет право применять ограничительные условия при реализации рекламных программ: отсутствие ограничений, ограничение на максимальное количество товаров в каждой рекламной программе, которые может купить Клиент, ограничение на цель приобретения пакетов товаров (только для потребления, не для бизнеса, перепродажи...) или другие ограничения (если таковые имеются), подробно указанные в каждой Рекламной программе. Данные ограничения далее именуются «Политикой продвижения».</span> 
</p><p > <span >Следовательно, Galaxy Holdings имеет право не подтверждать, не отклонять, не отменять или не отзывать поставленные продукты, которые нарушают любое содержание Политики продвижения.</span></p><p > <span >- Galaxy Holdings имеет право отказать в предоставлении Продуктов в случаях, если лица или организации не соответствуют одному из следующих условий: предоставление документов для регистрации информации абонента, которые не соответствуют нормативным актам или представление документов для регистрации информации абонента неясны, не гарантируют, что оцифровка документов является четкой, ясной и содержит полную информацию или документы, удостоверяющие личность, содержат информацию, которая не совпадает после аутентификации или не может быть аутентифицирована.</span></p><p > <span ><strong>3. ПРАВИЛА ОФОРМЛЕНИЯ ЗАКАЗА</strong></span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:27.0pt;text-align:justify;"> <i><span style="font-size:12.0pt;line-height:150%;"><strong>3.1.&nbsp;&nbsp; Этапы оформления заказа</strong></span></i></p><p > <span >- Когда Клиент размещает заказ в Приложении, мы получаем запрос на заказ и отправляем Клиенту номер заказа.</span></p><p > <span >- Для быстрого подтверждения запроса на заказ Клиент должен предоставить правильную и полную информацию, касающуюся доставки, или условия программы продвижения (если таковая имеется), в которой участвует Клиент.</span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:27.0pt;text-align:justify;"> <i><span style="font-size:12.0pt;line-height:150%;"><strong>3.2.&nbsp;&nbsp; Политика проверки продукта</strong></span></i></p><p > <span >- Продукты должны соответствовать подробному описанию в Приложении.&nbsp;</span> 
</p> 
<p > <span >- Для eSIM: после покупки Продукта и успешной оплаты Клиент получит уведомление от Galaxy Holdings по электронной почте с информацией о приобретенной eSIM. Получив информацию, Клиент должен проверить информацию об eSIM. Продукты eSIM не доставляются напрямую, поэтому политики проверки продукта нет.</span></p><p > <span >- Для физической SIM-карты: после оплаты и получения Продукта Клиент должен проверить количество, печать, информацию о модели и сроке действия по сравнению с заказом.&nbsp;</span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:9.0pt;text-align:justify;"> <span ><strong>4. ПОЛИТИКА ОБМЕНА И ВОЗВРАТА ТОВАРОВ</strong></span></p><p > <span style="font-size:12.0pt;line-height:150%;">В Политике обмена и возврата товаров Приложения указаны приемлемые причины, требования к возвращаемым товарам и сроки обработки возвратов для Клиентов.</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.1. Причины принятия возвратов</strong></span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">- Товар не запечатан, доставлен с неправильным количеством, информацией и моделью по сравнению с заказом.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- Товар поврежден из-за ошибки производителя (техническая неисправность, ошибка дизайна, ошибка содержимого) или ошибки при транспортировке (деформирован, поцарапан, треснул и т. д.).</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- Срок годности товара истекает до или в дату доставки товара Покупателю.</span></p><p > 
<i><span style="font-size:12.0pt;line-height:150%;"><strong>4.2. Требования к возвращаемой продукции</strong></span></i> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.1. Условия возврата:</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- Товар не поврежден, имеет полные этикетки и соответствует первоначальным спецификациям (за исключением случаев дефектных или поврежденных во время транспортировки товаров).</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- Срок годности товара не истек.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- Товар не загрязнен и не имеет следов использования.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- У Клиента в Приложении осталось подтверждение покупки (номер заказа, электронный счет-фактура покупки, квитанция о доставке, выписка) банк…).</span></p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.2. Применимые сроки возврата:</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- Если иное не указано во введении к Продукту в Приложении, у Клиента есть 02 дня с даты получения, чтобы подать запрос на возврат.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.3. Место возврата:</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- Клиенты приносят Товар вместе с документами, документами, подтверждающими покупку в Приложении (код заказа, электронный счет-фактура покупки , квитанция о доставке и т. д.) в магазин транзакций Galaxy Holdings или отправляют его по почте на следующий адрес: пункт обслуживания телекоммуникаций Galaxy Holdings в соответствии с соглашением двух Сторон.</span> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.4. Время запроса на возврат товара будет рассчитываться на основе:</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- Если Клиент отправляет товар почтой или доставкой: время рассчитывается по штемпелю квитанции почтового отделения или пункта доставки.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- Если Клиент сам приносит/отправляет товар в центр возврата: время рассчитывается с момента получения сотрудниками Galaxy Holdings возвращенного товара от Клиента.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.5. Расходы на возврат</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- В случае возврата Продукции из-за ошибок Galaxy Holdings или поставщика (NCC) Клиенты будут освобождены от необходимости возвращать Продукцию. Клиент несет расходы по доставке возвращаемого Товара или иные расходы, подлежащие уплате третьей стороне.</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.3. Политика возврата средств&nbsp;</strong></span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">4.3.1. Принципы возврата</span></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;Возврат средств осуществляется, когда Клиент заплатил Galaxy Holdings, но затем возникают проблемы: товара нет в наличии или Клиент получил товар, но просит обменять или вернуть Продукт в соответствии с положениями Статьи 4.2.</span> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">- Не применяется к запросам на возврат средств менее 1000 донгов.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;Срок обработки возврата рассчитывается в рабочих днях (исключая субботы, воскресенья, праздничные дни и праздничные дни в соответствии с предписаниями).</span></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;Возврат средств при использовании подарочных кодов клиентами: в особых случаях, когда Galaxy Holdings принимает возвраты при использовании подарочных кодов клиентами, Galaxy Holdings не возмещает стоимость использованного клиентом подарочного кода, а возмещает только фактическую сумму, потраченную клиентом при совершении покупки.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">4.3.2. Способ возврата</span></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;Возврат банковским переводом: клиенты обращаются в центр обслуживания клиентов Galaxy Holdings, предоставляют информацию и следуют инструкциям.</span></p><p > <span style="font-size:12.0pt;line-height:150%;">4.3.3. Время обработки</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- Galaxy Holdings отправит ответ на запрос возврата Клиенту по электронной почте и/или SMS в течение максимум 07 рабочих дней с даты получения Galaxy Holdings возвращенного Продукта.</span></p><p > <span >Примечание:</span><span style="font-size:12.0pt;line-height:150%;">Galaxy Holdings не несет ответственности в случаях, если Продукт был поврежден во время транспортировки в центр возврата Galaxy Holdings.</span> 
</p> 
<p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.4. Изменение</strong></span></i></p><p > <span >- После покупки Продукта информация о Продукте и пакеты данных не могут быть изменены или настроены на основе конкретных требований; они предоставляются «как есть».</span></p><p > <span >- Для получения более подробной информации обратитесь в службу поддержки клиентов skyfi.vn или по телефону: 1900 6605. Спасибо!</span></p><p > <span ><strong>5. ГАРАНТИЙНАЯ ПОЛИТИКА</strong></span></p><p > <span >Гарантийная политика</span><span style="font-family:&quot;Segoe UI Symbol&quot;,sans-serif;font-size:12.0pt;line-height:150%;" lang="EN-GB"> 🗹 </span><span > Да</span><span style="font-family:&quot;Segoe UI Symbol&quot;,sans-serif;font-size:12.0pt;line-height:150%;" lang="EN-GB"> </span><span > Нет</span> 
</p><p > <span ><strong>6. ОБЯЗАННОСТИ GALAXY HOLDINGS И КЛИЕНТОВ</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>6.1. Обязанности Galaxy Holdings</strong></span></i></p><p > <span >- Обеспечивать качество услуг, предоставляемых Клиентам, в соответствии с качеством обслуживания, заявленным Galaxy Holdings, указанным на веб-сайте</span><a href="https://Skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" lang="EN-GB">https://Skyfi.vn</span></a><span >, приложение SkyFi и в точках обслуживания телекоммуникаций Galaxy Holdings и предоставленных Клиентам до заключения Договора на предоставление и использование услуг наземной подвижной связи (предоплата), Подтверждение информации об абоненте, Общие условия сделки;</span></p> 
<p > 
<span >- Обеспечить правильный, полный и точный расчет цен на услуги в соответствии с Договором на предоставление и использование услуг наземной подвижной связи (предоплата), Подтверждение информации об абоненте, Общие условия сделки;</span></p><p > <span >- Уведомить Клиентов об оплате платы за продолжение пользования услугой в согласованном порядке не менее чем за 07 рабочих дней до даты истечения срока действия услуги;</span></p><p > <span >- Уведомить Клиентов о времени прекращения предоставления услуг в согласованном порядке не менее чем за 07 рабочих дней до даты истечения срока действия услуги Прекращение обслуживания предоставление;</span></p><p > <span >- Сохранять конфиденциальность информации о Клиенте, использовать и передавать информацию о Клиенте третьим лицам только с согласия Клиента, за исключением случаев, согласованных двумя сторонами или требуемых государственными органами или иных, предусмотренных законом;</span></p><p > <span >- Восстанавливать использование Клиентом Услуги после выполнения Клиентом своих обязательств в случае временного приостановления предоставления Услуги (за исключением абонентских номеров, которые были изъяты и повторно использованы) в установленный срок;</span></p><p > <span >- Своевременно проверять и решать, когда Клиент сообщает о проблемах с качеством Услуги;</span></p><p > <span >- Решать жалобы Клиента в сроки, установленные законом;</span></p><p > <span >- Уведомлять Клиента в случае приостановления деятельности по оказанию услуг связи не менее чем за 30 дней до официального приостановления деятельности по оказанию услуг связи. Galaxy Holdings прекращает предоставление телекоммуникационных услуг частично или полностью только в том случае, если он соответствует следующим условиям: (a) имеет план по обеспечению законных прав и интересов пользователей телекоммуникационных услуг в соответствии с Договором на предоставление и использование услуг наземной подвижной связи (предоплаченная форма оплаты), Подтверждением информации об абоненте, Общими условиями сделок по предоставлению и использованию телекоммуникационных услуг, уже подписанными и связанными сторонами; и (b) уведомил компетентный государственный орган о прекращении предоставления телекоммуникационных услуг.</span> 
</p><p > <span >- Galaxy Holdings несет ответственность за обеспечение того, чтобы его партнеры сохраняли конфиденциальность информации о клиентах в соответствии с законом. Настоящее положение применяется в случае, если Клиент соглашается на предоставление Galaxy Holdings информации о Клиенте партнерам Galaxy Holdings для согласованной цели. </span></p><p > <span >- Подпадать под контроль компетентных государственных органов и соблюдать нормативные акты по обеспечению безопасности телекоммуникационной инфраструктуры и информационной безопасности. </span></p><p > <span >- Обеспечивать сохранение абонентами телекоммуникационных услуг своих номеров абонентов телекоммуникационных услуг при смене поставщиков телекоммуникационных услуг в пределах одного вида телекоммуникационных услуг в порядке, установленном законодательством. </span></p><p > <span >- Предоставлять услуги пользователям телекоммуникационных услуг с полной информацией об абоненте телекоммуникационных услуг, которая соответствует информации в документах, удостоверяющих личность, предъявленных при заключении Договора на оказание и использование услуг наземной подвижной телекоммуникационной связи (форма предоплаченной оплаты), Подтверждении информации об абоненте, Общих условиях сделки в порядке, установленном законодательством; </span></p><p > <span >- Осуществлять аутентификацию, хранение, использование информации об абоненте телекоммуникационных услуг и обрабатывать SIM-карты с неполными или неточными данными абонента телекоммуникационных услуг информация;</span></p><p > <span >- Предотвращать, бороться и блокировать незаконные сообщения и звонки в соответствии с постановлениями Правительства;</span></p><p > <span >- Прекращать предоставление телекоммуникационных услуг абонентам телекоммуникаций, которые нарушают телекоммуникационное законодательство.</span></p><p > <span >- Galaxy Holdings обязуется соблюдать весь Договор на предоставление и использование услуг наземной мобильной связи (предоплаченная форма оплаты), Подтверждение информации об абоненте, Общие условия транзакций Galaxy Holdings, включая изменения и дополнения в каждый момент после того, как Договор на предоставление и использование услуг наземной мобильной связи (предоплаченная форма оплаты), Подтверждение информации об абоненте, Общие условия транзакций были утверждены компетентным государственным органом, размещены не менее чем за 5 (пять) дней до подачи заявки, размещены на стойке или на веб-сайте https://Skyfi.vn, приложение SkyFi Galaxy Holdings и предоставлены Клиентам до подписания двумя сторонами Договора на предоставление и использование услуг наземной мобильной связи (предоплаченная форма оплаты), Подтверждение информации об абоненте, Общие условия совершения сделок. Клиенты имеют право прекратить использование сервиса, если они не согласны с настоящими изменениями и дополнениями. В случае, если Клиент продолжает пользоваться сервисом, это означает, что он согласился, и настоящие изменения и дополнения будут применяться с момента утверждения Договора об оказании и использовании услуг наземной подвижной связи (предоплаченная форма оплаты), Подтверждения информации об абоненте, Общие условия совершения сделок уполномоченным государственным органом. Положения Договора об оказании и использовании услуг наземной подвижной связи (предоплаченная форма оплаты), Подтверждения информации об абоненте, Общие условия совершения сделок применяются к Пользователю сервиса, являющемуся потребителем, в порядке, предусмотренном пунктом 1 статьи 3 Закона о защите прав потребителей.</span> 
</p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>6.2. Обязанности Клиента</strong></span></i></p><p > <span >- Своевременно и в полном объеме оплачивать услуги связи;</span></p><p > <span >- Возмещать прямой ущерб, причиненный по собственной вине Galaxy Holdings, агентам по предоставлению услуг связи;</span></p><p > <span >- Нести ответственность перед законом за использование абонентских номеров связи, на которые заключен Договор на предоставление и использование услуг наземной подвижной связи (предоплаченная форма оплаты), Общие условия сделок с Galaxy Holdings;</span></p><p > <span >- Нести ответственность перед законом за содержание информации, которую они отправляют и хранят в сети связи;</span></p> < 
p > 
<span >- Не использовать телекоммуникационную инфраструктуру Galaxy Holdings для ведения бизнеса по предоставлению услуг связи.</span></p><p > <span >- Не использовать телекоммуникационную сеть для угроз, преследования, искажения, клеветать или оскорблять репутацию, честь или достоинство Galaxy Holdings. продукты других лиц/организаций;&nbsp;</span></p><p > <span >- Предоставлять достоверную информацию в Договоре на оказание услуг наземной подвижной связи (предоплаченная форма оплаты), Подтверждении информации об абоненте в соответствии с государственными правилами;&nbsp;</span></p><p > <span >- Нести ответственность за обновление информации об абоненте в соответствии с нормативными актами при изменении документов или при обнаружении того, что ваша информация об абоненте неверна, или при получении уведомления от Galaxy Holdings об информации, которая не соответствует нормативным актам;&nbsp;</span></p><p > <span >- Не использовать информацию из документов, удостоверяющих личность, для исполнения Договора на оказание услуг наземной подвижной связи (предоплаченная форма оплаты), Подтверждении информации об абоненте, Общих условиях оказания услуг наземной подвижной связи для других лиц, за исключением случаев, разрешенных законом;&nbsp;</span></p><p > <span >- Защитить свои Пароль, код доступа и терминал;</span></p><p > <span >- В случае утери SIM-карты, клиенты должны немедленно обратиться в пункты приема платежей Galaxy Holdings или воспользоваться приложением SkyFi (приложение) для завершения процедуры перевыпуска новой SIM-карты, либо обратиться в Galaxy Holdings с просьбой о временном приостановлении исходящей связи. В случае несоблюдения вышеуказанных требований, Клиент обязан оплатить понесенные расходы до официального уведомления Galaxy Holdings, при этом Galaxy Holdings не обязана возмещать эти расходы. В случае чрезвычайной ситуации клиенты могут позвонить по номеру 19006605, чтобы временно заблокировать исходящие вызовы;</span></p><p > 
<span >- Клиенты обязуются соблюдать весь Договор на предоставление и использование услуг наземной мобильной связи (предоплатный способ оплаты), Подтверждение информации об абоненте, Общие условия транзакций Galaxy Holdings, включая изменения и дополнения в каждый момент после того, как Договор на предоставление и использование услуг наземной мобильной связи (предоплатный способ оплаты), Подтверждение информации об абоненте, Общие условия транзакций были утверждены компетентными государственными органами, размещены не менее чем за 5 (пять) дней до подачи заявки, размещены на стойке или на веб-сайте https://Skyfi.vn, Приложение SkyFi Galaxy Holdings и предоставлены Клиентам до того, как две стороны подпишут Договор на предоставление и использование услуг наземной мобильной связи (предоплатный способ оплаты), Подтверждение информации об абоненте, Общие условия транзакций Galaxy Holdings. Абонент вправе прекратить использование сервиса, если он/она не согласен с настоящими изменениями и дополнениями. Продолжение использования сервиса означает, что он/она согласился, и настоящие изменения и дополнения применяются с момента утверждения уполномоченным государственным органом Договора об оказании и использовании услуг наземной подвижной телефонной связи (предоплаченная форма оплаты), Подтверждения информации об Абоненте и Общих условий сделок. Положения Договора об оказании и использовании услуг наземной подвижной телефонной связи (предоплаченная форма оплаты), Подтверждения информации об Абоненте и Общих условий сделок применяются к Пользователю сервиса, являющемуся потребителем в соответствии с положениями пункта 1 статьи 3 Закона о защите прав потребителей.</span> 
</p><p > <span ><strong>7. СТАНДАРТЫ КАЧЕСТВА ОБСЛУЖИВАНИЯ</strong></span></p><p > <span >Galaxy Holdings предоставляет услуги в соответствии со стандартами качества обслуживания, объявленными Министерству науки и технологий и указанными на веб-сайте https:\\\\skyfi.vn и в приложении SkyFi.</span></p><p > <span ><strong>8. ЦЕНА И ОПЛАТА</strong></span></p><p > <i><span >-&nbsp;</span></i><span >Цена Продукта может включать или не включать налог на добавленную стоимость и конкретно указана на странице с описанием Продукта. Во всех случаях цена Продукта не включает стоимость доставки.</span></p><p > <i><span >-&nbsp;</span></i><span >Клиент должен оплатить стоимость заказа до получения Продуктов этого Заказа. Когда Клиент нажимает кнопку «Оплата», чтобы продолжить оплату заказа, это означает, что (i) Клиент подтверждает, что он/она ознакомился с информацией о заказе; и (ii) Клиент соглашается с тем, что Условия и положения будут применяться к покупке Продуктов в этом заказе.</span> 
</p><p > <i><span >-&nbsp;</span></i><span >Galaxy Holdings оставляет за собой право отказать Клиенту в оплате кредитной картой в определенных случаях по своему усмотрению.</span></p><p > <i><span >- Для обеспечения безопасности платежей Клиенту следует принять во внимание:</span></i></p><p > <span >+&nbsp;Совершайте онлайн-платежи только в окне ссылки из Приложения;</span></p><p > <span >+ Бережно используйте и храните карту (кредитную карту, карту банкомата, карту для покупок...) и данные счета/данные карты;</span></p><p > <span >+ Не одалживайте и не позволяйте другим использовать карту для совершения покупок в Приложении. При обнаружении любой необычной транзакции в Приложении Клиентам необходимо немедленно обратиться в наш Центр обслуживания клиентов по телефону: &nbsp;<strong>19006605</strong>&nbsp;(далее именуемый «Центр обслуживания клиентов») или в колл-центр Банка-эмитента карты для оперативной обработки;</span></p><p > <span >+ Во всех случаях с международными кредитными/дебетовыми картами Клиентам рекомендуется не разглашать номер CVV/CVC/CSC (код безопасности, набор из трех цифр, напечатанный на обратной стороне карты) для защиты информации о карте;</span></p><p style="line-height:150%;margin-bottom:.0001pt;text-align:justify;"> <span style="font-size:12.0pt;line-height:150%;">&nbsp;</span><span ><strong>9. ТРАНСПОРТИРОВКА И ДОСТАВКА ПРОДУКЦИИ</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.1. Дальность доставки </strong></span></i> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">- Galaxy Holdings осуществляет доставку в указанные Клиентами места по всей стране (*).</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;">(*) Заказы будут доставлены Клиенту на дом, за исключением ограниченных случаев, таких как офисные помещения и квартиры в высотных зданиях с ограниченными правилами доступа. В этих ограниченных случаях, если Клиенту необходима доставка на дом, пожалуйста, позвоните в Центр обслуживания клиентов для получения поддержки.</span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">- Лицо, указанное Клиентом для получения Продукта в заказе или по телефону, как предписано в настоящей Статье, совместно именуется «Получатель».</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- По требованию Galaxy Holdings Получатель должен предъявить документы, удостоверяющие личность, например, документы, удостоверяющие личность, для проверки сотрудниками службы доставки перед получением товара.</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.2. Время доставки</strong></span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">Время доставки:&nbsp;<strong>В соответствии с правилами партнера по доставке Galaxy Holdings</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.3. Стоимость доставки</strong></span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">- Стоимость доставки будет указана для каждого заказа в зависимости от района и времени доставки.</span></p> 
<p > 
<i><span >-&nbsp;</span></i><span >Получатель должен проверить Товар и подписать Накладную при получении Товара в соответствии с политикой подразделения по доставке. Риск и право собственности на Продукт переходят к Клиенту с момента подписания Грузополучателем Накладной. Клиенту необходимо сохранить Накладную для сверки или решения любых вопросов, которые могут возникнуть в связи с Продуктом (если таковые имеются). По истечении срока возврата Продукта, указанного в Политике возврата, любые вопросы, которые могут возникнуть в связи с Продуктом (если таковые имеются), не подлежат решению.</span></p><p > <span ><strong>10. ОБСЛУЖИВАНИЕ КЛИЕНТОВ И РАССМОТРЕНИЕ ЖАЛОБ</strong></span></p><p > <span >- В случае возникновения каких-либо вопросов или жалоб, включая, помимо прочего, качество товаров/услуг, доставку продукции, отношение персонала службы доставки, обмен/возврат продукции и т. д., клиенты могут обратиться в Центр обслуживания клиентов по номеру 19006605 или по адресу электронной почты</span><a href="mailto:customercare@skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" lang="EN-GB">customercare@skyfi.vn</span></a></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;</span><span >При обращении в Центр обслуживания клиентов Клиент должен сообщить номер заказа, указанный в электронном письме или сообщении с подтверждением заказа, которое Galaxy Holdings отправил Клиенту. Центр обслуживания клиентов получит запрос и ответит Клиенту как можно скорее.</span></p><p > <span ><strong>11. ИНФОРМАЦИОННАЯ БЕЗОПАСНОСТЬ</strong></span></p><p > <span >- Наше приложение ценит информационную безопасность и использует лучшие меры для защиты информации и платежей Клиента. Информация о Клиенте во время процесса оплаты будет зашифрована для обеспечения безопасности. После завершения оформления заказа Клиент выйдет из безопасного режима.</span></p><p > <span >- Клиенту запрещается использовать какие-либо программы, инструменты или иные формы для вмешательства в работу системы или изменения структуры данных. Приложение также строго запрещает распространение, пропаганду или поощрение любой деятельности, направленной на вмешательство, саботаж или проникновение в данные системы. Физические лица или организации, нарушающие правила, будут лишены всех прав и при необходимости привлечены к ответственности по закону.</span> 
</p><p > <span >- Вся информация о транзакциях будет храниться в тайне, но в случае запроса правоохранительных органов мы будем вынуждены предоставить эту информацию правоохранительным органам.</span></p><p > <span >- При совершении онлайн-платежей обратите внимание на следующие детали:</span></p><p > <span >+ Используйте только приложения с сертификатами безопасных платежей.</span></p><p > <span >+ Ни в коем случае не передавайте свою кредитную карту или счет другим лицам для совершения платежей в приложении.</span></p><p > <span >+ В случае непредвиденной транзакции, пожалуйста, сообщите об этом в Центр обслуживания клиентов для получения своевременной поддержки.</span></p><p > <span >+ Регулярно проверяйте свой банковский счет, чтобы убедиться, что все транзакции по карте находятся под контролем.</span></p><p > <span ><strong>12. ОГРАНИЧЕНИЕ ОТВЕТСТВЕННОСТИ</strong></span></p><p > <span >- В любом случае Galaxy Holdings не несет ответственности за любой ущерб/убытки/потери/ущерб, которые Клиенту приходится нести после того, как риск перешел от Galaxy Holdings к Клиенту.</span></p><p > <span >- За сопутствующие подарки Galaxy Holdings, когда Клиент приобретает Продукцию через Приложение: Персонал Galaxy Holdings/Каналы сбыта и оптовые клиенты обязаны регистрировать информацию о подписчиках для конечных пользователей в соответствии с постановлениями Министерства науки и технологий.</span> 
</p><p > <span ><strong>13. ОБЩИЕ УСЛОВИЯ</strong></span></p><p > <span >- Положения, упомянутые в настоящих Общих условиях, являются неотъемлемой частью Условий.</span></p><p > <span >- Galaxy Holdings и Клиент несут ответственность за выполнение всех обязательств, предусмотренных настоящими Условиями.</span></p><p > <span >- Если какое-либо содержание настоящих Условий будет признано недействительным или не имеющим юридической силы полностью или частично каким-либо компетентным органом, действительность остального содержания настоящих Условий не будет затронута.</span></p><p > <span >- Настоящие Условия и положения, а также любые вопросы, возникающие в договорных отношениях между Galaxy Holdings и Клиентом, толкуются и регулируются в соответствии с положениями вьетнамского законодательства. Любой спор, разногласие или жалоба, возникающие из/или связанные с содержанием настоящих Условий и положений, должны разрешаться путем переговоров в духе доброй воли в течение тридцати (30) дней. Если в течение этого тридцатидневного (30) периода спор или жалоба не могут быть разрешены, то вышеуказанный спор или жалоба могут быть рассмотрены в компетентном суде.</span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;text-align:center;" align="center"> <span ><strong>--------------***---------------</strong></span></p></div>`,
    },
    th: {
        title: 'เงื่อนไขทั่วไปในการซื้อขาย', content: `<div class="sub-container"><p > <span >ยินดีต้อนรับลูกค้าสู่แอปพลิเคชันการขายออนไลน์อย่างเป็นทางการที่ก่อตั้งและเป็นเจ้าของโดย GALAXY DIGITAL HOLDINGS COMPANY LIMITED (ต่อไปนี้เรียกว่า “<strong>Galaxy Holdings</strong>” หรือ “<strong>เรา</strong>”)</span></p><p > <span ><strong>เกี่ยวกับเรา:</strong></span></p><p > <span >- <strong>ผู้ให้บริการโทรคมนาคม:</strong>GALAXY DIGITAL HOLDINGS COMPANY LIMITED</span></p><p > <span >- <strong>หมายเลขใบอนุญาตการให้บริการโทรคมนาคม</strong>: </span><span style="font-size:12.0pt;line-height:150%;">41/GP-CVT do ออกโดยกระทรวงสารสนเทศและการสื่อสารเมื่อวันที่ 6 กุมภาพันธ์ 2025</span></p><p > <span >- <strong>ใบรับรองการจดทะเบียนธุรกิจ:&nbsp;</strong></span><span style="font-size:12.0pt;line-height:150%;">0316951481 ออกโดยกรมการวางแผนและการลงทุนนครโฮจิมินห์ เมื่อวันที่ 13 สิงหาคม 2564</span></p><p> <span >- <strong>ที่อยู่:&nbsp;</strong></span><span style="font-size:12.0pt;line-height:150%;">อาคาร PV Gas, 673 Nguyen Huu Tho, Phuoc Kien, Nha Be, City. โฮจิมินห์ เวียดนาม</span></p><p > <span >- <strong>โทรศัพท์:</strong></span><span style="font-size:12.0pt;line-height:150%;">028 7300 6555</span></p><p > <span >- <strong>อีเมล:</strong></span><a href="mailto:customercare@skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" lang="EN-GB">customercare@skyfi.vn</span></a> 
</p> 
<p > <span >- <strong>หมายเลขโทรศัพท์แสดงถึงคุณภาพการบริการ:</strong>&nbsp;19006605</span></p><p > <span >เมื่อลูกค้าเข้าถึงแอปพลิเคชันของเรา หมายความว่าลูกค้ายอมรับข้อกำหนดและเงื่อนไขเหล่านี้ และ</span><a href="https://www.vietnamobile.com.vn/product/chinh-sach/thong-bao-xu-ly-du-lieu-ca-nhan/"><span style="color:windowtext;font-size:12.0pt;line-height:150%;text-decoration:none;text-underline:none;" lang="EN-GB">นโยบายการคุ้มครองข้อมูลส่วนบุคคล</span></a><span > เราขอสงวนสิทธิ์ในการเปลี่ยนแปลง แก้ไข เพิ่มเติม หรือลบส่วนใดส่วนหนึ่งของข้อกำหนดและเงื่อนไขเหล่านี้ได้ตลอดเวลา การเปลี่ยนแปลงจะมีผลทันทีที่เผยแพร่บนแอปพลิเคชันโดยไม่ต้องแจ้งให้ทราบล่วงหน้า เมื่อลูกค้ายังคงใช้งานแอปพลิเคชันต่อไป หลังจากที่มีการประกาศเปลี่ยนแปลงข้อกำหนดและเงื่อนไข หมายความว่าลูกค้าได้ยอมรับการเปลี่ยนแปลงดังกล่าวแล้ว โปรดตรวจสอบเป็นประจำเพื่ออัปเดตการเปลี่ยนแปลงของเรา</span></p><p > <span ><strong>1. ขอบเขตการใช้งาน</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>1.1. ข้อกำหนดและเงื่อนไขนี้มีผลบังคับใช้กับลูกค้าที่:</strong></span></i></p><p > <span >- ซื้อผลิตภัณฑ์และใช้บริการ (“<strong>ผลิตภัณฑ์</strong>”) ของ Galaxy Holdings</span></p><p > <span >- มีความจำเป็นต้องจัดส่งสินค้าไปยังสถานที่ต่างๆ ตามนโยบายการจัดส่งที่ประกาศไว้ในแอปพลิเคชันเป็นครั้งคราว</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>1.2. เมื่อซื้อผลิตภัณฑ์บนแอปพลิเคชัน ลูกค้าต้องจัดเตรียมเอกสารต่อไปนี้เพื่อดำเนินการทำสัญญาตามแบบฟอร์มและเงื่อนไขการทำธุรกรรมโดยทั่วไป:</strong></span></i></p> 
<p > 
<span >- กรณีเป็นบุคคล: หนังสือเดินทางฉบับจริง บัตรประจำตัวประชาชน บัตรประจำตัวประชาชน บัตรประจำตัวอิเล็กทรอนิกส์ หรือบัญชีระบุตัวตนอิเล็กทรอนิกส์ที่มีระยะเวลาใช้งานที่ถูกต้องสำหรับพลเมืองเวียดนาม หรือหนังสือเดินทางที่มีระยะเวลาหมุนเวียนที่ถูกต้องในเวียดนามสำหรับพลเมืองต่างชาติ (ต่อไปนี้เรียกว่าเอกสารแสดงตัวตน);</span></p><p > <span >- กรณีเป็นองค์กร: สำเนาต้นฉบับหรือสำเนาที่ได้รับการรับรองของหนังสือตัดสินใจจัดตั้งธุรกิจหรือหนังสือรับรองการจดทะเบียนธุรกิจและการจดทะเบียนภาษีหรือใบอนุญาตการลงทุนหรือหนังสือรับรองการจดทะเบียนวิสาหกิจ (ต่อไปนี้เรียกว่าหนังสือรับรองนิติบุคคล) เอกสารแสดงตัวตนของตัวแทนทางกฎหมายขององค์กร สำหรับบริการโทรคมนาคมเคลื่อนที่ องค์กรจะต้องแนบรายชื่อบุคคลที่เป็นสมาชิกขององค์กร (พร้อมการยืนยันทางกฎหมายจากองค์กร) ที่ได้รับอนุญาตให้ใช้บริการโทรคมนาคมตามสัญญามาตรฐานและเงื่อนไขการทำธุรกรรมทั่วไปที่องค์กรได้ลงนามกับผู้ประกอบการโทรคมนาคม (กรณีที่องค์กรส่งมอบให้แก่ผู้ใช้บริการ) พร้อมเอกสารแสดงตัวตนฉบับจริงของบุคคลแต่ละคน ในกรณีที่ลูกค้าทำสัญญาตามแบบฟอร์มมาตรฐานและเงื่อนไขการทำธุรกรรมทั่วไปไม่ใช่ตัวแทนทางกฎหมายขององค์กร ลูกค้าจะต้องจัดเตรียมเอกสารการอนุญาตทางกฎหมายของตัวแทนทางกฎหมายและเอกสารยืนยันตัวตนของลูกค้า</span></p><p > <span >- สำหรับลูกค้าที่มีอายุต่ำกว่า 14 ปีหรือบุคคลที่อยู่ภายใต้การปกครองตามที่กำหนดไว้ในประมวลกฎหมายแพ่ง การทำสัญญาตามแบบฟอร์มมาตรฐานและเงื่อนไขการทำธุรกรรมทั่วไปจะต้องดำเนินการโดยบิดา มารดา หรือผู้ปกครอง</span></p><p > <span >(ใช้บังคับตามพระราชกฤษฎีกาฉบับที่ 163/2024/ND-CP ของรัฐบาล ลงวันที่ 24 ธันวาคม 2024</span><span style="font-size:12.0pt;letter-spacing:.1pt;line-height:150%;">)</span></p><p > <span ><strong>2. เงื่อนไขหรือข้อจำกัดในการจัดหาสินค้าและบริการ</strong></span></p><p> <span >- เพื่อให้มั่นใจถึงความยุติธรรมและผลประโยชน์ของลูกค้าในฐานะผู้บริโภค Galaxy Holdings มีสิทธิ์ใช้เงื่อนไขที่จำกัดในการดำเนินการตามโปรแกรมส่งเสริมการขาย: ไม่มีข้อจำกัด จำกัดจำนวนผลิตภัณฑ์สูงสุดในแต่ละโปรแกรมส่งเสริมการขายที่ลูกค้าสามารถซื้อ จำกัดวัตถุประสงค์ในการซื้อแพ็คเกจผลิตภัณฑ์ (สำหรับการบริโภคเท่านั้น ไม่ใช่เพื่อธุรกิจ ขายต่อ...) หรือข้อจำกัดอื่นๆ (ถ้ามี) ที่ระบุโดยละเอียดในแต่ละโปรแกรมส่งเสริมการขาย ข้อจำกัดเหล่านี้ต่อไปนี้เรียกว่านโยบายโปรโมชัน</span> 
</p><p > <span >ดังนั้น Galaxy Holdings มีสิทธิ์ที่จะไม่ยืนยัน ปฏิเสธ ยกเลิก หรือเรียกคืนผลิตภัณฑ์ที่ส่งมอบซึ่งละเมิดเนื้อหาใดๆ ของนโยบายโปรโมชัน</span></p><p > <span >- Galaxy Holdings มีสิทธิ์ที่จะปฏิเสธที่จะให้บริการผลิตภัณฑ์ในกรณีที่บุคคลหรือองค์กรไม่เป็นไปตามเนื้อหาใดเนื้อหาหนึ่งต่อไปนี้: การนำเสนอเอกสารเพื่อลงทะเบียนข้อมูลสมาชิกที่ไม่เป็นไปตามระเบียบหรือเอกสารเพื่อลงทะเบียนข้อมูลสมาชิกที่นำเสนอไม่ชัดเจน ไม่มั่นใจว่าการแปลงเอกสารเป็นดิจิทัลนั้นชัดเจน คมชัด และมีข้อมูลครบถ้วน หรือเอกสารระบุตัวตนมีข้อมูลที่ไม่ตรงกันหลังจากการตรวจสอบสิทธิ์แล้ว หรือไม่สามารถตรวจสอบสิทธิ์ได้</span></p><p > <span ><strong>3. นโยบายการชำระเงิน</strong></span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:27.0pt;text-align:justify;"> <i><span style="font-size:12.0pt;line-height:150%;"><strong>3.1.&nbsp;&nbsp; ขั้นตอนการสั่งซื้อ</strong></span></i></p><p > <span >- เมื่อลูกค้าทำการสั่งซื้อบนแอปพลิเคชัน เราจะได้รับคำขอสั่งซื้อและส่งหมายเลขคำสั่งซื้อให้กับลูกค้า</span></p><p > <span >- เพื่อให้คำขอสั่งซื้อได้รับการยืนยันอย่างรวดเร็ว ลูกค้าจะต้องให้ข้อมูลที่ถูกต้องและครบถ้วนเกี่ยวกับการจัดส่ง หรือข้อกำหนดและเงื่อนไขของโปรแกรมโปรโมชัน (ถ้ามี) ที่ลูกค้าเข้าร่วม</span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:27.0pt;text-align:justify;"> <i><span style="font-size:12.0pt;line-height:150%;"><strong>3.2.&nbsp;&nbsp; นโยบายการตรวจสอบผลิตภัณฑ์</strong></span></i></p><p > <span >- ผลิตภัณฑ์จะต้องสอดคล้องกับคำอธิบายโดยละเอียดในแอปพลิเคชัน</span> 
</p> 
<p > <span >- สำหรับ eSIM: หลังจากซื้อผลิตภัณฑ์และชำระเงินเรียบร้อยแล้ว ลูกค้าจะได้รับการแจ้งเตือนจาก Galaxy Holdings ทางอีเมลเกี่ยวกับข้อมูล eSIM ที่ซื้อ เมื่อได้รับข้อมูลแล้ว ลูกค้าควรตรวจสอบข้อมูล eSIM เนื่องจากผลิตภัณฑ์ eSIM ไม่ได้จัดส่งโดยตรง ดังนั้นจึงไม่มีนโยบายการตรวจสอบผลิตภัณฑ์</span></p><p > <span >- สำหรับซิมจริง: หลังจากชำระเงินและรับผลิตภัณฑ์แล้ว ลูกค้าควรตรวจสอบจำนวน ตราประทับ ข้อมูลรุ่น และวันหมดอายุเทียบกับคำสั่งซื้อ</span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:9.0pt;text-align:justify;"> <span ><strong>4. นโยบายการแลกเปลี่ยนและส่งคืนสินค้า</strong></span></p><p > <span style="font-size:12.0pt;line-height:150%;">นโยบายการแลกเปลี่ยนและส่งคืนสินค้าของแอปพลิเคชันระบุเหตุผลที่ยอมรับได้ ข้อกำหนดสำหรับสินค้าที่ส่งคืน และเวลาในการดำเนินการส่งคืนสำหรับลูกค้า</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.1. เหตุผลในการรับคืนสินค้า</strong></span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">- สินค้าไม่ได้แกะซีล จัดส่งโดยมีปริมาณ ข้อมูล และรุ่นไม่ถูกต้องเมื่อเทียบกับคำสั่งซื้อ</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- สินค้าเสียหายเนื่องจากข้อผิดพลาดของผู้ผลิต (ความผิดพลาดทางเทคนิค ข้อผิดพลาดในการออกแบบ ข้อผิดพลาดของเนื้อหา) หรือข้อผิดพลาดระหว่างการขนส่ง (ผิดรูป รอยขีดข่วน แตกร้าว ฯลฯ)</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- สินค้าหมดอายุก่อนหรือในวันที่ส่งมอบสินค้าให้กับลูกค้า</span></p><p > 
<i><span style="font-size:12.0pt;line-height:150%;"><strong>4.2. ข้อกำหนดสำหรับสินค้าที่ส่งคืน</strong></span></i> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.1. เงื่อนไขการคืนสินค้า:</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- สินค้าต้องอยู่ในสภาพสมบูรณ์ มีฉลากครบถ้วน และเป็นไปตามข้อกำหนดเดิม (ยกเว้นในกรณีที่สินค้ามีตำหนิหรือเสียหายระหว่างการขนส่ง)</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- สินค้ายังอยู่ในวันหมดอายุ</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- สินค้าไม่สกปรกหรือไม่มีร่องรอยการใช้งาน</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- ลูกค้ายังคงได้รับการยืนยันการซื้อบนแอปพลิเคชัน (หมายเลขคำสั่งซื้อ, ใบแจ้งหนี้อิเล็กทรอนิกส์, ใบเสร็จรับเงิน, ใบแจ้งยอด) ของธนาคาร…).</span></p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.2. ระยะเวลาที่สามารถส่งคืนสินค้าได้:</span></p><p> <span style="font-size:12.0pt;line-height:150%;">- เว้นแต่จะระบุไว้เป็นอย่างอื่นในคำแนะนำผลิตภัณฑ์ในแอปพลิเคชัน ลูกค้ามีเวลา 2 วันนับจากวันที่ได้รับสินค้าเพื่อยื่นคำขอส่งคืนสินค้า</span></p><p> <span style="font-size:12.0pt;line-height:150%;">4.2.3. สถานที่ส่งคืนสินค้า:</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- ลูกค้านำสินค้าพร้อมเอกสารยืนยันการซื้อในแอปพลิเคชัน (รหัสคำสั่งซื้อ ใบแจ้งหนี้การซื้อทางอิเล็กทรอนิกส์ ใบเสร็จรับเงิน ฯลฯ) ไปยังร้านค้าที่ทำธุรกรรมของ Galaxy Holdings หรือส่งทางไปรษณีย์ไปยังที่อยู่ต่อไปนี้: จุดบริการโทรคมนาคมของ Galaxy Holdings ตามข้อตกลงของทั้งสองฝ่าย</span> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.4. ระยะเวลาการขอคืนสินค้าจะขึ้นอยู่กับ:</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- หากลูกค้าส่งสินค้าทางไปรษณีย์หรือบริการจัดส่ง: ระยะเวลาจะคำนวณตามตราประทับบนใบเสร็จของที่ทำการไปรษณีย์หรือหน่วยจัดส่ง</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- หากลูกค้านำสินค้ามาที่ศูนย์คืนสินค้าด้วยตนเอง: ระยะเวลาจะคำนวณเมื่อพนักงานของ Galaxy Holdings ได้รับสินค้าที่ส่งคืนจากลูกค้า</span></p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.5. ค่าใช้จ่ายในการคืนสินค้า</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- สำหรับสินค้าที่ส่งคืนเนื่องจากความผิดพลาดของ Galaxy Holdings หรือซัพพลายเออร์ (NCC) ลูกค้าจะได้รับการยกเว้นไม่ต้องคืนสินค้าลูกค้าจะต้องรับผิดชอบค่าใช้จ่ายในการส่งคืนสินค้าหรือค่าใช้จ่ายอื่นๆ ที่ต้องชำระให้กับบุคคลที่สาม</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.3. นโยบายการคืนเงิน</strong></span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">4.3.1. หลักการคืนเงิน</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- การคืนเงินจะดำเนินการเมื่อลูกค้าได้ชำระเงินให้กับ Galaxy Holdings แล้ว แต่เกิดปัญหาขึ้น เช่น สินค้าหมด หรือลูกค้าได้รับสินค้าแล้วแต่ต้องการเปลี่ยนหรือคืนสินค้าตามข้อกำหนดในข้อ 4.2</span> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">- ไม่สามารถใช้ได้กับคำขอคืนเงินที่มีมูลค่าต่ำกว่า 1,000 VND</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- ระยะเวลาในการดำเนินการคืนเงินจะคิดเป็นวันทำการ (ไม่รวมวันเสาร์ วันอาทิตย์ วันหยุดนักขัตฤกษ์ และวันหยุดเทศกาลเต๊ดตามที่กำหนด)</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- การคืนเงินเมื่อลูกค้าใช้ของขวัญ รหัส: ในกรณีพิเศษที่ Galaxy Holdings ยอมรับการคืนเงินเมื่อลูกค้าใช้รหัสของขวัญ Galaxy Holdings จะไม่คืนเงินตามมูลค่าของรหัสของขวัญที่ลูกค้าใช้ แต่จะคืนเงินเฉพาะจำนวนเงินจริงที่ลูกค้าใช้จ่ายเมื่อซื้อสินค้าเท่านั้น</span></p><p> <span style="font-size:12.0pt;line-height:150%;">4.3.2. วิธีการคืนเงิน</span></p><p> <span style="font-size:12.0pt;line-height:150%;">-&nbsp;การคืนเงินผ่านการโอนเงินผ่านธนาคาร: ลูกค้าติดต่อศูนย์บริการลูกค้าของ Galaxy Holdings ให้ข้อมูลและปฏิบัติตามคำแนะนำ</span></p><p> <span style="font-size:12.0pt;line-height:150%;">4.3.3. ระยะเวลาในการดำเนินการ</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- Galaxy Holdings จะส่งคำตอบการขอคืนสินค้าไปยังลูกค้าทางอีเมลหรือ SMS ภายในเวลาสูงสุด 7 วันทำการนับจากวันที่ Galaxy Holdings ได้รับสินค้าที่ส่งคืน</span></p><p > <span >หมายเหตุ:</span><span style="font-size:12.0pt;line-height:150%;">Galaxy Holdings จะไม่รับผิดชอบในกรณีที่สินค้าเสียหายระหว่างการขนส่งไปยังศูนย์คืนสินค้าของ Galaxy Holdings</span> 
</p> 
<p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.4. การแก้ไข</strong></span></i></p><p > <span >- หลังจากซื้อสินค้าแล้ว ข้อมูลสินค้าและแพ็คเกจข้อมูลไม่สามารถเปลี่ยนแปลงหรือปรับแต่งตามความต้องการเฉพาะได้ มีให้บริการตามที่เป็นอยู่</span></p><p > <span >- สำหรับข้อมูลเพิ่มเติมโดยละเอียด โปรดติดต่อฝ่ายบริการลูกค้าของ skyfi.vn หรือโทร 1900 6605 เพื่อขอความช่วยเหลือ ขอบคุณ! </span></p><p > <span ><strong>5. นโยบายการรับประกัน</strong></span></p><p > <span >นโยบายการรับประกัน</span><span style="font-family:&quot;Segoe UI Symbol&quot;,sans-serif;font-size:12.0pt;line-height:150%;" lang="EN-GB"> 🗹 </span><span > ใช่</span><span style="font-family:&quot;Segoe UI Symbol&quot;,sans-serif;font-size:12.0pt;line-height:150%;" lang="EN-GB"> </span><span > ไม่</span> 
</p><p > <span ><strong>6. ภาระผูกพันของ GALAXY HOLDINGS และลูกค้า</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>6.1 ภาระผูกพันของ Galaxy Holdings</strong></span></i></p><p > <span >- รับประกันคุณภาพบริการที่มอบให้กับลูกค้าตามคุณภาพบริการที่ประกาศโดย Galaxy Holdings ซึ่งระบุไว้ในเว็บไซต์</span><a href="https://Skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" lang="EN-GB">https://Skyfi.vn</span></a><span >, แอปพลิเคชัน SkyFi และที่จุดบริการโทรคมนาคมของ Galaxy Holdings และที่ให้ไว้กับลูกค้าก่อนทำสัญญาการให้บริการและการใช้บริการโทรคมนาคมเคลื่อนที่ภาคพื้นดิน (แบบชำระเงินล่วงหน้า), การยืนยันข้อมูลสมาชิก, เงื่อนไขการทำธุรกรรมทั่วไป;</span></p> 
<p > 
<span >- รับรองการคำนวณราคาบริการที่ถูกต้อง ครบถ้วน และถูกต้องตามสัญญาการให้บริการและการใช้บริการโทรคมนาคมเคลื่อนที่ภาคพื้นดิน (แบบชำระเงินล่วงหน้า), การยืนยันข้อมูลสมาชิก, เงื่อนไขการทำธุรกรรมทั่วไป;</span></p><p > <span >- แจ้งให้ลูกค้าทราบถึงการชำระค่าธรรมเนียมเพื่อใช้บริการต่อไปตามที่ตกลงกันไว้อย่างน้อย 7 วันทำการก่อนวันหมดอายุบริการ;</span></p><p > <span >- แจ้งให้ลูกค้าทราบถึงเวลาสิ้นสุดการให้บริการตามที่ตกลงกันไว้อย่างน้อย 7 วันทำการก่อนวันหมดอายุบริการ การสิ้นสุดการให้บริการ;</span></p><p > <span >- รักษาข้อมูลลูกค้าเป็นความลับ ใช้และโอนข้อมูลลูกค้าไปยังบุคคลที่สามเท่านั้น ฝ่ายที่ได้รับความยินยอมจากลูกค้า ยกเว้นในกรณีที่ทั้งสองฝ่ายตกลงกันไว้ หรือตามที่หน่วยงานของรัฐกำหนด หรือตามที่กฎหมายกำหนด</span></p><p > <span >- ฟื้นฟูการใช้งานบริการของลูกค้าหลังจากที่ลูกค้าได้ปฏิบัติตามภาระผูกพันแล้ว ในกรณีที่มีการระงับการให้บริการชั่วคราว (ยกเว้นหมายเลขสมาชิกที่ถูกถอนและนำกลับมาใช้ใหม่) ภายในระยะเวลาที่กำหนด</span></p><p > <span >- ตรวจสอบและแก้ไขโดยเร็วเมื่อลูกค้าแจ้งปัญหาเกี่ยวกับคุณภาพบริการ</span></p><p > <span >- แก้ไขข้อร้องเรียนของลูกค้าภายในระยะเวลาที่กำหนดโดยกฎหมาย</span></p><p > <span >- แจ้งให้ลูกค้าทราบล่วงหน้าอย่างน้อย 30 วัน ก่อนที่จะระงับการให้บริการโทรคมนาคมอย่างเป็นทางการ Galaxy Holdings จะหยุดให้บริการโทรคมนาคมทั้งหมดหรือบางส่วนก็ต่อเมื่อเป็นไปตามเงื่อนไขต่อไปนี้: (ก) มีแผนที่จะรับรองสิทธิและผลประโยชน์ที่ถูกต้องตามกฎหมายของผู้ใช้บริการโทรคมนาคมตามสัญญาการให้บริการและการใช้บริการโทรคมนาคมเคลื่อนที่ภาคพื้นดิน (แบบฟอร์มการชำระเงินล่วงหน้า) การยืนยันข้อมูลผู้ใช้บริการ เงื่อนไขการทำธุรกรรมทั่วไปสำหรับการให้บริการและ การใช้บริการโทรคมนาคมที่ลงนามไปแล้วและของบุคคลที่เกี่ยวข้อง และ (ข) ได้แจ้งหน่วยงานของรัฐที่มีอำนาจหน้าที่เกี่ยวกับการยุติการให้บริการโทรคมนาคม</span> 
</p><p > <span >- Galaxy Holdings มีหน้าที่รับผิดชอบในการทำให้แน่ใจว่าคู่ค้าของตนต้องรักษาข้อมูลของลูกค้าเป็นความลับตามกฎหมาย ข้อกำหนดนี้ใช้ในกรณีที่ลูกค้าตกลงให้ Galaxy Holdings ให้ข้อมูลลูกค้าแก่พันธมิตรของ Galaxy Holdings เพื่อวัตถุประสงค์ที่ตกลงกันไว้&nbsp;</span></p><p > <span >- อยู่ภายใต้การควบคุมของหน่วยงานรัฐที่มีอำนาจหน้าที่และปฏิบัติตามกฎระเบียบเกี่ยวกับการรับรองความปลอดภัยของโครงสร้างพื้นฐานโทรคมนาคมและความปลอดภัยของข้อมูล</span></p><p > <span >- รับรองว่าผู้ใช้บริการโทรคมนาคมจะเก็บหมายเลขผู้ใช้บริการโทรคมนาคมไว้เมื่อเปลี่ยนผู้ให้บริการโทรคมนาคมภายในบริการโทรคมนาคมประเภทเดียวกันตามที่กฎหมายกำหนด</span></p><p > <span >- ให้บริการแก่ผู้ใช้บริการโทรคมนาคมด้วยข้อมูลผู้ใช้บริการโทรคมนาคมที่ครบถ้วนซึ่งตรงกับข้อมูลในเอกสารยืนยันตัวตนที่นำมาแสดงเมื่อทำสัญญาสำหรับการให้บริการและการใช้บริการโทรคมนาคมเคลื่อนที่ภาคพื้นดิน (แบบฟอร์มการชำระเงินล่วงหน้า) การยืนยันข้อมูลผู้ใช้บริการ เงื่อนไขการทำธุรกรรมทั่วไปตามที่กฎหมายกำหนด</span></p><p > <span >- ดำเนินการตรวจสอบ จัดเก็บ ใช้ข้อมูลผู้ใช้บริการโทรคมนาคม และจัดการซิมการ์ดที่มีผู้ใช้บริการโทรคมนาคมไม่ครบถ้วนหรือไม่ถูกต้อง ไทย: ข้อมูล;</span></p><p > <span >- ป้องกัน ต่อสู้ และบล็อกข้อความและการโทรที่ผิดกฎหมายตามกฎระเบียบของรัฐบาล;</span></p><p > <span >- หยุดให้บริการโทรคมนาคมแก่ผู้ใช้บริการโทรคมนาคมที่ละเมิดกฎหมายโทรคมนาคม</span></p><p > <span >- Galaxy Holdings มุ่งมั่นที่จะปฏิบัติตามสัญญาทั้งหมดสำหรับการให้บริการและการใช้ บริการโทรคมนาคมเคลื่อนที่ภาคพื้นดิน (แบบฟอร์มการชำระเงินล่วงหน้า) การยืนยันข้อมูลผู้ใช้บริการ เงื่อนไขการทำธุรกรรมทั่วไปของ Galaxy Holdings รวมถึงการแก้ไขและเพิ่มเติมในแต่ละครั้งหลังจากสัญญาสำหรับการให้บริการและการใช้บริการโทรคมนาคมเคลื่อนที่ภาคพื้นดิน (แบบฟอร์มการชำระเงินล่วงหน้า) การยืนยันข้อมูลผู้ใช้บริการ เงื่อนไขการทำธุรกรรมทั่วไปได้รับการอนุมัติจากหน่วยงานของรัฐที่มีอำนาจ โพสต์อย่างน้อย 5 (ห้า) วันก่อนการสมัคร วางไว้ที่เคาน์เตอร์หรือบนเว็บไซต์ https://Skyfi.vn แอปพลิเคชัน SkyFi ของ Galaxy Holdings และให้แก่ลูกค้าก่อนที่ทั้งสองฝ่ายจะลงนามในสัญญาสำหรับการให้บริการและการใช้บริการโทรคมนาคมเคลื่อนที่ภาคพื้นดิน (แบบฟอร์มการชำระเงินล่วงหน้า) การยืนยันข้อมูลผู้ใช้บริการ เงื่อนไขการทำธุรกรรมทั่วไป ลูกค้ามีสิทธิ์ยกเลิกการใช้บริการได้หากไม่เห็นด้วยกับการแก้ไขเพิ่มเติมและข้อกำหนดเพิ่มเติมเหล่านี้ ในกรณีที่ลูกค้ายังคงใช้บริการต่อไป หมายความว่าลูกค้าได้ตกลงแล้ว และการแก้ไขเพิ่มเติมและข้อกำหนดเพิ่มเติมเหล่านี้จะมีผลบังคับใช้นับตั้งแต่วันที่สัญญาการให้บริการและการใช้บริการโทรคมนาคมเคลื่อนที่ภาคพื้นดิน (แบบชำระเงินล่วงหน้า) การยืนยันข้อมูลผู้ใช้บริการ และเงื่อนไขการทำธุรกรรมทั่วไปได้รับการอนุมัติจากหน่วยงานรัฐที่เกี่ยวข้อง บทบัญญัติของสัญญาการให้บริการและการใช้บริการโทรคมนาคมเคลื่อนที่ภาคพื้นดิน (แบบชำระเงินล่วงหน้า) การยืนยันข้อมูลผู้ใช้บริการ และเงื่อนไขการทำธุรกรรมทั่วไปที่ใช้บังคับกับผู้ใช้บริการซึ่งเป็นผู้บริโภค ตามที่กำหนดไว้ในข้อ 1 มาตรา 3 แห่งกฎหมายว่าด้วยการคุ้มครองสิทธิผู้บริโภค</span> 
</p><p> <i><span style="font-size:12.0pt;line-height:150%;"><strong>6.2. ภาระผูกพันของลูกค้า</strong></span></i></p><p > <span >- ชำระค่าบริการโทรคมนาคมให้ครบถ้วนและตรงเวลา;</span></p><p > <span >- ชดเชยความเสียหายโดยตรงที่เกิดจากความผิดพลาดของลูกค้าต่อ Galaxy Holdings ตัวแทนบริการโทรคมนาคม;</span></p><p > <span >- รับผิดชอบต่อหน้ากฎหมายสำหรับการใช้หมายเลขสมาชิกโทรคมนาคมที่ลูกค้าได้ลงนามในสัญญาสำหรับการให้บริการและการใช้บริการโทรคมนาคมเคลื่อนที่ภาคพื้นดิน (แบบฟอร์มการชำระเงินล่วงหน้า) เงื่อนไขการทำธุรกรรมทั่วไปกับ Galaxy Holdings;</span></p><p > <span >- รับผิดชอบต่อหน้ากฎหมายสำหรับเนื้อหาของข้อมูลที่ลูกค้าส่งและจัดเก็บในเครือข่ายโทรคมนาคม;</span></p> < 
p > 
<span >- ห้ามใช้โครงสร้างพื้นฐานโทรคมนาคมของ Galaxy Holdings เพื่อดำเนินธุรกิจบริการโทรคมนาคม&nbsp;</span></p><p > <span >- ห้ามใช้เครือข่ายโทรคมนาคมเพื่อข่มขู่ คุกคาม บิดเบือน ใส่ร้าย หรือดูหมิ่นชื่อเสียง เกียรติยศ หรือ ศักดิ์ศรีของกาแล็คซี่ โฮลดิ้งส์ ผลิตภัณฑ์ของบุคคล/องค์กรอื่น;&nbsp;</span></p><p > <span >- ให้ข้อมูลที่ถูกต้องในสัญญาการให้บริการและการใช้บริการโทรคมนาคมเคลื่อนที่ภาคพื้นดิน (แบบฟอร์มการชำระเงินล่วงหน้า), การยืนยันข้อมูลสมาชิกตามระเบียบข้อบังคับของรัฐ;&nbsp;</span></p><p > <span >- รับผิดชอบในการอัปเดตข้อมูลสมาชิกตามระเบียบข้อบังคับเมื่อมีการเปลี่ยนแปลงเอกสาร หรือเมื่อพบว่าข้อมูลสมาชิกของคุณไม่ถูกต้อง หรือเมื่อได้รับการแจ้งเตือนจาก Galaxy Holdings เกี่ยวกับข้อมูลที่ไม่เป็นไปตามระเบียบข้อบังคับ;&nbsp;</span></p><p > <span >- ห้ามใช้ข้อมูลในเอกสารแสดงตนของคุณเพื่อดำเนินการตามสัญญาการให้บริการและการใช้บริการโทรคมนาคมเคลื่อนที่ภาคพื้นดิน (แบบฟอร์มการชำระเงินล่วงหน้า), การยืนยันข้อมูลสมาชิก, ข้อกำหนดและเงื่อนไขทั่วไปสำหรับการให้บริการและการใช้บริการโทรคมนาคมเคลื่อนที่ภาคพื้นดินสำหรับผู้อื่น ยกเว้นในกรณีที่กฎหมายอนุญาต;&nbsp;</span></p><p > <span >- ปกป้องรหัสผ่าน รหัสผ่าน และเครื่องปลายทางของคุณ;</span></p><p > <span >- ในกรณีที่ซิมสูญหาย ลูกค้าต้องไปที่จุดทำธุรกรรมของ Galaxy Holdings ทันที หรือใช้แอปพลิเคชัน SkyFi เพื่อดำเนินการขอซิมใหม่ หรือแจ้ง Galaxy Holdings ให้ระงับบริการโทรออกชั่วคราว หากลูกค้าไม่ปฏิบัติตามข้อกำหนดข้างต้น ลูกค้ายังคงต้องชำระค่าธรรมเนียมที่เกิดขึ้นจนกว่าจะมีการแจ้ง Galaxy Holdings อย่างเป็นทางการ และ Galaxy Holdings ไม่มีภาระผูกพันในการคืนเงินค่าธรรมเนียมที่เกิดขึ้นข้างต้นในกรณีฉุกเฉิน ลูกค้าสามารถโทร 19006605 เพื่อระงับการโทรออกชั่วคราวได้</span></p><p> 
<span>- ลูกค้าตกลงที่จะปฏิบัติตามสัญญาการให้บริการและการใช้บริการโทรคมนาคมเคลื่อนที่ภาคพื้นดิน (วิธีการชำระเงินแบบเติมเงิน), การยืนยันข้อมูลผู้ใช้บริการ, ข้อกำหนดการทำธุรกรรมทั่วไปของ Galaxy Holdings รวมถึงการแก้ไขเพิ่มเติมและเพิ่มเติมในแต่ละครั้งหลังจากสัญญาการให้บริการและการใช้บริการโทรคมนาคมเคลื่อนที่ภาคพื้นดิน (วิธีการชำระเงินแบบเติมเงิน), การยืนยันข้อมูลผู้ใช้บริการ, ข้อกำหนดการทำธุรกรรมทั่วไปได้รับการอนุมัติจากหน่วยงานรัฐที่เกี่ยวข้อง, ประกาศอย่างน้อย 5 (ห้า) วันก่อนการสมัคร, ติดไว้ที่เคาน์เตอร์หรือบนเว็บไซต์ https://Skyfi.vn, แอปพลิเคชัน SkyFi ของ Galaxy Holdings และแจ้งให้ลูกค้าทราบก่อนที่ทั้งสองฝ่ายจะลงนามในสัญญาการให้บริการและการใช้บริการโทรคมนาคมเคลื่อนที่ภาคพื้นดิน (วิธีการชำระเงินแบบเติมเงิน), การยืนยันข้อมูลผู้ใช้บริการ, ข้อกำหนดการทำธุรกรรมทั่วไปของ Galaxy Holdings ลูกค้ามีสิทธิ์ยกเลิกการใช้บริการได้หากไม่เห็นด้วยกับการแก้ไขเพิ่มเติมและเพิ่มเติมเหล่านี้ หากลูกค้ายังคงใช้บริการต่อไป หมายความว่าลูกค้าได้ตกลงและการแก้ไขเพิ่มเติมและข้อกำหนดเพิ่มเติมเหล่านี้จะมีผลบังคับใช้นับตั้งแต่วันที่สัญญาการให้บริการและการใช้บริการโทรคมนาคมเคลื่อนที่ภาคพื้นดิน (แบบฟอร์มการชำระเงินแบบเติมเงิน) การยืนยันข้อมูลผู้ใช้บริการ และเงื่อนไขการทำธุรกรรมทั่วไปได้รับการอนุมัติจากหน่วยงานรัฐที่เกี่ยวข้อง บทบัญญัติของสัญญาการให้บริการและการใช้บริการโทรคมนาคมเคลื่อนที่ภาคพื้นดิน (แบบฟอร์มการชำระเงินแบบเติมเงิน) การยืนยันข้อมูลผู้ใช้บริการ และเงื่อนไขการทำธุรกรรมทั่วไป มีผลบังคับใช้กับผู้ใช้บริการที่เป็นผู้บริโภคตามบทบัญญัติในข้อ 1 มาตรา 3 แห่งกฎหมายว่าด้วยการคุ้มครองสิทธิผู้บริโภค</span> 
</p><p> <span ><strong>7. มาตรฐานคุณภาพบริการ</strong></span></p><p> <span >Galaxy Holdings ให้บริการตามมาตรฐานคุณภาพบริการที่ประกาศต่อกระทรวงวิทยาศาสตร์และเทคโนโลยี และระบุไว้ในเว็บไซต์ https:\\\\skyfi.vn และแอปพลิเคชัน SkyFi</span></p><p> <span ><strong>8. ราคาและการชำระเงิน</strong></span></p><p > <i><span >-&nbsp;</span></i><span >ราคาสินค้าอาจรวมภาษีมูลค่าเพิ่มหรือไม่ก็ได้ และจะอธิบายไว้อย่างชัดเจนในหน้าแนะนำสินค้า ในทุกกรณี ราคาสินค้าไม่รวมค่าจัดส่ง</span></p><p > <i><span >-&nbsp;</span></i><span >ลูกค้าจะต้องชำระมูลค่าสินค้าก่อนได้รับสินค้าตามคำสั่งซื้อนั้น เมื่อลูกค้าคลิกปุ่ม "ชำระเงิน" เพื่อ ดำเนินการชำระเงินสำหรับคำสั่งซื้อ หมายความว่า (i) ลูกค้ายืนยันว่าได้ตรวจสอบข้อมูลคำสั่งซื้อแล้ว และ (ii) ลูกค้าตกลงว่าข้อกำหนดและเงื่อนไขจะใช้กับการซื้อผลิตภัณฑ์ในคำสั่งซื้อนั้น</span> 
</p><p> <i><span >-&nbsp;</span></i><span >Galaxy Holdings ขอสงวนสิทธิ์ในการปฏิเสธการชำระเงินด้วยบัตรเครดิตจากลูกค้าในบางกรณีตามดุลยพินิจของเรา</span></p><p> <i><span >- เพื่อให้แน่ใจว่าการชำระเงินมีความปลอดภัย ลูกค้าควรทราบว่า:</span></i></p><p> <span >+&nbsp;ชำระเงินออนไลน์เฉพาะที่หน้าต่างลิงก์จากแอปพลิเคชันเท่านั้น</span></p><p> <span >+ ใช้และเก็บบัตร (บัตรเครดิต บัตร ATM บัตรซื้อสินค้า...) และข้อมูลบัญชี/ข้อมูลบัตรอย่างระมัดระวัง</span></p><p> <span >+ ห้ามให้ยืมหรือให้ผู้อื่นใช้บัตรเพื่อซื้อสินค้าบนแอปพลิเคชัน ทันทีที่ตรวจพบธุรกรรมที่ผิดปกติในแอปพลิเคชัน ลูกค้าจะต้องติดต่อศูนย์บริการลูกค้าของเราทันทีที่: &nbsp;<strong>19006605</strong>&nbsp;(ต่อไปนี้เรียกว่า "ศูนย์บริการลูกค้า") หรือศูนย์บริการทางโทรศัพท์ของธนาคารผู้ออกบัตรเพื่อดำเนินการอย่างทันท่วงที;</span></p><p > <span >+ ในทุกกรณี ในกรณีของบัตรเครดิต/เดบิตระหว่างประเทศ ลูกค้าจะต้องไม่เปิดเผยหมายเลข CVV/CVC/CSC (รหัสความปลอดภัย ชุดตัวเลขสามตัวที่พิมพ์อยู่ด้านหลังบัตร) เพื่อรักษาความปลอดภัยของข้อมูลบัตร;</span></p><p style="line-height:150%;margin-bottom:.0001pt;text-align:justify;"> <span style="font-size:12.0pt;line-height:150%;">&nbsp;</span><span ><strong>9. การขนส่งและจัดส่งสินค้า</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.1. ช่วงเวลาการจัดส่ง </strong></span></i> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">- Galaxy Holdings จัดส่งสินค้าไปยังสถานที่ตามที่ลูกค้าต้องการทั่วประเทศ (*)</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;">(*) คำสั่งซื้อจะถูกจัดส่งถึงบ้านของลูกค้า ยกเว้นในกรณีที่มีข้อจำกัด เช่น พื้นที่สำนักงานและอพาร์ตเมนต์สูงที่มีข้อกำหนดการเข้าถึงที่จำกัด ในกรณีเช่นนี้ หากลูกค้าต้องการให้จัดส่งถึงบ้าน โปรดติดต่อศูนย์บริการลูกค้าเพื่อขอความช่วยเหลือ</span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp; บุคคลที่ลูกค้าแต่งตั้งให้รับสินค้าตามคำสั่งซื้อหรือทางโทรศัพท์ตามที่กำหนดไว้ในข้อนี้ เรียกรวมกันว่า "ผู้รับ"</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- เมื่อได้รับการร้องขอจาก Galaxy Holdings ผู้รับจะต้องแสดงเอกสารระบุตัวตน เช่น เอกสารระบุตัวตน เพื่อให้พนักงานจัดส่งตรวจสอบก่อนรับสินค้า</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.2. ระยะเวลาจัดส่ง</strong></span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">ระยะเวลาจัดส่ง:<strong>ตามข้อกำหนดของพันธมิตรการจัดส่งของ Galaxy Holdings</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.3. ค่าจัดส่ง</strong></span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">- ค่าจัดส่งจะแจ้งให้คุณทราบสำหรับแต่ละคำสั่งซื้อตามพื้นที่และระยะเวลาการจัดส่ง</span></p> 
<p > 
<i><span >-&nbsp;</span></i><span >ผู้รับต้องตรวจสอบสินค้าและลงนามในใบส่งสินค้าเมื่อได้รับสินค้าตามนโยบายของหน่วยงานจัดส่ง ความเสี่ยงและความเป็นเจ้าของสินค้าจะโอนไปยังลูกค้านับตั้งแต่ผู้รับสินค้าลงนามในใบส่งสินค้า ลูกค้าต้องเก็บใบส่งสินค้าไว้เพื่อการตรวจสอบความถูกต้องหรือเพื่อแก้ไขปัญหาใดๆ ที่อาจเกิดขึ้นเกี่ยวกับสินค้า (หากมี) หลังจากระยะเวลาการส่งคืนสินค้าที่ระบุไว้ในนโยบายการส่งคืนสินค้าแล้ว ปัญหาใดๆ ที่อาจเกิดขึ้นเกี่ยวกับสินค้า (หากมี) จะไม่ได้รับการแก้ไข</span></p><p > <span ><strong>10. การดูแลลูกค้า & การจัดการข้อร้องเรียน</strong></span></p><p > <span >- ในกรณีที่มีคำถามหรือข้อร้องเรียนใดๆ รวมถึงแต่ไม่จำกัดเพียงคุณภาพของสินค้า/บริการ การจัดส่งสินค้า ทัศนคติของพนักงานจัดส่ง การเปลี่ยน/คืนสินค้า ฯลฯ ลูกค้าสามารถติดต่อศูนย์บริการลูกค้า<strong>19006605</strong>หรือที่อยู่อีเมล</span><a href="mailto:customercare@skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" lang="EN-GB">customercare@skyfi.vn</span></a></p><p > <span style="font-size:12.0pt;line-height:150%;">-</span><span >เมื่อติดต่อศูนย์บริการลูกค้า ลูกค้าต้องระบุหมายเลขคำสั่งซื้อที่ระบุไว้ในอีเมลหรือข้อความยืนยันคำสั่งซื้อที่ Galaxy Holdings ส่งถึงลูกค้า ศูนย์บริการลูกค้าจะรับและตอบกลับลูกค้าโดยเร็วที่สุด</span></p><p > <span ><strong>11. ความปลอดภัยของข้อมูล</strong></span></p><p > <span >- แอปพลิเคชันของเราให้ความสำคัญกับความปลอดภัยของข้อมูลและใช้มาตรการที่ดีที่สุดในการปกป้องข้อมูลและการชำระเงินของลูกค้า ข้อมูลของลูกค้าในระหว่างขั้นตอนการชำระเงินจะถูกเข้ารหัสเพื่อความปลอดภัย หลังจากลูกค้าดำเนินการสั่งซื้อเสร็จสิ้น ลูกค้าจะออกจากโหมดปลอดภัย</span></p><p > <span >- ลูกค้าไม่ได้รับอนุญาตให้ใช้โปรแกรม เครื่องมือ หรือรูปแบบอื่นใดเพื่อแทรกแซงระบบหรือเปลี่ยนแปลงโครงสร้างข้อมูล แอปพลิเคชันยังห้ามมิให้ มีการเผยแพร่ เผยแพร่ หรือสนับสนุนกิจกรรมใดๆ ที่มุ่งหมายเพื่อแทรกแซง ทำลาย หรือแทรกแซงข้อมูลของระบบ โดยเด็ดขาด บุคคลหรือองค์กรที่ละเมิดจะถูกเพิกถอนสิทธิทั้งหมดและจะถูกดำเนินคดีตามกฎหมายหากจำเป็น</span> 
</p><p> <span >- ข้อมูลการทำธุรกรรมทั้งหมดจะถูกเก็บเป็นความลับ แต่ในกรณีที่หน่วยงานบังคับใช้กฎหมายร้องขอ เราจะถูกบังคับให้ให้ข้อมูลนี้แก่หน่วยงานบังคับใช้กฎหมาย</span></p><p> <span >- เมื่อทำการชำระเงินออนไลน์ โปรดทราบรายละเอียดต่อไปนี้:</span></p><p> <span >+&nbsp;ใช้เฉพาะแอปพลิเคชันที่มีใบรับรองการชำระเงินที่ปลอดภัย</span></p><p> <span >+ อย่าให้ผู้อื่นยืมบัตรเครดิตหรือบัญชีของคุณเพื่อชำระเงินผ่านแอปพลิเคชันโดยเด็ดขาด</span></p><p> <span >+ ในกรณีที่เกิดธุรกรรมที่ไม่คาดคิด โปรดแจ้งศูนย์บริการลูกค้าเพื่อขอความช่วยเหลืออย่างทันท่วงที</span></p><p> <span >+ ตรวจสอบบัญชีธนาคารของคุณเป็นประจำเพื่อให้แน่ใจว่าธุรกรรมทั้งหมดผ่านบัตรอยู่ภายใต้การควบคุม</span></p><p> <span ><strong>12. ข้อจำกัดความรับผิดชอบ</strong></span></p><p > <span >- ในกรณีใดๆ ก็ตาม Galaxy Holdings จะไม่รับผิดชอบต่อความเสียหาย/การสูญเสีย/การสูญเสีย/ความเสียหายใดๆ ที่ลูกค้าต้องรับผิดชอบหลังจากเวลาที่ความเสี่ยงได้ถูกโอนจาก Galaxy Holdings ไปยังลูกค้า</span></p><p > <span >- สำหรับของขวัญที่ Galaxy Holdings จะได้รับเมื่อลูกค้าซื้อผลิตภัณฑ์ผ่านแอปพลิเคชัน: พนักงาน/ช่องทางการจัดจำหน่ายและลูกค้าขายส่งของ Galaxy Holdings มีหน้าที่ต้อง ลงทะเบียนข้อมูลสมาชิกสำหรับผู้ใช้ปลายทางตามระเบียบของกระทรวงวิทยาศาสตร์และเทคโนโลยี</span> 
</p><p > <span ><strong>13. ข้อกำหนดทั่วไป</strong></span></p><p> <span >- ข้อกำหนดที่อ้างถึงในข้อกำหนดทั่วไปนี้ถือเป็นส่วนหนึ่งที่แยกออกจากข้อกำหนดและเงื่อนไขไม่ได้</span></p><p> <span >- Galaxy Holdings และลูกค้ามีหน้าที่รับผิดชอบในการปฏิบัติตามข้อผูกพันทั้งหมดที่ระบุไว้ในข้อกำหนดและเงื่อนไขเหล่านี้</span></p><p> <span >- หากเนื้อหาใดๆ ในข้อกำหนดและเงื่อนไขเหล่านี้ถูกพิจารณาว่าไม่ถูกต้องหรือไม่สามารถบังคับใช้ได้ทั้งหมดหรือบางส่วนโดยหน่วยงานที่มีอำนาจ ความถูกต้องของเนื้อหาอื่นๆ ในข้อกำหนดและเงื่อนไขเหล่านี้จะไม่ได้รับผลกระทบ</span></p><p> <span >- ข้อกำหนดและเงื่อนไขเหล่านี้และปัญหาใดๆ ที่เกิดขึ้นในความสัมพันธ์ทางสัญญาระหว่าง Galaxy Holdings และลูกค้าจะถูกตีความและบังคับใช้ตามบทบัญญัติของกฎหมายเวียดนาม ข้อพิพาท ข้อขัดแย้ง หรือข้อร้องเรียนใดๆ ที่เกิดขึ้นจาก/หรือเกี่ยวข้องกับเนื้อหาของข้อกำหนดและเงื่อนไขเหล่านี้จะได้รับการแก้ไขผ่านการเจรจาต่อรองภายในสามสิบ (30) วัน หากไม่สามารถแก้ไขได้ภายในระยะเวลาสามสิบ (30) วันนี้ ข้อโต้แย้งหรือข้อร้องเรียนข้างต้นอาจได้รับการแก้ไขที่ศาลที่มีอำนาจ</span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;text-align:center;" align="center"> <span ><strong>---------------***---------------</strong></span></p></div>`,
    },
    "zh-CN": {
        title: '一般交易条款', content: `<div class="sub-container"><p > <span >欢迎各位顾客使用由银河数码控股有限公司（以下简称“银河控股”或“我们”）建立并拥有的官方在线销售应用程序。</span></p><p > <span ><strong>关于我们：</strong></span></p><p > <span >- <strong>电信服务提供商：</strong>银河数码控股有限公司</span></p><p > <span >- <strong>电信服务提供商许可证号：</strong>：</span><span style="font-size:12.0pt;line-height:150%;">41/GP-CVT do，由信息通信部于2月6日颁发， 2025.</span></p><p > <span >- <strong>营业执照：</strong></span><span style="font-size:12.0pt;line-height:150%;">0316951481，由胡志明市计划投资厅于2021年8月13日颁发。</span></p><p > <span >- <strong>地址：</strong></span><span style="font-size:12.0pt;line-height:150%;">PV Gas大厦，胡志明市芽北郡福坚坊阮友寿街673号。</span></p越南胡志明市</span></p><p > <span >- <strong>电话：</strong></span><span style="font-size:12.0pt;line-height:150%;">028 7300 6555</span></p><p > <span >- <strong>邮箱：</strong></span><a href="mailto:customercare@skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" <a href="https://www.vietnamobile.com.vn/product/chinh-sach/thong-bao-xu-ly-du-lieu-ca-nhan/"><span style="color:windowtext;font-size:12.0pt;line-height:150%;text-decoration:none;text-underline:none;" lang="EN-GB">customercare@skyfi.vn 
</span> 
</a> </p> <p > <span >- <strong>电话号码反映服务质量：</strong>&nbsp;19006605</span></p> <p > <span >客户访问我们的应用程序即表示客户同意这些条款和条件以及&nbsp;</span><a href="https://www.vietnamobile.com.vn/product/chinh-sach/thong-bao-xu-ly-du-lieu-ca-nhan/"><span style="color:windowtext;font-size:12.0pt;line-height:150%;text-decoration:none;text-underline:none;" lang="EN-GB">个人数据保护政策</span></a><span >。我们保留随时更改、修改、添加或删除这些条款和条件任何部分的权利。条款变更一经发布在应用程序上即刻生效，无需事先通知。客户在条款和条件变更发布后继续使用应用程序，即表示客户已接受这些变更。请定期查看我们的变更更新。</span></p><p > <span ><strong>1. 适用范围</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>1.1.本条款及细则适用于以下客户：</strong></span></i></p><p > <span >- 购买 Galaxy Holdings 的产品及使用服务（“<strong>产品</strong>”）。</span></p><p > <span >- 需要根据应用程序上不时发布的“配送政策”将产品配送至指定地点。</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>1.2.在应用程序上购买产品时，客户必须提供以下文件才能根据合同格式和一般交易条款完成合同签订：</strong></span></i></p> 
<p> 
<span>- 个人：越南公民需提供有效期有效的护照原件、公民身份证、身份证、电子身份证或电子身份账户原件，外国公民需提供在越南境内有效期有效的护照原件（以下统称身份证明文件）；</span></p><p><span>- 组织：组织成立决定书原件或经认证的复印件、营业执照及税务登记证原件、投资许可证原件或企业注册证原件（以下统称法人资格证书），以及组织法定代表人的身份证明文件。对于移动通信服务，组织必须提供一份组织成员名单（需经组织确认），该名单列明了根据组织与电信企业签订的标准合同和一般交易条款（如组织向用户提供服务）获准使用电信服务的成员，并附上每位成员的身份证明文件原件。</span></p>如果根据标准格式和一般交易条款订立合同的客户并非组织的法定代表人，则必须提供法定代表人的授权书及其身份证明文件；</span></p><p><span>- 对于未满 14 周岁的客户或根据《民法典》规定受监护的人，根据标准格式和一般交易条款订立合同必须由其父亲、母亲或监护人代为办理。</span></p><p><span>（根据 2024 年 12 月 24 日政府第 163/2024/ND-CP 号法令执行）</span><span style="font-size:12.0pt;letter-spacing:.1pt;line-height:150%;">）。</span></p><p><span><strong>2.商品和服务提供中的条件或限制</strong></span></p><p > <span >- 为确保公平和最终消费者客户的利益，Galaxy Holdings 有权在实施促销活动时施加限制性条件：例如，不设购买数量限制、限制客户在每个促销活动中可购买的产品数量上限、限制购买产品套装的用途（仅限消费，不得用于商业用途、转售等），或在每个促销活动中详细规定的其他限制（如有）。以下这些限制统称为“促销政策”。</span> 
</p><p><span>因此，Galaxy Holdings有权不确认、拒绝、取消或召回违反促销政策任何内容的已交付产品。</span></p><p><span>- 如果个人或组织不符合以下任一条件，Galaxy Holdings有权拒绝提供产品：提交的用于注册用户信息的文件不符合规定；提交的用于注册用户信息的文件不清晰，无法确保文件的数字化清晰、锐利且信息完整；或者身份证明文件经认证后信息不符或无法认证。</span></p><p><span><strong>3.结账政策</strong></span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:27.0pt;text-align:justify;"> <i><span style="font-size:12.0pt;line-height:150%;"><strong>3.1.&nbsp;&nbsp;订购步骤</strong></span></i></p><p > <span>- 当客户通过应用程序下单时，我们将收到订单请求并向客户发送订单号。</span></p><p > <span>- 为了快速确认订单请求，客户必须提供与配送相关的正确完整信息，或客户参与的促销活动（如有）的条款和条件。</span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:27.0pt;text-align:justify;"> <i><span style="font-size:12.0pt;line-height:150%;"><strong>3.2.&nbsp;&nbsp;产品检验政策</strong></span></i></p><p > <span>- 产品承诺与应用程序上的详细描述一致。</span> 
</p> 
<p > <span>- 对于 eSIM：购买产品并成功付款后，客户将收到 Galaxy Holdings 发送的电子邮件通知，其中包含所购 eSIM 的信息。收到信息后，客户应核对 eSIM 信息。eSIM 产品不直接发货，因此没有产品检验政策。</span></p><p > <span>- 对于实体 SIM 卡：付款并收到产品后，客户应核对数量、封条、型号信息和有效期是否与订单相符。</span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:9.0pt;text-align:justify;"> <span ><strong>4.产品更换和退货政策</strong></span></p><p > <span style="font-size:12.0pt;line-height:150%;">本应用程序的产品更换和退货政策规定了可接受的退货理由、退货要求以及处理客户退货所需的时间。</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.1.接受退货的原因</strong></span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">- 产品已拆封，或交付的数量、信息和型号与订单不符。</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 产品因制造商错误（技术故障、设计错误、内容错误）或运输过程中的错误（变形、刮伤、破裂等）而损坏。</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 产品在交付给客户之日或之前过期。</span></p><p > 
<i><span style="font-size:12.0pt;line-height:150%;"><strong>4.2.退货产品的要求</strong></span></i> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.1.退货条件：</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 产品完好无损，标签齐全，并符合原始规格（运输过程中损坏或缺陷产品除外）。</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 产品仍在有效期内。</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 产品干净，无使用痕迹。</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 客户仍可在银行应用程序上查看购买确认信息（订单号、电子发票、送货单、银行对账单等）。</span></p><p > <span <p><span style="font-size:12.0pt;line-height:150%;">4.2.2. 退货适用时间：</span></p><p><span style="font-size:12.0pt;line-height:150%;">- 除非应用程序上的产品介绍另有规定，否则客户自收到产品之日起有 2 天的时间提交退货申请。</span></p><p><span style="font-size:12.0pt;line-height:150%;">4.2.3.退货地点：</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 客户需携带产品及相关文件，包括应用程序上的购买确认文件（订单号、电子购买发票、送货单等），前往 Galaxy Holdings 的交易门店，或邮寄至以下地址：Galaxy Holdings 的电信服务点，具体地址以双方协商一致为准。</span> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.4.退货申请时间将根据以下方式计算：</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 如果客户通过邮寄或快递寄送：时间以邮局或快递公司的收据盖章日期为准。</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 如果客户亲自将商品送至退货中心：时间以 Galaxy Holdings 工作人员收到客户退回的商品日期为准。</span></p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.5.退货费用</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 对于因 Galaxy Holdings 或供应商 (NCC) 的错误而退回的产品，客户将免除退货费用。客户应承担退货运费或应付给第三方的其他费用。</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.3. 退款政策</strong></span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">4.3.1.退款原则</span></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;当客户已向 Galaxy Holdings 付款但随后出现问题时，例如缺货或客户已收到货物但根据第4.2 条规定要求换货或退货，则可进行退款。</span> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">- 不适用于低于 1,000 越南盾的退款申请。</span></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;退款处理时间以工作日计算（不包括周六、周日、节假日和春节假期，具体视情况而定）。</span></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;退款条件顾客使用礼品码：在 Galaxy Holdings 接受顾客使用礼品码退款的特殊情况下，Galaxy Holdings 不会退还顾客已使用的礼品码金额，而只会退还顾客实际购买时花费的金额。</span></p><p > <span style="font-size:12.0pt;line-height:150%;">4.3.2. 退款方式</span></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;通过银行转账退款：顾客联系 Galaxy Holdings 客服中心，提供相关信息并按照指示操作。</span></p><p > <span style="font-size:12.0pt;line-height:150%;">4.3.3.处理时间</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- Galaxy Holdings 将在收到退回产品之日起最多 7 个工作日内通过电子邮件和/或短信向客户发送退货请求回复。</span></p><p > <span >注意：</span><span style="font-size:12.0pt;line-height:150%;">如果产品在运输至 Galaxy Holdings 退货中心的过程中损坏，Galaxy Holdings 概不负责。</span> 
</p> 
<p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.4. 修改</strong></span></i></p><p > <span >- 产品购买后，产品信息和数据包无法根据特定要求进行更改或定制；它们按原样提供。</span></p><p><span>- 如需了解更多详细信息，请联系 skyfi.vn 客服或致电 1900 6605 寻求帮助。谢谢！</span></p><p><span><strong>5. 保修政策</strong></span></p><p><span>保修政策</span><span style="font-family:&quot;Segoe UI Symbol&quot;,sans-serif;font-size:12.0pt;line-height:150%;" lang="EN-GB"> 🗹 </span><span>是</span><span style="font-family:&quot;Segoe UI Symbol&quot;,sans-serif;font-size:12.0pt;line-height:150%;" lang="EN-GB"> </span><span > 否</span> 
</p><p > <span ><strong>6. Galaxy Holdings 和客户的义务</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>6.1. Galaxy Holdings 的义务</strong></span></i></p><p > <span >- 确保按照 Galaxy Holdings 在网站上公布的服务质量标准，为客户提供服务。</span><a href="https://Skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" <span>SkyFi 应用程序和 Galaxy Holdings 的电信服务点均会向客户提供以下信息：地面移动通信服务（预付费）供应和使用合同、用户信息确认、一般交易条款；</span></p><p><span>- 确保根据地面移动通信服务（预付费）供应和使用合同、用户信息确认、一般交易条款正确、完整、准确地计算服务价格；</span></p> 
<p> 
<span>- 至少在服务到期日前 7 个工作日，以约定的方式通知客户继续使用服务的费用支付事宜；</span></p><p><span>- 至少在服务到期日前 7 个工作日，以约定的方式通知客户服务终止时间；</span></p><p><span>- 对客户信息保密，仅在获得客户同意的情况下，才会将客户信息用于任何其他用途，并不会将客户信息转移给任何第三方。</span></p除双方另有约定、国家机关要求或法律另有规定外，未经客户同意；</span></p><p><span>- 在服务暂时中止的情况下（已注销并重新使用的用户号码除外），在客户履行其义务后，于规定的期限内恢复客户对服务的使用；</span></p><p><span>- 当客户报告服务质量问题时，及时检查并解决；</span></p><p><span>- 在法律规定的期限内解决客户投诉；</span></p><p><span>- 在电信服务业务暂停的情况下，至少提前30天通知客户。</span></p> Galaxy Holdings 仅在满足以下条件时方可停止提供部分或全部电信服务：(a) 已制定计划，根据《地面移动通信服务提供和使用合同（预付费形式）》、《用户信息确认书》以及已签署的电信服务提供和使用通用交易条款及相关方的规定，保障电信服务用户的合法权益；(b) 已将停止电信服务的情况通知主管国家机关。</span> 
</p><p><span>- Galaxy Holdings 负责确保其合作伙伴依法对客户信息保密。</span>本条款适用于客户同意 Galaxy Holdings 为约定目的向其合作伙伴提供客户信息的情况。</span></p><p><span>- 接受主管国家机关的监管，并遵守有关确保电信基础设施安全和信息安全的法规。</span></p><p><span>- 确保电信用户在同一类型电信服务内更换电信服务提供商时，其电信用户号码能够按照法律规定保留。</span></p><p><span>- 向电信服务用户提供完整的电信用户信息，该信息应与签订地面移动通信服务合同（预付费付款单）、用户信息确认函以及法律规定的通用交易条款中提供的身份证明文件上的信息相符。</span></p><p><span>- 对电信用户信息进行身份验证、存储和使用，并处理电信用户信息不完整或不准确的 SIM 卡。</span></p><p><span>- 根据相关规定，防止、打击和拦截非法短信和电话。</span></p政府法规；</span></p><p><span>- 停止向违反电信法律的电信用户提供电信服务。</span></p><p><span>- Galaxy Holdings 承诺遵守《地面移动通信服务提供和使用合同（预付费支付方式）》、《用户信息确认书》和《Galaxy Holdings 一般交易条款》的全部内容，包括经主管国家机构批准后，在服务柜台或 Galaxy Holdings 网站 https://Skyfi.vn 和 SkyFi 应用程序上张贴的任何修订和补充条款，并在双方签署《地面移动通信服务提供和使用合同（预付费支付方式）》、《用户信息确认书》和《一般交易条款》之前提供给客户的任何修订和补充条款。客户如不同意这些修订和补充条款，有权终止使用该服务。</span></p>如果客户继续使用该服务，则表示其已同意，并且这些修改和补充条款将自主管国家机构批准《地面移动通信服务提供和使用合同（预付费支付方式）、用户信息确认书和一般交易条款》之日起生效。适用于《消费者权益保护法》第3条第1款所规定的消费者服务用户，该服务用户属于消费者范畴。</span> 
</p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>6.2.客户的义务</strong></span></i></p><p><span>- 按时足额支付电信服务费用；</span></p><p><span>- 赔偿因自身过错给 Galaxy Holdings 和电信服务代理商造成的直接损失；</span></p><p><span>- 对其已与 Galaxy Holdings 签订地面移动通信服务提供和使用合同（预付费形式）及一般交易条款的电信用户号码的使用承担法律责任；</span></p><p><span>- 对其在电信网络上发送和存储的信息内容承担法律责任；</span></p><p><span>-
不得
利用 Galaxy Holdings 的电信基础设施开展电信服务业务；</span></p><p><span>- 不得利用电信网络威胁、骚扰、歪曲、诽谤或侮辱 Galaxy Holdings 的声誉、荣誉或尊严。</span></p其他个人/组织的产品；</span></p><p><span>- 在《地面移动通信服务提供和使用合同（预付费付款表格）》和《用户信息确认书》中提供符合国家法规的准确信息；</span></p><p><span>- 当文件发生变更、发现用户信息不正确或收到 Galaxy Holdings 关于信息不符合法规的通知时，有责任根据法规更新用户信息；</span></p><p><span>- 除法律允许的情况外，不得使用身份证件上的信息为他人签署《地面移动通信服务提供和使用合同（预付费付款表格）》、《用户信息确认书》和《地面移动通信服务提供和使用通用条款和条件》；</span></p><p><span>- 保护您的密码、通行码和终端；</span></p><p><span>- 如果 SIM 卡丢失，客户必须请立即前往 Galaxy Holdings 的服务网点或使用 SkyFi 应用程序（App）完成新 SIM 卡的补办流程，或请求 Galaxy Holdings 暂时中止您的出站服务。如您未能遵守上述规定，您仍需支付已产生的费用，直至您正式通知 Galaxy Holdings，且 Galaxy Holdings 无义务退还您已产生的费用。如遇紧急情况，客户可拨打 19006605 暂时阻止拨出电话；</span></p><p> 
<span>- 客户承诺遵守《地面移动通信服务提供及使用合同（预付费支付方式）》、《用户信息确认书》和 Galaxy Holdings 的《一般交易条款》的全部内容，包括经主管国家机构批准后，在服务柜台或 Galaxy Holdings 网站 https://Skyfi.vn 和 SkyFi 应用程序上发布的所有修订和补充条款，并在双方签署《地面移动通信服务提供及使用合同（预付费支付方式）》、《用户信息确认书》和 Galaxy Holdings 的《一般交易条款》之前提供给客户的所有修订和补充条款。客户如不同意这些修订和补充条款，有权终止使用该服务。</span></p>如果客户继续使用服务，则表示其已同意，并且这些修改和补充条款将自主管国家机构批准《地面移动通信服务提供和使用合同（预付费支付方式）》、《用户信息确认书》和《一般交易条款》之日起生效。《地面移动通信服务提供和使用合同（预付费支付方式）》、《用户信息确认书》和《一般交易条款》的规定适用于根据《消费者权益保护法》第三条第一款规定属于消费者的服务用户。</span> 
</p><p><span><strong>7. 服务质量标准</strong></span></p><p><span>Galaxy Holdings 根据已向科技部公布并在网站 https://skyfi.vn 和 SkyFi 应用程序上列出的服务质量标准提供服务。</span></p><p><span><strong>8.价格与付款</strong></span></p><p > <i><span >-&nbsp;</span></i><span >产品价格可能包含也可能不包含增值税，具体信息请参见产品介绍页面。在任何情况下，产品价格均不包含运费。&nbsp;</span></p><p > <i><span >-&nbsp;</span></i><span >客户应在收到订单产品前支付订单款项。客户点击“付款”按钮进行付款，即表示 (i) 客户确认已阅读并理解订单信息； (ii) 客户同意本条款和条件适用于该订单中的产品购买。</span> 
</p><p><i><span>-</span></i><span>Galaxy Holdings 保留在某些情况下自行决定拒绝客户使用信用卡付款的权利。</span></p><p><i><span>- 为确保支付安全，客户应注意：</span></i></p><p><span>+ 仅通过应用程序的链接窗口进行在线支付；</span></p><p><span>+ 妥善保管并妥善使用您的卡片（信用卡、ATM 卡、采购卡等）及账户信息/卡片信息；</span></p><p><span>+ 请勿将卡片借给他人或允许他人使用卡片在应用程序上进行购物。</span></p>一旦应用程序检测到任何异常交易，客户需要立即联系我们的客户服务中心：19006605（以下简称“客户服务中心”）或发卡银行的呼叫中心，以便及时处理；</span></p><p > <span >+ 在任何情况下，使用国际信用卡/借记卡时，请客户不要透露 CVV/CVC/CSC 号码（安全码，印在卡背面的一组三位数字），以确保卡片信息安全；</span></p><p style="line-height:150%;margin-bottom:.0001pt;text-align:justify;"> <span style="font-size:12.0pt;line-height:150%;">&nbsp;</span><span ><strong>9.产品运输和配送</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.1. 配送范围</strong></span></i> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">- Galaxy Holdings 可将产品配送至全国各地客户指定的地点 (*)。</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;">(*) 除办公区域和高层公寓等受限区域外，订单将配送至客户家中。在这些受限区域，如客户需要送货上门，请致电客户服务中心寻求帮助。</span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;客户根据本条款规定，通过订单或电话指定接收产品的人员统称为“收货人”。</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 应 Galaxy Holdings 的要求，收货人必须出示身份证件等身份证明文件，供送货人员在接收货物前核实。</span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.2.配送时间</strong></span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">配送时间：</strong>根据 Galaxy Holdings 物流合作伙伴的规定</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.3. 配送费</strong></span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">- 配送费将根据地区和配送时间单独通知。</span></p> 
<p > 
<i><span >-</span></i><span >收件人必须根据物流单位的规定，在收到产品后检查产品并签署送货单。产品的风险和所有权自收货人签署送货单之时起转移给客户。</span></p>客户需保留送货单，以便核对或解决可能出现的与产品相关的任何问题（如有）。超过退货政策中规定的退货期限后，任何与产品相关的问题（如有）将不予解决。</span></p><p > <span ><strong>10. 客户服务与投诉处理</strong></span></p><p > <span >- 如有任何疑问或投诉，包括但不限于商品/服务质量、产品交付、送货人员态度、产品更换/退货等，客户可联系客户服务中心<strong>19006605</strong>或发送电子邮件至</span><a href="mailto:customercare@skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" <span style="font-size:12.0pt;line-height:150%;">-</span><span>联系客服中心时，客户必须提供 Galaxy Holdings 发送给客户的电子邮件或订单确认信息中所示的订单号。客服中心将尽快收到并回复客户。</span></p><p><span><strong>11. 信息安全</strong></span></p><p><span>- 我们的应用程序重视信息安全，并采取最佳措施保护客户信息和支付安全。支付过程中，客户信息将被加密以确保安全。客户完成订购流程后，将退出安全模式。</span></p><p><span>- 客户不得使用任何程序、工具或其他方式干扰系统或更改数据结构。</span></p>本应用程序还严格禁止传播、散布或鼓励任何旨在干扰、破坏或渗透系统数据的活动。违反本条款的个人或组织将被剥夺所有权利，必要时将依法追究其法律责任。</span> 
</p><p><span>- 所有交易信息均会保密，但如有执法机构要求，我们将被迫向其提供这些信息。</span></p><p><span>- 在线支付时，请注意以下事项：</span></p><p><span>+ 仅使用具有安全支付证书的应用程序。</span></p><p><span>+ 绝对不要将您的信用卡或账户借给他人用于应用程序支付。</span></p><p><span>+ 如遇意外交易，请联系客服中心以获得及时帮助。</span></p><p><span>+ 定期查看您的银行账户，确保所有银行卡交易均在掌控之中。</span></p><p><span><strong>12.责任限制</strong></span></p><p><span>- 在任何情况下，Galaxy Holdings 对风险从 Galaxy Holdings 转移至客户后客户所承担的任何损失/损害概不负责。</span></p><p><span>- 对于客户通过应用程序购买产品时 Galaxy Holdings 提供的赠品：Galaxy Holdings 员工/分销渠道和批发客户有义务根据科技部的规定登记最终用户的订阅者信息。</span> 
</p><p><span><strong>13.通用条款</strong></span></p><p><span>- 本通用条款中所述的各项规定是本条款和条件不可分割的一部分。</span></p><p><span>- Galaxy Holdings 和客户均有责任履行本条款和条件中规定的所有义务。</span></p><p><span>- 如果任何有管辖权的机构认定本条款和条件中的任何内容全部或部分无效或不可执行，则本条款和条件中其他内容的有效性不受影响。</span></p><p><span>- 本条款和条件以及 Galaxy Holdings 与客户之间合同关系中产生的任何问题均应根据越南法律的规定进行解释和管辖。因本条款和条件的内容引起或与之相关的任何争议、分歧或投诉，应在三十 (30) 天内通过友好协商解决。</span></p如果在此三十 (30) 天期限内无法解决，则上述争议或投诉可提交有管辖权的法院解决。</span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;text-align:center;" align="center"> <span ><strong>---------------***---------------</strong></span></p></div>`,
    },
    "zh-TW": {
        title: '一般交易條款', content: `<div class="sub-container"><p > <span >歡迎各位顧客使用由銀河數位控股有限公司（以下簡稱「銀河控股」或「我們」）建立並擁有的官方線上銷售應用程式。 </span></p><p > <span ><strong>關於我們：</strong></span></p><p > <span >- <strong>電信服務供應商：</strong>銀河數位控股有限公司</span></p><p > <span >- <strong>電信服務供應商編號：</strong>：許可證 41/GP-CVT do，由資訊通訊部於2月6日頒發， 2025.</span></p><p > <span >- <strong>營業執照：</strong></span><span></p><p > <span >- <strong>營業執照：</strong></span><span style="font-size:12.0pt;line-height:150%;">0316951481，胡志明市計畫投資廳於2021年8月13日頒發。 </span></p><p > <span >- <strong>地址：</strong></span><span style="font-size:12.0pt;line-height:150%;">PV Gas大廈，胡志明市芽北郡福堅坊友壽街673號。 </span></p越南胡志明市</span></p><p > <span >- <strong>電話：</strong></span><span style="font-size:12.0pt;line-height:150%;">028 7300 6555</s></ppan> <ppan> href="mailto:customercare@skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" <a href="https://www.vietnamobile.com.vn/product/chinh-sach/thong-bao-xu-can-duhan">s<d style="color:windowtext;font-size:12.0pt;line-height:150%;text-decoration:none;text-underline:none;" lang="EN-GB">customercare@skyfi.vn 
</span> 
</a> </p> <p > <snbomers>-6060606064p; <p > <span >客戶造訪我們的應用程式即表示客戶同意這些條款和條件以及&nbsp;</span><a href="https://www.vietnamobile.com.vn/product/chinh-sach/thong-bao-xu-ly-du-lieu-ca-nhan/"><span style="color:windowtext;font-size:12.0pt;line-height:150%;text-decoration:none;text-underline:none;" lang="EN-GB">個人資料保護政策</span></a><span >。我們保留隨時更改、修改、新增或刪除這些條款和條件任何部分的權利。條款變更一經發佈在應用程式上即刻生效，無需事先通知。客戶在條款和條件變更發布後繼續使用應用程序，即表示客戶已接受這些變更。請定期查看我們的變更更新。 </span></p><p > <span ><strong>1. 適用範圍</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>1.1.本條款及細則適用於以下客戶：</strong> 購買 Galaxy Holdingsp.的產品及使用服務（「<strong>產品</strong>」）。 </span></p><p > <span >- 需要根據應用程式上不時發布的「配送政策」將產品配送至指定地點。 </span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>1.2.在應用程式上購買產品時，客戶必須提供以下文件才能根據合約格式和一般交易條款完成合約簽訂：</strong></span></i></ppan></i> 
</ppan> 
<span>個人：越南公民需提供有效期限有效的護照原件、公民身分證、身分證、電子身分證或電子身分帳戶原件，外國公民需提供在越南境內有效期限內有效的護照正本（以下統稱身分證明文件）；</span></p><p><span>-組織：組織成立決定書正本或經認證的副本、營業執照及稅務登記證正本、投資許可證正本或企業註冊證正本（以下統稱法人資格證照），以及組織法定代表人的身分證明文件。對於行動通訊服務，組織必須提供一份組織成員名單（需經組織確認），該名單列明了根據組織與電信企業簽訂的標準合約和一般交易條款（如組織向用戶提供服務）獲準使用電信服務的成員，並附上每位成員的身份證明文件原件。 </span></p>如果根據標準格式和一般交易條款訂立合約的客戶並非組織的法定代表人，則必須提供法定代表人的授權書及其身份證明文件；</span></p><p><span>- 對於未滿 14 歲的客戶或根據《民法典》規定受監護的人，根據標準格式和律師條款、代表父親訂立為父親。 </span></p><p><span>（根據 2024 年 12 月 24 日政府第 163/2024/ND-CP 號法令執行）</span><span style="font-size:12.0pt;letter-spacing:.1pt;line-height">150%;）。 </span></p><p><span><strong>2.商品和服務提供中的條件或限制</strong></span></p><p > <span >- 為確保公平和最終消費者客戶的利益，Galaxy Holdings有權在實施促銷活動時施加限制性條件：例如，不設購買數量限制、限制客戶在每個促銷活動中可購買的產品數量上限、限制購買產品套裝的用途（僅限消費，不得用於商業用途、轉售等），或在每個促銷活動中詳細規定的其他限制（如有）。以下這些限制統稱為「促銷政策」。 </span> 
</p><p><span>因此，Galaxy Holdings有權不確認、拒絕、取消或召回違反促銷政策任何內容的已交付產品。 </span></p><p><span>- 如果個人或組織不符合以下任一條件，Galaxy Holdings有權拒絕提供產品：提交的用於註冊用戶資訊的文件不符合規定；提交的用於註冊用戶資訊的文件不清晰，無法確保文件的數位化清晰、銳利且資訊完整；或身分證明文件經認證後資訊不符或無法認證。 </span></p><p><span><strong>3.結帳政策</strong></span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:27.0pt;text-align:justify; <ipt> style="font-size:12.0pt;line-height:150%;"><strong>3.1.&nbsp;&nbsp;訂購步驟</strong></span></i></p><p > <span>- 當客戶透過應用程式下訂單時，我們將收到訂單請求並向客戶發送訂單號碼。 </span></p><p > <span>- 為了快速確認訂單請求，客戶必須提供與配送相關的正確完整訊息，或客戶參與的促銷活動（如有）的條款和條件。 </span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:27.0pt;text-align:justify;"> <i><span style="font-size:12.0pt;line-height:150%;"><strong>3.2.&nbsp;&nbsp;產品檢驗政策</strong></span></i></p><p > <span>- 產品承諾與應用程式上的詳細描述一致。 </span> 
</p> 
<p > <span>- 對於 eSIM：購買產品並成功付款後，客戶將收到 Galaxy Holdings 發送的電子郵件通知，其中包含所購 eSIM 的資訊。收到訊息後，客戶應核對 eSIM 資訊。 eSIM 產品不直接出貨，因此沒有產品檢驗政策。 </span></p><p > <span>- 對於實體 SIM 卡：付款並收到產品後，客戶應核對數量、封條、型號資訊和有效期是否與訂單相符。 </span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;tab-stops:9.0pt;text-align:justify;"> <span ><strong>4.產品更換與退貨政策</strong></s></span> style="font-size:12.0pt;line-height:150%;">本應用程式的產品更換和退貨政策規定了可接受的退貨理由、退貨要求以及處理客戶退貨所需的時間。 </span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.1.接受退貨的原因</strong></span></i></p><p > <span style="font-size:12.00%;產品已拆封，或交付的數量、資訊和型號與訂單不符。 </span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 產品因製造商錯誤（技術故障、設計錯誤、內容錯誤）或運輸過程中的錯誤（變形、刮傷、破裂等）而損壞。 </span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 產品在交付給客戶之日或之前過期。 </span></p><p > 
<i><span style="font-size:12.0pt;line-height:150%;"><strong>4.2.退貨產品的要求</strong></span></i> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.1.退貨條件：</span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 產品完好無損，標籤齊全，並符合原始缺陷（產品運輸過程中符合原始缺陷）。 </span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 產品仍在有效期限內。 </span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 產品乾淨，無使用痕跡。 </span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 客戶仍可在銀行應用程式上查看購買確認資訊（訂單號碼、電子發票、送貨單、銀行對帳單等）。 </span></p><p > <span <p><span style="font-size:12.0pt;line-height:150%;">4.2.2. 退貨適用時間：</span></p><p><span style="font-size:12.0pt;line-height:1<p><span style="font-size:12.0pt;line-height:150%;天的時間提交退貨申請。 </span></p><p><span style="font-size:12.0pt;line-height:150%;">4.2.3.退貨地點：</span></p><p > <span style="font-size:12.0pt;line-height:150%;">-客戶需攜帶產品及相關文件，包括應用程式上的購買確認文件（訂單號碼、電子購買發票、送貨單等），前往 Galaxy Holdings 的交易門市，或郵寄至以下地址：Galaxy Holdings 的電信服務點，具體地址以雙方協商一致為準。 </span> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.4.退貨申請時間將依照下列方式計算：</span></p><p > <span style="font-size:12.0pt;line-height:150%;若客戶以郵寄或快遞寄送：時間以郵局或快遞公司的收據蓋章日期為準。 </span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 如果客戶親自將商品送至退貨中心：時間以 Galaxy Holdings 工作人員收到客戶退回的商品日期為準。 </span></p><p > <span style="font-size:12.0pt;line-height:150%;">4.2.5.退貨費用</span></p><p > <span style="font-size:12.0pt;line-height:150% > <span style="font-size:12.0pt;line-height:150% >">- 對於因 Galaxy Holdings 客戶的錯誤供應商的費用而退回產品的費用。客戶應承擔退貨運費或應付給第三方的其他費用。 </span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.3. 退款政策</strong></span></i></p><p > <span style="font-size:12.0pt;max-height:150% <ppan style="font-size:12.0pt;line-height:150%;">-&nbsp;當客戶已向 Galaxy Holdings 付款但隨後出現問題時，例如缺貨或客戶已收到貨物但根據第4.2 條規定要求換貨或退貨，則可進行退款。 </span> 
</p><p > <span style="font-size:12.0pt;line-height:150%;">- 不適用於低於 1,000 越南盾的退款申請。 </span></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;退款處理時間以工作日計算（不包括週六、週日、假日和春節假期，視情況而定）。 </span></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;退款條件顧客使用禮品碼：在 Galaxy Holdings 接受顧客使用禮品碼退款的特殊情況下，Galaxy Holdings 不會退還顧客已使用的禮品金額，而只會花費的顧客金額</span></p><p > <span style="font-size:12.0pt;line-height:150%;">4.3.2. 退款方式</span></p><p > <span style="font-size:12.0pt;line-height:150% > <span style="font-size:12.0pt;line-height:150% > <span style="font-size:12.0pt;line-height:150% >">-&nbsp;&nbsp; 聯絡人資訊; </span></p><p > <span style="font-size:12.0pt;line-height:150%;">4.3.3.處理時間</span></p><p > <span style="font-size:12.0pt;line-height:150% > <span style="font-size:12.0pt;line-height:150%;">- Holdings 將在工作日內退回客戶</span></p><p > <span >注意：</span><span style="font-size:12.0pt;line-height:150%;">如果產品在運送至 Galaxy Holdings 退貨中心的過程中損壞，Galaxy Holdings 概不負責。 </span> 
</p> 
<p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>4.4. 修改</strong></span></i></p><p > <span >- 產品購買後，產品資訊和資料包無法依照特定要求進行變更或自訂； </span></p><p><span>- 如需了解更多詳細信息，請聯繫 skyfi.vn 客服或致電 1900 6605 尋求協助。謝謝！ </span></p></p><p><span><strong>5. 保固政策</strong></span></p><p><span>保固政策</span><span style="font-family:&quot;Segoe UI Symbol&quot;,sans-erif;font-size：12.010% ; </span><span>是</span><span style="font-family:&quot;Segoe UI Symbol&quot;,sans-serif;font-size:12.0pt;line-height:150%;" lang="EN-GB"> </span><span > 否</span> 
</p><p > <span ><strong>6. Galaxy Holdings 和客戶的義務</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>6.1. Galaxy Holdings</strong> (<span> 的義務Galaxy Holdings 在網站上公佈的服務品質標準，為客戶提供服務。 </span><a href="https://Skyfi.vn"><span style="color:windowtext;font-size:12.0pt;line-height:150%;" <span>SkyFi 應用程式和 Galaxy Holdings 的電信服務點都會提供客戶以下資訊：地面行動通訊服務（預付費）使用合約、用戶資訊<確保根據地面行動通訊服務（預付）供應和使用合約、用戶資訊確認、一般交易條款正確、完整、準確地計算服務價格；</span></p> 
<p> 
<span>- 至少在服務到期日前 7 個工作日，以約定的方式通知客戶繼續使用服務的費用支付事宜；</span></p><p>個工作日，以約定的方式通知客戶服務終止時間；</span></p><p><span>- 對客戶資訊保密，僅在獲得客戶同意的情況下，才會將客戶資訊用於任何其他用途，並不會將客戶資訊轉移給任何第三方。 </span></p除雙方另有約定、國家機關要求或法律另有規定外，未經客戶同意；</span></p><p><span>- 在服務暫時中止的情況下（已註銷並重新使用的用戶號碼除外），在客戶履行其義務後，於規定的期限內恢復客戶對服務的使用；</span></ppan><span>當客戶報告服務品質問題時，及時檢查並解決；</span></p><p><span>- 在法律規定的期限內解決客戶投訴；</span></p><p><span>- 在電信服務業務暫停的情況下，至少提前30天通知客戶。 </span></p> Galaxy Holdings 僅在滿足以下條件時方可停止提供部分或全部電信服務：(a) 已製定計劃，根據《地面移動通訊服務提供和使用合約（預付費形式）》、《用戶資訊確認書》以及已簽署的電信服務提供和使用通用交易條款及相關方的規定，保障服務使用者的合法權益；電信</span> 
</p><p><span>- Galaxy Holdings 負責確保其合作夥伴依法對客戶資訊保密。 </span>本條款適用於客戶同意 Galaxy Holdings 為約定目的向其合作夥伴提供客戶資訊的情況。 </span></p><p><span>- 接受主管國家機關的監管，並遵守有關確保電信基礎設施安全和資訊安全的法規。 </span></p><p><span>- 確保電信用戶在同一類型電信服務內更換電信服務供應商時，其電信用戶號碼能夠依照法律規定保留。 </span></p><p><span>- 向電信服務用戶提供完整的電信用戶信息，該信息應與簽訂地面移動通信服務合同（預付費付款單）、用戶信息確認函以及法律規定的通用交易條款中提供的身份證明文件上的信息相符。 </span></p><p><span>- 對電信用戶資訊進行身份驗證、儲存和使用，並處理電信用戶資訊不完整或不準確的 SIM 卡。 </span></p><p><span>- 根據相關規定，防止、打擊和攔截非法簡訊和電話。 </span></p政府法規；</span></p><p><span>- 停止向違反電信法律的電信使用者提供電信服務。 </span></p><p><span>- Galaxy Holdings 承諾遵守《地面行動通訊服務提供和使用合約（預付費支付方式）》、《用戶資訊確認書》和《Galaxy Holdings 一般交易條款》的全部內容，包括經主管國家機構批准後，在服務櫃檯或 Galaxy Holdings 網站 https://Skyfi.vn 和 SkyFi應用程式上張貼的任何修訂和補充條款，並在雙方簽署《地面行動通訊服務提供和使用合約（預付付款方式）》、《使用者資訊確認書》和《一般交易條款》之前提供給客戶的任何修訂和補充條款。客戶如不同意這些修訂和補充條款，有權終止使用該服務。 </span></p>如果客戶繼續使用該服務，則表示其已同意，並且這些修改和補充條款將自主管國家機構批准《地面移動通訊服務提供和使用合約（預付費支付方式）、用戶資訊確認書和一般交易條款》之日起生效。適用於《消費者權益保護法》第3條第1款所規定的消費者服務用戶，此服務用戶屬於消費者範疇。 </span> 
</p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>6.2.客戶的義務</strong></span></i></p><p><span>- 按時足額支付電信服務費用；及電信服務代理商造成的直接損失；</span></p><p><span>- 對其已與 Galaxy Holdings 簽訂地面移動通訊服務提供及使用合約（預付費形式）及一般交易條款的電信用戶號碼的使用承擔法律責任；</span></p><p><span>- 對其在電信內容網路上發送法律責任和儲存的資訊 
的電信基礎設施進行電信服務業務；</span></p><p><span>- 不得利用電信網路威脅、騷擾、歪曲、誹謗或侮辱 Galaxy Holdings 的聲譽、榮譽或尊嚴。 </span></p其他個人/組織的產品；</span></p><p><span>- 在《地面移動通訊服務提供和使用合約（預付付款表格）》和《用戶資訊確認書》中提供符合國家法規的準確資訊；</span></p><p><span>- 當文件變更、發現用戶資訊不正確或發現用戶資訊關於資訊不符合法規的通知時，有責任根據法規更新使用者資訊；</span></p><p><span>- 除法律允許的情況外，不得使用身分證件上的資訊為他人簽署《地面行動通訊服務提供和使用合約（預付付款表格）》、《使用者資訊確認書》和《地面行動通訊服務提供和使用條款與條件》；保護您的密碼、通行碼和終端；</span></p><p><span>- 如果 SIM 卡遺失，客戶必須請立即前往 Galaxy Holdings 的服務網點或使用 SkyFi 應用程式（App）完成新 SIM 卡的補辦流程，或請 Galaxy Holdings 暫時中止您的出站服務。如您未能遵守上述規定，您仍需支付已產生的費用，直至您正式通知 Galaxy Holdings，且 Galaxy Holdings 無義務退還您已產生的費用。如遇緊急情況，客戶可撥打 19006605 暫時阻止撥出電話；</span></p><p> 
<span>- 客戶承諾遵守《地面行動通訊服務提供及使用合約（預付費支付方式）》、《用戶資訊確認書》和 Galaxy Holdings 的《一般交易條款》的全部內容，包括推出指導國家公司/應用程式上發布的所有修訂和補充條款，並在雙方簽署《地面行動通訊服務提供及使用合約（預付付款方式）》、《用戶資訊確認書》和 Galaxy Holdings 的《一般交易條款》之前提供給客戶的所有修訂和補充條款。客戶如不同意這些修訂和補充條款，有權終止使用該服務。 </span></p>如果客戶繼續使用服務，則表示其已同意，並且這些修改和補充條款將自主管國家機構批准《地面移動通信服務提供和使用合約（預付費支付方式）》、《用戶資訊確認書》和《一般交易條款》之日起生效。 《地面行動通訊服務提供與使用合約（預付支付方式）》、《使用者資訊確認書》及《一般交易條款》的規定適用於依據《消費者權益保護法》第三條第一款規定屬於消費者的服務使用者。 </span> 
</p><p><span><strong>7. 服務品質標準</strong></span></p><p><span>Galaxy Holdings 根據已向科技部公佈並在網站 https://skyfi.vn 和 SkyFi 應用程式上列出的服務品質標準提供服務。 </span></p><p><span><strong>8.價格與付款</strong></span></p><p > <i><span >-&nbsp;</span></i><span >產品價格可能包含或不包含增值稅，具體資訊請參閱產品介紹頁。在任何情況下，產品價格均不包含運費。 &nbsp;</span></p><p > <i><span >-&nbsp;</span></i><span >客戶應在收到訂單產品前支付訂單款項。客戶點選「付款」按鈕付款，即表示 (i) 客戶確認已閱讀並瞭解訂單資訊； (ii) 客戶同意本條款與條件適用於該訂單中的產品購買。 </span> 
</p><p><i><span>-</span></i><span>Galaxy Holdings 保留在某些情況下自行決定拒絕客戶使用信用卡付款的權利。 </span></p><p><i><span>- 為確保支付安全，客戶應注意：</span></i></p><p><span>+ 僅透過應用程式的連結視窗進行線上付款；</span></p><p><span>+ 妥善保管並妥善使用您的卡片（ppan>）、購買卡片（ppan>）等資訊（ppan>><請勿將卡片借給他人或允許他人使用卡片在應用程式上進行購物。 </span></p>一旦應用程式偵測到任何異常交易，客戶需要立即聯絡我們的客戶服務中心：19006605（以下簡稱「客戶服務中心」）或發卡銀行的呼叫中心，以便及時處理；</span></p><p > <span >+ 在任何情況下，使用國際信用卡/金融卡時，請客戶不要透露 CVV/CSCV號碼（安全碼，印在卡片背面的一組三位數字），以確保卡片資訊安全；</span></p><p style="line-height:150%;margin-bottom:.0001pt;text-align:justify;"> <span style="font-size:12.0pt;text-align:justify;"> <span style="font-size:12.0pt;line-height:150%; ><strong>9.產品運輸與配送</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.1.配送範圍</strong></span></i> 
</p><p~ <strong>9.1.配送範圍</strong></span></i> </p><p-pts">59.5%;產品可配送至全國各地顧客指定的地點 (*)。 </span></p><p > <i><span style="font-size:12.0pt;line-height:150%;">(*) 除辦公區域和高層公寓等受限區域外，訂單將配送至客戶家中。在這些受限區域，如客戶需要送貨上門，請致電客戶服務中心尋求協助。 </span></i></p><p > <span style="font-size:12.0pt;line-height:150%;">-&nbsp;客戶依本條款規定，透過訂單或電話指定接收產品的人員統稱為「收貨人」。 </span></p><p > <span style="font-size:12.0pt;line-height:150%;">- 應 Galaxy Holdings 的要求，收貨人必須出示身分證件等身分證明文件，供送貨人員在接收貨物前核實。 </span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.2.配送時間</strong></span></i></p><p > <span style="font-size:12.0pt;text-align:justify;"><strong>物流夥伴的規定</strong></span></p><p > <i><span style="font-size:12.0pt;line-height:150%;"><strong>9.3. 配送費</strong></span></i></p>
<p > 
<i><span >-</span></i><span >收件人必須依照物流單位的規定，在收到產品後檢查產品並簽署送貨單。產品的風險和所有權自收貨人簽署送貨單之時起轉移給客戶。 </span></p>客戶需保留送貨單，以便核對或解決任何可能出現的與產品相關的問題（如有）。超過退貨政策中規定的退貨期限後，任何與產品相關的問題（如有）將不予解決。 </span></p><p > <span ><strong>10. 客戶服務與投訴處理</strong></span></p><p > <span >- 如有任何疑問或投訴，包括但不限於商品/服務品質、產品交付、送貨人員態度、產品更換/退貨等，客戶可聯絡客戶服務中心 <strong>19006605 <a href="mailto:customercare@skyfi.vn"></a> </strong><span style="color:windowtext;font-size:12.0pt;line-height:150%;" <span style="font-size:12.0pt;line-height:150%;">-</span><span>必須聯絡網站提供訂單時給客戶端給客戶的資訊。客服中心將盡快收到並回覆客戶。 </span></p><p><span><strong>11. 資訊安全</strong></span></p><p><span>- 我們的應用程式重視資訊安全，並採取最佳措施保護客戶資訊和支付安全。支付過程中，客戶資訊將被加密以確保安全。客戶完成訂購流程後，將退出安全模式。 </span></p><p><span>- 客戶不得使用任何程式、工具或其他方式乾擾系統或更改資料結構。 </span></p>本應用程式也嚴格禁止傳播、散佈或鼓勵任何旨在幹擾、破壞或滲透系統資料的活動。違反本條款的個人或組織將被剝奪所有權利，必要時依法追究其法律責任。 </span> 
</p><p><span>- 所有交易資訊都會保密，但如有執法機關要求，我們將被迫向其提供這些資訊。 </span></p><p><span>- 線上付款時，請注意以下事項：</span></p><p><span>+ 僅使用具有安全支付證書的應用程式。 </span></p><p><span>+ 絕對不要將您的信用卡或帳戶借給他人用於應用程式付款。 </span></p><p><span>+ 如遇意外交易，請聯絡客服中心以獲得及時協助。 </span></p><p><span>+ 定期查看您的銀行帳戶，確保所有銀行卡交易均在掌控之中。 </span></p><p><span><strong>12.責任限制</strong></span></p><p><span>- 在任何情況下，Galaxy Holdings 對風險從 Galaxy Holdings 轉移至客戶後客戶所承擔的任何損失/損害概不負責。 </span></p><p><span>- 客戶透過應用程式購買產品時 Galaxy Holdings 提供的贈品：Galaxy Holdings 員工/分銷管道和批發客戶有義務根據科技部的規定登記最終用戶的訂閱者資訊。 </span> 
</p><p><span><strong>13.通用條款</strong></span></p><p><span>- 本通用條款中所述的各項規定是本條款和條件不可分割的一部分。 </span></p><p><span>- Galaxy Holdings 和客戶均有責任履行本條款和條件中規定的所有義務。 </span></p><p><span>- 如果任何有管轄權的機構認定本條款和條件中的任何內容全部或部分無效或不可執行，則本條款和條件中其他內容的有效性不受影響。 </span></p><p><span>- 本條款與條件以及 Galaxy Holdings 與客戶之間合約關係中產生的任何問題應根據越南法律的規定進行解釋和管轄。因本條款和條件的內容引起或與之相關的任何爭議、分歧或投訴，應在三十 (30) 天內透過友好協商解決。 </span></p如果在此三十 (30) 天期限內無法解決，則上述爭議或投訴可提交有管轄權的法院解決。 </span></p><p style="background:white;line-height:150%;margin-bottom:.0001pt;text-align:center;" align="center"> <span ><strong>---------------***---------------</strong></span></p></div>`,
    }
};
export default function TermsAndConditions() {
    const local = useLocale();
    const searchParams = useSearchParams();
    const content = datamockTermsAndConditions[local] || datamockTermsAndConditions.en;
    const src = searchParams.get('src');
    const router = useRouter();
    const isVikki = src === 'vikki';
    useEffect(() => {
        trackPageView().catch(err => console.error('Track page view error:', err));
    }, []);
    return (
        <div className="flex flex-col min-h-screen">
            {(src != "app" && !isVikki)  && (<Header />)}

            <main className="flex-1 flex flex-col items-center w-full bg-white">
                {/* Banner */}
                {isVikki && (
                    <button
                        onClick={() => router.back()}
                        className="self-start w-10 h-10 justify-center rounded-full bg-gray-200 hover:bg-gray-300 flex items-center gap-2 fixed top-4 left-4 z-20"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
                <div
                    className="w-full h-[55px] md:h-[340px] flex items-center relative bg-[#ED1B2F] bg-center text-white rounded-b-3xl">
                    <img src="/assets/policy_header.png" alt="" className={"w-1/6 sm:w-fit"} />
                    <h1 className="font-bold text-[20px] md:text-[70px] leading-[1.2em]  z-10 text-center px-4">
                        {content.title}
                    </h1>
                </div>
                <div dangerouslySetInnerHTML={{ __html: content.content }} className='my-8 container' />
            </main>
            {src !== "app" && !isVikki && (<Footer />)}

        </div>
    );
}
