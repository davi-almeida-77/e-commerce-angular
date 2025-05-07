-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: ecommerce_db
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.22.04.1
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8mb4 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;
--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `posts` (
    `id` int NOT NULL AUTO_INCREMENT,
    `category` varchar(255) DEFAULT NULL,
    `title` varchar(255) NOT NULL,
    `preview` varchar(255) DEFAULT NULL,
    `content` text NOT NULL,
    `image` varchar(255) DEFAULT NULL,
    `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) 

ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */
;
INSERT INTO `posts`
VALUES (
        1,
        'Basketball',
        'Ja 2 Scratch Black Label',
        'Let your game—and your bling—do the talking in this bold Ja 2. The boastful look mirrors Ja’s play on court: aggressive but with attention to detail',
        'Let your game—and your bling—do the talking in this bold Ja 2. The boastful look mirrors Ja’s play on court: aggressive but with attention to detail,
 as seen by the Swoosh logo and flashy tongue top graphics. We added Ja’s iconic subtle scratch detail as an ode to his favorite dunk. And, of course, 
 we had to layer the upper with spellbinding Swarovski crystals, so you can make defenders, and diamonds, dance.',
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/54b0ee89-9f33-45e2-a60c-f4f87cc399e1/JA+2+SCRATCH+BLING.png',
        '2025-03-13 10:48:58'
    ),
    (
        2,
        'Sports',
        'KD17',
        'While Kevin Durant’s all-timer status is already cemented, his hooper soul can’t be soothed unless he’s on the court, perfecting his craft',
        'While Kevin Durant’s all-timer status is already cemented, his hooper soul can’t be soothed unless he’s on the court, perfecting his craft. Put in the work to be great in the KD17, a shoe for gym rats and those who insist on running it back. A forefoot Air Zoom unit enhances your first step. We combined it with Nike Air cushioning to fuel full court sprints and defensive stops that can decide games.',
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8ff7d5c6-4783-43fa-9f5d-c220f2ddaa1c/KD17.png',
        '2025-03-13 11:43:26'
    ),
(
        3,
        'Performance',
        'KD16 By You',
        'When it comes to basketball, a player’s performance on the court is often heavily influenced by the shoes they wear.',
        'Kevin Durant s bag? Bottomless. His range? Limitless. Your customization choices for the KD16 By You? Take a guess. A fresh color palette and enough design options to satisfy even the most avid artist highlight a shoe bent on giving you breathing room to cook. Top it off with several different tongue and collar choices that’ll help your game beam. Nike Air and Zoom Air work together to provide speed and stability for all 4 quarters, while the upper is lower and the overall load is lighter compared to the 15. It s ideal for the hoopaholic who can’t say no to just one more game.',
        'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/4622ba6e-82ea-4230-a454-1c3494c3eb87/custom-nike-kd-16-by-you.png',
        '2025-03-13 11:47:31'
    ),
(
        4,
        'Basketball',
        'LeBron XXII SN ',
        'The James Gang s favorite color?',
        'The James Gang s favorite color? Pink, at his daughter s request. Since then, it s been worn by both his sons on the court during their last high school home games. It s a regular in LeBron’s rotation, too. This special design celebrates their officially unofficial shade of choice. And with saddle wings complementing Air Zoom cushioning, it helps the King keep pushing the sport forward.',
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c3967023-e1af-403c-bc21-4a398f9df18f/LEBRON+XXII+SN.png',
        '2025-03-27 10:00:16'
    ),
(
        5,
        'Basketball',
        ' Book 1 \"Flagstaff\" ',
        'Devin Booker is a craftsman who can lose a defender with an ankle-snatching stutter-go, then come back with a series of spellbinding jabs into a splashed jumper',
        'Devin Booker is a craftsman who can lose a defender with an ankle-snatching stutter-go, then come back with a series of spellbinding jabs into a splashed jumper. Book’s signature shoe gives him the tools he needs to carve. With leather accents highlighting a supersmooth upper and a speedy, yet cushioned ride, this design can help you explore the spaces created by your piercing footwork and hungry hooper soul. This foresty version speaks to where Book escapes the desert heat.',
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/91f3ebee-c939-4405-a4b9-a1a5fe6f8379/BOOK+1.png',
        '2025-03-27 10:03:07'
    ),
(
        6,
        'Basketball',
        'MB.04 Iridescent Lamelo Ball',
        'Add dimension to your style and your game with LaMelo Ball’s latest signature shoe, the MB.04 Iridescent. Appearing in an attention-grabbing blue and purple colorway, the MB.0...',
        'Add dimension to your style and your game with LaMelo Ball s latest signature shoe, the MB.04 Iridescent. Featuring a striking blue and purple colorway, the MB.04 Iridescent is more\n than just a shoe; it s a bold statement of performance and style. With an innovative design and cutting-edge technology, this model delivers the ultimate comfort and support,\n allowing you to play with confidence on any court. Every detail has been meticulously crafted to reflect LaMelo s unique personality, blending style and functionality in one\n pair of sneakers. Perfect for those who want to stand out both on and off the court, the MB.04 is the ideal choice to take your game to new heights.',
        'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1000,h_1000/global/310836/01/sv01/fnd/SEA/fmt/png/MB.04-Iridescent-Basketball-Shoes',
        '2025-03-27 11:44:54'
    );
/*!40000 ALTER TABLE `posts` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;
-- Dump completed on 2025-03-27 12:30:33