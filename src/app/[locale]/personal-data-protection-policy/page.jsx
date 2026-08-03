'use client';
import { trackPageView } from "@/app/utils/trackingHelper";
import { useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export const datamockPersonalDataProtection = {
    vi: {
        title: 'Chính sách bảo vệ dữ liệu cá nhân', content: `<div class="sub-container">
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:.5in;">
    &nbsp;
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:28.35pt;">
    <span style="color:black;font-size:12.0pt;" lang="VI">Chính sách bảo</span><span style="color:black;font-size:12.0pt;"> vệ dữ liệu cá nhân</span><span style="color:black;font-size:12.0pt;" lang="VI"> đối với</span><span style="color:black;font-size:12.0pt;"> Khách hàng&nbsp;</span><span style="color:black;font-size:12.0pt;" lang="VI">của&nbsp;</span><span style="color:black;font-size:12.0pt;">Galaxy Holdings/ Galaxy Telecom (sau đây gọi tắt là “</span><span style="color:black;font-size:12.0pt;" lang="VI"><strong>Chính&nbsp;</strong></span><span style="font-size:12.0pt;" lang="VI"><strong>sách</strong></span><span style="font-size:12.0pt;">”) nhằm mục đích thông báo với Khách hàng những&nbsp;</span><span style="font-size:12.0pt;" lang="VI">Dữ liệu cá nhân&nbsp;của Khách hàng&nbsp;</span><span style="font-size:12.0pt;">do&nbsp;Galaxy Holdings/ Galaxy Telecom<strong>&nbsp;</strong>xử lý</span><span style="font-size:12.0pt;" lang="VI">,</span><span style="font-size:12.0pt;"> mục đích xử lý, cách thức xử lý, thời gian lưu trữ, quyền</span><span style="font-size:12.0pt;" lang="VI">, nghĩa vụ</span><span style="font-size:12.0pt;"> của Khách hàng đối với&nbsp;</span><span style="font-size:12.0pt;" lang="VI">Dữ liệu cá nhân</span><span style="font-size:12.0pt;"> của mình theo quy định của pháp luật Việt Nam về bảo vệ Dữ liệu cá nhân. Chính sách này đồng thời đưa ra các khuyến nghị&nbsp;</span><span style="font-size:12.0pt;" lang="VI">để&nbsp;giúp&nbsp;</span><span style="font-size:12.0pt;">Khách hàng nâng cao nhận thức&nbsp;</span><span style="font-size:12.0pt;" lang="VI">v</span><span style="font-size:12.0pt;">ề bảo vệ Dữ liệu cá nhân</span><span style="font-size:12.0pt;" lang="VI">.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:28.35pt;">
    <span style="font-size:12.0pt;">Chính sách này</span><span style="font-size:12.0pt;" lang="VI"> là một phần không thể tách rời của Hợp đồng</span><span style="font-size:12.0pt;"> cung cấp và sử dụng dịch vụ thông tin di động, Bản xác nhận thông tin thuê bao đăng ký dịch vụ thông tin di động,&nbsp;</span><span style="font-size:12.0pt;" lang="VI">Điều</span><span style="font-size:12.0pt;"> kiện giao dịch chung đối với dịch vụ thông tin di động và các hợp đồng, điều khoản chung khác mà Khách hàng đã giao kết với Galaxy Holdings/ Galaxy Telecom. Chính sách này được áp dụng cho toàn bộ hoạt động cung cấp sản phẩm, dịch vụ của Galaxy Holdings/ Galaxy Telecom và áp dụng trên toàn bộ các nền tảng có tương tác với Khách hàng, bao gồm cả trên môi trường số.&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:28.35pt;">
    <span style="font-size:12.0pt;">Bằng việc tích vào ô "Tôi đã đọc và chấp thuận" hoặc "Tôi đồng ý&nbsp;với Chính sách</span><span style="font-size:12.0pt;" lang="VI">,&nbsp;</span><span style="font-size:12.0pt;">Điều khoản sử dụng của Galaxy Holdings/ Galaxy Telecom</span><span style="font-size:12.0pt;" lang="VI">”</span><span style="font-size:12.0pt;"> hoặc bằng việc ký kết hợp đồng, giao kết hợp đồng mẫu, điều kiện giao dịch chung với Galaxy Holdings/ Galaxy Telecom, hoặc bằng việc tiếp tục đăng ký, đăng nhập, sử dụng trang mạng (website) /ứng dụng (app) của Galaxy Holdings/ Galaxy Telecom&nbsp;hoặc sử dụng&nbsp;</span><span style="font-size:12.0pt;" lang="VI">s</span><span style="font-size:12.0pt;">ản&nbsp;</span><span style="font-size:12.0pt;" lang="VI">p</span><span style="font-size:12.0pt;">hẩm,&nbsp;</span><span style="font-size:12.0pt;" lang="VI">d</span><span style="font-size:12.0pt;">ịch&nbsp;</span><span style="font-size:12.0pt;" lang="VI">v</span><span style="font-size:12.0pt;">ụ&nbsp;</span><span style="font-size:12.0pt;" lang="VI">c</span><span style="font-size:12.0pt;">ủa Galaxy Holdings/ Galaxy Telecom</span><span style="color:black;font-size:12.0pt;"> </span><span style="color:black;font-size:12.0pt;" lang="VI">mà</span><span style="color:black;font-size:12.0pt;"> không có bất kì khiếu nại nào, Khách hàng xác nhận rằng đã đọc kỹ, hiểu rõ&nbsp;và&nbsp;</span><span style="color:black;font-size:12.0pt;" lang="VI">chấp thuận </span><span style="color:black;font-size:12.0pt;">toàn bộ&nbsp;nội dung&nbsp;</span><span style="color:black;font-size:12.0pt;" lang="VI">Chính sách</span><span style="color:black;font-size:12.0pt;"> này một cách hoàn toàn tự nguyện, không bị lừa dối, ép buộc.&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;" lang="VI"><strong>Điều 1.</strong> <strong>Giải thích từ ngữ và các từ viết tắt</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.75in;text-align:justify;">
    <span style="color:black;font-size:12.0pt;" lang="NL">Trong phạm vi Chính sách này,&nbsp;các thuật ngữ dưới đây được hiểu và giải thích như sau:&nbsp;</span>
</p>
        <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:.5in .75in;text-align:justify;">
             <span style="color:black;font-size:12.0pt;">1.1<strong> &nbsp;&nbsp;&nbsp;&nbsp; </strong><strong>Galaxy Holdings</strong></span><span style="color:black;font-size:12.0pt;" lang="VI"> là&nbsp;</span><span style="color:black;font-size:12.0pt;" lang="NL">Công ty TNHH Galaxy Digital Holdings.&nbsp;</span>
        </p>
     
                <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:.5in .75in;text-align:justify;">
                  <span style="color:black;font-size:12.0pt;">1.2<strong> &nbsp;&nbsp;&nbsp;&nbsp; </strong><span style="color:black;font-size:12.0pt;" lang="NL"><strong>Galaxy Telecom&nbsp;</strong>là Công ty TNHH Galaxy Telecom.&nbsp;</span>
                </p>
         
                <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:.5in .75in;text-align:justify;">
                  <span style="color:black;font-size:12.0pt;">1.3<strong> &nbsp;&nbsp;&nbsp;&nbsp; </strong><span style="color:black;font-size:12.0pt;" lang="NL"><strong>Khách hàng&nbsp;</strong>là</span><span style="color:black;font-size:12.0pt;" lang="VI">:<strong>&nbsp;</strong></span>
                </p>
                <ol style="padding-left:48px; margin-left: 63.0pt;">
                <li>
                 <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
                    <span style="color:black;font-size:12.0pt;" lang="VI">- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color:black;font-size:12.0pt;" lang="NL">Cá nhân hoặc người đại diện hợp pháp của cá nhân sử dụng và/hoặc quan tâm tới các&nbsp;</span><span style="color:black;font-size:12.0pt;" lang="VI">s</span><span style="color:black;font-size:12.0pt;" lang="NL">ản&nbsp;</span><span style="color:black;font-size:12.0pt;" lang="VI">p</span><span style="color:black;font-size:12.0pt;" lang="NL">hẩm,&nbsp;</span><span style="color:black;font-size:12.0pt;" lang="VI">d</span><span style="color:black;font-size:12.0pt;" lang="NL">ịch&nbsp;</span><span style="color:black;font-size:12.0pt;" lang="VI">v</span><span style="color:black;font-size:12.0pt;" lang="NL">ụ&nbsp;</span><span style="color:black;font-size:12.0pt;" lang="VI">c</span><span style="color:black;font-size:12.0pt;" lang="NL">ủa Galaxy Holdings/&nbsp;</span><span style="color:black;font-size:12.0pt;">Galaxy Telecom/ Công ty mẹ/ Công ty con/ Công ty thành viên của Galaxy Holdings</span><span style="color:black;font-size:12.0pt;" lang="NL">;&nbsp;</span>
                </p>
              <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
                    <span style="color:black;font-size:12.0pt;" lang="VI">- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color:black;font-size:12.0pt;" lang="NL">Cá nhân hoặc người đại diện hợp pháp của cá nhân đã truy cập và/hoặc đăng ký tài khoản tại các trang mạng (website)/ứng dụng (app) thuộc quyền sở hữu của&nbsp;Galaxy Holdings/ Galaxy Telecom/ Công ty mẹ/ Công ty con/ công ty thành viên của Galaxy Holdings/ Galaxy Telecom</span><span style="color:black;font-size:12.0pt;" lang="VI">.&nbsp;</span>
                </p>
                </li>
                </ol>
                <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:.5in .75in;text-align:justify;">
                  <span style="color:black;font-size:12.0pt;">1.4<strong> &nbsp;&nbsp;&nbsp;&nbsp; </strong><span style="color:black;font-size:12.0pt;" lang="NL"><strong>Sản&nbsp;</strong></span><span style="color:black;font-size:12.0pt;" lang="VI"><strong>p</strong></span><span style="color:black;font-size:12.0pt;" lang="NL"><strong>hẩm,&nbsp;</strong></span><span style="color:black;font-size:12.0pt;" lang="VI"><strong>d</strong></span><span style="color:black;font-size:12.0pt;" lang="NL"><strong>ịch&nbsp;</strong></span><span style="color:black;font-size:12.0pt;" lang="VI"><strong>v</strong></span><span style="color:black;font-size:12.0pt;" lang="NL"><strong>ụ&nbsp;</strong></span><span style="color:black;font-size:12.0pt;" lang="VI"><strong>c</strong></span><span style="color:black;font-size:12.0pt;" lang="NL"><strong>ủa Galaxy Holdings/ Galaxy Telecom</strong> là</span><span style="color:black;font-size:12.0pt;" lang="VI">:<strong>&nbsp;</strong></span>
                </p>
                 <ol style="padding-left:48px; margin-left: 63.0pt;">
                <li>
                <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
                    <span style="color:black;font-size:12.0pt;" lang="VI">- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color:black;font-size:12.0pt;" lang="NL">Sản phẩm, dịch vụ do&nbsp;</span><span style="color:black;font-size:12.0pt;">Galaxy Holdings/ Galaxy Telecom</span><span style="color:black;font-size:12.0pt;" lang="NL"> trực tiếp nghiên cứu, phát triển và cung cấp cho Khách hàng;</span>
                </p>
                <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
                    <span style="color:black;font-size:12.0pt;" lang="VI">- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color:black;font-size:12.0pt;" lang="NL">Sản phẩm, dịch vụ do&nbsp;</span><span style="color:black;font-size:12.0pt;">Galaxy Holdings/ Galaxy Telecom&nbsp;</span><span style="color:black;font-size:12.0pt;" lang="NL">hợp tác với</span><span style="color:black;font-size:12.0pt;" lang="VI"> đối tác&nbsp;</span><span style="color:black;font-size:12.0pt;" lang="NL">để cung cấp cho Khách hàng.&nbsp;</span>
                </p>
            </li>
                </ol>
                <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:.5in .75in;text-align:justify;">
                  <span style="color:black;font-size:12.0pt;">1.5<strong> &nbsp;&nbsp;&nbsp;&nbsp; </strong><span style="color:black;font-size:12.0pt;" lang="NL"><strong>Dữ liệu cá nhân&nbsp;</strong>là thông tin dưới dạng ký hiệu, chữ viết, chữ số, hình ảnh, âm thanh hoặc dạng tương tự gắn liền với một con người cụ thể hoặc giúp xác định một con người cụ thể.</span>
                </p>
           
                <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:.5in .75in;text-align:justify;">
                  <span style="color:black;font-size:12.0pt;">1.6<strong> &nbsp;&nbsp;&nbsp;&nbsp; </strong><span style="color:black;font-size:12.0pt;" lang="NL"><strong>Xử lý dữ liệu cá nhân&nbsp;</strong>là một hoặc nhiều hoạt động tác động tới dữ liệu cá nhân, như: thu thập, ghi, phân tích, xác nhận, lưu trữ, chỉnh sửa, công khai, tiết lộ, kết hợp, truy cập, truy xuất, thu hồi, mã hóa, giải mã, sao chép, chia sẻ, truyền đưa, cung cấp, chuyển giao, xóa, hủy dữ liệu cá nhân hoặc các hành động khác có liên quan.</span>
                </p>
      
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.75in;text-align:justify;">
    <span style="color:black;font-size:12.0pt;" lang="VI"><strong>Điều 2.&nbsp;</strong></span><span style="color:black;font-size:12.0pt;"><strong>Loại Dữ liệu cá nhân được xử lý</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">2.</span><span style="color:black;font-size:12.0pt;" lang="VI">1.<strong> &nbsp;&nbsp;&nbsp;&nbsp; </strong></span><span style="color:black;font-size:12.0pt;">Dữ liệu cá nhân của Khách hàng&nbsp;</span><span style="color:black;font-size:12.0pt;" lang="VI">được&nbsp;</span><span style="color:black;font-size:12.0pt;">Galaxy Holdings/ Galaxy Telecom tiến hành xử lý (sau đây gọi tắt là “<strong>Dữ liệu cá nhân</strong>”) bao gồm những&nbsp;</span><span style="color:black;font-size:12.0pt;" lang="VI">thông tin dưới đây&nbsp;</span><span style="color:black;font-size:12.0pt;">và có thể thay đổi tùy thuộc và</span><span style="color:black;font-size:12.0pt;" lang="VI">o loại</span><span style="color:black;font-size:12.0pt;"> sản phẩm hoặc dịch vụ</span><span style="color:black;font-size:12.0pt;" lang="VI">,&nbsp;</span><span style="font-size:12.0pt;" lang="VI">cách thức&nbsp;</span><span style="font-size:12.0pt;">tương tác </span><span style="color:black;font-size:12.0pt;">của Khách hàng với&nbsp;Galaxy Holdings/ Galaxy Telecom (</span><i><span style="color:black;font-size:12.0pt;">Galaxy Holdings/ Galaxy Telecom sẽ thông báo cụ thể các thay đổi (nếu có) và lấy lại sự đồng ý của chủ thể dữ liệu đối với các nội dung thay đổi đó</span></i><span style="color:black;font-size:12.0pt;">):</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">2.1.1.&nbsp;&nbsp; Dữ liệu cá nhân cơ bản&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">a) &nbsp;&nbsp;&nbsp;&nbsp; Họ, chữ đệm và tên khai sinh, tên gọi khác (nếu có);</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">b) &nbsp;&nbsp;&nbsp;&nbsp; Ngày, tháng, năm sinh;&nbsp;ngày, tháng, năm chết hoặc mất tích;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">c) &nbsp;&nbsp;&nbsp;&nbsp; Giới tính;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">d) &nbsp;&nbsp;&nbsp;&nbsp; Nơi sinh, nơi đăng ký khai sinh, nơi thường trú, nơi tạm trú, nơi ở hiện tại, quê quán, địa chỉ liên hệ;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">đ) &nbsp;&nbsp;&nbsp;&nbsp; Quốc tịch;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">e) &nbsp;&nbsp;&nbsp;&nbsp; Hình ảnh của cá nhân, bao gồm cả hình ảnh Khách hàng cung cấp khi đăng ký sử dụng dịch vụ, hình ảnh Khách hàng đăng tải trên các Ứng dụng (app)/Trang mạng (website) của Galaxy Holdings/ Galaxy Telecom trong quá trình sử dụng dịch vụ;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">g) &nbsp;&nbsp;&nbsp;&nbsp; Số điện thoại, số chứng minh nhân dân, số định danh cá nhân, số hộ chiếu, số giấy phép lái xe, số biển số xe, số mã số thuế cá nhân, số bảo hiểm xã hội, số thẻ bảo hiểm y tế;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">h) &nbsp;&nbsp;&nbsp;&nbsp; Tình trạng hôn nhân;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">i)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Thông tin về mối quan hệ gia đình (cha mẹ, con cái);</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">k) &nbsp;&nbsp;&nbsp;&nbsp; Thông tin về tài khoản số của cá nhân;&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">l)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Các dữ liệu về hành vi tiêu dùng phản ánh hoạt động, lịch sử hoạt động trên không gian mạng của Khách hàng khi sử dụng sản phẩm, dịch vụ của Galaxy Holdings/ Galaxy Telecom (hành vi online; tần suất, thời gian trung bình sử dụng cuộc gọi, tin nhắn, cuộc gọi chăm sóc khách hàng; loại thiết bị; hệ điều hành; tỷ lệ người dùng thiết bị 4G/5G; thời gian, dung lượng sử dụng mạng nội địa, roaming quốc tế; các gói roaming quốc tế; hình thức và mức nạp và sử dụng tiền điện thoại; thời gian thanh toán dịch vụ; Sim trả trước hay trả sau; tỷ lệ khách hàng đăng ký dịch vụ giá trị gia tăng; tỷ lệ khách hàng đăng ký gói dữ liệu ngắn/ dài);&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">m)&nbsp;&nbsp;&nbsp;&nbsp; Điểm tín nhiệm viễn thông của Khách hàng: được thể hiện dưới dạng điểm số, là kết quả của quá trình Galaxy Holdings/ Galaxy Telecom xử lý, phân tích dữ liệu của Khách hàng sử dụng sản phẩm, dịch vụ của Galaxy Holdings/ Galaxy Telecom;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">n)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Thông tin qua việc sử dụng thiết bị di động: cấu hình điện thoại, thông tin phiên bản của các ứng dụng trên điện thoại, danh bạ điện thoại của khách hàng;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">o) &nbsp;&nbsp;&nbsp;&nbsp; Các thông tin khác gắn liền với một con người cụ thể hoặc giúp xác định một con người cụ thể không thuộc quy định tại khoản 2.1.2 Điều này.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;">
    <span style="color:black;font-size:12.0pt;" lang="VI">2.</span><span style="color:black;font-size:12.0pt;">1.</span><span style="color:black;font-size:12.0pt;" lang="VI">2. &nbsp;&nbsp;</span><span style="color:black;font-size:12.0pt;">Dữ liệu cá nhân nhạy cảm&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">a)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dữ liệu về tội phạm, hành vi phạm tội được thu thập, lưu trữ bởi các cơ quan thực thi pháp luật;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">b) &nbsp;&nbsp;&nbsp;&nbsp; Thông tin Khách hàng của tổ chức tín dụng, chi nhánh ngân hàng nước ngoài, tổ chức cung ứng dịch vụ trung gian thanh toán, các tổ chức được phép khác, gồm: thông tin định danh Khách hàng theo quy định của pháp luật, thông tin về tài khoản, thông tin về tiền gửi, thông tin về tài sản gửi, thông tin về giao dịch, thông tin về tổ chức, cá nhân là bên bảo đảm tại tổ chức tín dụng, chi nhánh ngân hàng, tổ chức cung ứng dịch vụ trung gian thanh toán;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">c) &nbsp;&nbsp;&nbsp;&nbsp; Dữ liệu về vị trí của cá nhân được xác định qua dịch vụ định vị.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">d)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Quan điểm chính trị, quan điểm tôn giáo;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">đ)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tình trạng sức khỏe và đời tư được ghi trong hồ sơ bệnh án, không bao gồm thông tin về nhóm máu;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">e)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Thông tin liên quan đến nguồn gốc chủng tộc, nguồn gốc dân tộc;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">g)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Thông tin về đặc điểm di truyền được thừa hưởng hoặc có được của cá nhân;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">h)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Thông tin về thuộc tính vật lý, đặc điểm sinh học riêng của cá nhân;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">i)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Thông tin về đời sống tình dục, xu hướng tình dục của cá nhân;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">k) &nbsp;&nbsp;&nbsp;&nbsp; Dữ liệu cá nhân khác được pháp luật quy định là đặc thù và cần có biện pháp bảo mật cần thiết.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;" lang="VI">2.</span><span style="color:black;font-size:12.0pt;">2</span><span style="color:black;font-size:12.0pt;" lang="VI">. &nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color:black;font-size:12.0pt;">Các thông tin, dữ liệu của Khách hàng mà Galaxy Holdings/ Galaxy Telecom nêu tại Điều này bao gồm dữ liệu cá nhân cơ bản và dữ liệu cá nhân nhạy cảm. Dữ liệu cá nhân nhạy cảm là những dữ liệu có liên quan đến quyền riêng tư của Khách hàng. Galaxy Holdings/ Galaxy Telecom cam kết bảo vệ dữ liệu cá nhân nhạy cảm của Khách hàng phù hợp với quy định của pháp luật.</span><span style="font-size:12.0pt;">&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Điều 3.</strong> <strong>Mục đích xử lý Dữ liệu cá nhân&nbsp;</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">Dữ liệu cá nhân theo Điều 2 trên đây có thể được xử lý bởi Galaxy Holdings/ Galaxy Telecom, bên xử lý dữ liệu Galaxy Holdings/ Galaxy Telecom và bên thứ ba được phép xử lý dữ liệu của Galaxy Holdings/ Galaxy Telecom cho một hoặc nhiều mục đích sau:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">3.1. &nbsp;&nbsp;&nbsp;&nbsp; Cung cấp sản phẩm, hàng hóa, dịch vụ cho Khách hàng và thực hiện quyền, nghĩa vụ của Galaxy Holdings/ Galaxy Telecom theo hợp đồng/thỏa thuận và quy định pháp luật, bao gồm nhưng không giới hạn:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(a) &nbsp;&nbsp;&nbsp; Xác minh tính chính xác, đầy đủ của các thông tin được Khách hàng cung cấp; xác định hoặc xác thực danh tính của Khách hàng và thực hiện quy trình xác thực Khách hàng theo quy định;&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(b)&nbsp;&nbsp;&nbsp;&nbsp; Xử lý việc đăng ký sử dụng sản phẩm, dịch vụ của Galaxy Holdings/ Galaxy Telecom. Cung cấp, kích hoạt hoặc xác minh sản phẩm, hàng hóa, dịch vụ mà Khách hàng yêu cầu theo phiếu yêu cầu/hợp đồng/thỏa thuận hoặc qua kênh giao dịch của Galaxy Holdings/ Galaxy Telecom hoặc các yêu cầu khác của Khách hàng phát sinh trong quá trình tìm kiếm, tiếp cận, mua, đăng ký, sử dụng sản phẩm, hàng hóa, dịch vụ;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(c)&nbsp;&nbsp;&nbsp;&nbsp; Phục vụ hoạt động quản lý nghiệp vụ; vận hành, khai thác, tối ưu chất lượng mạng, dịch vụ di động, Internet và các sản phẩm, dịch vụ khác do Galaxy Holdings/ Galaxy Telecom và/hoặc đối tác cung cấp; xử lý sự cố mạng lưới; cung cấp, nâng cao chất lượng sản phẩm, hàng hóa, dịch vụ;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(d) &nbsp;&nbsp; Xác thực và thực hiện các giao dịch thanh toán; đối soát cước, thanh toán cước; trao đổi cung cấp thông tin liên quan đến người sử dụng dịch vụ viễn thông với các doanh nghiệp viễn thông, nhà cung cấp dịch vụ khác để phục vụ cho việc tính giá cước, lập hóa đơn và ngăn chặn hành vi trốn tránh thực hiện nghĩa vụ theo hợp đồng trong phạm vi pháp luật cho phép; bảo vệ hoặc thực thi các quyền lợi hợp pháp của Galaxy Holdings/ Galaxy Telecom như quyền thu các khoản phí, các khoản nợ của Khách hàng đối với Galaxy Holdings/ Galaxy Telecom; đối soát với các đối tác hợp tác của Galaxy Holdings/ Galaxy Telecom nhằm mục đích cung cấp sản phẩm, hàng hóa, dịch vụ cho Khách hàng;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(e) &nbsp;&nbsp;&nbsp; Để nhận biết, xác thực, cập nhật thông tin về Khách hàng; để đánh giá, xác định, thẩm định, cân nhắc và phê duyệt việc cung cấp hoặc tiếp tục cung cấp sản phẩm, hàng hóa, dịch vụ đến Khách hàng. Galaxy Holdings/ Galaxy Telecom có thể sử dụng các phương pháp chấm điểm, gán ngưỡng cước nóng, kiểm tra lịch sử Khách hàng sử dụng sản phẩm, dịch vụ của Galaxy Holdings/ Galaxy Telecom để đánh giá và quản trị rủi ro tín dụng, đảm bảo khả năng thanh toán đối với các nghĩa vụ thanh toán và các nghĩa vụ khác có liên quan trong suốt quá trình cung cấp sản phẩm, dịch vụ của Galaxy Holdings/ Galaxy Telecom cho Khách hàng;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(f) &nbsp;&nbsp;&nbsp; Phục vụ cho mục đích liên hệ, thông báo với Khách hàng;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(g)&nbsp;&nbsp;&nbsp;&nbsp; Quảng cáo, tiếp thị, cung cấp sản phẩm dựa trên sở thích, thói quen sử dụng dịch vụ của Khách hàng: Galaxy Holdings/ Galaxy Telecom có thể sử dụng Dữ liệu cá nhân để cung cấp, quảng cáo, tiếp thị với Khách hàng về các sản phẩm, dịch vụ của Galaxy Holdings/ Galaxy Telecom, chương trình khuyến mại, nghiên cứu, khảo sát, tin tức, thông tin cập nhật, các sự kiện, cuộc thi có thưởng, trao các phần thưởng có liên quan, các quảng cáo và nội dung có liên quan về sản phẩm, dịch vụ của Galaxy Holdings/ Galaxy Telecom và/hoặc của các công ty trong hệ sinh thái của Galaxy Holdings/ Galaxy Telecom và/hoặc của các đối tác hợp tác với Galaxy Holdings/ Galaxy Telecom.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(h)&nbsp;&nbsp;&nbsp;&nbsp; Kích hoạt các tính năng cá nhân hóa trải nghiệm của Khách hàng, chẳng hạn như nhận diện sở thích, danh sách các ứng dụng yêu thích và thông tin quan tâm, đề xuất sản phẩm, dịch vụ;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(i) &nbsp;&nbsp;&nbsp; Thực hiện các hoạt động nội bộ cần thiết để cung cấp Dịch vụ, bao gồm khắc phục các lỗi phần mềm và sự cố vận hành, tiến hành phân tích dữ liệu, thử nghiệm và nghiên cứu, giám sát và phân tích xu hướng sử dụng và hoạt động;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(j)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cho phép các đối tác của Chúng tôi quản lý và phân bổ nguồn lực để cung cấp Dịch vụ.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(k) &nbsp;&nbsp; Thực hiện các quyền của Khách hàng liên quan đến Dữ liệu cá nhân theo quy định pháp luật, thỏa thuận giữa Khách hàng và Galaxy Holdings/ Galaxy Telecom và/hoặc đối tác của Galaxy Holdings/ Galaxy Telecom;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(l) &nbsp;&nbsp;&nbsp; Thực hiện nghĩa vụ với cơ quan, tổ chức, cá nhân có liên quan theo hợp đồng/thỏa thuận hoặc theo quy định pháp luật;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(m) &nbsp; Công khai Dữ liệu cá nhân của Khách hàng theo quy định pháp luật;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(n) &nbsp;&nbsp; Thực hiện các nghĩa vụ về thanh tra, kiểm tra, thống kê, báo cáo, tài chính, kế toán và thuế;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(o) &nbsp;&nbsp; Thực hiện các nghiệp vụ bảo đảm an toàn dữ liệu; bảo đảm an toàn hệ thống thông tin của Galaxy Holdings/ Galaxy Telecom như sao lưu, dự phòng, giám sát, tối ưu tài nguyên và bảo vệ Dữ liệu cá nhân khách hàng;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(p)&nbsp;&nbsp;&nbsp;&nbsp; Ngăn chặn tội phạm, gian lận hoặc giảm thiểu mối đe doạ đối với tính mạng, sức khỏe của người khác và lợi ích công cộng: Galaxy Holdings/ Galaxy Telecom có thể sử dụng thông tin cá nhân của Khách hàng để ngăn chặn và phát hiện tội phạn, gian lận, lạm dụng nhằm bảo vệ Khách hàng, Galaxy Holdings/ Galaxy Telecom và các chủ thể liên quan;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(q) &nbsp;&nbsp; Nhắn tin thông báo, truyền thông, vận động, ủng hộ liên quan đến Cổng thông tin nhân đạo quốc gia và theo yêu cầu của cơ quan quản lý nhà nước;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(r) &nbsp;&nbsp;&nbsp; Phát hiện, ngăn chặn, điều tra, phòng ngừa các hành vi vi phạm pháp luật trên không gian mạng theo yêu cầu của cơ quan nhà nước có thẩm quyền và quy định pháp luật, bao gồm nhưng không giới hạn: tin nhắn rác, thư điện tử rác, cuộc gọi rác, tin nhắn có mục đích lừa đảo, thư điện tử có mục đích lừa đảo, cuộc gọi có mục đích lừa đảo;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(s) &nbsp;&nbsp;&nbsp; Phát hiện, ngăn chặn, điều tra, phòng ngừa các hành vi gian lận, lừa đảo, tấn công, xâm nhập, chiếm đoạt trái phép, hành vi mang tính chất tội phạm và các hành vi bất hợp pháp khác;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(t) &nbsp;&nbsp;&nbsp; Thực hiện các hoạt động có mục đích kiểm toán, quản lý rủi ro, phòng chống rửa tiền, tài trợ khủng bố và tuân thủ cấm vận; Lập các báo cáo tài chính, báo cáo hoạt động, hồ sơ phục vụ công tác mời thầu hoặc tham dự thầu hoặc các loại báo cáo liên quan khác mà pháp luật quy định;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(u) &nbsp;&nbsp; Trong trường hợp tình trạng khẩn cấp về quốc phòng, an ninh quốc gia, trật tự an toàn xã hội, thảm họa lớn, dịch bệnh nguy hiểm; khi có nguy cơ đe dọa an ninh, quốc phòng nhưng chưa đến mức ban bố tình trạng khẩn cấp; phòng, chống bạo loạn, khủng bố, phòng, chống tội phạm và vi phạm pháp luật theo quy định pháp luật;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(v) &nbsp;&nbsp; Phục vụ hoạt động của cơ quan nhà nước theo quy định pháp luật chuyên ngành.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">3.2. &nbsp;&nbsp;&nbsp;&nbsp; Hỗ trợ Khách hàng khi mua, đăng ký sử dụng, sử dụng sản phẩm, hàng hóa, dịch vụ do Galaxy Holdings/ Galaxy Telecom/ Công ty mẹ/ Công ty con/ Công ty thành viên của Galaxy Holdings và/hoặc đối tác cung cấp theo hợp đồng/thỏa thuận và quy định pháp luật, bao gồm:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(a) &nbsp;&nbsp;&nbsp; Cập nhật, xử lý thông tin khi Khách hàng mua, đăng ký sử dụng, sử dụng Sản phẩm, hàng hóa, dịch vụ do Galaxy Holdings/ Galaxy Telecom/ Công ty mẹ/ Công ty con/ Công ty thành viên của Galaxy Holdings và/hoặc đối tác của Galaxy Holdings/ Galaxy Telecom cung cấp;&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(b) &nbsp;&nbsp; Chăm sóc Khách hàng, tiếp nhận và giải quyết thắc mắc, khiếu nại của Khách hàng đối với các sản phẩm, hàng hóa, dịch vụ;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(c) &nbsp;&nbsp;&nbsp; Sử dụng, chuyển giao cho đối tác các Dữ liệu cá nhân, thông tin vướng mắc, sự cố, báo cáo lỗi do Khách hàng phản ánh để xác định và khắc phục sự cố của Sản phẩm, hàng hóa, dịch vụ; sửa chữa thiết bị của Khách hàng; thực hiện hoạt động khác về chăm sóc và hỗ trợ Khách hàng.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">3.3. &nbsp;&nbsp;&nbsp;&nbsp; Nâng cao chất lượng Sản phẩm, hàng hóa, dịch vụ do Galaxy Holdings/ Galaxy Telecom và/hoặc đối tác cung cấp cho Khách hàng:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(a) &nbsp;&nbsp;&nbsp; Cung cấp thông tin mà Khách hàng đã yêu cầu hoặc Galaxy Holdings/ Galaxy Telecom cho rằng Khách hàng có thể thấy hữu ích, bao gồm thông tin về các Sản phẩm, hàng hóa, dịch vụ theo quy định pháp luật;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(b) &nbsp;&nbsp; Cải tiến công nghệ, giao diện Trang thông tin điện tử, wapsite, mạng xã hội, ứng dụng, nền tảng, công cụ… đảm bảo tiện lợi cho Khách hàng;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(c) &nbsp;&nbsp;&nbsp; Quản lý tài khoản Khách hàng và các chương trình Khách hàng thân thiết;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(d) &nbsp;&nbsp; Lưu trữ thông tin, nghiên cứu thị trường, phân tích, thống kê và các hoạt động quản lý nội bộ khác nhằm nâng cao trải nghiệm Khách hàng;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(e) &nbsp;&nbsp;&nbsp; Báo cáo, thống kê, phân tích dữ liệu nội bộ để nghiên cứu, xây dựng, phát triển, quản lý, đo lường, cung cấp và cải tiến sản phẩm, hàng hóa, dịch vụ cũng như điều hành hoạt động kinh doanh của Galaxy Holdings/ Galaxy Telecom;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(f) &nbsp;&nbsp;&nbsp; Xây dựng chiến dịch tiếp thị sản phẩm, hàng hóa, dịch vụ và xác định cách Galaxy Holdings/ Galaxy Telecom và/hoặc đối tác có thể cá nhân hóa các sản phẩm, hàng hóa, dịch vụ đó;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(g) &nbsp;&nbsp; Phát triển, cung cấp sản phẩm, hàng hóa, dịch vụ mới được cá nhân hóa theo nhu cầu, điều kiện thực tế của Khách hàng với phương pháp đo lường hiệu quả;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(h) &nbsp;&nbsp; Giới thiệu, cung cấp các chương trình khuyến mại cho sản phẩm, hàng hóa, dịch vụ, ưu đãi, khuyến mại của Galaxy Holdings/ Galaxy Telecom và của Galaxy Holdings/ Galaxy Telecom hợp tác với đối tác;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(i) &nbsp;&nbsp;&nbsp; Đánh giá khả năng mua, sử dụng sản phẩm, hàng hóa, dịch vụ thông qua điểm xếp hạng viễn thông hoặc các điểm/chỉ số đánh giá khác của Khách hàng nhằm hỗ trợ tốt nhất trong việc cung cấp các sản phẩm, hàng hóa, dịch vụ cho Khách hàng;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(j) &nbsp;&nbsp;&nbsp; Kinh doanh dịch vụ tiếp thị, quảng cáo, giới thiệu sản phẩm, hàng hóa, dịch vụ phù hợp với nhu cầu của Khách hàng hoặc Galaxy Holdings/ Galaxy Telecom và/hoặc đối tác cho rằng Khách hàng quan tâm theo nội dung, hình thức, tần suất như sau:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nội dung: Giới thiệu thông tin các sản phẩm, hàng hóa, dịch vụ, ưu đãi do Galaxy Holdings/ Galaxy Telecom và đối tác của Galaxy Holdings/ Galaxy Telecom cung cấp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Phương thức: Qua tin nhắn quảng cáo (SMS, USSD, MMS…), cuộc gọi IVR, thông báo trên Kênh giao dịch của Galaxy Holdings/ Galaxy Telecom hoặc các phương thức khác theo quy định pháp luật;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hình thức: Gửi trực tiếp cho Khách hàng qua thiết bị, phương tiện điện tử hoặc các hình thức khác phù hợp với quy định pháp luật;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tần suất: Theo quy định pháp luật về quảng cáo.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">3.4. &nbsp;&nbsp;&nbsp;&nbsp; Tiến hành các hoạt động nghiên cứu, phân tích, thử nghiệm và phát triển bao gồm nhưng không giới hạn phân tích dữ liệu, khảo sát, phát triển sản phẩm và Dịch vụ và/hoặc tạo hồ sơ khách hàng, để phân tích cách Khách hàng, phân tích thị trường, tiến hành các hoạt động trên các nền tảng của Galaxy Holdings/ Galaxy Telecom, cải tiến các Dịch vụ để nâng cao trải nghiệm của Khách hàng, phát triển các tính năng, sản phẩm và Dịch vụ mới và tạo điều kiện cho các giải pháp tài chính và bảo hiểm đồng thời bảo vệ dữ liệu, cải thiện và tăng cường an toàn, an ninh, bảo mật;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">3.5. &nbsp;&nbsp;&nbsp;&nbsp; Tổ chức giới thiệu và xúc tiến thương mại.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(a)&nbsp;&nbsp;&nbsp;&nbsp; Gửi tới Khách hàng bằng các phương thức phù hợp với quy định của pháp luật các thông báo, cập nhật, tài liệu, thông tin quảng cáo, khuyến mại, lời chúc, lời mời, quản lý sự tham gia và các tài liệu liên quan đến Dịch vụ, Chúng tôi và các nhà tài trợ, đối tác, và các nhà quảng cáo sản phẩm, Dịch vụ, sự kiện hoặc chương trình khuyến mại.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(b)&nbsp;&nbsp;&nbsp;&nbsp; Chúng tôi có thể liên lạc tiếp thị qua bưu điện, gọi điện thoại, dịch vụ tin nhắn ngắn, dịch vụ nhắn tin trực tuyến, văn bản thông báo và qua email.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(c)&nbsp;&nbsp;&nbsp;&nbsp; Khách hàng có thể hủy đăng ký nhận thông tin tiếp thị và khuyến mại bằng cách thức theo hướng dẫn của Chúng tôi tại từng thời điểm.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">3.6.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Kinh doanh dịch vụ nghiên cứu thị trường, thăm dò dư luận, môi giới.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">Galaxy Holdings/ Galaxy Telecom không thực hiện hoạt động mua bán Dữ liệu cá nhân trái phép.&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.75in;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Điều 4. Cách thức xử lý Dữ liệu cá nhân</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">4.1. &nbsp;&nbsp;&nbsp;&nbsp; Galaxy Holdings/ Galaxy Telecom có thể thu thập dữ liệu cá nhân của Khách hàng theo các cách thức, hình thức như sau:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:.5in;">
    <span style="color:black;font-size:12.0pt;">(a) &nbsp;&nbsp;&nbsp; Thu thập trực tiếp từ Khách hàng:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">i. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Từ hoạt động cung cấp sản phẩm, dịch vụ: khi Khách hàng cung cấp thông tin hoặc phát sinh thông tin trong quá trình đăng ký và sử dụng các sản phẩm, dịch vụ, tiện ích mà Galaxy Holdings/ Galaxy Telecom cung cấp qua các kênh giao dịch trực tiếp, nền tảng cung cấp dịch vụ;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">ii. &nbsp;&nbsp;&nbsp;&nbsp; Từ các trang mạng (website) của Galaxy Holdings/ Galaxy Telecom: Galaxy Holdings/ Galaxy Telecom có thể thu thập dữ liệu của Khách hàng khi Khách hàng truy cập bất kỳ website nào của Galaxy Holdings/ Galaxy Telecom sử dụng bất kỳ tính năng, tài nguyên nào có sẵn trên hoặc thông qua các website này;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">iii. &nbsp;&nbsp;&nbsp; Từ ứng dụng trên thiết bị di động của Galaxy Holdings/ Galaxy Telecom: Galaxy Holdings/ Galaxy Telecom có thể thu thập dữ liệu của Khách hàng khi Khách hàng tải xuống hoặc sử dụng ứng dụng dành cho thiết bị di động. Các ứng dụng này có thể ghi lại dữ liệu như thống kê sử dụng ứng dụng, loại thiết bị, hệ điều hành, cài đặt ứng dụng, địa chỉ IP, cài đặt ngôn ngữ, ngày và giờ kết nối với ứng dụng, dữ liệu vị trí và các thông tin liên lạc kỹ thuật khác… và theo đó, tất cả hoặc một số dữ liệu này có thể tạo thành dữ liệu cá nhân của Khách hàng;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">iv. &nbsp;&nbsp;&nbsp; Từ các trao đổi, liên lạc, tương tác với Khách hàng: Galaxy Holdings/ Galaxy Telecom có thể thu thập dữ liệu của Khách hàng khi Khách hàng liên hệ, tương tác (như gặp trực tiếp, qua thư, điện thoại, trực tuyến, liên lạc điện tử, mạng xã hội, các cuộc khảo sát hoặc bất kỳ phương tiện nào khác);</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">v. &nbsp;&nbsp;&nbsp;&nbsp; Từ các thiết bị ghi âm, ghi hình gắn với thiết bị của Galaxy Holdings/ Galaxy Telecom hoặc được đặt tại các cửa hàng, địa điểm kinh doanh thuộc mạng lưới của Galaxy Holdings/ Galaxy Telecom hoặc các địa điểm khác mà Khách hàng có tương tác với Khách hàng lưu ý rằng Galaxy Holdings/ Galaxy Telecom có thể đang ghi âm, ghi hình khi Khách hàng giao tiếp, tương tác với Galaxy Holdings/ Galaxy Telecom cho các mục đích xác thực về Khách hàng và giao dịch của Khách hàng; và/hoặc mục đích an ninh, an toàn cho giao dịch, tài sản của Khách hàng cũng như của Galaxy Holdings/ Galaxy Telecom.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:.5in;">
    <span style="color:black;font-size:12.0pt;">(b) &nbsp;&nbsp; Thu thập từ bên thứ ba hoặc các nguồn thông tin khác:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">i. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Galaxy Holdings/ Galaxy Telecom cũng có thể thu thập dữ liệu của Khách hàng thông qua việc truy cập thông tin cá nhân được lưu trữ bởi bên thứ ba hoặc các nguồn lưu trữ thông tin khác, chẳng hạn như bên cung cấp dịch vụ xác thực thông tin, các nhà cung cấp hàng hóa/dịch vụ, nhà cung cấp dịch vụ thanh toán, các trang thông tin điện tử, mạng xã hội... Thông qua đó, Galaxy Holdings/ Galaxy Telecom có thể nhận được các thông tin được kiểm soát từ các bên thứ ba hoặc các nguồn lưu trữ thông tin này và Khách hàng đồng ý rằng Galaxy Holdings/ Galaxy Telecom có thể thu thập, lưu trữ và xử lý, sử dụng các thông tin này;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">ii. &nbsp;&nbsp;&nbsp;&nbsp; Để tuân thủ các nghĩa vụ của mình theo pháp luật hiện hành, Galaxy Holdings/ Galaxy Telecom cũng có thể tiếp nhận dữ liệu của Khách hàng từ các cơ quan có thẩm quyền.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">4.2. &nbsp;&nbsp;&nbsp;&nbsp; Galaxy Holdings/ Galaxy Telecom có thể xử lý dữ liệu cá nhân của Khách hàng theo các cách thức, hình thức như sau:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(a) &nbsp;&nbsp;&nbsp; Tùy vào mục đích xử lý dữ liệu cá nhân Khách hàng trong từng trường hợp cụ thể, Galaxy Holdings/ Galaxy Telecom có thể áp dụng các cách thức xử lý phù hợp bao gồm nhưng không giới hạn các phương thức xử lý dữ liệu cá nhân tự động (thông qua cookies và/hoặc công nghệ có liên quan khác), không tự động hoặc các phương thức khác bảo đảm được yêu cầu về bảo vệ dữ liệu.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(b) &nbsp;&nbsp; Trong quá trình xử lý dữ liệu, Galaxy Holdings/ Galaxy Telecom áp dụng một hoặc nhiều hoạt động tác động tới dữ liệu cá nhân như: thu thập, ghi, phân tích, xác nhận, lưu trữ, chỉnh sửa, công khai, kết hợp, truy cập, truy xuất, thu hồi, mã hóa, giải mã, sao chép, chia sẻ, truyền đưa, cung cấp, chuyển giao, xóa, hủy dữ liệu, cá nhân hoặc các hành động khác có liên quan.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(c) &nbsp;&nbsp;&nbsp; Galaxy Holdings/ Galaxy Telecom có thể trực tiếp hoặc thông qua bên xử lý dữ liệu cá nhân để xử lý dữ liệu của Khách hàng phù hợp với quy định pháp luật hiện hành.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">(d) &nbsp;&nbsp; Nhằm thực hiện các mục đích xử lý dữ liệu cá nhân Khách hàng, Galaxy Holdings/ Galaxy Telecom có thể chuyển dữ liệu cá nhân của Khách hàng ra nước ngoài và/hoặc địa điểm nằm ngoài lãnh thổ nước Việt Nam. Galaxy Holdings/ Galaxy Telecom sẽ thực hiện theo các yêu cầu của pháp luật Việt Nam, pháp luật của quốc gia/vùng lãnh thổ mà dữ liệu được chuyển đến cũng như áp dụng các biện pháp cần thiết để bảo vệ dữ liệu cá nhân của Khách hàng.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.75in;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Điều 5. Thời gian bắt đầu, thời gian kết thúc xử lý dữ liệu</strong></span>
</p>
<p style="background:white;line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;vertical-align:baseline;">
    <span style="color:black;font-size:12.0pt;">5.1. &nbsp;&nbsp;&nbsp;&nbsp; Thời gian bắt đầu xử lý dữ liệu</span>
</p>
<p style="background:white;line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:.5in;vertical-align:baseline;">
    <span style="font-size:12.0pt;">Kể từ thời điểm phát sinh các Mục đích&nbsp;</span><span style="font-size:12.0pt;" lang="VI">quy định tại&nbsp;</span><span style="font-size:12.0pt;">Điều 3&nbsp;</span><span style="font-size:12.0pt;" lang="VI">Chính sách này</span><span style="font-size:12.0pt;">.</span>
</p>
<p style="background:white;line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;vertical-align:baseline;">
    <span style="color:black;font-size:12.0pt;">5.2. &nbsp;&nbsp;&nbsp;&nbsp; Thời gian kết thúc xử lý dữ liệu&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.75in;text-align:justify;">
    <span style="font-size:12.0pt;">Galaxy Holdings/ Galaxy Telecom chấm dứt việc xử lý Dữ liệu cá nhân khi đã hoàn thành Mục đích quy định tại Chính sách này, trừ trường hợp pháp luật có quy định khác hoặc Khách hàng</span><span style="font-size:12.0pt;" lang="VI"> rút lại sự đồng ý</span><span style="font-size:12.0pt;"> việc xử lý Dữ liệu cá nhân</span><span style="font-size:12.0pt;" lang="VI"> hoặc khi cơ quan nhà nước có thẩm quyền yêu cầu bằng văn bản</span><span style="font-size:12.0pt;">.</span>
</p>
<p style="background:white;line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;vertical-align:baseline;">
    <span style="color:black;font-size:12.0pt;">5.3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Galaxy Holdings/ Galaxy Telecom có thể phải lưu trữ Dữ liệu cá nhân của Khách hàng ngay cả khi hợp đồng/thỏa thuận giữa Khách hàng và Galaxy Holdings/ Galaxy Telecom đã chấm dứt để thực hiện các nghĩa vụ pháp lý của Galaxy Holdings/ Galaxy Telecom theo quy định pháp luật và/hoặc yêu cầu của cơ quan nhà nước có thẩm quyền.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;">
    <span style="font-size:12.0pt;" lang="VI"><strong>Điều 6. C</strong></span><span style="font-size:12.0pt;"><strong>hia sẻ Dữ liệu cá nhân&nbsp;</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.75in;text-align:justify;">
    <span style="font-size:12.0pt;">Khách hàng đồng ý chia sẻ Dữ liệu cá nhân của Khách hàng</span><span style="font-size:12.0pt;" lang="VI"> cho các tổ chức, cá nhân dưới đâyđ</span><span style="font-size:12.0pt;">ể thực hiện các<strong>&nbsp;</strong>Mục đích quy định tại&nbsp;</span><span style="font-size:12.0pt;" lang="NL">Chính sách</span><span style="color:#00B050;font-size:12.0pt;" lang="VI">,&nbsp;</span><span style="font-size:12.0pt;" lang="VI">cụ thể</span><span style="font-size:12.0pt;">:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">6.1.&nbsp;</span><span style="font-size:12.0pt;" lang="VI"> &nbsp;&nbsp;&nbsp; </span><span style="font-size:12.0pt;">Công ty mẹ, công ty con của Galaxy Holdings/ Galaxy Telecom</span><span style="font-size:12.0pt;" lang="VI">,</span><span style="font-size:12.0pt;"> công ty liên kết, công ty thành viên, chi nhánh của Galaxy Holdings/ Galaxy Telecom, công ty liên kết của Công ty mẹ, công ty con của Galaxy Holdings/ Galaxy Telecom và các đơn vị có liên quan khác của Galaxy Holdings/ Galaxy Telecom;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">6.2. &nbsp;&nbsp;&nbsp;&nbsp; Bên thứ ba cung cấp dịch vụ hoặc các đối tác trong các hợp đồng hợp tác kinh doanh (có phân chia lợi nhuận hoặc không phân chia lợi nhuận): Galaxy Holdings/ Galaxy Telecom&nbsp;sử dụng và/hoặc hợp tác với các công ty và cá nhân khác để thực hiện một số công việc và chương trình như hợp tác cung cấp dịch vụ nội dung, dịch vụ giá trị gia tăng, các dịch vụ được cung cấp trên mạng viễn thông và internet, chương trình&nbsp;</span><span style="font-size:12.0pt;" lang="VI">quảng cáo,&nbsp;</span><span style="font-size:12.0pt;">khuyến mại dành cho</span><span style="font-size:12.0pt;" lang="VI"> Khách hàng</span><span style="font-size:12.0pt;">, nghiên cứu thị trường, phân tích và phát triển sản phẩm, tư vấn chiến lược, cung cấp dịch vụ thu cước. Các bên thứ ba cung cấp dịch vụ và/hoặc các đối tác này có quyền truy cập, thu thập, sử dụng và xử lý Dữ liệu cá nhân</span><span style="font-size:12.0pt;" lang="VI"> của Khách hàng&nbsp;trong phạm vi Galaxy Holdings/ Galaxy Telecom cho phép&nbsp;</span><span style="font-size:12.0pt;">để thực hiện các chức năng của họ</span><span style="font-size:12.0pt;" lang="VI"> và&nbsp;</span><span style="font-size:12.0pt;">phải tuân thủ&nbsp;</span><span style="font-size:12.0pt;" lang="VI">quy định của&nbsp;</span><span style="font-size:12.0pt;">pháp luật về bảo vệ Dữ liệu cá nhân với tư cách là bên xử lý dữ liệu;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">6.3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Đối tác khác theo yêu cầu hoặc xác nhận của Khách hàng (bao gồm nhưng không giới hạn ở các phương tiện điện tử trên các Trang mạng (website)/ Ứng dụng (app) của Galaxy Holdings/ Galaxy Telecom hoặc bằng văn bản). Ví dụ khi Khách hàng mong muốn một dịch vụ thông qua đối tác của Galaxy Holdings như sử dụng dịch vụ ngân hàng, hàng không, chương trình khuyến mại do đối tác của Galaxy Holdings/ Galaxy Telecom cung cấp, Khách hàng từ đây đồng ý rằng Galaxy Holdings/ Galaxy Telecom có thể chia sẻ Dữ liệu cá nhân của Khách hàng với các đối tác đó. Khách hàng cũng đồng ý rằng Dữ liệu cá nhân được chia sẻ với đối tác của Galaxy Holdings/ Galaxy Telecom có thể được chuyển giao tới các bên trong mối liên hệ với dịch vụ được sử dụng bởi Khách hàng. Các đối tác của Galaxy Holdings/ Galaxy Telecom bao gồm các đối tác tích hợp với ứng dụng/ trang mạng của Galaxy Holdings/ Galaxy Telecom hoặc ứng dụng/ trang mạng của Galaxy Holdings/ Galaxy Telecom tích hợp với hệ thống của đối tác, đối tác dịch vụ vận chuyển, đối tác tài chính hoặc các đối tác kinh doanh khác mà Galaxy Holdings/ Galaxy Telecom hợp tác để cung cấp chương trình khuyến mại, các dịch vụ khác;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">6.4. &nbsp;&nbsp;&nbsp;&nbsp; Trao đổi, cung cấp, chia sẻ Dữ liệu cá nhân cho các bên thứ ba là cố vấn, chuyên gia, đại lý hoặc nhà cung cấp, nhà thầu phụ của Galaxy Holdings/ Galaxy Telecom để triển khai các sản phẩm, công việc, dịch vụ phù hợp với Mục đích sử dụng.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">6.5.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Trao đổi, cung cấp Dữ liệu cá nhân cho các nhà cung cấp, chuyên gia tư vấn, đối tác tiếp thị, công ty nghiên cứu và nhà cung cấp dịch vụ hoặc đối tác kinh doanh khác, bao gồm: đối tác xác thực thông tin cá nhân, bộ phận xử lý thanh toán và bộ phận hỗ trợ; dịch vụ chống rửa tiền; nhà cung cấp dịch vụ máy chủ, dịch vụ công nghệ thông tin, nhà cung cấp lưu trữ đám mây; đối tác quảng cáo và nhà cung cấp nền tảng quảng cáo; nhà cung cấp phân tích dữ liệu; các đối tác nghiên cứu, bao gồm cả những người thực hiện khảo sát hoặc dự án nghiên cứu hợp tác với Galaxy Holdings/ Galaxy Telecom; đối tác bảo hiểm, tài chính, ngân hàng, hàng không, công nghệ, viễn thông.&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">6.6.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tái cấu trúc doanh nghiệp: Trong quá trình phát triển kinh doanh, Galaxy Holdings/ Galaxy Telecom có thể bán hoặc mua các doanh nghiệp hoặc tái cấu trúc doanh nghiệp phù hợp với quy định của pháp luật và nhu cầu sản xuất kinh doanh. Trong các giao dịch như vậy, Dữ liệu cá nhân&nbsp;</span><span style="font-size:12.0pt;" lang="VI">sẽ&nbsp;</span><span style="font-size:12.0pt;">được chuyển nhượng&nbsp;</span><span style="font-size:12.0pt;" lang="VI">và</span><span style="font-size:12.0pt;"> bên nhận chuyển nhượng vẫn phải tuân theo các quy định của Chính sách này;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">6.7. &nbsp;&nbsp;&nbsp;&nbsp; Galaxy Holdings/ Galaxy Telecom được phép tiết lộ&nbsp;</span><span style="font-size:12.0pt;" lang="VI">Dữ liệu cá nhân&nbsp;theo yêu cầu của</span><span style="font-size:12.0pt;"> pháp&nbsp;luật</span><span style="font-size:12.0pt;" lang="VI">, yêu cầu</span><span style="font-size:12.0pt;"> của cơ quan quản lý nhà nước</span><span style="font-size:12.0pt;" lang="VI"> có thẩm quyền;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">6.8.&nbsp; &nbsp;&nbsp;</span><span style="font-size:12.0pt;" lang="VI">Galaxy Holdings/ Galaxy Telecom được phép tiết lộ Dữ liệu cá nhân cho các doanh nghiệp viễn thông khác</span><span style="font-size:12.0pt;"> để phục vụ cho việc tính giá cước, lập hoá đơn và ngăn chặn hành vi trốn tránh thực hiện nghĩa vụ theo hợp đồng</span><span style="font-size:12.0pt;" lang="VI"> của Khách hàng.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Điều 7. Quyền của Khách hàng</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">7.1. &nbsp;&nbsp;&nbsp;&nbsp; Quyền được biết và Quyền đồng ý</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">Khách hàng có quyền được biết về hoạt động xử lý dữ liệu cá nhân của mình, trừ trường hợp luật có quy định khác. Trừ trường hợp quy định tại Điều 13 Chính sách này, Khách hàng có quyền đồng ý hoặc không đồng ý với các điều khoản và điều kiện của Chính sách này theo cách thức đã được Galaxy Holdings/ Galaxy Telecom hướng dẫn trên các kênh, phương tiện như tin nhắn SMS, cuộc gọi, dấu tích trên website/ứng dụng hoặc liên hệ với tổng đài chăm sóc khách hàng của Galaxy Holdings/ Galaxy Telecom phù hợp với quy định của pháp luật. Galaxy Holdings/ Galaxy Telecom chỉ thực hiện xử lý Dữ liệu cá nhân khi đã có chấp thuận của Khách hàng.&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">7.2. &nbsp;&nbsp;&nbsp;&nbsp; Quyền truy cập và yêu cầu cung cấp Dữ liệu cá nhân&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">Khách hàng có quyền truy cập vào các ứng dụng/website của Galaxy Holdings/ Galaxy Telecom và/hoặc liên hệ trực tiếp với Galaxy Holdings/ Galaxy Telecom để xem, chỉnh sửa, trích xuất các Dữ liệu cá nhân của Khách hàng, trừ trường hợp pháp luật có quy định khác.&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">Trường hợp Khách hàng không thể tự truy cập để xem, chỉnh sửa, trích xuất hoặc gặp khó khăn trong việc truy cập để xem, chỉnh sửa hoặc trích xuất các Dữ liệu cá nhân, Khách hàng vui lòng liên hệ với Galaxy Holdings/ Galaxy Telecom để được hỗ trợ.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;">
    <span style="color:black;font-size:12.0pt;">7.3. &nbsp;&nbsp;&nbsp;&nbsp; Quyền chỉnh sửa</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">Khách hàng có quyền chỉnh sửa các Dữ liệu cá nhân của mình với điều kiện việc chỉnh sửa này không vi phạm các quy định của pháp luật. Trường hợp Khách hàng không thể tự chỉnh sửa hoặc gặp khó khăn trong việc chỉnh sửa các Dữ liệu cá nhân, Khách hàng có thể liên hệ với Galaxy Holdings/ Galaxy Telecom để được hỗ trợ.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">7.4. &nbsp;&nbsp;&nbsp;&nbsp; Quyền phản đối, hạn chế, rút lại sự đồng ý xử lý dữ liệu</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">a) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Khách hàng có quyền phản đối, yêu cầu hạn chế xử lý Dữ liệu cá nhân hoặc rút lại sự đồng ý xử lý Dữ liệu cá nhân của Khách hàng. Tuy nhiên, việc phản đối, hạn chế hoặc rút lại sự đồng ý xử lý Dữ liệu cá nhân của Khách hàng có thể dẫn tới việc Galaxy Holdings/ Galaxy Telecom không thể cung cấp Sản phẩm, dịch vụ cho Khách hàng, điều này đồng nghĩa với việc Galaxy Holdings/ Galaxy Telecom có thể đơn phương chấm dứt hợp đồng mà không cần phải bồi thường cho&nbsp;Khách hàng do các điều kiện để thực hiện hợp đồng đã thay đổi (trừ trường hợp do lỗi của Galaxy Holdings/ Galaxy Telecom). Do đó, Galaxy Holdings/ Galaxy Telecom khuyến nghị Khách hàng cân nhắc kĩ lưỡng trước khi phản đối, hạn chế hoặc rút lại sự đồng ý xử lý Dữ liệu cá nhân của Khách hàng.&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">b) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Trường hợp Khách hàng muốn hạn chế nhận nội dung tiếp thị quảng cáo, khuyến mại từ Galaxy Holdings/ Galaxy Telecom và muốn rút lại sự chấp thuận trước đó (nếu có) và/hoặc phản đối việc tiếp tục sử dụng thông tin cá nhân của mình cho mục đích quy định tại Điều 3 Chính sách này, Khách hàng vui lòng thực hiện theo hướng dẫn của Galaxy Holdings/ Galaxy Telecom tại thời điểm Galaxy Holdings/ Galaxy Telecom thu thập Dữ liệu cá nhân hoặc liên hệ với Galaxy Holdings/ Galaxy Telecom theo các thông tin được cung cấp tại Chính sách này. Nếu Khách hàng không muốn nhận thông báo từ ứng dụng của Galaxy Holdings/ Galaxy Telecom, vui lòng điều chỉnh cài đặt thông báo trong ứng dụng hoặc thiết bị của mình.&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">7.5.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Quyền xóa Dữ liệu cá nhân&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">Khách hàng có quyền yêu cầu Galaxy Holdings/ Galaxy Telecom thực hiện xóa Dữ liệu cá nhân của Khách hàng với&nbsp;</span><span style="font-size:12.0pt;">điều kiện là yêu cầu của Khách hàng phải phù hợp với quy định của pháp luật. Tuy nhiên, yêu cầu xóa Dữ liệu cá nhân của Khách hàng&nbsp;có thể dẫn tới việc Galaxy Holdings/ Galaxy Telecom không thể cung cấp Sản phẩm, dịch vụ cho Khách hàng, điều này đồng nghĩa với việc Galaxy Holdings/ Galaxy Telecom</span><span style="color:black;font-size:12.0pt;"> có thể đơn phương chấm dứt hợp đồng mà không cần phải bồi thường cho&nbsp;Khách hàng do các điều kiện để thực hiện hợp đồng đã thay đổi (trừ trường hợp do lỗi của Galaxy Holdings/ Galaxy Telecom). Do đó, Galaxy Holdings/ Galaxy Telecom khuyến nghị Khách hàng cân nhắc kĩ lưỡng trước khi yêu cầu Galaxy Holdings/ Galaxy Telecom thực hiện xóa Dữ liệu cá nhân.&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="font-size:12.0pt;">7.6. &nbsp;&nbsp;&nbsp;&nbsp; Quyền khiếu nại, tố cáo, khởi kiện&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:.5in;">
    <span style="font-size:12.0pt;">Khách hàng có quyền khiếu nại, tố cáo hoặc khởi kiện theo quy định của pháp luật</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="font-size:12.0pt;">7.7. &nbsp;&nbsp;&nbsp;&nbsp; Quyền yêu cầu bồi thường thiệt hại</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="font-size:12.0pt;">Khách hàng có quyền yêu cầu bồi thường thiệt hại theo quy định của pháp luật khi xảy ra vi phạm quy định về bảo vệ Dữ liệu cá nhân của mình, trừ trường hợp các bên có thỏa thuận khác hoặc luật có quy định khác.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">7.8.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Quyền tự bảo vệ&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">Khách hàng có quyền tự bảo vệ theo quy định của Bộ luật Dân sự, luật khác có liên quan và Nghị định 13/2023/NĐ-CP về bảo vệ Dữ liệu cá nhân (và các văn bản sửa đổi, thay thế nếu có), hoặc yêu cầu cơ quan, tổ chức có thẩm quyền thực hiện các phương thức bảo vệ quyền dân sự theo quy định tại Điều 11 Bộ luật Dân sự.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Điều 8. Nghĩa vụ của Khách hàng</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="font-size:12.0pt;">Khách hàng có trách nhiệm bảo vệ Dữ liệu cá nhân của mình như sau:&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">8.1. &nbsp;&nbsp;&nbsp;&nbsp; Chủ động thực hiện các biện pháp bảo vệ, quản lý và sử dụng an toàn tài khoản, thiết bị công nghệ cá nhân (bao gồm các thiết bị như điện thoại thông minh, máy tính, máy tính bảng, laptop và các thiết bị khác) bằng cách đăng xuất tài khoản sau khi sử dụng, đặt một mật khẩu mạnh</span><a href="#_ftn1" name="_ftnref1" title=""><span style="font-size:12.0pt;line-height:107%;">[1]</span></a><span style="font-size:12.0pt;"> và giữ bí mật thông tin đăng nhập cũng như mật khẩu của mình. Các biện pháp bảo vệ và quản lý sử dụng an toàn tài khoản, thiết bị di động nói trên giúp ngăn chặn việc truy cập trái phép vào tài khoản của Khách hàng. Galaxy Holdings/ Galaxy Telecom được loại trừ trách nhiệm với các thiệt hại của Khách hàng trong trường hợp Khách hàng bị lộ/mất, bị đánh cắp mật khẩu, dẫn tới việc bị truy cập trái phép vào tài khoản, hoặc bất kỳ hoạt động nào trên tài khoản của Khách hàng sử dụng trên thiết bị di động bị mất, thất lạc dẫn đến người không có thẩm quyền tự ý sử dụng dịch vụ, hoặc hệ thống của Galaxy Holdings/ Galaxy Telecom bị xâm phạm bất hợp pháp bởi bên thứ ba mặc dù Galaxy Holdings/ Galaxy Telecom đã thực hiện đầy đủ các biện pháp để bảo vệ hệ thống (trừ trường hợp do lỗi của Galaxy Holdings/ Galaxy Telecom);&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">8.2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Khi đã chấp thuận toàn bộ điều khoản và điều kiện của của Chính sách này, Khách hàng có trách nhiệm cung cấp Dữ liệu cá&nbsp;</span><span style="font-size:12.0pt;">nhân đầy đủ, chính xác theo yêu cầu của Galaxy Holdings/ Galaxy Telecom và có trách nhiệm thông báo cho Galaxy Holdings/ Galaxy Telecom</span><span style="color:black;font-size:12.0pt;"> ngay khi phát hiện hành vi vi phạm quy định về bảo vệ Dữ liệu cá nhân;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">8.3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Khách hàng có trách nhiệm tôn trọng Dữ liệu cá nhân của chủ thể khác và thực hiện quy định của pháp luật về bảo vệ Dữ liệu cá nhân, tham gia phòng, chống các hành vi vi phạm quy định về bảo vệ Dữ liệu cá nhân.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.75in;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Điều 9. Lưu trữ Dữ liệu cá nhân&nbsp;</strong></span>
</p>
<p style="background:white;line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;vertical-align:baseline;">
    <span style="font-size:12.0pt;">9.1. &nbsp;&nbsp;&nbsp;&nbsp; Dữ liệu cá nhân của Khách hàng do Galaxy Holdings/ Galaxy Telecom lưu trữ sẽ được bảo mật. Galaxy Holdings/ Galaxy Telecom có trách nhiệm thực hiện các biện pháp bảo vệ Dữ liệu cá nhân của Khách hàng theo quy định của pháp luật.&nbsp;</span>
</p>
<p style="background:white;line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;vertical-align:baseline;">
    <span style="font-size:12.0pt;">9.2. &nbsp;&nbsp;&nbsp;&nbsp; Địa điểm lưu trữ Dữ liệu cá nhân</span>
</p>
<p style="background:white;line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;vertical-align:baseline;">
    <span style="font-size:12.0pt;">Trong phạm vi pháp luật cho phép, Galaxy Holdings/ Galaxy Telecom có thể lưu trữ Dữ liệu cá nhân của Khách hàng tại Việt Nam và ở nước ngoài, kể cả trên giải pháp lưu trữ điện toán đám mây. Galaxy Holdings/ Galaxy Telecom áp dụng các tiêu chuẩn về bảo mật dữ liệu phù hợp với quy định pháp luật hiện hành. Việc chuyển dữ liệu cá nhân ra nước ngoài phải phù hợp với quy định tại Điều 25 Nghị định 13/2023/NĐ-CP (được sửa đổi, bổ sung, thay thế tùy từng thời kỳ) và các quy định của pháp luật.&nbsp;</span>
</p>
<p style="background:white;line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;vertical-align:baseline;">
    <span style="font-size:12.0pt;">9.3. &nbsp;&nbsp;&nbsp;&nbsp; Thời gian lưu trữ Dữ liệu cá nhân</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="font-size:12.0pt;">Galaxy Holdings/ Galaxy Telecom chỉ thực hiện lưu trữ Dữ liệu cá nhân của Khách hàng để hoàn thành các Mục Đích quy định tại Chính sách này. Tuy nhiên, trường hợp pháp luật hiện hành có quy định khác về thời hạn lưu trữ Dữ liệu cá nhân, Galaxy Holdings/ Galaxy Telecom có nghĩa vụ tuân thủ quy định của pháp luật.&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.75in;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Điều 10. Nghĩa vụ của Galaxy Holdings/ Galaxy Telecom</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">10.1.&nbsp;&nbsp;&nbsp; Dữ liệu cá nhân của&nbsp;</span><span style="font-size:12.0pt;" lang="VI">Khách hàng</span><span style="font-size:12.0pt;"> được cam kết bảo mật theo quy định của pháp luật, Chính sách bảo vệ Dữ liệu cá nhân của Galaxy Holdings/ Galaxy Telecom</span><span style="font-size:12.0pt;" lang="VI">.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">10.2. &nbsp;&nbsp; Galaxy Holdings/ Galaxy Telecom nỗ lực đảm bảo Dữ liệu cá nhân của Khách hàng được bảo vệ khỏi các hành vi vi phạm quy định về bảo vệ Dữ liệu cá nhân và phòng, chống sự mất mát, phá hủy hoặc thiệt hại do sự cố, sử dụng các biện pháp kỹ thuật. Galaxy Holdings/ Galaxy Telecom duy trì cam kết bảo mật Dữ liệu cá nhân bằng cách áp dụng những biện pháp vật lý, điện tử và quản lý để bảo vệ Dữ liệu cá nhân, bao gồm:&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">a) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Các máy chủ trang thông tin điện tử chính thức của Galaxy Holdings/ Galaxy Telecom và các hệ thống thông tin chứa dữ liệu cá nhân của Galaxy Holdings/ Galaxy Telecom đều được bảo vệ bởi các biện pháp, công nghệ bảo mật như tường lửa, mã hóa, chống xâm nhập trái phép; ban hành các biện pháp kiểm soát về con người,</span><span style="font-size:12.0pt;" lang="VI"> xây dựng</span><span style="font-size:12.0pt;"> quy trình kiểm tra, đánh giá, rà soát để phòng tránh các hành vi vi phạm quy định về bảo vệ Dữ liệu cá nhân.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">b) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Galaxy Holdings/ Galaxy Telecom sẽ thực hiện tất cả các biện pháp cần thiết để đảm bảo rằng Dữ liệu cá nhân của Khách hàng được xử lý đúng với Mục Đích đã thông báo. Galaxy Holdings/ Galaxy Telecom sẽ luôn tuân thủ những yêu cầu của pháp luật liên quan đến việc lưu trữ Dữ liệu cá nhân.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">10.</span><span style="font-size:12.0pt;" lang="VI">3. &nbsp;&nbsp; Thực hiện các yêu cầu của Khách hàng liên quan đến dữ liệu cá nhân của Khách hàng với điều kiện các yêu cầu của Khách hàng phải phù hợp với quy định của pháp luật.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">10.</span><span style="font-size:12.0pt;" lang="VI">4. &nbsp;&nbsp; Các nghĩa vụ khác theo quy định của pháp luật và của Chính sách này.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.75in;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Điều 11. Hậu quả, thiệt hại không mong muốn có khả năng xảy ra</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">11.1. &nbsp;&nbsp; Galaxy Holdings/ Galaxy Telecom sử dụng nhiều biện pháp, công nghệ bảo mật thông tin khác nhau nhằm bảo vệ Dữ liệu cá nhân của Khách hàng không bị sử dụng hoặc chia sẻ ngoài ý muốn. Galaxy Holdings/ Galaxy Telecom cam kết sẽ bảo mật một cách tối đa Dữ liệu cá nhân của Khách hàng. Một số hậu quả, thiệt hại không mong muốn có thể xảy ra bao gồm:&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">a)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lỗi phần cứng, phần mềm trong quá trình xử lý Dữ liệu cá nhân gây ảnh hưởng không mong muốn (lỗi, hỏng, mất) Dữ liệu cá nhân của Khách hàng;&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">b) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lỗ hổng bảo mật nằm ngoài khả năng kiểm soát của Galaxy Holdings/ Galaxy Telecom, hệ thống bị hacker tấn công gây lộ lọt Dữ liệu cá nhân của Khách hàng;&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">c) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Khách hàng tự làm lộ lọt Dữ liệu cá nhân của Khách hàng do: bất cẩn hoặc bị lừa đảo; truy cập các website/tải các ứng dụng có chứa phần mềm độc hại; tự ý chia sẻ thông tin với người khác.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">11.2. &nbsp;&nbsp; Galaxy Holdings/ Galaxy Telecom khuyến cáo Khách hàng thực hiện nghiêm ngặt các trách nhiệm bảo vệ Dữ liệu cá nhân theo quy định tại Điều 8 Chính sách này và theo quy định của pháp luật.&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.75in;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">Trong t</span><span style="color:black;font-size:12.0pt;" lang="VI">r</span><span style="color:black;font-size:12.0pt;">ường hợp máy chủ lưu trữ dữ liệu bị hacker tấn công dẫn đến mất mát Dữ liệu cá nhân của Khách hàng hoặc Khách hàng tự làm lộ lọt Dữ liệu cá nhân theo quy định tại Điểm b và c Khoản 1 Điều này, Galaxy Holdings/ Galaxy Telecom có trách nhiệm sau (i) thông báo vụ việc cho cơ quan&nbsp;</span><span style="color:black;font-size:12.0pt;" lang="VI">có thẩm quyền để&nbsp;</span><span style="color:black;font-size:12.0pt;">điều tra xử lý kịp thời và thông báo cho Khách hàng được biết; (ii) Phối hợp với cơ quan có thẩm quyền để giải quyết bảo đảm quyền lợi hợp pháp cho khách hàng.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.75in;text-align:justify;">
    <span style="font-size:12.0pt;"><strong>Điều 12. Quảng cáo trên internet và bên thứ ba</strong></span>
</p>
<p style="background:white;line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="font-size:12.0pt;">Các website/ứng dụng của Galaxy Holdings/ Galaxy Telecom có thể bao gồm quảng cáo của bên thứ ba và liên kết tới các website/ứng dụng khác. Các đối tác quảng cáo bên thứ ba có thể thu thập thông tin về Khách hàng khi Khách hàng tương tác với nội dung, quảng cáo hoặc dịch vụ của họ. Mọi quyền truy cập và sử dụng các liên kết hoặc trang website của bên thứ ba không bị điều chỉnh bởi Chính sách này, mà thay vào đó được điều chỉnh bởi Chính sách quyền riêng tư của các bên thứ ba đó.&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.75in;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Điều 13. Xử lý Dữ liệu cá nhân không cần sự đồng ý của chủ thể dữ liệu</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.75in;text-align:justify;">
    <span style="font-size:12.0pt;">Galaxy Holdings/ Galaxy Telecom có thể tiến hành xử lý Dữ liệu cá nhân mà không cần sự đồng ý của chủ thể dữ liệu trong các trường hợp sau:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">13.1.<strong>&nbsp;&nbsp; </strong>Trong trường hợp khẩn cấp, cần xử lý ngay Dữ liệu cá nhân có liên quan để bảo vệ tính mạng, sức khỏe của chủ thể dữ liệu hoặc người khác;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">13.2. &nbsp;&nbsp; Việc công khai Dữ liệu cá nhân theo quy định của luật;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">13.3. &nbsp;&nbsp; Việc xử lý dữ liệu của cơ quan nhà nước có thẩm quyền trong trường hợp tình trạng khẩn cấp về quốc phòng, an ninh quốc gia, trật tự an toàn xã hội, thảm họa lớn, dịch bệnh nguy hiểm; khi có nguy cơ đe dọa an ninh, quốc phòng nhưng chưa đến mức ban bố tình trạng khẩn cấp; phòng, chống bạo loạn, khủng bố, phòng, chống tội phạm và vi phạm pháp luật theo quy định của luật;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">13.4. &nbsp;&nbsp; Để thực hiện nghĩa vụ theo hợp đồng của chủ thể dữ liệu với Galaxy Holdings/ Galaxy Telecom theo quy định của luật;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">13.5. &nbsp;&nbsp; Phục vụ hoạt động của cơ quan nhà nước đã được quy định theo luật chuyên ngành.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.75in;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Điều 14. Thông tin liên lạc</strong></span>
</p>
<p style="background:white;line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">Trường hợp Khách hàng có bất kỳ câu hỏi nào về Chính sách này&nbsp;hoặc muốn thực hiện các quyền của Khách hàng liên quan tới Dữ liệu cá nhân, vui lòng liên hệ với&nbsp;</span><span style="font-size:12.0pt;">Galaxy Holdings/ Galaxy Telecom</span><span style="color:black;font-size:12.0pt;"> theo các phương thức và thông tin dưới đây:&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="font-size:12.0pt;">14.1. &nbsp;&nbsp; Liên hệ tới tổng đài theo thông tin tại các website/ứng dụng chính thức của Galaxy Holdings/ Galaxy Telecom tại từng thời điểm.&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">14.2. &nbsp;&nbsp; Gửi công văn tới các địa chỉ sau đây:885 Đường Hồng Hà, Chương Dương Độ, Hoàn Kiếm, Hà Nội.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">14.3. &nbsp;&nbsp; Liên hệ trực tiếp tại các điểm giao dịch của Galaxy Holdings/ Galaxy Telecom trên phạm vi toàn quốc.&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">14.4. &nbsp;&nbsp; Các cách thức liên hệ khác như Livechat (phần mềm trò chuyện trực tuyến), liên hệ qua fanpage (trang thông tin điện tử) chính thức của Galaxy Holdings/ Galaxy Telecom, email chăm sóc Khách hàng được cung cấp cho Khách hàng tại mọi thời điểm.&nbsp;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:28.35pt;">
    &nbsp;
</p>
<p>
    &nbsp;
</p>
<p>
    <br>
    &nbsp;
</p>
<div>
    <hr align="left" size="1" width="33%">
    <div id="ftn1">
        <p style="margin-bottom:.0001pt;margin:0in;text-align:justify;">
            <a href="#_ftnref1" name="_ftn1" title=""><i><span style="color:black;font-size:10.0pt;line-height:107%;"><strong>[1]</strong></span></i></a><i><span style="color:black;font-size:10.0pt;"> Mật khẩu mạnh phải đảm bảo các yếu tố sau:</span></i>
        </p>
        <ul style="list-style-type:disc;padding-left:15px;">
            <li>
                <p style="line-height:normal;margin-bottom:.0001pt;margin-right:0in;margin-top:0in;tab-stops:list .5in;text-align:justify;">
                    <i><span style="color:black;font-size:10.0pt;">Sử dụng tối thiểu 8 ký tự, và tối đa 15 ký tự.</span></i>
                </p>
            </li>
            <li>
                <p style="line-height:normal;margin-bottom:.0001pt;margin-right:0in;margin-top:0in;tab-stops:list .5in;text-align:justify;">
                    <i><span style="color:black;font-size:10.0pt;">Bao gồm số, chữ thường, chữ in hoa và ký tự đặc biệt.</span></i>
                </p>
            </li>
            <li>
                <p style="line-height:normal;margin-bottom:.0001pt;margin-right:0in;margin-top:0in;tab-stops:list .5in;text-align:justify;">
                    <i><span style="color:black;font-size:10.0pt;">Duy nhất, không dùng chung cho các tài khoản khác.</span></i>
                </p>
            </li>
            <li>
                <p style="line-height:normal;margin-bottom:.0001pt;margin-right:0in;margin-top:0in;tab-stops:list .5in;text-align:justify;">
                    <i><span style="color:black;font-size:10.0pt;">Không được mang ý nghĩa đi kèm (số điện thoại, ngày sinh, tên địa danh...).</span></i>
                </p>
            </li>
            <li>
                <p style="line-height:normal;margin-bottom:.0001pt;margin-right:0in;margin-top:0in;tab-stops:list .5in;text-align:justify;">
                    <i><span style="color:black;font-size:10.0pt;">Không sử dụng tên riêng.</span></i>
                </p>
            </li>
            <li>
                <p style="line-height:normal;margin-bottom:.0001pt;margin-right:0in;margin-top:0in;tab-stops:list .5in;text-align:justify;">
                    <i><span style="color:black;font-size:10.0pt;">Không sử dụng các con số nổi tiếng, ví dụ: 113, 115, 12345678...</span></i>
                </p>
            </li>
            <li>
                <p style="line-height:normal;margin-bottom:.0001pt;margin-right:0in;margin-top:0in;tab-stops:list .5in;text-align:justify;">
                    <i><span style="color:black;font-size:10.0pt;">Không sử dụng các thông tin trong mật khẩu cho câu hỏi bí mật (câu hỏi bí mật là phương pháp giúp người dùng đặt lại mật khẩu khi quên).</span></i>
                </p>
            </li>
        </ul>
        <p>
            &nbsp;
        </p>
    </div>
</div></div>`,
    },
    en: {
        title: 'Personal Data Protection Policy',
        content: `<div class="sub-container">
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:.5in;">
    &nbsp;
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:28.35pt;">
    <span style="color:black;font-size:12.0pt;">The Personal Data Protection Policy for Customers of Galaxy Holdings/ Galaxy Telecom (hereinafter referred to as "</span><span style="color:black;font-size:12.0pt;"><strong>Policy</strong></span><span style="font-size:12.0pt;">") aims to inform Customers about their Personal Data processed by Galaxy Holdings/ Galaxy Telecom, the purpose of processing, method of processing, storage period, rights and obligations of Customers regarding their Personal Data in accordance with Vietnamese law on Personal Data protection. This Policy also provides recommendations to help Customers raise awareness about Personal Data protection.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:28.35pt;">
    <span style="font-size:12.0pt;">This Policy is an inseparable part of the Mobile Information Service Provision and Use Contract, the Subscriber Information Confirmation for Mobile Information Service Registration, General Transaction Conditions for Mobile Information Services, and other contracts and general terms that Customers have entered into with Galaxy Holdings/ Galaxy Telecom. This Policy applies to all product and service provision activities of Galaxy Holdings/ Galaxy Telecom and applies across all platforms interacting with Customers, including digital environments.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:28.35pt;">
    <span style="font-size:12.0pt;">By checking the box "I have read and agree" or "I agree with Galaxy Holdings/ Galaxy Telecom's Policy and Terms of Use" or by signing a contract, entering into a model contract, general transaction conditions with Galaxy Holdings/ Galaxy Telecom, or by continuing to register, log in, use the website/app of Galaxy Holdings/ Galaxy Telecom or use products and services of Galaxy Holdings/ Galaxy Telecom without any complaints, Customers confirm that they have carefully read, clearly understood, and voluntarily accepted the entire content of this Policy without deception or coercion.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Article 1. Definitions and Abbreviations</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.75in;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">Within the scope of this Policy, the following terms are understood and interpreted as follows:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:.5in .75in;text-align:justify;">
     <span style="color:black;font-size:12.0pt;">1.1<strong>Galaxy Holdings</strong></span><span style="color:black;font-size:12.0pt;" lang="EN"> is&nbsp;</span><span style="color:black;font-size:12.0pt;" lang="EN">Galaxy Digital Holdings LLC.&nbsp;</span>
</p>

        <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:.5in .75in;text-align:justify;">
          <span style="color:black;font-size:12.0pt;">1.2  <span style="color:black;font-size:12.0pt;" lang="EN"><strong>Galaxy Telecom&nbsp;</strong>is Galaxy Telecom LLC.&nbsp;</span>
        </p>
 
        <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:.5in .75in;text-align:justify;">
          <span style="color:black;font-size:12.0pt;">1.3  <span style="color:black;font-size:12.0pt;" lang="EN"><strong>Customer&nbsp;</strong>is</span><span style="color:black;font-size:12.0pt;" lang="EN">:<strong>&nbsp;</strong></span>
        </p>
        <ol style="padding-left:48px;">
        <li>
         <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
            <span style="color:black;font-size:12.0pt;" lang="EN">- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color:black;font-size:12.0pt;" lang="EN">Individuals or their legal representatives who use and/or are interested in the products and services of Galaxy Holdings/ Galaxy Telecom/ Parent company/ Subsidiaries/ Member companies of Galaxy Holdings;</span>
        </p>
      <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
            <span style="color:black;font-size:12.0pt;" lang="EN">- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color:black;font-size:12.0pt;" lang="EN">Individuals or their legal representatives who have accessed and/or registered accounts on websites/applications owned by Galaxy Holdings/ Galaxy Telecom/ Parent company/ Subsidiaries/ Member companies of Galaxy Holdings/ Galaxy Telecom.</span>
        </p>
        </li>
        </ol>
        <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:.5in .75in;text-align:justify;">
          <span style="color:black;font-size:12.0pt;">1.4    <span style="color:black;font-size:12.0pt;" lang="EN"><strong>Products and services of Galaxy Holdings/ Galaxy Telecom</strong> are</span><span style="color:black;font-size:12.0pt;" lang="EN">:<strong>&nbsp;</strong></span>
        </p>
         <ol style="padding-left:48px;">
        <li>
        <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
            <span style="color:black;font-size:12.0pt;" lang="EN">- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color:black;font-size:12.0pt;" lang="EN">Products and services directly researched, developed, and provided to Customers by Galaxy Holdings/ Galaxy Telecom;</span>
        </p>
        <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-.5in;">
            <span style="color:black;font-size:12.0pt;" lang="EN">- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color:black;font-size:12.0pt;" lang="EN">Products and services provided to Customers by Galaxy Holdings/ Galaxy Telecom in cooperation with partners.</span>
        </p>
    </li>
        </ol>
        <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:.5in .75in;text-align:justify;">
          <span style="color:black;font-size:12.0pt;">1.5   <span style="color:black;font-size:12.0pt;" lang="EN"><strong>Personal Data&nbsp;</strong>is information in the form of symbols, letters, numbers, images, sounds, or similar forms associated with a specific person or that helps to identify a specific person.</span>
        </p>
   
        <p style="line-height:normal;margin-bottom:6.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:.5in .75in;text-align:justify;">
          <span style="color:black;font-size:12.0pt;">1.6   <span style="color:black;font-size:12.0pt;" lang="EN"><strong>Processing Personal Data&nbsp;</strong>is one or more activities impacting personal data, such as: collection, recording, analysis, confirmation, storage, editing, disclosure, combining, accessing, retrieving, recalling, encrypting, decrypting, copying, sharing, transmitting, providing, transferring, deleting, destroying personal data or other related actions.</span>
        </p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.75in;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Article 2. Types of Personal Data processed</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">2.1. Customer's personal data processed by Galaxy Holdings/ Galaxy Telecom (hereinafter referred to as "<strong>Personal Data</strong>") includes the following information and may change depending on the type of product or service, and the way Customers interact with Galaxy Holdings/ Galaxy Telecom (</span><i><span style="color:black;font-size:12.0pt;">Galaxy Holdings/ Galaxy Telecom will specifically notify of any changes (if any) and obtain the data subject's consent for such changes</span></i><span style="color:black;font-size:12.0pt;">):</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">2.1.1. Basic Personal Data</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">a) Full name, middle name and birth name, other names (if any);</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">b) Date of birth; date of death or disappearance;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">c) Gender;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">d) Place of birth, place of birth registration, permanent residence, temporary residence, current address, hometown, contact address;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">e) Nationality;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">f) Individual images, including images provided by the Customer when registering for the service, images uploaded by the Customer on Galaxy Holdings/ Galaxy Telecom's applications/websites during service usage;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">g) Phone number, ID card number, personal identification number, passport number, driver's license number, vehicle registration number, personal tax code, social insurance number, health insurance card number;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">h) Marital status;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">i) Information about family relationships (parents, children);</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">j) Information about individual digital accounts;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">k) Data on consumption behavior reflecting activities and historical activities on the network space of Customers when using Galaxy Holdings/ Galaxy Telecom products and services (online behavior; frequency, average duration of calls, messages, customer care calls; device type; operating system; 4G/5G device user ratio; time, data volume used for domestic network, international roaming; international roaming packages; form and amount of phone top-up and usage; service payment time; prepaid or postpaid SIM; value-added service registration rate; short/long data package registration rate);</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">l) Telecommunications credit score of Customers: expressed as a score, which is the result of Galaxy Holdings/ Galaxy Telecom's process of processing and analyzing data of Customers using Galaxy Holdings/ Galaxy Telecom products and services;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">m) Information from mobile device usage: phone configuration, version information of applications on the phone, customer's phone book;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">n) Other information associated with a specific person or helping to identify a specific person not falling under Clause 2.1.2 of this Article.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;">
    <span style="color:black;font-size:12.0pt;">2.1.2. Sensitive Personal Data</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">a) Data on crimes, criminal acts collected and stored by law enforcement agencies;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">b) Customer information of credit institutions, foreign bank branches, payment intermediary service providers, and other authorized organizations, including: customer identification information as regulated by law, account information, deposit information, asset deposit information, transaction information, information about organizations and individuals that are guarantors at credit institutions, bank branches, payment intermediary service providers;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">c) Data on an individual's location determined through location services.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">d) Political views, religious views;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">e) Health status and private life recorded in medical records, not including blood type information;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">f) Information related to racial origin, ethnic origin;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">g) Information about an individual's inherited or acquired genetic characteristics;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">h) Information about an individual's physical attributes, unique biological characteristics;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">i) Information about sexual life, sexual orientation of the individual;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">j) Data on trade union membership;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">k) Data on an individual's financial situation;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">l) Information on the social origin of individuals;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">m) Personal data of children identified as under 7 years old by Galaxy Holdings/ Galaxy Telecom;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">n) Information on accounts of subjects engaged in communication activities, online activities, including call history, message history, email history.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Article 3. Purposes of Personal Data Processing</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">Galaxy Holdings/ Galaxy Telecom processes Personal Data for the following purposes:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">3.1. To identify Customers during the process of providing and using Galaxy Holdings/ Galaxy Telecom's products and services, including:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">a) Registering and creating Customer accounts on Galaxy Holdings/ Galaxy Telecom's systems (websites, applications, etc.);</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">b) Processing transactions, providing products and services requested by Customers;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">c) Customer care, handling complaints, troubleshooting, and resolving Customer issues.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">3.2. To research, develop, and improve product and service quality:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">a) Collecting Customer feedback and suggestions on Galaxy Holdings/ Galaxy Telecom's products and services;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">b) Analyzing Customer usage trends and behavior to optimize products and services, and develop new features or products;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">c) Conducting surveys, market research, and customer satisfaction assessments.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">3.3. To manage and operate business activities:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">a) Managing customer relationships, contracts, and payment information;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">b) Risk management, fraud prevention, and security assurance for the system;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">c) Internal audit, data analysis, and reporting for business planning.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">3.4. To comply with legal obligations:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">a) Fulfilling legal requirements, judicial orders, and requests from competent state agencies;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">b) Implementing regulations on personal data protection and other relevant laws.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">3.5. Other purposes as agreed upon by the Customer and Galaxy Holdings/ Galaxy Telecom, or as required by law.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Article 4. Sources of Personal Data Collection and Processing Methods</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">4.1. Sources of Personal Data Collection:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">a) Data directly provided by the Customer: Personal Data is collected from the Customer through their registration for services, use of products, interactions on websites/applications, or direct communication with Galaxy Holdings/ Galaxy Telecom.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">b) Data collected from third parties: Galaxy Holdings/ Galaxy Telecom may collect Personal Data from partners, service providers, or other legal sources if the Customer has consented to the sharing of their data with these third parties or data storage sources, and Customers agree that Galaxy Holdings/ Galaxy Telecom may collect, store, process, and use this information;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">c) Data from competent authorities: To comply with its obligations under current law, Galaxy Holdings/ Galaxy Telecom may also receive Customer data from competent authorities.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">4.2. Galaxy Holdings/ Galaxy Telecom may process Customer's personal data in the following ways and forms:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">a) Depending on the purpose of processing Customer's personal data in each specific case, Galaxy Holdings/ Galaxy Telecom may apply appropriate processing methods including but not limited to automatic personal data processing methods (through cookies and/or other related technologies), non-automatic or other methods ensuring data protection requirements.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">b) During data processing, Galaxy Holdings/ Galaxy Telecom applies one or more activities impacting personal data such as: collection, recording, analysis, confirmation, storage, editing, publicizing, combining, accessing, retrieving, revoking, encrypting, decrypting, copying, sharing, transmitting, providing, transferring, deleting, destroying data, personal data or other related actions.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">c) Galaxy Holdings/ Galaxy Telecom may directly or through a personal data processor process Customer's data in accordance with current legal provisions.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">d) To achieve the purposes of processing Customer's personal data, Galaxy Holdings/ Galaxy Telecom may transfer Customer's personal data abroad and/or to locations outside the territory of Vietnam. Galaxy Holdings/ Galaxy Telecom will comply with the requirements of Vietnamese law, the law of the country/territory to which the data is transferred, and apply necessary measures to protect Customer's personal data.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Article 5. Start and End Time of Data Processing</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">5.1. Start time of data processing: From the time the Purposes specified in Article 3 are initiated, or from the time the Customer consents to the processing of Personal Data by Galaxy Holdings/ Galaxy Telecom.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">5.2. End time of data processing:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">a) When the purposes of processing Personal Data have been completed, or when the storage period specified in Article 9 of this Policy expires;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">b) When the Customer requests to revoke consent for data processing, delete data, or destroy data, unless otherwise provided by law.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Article 6. Organizations and Individuals allowed to process Personal Data</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">6.1. Galaxy Holdings/ Galaxy Telecom processes Personal Data and ensures compliance with Vietnamese law on personal data protection.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">6.2. Galaxy Holdings/ Galaxy Telecom may share Personal Data with the following organizations and individuals for the purposes specified in Article 3:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">a) Partners and service providers cooperating with Galaxy Holdings/ Galaxy Telecom to provide products and services to Customers (e.g., payment gateways, logistics partners, marketing agencies). These parties are committed to protecting Personal Data in accordance with this Policy and legal regulations.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">b) Affiliates, subsidiaries, or member companies within the Galaxy Holdings ecosystem for internal management, business operations, and comprehensive service provision to Customers.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">c) Competent state agencies, when requested in accordance with legal provisions.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">d) Other organizations or individuals if consented to by the Customer or as required by law.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Article 7. Rights of the Customer regarding Personal Data</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">Customers have the following rights regarding their Personal Data:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">7.1. Right to be informed</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">Customers have the right to be informed of the processing of their Personal Data, except as provided by law.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">7.2. Right to Consent</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">Customers have the right to consent or not consent to the processing of their Personal Data, except in cases where consent is not required by law.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">7.3. Right to Access</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">Customers have the right to access their Personal Data to view, correct, or request correction of their Personal Data by Galaxy Holdings/ Galaxy Telecom, unless otherwise provided by law.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">7.4. Right to Withdraw Consent</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">Customers have the right to withdraw their consent to the processing of Personal Data by Galaxy Holdings/ Galaxy Telecom, unless otherwise provided by law.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">7.5. Right to Delete Data</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">Customers have the right to request Galaxy Holdings/ Galaxy Telecom to delete their Personal Data, unless otherwise provided by law.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">7.6. Right to Restrict Data Processing</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">Customers have the right to request Galaxy Holdings/ Galaxy Telecom to restrict the processing of Personal Data, unless otherwise provided by law.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">7.7. Right to Object to Data Processing</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">Customers have the right to object to the processing of their Personal Data, unless otherwise provided by law.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">7.8. Right to Data Portability</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">Customers have the right to request Galaxy Holdings/ Galaxy Telecom to provide their Personal Data in a structured, commonly used, and machine-readable format, unless otherwise provided by law.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">7.9. Right to Complain, Denounce, and Sue</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">Customers have the right to complain, denounce, or sue in accordance with legal provisions.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">7.10. Right to Claim Damages</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">Customers have the right to claim damages in accordance with legal provisions when there is a violation of regulations on personal data protection, unless otherwise agreed by the parties or stipulated by law.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">7.11. Right to Self-Protection</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:63.0pt;margin-right:0in;margin-top:6.0pt;tab-stops:63.0pt;text-align:justify;text-indent:-27.0pt;">
    <span style="color:black;font-size:12.0pt;">Customers have the right to self-protect in accordance with the Civil Code, other relevant laws, and Decree 13/2023/ND-CP on personal data protection (and any amending or replacing documents), or to request competent agencies or organizations to implement civil rights protection methods as stipulated in Article 11 of the Civil Code.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Article 8. Customer Obligations</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">Customers are responsible for protecting their Personal Data as follows:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">8.1. Actively implement measures to protect, manage, and safely use accounts and personal technological devices (including devices such as smartphones, computers, tablets, laptops, and other devices) by logging out after use, setting a strong password, and keeping their login information and password confidential. The aforementioned measures for safe account and mobile device use help prevent unauthorized access to Customer accounts. Galaxy Holdings/ Galaxy Telecom is exempted from liability for Customer's damages in cases where Customer's password is exposed/lost, stolen, leading to unauthorized account access, or any activity on Customer's account used on a lost or misplaced mobile device leading to unauthorized service use, or if Galaxy Holdings/ Galaxy Telecom's system is illegally compromised by a third party despite Galaxy Holdings/ Galaxy Telecom having implemented all necessary measures to protect the system (unless due to Galaxy Holdings/ Galaxy Telecom's fault);</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">8.2. Having accepted all terms and conditions of this Policy, Customers are responsible for providing complete and accurate Personal Data as requested by Galaxy Holdings/ Galaxy Telecom and are responsible for immediately notifying Galaxy Holdings/ Galaxy Telecom upon detecting any violation of personal data protection regulations;</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">8.3. Customers are responsible for respecting the Personal Data of other data subjects and for complying with legal provisions on Personal Data protection, participating in preventing and combating violations of Personal Data protection regulations.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Article 9. Personal Data Storage</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">9.1. Customer's Personal Data stored by Galaxy Holdings/ Galaxy Telecom will be kept confidential. Galaxy Holdings/ Galaxy Telecom is responsible for implementing measures to protect Customer's Personal Data in accordance with legal provisions.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">9.2. Location of Personal Data Storage: Within the scope permitted by law, Galaxy Holdings/ Galaxy Telecom may store Customer's Personal Data in Vietnam and abroad, including on cloud computing storage solutions. Galaxy Holdings/ Galaxy Telecom applies data security standards consistent with current legal provisions. The transfer of personal data abroad must comply with the provisions of Article 25 of Decree 13/2023/ND-CP (as amended, supplemented, or replaced from time to time) and other legal provisions.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">9.3. Personal Data Storage Period: Galaxy Holdings/ Galaxy Telecom only stores Customer's Personal Data for the period necessary to achieve the purposes for which the data was collected or as required by law. After this period, Personal Data will be deleted or anonymized in accordance with legal regulations.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Article 10. Protection of Personal Data of Minors</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">10.1. Galaxy Holdings/ Galaxy Telecom acknowledges the importance of protecting the Personal Data of minors. If Personal Data of a minor is processed, Galaxy Holdings/ Galaxy Telecom will ensure compliance with legal provisions on personal data protection for minors.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">10.2. In cases where the processing of Personal Data of a minor requires consent from their parent or guardian, Galaxy Holdings/ Galaxy Telecom will implement necessary measures to verify and obtain this consent.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Article 11. Security Measures for Personal Data</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">Galaxy Holdings/ Galaxy Telecom implements appropriate technical and organizational security measures to protect Personal Data from unauthorized access, alteration, disclosure, loss, or destruction. These measures include:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">11.1. Applying advanced security technologies: Using encryption, firewalls, intrusion detection systems, and other advanced security technologies to protect data on systems and networks.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">11.2. Access control: Implementing strict access control policies to Personal Data, ensuring that only authorized personnel can access the data based on their job requirements.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">11.3. Regular security audits and assessments: Conducting regular security audits and assessments to identify and address potential vulnerabilities in the system.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">11.4. Employee training: Providing regular training to employees on personal data protection and security policies to raise awareness and ensure compliance.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">11.5. Incident response plan: Developing and maintaining an incident response plan to promptly and effectively handle any personal data security incidents.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Article 12. Consequences of not providing Personal Data</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">In cases where Customers do not provide or provide incomplete or inaccurate Personal Data as required by Galaxy Holdings/ Galaxy Telecom, it may lead to the following consequences:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">12.1. Inability to use products and services: Customers may not be able to register for, access, or use certain products or services of Galaxy Holdings/ Galaxy Telecom that require specific Personal Data.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">12.2. Limited service quality: The quality of services or customer support provided by Galaxy Holdings/ Galaxy Telecom may be affected if accurate and complete Personal Data is not available.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">12.3. Legal and regulatory compliance issues: Failure to provide required Personal Data may lead to non-compliance with legal regulations, affecting the Customer's rights and obligations.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Article 13. Changes to the Policy</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">Galaxy Holdings/ Galaxy Telecom may update or amend this Policy from time to time to ensure compliance with legal regulations and reflect changes in its data processing activities. Any significant changes will be notified to Customers through official channels. Customers are encouraged to regularly review the Policy to stay informed about how their Personal Data is being protected.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:0in;margin-right:0in;margin-top:6.0pt;text-align:justify;">
    <span style="color:black;font-size:12.0pt;"><strong>Article 14. Contact Information</strong></span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">Customers can contact Galaxy Holdings/ Galaxy Telecom for questions or requests related to personal data protection using the information below:</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">14.1. Contact the hotline using the information on Galaxy Holdings/ Galaxy Telecom's official websites/applications at the relevant time.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">14.2. Send official correspondence to the following addresses:885 Hong Ha Street, Chuong Duong Do, Hoan Kiem, Hanoi.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">14.3. Contact directly at Galaxy Holdings/ Galaxy Telecom's transaction points nationwide.</span>
</p>
<p style="line-height:normal;margin-bottom:6.0pt;margin-left:.5in;margin-right:0in;margin-top:6.0pt;tab-stops:.5in;text-align:justify;text-indent:-.5in;">
    <span style="color:black;font-size:12.0pt;">14.4. Other contact methods such as Livechat (online chat software), contact via Galaxy Holdings/ Galaxy Telecom's official fanpage (electronic information page), customer care email provided to Customers at all times.</span>
</p>
<div>
    <hr align="left" size="1" width="33%">
    <div id="ftn1">
        <p style="margin-bottom:.0001pt;margin:0in;text-align:justify;">
            <a href="#_ftnref1" name="_ftn1" title=""><i><span style="color:black;font-size:10.0pt;line-height:107%;"><strong>[1]</strong></span></i></a><i><span style="color:black;font-size:10.0pt;"> Strong passwords must ensure the following elements:</span></i>
        </p>
        <ul style="list-style-type:disc;padding-left:15px;">
            <li>
                <p style="line-height:normal;margin-bottom:.0001pt;margin-right:0in;margin-top:0in;tab-stops:list .5in;text-align:justify;">
                    <i><span style="color:black;font-size:10.0pt;">Use a minimum of 8 characters and a maximum of 15 characters.</span></i>
                </p>
            </li>
            <li>
                <p style="line-height:normal;margin-bottom:.0001pt;margin-right:0in;margin-top:0in;tab-stops:list .5in;text-align:justify;">
                    <i><span style="color:black;font-size:10.0pt;">Include numbers, lowercase letters, uppercase letters, and special characters.</span></i>
                </p>
            </li>
            <li>
                <p style="line-height:normal;margin-bottom:.0001pt;margin-right:0in;margin-top:0in;tab-stops:list .5in;text-align:justify;">
                    <i><span style="color:black;font-size:10.0pt;">Be unique; do not use it for other accounts.</span></i>
                </p>
            </li>
            <li>
                <p style="line-height:normal;margin-bottom:.0001pt;margin-right:0in;margin-top:0in;tab-stops:list .5in;text-align:justify;">
                    <i><span style="color:black;font-size:10.0pt;">Should not contain associated meanings (phone numbers, birth dates, place names, etc.).</span></i>
                </p>
            </li>
            <li>
                <p style="line-height:normal;margin-bottom:.0001pt;margin-right:0in;margin-top:0in;tab-stops:list .5in;text-align:justify;">
                    <i><span style="color:black;font-size:10.0pt;">Do not use proper names.</span></i>
                </p>
            </li>
            <li>
                <p style="line-height:normal;margin-bottom:.0001pt;margin-right:0in;margin-top:0in;tab-stops:list .5in;text-align:justify;">
                    <i><span style="color:black;font-size:10.0pt;">Do not use famous numbers, e.g., 113, 115, 12345678...</span></i>
                </p>
            </li>
            <li>
                <p style="line-height:normal;margin-bottom:.0001pt;margin-right:0in;margin-top:0in;tab-stops:list .5in;text-align:justify;">
                    <i><span style="color:black;font-size:10.0pt;">Do not use information from the password for the secret question (a secret question is a method to help users reset their password if forgotten).</span></i>
                </p>
            </li>
        </ul>
        <p>
            &nbsp;
        </p>
    </div>
</div>
</div>`
    }
};


const PersonalDataPolicyPage = () => {
    const local = useLocale();
    const searchParams = useSearchParams();
    const content = datamockPersonalDataProtection[local] || datamockPersonalDataProtection.vi;
    const src = searchParams.get('src');
    const isVikki = src === 'vikki';
    const router = useRouter();
    useEffect(() => {
        trackPageView().catch(err => console.error('Track page view error:', err));
    }, []);

    return (<div className="flex flex-col min-h-screen font-koho">
        {src!=="app" && !isVikki && ( <Header />)}
        <main className="">
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
                <img src="/assets/policy_header.png" alt="" className={"w-1/6 sm:w-fit"}/>
                <h1 className="font-bold text-[24px] md:text-[70px] leading-[1.2em]  z-10 text-center px-4">
                    {content.title}
                </h1>
            </div>
            <div dangerouslySetInnerHTML={{__html: content.content}} className='my-8 container'/>

        </main>
        {src!=="app" && !isVikki && (<Footer />)}
    </div>);
};
export default PersonalDataPolicyPage;
