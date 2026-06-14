-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for pos-app
CREATE DATABASE IF NOT EXISTS `pos-app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pos-app`;

-- Dumping structure for table pos-app.cashiers
CREATE TABLE IF NOT EXISTS `cashiers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `phone` varchar(100) NOT NULL,
  `wallet_address` varchar(255) NOT NULL,
  `home_address` text,
  `user_id` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `wallet_address` (`wallet_address`),
  KEY `FK_cashiers_users` (`user_id`),
  CONSTRAINT `FK_cashiers_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table pos-app.cashiers: ~2 rows (approximately)
REPLACE INTO `cashiers` (`id`, `phone`, `wallet_address`, `home_address`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, '086321321', '0x21312ad2221', 'Ciputats', 3, '2026-06-09 08:09:26', '2026-06-09 08:09:26', NULL),
	(2, '0231823xxx', '0x92313xsd212312', 'Jakarta', 12, '2026-06-11 07:15:17', '2026-06-11 07:15:17', NULL);

-- Dumping structure for table pos-app.login_activities
CREATE TABLE IF NOT EXISTS `login_activities` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `session_id` bigint DEFAULT NULL,
  `action` enum('login','logout','expired','failed') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'failed',
  `ip_address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_login_activities_users` (`user_id`),
  KEY `FK_login_activities_sessions` (`session_id`),
  CONSTRAINT `FK_login_activities_sessions` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_login_activities_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table pos-app.login_activities: ~5 rows (approximately)
REPLACE INTO `login_activities` (`id`, `user_id`, `session_id`, `action`, `ip_address`, `user_agent`, `created_at`) VALUES
	(4, 9, NULL, 'failed', '[::1]:50497', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-13 08:27:51'),
	(7, NULL, NULL, 'failed', '[::1]:50540', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-13 08:32:26'),
	(8, 9, NULL, 'failed', '[::1]:50540', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-13 08:32:43'),
	(9, 9, 3, 'login', '[::1]:50540', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-13 08:32:55'),
	(10, 9, 4, 'login', '[::1]:50578', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-14 07:45:46'),
	(11, 2, 5, 'login', '[::1]:54901', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-14 11:10:01'),
	(12, 2, 6, 'login', '[::1]:54902', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-14 11:15:03');

-- Dumping structure for table pos-app.owners
CREATE TABLE IF NOT EXISTS `owners` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `phone` varchar(100) NOT NULL,
  `wallet_address` varchar(100) NOT NULL,
  `user_id` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `wallet_address` (`wallet_address`),
  KEY `FK__users` (`user_id`),
  CONSTRAINT `FK__users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table pos-app.owners: ~1 rows (approximately)
REPLACE INTO `owners` (`id`, `phone`, `wallet_address`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, '08236xxx', 'werrrsa231', 2, '2026-06-09 08:09:50', '2026-06-09 08:09:50', NULL);

-- Dumping structure for table pos-app.product_sample
CREATE TABLE IF NOT EXISTS `product_sample` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `supplier_id` bigint NOT NULL,
  `reciver_id` bigint DEFAULT NULL,
  `status` enum('pending','approved','rejected','shipped') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending',
  `recived_at` timestamp NULL DEFAULT NULL,
  `review_note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `description` text,
  `submission_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_product_sample_users` (`supplier_id`),
  KEY `FK_product_sample_users_2` (`reciver_id`),
  CONSTRAINT `FK_product_sample_users` FOREIGN KEY (`supplier_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_product_sample_users_2` FOREIGN KEY (`reciver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table pos-app.product_sample: ~1 rows (approximately)
REPLACE INTO `product_sample` (`id`, `product_name`, `supplier_id`, `reciver_id`, `status`, `recived_at`, `review_note`, `description`, `submission_date`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Kopi Gadjah Madhja', 9, 2, 'approved', '2026-06-11 11:22:07', 'Let\'s go higher tonight higher tonight\r\nInto the sky until we\'re feeling alright feeling alright\r\nLet\'s go higher tonight higher tonight\r\nInto the sky just you and I', 'We can swim in an ocean of rainbows and trees\r\nNothing here makes sense but you and me\r\nDon\'t think about it just follow my lead ooh (ha ha)', NULL, '2026-06-11 11:22:08', '2026-06-11 11:22:08', NULL),
	(2, 'daw', 9, NULL, 'pending', NULL, NULL, 'sad', NULL, '2026-06-14 10:07:51', '2026-06-14 10:07:51', NULL);

-- Dumping structure for table pos-app.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `user_agent` text NOT NULL,
  `expires_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_sessions_users` (`user_id`),
  KEY `token` (`token`),
  KEY `expires_at` (`expires_at`),
  CONSTRAINT `FK_sessions_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table pos-app.sessions: ~3 rows (approximately)
REPLACE INTO `sessions` (`id`, `user_id`, `token`, `ip_address`, `user_agent`, `expires_at`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 9, '1fdafdb5-5e7c-4381-aab3-4e1a81501180', '[::1]:53461', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-12 04:07:20', '2026-06-11 11:07:19', '2026-06-11 11:07:19', NULL),
	(2, 9, 'c3f79406-0aec-494e-b9c4-a87b9489999f', '[::1]:53681', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-12 04:43:36', '2026-06-11 11:43:36', '2026-06-11 11:43:36', NULL),
	(3, 9, '62512052-03ee-4b0d-bdc7-f0188e0e10ac', '[::1]:50540', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-14 01:32:56', '2026-06-13 08:32:55', '2026-06-13 08:32:55', NULL),
	(4, 9, 'ffe50218-da7d-4c60-b826-825298c2a383', '[::1]:50578', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-15 00:45:47', '2026-06-14 07:45:46', '2026-06-14 07:45:46', NULL),
	(5, 2, '8a4492ac-98d9-4852-87aa-494359eb3d73', '[::1]:54901', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-15 04:10:01', '2026-06-14 11:10:01', '2026-06-14 11:10:01', NULL),
	(6, 2, '168ca52d-d798-4b9f-8f13-2cc3723a5230', '[::1]:54902', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-15 04:15:03', '2026-06-14 11:15:03', '2026-06-14 11:15:03', NULL);

-- Dumping structure for table pos-app.suppliers
CREATE TABLE IF NOT EXISTS `suppliers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `phone` varchar(100) NOT NULL,
  `wallet_address` varchar(100) NOT NULL,
  `farm_name` varchar(100) NOT NULL,
  `farm_address` text NOT NULL,
  `user_id` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `wallet_address` (`wallet_address`),
  KEY `FK_suppliers_users` (`user_id`),
  CONSTRAINT `FK_suppliers_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table pos-app.suppliers: ~5 rows (approximately)
REPLACE INTO `suppliers` (`id`, `phone`, `wallet_address`, `farm_name`, `farm_address`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, '08236xxxx', 'gasdxxx231', 'Metani Jaya', 'Aceh', 1, '2026-06-09 08:10:25', '2026-06-09 08:10:26', NULL),
	(2, '0312361723123', '0x92313xsd2332', 'Mandiri', 'Sumatra', 4, '2026-06-09 09:15:39', '2026-06-09 09:15:39', NULL),
	(4, '085814079866', '0x92313xsd2221', 'Sutri Park', 'Papua', 6, '2026-06-09 09:21:29', '2026-06-09 09:21:29', NULL),
	(5, '0732184123', '3x7328Ydx3w', 'Ciputat Beans Subur', 'Ciputat', 7, '2026-06-09 09:24:20', '2026-06-10 17:10:16', NULL),
	(6, '03712841321', '0x92313xsd2321', 'Sutri Subur Sekali', 'Jawa', 9, '2026-06-10 16:38:50', '2026-06-10 16:38:50', NULL);

-- Dumping structure for table pos-app.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('supplier','cashier','owner') NOT NULL DEFAULT 'supplier',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table pos-app.users: ~8 rows (approximately)
REPLACE INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'supplier', 'supplier@mail.com', 'password', 'supplier', '2026-06-09 08:08:22', '2026-06-09 08:08:23', NULL),
	(2, 'owner', 'owner@mail.com', '$2a$10$3RS.uAwk/e8KfeN5EAWS1uZ7oW3un5Q5LhRMTxd9tyYx1d84IHUdu', 'owner', '2026-06-09 08:08:40', '2026-06-09 08:08:41', NULL),
	(3, 'Molem Sopandi', 'cashier@mail.com', 'password', 'cashier', '2026-06-09 08:08:58', '2026-06-11 07:57:23', NULL),
	(4, 'Trio Masdi Cahyo', 'triomasdi@mail.com', '$2a$10$3RS.uAwk/e8KfeN5EAWS1uZ7oW3un5Q5LhRMTxd9tyYx1d84IHUdu', 'supplier', '2026-06-09 09:15:39', '2026-06-09 09:15:39', NULL),
	(6, 'Sutri', 'sutri@mail.com', '$2a$10$L/IWZlHBo2a/Y3KRmZ/4GelXtpIqLAWy5tsHoT7J4uGTtdmdj9qKW', 'supplier', '2026-06-09 09:21:29', '2026-06-09 09:21:29', NULL),
	(7, 'Dawnins', 'daw@mail.com', '$2a$10$tucs/rXYG9SX1kxeGXcPqOPu9mxU582LlkCUdQwteO1xUwXQznY2e', 'supplier', '2026-06-09 09:24:20', '2026-06-10 17:10:16', NULL),
	(9, 'Sutri Marpriadi', 'sutimarp12@mail.com', '$2a$10$yWYQfzYYdQq3e3rrzUZ3L.7QGaBH/TbiXiRkl5coiffUz22XB8sR6', 'supplier', '2026-06-10 16:38:50', '2026-06-10 16:38:50', NULL),
	(12, 'Rini Maliustine', 'rini@mail.com', '$2a$10$f6AHicfxeKk/Xc0s40zpB.hmUIBjFMv2d8PdrB5UjMK208LI17a3i', 'cashier', '2026-06-11 07:15:17', '2026-06-11 07:15:17', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
