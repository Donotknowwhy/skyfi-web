# FE Integration Tasks for BSS Public API v2

## Mục tiêu

Tích hợp luồng mua eSIM quốc tế của BSS Public API v2 vào website SkyFi: chọn điểm đến, lọc và chọn gói, resolve giá theo channel, tạo đơn, chuyển sang GalaxyPay và kiểm tra trạng thái sau khi quay lại.

Nguồn contract được đối chiếu:

- `partner-integration-guide-v4.docx`: API và payload chính thức.
- `partner-integration-guide-v4.postman_environment.json`: môi trường demo và dữ liệu test.
- `seq-mua-esim-quoc-te.html`: trình tự region → filter → package → order → GalaxyPay → provision eSIM.

## Phạm vi FE có thể triển khai

| Luồng | BSS endpoint | Màn hình hiện có | Kết quả cần đạt |
|---|---|---|---|
| Chọn quốc gia/khu vực/toàn cầu | `GET /regions?type=` | `travel-esim/page.js` | Lấy danh sách điểm đến từ BSS v2. |
| Tìm và lọc gói | `GET /packages` | `esim/[countrySlug]/page.js` | Hiển thị gói và giá theo `channel`. |
| Lọc dung lượng/ngày | `GET /packages/data-options`, `GET /packages/validity-days` | Trang danh sách gói | Render filter chỉ gồm lựa chọn có thể bán. |
| Kiểm tra giá | `GET /packages/{packageId}/price` | Card gói/checkout | Giá và giới hạn số lượng do server quyết định. |
| Tạo đơn | `POST /orders` | Checkout eSIM | Nhận `order_number` và `payment_url`. |
| Thanh toán | Redirect GalaxyPay | Checkout/result | Chuyển khách sang GalaxyPay an toàn. |
| Kiểm tra kết quả | `GET /orders/{orderCode}` | Result page | Hiển thị trạng thái thanh toán/đơn hàng. |

## Kiến trúc bắt buộc

Không gọi BSS v2 trực tiếp từ browser. Public API yêu cầu JWT Partner, trong khi username, password, access token và refresh token không được lộ qua `NEXT_PUBLIC_*` hoặc DevTools.

```text
Browser
  -> /api/bss/* (Next.js route handlers)
  -> BSS Public API v2
  -> GalaxyPay redirect
```

Các route handler chỉ chuyển tiếp dữ liệu đã được validate; chúng giữ thông tin partner ở server và trả về response FE-safe.

## Cấu hình môi trường

Thêm biến server-only vào `.env.local` hoặc secret manager của môi trường deploy:

```env
# dev: http://localhost:8080/api/bss/app/v2/public
# staging: https://api-staging.skyfi.vn/api/bss/app/v2/public
# production: https://api.skyfi.vn/api/bss/app/v2/public
BSS_API_BASE_URL=https://api-staging.skyfi.vn/api/bss/app/v2/public
BSS_AUTH_BASE_URL=https://api-staging.skyfi.vn
BSS_PARTNER_USERNAME=
BSS_PARTNER_PASSWORD=
BSS_CHANNEL=BSS
```

Không thêm các biến trên vào `NEXT_PUBLIC_*`, không commit giá trị thật và không dùng tài khoản Postman demo trong source code.

## Đầu việc theo thứ tự triển khai

### 1. Xác nhận contract với backend

- [ ] Chốt rule authentication. Tài liệu có mâu thuẫn: một đoạn nói tất cả endpoint v2 yêu cầu JWT `PARTNER_API`, một đoạn lại nói v2 không cần JWT; các ví dụ `curl` cũng thiếu header Authorization.
- [ ] Xác nhận username Partner nhận JWT có claim/role nào: tài liệu vừa nói `PARTNER_API`, vừa liệt kê role `admin`, `staff`, `super_admin`.
- [ ] Nhận credential staging có đủ năm permission: `public_regions.read`, `public_packages.read`, `public_filters.read`, `public_orders.create`, `public_orders.read`.
- [ ] Xác nhận `channel` được dùng cho website, mặc định dự kiến là `BSS`.
- [ ] Cung cấp contract endpoint tạo lại `payment_url` sau khi hết hạn và return URL của GalaxyPay.
- [ ] Cung cấp contract MyEsim API để lấy QR/eSIM sau khi đơn đã `PAID` hoặc `COMPLETED`; `GET /orders/{code}` không trả eSIM đã cấp.

### 2. Tạo BSS server client và quản lý token

**Tạo:** `src/lib/server/bssPublicApi.js`

- [ ] Đọc base URL và credential từ server environment.
- [ ] Đăng nhập qua `POST /api/v1/auth/login` và cache access token trong phạm vi server an toàn.
- [ ] Refresh token qua `POST /api/v1/auth/refresh` khi BSS trả 401; chỉ retry một lần để tránh loop.
- [ ] Gắn `Authorization: Bearer <token>` nếu backend xác nhận JWT là bắt buộc.
- [ ] Chuẩn hoá lỗi BSS sang `{ success, message, status, data }`; không chuyển tiếp credential, token, cost price hoặc error nội bộ.
- [ ] Không dùng interceptor `src/app/services/api/base.js` hiện tại vì interceptor này giả định schema cũ `{ code, result }` và chạy ở client.

### 3. Tạo BFF route handlers

**Tạo:**

- `src/app/api/bss/regions/route.js`
- `src/app/api/bss/packages/route.js`
- `src/app/api/bss/packages/data-options/route.js`
- `src/app/api/bss/packages/validity-days/route.js`
- `src/app/api/bss/packages/[packageId]/price/route.js`
- `src/app/api/bss/orders/route.js`
- `src/app/api/bss/orders/[orderCode]/route.js`

- [ ] Validate query/body ở BFF: type region, country code ISO-2, region ID, page/limit, quantity, email và phone.
- [ ] Chỉ cho phép `channel` thuộc allow-list server-side; không tin channel từ browser.
- [ ] Bỏ các trường BSS nội bộ không cần cho UI như `cost_price`, `cost_currency`, `price_list_id`.
- [ ] Tạo `Idempotency-Key` UUID v4 cho mỗi lần submit đơn; nếu retry cùng payload phải giữ nguyên key.
- [ ] Map 400/401/403/404/409/502 sang thông báo UI và HTTP status nhất quán.

### 4. Thay API catalog ở màn eSIM quốc tế

**Sửa:** `src/app/[locale]/travel-esim/page.js`

- [ ] Thay `GET /app/get-regions-by-type/v2/*` bằng BFF `/api/bss/regions?type=COUNTRY|REGION|GLOBAL`.
- [ ] Map BSS `data` sang UI: `id`, `code`, `name`, `type`, `featured`, `display_order`, `country_codes`.
- [ ] Giữ fallback cờ từ `/assets/flags/{code}.png`; BSS Region response chưa mô tả trường URL icon.
- [ ] Sắp xếp theo `display_order`, ưu tiên `featured`, rồi giới hạn 12 card trước khi bấm “Xem thêm”.
- [ ] Giữ trạng thái loading, empty, retry và search dropdown; mọi tab phải vẫn dùng route `/travel-esim?type=...`.

### 5. Thay trang gói và bổ sung filter

**Sửa:** `src/app/[locale]/esim/[countrySlug]/page.js`

- [ ] Tra region/country theo code rồi gọi `/api/bss/packages?country_code={code}&page=1&limit=...`.
- [ ] Map Package v2 sang card: `package_id`, `name/title`, `data_amount`, `data_unit`, `validity_days`, `package_type`, `selling_price`, `currency`, `provider_name`, `countries`.
- [ ] Không hiển thị `original_price`, `cost_price`, `cost_currency` nếu business chưa yêu cầu.
- [ ] Nạp filter dung lượng và số ngày qua hai endpoint BSS; khi đã biết `region_id`, truyền thêm ID để giảm lựa chọn.
- [ ] Khi filter thay đổi, gửi `min_data`, `max_data`, `data_unit`, `min_validity_days`, `max_validity_days`, `min_price`, `max_price`, `search`, `page`, `limit` vào `/packages`.
- [ ] Dùng pagination `page`, `limit`, `total`, `total_pages`; xử lý đúng danh sách rỗng 200 khi channel không có PriceList active.

### 6. Giá, giỏ hàng và checkout

**Sửa:** các thành phần checkout eSIM hiện hành, bắt đầu từ `src/app/[locale]/checkout/payment/esim/page.jsx`.

- [ ] Gọi `/api/bss/packages/{id}/price?quantity=` khi người dùng chọn/sửa quantity trước thanh toán.
- [ ] Render `unit_price`, `total_price`, `discount_amount`, `currency`, `min_quantity`, `max_quantity` từ server.
- [ ] Không tính hoặc tin giá ở client; disable submit khi quantity ngoài giới hạn hoặc request giá chưa hoàn tất.
- [ ] Gửi create-order body gồm `channel`, `payment_method: GALAXYPAY`, thông tin khách, touchpoint/source/segment và `items: [{ package_id, quantity }]`.
- [ ] Disable nút thanh toán trong lúc submit; lưu `order_number` và idempotency key cho đúng attempt.
- [ ] Nếu có `payment_url`, chuyển `window.location.href` sang GalaxyPay. Nếu `payment_url` null, hiển thị nút thử lại thanh toán sau khi backend cung cấp contract refresh URL.

### 7. Return từ GalaxyPay và trạng thái đơn

**Sửa/tạo:** route result eSIM phù hợp với cấu trúc checkout hiện tại.

- [ ] Backend xác nhận tham số return URL chứa `order_number` hay cơ chế đối chiếu khác.
- [ ] Gọi `/api/bss/orders/{orderNumber}` sau khi khách quay lại.
- [ ] Hiển thị trạng thái `AWAITING_PAYMENT`, `PAID`, `PROVISIONING`, `COMPLETED`, `PAYMENT_FAILED`, `CANCELLED`, `PROVISIONING_FAILED`, `REFUNDED`.
- [ ] Với trạng thái pending, polling có giới hạn/backoff và nút tải lại thủ công; không coi redirect là thanh toán thành công.
- [ ] Sau `PAID`/`COMPLETED`, gọi MyEsim API khi backend cung cấp contract để hiển thị QR/eSIM.

## Tương thích và rủi ro

- Schema hiện tại là `{ code, result }`, BSS v2 là `{ success, message, data }`; không thay global Axios interceptor vì có thể làm hỏng các luồng cũ.
- BSS package dùng `package_id`, trong khi code hiện tại có cả `variant_id` và `id`; cần mapping rõ ràng trước khi đưa vào giỏ hàng.
- Giá phụ thuộc `channel` và PriceList active, do đó thay channel phải invalidate region/package/price cache.
- Browser không được giữ partner JWT. Nếu không có BFF, bất kỳ người dùng nào cũng có thể lấy token từ DevTools.
- GalaxyPay IPN, provider booking, AES-GCM và outbox worker là trách nhiệm backend; FE chỉ hiển thị trạng thái do backend trả về.

## Kiểm thử và nghiệm thu

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Test catalog cả `COUNTRY`, `REGION`, `GLOBAL` với staging credential hợp lệ.
- [ ] Test 401, 403, 404, danh sách rỗng, package không có PriceList và 409 idempotency.
- [ ] Test create order thành công, double-click submit, retry cùng key và retry khác payload.
- [ ] Test redirect GalaxyPay, return URL, pending, success, failure và payment URL hết hạn.
- [ ] Kiểm tra DevTools/network không chứa partner password, refresh token hoặc access token BSS.

## Ngoài phạm vi hiện tại

- Provider booking eSIM, IPN verification, outbox worker và email QR là backend-only.
- Hiển thị QR/eSIM sau mua chưa triển khai cho tới khi có MyEsim API contract.
