import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  isDark: boolean = false;
  chooseAccordion: any = 0;
  openAccordion: boolean = false;
  footerMenuItems = [
    {
      title: 'Về chúng tôi',
      content: [
        "Thông tin thêm", "Cơ hội nghề nghiệp", "Thông báo", "Tin tức", "Báo chí", "Pháp lý", "Điều khoản", "Riêng tư", "Gây dựng niềm tin", "Blog", "Cộng đồng", "Sơ đồ trang web", "Cảnh báo rủi ro", "Thông báo", "Tải xuống", "Ứng dụng dành cho máy tính để bàn"
      ]
    },
    {
      title: "Sản phẩm",
      content: [
        "Exchange", "Mua tiền mã hoá", "Token đòn bẩy", "Pay", "Academy", "Live", "Thuế", "Thẻ quà tặng", "Launchpad & Launchpool", "Đầu tư tự động", "Staking ETH", "NFT", "BNB", "BABT", "Research", "Charity"
      ]
    },
    {
      title: "Kinh doanh",
      content: [
        "Đăng ký thương nhân P2P", "Ứng dụng dành cho thương nhân P2Pro", "Đăng ký niêm yết coin", "Dịch vụ cho tổ chức và VIP", "Lab"
      ]
    },
    {
      title: "Học hỏi",
      content: [
        "Tìm hiểu kiến thức và kiếm tiền",
        "Xem giá tiền mã hóa",
        "Giá Bitcoin",
        "Giá Ethereum",
        "Duyệt xem các dự đoán về giá tiền mã hóa",
        "Dự đoán giá Bitcoin",
        "Dự đoán giá Ethereum",
        "Mua Bitcoin",
        "Mua BNB",
        "Mua Ripple",
        "Mua Dogecoin",
        "Mua Ethereum",
        "Mua altcoin có thể giao dịch"
      ]
    },
    {
      title: "Dịch vụ",
      content: [
        "Affiliate",
        "Giới thiệu",
        "Giao dịch OTC",
        "Dữ liệu lịch sử thị trường",
        "Bằng chứng Dự trữ"
      ]
    },
    {
      title: "Hỗ trợ",
      content: [
        "Chat hỗ trợ 24/7",
        "Trung tâm trợ giúp",
        "Phản hồi và đề xuất về sản phẩm",
        "Phí giao dịch",
        "API",
        "Xác minh Binance",
        "Quy tắc giao dịch",
        "Cổng Airdrop Binance",
        "Yêu cầu Thực thi Pháp luật"
      ]
    }
  ]
  toggleDarkTheme() {
    this.isDark = !this.isDark;
  }
}
