-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2026 at 11:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12
CREATE DATABASE IF NOT EXISTS `urbanbotany` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `urbanbotany`
--

-- --------------------------------------------------------

--
-- Table structure for table `ailment`
--

CREATE TABLE `ailment` (
  `ailmentID` int(11) NOT NULL,
  `cause` varchar(32) NOT NULL,
  `symptoms` varchar(32) NOT NULL,
  `treatment` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plant`
--

CREATE TABLE `plant` (
  `plantID` int(11) NOT NULL,
  `latinName` varchar(32) NOT NULL,
  `commonName` varchar(32) NOT NULL,
  `upperTemp` int(11) NOT NULL,
  `lowerTemp` int(11) NOT NULL,
  `soilType` varchar(32) NOT NULL,
  `humidity` int(11) NOT NULL,
  `careDificulty` int(11) NOT NULL,
  `recommendedLoc` varchar(32) NOT NULL,
  `heightSpread` int(11) NOT NULL,
  `feedingFreq` int(11) NOT NULL,
  `wateringFreq` int(11) NOT NULL,
  `pottingFreq` int(11) NOT NULL,
  `family` varchar(32) NOT NULL,
  `lightLevel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plant_ailment`
--

CREATE TABLE `plant_ailment` (
  `plantID` int(11) NOT NULL,
  `ailmentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plant_decoration`
--

CREATE TABLE `plant_decoration` (
  `plantDecorationID` int(11) NOT NULL,
  `imagePointer` int(11) NOT NULL,
  `static` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `1erColour` varchar(32) NOT NULL COMMENT 'Stored as hexadec',
  `2erColour` varchar(32) NOT NULL COMMENT 'Stored as hexadec'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `roomID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `decorationID` int(11) NOT NULL,
  `roomName` varchar(32) NOT NULL,
  `upperTemp` int(11) NOT NULL,
  `lowerTemp` int(11) NOT NULL,
  `lightLevel` int(11) NOT NULL,
  `humidity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `room_decoration`
--

CREATE TABLE `room_decoration` (
  `roomDecorationID` int(11) NOT NULL,
  `imagePointer` int(11) NOT NULL,
  `static` tinyint(1) NOT NULL,
  `type` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `1erColour` varchar(32) NOT NULL COMMENT 'store as hexcode',
  `2erColour` varchar(32) NOT NULL COMMENT 'store as hexcode'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `userName` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  `DoB` date NOT NULL,
  `FName` varchar(32) NOT NULL,
  `SName` varchar(32) NOT NULL,
  `phoneNum` varchar(20) NOT NULL,
  `points` int(32) NOT NULL,
  `addressLine1` varchar(32) NOT NULL,
  `addessLine2` varchar(32) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `region` varchar(50) NOT NULL,
  `postalCode` varchar(20) NOT NULL,
  `countryCode` char(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `userName`, `password`, `email`, `DoB`, `FName`, `SName`, `phoneNum`, `points`, `addressLine1`, `addessLine2`, `city`, `region`, `postalCode`, `countryCode`) VALUES
(1, 'DevUser', 'temp', 'dev@example.com', '2000-01-01', 'Dexter', 'Rowland', '07000000000', 0, '1 Example Street', NULL, 'London', 'Surrey', 'SW1A 1AA', 'GB');

-- --------------------------------------------------------

--
-- Table structure for table `user_plants`
--

CREATE TABLE `user_plants` (
  `userPlantID` int(11) NOT NULL,
  `plantID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `roomID` int(11) NOT NULL,
  `plantName` varchar(32) NOT NULL,
  `lastWatered` datetime NOT NULL,
  `lastFed` datetime NOT NULL,
  `lastPotted` datetime NOT NULL,
  `nextWatering` datetime NOT NULL,
  `nextFeeding` datetime NOT NULL,
  `nextPotting` datetime NOT NULL,
  `dateAdded` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_plant_decoration`
--

CREATE TABLE `user_plant_decoration` (
  `userPlantID` int(11) NOT NULL,
  `plantDecorationID` int(11) NOT NULL,
  `1erColour` varchar(32) DEFAULT NULL,
  `2erColour` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_room_decoration`
--

CREATE TABLE `user_room_decoration` (
  `roomID` int(11) NOT NULL,
  `roomDecorationID` int(11) NOT NULL,
  `1erColour` varchar(32) NOT NULL,
  `2erColour` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ailment`
--
ALTER TABLE `ailment`
  ADD PRIMARY KEY (`ailmentID`);

--
-- Indexes for table `plant`
--
ALTER TABLE `plant`
  ADD PRIMARY KEY (`plantID`);

--
-- Indexes for table `plant_ailment`
--
ALTER TABLE `plant_ailment`
  ADD PRIMARY KEY (`plantID`,`ailmentID`),
  ADD KEY `fk_plantailment_ailment` (`ailmentID`);

--
-- Indexes for table `plant_decoration`
--
ALTER TABLE `plant_decoration`
  ADD PRIMARY KEY (`plantDecorationID`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`roomID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `room_decoration`
--
ALTER TABLE `room_decoration`
  ADD PRIMARY KEY (`roomDecorationID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `user_plants`
--
ALTER TABLE `user_plants`
  ADD PRIMARY KEY (`userPlantID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `plantID` (`plantID`),
  ADD KEY `roomID` (`roomID`);

--
-- Indexes for table `user_plant_decoration`
--
ALTER TABLE `user_plant_decoration`
  ADD PRIMARY KEY (`plantDecorationID`,`userPlantID`),
  ADD KEY `userPlantID` (`userPlantID`);

--
-- Indexes for table `user_room_decoration`
--
ALTER TABLE `user_room_decoration`
  ADD PRIMARY KEY (`roomID`,`roomDecorationID`),
  ADD KEY `roomDecorationID` (`roomDecorationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ailment`
--
ALTER TABLE `ailment`
  MODIFY `ailmentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `plant`
--
ALTER TABLE `plant`
  MODIFY `plantID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `plant_decoration`
--
ALTER TABLE `plant_decoration`
  MODIFY `plantDecorationID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `roomID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room_decoration`
--
ALTER TABLE `room_decoration`
  MODIFY `roomDecorationID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_plants`
--
ALTER TABLE `user_plants`
  MODIFY `userPlantID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `plant_ailment`
--
ALTER TABLE `plant_ailment`
  ADD CONSTRAINT `fk_plantailment_ailment` FOREIGN KEY (`ailmentID`) REFERENCES `ailment` (`ailmentID`),
  ADD CONSTRAINT `fk_plantailment_plant` FOREIGN KEY (`plantID`) REFERENCES `plant` (`plantID`),
  ADD CONSTRAINT `plant_ailment_ibfk_1` FOREIGN KEY (`ailmentID`) REFERENCES `ailment` (`ailmentID`),
  ADD CONSTRAINT `plant_ailment_ibfk_2` FOREIGN KEY (`plantID`) REFERENCES `plant` (`plantID`);

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);

--
-- Constraints for table `user_plants`
--
ALTER TABLE `user_plants`
  ADD CONSTRAINT `user_plants_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `user_plants_ibfk_2` FOREIGN KEY (`plantID`) REFERENCES `plant` (`plantID`),
  ADD CONSTRAINT `user_plants_ibfk_3` FOREIGN KEY (`roomID`) REFERENCES `room` (`roomID`);

--
-- Constraints for table `user_plant_decoration`
--
ALTER TABLE `user_plant_decoration`
  ADD CONSTRAINT `user_plant_decoration_ibfk_1` FOREIGN KEY (`userPlantID`) REFERENCES `user_plants` (`userPlantID`),
  ADD CONSTRAINT `user_plant_decoration_ibfk_2` FOREIGN KEY (`plantDecorationID`) REFERENCES `plant_decoration` (`plantDecorationID`);

--
-- Constraints for table `user_room_decoration`
--
ALTER TABLE `user_room_decoration`
  ADD CONSTRAINT `user_room_decoration_ibfk_1` FOREIGN KEY (`roomID`) REFERENCES `room` (`roomID`),
  ADD CONSTRAINT `user_room_decoration_ibfk_2` FOREIGN KEY (`roomDecorationID`) REFERENCES `room_decoration` (`roomDecorationID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
