import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SimpleEarnRegisterModalComponent } from '../simple-earn-register-modal/simple-earn-register-modal.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-simple-earn',
  templateUrl: './simple-earn.component.html',
  styleUrl: './simple-earn.component.scss'
})
export class SimpleEarnComponent {

  chars: any = [...'0123456789abcdef'];
  addresses: any = [];
  listRewards: any = [];
  limit: any = 10;
  accordion: any = [];
  getAccordion: any = [];
  chooseAccordion: any = 0;
  openAccordion: boolean = false;

  @ViewChild('listContainer', { static: false }) listContainer!: ElementRef;
  constructor(_fb: FormBuilder, public dialog: MatDialog, private deviceService: DeviceDetectorService) {

  }

  openRegister() {
    this.dialog.closeAll();
    this.dialog.open(SimpleEarnRegisterModalComponent, {
      width: '90%',
      maxWidth: '500px',
    });
  }

  // Hàm tạo chuỗi ngẫu nhiên
  generateRandomString(length: any) {
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * this.chars.length);
      result += this.chars[randomIndex];
    }
    return result;
  }

  // Hàm tạo địa chỉ ví ngẫu nhiên
  generateRandomAddress() {
    const prefix = '0x';
    const lengthBeforeDot = 3; // Độ dài phần trước dấu ...
    const lengthAfterDot = 3; // Độ dài phần sau dấu ...
    const randomStringBeforeDot = this.generateRandomString(lengthBeforeDot);
    const randomStringAfterDot = this.generateRandomString(lengthAfterDot);
    return prefix + randomStringBeforeDot + '...' + randomStringAfterDot;
  }

  // Hàm tạo thông báo ngẫu nhiên
  generateRandomNotification() {
    for (let i = 0; i < 10; i++) { // Tạo 10 địa chỉ ví (thay đổi số lượng nếu cần)
      this.addresses.push(this.generateRandomAddress());
    }
    this.scrollToBottom();
    const randomAddressIndex = Math.floor(Math.random() * this.addresses.length);
    const address = this.addresses[randomAddressIndex];

    const amount = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

    const notification = `${address} vừa nhận được ${amount} USDT`;
    this.listRewards.push({
      'address': address,
      'amount': amount,
    });

    return notification;
  }

  ngOnInit() {
    // console.log(this.deviceService.getDeviceInfo());
    // Hiển thị thông báo ngẫu nhiên
    for (let i = 0; i < 6; i++) {
      this.generateRandomNotification();
    }
    setInterval(() => {
      this.generateRandomNotification();
    }, 5000);

    this.accordion = [
      {
        "title": "Simple Earn hoạt động như thế nào?",
        "content": [
          "Simple Earn cho phép người dùng kiếm phần thưởng bằng cách nạp các tài sản điện tử theo kỳ hạn cố định hoặc linh hoạt.", "Người dùng có thể đăng ký Sản phẩm linh hoạt bất kỳ lúc nào để bắt đầu kiếm phần thưởng mỗi phút. Sản phẩm cố định sẽ được rút vào ngày rút được nêu trong mỗi lần đăng ký."
        ]
      },
      {
        "title": "Tôi có thể kiếm được phần thưởng gì từ Sản phẩm linh hoạt?",
        "content": [
          "Sản phẩm Linh hoạt phân bổ các phần thưởng dựa trên APR thời gian thực và phần thưởng APR theo bậc. Phần thưởng được phân bổ được làm tròn đến 8 chữ số thập phân.", "APR theo thời gian thực là chỉ báo trực tiếp về phần thưởng bạn nhận được và dữ liệu này có thể thay đổi mỗi phút. Phần thưởng được cộng dồn và tích lũy trực tiếp trong Ví Earn của bạn mỗi phút.", "Phần thưởng APR theo bậc được thưởng theo thời gian trên các sản phẩm linh hoạt đã chọn, thông qua cấu trúc tỷ lệ theo bậc và có thể thay đổi hàng ngày. Những phần thưởng này được cộng dồn vào ngày sau khi đăng ký, bắt đầu lúc 07:00 Giờ Việt Nam. Bạn sẽ bắt đầu nhận phần thưởng phân bổ đến Ví Spot sau ngày bắt đầu cộng dồn (hai ngày sau khi đăng ký) trong khoảng thời gian từ 07:00 đến 15:00 (Giờ Việt Nam)."
        ]
      },
      {
        "title": "Chính sách rút dành cho sản phẩm linh hoạt là gì?",
        "content": [
          "Tài sản từ sản phẩm linh hoạt sẽ được hoàn trả về Ví Spot của bạn ngay sau khi hệ thống xử lý thành công các yêu cầu rút.", "Tuy nhiên, hạn mức rút hàng ngày áp dụng cho từng sản phẩm linh hoạt và có thể thay đổi bất cứ lúc nào. Các hạn mức này và khả năng nhận trễ lợi nhuận đã rút có thể là kết quả của nhiều yếu tố, bao gồm nhưng không giới hạn ở: thị trường biến động mạnh, sự chậm trễ của mạng, một số lượng lớn các hướng dẫn rút ở cùng một thời điểm từ những người dùng Binance khác hoặc bất kỳ sự kiện bất ngờ nào khác."
        ]
      },
      {
        "title": "Tôi có thể tìm các phần thưởng đã kiếm được từ Sản phẩm linh hoạt ở đâu?",
        "content": [
          "Phần thưởng APR theo thời gian thực được cộng trực tiếp mỗi phút vào số dư của từng Sản phẩm linh hoạt trong Ví Earn của bạn (không phải Ví Spot). Phần thưởng APR theo bậc được phân bổ vào Ví Spot của bạn hàng ngày. Bạn có thể xem Ví Earn của mình để xem những phần thưởng đã kiếm được, hoặc Lịch sử Simple Earn để xem hồ sơ lịch sử dưới mục &quot;Phần thưởng APR theo thời gian thực&quot; hoặc &quot;Phần thưởng APR theo bậc"
        ]
      },
      {
        "title": "Tôi có thể kiếm được những phần thưởng nào từ sản phẩm cố định?",
        "content": [
          "APR của sản phẩm cố định có thể thay đổi hằng ngày. Những phần thưởng này được cộng dồn vào ngày sau khi đăng ký, bắt đầu lúc 07:00 Giờ Việt Nam. Bạn sẽ bắt đầu nhận phần thưởng phân bổ đến Ví Spot sau ngày bắt đầu tích lũy (hai ngày sau khi đăng ký) trong khoảng thời gian từ 07:00 đến 15:00 (Giờ Việt Nam)."
        ]
      },
      {
        "title": "Điều gì sẽ xảy ra nếu tôi rút sớm tài sản trong Sản phẩm Cố định?",
        "content": [
          "Bạn có thể rút một số Sản phẩm Cố định trước ngày đáo hạn. Sau khi bạn chọn rút sớm, tài sản sẽ được trả lại vào Ví Spot của bạn trong vòng 48-72 giờ. Tuy nhiên, mọi phần thưởng tích lũy sẽ không còn và sẽ bị khấu trừ vào số tiền gốc hoàn lại."
        ]
      },
      {
        "title": "Tôi đã chọn đăng ký sản phẩm cố định tự động, khi nào phần thưởng sẽ bắt đầu cộng dồn và được phân bổ?",
        "content": [
          "Vào ngày đáo hạn Sản phẩm cố định, bạn sẽ tự động đăng ký lại chính Sản phẩm cố định đó với cùng thời hạn và bắt đầu cộng dồn lãi ngay lập tức. Phần thưởng sẽ được phân bổ vào Ví Spot của bạn vào ngày hôm sau. Xin lưu ý, tính năng Đăng ký tự động chỉ khả dụng với một số Sản phẩm cố định."
        ]
      },
      {
        "title": "APR được xác định như thế nào và đâu là nguồn lợi suất cho phần thưởng Simple Earn?",
        "content": [
          "Phần thưởng APR Simple Earn do Binance quyết định, có tính đến nhiều yếu tố khác nhau, được thiết kế cẩn trọng để đảm bảo các phần thưởng trả cho người dùng mang tính bền vững và có tính cạnh tranh.", "Tài sản do người dùng nạp trong Simple Earn có thể được dùng cho nhiều mục đích. Ví dụ: Tài sản này có thể dùng để stake trên chuỗi, cho những người dùng Binance khác vay thông qua các sản phẩm Cho vay tiền mã hóa và Ký quỹ hoặc cho các mục đích hoạt động của những đơn vị kinh doanh khác trên Binance.", "Đôi khi, Binance cũng có thể triển khai các chiến dịch quảng cáo được tài trợ bởi các dự án đối tác và giới thiệu những dự án này cho người dùng thông qua các ưu đãi khuyến mãi APR ngắn hạn trên các token được chọn."
        ]
      },
      {
        "title": "Tôi có thể tìm thêm thông tin ở đâu?",
        "content": [
          "Để biết thêm thông tin, vui lòng tham khảo các bài viết của chúng tôi trong Trung tâm hỗ trợ hoặc Điều khoản và điều kiện của chúng tôi."
        ]
      },
      {
        "title": "Nếu số BNB tôi nắm giữ được đăng ký vào Sản phẩm Cố định Simple Earn, tôi có nhận được phần thưởng từ Launchpool không?",
        "content": [
          "Có, khi đăng ký Sản phẩm Cố định Simple Earn, bạn có thể nhận phần thưởng từ cả Simple Earn và Launchpool.", "Nếu có nhiều hơn một dự án Launchpool diễn ra đồng thời, tài sản BNB của bạn trong Sản phẩm Cố định Simple Earn sẽ được phân bổ đều cho từng dự án, trừ khi có quy định khác.", "Xin lưu ý, các dự án Launchpool có thể có các hạn chế riêng biệt về quốc gia hoặc khu vực và/hoặc Hard Cap hằng giờ cho mỗi người dùng, đồng thời việc phân bổ có thể sẽ khác đi cho phù hợp. Hãy tham khảo từng trang dự án Launchpool để tìm hiểu thêm về khả năng đủ điều kiện tham gia của bạn hoặc để nhận phần thưởng Launchpool.", "Hard Cap hàng giờ cho mỗi người dùng được chia sẻ trên các tài sản Launchpool staking, BNB Vault và sản phẩm cố định BNB của bạn."
        ]
      }

    ]

    this.limit = 5;
    for (let i = 0; i < this.accordion.length; i++) {
      this.getAccordion.push(this.accordion[i]);
    }

  }

  onMoreAccordion(size: number) {
    this.limit = size;
  }


  ngAfterViewInit() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    if (this.listContainer) {
      this.listContainer.nativeElement.scrollTop = this.listContainer.nativeElement.scrollHeight;
    }
  }
}