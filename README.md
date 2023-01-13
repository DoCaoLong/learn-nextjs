NextJS

Navigate
Client side routes: di chuyển các trang k load ( không full page reload) 

--------------------------------------------------

SSG SSR CSR & ISR (Data Fetching)
Pre-rendering: (có 2 cách SSG, SSR) render sẳn file html phía server sau đó load js (quá trình Hydration).
SSG: Static Site Generation (user gửi reques -> server trả về file đc tạo sẳn lúc build gửi lại -> user. Hoạt động lúc build-time lúc mình gõ lệnh yarn build, build data sao thì data v thay đổi data sẽ k cập nhật, nên dùng khi data k cập nhật sau build).
SSR: Server Side Rendering (user gửi reques -> server gom data rồi tạo file html -> user trình duyệt vẩn âm thầm tải js và thực thi khi hoàn tất . Each reques : lấy dữ liệu mỗi lần request, load từ đầu nếu chỉ có 1 thay đổi nhỏ trong nội dung, tốt cho SEO).

CSR: Client Side Rendering (user gửi request -> đợi client load html js về nào mọi thứ load xong thì hiển thị  VD: reactjs, vuejs,... K tốt cho SEO) có thể kết hợp với SSG trường hợp k cần phải render phía server, SEO, prirate web.

ISR: Incremental Static Rengeneration (build sẳn ra 10 file SSG - user request server trả về -> file html đã build, trường hợp reques ngoài 10 file đã build sẳn thì sẽ gửi reques -> server -> trả về html mới mất 1 ít thời gian nhưng sau k bị nữa, tái sử dụng ). 
revalidate: 5
- khi mình build -> generate ra 1 page, page này sẽ validate trong 5s khi qua 5s thì sẽ trả về data cũ nhưng phía dưới nó âm thầm gọi data mới, request -> sẽ hiển thị data mới 

getStaticProps (Không chạy chung getServerSideProps)
Static HTML Generation : N/A,
Static HTML + JSON Data : getStaticProps,
Static HTML + JSON Data + Dynamic Routes : getStaticProps + getStaticPaths

getStaticPaths  (Không chạy chung getServerSideProps)
fallback: blocking (ưa thích) : request ->1 page mà chưa có trong cache -> gọi getStaticProps để generate 1 file html -> client. Các request sau đó đc trả về từ cache, nhược điểm là hàm getStaticProsp (fetch api) chạy càng lâu thì TTFB (Time To Fist By) càng lâu.
fallback: true : request -> 1 page mà chưa có trong cache thì nó sẽ trả về ngay lập tức 1 cái gì đó ví dụ như mình làm loading, trong khi loading nó update state sau đó mình lấy data để render

--------------------------------------------------

getServerSideProps (Không chạy chung với getStaticPaths  & getStaticProps )

SSR with cache (cẩn thận trong trường hợp cache promo cho từng user nên dùng fetching tại client)

 Using s-maxage=5: 
- user (nhiều user gửi cùng lúc) gửi request (call getServerSideProps() and cache in CDN trong 5s). trong 5s đó Server trả về data đã cache (user gửi lên server trả về trong 5s đó). Sau 5s đó user gửi lại resques -> server lại cache in CDN trong 5s tiếp ... 
- nếu thay đổi data trong 5s cache đó thì server trả về vẫn data cũ, sau 5s đó user gửi request lại thì mới cập nhật lại data mới
Using s-maxage=5 & stale-while-revalidate : 
- user gửi request -> server (cache in CDN) trong 5s. Trong 5s đó user gửi request -> server trả data về. Sau 5s user gửi lại request -> server vẫn trả về data cũ nhưng nếu data là data mới cập nhật thì server sẽ âm thầm load dữ liệu mới rồi lại cache vào CDN, user lại bấm load thì data mới đc đổ vào view.
Using s-maxage=5 & stale-while-revalidate=5
- user gửi request -> server (cache in CDN) trong 5s. Trong 5s đó user gửi request -> server trả data về. Sau 5s đó user gửi lại request thì sẽ chạy 5s tiếp theo của (stale-while-revalidate=5)  -> server vẫn trả data đã cache về vẫn âm thầm gọi data mới. Sau 10s user gửi lại request thì lại chạy lại hàm (call getServerSideProps() and cache in CDN trong 5s)  -> trả về view data mới, rồi sau đó lại tiếp tục chạy 5s của (stale-while-revalidate),...

-------------------------------------------------
Public pages with no data: SSG
Public oages with data and can be updated from CMS: ISR
Private pages: SSG + CSR
-------------------------------------------------