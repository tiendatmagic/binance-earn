-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th6 14, 2024 lúc 08:04 AM
-- Phiên bản máy phục vụ: 8.0.30
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `binance-earn`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `addresses`
--

CREATE TABLE `addresses` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `addresses`
--

INSERT INTO `addresses` (`id`, `address`, `created_at`) VALUES
('20c6247b-2483-11ef-9182-005056c00801', '0x55d398326f99059ff775485246999027b3197955', '2024-06-06 18:39:11'),
('3ed6aaf0-2478-1b7f-39e2-0a5056300001', '0xe185a8ac7b0a7945e9d06b958dbb0eaf2e61f8ec', '2024-06-07 03:56:41'),
('60c624fb-2433-11ef-91d2-005056c00001', '0x404b508807f461690F6aD988ba2fE9dD30a4a9fC', '2024-06-06 18:34:05'),
('7ed6aaf0-2478-11ef-91d2-005056c00000', '0x97b8513ac88707363b794eb028bb8a929c122622', '2024-06-06 18:39:05'),
('7ed6aaf0-9478-11ef-91d2-005056c00000', '0x32d03F46BA2857c8E6A920aB3fed1F24d35D85d1', '2024-06-06 18:39:05'),
('7ed6aaf0-9478-11ef-91d2-005056c00700', '0x28ded18e44e160caa85799e17906291378d65b02', '2024-06-06 18:39:05'),
('7ed6aaf0-9478-11ef-91d2-005056c00709', '0xb6BCB0971035B3d2Af72d7F60EE8410b65E14084', '2024-06-06 18:39:05');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `missions`
--

CREATE TABLE `missions` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(42) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mission_level` int NOT NULL,
  `ip_address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `address` (`address`);

--
-- Chỉ mục cho bảng `missions`
--
ALTER TABLE `missions`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
