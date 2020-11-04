-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: penjadwalan
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `jadwal_kuliah`
--

DROP TABLE IF EXISTS `jadwal_kuliah`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jadwal_kuliah` (
  `id_jadwal` int NOT NULL AUTO_INCREMENT,
  `id_matkul` int DEFAULT NULL,
  `id_sesi` int DEFAULT NULL,
  PRIMARY KEY (`id_jadwal`),
  KEY `jadwal_kuliah_FK` (`id_matkul`),
  KEY `jadwal_kuliah_FK_1` (`id_sesi`),
  CONSTRAINT `jadwal_kuliah_FK` FOREIGN KEY (`id_matkul`) REFERENCES `mata_kuliah` (`id_matkul`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `jadwal_kuliah_FK_1` FOREIGN KEY (`id_sesi`) REFERENCES `sesi` (`id_sesi`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=669 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jadwal_kuliah`
--

LOCK TABLES `jadwal_kuliah` WRITE;
/*!40000 ALTER TABLE `jadwal_kuliah` DISABLE KEYS */;
INSERT INTO `jadwal_kuliah` VALUES (652,1,8409),(653,1,8410),(654,1,8411),(655,2,8412),(656,2,8413),(657,2,8414),(658,2,8415),(659,6,8416),(660,6,8417),(661,8,8418),(662,8,8419),(663,8,8420),(664,9,8421),(665,9,8422),(666,10,8423),(667,10,8424),(668,10,8425);
/*!40000 ALTER TABLE `jadwal_kuliah` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-04  9:35:26
