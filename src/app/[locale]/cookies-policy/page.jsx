'use client';
import { useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const datamock = {
	vi: {
		title: 'Chính sách bảo mật và Cookies',
		content: `<div class="sub-container">
  <p> <span class="title-footer-18"> skyfi.vn</span> cam kết sẽ bảo mật những thông tin mang tính riêng tư của khách hàng. Quý khách vui lòng đọc bản “Chính sách bảo mật” dưới đây để hiểu hơn những cam kết mà chúng tôi thực hiện, nhằm tôn trọng và bảo vệ quyền lợi của người truy cập:</p>
<p class="title-footer-18 my-4">1. Mục đích thu thập thông tin cá nhân</p>
<p>Việc thu thập dữ liệu chủ yếu trên website skyfi.vn bao gồm họ và tên, số điện thoại, địa chỉ email. Đây là các thông tin mà skyfi.vn cần thành viên cung cấp bắt buộc khi tiến hành đặt hàng trên website và để skyfi.vn liên hệ xác nhận đơn trước khi giao nhằm đảm bảo quyền lợi cho thành viên, cũng như đưa tới những voucher cho thành viên trong những ngày lễ kỉ niệm như sinh nhật.</p>
<p> Trong quá trình tham gia Website skyfi.vn, skyfi.vn chỉ lưu giữ thông tin chi tiết về thông tin các đơn hàng, số điện thoại, email trên hệ thống.</p>

<p> skyfi.vn cũng sẽ sử dụng cả thông tin nhận diện cá nhân của thành viên và một số thông tin nhận diện phi cá nhân (như cookies, địa chỉ IP, loại trình duyệt, …) để xác định vị trí của thành viên thông qua hệ thống định vị GPS. </p>
<p>Các thành viên sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ dưới địa chỉ và số điện thoại của mình. Ngoài ra, thành viên có trách nhiệm thông báo kịp thời cho skyfi.vn về những hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật, lưu giữ thông tin đơn hàng của bên thứ ba để có biện pháp giải quyết phù hợp.</p>

<p class="font-bold mt-4">skyfi.vn cam kết không mặc định buộc người tiêu dùng phải sử dụng các dịch vụ đính kèm khi cài đặt và sử dụng website của mình.</p>
Email: customercare@skyfi.vn<p></p>
<p class="title-footer-18 my-4">2. Phạm vi sử dụng thông tin cá nhân</p>
<p>Website skyfi.vn sử dụng thông tin thành viên cung cấp để:</p>
<ul class="list-none">
<li>- Cung cấp các dịch vụ đến thành viên;</li>
<li>- Gửi các thông báo về các hoạt động trao đổi thông tin giữa thành viên và skyfi.vn </li>
<li>- Ngăn ngừa các hoạt động phá hủy tài khoản người dùng của thành viên hoặc các hoạt động giả mạo thành viên;</li>
<li>- Liên lạc và giải quyết với thành viên trong những trường hợp đặc biệt.</li>
<li>- Không sử dụng thông tin cá nhân của thành viên ngoài mục đích xác nhận và liên hệ có liên quan đến giao dịch tại Website skyfi.vn </li>
<li>- Trong trường hợp có yêu cầu của pháp luật: skyfi.vn có trách nhiệm hợp tác cung cấp thông tin cá nhân thành viên khi có yêu cầu từ cơ quan tư pháp bao gồm: Viện kiểm sát, tòa án, cơ quan công an điều tra liên quan đến hành vi vi phạm pháp luật nào đó của khách hàng. Ngoài ra, không ai có quyền xâm phạm vào thông tin cá nhân của thành viên </li>
</ul>
<p class="title-footer-18 my-4">3. Thời gian lưu trữ thông tin</p>
<p>Dữ liệu cá nhân của thành viên sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự thành viên đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp, thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ của website skyfi.vn.</p>
<p class="title-footer-18 my-4">4. Những người hoặc tổ chức có thể được tiếp cận với thông tin đó</p>
<p>Thành viên (Người mua) đồng ý rằng, trong trường hợp cần thiết, các cơ quan/ tổ chức/cá nhân sau có quyền được tiếp cận và thu thập các thông tin cá nhân của mình, bao gồm:</p>
<ul class="ml-2" style="list-style-type: disc;">
<li>Ban quản trị.</li>
<li>Cơ quan nhà nước có thẩm quyền trong trường hợp có yêu cầu theo quy định tại quy chế hoạt động.</li>
<li>Cố vấn tài chính, pháp lý và Công ty kiểm toán.</li>
<li>Bên khiếu nại chứng minh được hành vi vi phạm của người tiêu dùng.</li>
<li>Theo yêu cầu của cơ quan nhà nước có thẩm quyền.</li>
</ul>
<p class="title-footer-18 my-4">5. Địa chỉ của đơn vị thu thập và quản lý thông tin</p>
<p>CÔNG TY TNHH GALAXY DIGITAL HOLDINGS</p>
<p>Địa chỉ: Toà nhà PV Gas Tower 673 Nguyễn Hữu Thọ, Xã Phước Kiển, Huyện Nhà Bè, TP Hồ Chí Minh</p>
<p>Điện thoại: (028) 38273795      <span class="mr-20"></span>                   Email: customercare@skyfi.vn</p>
<p class="title-footer-18 my-4">6. Phương thức và công cụ để người tiêu dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình</p>
<p>Thành viên có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân của mình bằng cách đăng nhập vào tài khoản và chỉnh sửa thông tin cá nhân hoặc yêu cầu skyfi.vn thực hiện việc này.</p>
<p>Thành viên có quyền gửi khiếu nại về việc lộ thông tin cá nhân cho bên thứ 3 đến Ban quản trị của Website skyfi.vn. Khi tiếp nhận những phản hồi này, skyfi.vn sẽ xác nhận lại thông tin, phải có trách nhiệm trả lời lý do và hướng dẫn thành viên khôi phục và bảo mật lại thông tin.</p>
               Email: customercare@skyfi.vn<p></p>
<p class="title-footer-18 my-4">7. Cơ chế tiếp nhận và giải quyết khiếu nại của người tiêu dùng liên quan đến việc thông tin cá nhân bị sử dụng sai mục đích hoặc phạm vi đã thông báo.</p>
<p>Khi phát sinh khiếu nại, tranh chấp liên quan tới thông tin cá nhân của thành viên, chất lượng sản phẩm, dịch vụ của Nhà cung cấp, skyfi.vn đề cao giải pháp thương lượng, hòa giải giữa các bên nhằm duy trì sự tin cậy của thành viên vào chất lượng dịch vụ của Công ty và thực hiện theo các bước sau:</p>
<p>Bước 1: Thành viên khiếu nại về vụ việc liên quan tới thông tin cá nhân của mình tới skyfi.vn qua Email: customercare@skyfi.vn, gửi phản hồi từ website skyfi.vn, và/hoặc các hình thức khác không trái quy định Pháp luật.</p>
<p>Bước 2: Bộ phận Chăm sóc khách hàng của skyfi.vn sẽ tiếp nhận các khiếu nại của người dùng, tùy theo tính chất và mức độ của khiếu nại, Công ty sẽ có những biện pháp cụ thể để hỗ trợ người dùng giải quyết tranh chấp đó và trả lời kết quả cho thành viên trong thời hạn 10 ngày làm việc.</p>
<p>Trong trường hợp sự việc nằm ngoài khả năng và thẩm quyền giải quyết của Công ty, skyfi.vn sẽ yêu cầu thành viên đưa sự việc tới cơ quan nhà nước có thẩm quyền giải quyết theo Pháp luật.</p>
<p>skyfi.vn tôn trọng và nghiêm túc thực hiện các quy định về bảo vệ quyền lợi thành viên. Vì vậy, skyfi.vn cũng đề nghị thành viên tôn trọng và tuân thủ đúng theo Chính sách bảo vệ thông tin cá nhân này và thực hiện cung cấp các thông tin một cách đầy đủ, chính xác, chi tiết và trung thực. Mọi hành vi lừa đảo, gian lận, xâm hại đến quyền và lợi ích hợp pháp của thành viên khác đều bị lên án và phải chịu hoàn toàn trách nhiệm trước Pháp luật.</p>
  <p class="title-footer-18 my-4">8. Cam kết bảo mật thông tin cá nhân và thông tin thanh toán của khách hàng</p>
<p class="title-footer-18 mb-4">Cam kết bảo mật thông tin cá nhân</p>
<p>- Thông tin cá nhân của thành viên trên website skyfi.vn được skyfi.vn cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của skyfi.vn. Việc thu thập và sử dụng thông tin của mỗi thành viên chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác.</p>
<p>- Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân của thành viên khi không có sự cho phép đồng ý từ thành viên.</p>
<p>- Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân thành viên, skyfi.vn sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho thành viên được biết.</p>
<p>- Ban quản lý website skyfi.vn yêu cầu các cá nhân khi đặt hàng phải cung cấp đầy đủ thông tin cá nhân có liên quan như: số điện thoại, email, họ tên, địa chỉ và chịu trách nhiệm về tính pháp lý của những thông tin trên. Ban quản lý website skyfi.vn không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên quan đến quyền lợi của Thành viên đó nếu xét thấy tất cả thông tin cá nhân của thành viên đó cung cấp khi đăng ký ban đầu là không chính xác.</p>
<p>- skyfi.vn chịu trách nhiệm đảm bảo an toàn thông tin cá nhân được thu thập, lưu trữ ngăn ngừa những hành vi sau:</p>
<p>+ Đánh cắp hoặc tiếp cận thông tin trái phép</p>
<p>+ Sử dụng thông tin trái phép</p>
<p>+ Thay đổi, phá hủy thông tin trái phép</p>
<p>- Cơ chế giải quyết khiếu nại của thành viên trong trường hợp thông tin thành viên bị sử dụng sai mục đích, phạm vi đã thông báo: </p>
<p>Khi phát sinh khiếu nại, tranh chấp liên quan tới thông tin cá nhân của thành viên, skyfi.vn đề cao giải pháp thương lượng, hòa giải giữa các bên nhằm duy trì sự tin cậy của thành viên vào chất lượng dịch vụ của Công ty và thực hiện theo các bước sau:</p>
<p>Bước 1: Thành viên khiếu nại về vụ việc liên quan tới thông tin cá nhân của mình tới skyfi.vn qua Email: customercare@skyfi.vn, gửi phản hồi từ website skyfi.vn, và/hoặc các hình thức khác không trái quy định Pháp luật.</p>
<p>Bước 2: Bộ phận Chăm sóc khách hàng của skyfi.vn sẽ tiếp nhận các khiếu nại của người dùng, tùy theo tính chất và mức độ của khiếu nại, skyfi.vn sẽ có những biện pháp cụ thể để hỗ trợ người dùng giải quyết tranh chấp đó và trả lời kết quả cho thành viên trong thời hạn 10 ngày làm việc.</p>
<p>Trong trường hợp sự việc nằm ngoài khả năng và thẩm quyền giải quyết của skyfi.vn, Công ty sẽ yêu cầu thành viên đưa sự việc tới cơ quan nhà nước có thẩm quyền giải quyết theo Pháp luật.</p>
<p>skyfi.vn tôn trọng và nghiêm túc thực hiện các quy định về bảo vệ quyền lợi thành viên. Vì vậy, Công ty cũng đề nghị thành viên tôn trọng và tuân thủ đúng theo Chính sách bảo vệ thông tin cá nhân này và thực hiện cung cấp các thông tin một cách đầy đủ, chính xác, chi tiết và trung thực. Mọi hành vi lừa đảo, gian lận, xâm hại đến quyền và lợi ích hợp pháp của người khác đều bị lên án và phải chịu hoàn toàn trách nhiệm trước Pháp luật.</p>
<p class="title-footer-18 my-4">Cam kết bảo mật thông tin thanh toán</p>
<p>skyfi.vn đảm bảo an toàn, bảo mật giao dịch thanh toán của khách hàng, xử lý khiếu nại và đền bù thiệt hại trong trường hợp thông tin thanh toán của khách hàng qua website skyfi.vn bị thay đổi, xóa, hủy, sao chép, tiết lộ, di chuyển trái phép hoặc bị chiếm đoạt gây thiệt hại cho khách hàng.</p>
<p>Các khoản thanh toán trực tuyến sẽ được xử lý bởi các Mạng lưới của các ngân hàng liên kết của chúng tôi. Quý khách chỉ đưa cho chúng tôi hoặc website những thông tin chính xác, không gây nhầm lẫn và phải thông báo cho chúng tôi nếu có thay đổi hoặc sự cố phát sinh liên quan để cùng phối hợp với các đơn vị Ngân hàng liên kết cũng như cơ quan chức năng giải quyết. </p>
<p class="title-footer-18 my-4"> 9. Chính sách hiển thị rõ ràng cho người tiêu dùng trước hoặc tại thời điểm thu thập thông tin.</p>
<p>skyfi.vn tiến hành xây dựng và công bố chính sách bảo vệ thông tin cá nhân để thu thập và sử dụng thông tin cá nhân của khách hàng dựa trên các nội dung: Mục đích thu thập thông tin cá nhân; Phạm vi sử dụng thông tin; Thời gian lưu trữ thông tin; Những người hoặc tổ chức có thể được tiếp cận với thông tin đó; Địa chỉ của đơn vị thu thập và quản lý thông tin, bao gồm cách thức liên lạc để người tiêu dùng có thể hỏi về hoạt động thu thập, xử lý thông tin liên quan đến cá nhân mình; Phương thức và công cụ để người tiêu dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình trên hệ thống thương mại điện tử của đơn vị thu thập thông tin đã được hiện thị rõ ràng cho khách hàng trước thời điểm thu thập thông tin. </p>
  </div>`,
	},
	en: {
		title: 'Privacy and Cookies Policy',
		content: `<div class="sub-container">
  <p> <span class="title-footer-18">skyfi.vn</span> commits to safeguarding the privacy of customer's personal information. Please read the following "Privacy Policy" document to understand the commitments we make to respect and protect the rights of visitors:</p>
<p class="title-footer-18 my-4">1. The purpose of collecting personal information</p>
<p>The primary data collected on the skyfi.vn website includes full name, phone number, and email address. These are the pieces of information that skyfi.vn requires members to provide when placing orders on the website and for skyfi.vn to contact and confirm orders before delivery, ensuring the members' rights, as well as providing vouchers to members on special occasions such as birthdays.</p>
<p>During the participation on the skyfi.vn website, skyfi.vn only retains detailed information about order information, phone numbers, and emails in the system.</p>
<p>skyfi.vn will also use both personal identification information of members and some non-personal identification information (such as cookies, IP addresses, browser types, etc.) to determine the location of members through GPS positioning systems.
Members will be responsible for the security and maintenance of all activities using the service under their address and phone number. Additionally, members are responsible for promptly notifying skyfi.vn of any unauthorized, abusive, security-violating use, maintaining the order information of third parties for appropriate resolution.</p>

<p class="font-bold mt-4">skyfi.vn commits not to impose mandatory additional services on consumers when installing and using its website.</p>
                Email: customercare@skyfi.vn<p></p>


<p class="title-footer-18 my-4">2. Scope of use of personal information</p>
<p>Website skyfi.vn uses member information provided to:</p>
<p></p>- Provide services to Members;<p></p>
<p>- Send notifications about information exchange activities between members and skyfi.vn;</p>
<p>- Prevent activities that harm the user accounts of members or impersonate Members;</p>
<p>- Communicate with and resolve issues with members in special cases.</p>
<p>- Do not use members' personal information for purposes other than confirming and contacting related transactions on the skyfi.vn website.</p>
<p>- In the event of a legal request: skyfi.vn is responsible for cooperating in providing members' personal information when requested by judicial authorities, including: the Prosecutor's Office, courts, and law enforcement agencies investigating any violations of the law by customers. In addition, no one has the right to infringe upon the personal information of members.</p>


<p class="title-footer-18 my-4">3. The retention period of information:</p>
<p>The personal data of Members will be stored until there is a request for cancellation or until the Member themselves logs in and performs the cancellation. Otherwise, in all cases, members' personal information will be securely stored on the servers of the skyfi.vn website.</p>


<p class="title-footer-18 my-4">4. Those who may access the information</p>
<p>Members (Buyers) agree that, if necessary, the following agencies/organizations/individuals have the right to access and collect their personal information, including:</p>
  <ul class="ml-2" style="list-style-type: disc;">
<li>Administrators.</li>
<li>State agencies with jurisdiction in cases of requests as regulated in the operating regulations. </li>
<li>Financial advisors, legal advisors, and auditing companies.</li>
<li>Complainants who demonstrate consumer misconduct.</li>
<li>Upon request by competent state authorities.</li>
</ul>


<p class="title-footer-18 my-4">5. Address of the entity collecting and managing information </p>
<p>GALAXY DIGITAL HOLDINGS CO., LTD.</p>
<p>Address: PV Gas Tower Building, 673 Nguyen Huu Tho, Phuoc Kien Commune, Nha Be District, Ho Chi Minh City</p>
<p>Phone: (028) 3827 3795       <span class="mr-20"></span>                 Email: customercare@skyfi.vn</p>


<p class="title-footer-18 my-4">6. Methods and tools for consumers to access and edit their personal data</p>


<p>Members have the right to independently check, update, adjust, or cancel their personal information by logging into their account and editing their personal information or by requesting skyfi.vn to do so.</p>


<p>Members have the right to file complaints about the disclosure of personal information to third parties to the Website skyfi.vn Administrator. Upon receiving such feedback, skyfi.vn will confirm the information, be responsible for providing reasons, and guide members on restoring and securing their information.</p>
Email: customercare@skyfi.vn<p></p>

<p class="title-footer-18 my-4">7. Mechanism for receiving and resolving consumer complaints related to the misuse of personal information or the scope specified </p>


<p>In the event of complaints or disputes concerning members' personal information, product quality, or services provided by the Supplier, skyfi.vn emphasizes negotiation and reconciliation solutions between parties to maintain members' trust in the Company's service quality and follows these steps:</p>
<p>Step 1: Members file complaints related to their personal information with skyfi.vn via Email: customercare@skyfi.vn, sending feedback through the skyfi.vn website, and/or other forms not prohibited by law.</p>
<p>Step 2: skyfi.vn's Customer Care Department will receive user complaints. Depending on the nature and severity of the complaint, the Company will take specific measures to assist users in resolving the dispute and provide results to the member within 10 working days.</p>
<p>In cases beyond the company's ability and jurisdiction to resolve, skyfi.vn will request the member to refer the matter to the competent state authority for resolution according to the law.</p>
<p>skyfi.vn respects and earnestly implements regulations on protecting members' rights. Therefore, skyfi.vn also requests members to respect and comply with this Privacy Policy and provide information accurately, fully, in detail, and truthfully. Any fraudulent, deceptive, or infringing behavior against the legitimate rights and interests of other members is condemned and fully accountable under the law.</p>


<p class="title-footer-18 my-4">8. Commitment to the security of personal information and customer payment information</p>
<p class="title-footer-18 mb-4"> Commitment to securing personal information:</p>
<p>- Personal information of members on the skyfi.vn website is committed to absolute security according to skyfi.vn's privacy policy. The collection and use of information for each member shall only be carried out with the customer's consent, except for cases where other legal regulations apply.</p>
<p>- No use, transfer, provision, or disclosure to any third party of a member's personal information without the member's consent.</p>
<p>- In the event of a server storing information being attacked by hackers resulting in the loss of members' personal data, skyfi.vn shall promptly notify the competent authorities to investigate and handle the incident and inform the members.</p>
<p>- The management board of the skyfi.vn website requires individuals placing orders to provide complete personal information such as phone number, email, full name, address, and be responsible for the legal validity of such information. The management board of the skyfi.vn website shall not be responsible for nor resolve any complaints related to the rights of that member if all the personal information provided by the member during the initial registration is found to be inaccurate.</p>
<p>- skyfi.vn is responsible for ensuring the security of the personal information collected, stored, and preventing the following behaviors:</p>
<p>  + Theft or unauthorized access to information</p>
<p>  + Unauthorized use of information</p>
<p>  + Unauthorized alteration or destruction of information</p>
<p>- Mechanism for resolving member complaints in cases where member information is misused or exceeds the specified scope:</p>
 <p>  In the event of complaints or disputes related to member's personal information, SKYFI.VN emphasizes negotiation and reconciliation solutions between parties to maintain members' trust in the Company's service quality and follows these steps:</p>
<p>Step 1: Members file complaints related to their personal information with SKYFI.VN via Email: support@skyfi.vn, sending feedback through the SKYFI.VN website, and/or other forms not prohibited by law.</p>
 <p>Step 2: The Customer Care Department of skyfi.vn will receive user complaints. Depending on the nature and severity of the complaint, skyfi.vn will take specific measures to assist users in resolving the dispute and provide results to the member within 10 working days.</p>
<p>In cases beyond the company's ability and jurisdiction to resolve, the Company will request the member to refer the matter to the competent state authority for resolution according to the law.</p>
<p>skyfi.vn respects and earnestly implements regulations on protecting members' rights. Therefore, the Company also requests members to respect and comply with this Privacy Policy and provide information accurately, fully, in detail, and truthfully. Any fraudulent, deceptive, or infringing behavior against the legitimate rights and interests of others is condemned and fully accountable under the law.</p>
<p class="title-footer-18 my-4">Commitment to the security of payment information</p>
<p> <span class="title-footer-18">skyfi.vn</span> ensures the safety and security of customer payment transactions, handles complaints, and compensates for damages in cases where customer payment information via the <span class="title-footer-18">skyfi.vn</span> website is altered, deleted, canceled, copied, disclosed, unlawfully moved, or misappropriated, resulting in harm to the customer.
Online payments will be processed by the networks of our partner banks. Customers only provide accurate, non-confusing information to us or the website and must notify us of any changes or related incidents for us to coordinate with partner banks and relevant authorities to resolve them.</p>

<p class="title-footer-18 my-4">9. A clear policy is displayed to consumers prior to or at the time of information collection.</p>
<p>skyfi.vn undertakes to develop and publish a privacy policy to collect and use customer personal information based on the following contents: Purpose of collecting personal information; Scope of information usage; Information retention period; Entities or organizations that may access such information; Address of the information collection and management unit, including contact methods for consumers to inquire about the collection and processing activities related to their personal information; Methods and tools for consumers to access and edit their personal data on the electronic commerce system of the information collecting entity, which have been clearly displayed to customers prior to information collection.</p>

  </div>`}

};


const CookiesPolicyPage = () => {
	const local = useLocale();
	const content = datamock[local] || datamock.vi;
	const searchParams = useSearchParams();
	const src = searchParams.get('src');
	const router = useRouter();
	const isVikki = src === 'vikki';


	return (
		<div className="flex flex-col min-h-screen font-koho">
			{(src != "app" && !isVikki)  && (<Header />)}
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
				<div className="w-full h-[55px] md:h-[340px] flex items-center relative bg-[#ED1B2F] bg-center text-white rounded-b-3xl">
					<img src="/assets/policy_header.png" alt="" className={"w-1/6 sm:w-fit"} />
					<h1 className="font-bold text-[24px] md:text-[70px] leading-[1.2em]  z-10 text-center px-4">
						{content.title}
					</h1>
				</div>
				<div dangerouslySetInnerHTML={{ __html: content.content }} className='my-8 container' />

			</main>
			  {src !== "app" && !isVikki && (<Footer />)}
		</div>
	);
};
export default CookiesPolicyPage;
