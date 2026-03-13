-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Mar 13, 2026 at 11:07 AM
-- Server version: 8.4.8
-- PHP Version: 8.2.27

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
  `ailmentID` int NOT NULL,
  `cause` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `symptoms` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `treatment` varchar(32) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ailment`
--

INSERT INTO `ailment` (`ailmentID`, `cause`, `symptoms`, `treatment`) VALUES
(1, 'Overwatering', 'Yellow leaves', 'Reduce watering'),
(2, 'Underwatering', 'Wilting', 'Increase watering'),
(3, 'Spider mites', 'Webbing', 'Neem oil spray'),
(4, 'Root rot', 'Brown roots', 'Repot dry soil'),
(5, 'Low light', 'Leggy growth', 'Move to window');

-- --------------------------------------------------------

--
-- Table structure for table `plant`
--

CREATE TABLE `plant` (
  `plantID` int NOT NULL,
  `latinName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `commonName` json DEFAULT NULL,
  `upperTemp` int NOT NULL,
  `lowerTemp` int NOT NULL,
  `soilType` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `lowerHumidity` int NOT NULL,
  `upperHumidity` int NOT NULL,
  `careDifficulty` int NOT NULL,
  `feedingFreq` int NOT NULL,
  `wateringFreq` int NOT NULL,
  `pottingFreq` int NOT NULL,
  `family` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `lowerLight` int NOT NULL,
  `upperLight` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plant`
--

INSERT INTO `plant` (`plantID`, `latinName`, `commonName`, `upperTemp`, `lowerTemp`, `soilType`, `lowerHumidity`, `upperHumidity`, `careDifficulty`, `feedingFreq`, `wateringFreq`, `pottingFreq`, `family`, `lowerLight`, `upperLight`) VALUES
(1, 'Monstera deliciosa', '[\"Swiss Cheese Plant\"]', 30, 15, 'Well-draining', 60, 0, 2, 30, 7, 365, 'Araceae', 3, 0),
(2, 'Ficus lyrata', '[\"Fiddle Leaf Fig\"]', 28, 18, 'Loamy', 55, 0, 4, 30, 10, 365, 'Moraceae', 4, 0),
(3, 'Sansevieria trifasciata', '[\"Snake Plant\"]', 35, 10, 'Sandy', 40, 0, 1, 60, 21, 730, 'Asparagaceae', 2, 0),
(4, 'Epipremnum aureum', '[\"Pothos\"]', 30, 12, 'Peaty', 65, 0, 1, 30, 7, 365, 'Araceae', 2, 0),
(5, 'Calathea orbifolia', '[\"Calathea\"]', 26, 18, 'Moist rich', 75, 0, 5, 14, 5, 365, 'Marantaceae', 3, 0),
(377, 'Aeschynanthus lobianus', '[\"Lipstick\"]', 14, 32, 'All Purpose Potting Soil', 70, 90, 2, 3, 2, 2, 'Gesneriaceae', 10000, 25000),
(378, 'Adiantum raddianum', '[\"Maindenhair\", \"Delta maidenhair\"]', 12, 30, 'Moisture Holding Potting Soil', 70, 90, 3, 2, 1, 2, 'Polypodiaceae', 10000, 25000),
(379, 'Aechmea fatsiata', '[\"Silver vase\"]', 12, 30, 'Indoor Potting Soil', 75, 90, 2, 4, 1, 3, 'Bromeliaceae', 10000, 25000),
(380, 'Agave angustilolia Marginata', '[\"Variegated Carabbean Agave\", \"Century plant\"]', 5, 35, 'Cacti and Succulent Potting Soil', 70, 90, 2, 3, 10, 3, 'Amaryllidaceae', 25000, 100000),
(381, 'Aechmea ramosa', '[\"Coral berry\"]', 12, 30, 'Indoor Potting Soil', 50, 85, 3, 4, 1, 3, 'Bromeliaceae', 10000, 25000),
(382, 'Aechmea fasciata', '[\"Silver vase\"]', 12, 30, 'Indoor Potting Soil', 75, 90, 2, 4, 1, 3, 'Bromeliaceae', 10000, 25000),
(383, 'Agave filifera', '[\"Thread Agave\", \"Century plant\"]', 5, 35, 'Cacti and Succulent Potting Soil', 10, 30, 2, 3, 10, 3, 'Amaryllidaceae', 25000, 100000),
(384, 'Adiantum hispidulum', '[\"Rosy Maidenhair\", \"Autralian maidenhair\"]', 12, 30, 'Moisture Holding Potting Soil', 70, 90, 3, 2, 1, 2, 'Polypodiaceae', 10000, 25000),
(385, 'Agave attenuata', '[\"Dragon tree Agave\", \"Century plant\"]', 5, 35, 'Cacti and Succulent Potting Soil', 10, 30, 2, 3, 10, 3, 'Amaryllidaceae', 25000, 100000),
(386, 'Aglaonema', '[\"Chinese Evergreen\", \"Amelia\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(387, 'Aglaonema', '[\"Chinese Evergreen\", \"Painted Princess\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(388, 'Aglaonema', '[\"Chinese Evergreen\", \"Queen of Siam\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(389, 'Aglaonema', '[\"Chinese Evergreen\", \"Jewel of India\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(390, 'Aglaonema', '[\"Chinese Evergreen\", \"Patricia\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(391, 'Aglaonema', '[\"Chinese Evergreen\", \"Green Lady\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(392, 'Aglaonema', '[\"Chinese Evergreen\", \"Black Lance\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(393, 'Aglaonema', '[\"Chinese Evergreen\", \"Silver Queen\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(394, 'Aglaonema', '[\"Chinese Evergreen\", \"Rapsody in Green\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(395, 'Aglaonema', '[\"Chinese Evergreen\", \"Manila Pride\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(396, 'Agave verschaffeltii', '[\"Blue Agave\", \"Century plant\"]', 12, 35, 'Cacti and Succulent Potting Soil', 10, 30, 2, 3, 10, 3, 'Amaryllidaceae', 25000, 100000),
(397, 'Aglaonema', '[\"Chinese Evergreen\", \"Emerald Beauty\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(398, 'Aglaonema', '[\"Chinese Evergreen\", \"Jubilee\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(399, 'Agave striata', '[\"Lilliput Agave\", \"Century plant\", \"Nana\"]', 12, 35, 'Cacti and Succulent Potting Soil', 10, 30, 2, 3, 10, 3, 'Amaryllidaceae', 25000, 100000),
(400, 'Aglaonema', '[\"Chinese Evergreen\", \"Abidjan\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(401, 'Aglaonema', '[\"Chinese Evergreen\", \"Maria Chirstina\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(402, 'Alocasia nebula Imperialis', '[\"Elephant ear\"]', 15, 28, 'All Purpose Potting Soil', 75, 90, 2, 5, 3, 3, 'Araceae', 10000, 25000),
(403, 'Aglaonema', '[\"Chinese Evergreen\", \"Emerald Isle\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(404, 'Aglaonema', '[\"Chinese Evergreen\", \"Mary Ann\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(405, 'Allamanda nerifolia', '[\"Golden Trumpet\"]', 10, 30, 'Moisture Holding Potting Soil', 70, 90, 3, 3, 3, 2, 'Apocynaceae', 25000, 100000),
(406, 'Aglaonema', '[\"Chinese Evergreen\", \"BJ Freeman\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(407, 'Aglaonema', '[\"Chinese Evergreen\", \"Marguerita\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(408, 'Aglaonema', '[\"Chinese Evergreen\", \"Emerald Star\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(409, 'Aglaonema', '[\"Chinese Evergreen\", \"Silver Bay\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(410, 'Aspidistra elatior', '[\"Cast iron plant\"]', 8, 28, 'Indoor Potting Soil', 50, 85, 2, 3, 5, 2, 'Liliaceae', 10000, 25000),
(411, 'Anthurium superbum', '[\"Bronze Anthurium\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 2, 5, 2, 'Araceae', 10000, 25000),
(412, 'Caryota mitis', '[\"Fish tail palm\"]', 10, 25, 'All Purpose Potting Soil', 70, 90, 1, 15, 1, 4, 'Palmae', 10000, 25000),
(413, 'Codiaeum petra', '[\"Croton\"]', 10, 28, 'Indoor Potting Soil', 70, 90, 3, 3, 3, 2, 'Euphorbiaceae', 25000, 100000),
(414, 'Cereus peruvianus', '[\"Tree Cereus\"]', 5, 35, 'Cacti and Succulent Potting Soil', 10, 30, 3, 3, 7, 3, 'Cactaceae', 25000, 100000),
(415, 'Blechnum gibbum', '[\"Miniature tree fern\", \"Dwarf tree fern\"]', 10, 30, 'Moisture Holding Potting Soil', 75, 90, 3, 2, 1, 2, 'Polypodiaceae', 10000, 25000),
(416, 'Chamaedorea elegans', '[\"Bella palm\", \"Neanthebella palm\", \"Dwarf palm\", \"Parlor palm\"]', 5, 28, 'All Purpose Potting Soil', 70, 90, 1, 15, 3, 4, 'Arecaceae', 10000, 25000),
(417, 'Calathea veitchiana', '[\"Medallion Calathea\"]', 10, 25, 'Indoor Potting Soil', 70, 90, 2, 3, 3, 2, 'Marantaceae', 10000, 25000),
(418, 'Calathea pictura Argentea', '[\"Silver Calathea\"]', 10, 25, 'Indoor Potting Soil', 70, 90, 2, 3, 3, 2, 'Marantaceae', 10000, 25000),
(419, 'Bougainvillea', '[\"Bougainvillia\", \"Paper flower\"]', 10, 32, 'Moisture Holding Potting Soil', 70, 90, 3, 3, 3, 2, 'Nyctaginaceae', 25000, 100000),
(420, ' Chamaedorea seifrizii', '[\"Bamboo palm\", \"Reed Palm\"]', 10, 30, 'All Purpose Potting Soil', 70, 90, 1, 15, 3, 4, 'Arecaceae', 10000, 25000),
(421, ' Alocasia X amazonica', '[\"Elephant ear\"]', 15, 28, 'All Purpose Potting Soil', 75, 90, 2, 5, 3, 3, 'Araceae', 10000, 25000),
(422, 'Anthurium X', '[\"Tailflower\", \"Wax flower\"]', 18, 22, 'Moisture Holding Potting Soil', 70, 90, 2, 2, 5, 2, 'Araceae', 10000, 25000),
(423, 'Anthurium hookeri', '[\"Bird nest Anthurium\", \"Cabbage Anthurium\"]', 18, 28, 'Moisture Holding Potting Soil', 75, 90, 2, 2, 5, 2, 'Araceae', 10000, 25000),
(424, 'Cissus rhombifolia', '[\"Grape Ivy\", \"Ellen Danica\"]', 10, 28, 'All Purpose Potting Soil', 50, 85, 2, 3, 3, 2, 'Vitaceae', 10000, 25000),
(425, 'Cereus peruvianus Monstrosus', '[\"Monster cactus\"]', 5, 35, 'Cacti and Succulent Potting Soil', 10, 30, 3, 3, 7, 3, 'Cactaceae', 25000, 100000),
(426, 'Chamaedorea erumpens', '[\"Bamboo palm\"]', 10, 28, 'All Purpose Potting Soil', 70, 90, 1, 15, 3, 4, 'Arecaceae', 10000, 25000),
(427, 'Calathea stromata', '[\"Stromante\"]', 10, 25, 'Indoor Potting Soil', 70, 90, 2, 3, 3, 2, 'Marantaceae', 10000, 25000),
(428, 'Codiaeum', '[\"Croton\"]', 10, 28, 'Indoor Potting Soil', 70, 90, 3, 3, 3, 2, 'Euphorbiaceae', 25000, 100000),
(429, 'Calathea rufibarba', '[\"Velvet Calathea\"]', 10, 25, 'Indoor Potting Soil', 70, 90, 2, 3, 3, 2, 'Marantaceae', 10000, 25000),
(430, 'Alocasias X Amazonica var', '[\"Elephant ear\"]', 15, 28, 'All Purpose Potting Soil', 75, 90, 2, 5, 3, 3, 'Araceae', 10000, 25000),
(431, 'Crassula argentea', '[\"Jade Plant\"]', 12, 35, 'Cacti and Succulent Potting Soil', 20, 40, 2, 3, 10, 3, 'Crasssulaceae', 25000, 100000),
(432, 'Alocasias X Amazonica', '[\"Elephant ear\"]', 15, 28, 'All Purpose Potting Soil', 75, 90, 2, 5, 3, 3, 'Araceae', 10000, 25000),
(433, 'Cissus rhombifolia', '[\"Grape Ivy\"]', 10, 28, 'All Purpose Potting Soil', 70, 90, 2, 3, 3, 2, 'Vitaceae', 10000, 25000),
(434, 'Anthurium schlechtendalii', '[\"Bird nest Anthurium\", \"Cabbage Anthurium\"]', 18, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 2, 5, 2, 'Araceae', 10000, 25000),
(435, 'Chamaedorea metallica', '[\"Miniature fishtail\", \"Steel palm\"]', 10, 30, 'All Purpose Potting Soil', 70, 90, 1, 15, 3, 4, 'Arecaceae', 10000, 25000),
(436, 'Aspidistra elatior Minor', '[\"Cast iron plant\", \"Aspidistra Milky Way\"]', 8, 28, 'Indoor Potting Soil', 50, 85, 2, 3, 5, 2, 'Liliaceae', 10000, 25000),
(437, 'Calathea ornata Rosea lineata', '[\"Stiped calathea\"]', 10, 25, 'Indoor Potting Soil', 70, 90, 2, 3, 3, 2, 'Marantaceae', 10000, 25000),
(438, 'Asplenium nidus', '[\"Birdnest fern\"]', 15, 28, 'Moisture Holding Potting Soil', 75, 90, 2, 2, 1, 2, 'Aspleniaceae', 10000, 25000),
(439, 'Anthurium hookeri', '[\"Bird nest Anthurium\", \"Cabbage Anthurium\"]', 18, 28, 'Moisture Holding Potting Soil', 75, 90, 2, 2, 5, 2, 'Araceae', 10000, 25000),
(440, 'Chlorophytum comosum', '[\"Spider plant\"]', 5, 28, 'All Purpose Potting Soil', 60, 75, 2, 3, 3, 2, 'Liliaceae', 10000, 25000),
(441, 'Didymochlaena truncatula', '[\"Tree Maindenhair fern\"]', 5, 30, 'Moisture Holding Potting Soil', 75, 90, 3, 2, 1, 2, 'Dryopteridaceae', 25000, 100000),
(442, 'Dieffenbachia', '[\"Dumcane\", \"Tropic Mary Ann\"]', 12, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 4, 3, 2, 'Araceae', 10000, 25000),
(443, 'Dieffenbachia', '[\"Dumcane\", \"Star Bright\"]', 12, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 4, 3, 2, 'Araceae', 10000, 25000),
(444, 'Dracaena marginata', '[\"Madagascar dragon tree\", \"Tricolor\"]', 10, 28, 'Indoor Potting Soil', 70, 90, 2, 10, 3, 3, 'Liliaceae', 10000, 25000),
(445, 'Dracaena fragrans Massangeana', '[\"Cornstalk plant\"]', 10, 30, 'Indoor Potting Soil', 70, 90, 2, 10, 3, 3, 'Liliaceae', 10000, 25000),
(446, 'Dracaena deremensis', '[\"Janet Craig\"]', 10, 30, 'Indoor Potting Soil', 70, 90, 2, 10, 3, 3, 'Liliaceae', 10000, 25000),
(447, 'Cryptanthus Rose Eliane', '[]', 10, 28, 'Indoor Potting Soil', 70, 90, 2, 4, 5, 3, 'Bromeliaceae', 10000, 25000),
(448, 'Dracaena reflexa', '[\"Yellow Malaysian Dracaena\", \"Song of India\"]', 12, 30, 'Indoor Potting Soil', 70, 90, 2, 10, 3, 3, 'Liliaceae', 25000, 100000),
(449, 'Dieffenbachia maculata', '[\"Dumcane\", \"Carina\"]', 12, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 4, 3, 2, 'Araceae', 10000, 25000),
(450, 'Dracaena reflexa', '[\"Malaysian Dracaena\", \"Song of Jamaica\"]', 12, 30, 'Indoor Potting Soil', 70, 90, 2, 10, 3, 3, 'Liliaceae', 10000, 25000),
(451, 'Cycas revoluta', '[\"Sago palm\", \"King sago\"]', 8, 30, 'All Purpose Potting Soil', 50, 85, 1, 15, 5, 4, 'Cycadaceae', 5000, 15000),
(452, 'Crassula argentea', '[\"Jade Plant\"]', 12, 35, 'Cacti and Succulent Potting Soil', 20, 40, 2, 3, 10, 3, 'Crasssulaceae', 25000, 100000),
(453, 'Ctenanthe lubbersiana', '[\"Phrynium\"]', 12, 25, 'Indoor Potting Soil', 70, 90, 2, 3, 1, 2, 'Marantaceae', 10000, 25000),
(454, 'Dracaena reflexa', '[\"Malaysian Dracaena\"]', 12, 30, 'Indoor Potting Soil', 70, 90, 2, 10, 3, 3, 'Liliaceae', 10000, 25000),
(455, 'Dracaena deremensis', '[\"Striped Dracaena\", \"Gold Star\"]', 10, 30, 'Indoor Potting Soil', 70, 90, 2, 10, 3, 3, 'Liliaceae', 10000, 25000),
(456, 'Cyrtomium falcatum', '[\"Holly-fern\"]', 5, 30, 'Moisture Holding Potting Soil', 50, 85, 3, 2, 3, 2, 'Dryopteridaceae', 10000, 25000),
(457, 'Dracaena deremensis', '[\"Dwarf bouquet\", \"Calypso Queen\", \"Janet Craig Compacta\"]', 10, 30, 'Indoor Potting Soil', 70, 90, 2, 10, 3, 3, 'Liliaceae', 10000, 25000),
(458, 'Davallia trichomannoides', '[\"Rabbits foot\", \"Squirrels foot\"]', 10, 25, 'Moisture Holding Potting Soil', 70, 90, 2, 2, 5, 2, 'Davalliaceae', 10000, 25000),
(459, 'Dracaena deremensis', '[\"Lisa Dracaena\", \"Lisa\"]', 10, 30, 'Indoor Potting Soil', 70, 90, 2, 10, 3, 3, 'Liliaceae', 10000, 25000),
(460, 'Dracaena marginata', '[\"Madagascar dragon tree\"]', 10, 30, 'Indoor Potting Soil', 70, 90, 2, 10, 3, 3, 'Liliaceae', 10000, 25000),
(461, 'Dracaena deremensis', '[\"Striped Dracaena\", \"Warneckei\"]', 10, 30, 'Indoor Potting Soil', 70, 90, 2, 10, 3, 3, 'Liliaceae', 10000, 25000),
(462, 'Dracaena deremensis', '[\"Striped Dracaena\", \"Lemon Lime\"]', 10, 30, 'Indoor Potting Soil', 70, 90, 2, 10, 3, 3, 'Liliaceae', 10000, 25000),
(463, 'Dieffenbachia maculata', '[\"Dumcane\", \"Camille\"]', 12, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 4, 3, 2, 'Araceae', 10000, 25000),
(464, 'Dieffenbachia amoena', '[\"Dumcane\", \"Tropic Snow\"]', 12, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 4, 3, 2, 'Araceae', 10000, 25000),
(465, 'Ficus elastica', '[\"Rubber plant\", \"Tineke\"]', 10, 30, 'All Purpose Potting Soil', 70, 90, 3, 7, 3, 4, 'Moraceae', 25000, 100000),
(466, 'Dypsis lutescens', '[\"Areca palm\", \"Butterfly palm\"]', 10, 28, 'All Purpose Potting Soil', 70, 90, 2, 15, 1, 4, 'Arecaceae', 25000, 100000),
(467, 'Epiphyllum', '[\"Orchid cactus\"]', 5, 32, 'Cacti and Succulent Potting Soil', 70, 90, 2, 3, 3, 3, 'Cactaceae', 10000, 25000),
(468, 'Echinocactus grusonii', '[\"Golden Barrel\"]', 5, 40, 'Cacti and Succulent Potting Soil', 10, 30, 2, 3, 10, 3, 'Cactaceae', 25000, 100000),
(469, 'Euphorbia milii', '[\"Christ thorn\", \"Crown of thorns\"]', 12, 35, 'Cacti and Succulent Potting Soil', 10, 30, 2, 3, 10, 3, 'Euphorbiaceae', 25000, 100000),
(470, 'Epipremnum aureum', '[\"White Pothos\", \"Marble Queen\"]', 12, 30, 'All Purpose Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(471, 'Guzmania', '[\"Guzmania\", \"Guzmania Sunnytime\"]', 10, 30, 'Indoor Potting Soil', 70, 90, 2, 4, 1, 3, 'Bromeliaceae', 10000, 25000),
(472, 'Ficus maclellandii', '[\"Willow fig tree\", \"Amstel King\"]', 10, 30, 'All Purpose Potting Soil', 70, 90, 3, 7, 1, 4, 'Moraceae', 25000, 100000),
(473, 'Guzmania', '[\"Guzmania\", \"Guzmania Empire\"]', 10, 30, 'Indoor Potting Soil', 70, 90, 2, 4, 1, 3, 'Bromeliaceae', 10000, 25000),
(474, 'Ficus benjamina', '[\"Weeping fig\"]', 10, 30, 'All Purpose Potting Soil', 70, 90, 3, 7, 1, 4, 'Moraceae', 25000, 100000),
(475, 'Fatsia japonica', '[\"Japanese Aralia\"]', 8, 28, 'All Purpose Potting Soil', 50, 85, 2, 4, 3, 4, 'Araliaceae', 10000, 25000),
(476, 'Euphorbia ammack', '[\"Variegated Euphorbia\"]', 12, 35, 'Cacti and Succulent Potting Soil', 10, 30, 2, 3, 10, 3, 'Euphorbiaceae', 25000, 100000),
(477, 'Ficus pumila', '[\"Creeping fig\", \"Curl\"]', 10, 30, 'All Purpose Potting Soil', 70, 90, 3, 7, 1, 4, 'Moraceae', 25000, 100000),
(478, 'Guzmania', '[\"Guzmania\", \"Claret\"]', 10, 30, 'Indoor Potting Soil', 70, 90, 2, 4, 1, 3, 'Bromeliaceae', 10000, 25000),
(479, 'Ficus elastica', '[\"Rubber plant\", \"Robusta\"]', 10, 30, 'All Purpose Potting Soil', 70, 90, 3, 7, 3, 4, 'Moraceae', 25000, 100000),
(480, 'Hedera canariensis', '[\"Algerian ivy\", \"Montgomery ivy\"]', 5, 30, 'All Purpose Potting Soil', 50, 85, 3, 3, 3, 2, 'Araliaceae', 10000, 25000),
(481, 'Epipremnum aureum', '[\"Golden Pothos\"]', 12, 30, 'All Purpose Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(482, 'Ficus lyrata', '[\"Fidleleaf fig\"]', 10, 30, 'All Purpose Potting Soil', 70, 90, 3, 7, 3, 4, 'Moraceae', 25000, 100000),
(483, 'Euphorbia ingens', '[\"Giant Candelabra tree\"]', 12, 35, 'Cacti and Succulent Potting Soil', 10, 30, 2, 3, 10, 3, 'Euphorbiaceae', 25000, 100000),
(484, 'Ficus benjamina', '[\"Weeping fig\", \"Monique\"]', 10, 30, 'All Purpose Potting Soil', 70, 90, 3, 7, 1, 4, 'Moraceae', 25000, 100000),
(485, 'Guzmania', '[\"Guzmania\", \"Mariposa\"]', 10, 30, 'Indoor Potting Soil', 70, 90, 2, 4, 1, 3, 'Bromeliaceae', 10000, 25000),
(486, 'Ficus maclellandii Alii', '[\"Willow Ficus\"]', 10, 30, 'All Purpose Potting Soil', 70, 90, 3, 7, 1, 4, 'Moraceae', 25000, 100000),
(487, 'Guzmania', '[\"Guzmania\", \"Marjan\"]', 10, 30, 'Indoor Potting Soil', 70, 90, 2, 4, 1, 3, 'Bromeliaceae', 10000, 25000),
(488, 'Ficus benjamina', '[\"Weeping fig\", \"Midnight\"]', 10, 30, 'All Purpose Potting Soil', 70, 90, 3, 7, 1, 4, 'Moraceae', 25000, 100000),
(489, 'Guzmania', '[\"Guzmania\", \"Rana\"]', 10, 30, 'Indoor Potting Soil', 70, 90, 2, 4, 1, 3, 'Bromeliaceae', 10000, 25000),
(490, 'Ficus elastica', '[\"Rubber plant\", \"Burgandy\"]', 10, 30, 'All Purpose Potting Soil', 70, 90, 3, 7, 3, 4, 'Moraceae', 25000, 100000),
(491, 'Euphorbia drupifera', '[]', 12, 35, 'Cacti and Succulent Potting Soil', 10, 30, 2, 3, 10, 3, 'Euphorbiaceae', 25000, 100000),
(492, 'Hedera helix', '[\"English ivy\", \"Gold Baby\"]', 5, 30, 'All Purpose Potting Soil', 50, 85, 3, 3, 3, 2, 'Araliaceae', 10000, 25000),
(493, 'Maranta leuconeura erythroneura', '[\"Herringbone\", \"Pink praying plant\"]', 12, 28, 'All Purpose Potting Soil', 70, 90, 2, 3, 3, 2, 'Marantaceae', 10000, 25000),
(494, 'Hedera helix', '[\"English ivy\", \"Hermania\"]', 5, 30, 'All Purpose Potting Soil', 50, 85, 3, 3, 3, 2, 'Araliaceae', 10000, 25000),
(495, 'Monstera deliciosa', '[\"Splitleaf Philodendron\", \"Mexican Breadfruit\"]', 12, 32, 'Indoor Potting Soil', 70, 90, 2, 6, 5, 2, 'Araceae', 10000, 25000),
(496, 'Mandevilla X', '[]', 10, 30, 'Moisture Holding Potting Soil', 70, 90, 3, 3, 1, 2, 'Apocynaceae', 25000, 100000),
(497, 'Peperomia obtusifolia', '[\"Baby rubber plant\", \"Pepper face\"]', 10, 32, 'All Purpose Potting Soil', 70, 90, 2, 5, 3, 3, 'Piperaceae', 10000, 25000),
(498, 'Ophiopogon japonicus', '[\"Snakes beard\"]', 5, 28, 'Garden Potting Soil', 50, 85, 2, 10, 3, 2, 'Liliaceae', 10000, 25000),
(499, 'Hedychium coronarium', '[\"Butterfly Ginger\", \"White Ginger\"]', 10, 30, 'Moisture Holding Potting Soil', 50, 85, 3, 3, 1, 2, 'Zingiberaceae', 25000, 100000),
(500, 'Hedera helix variegata', '[\"English ivy\", \"Variegated English ivy\"]', 5, 30, 'All Purpose Potting Soil', 50, 85, 3, 3, 3, 2, 'Araliaceae', 10000, 25000),
(501, 'Pellaea falcata', '[]', 12, 25, 'Moisture Holding Potting Soil', 70, 90, 2, 2, 1, 2, 'Sinopteridaceae', 10000, 25000),
(502, 'Hedera helix', '[\"English ivy\", \"Garland\"]', 5, 30, 'All Purpose Potting Soil', 50, 85, 3, 3, 3, 2, 'Araliaceae', 10000, 25000),
(503, 'Hoya carnosa Exotica', '[\"Wax plant\"]', 12, 28, 'All Purpose Potting Soil', 70, 90, 2, 3, 5, 2, 'Asclepiadaceae', 10000, 25000),
(504, 'Nerium oleander', '[\"Oleander\", \"Rose bay\"]', 5, 30, 'Moisture Holding Potting Soil', 50, 85, 3, 3, 1, 2, 'Apocynaceae', 25000, 100000),
(505, 'Pachypodium geayi', '[\"Madagascar Palm\"]', 8, 35, 'Cacti and Succulent Potting Soil', 10, 30, 2, 3, 10, 3, 'Apocynaceae', 25000, 100000),
(506, 'Licuala spinosa', '[\"Spiny licuala palm\"]', 15, 30, 'All Purpose Potting Soil', 70, 90, 1, 15, 3, 4, 'Arecaceae', 10000, 25000),
(507, 'Philodendron', '[\"Red Philodendron\", \"Imperial Red\"]', 18, 28, 'Indoor Potting Soil', 70, 90, 2, 6, 3, 2, 'Araceae', 10000, 25000),
(508, 'Neoregelia Flandria', '[]', 12, 30, 'Indoor Potting Soil', 70, 90, 2, 4, 1, 3, 'Bromeliaceae', 10000, 25000),
(509, 'Liriope muscari Variegata', '[\"Variegated lily turf\"]', 8, 30, 'Indoor Potting Soil', 50, 85, 3, 3, 3, 2, 'Liliaceae', 10000, 25000),
(510, 'Philodendron micans', '[\"Velvet leaf vine\"]', 18, 28, 'Indoor Potting Soil', 70, 90, 2, 6, 3, 2, 'Araceae', 10000, 25000),
(511, 'Maranta leuconeura kerchoveana', '[\"Green prayer plant\", \"Herringbone\"]', 12, 28, 'All Purpose Potting Soil', 70, 90, 2, 3, 3, 2, 'Marantaceae', 10000, 25000),
(512, 'Neoregelia Victoria Pink', '[]', 12, 30, 'Indoor Potting Soil', 70, 90, 2, 4, 1, 3, 'Bromeliaceae', 10000, 25000),
(513, 'Nolina recurvata', '[\"Elephant foot\", \"Pony tail\"]', 12, 32, 'Indoor Potting Soil', 10, 30, 3, 3, 5, 2, 'Agavaceae', 25000, 100000),
(514, 'Philodendron', '[\"Lime philodendron\", \"Moonlight\"]', 18, 28, 'Indoor Potting Soil', 70, 90, 2, 6, 3, 2, 'Araceae', 10000, 25000),
(515, 'Phalaenopsis X', '[]', 12, 28, 'All Purpose Potting Soil', 75, 90, 2, 3, 5, 2, 'Orchidaceae', 10000, 25000),
(516, 'Hyophorbe verschaffeltii', '[\"Spindle palm\"]', 10, 35, 'All Purpose Potting Soil', 70, 90, 2, 15, 3, 4, 'Arecaceae', 25000, 100000),
(517, 'Hedera helix', '[\"English ivy\"]', 5, 30, 'All Purpose Potting Soil', 50, 85, 3, 3, 3, 3, 'Araliaceae', 10000, 25000),
(518, 'Nolina guatemalensis', '[\"Elephant foot\", \"Pony tail\"]', 12, 32, 'Indoor Potting Soil', 10, 30, 3, 3, 5, 2, 'Agavaceae', 25000, 100000),
(519, 'Medinilla magnifica', '[\"Rose grape\"]', 15, 30, 'Moisture Holding Potting Soil', 70, 90, 3, 3, 1, 2, 'Melastomataceae', 25000, 100000),
(520, 'Hibiscus rosa sinensis', '[\"Chinese hibiscus\"]', 10, 28, 'Moisture Holding Potting Soil', 70, 90, 3, 3, 1, 2, 'Malvaceae', 25000, 100000),
(521, 'Nephrolepis exaltata var', '[\"Boston fern\", \"Sword fern\"]', 10, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 2, 3, 2, 'Nephrolepidaceae', 10000, 25000),
(522, 'Howea forsteriana', '[\"Kentia palm\", \"Paradise palm\"]', 12, 28, 'All Purpose Potting Soil', 70, 90, 1, 15, 1, 4, 'Arecaceae', 10000, 25000),
(523, 'Philodendron', '[\"Emerald Prince\"]', 18, 28, 'Indoor Potting Soil', 70, 90, 2, 6, 3, 2, 'Araceae', 10000, 25000),
(524, 'Homalomena', '[\"Emerald Gem\"]', 10, 28, 'Indoor Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(525, 'Peperomia clusiifolia', '[\"Tricolor Peperomia\"]', 10, 32, 'All Purpose Potting Soil', 70, 90, 2, 5, 3, 3, 'Piperaceae', 10000, 25000),
(526, 'Pandorea jasminoides', '[\"Bower plant\", \"Bower of beauty\"]', 8, 28, 'Moisture Holding Potting Soil', 50, 85, 3, 3, 3, 2, 'Bignoniaceae', 25000, 100000),
(527, 'Neoregelia carolinae var.', '[]', 12, 30, 'Indoor Potting Soil', 70, 90, 2, 4, 1, 3, 'Bromeliaceae', 10000, 25000),
(528, 'Radermachera sinica', '[\"China doll\"]', 8, 28, 'All Purpose Potting Soil', 50, 85, 3, 5, 3, 3, 'Bignoniaceae', 25000, 100000),
(529, 'Pteris cretica Parkeri', '[\"Cretan brake\"]', 12, 28, 'Moisture Holding Potting Soil', 75, 90, 2, 2, 1, 2, 'Pteridaceae', 10000, 25000),
(530, 'Polystichum tsus simense', '[\"Korean rock fern\", \"Tsu sima holly fern\"]', -5, 28, 'Moisture Holding Potting Soil', 50, 85, 3, 2, 1, 2, 'Dryopteridaceae', 10000, 25000),
(531, 'Polystichum polyblepharum', '[\"Japanese tassel fern\"]', -5, 28, 'Moisture Holding Potting Soil', 50, 85, 3, 2, 1, 2, 'Dryopteridaceae', 10000, 25000),
(532, 'Ravenea rivularis', '[\"Majesty palm\"]', 8, 30, 'All Purpose Potting Soil', 70, 90, 2, 15, 1, 4, 'Arecaceae', 25000, 100000),
(533, 'Polyscias scutellaria', '[\"Fabian Aralia\", \"Red Aralia\"]', 12, 30, 'All Purpose Potting Soil', 70, 90, 3, 4, 3, 4, 'Araliaceae', 25000, 100000),
(534, 'Pteris cretica Albo lineata', '[\"Silver Ribbon Fern\"]', 12, 28, 'Moisture Holding Potting Soil', 75, 90, 2, 2, 1, 2, 'Pteridaceae', 10000, 25000),
(535, 'Platycerium bifurcatum', '[\"Staghorn fern\"]', 5, 30, 'Moisture Holding Potting Soil', 70, 90, 2, 2, 3, 2, 'Polypodiaceae', 10000, 25000),
(536, 'Philodendron Xanadu', '[]', 18, 28, 'Indoor Potting Soil', 70, 90, 2, 6, 3, 2, 'Araceae', 10000, 25000),
(537, 'Polyscias pinnatta', '[\"Balfour aralia\", \"Aralia Balfouriana\", \"Lemon Lime\"]', 12, 30, 'All Purpose Potting Soil', 70, 90, 3, 4, 3, 4, 'Araliaceae', 25000, 100000),
(538, 'Philodendron Tatei Congo', '[]', 18, 28, 'Indoor Potting Soil', 70, 90, 2, 6, 3, 2, 'Araceae', 10000, 25000),
(539, 'Sansevieria trifasciata Laurentii', '[\"Snake plant\"]', 10, 35, 'All Purpose Potting Soil', 70, 90, 2, 4, 5, 3, 'Liliaceae', 10000, 25000),
(540, 'Philodendron pinnatifidum', '[\"Fernleaf Philodendron\"]', 18, 28, 'Indoor Potting Soil', 70, 90, 2, 6, 3, 2, 'Araceae', 10000, 25000),
(541, 'Podocarpus gracilior', '[\"African fern pine\", \"Buddhist pine\"]', 10, 30, 'Indoor Potting Soil', 50, 85, 3, 3, 1, 2, 'Podocarpaceae', 25000, 100000),
(542, 'Sansevieria trifasciata Hahnii', '[\"Birdnest sansevieria\", \"Snake plant\"]', 10, 35, 'All Purpose Potting Soil', 70, 90, 2, 4, 5, 3, 'Liliaceae', 10000, 25000),
(543, 'Sansevieria trifasciata', '[\"Snake plant\"]', 10, 35, 'All Purpose Potting Soil', 50, 85, 2, 4, 5, 3, 'Liliaceae', 10000, 25000),
(544, 'Polyscias crispata', '[\"Chicken gizard aralia\"]', 12, 30, 'All Purpose Potting Soil', 70, 90, 3, 4, 3, 4, 'Araliaceae', 25000, 100000),
(545, 'Phoenix roebellinii', '[\"Pignee Date palm\"]', 8, 28, 'All Purpose Potting Soil', 70, 90, 2, 15, 1, 4, 'Palmae', 25000, 100000),
(546, 'Polyscias pinnata Marginata', '[\"Variegated Balfour aralia\", \"Aralia Balfouriana\"]', 12, 30, 'All Purpose Potting Soil', 70, 90, 3, 4, 3, 4, 'Araliaceae', 25000, 100000),
(547, 'Polyscias fruticosa Elegans', '[\"Ming Aralia\", \"Parsley panax\"]', 12, 30, 'All Purpose Potting Soil', 70, 90, 3, 4, 3, 4, 'Araliaceae', 25000, 100000),
(548, 'Philodendron selloum', '[\"Lacy tree philodendron\"]', 18, 28, 'Indoor Potting Soil', 70, 90, 2, 6, 3, 2, 'Araceae', 10000, 25000),
(549, 'Pteris ensiformis Evergemiensis', '[\"Silver Lace Fern\"]', 12, 28, 'Moisture Holding Potting Soil', 75, 90, 2, 2, 1, 2, 'Pteridaceae', 10000, 25000),
(550, 'Rhapis excelsa', '[\"Lady palm\"]', 8, 30, 'All Purpose Potting Soil', 50, 85, 2, 15, 1, 4, 'Arecaceae', 10000, 25000),
(551, 'Polyscias fruticosa', '[\"Ming Aralia\", \"Parsley panax\"]', 12, 30, 'All Purpose Potting Soil', 70, 90, 3, 4, 3, 4, 'Araliaceae', 25000, 100000),
(552, 'Philodendron scandens oxycardium', '[\"Parlor ivy\", \"Sweetheart plant\", \"Heartleaf philodendron\", \"Cordatum vine\"]', 18, 28, 'Indoor Potting Soil', 70, 90, 2, 6, 3, 2, 'Araceae', 10000, 25000),
(553, 'Veitchia merrillii', '[\"Adonidia\", \"Christmas palm\", \"Manila palm\"]', 15, 30, 'All Purpose Potting Soil', 70, 90, 2, 15, 1, 4, 'Arecaceae', 25000, 100000),
(554, 'Spathiphyllum Lynise', '[\"Peace lily\"]', 15, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 4, 1, 2, 'Araceae', 10000, 25000),
(555, 'Spathiphyllum Ceres', '[\"Peace lily\"]', 15, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 4, 1, 2, 'Araceae', 10000, 25000),
(556, 'Vriesea splendens', '[]', 15, 28, 'Indoor Potting Soil', 70, 90, 2, 4, 1, 3, 'Bromeliaceae', 10000, 25000),
(557, 'Trichilia dregei', '[\"Cape mahogany\", \"Christmas bells\"]', 12, 28, 'All Purpose Potting Soil', 75, 90, 2, 5, 1, 3, 'Miliaceae', 10000, 25000),
(558, 'Vriesea Ginger', '[]', 15, 28, 'Indoor Potting Soil', 70, 90, 2, 4, 1, 3, 'Bromeliaceae', 10000, 25000),
(559, 'Vriesea Charlotte', '[]', 15, 28, 'Indoor Potting Soil', 70, 90, 2, 4, 1, 3, 'Bromeliaceae', 10000, 25000),
(560, 'Syngonium podophyllum', '[\"African evergreen\", \"Arrowhead vine\", \"Goosefoot plant\", \"White Lightning\"]', 12, 28, 'All Purpose Potting Soil', 75, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(561, 'Syagrus schizophylla', '[\"Parrot palm\"]', 12, 30, 'All Purpose Potting Soil', 75, 90, 2, 15, 3, 4, 'Arecaceae', 25000, 100000),
(562, 'Tillandsia cyanea', '[\"Pink quill\"]', 15, 30, 'Indoor Potting Soil', 75, 90, 2, 4, 1, 3, 'Bromeliaceae', 10000, 25000),
(563, 'Vriesea Christiane', '[]', 15, 28, 'Indoor Potting Soil', 70, 90, 2, 4, 1, 3, 'Bromeliaceae', 10000, 25000),
(564, 'Tillandsia Creation', '[]', 15, 30, 'Indoor Potting Soil', 75, 90, 2, 4, 1, 3, 'Bromeliaceae', 10000, 25000),
(565, 'Xanthosoma lindenii', '[\" Indian kale\"]', 12, 28, 'Indoor Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(566, 'Schefflera elegantissima', '[\"False aralia\"]', 12, 28, 'All Purpose Potting Soil', 70, 90, 3, 4, 3, 4, 'Araliaceae', 25000, 100000),
(567, 'Spathiphyllum Sensation', '[\"Peace lily\"]', 15, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 4, 1, 2, 'Araceae', 10000, 25000),
(568, 'Spathiphyllum Starlight', '[\"Peace lily\"]', 15, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 4, 1, 2, 'Liliaceae', 10000, 25000),
(569, 'Sedum morganianum', '[\"Burro tail\"]', 8, 35, 'All Purpose Potting Soil', 10, 30, 2, 3, 10, 2, 'Crasssulaceae', 25000, 100000),
(570, 'Spathiphyllum Domino', '[\"Peace lily\"]', 15, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 4, 1, 2, 'Araceae', 10000, 25000),
(571, 'Syngonium podophyllum', '[\"African evergreen\", \"Arrowhead vine\", \"Goosefoot plant\", \"Pink Allusion\"]', 12, 28, 'All Purpose Potting Soil', 75, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(572, 'Scindapsus pictus argyraeus', '[\"Picta Philodendron\", \"Satin pothos\", \"Devils ivy\"]', 12, 30, 'All Purpose Potting Soil', 70, 90, 2, 3, 5, 2, 'Araceae', 10000, 25000),
(573, 'Xanthorrhoea arborea', '[\"Grass tree\"]', 12, 35, 'All Purpose Potting Soil', 10, 30, 2, 5, 10, 3, 'Liliaceae', 25000, 100000),
(574, 'Schefflera arboricola Trinette', '[\"Yellow Hawaiian elf\", \"Yellow parasol plant\"]', 12, 30, 'All Purpose Potting Soil', 70, 90, 3, 6, 3, 4, 'Araliaceae', 25000, 100000),
(575, 'Schefflera actinophylla Amate', '[\"Umbella plant\"]', 12, 28, 'All Purpose Potting Soil', 70, 90, 3, 6, 3, 4, 'Araliaceae', 25000, 100000),
(576, 'Schefflera actinophylla Renegade', '[\"Umbella plant\"]', 12, 28, 'All Purpose Potting Soil', 70, 90, 3, 6, 3, 4, 'Araliaceae', 25000, 100000),
(577, 'Sansevieria trifasciata var', '[\"Snake plant\"]', 10, 35, 'All Purpose Potting Soil', 70, 90, 2, 4, 5, 3, 'Liliaceae', 10000, 25000),
(578, 'Spathiphyllum Supreme', '[\"Peace lily\"]', 15, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 4, 1, 2, 'Liliaceae', 10000, 25000),
(579, 'Schefflera arboricola', '[\"Hawaiian elf\", \"Parasol plant\"]', 12, 30, 'All Purpose Potting Soil', 70, 90, 3, 6, 3, 4, 'Araliaceae', 25000, 100000),
(580, 'Spathiphyllum', '[\"Peace lily\", \"Emerald Swirl\"]', 15, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 4, 1, 2, 'Araceae', 10000, 25000),
(581, 'Spathiphyllum Starlight', '[\"Peace lily\"]', 15, 28, 'Moisture Holding Potting Soil', 70, 90, 2, 4, 1, 2, 'Araceae', 10000, 25000),
(582, 'Schefflera arboricola', '[\"Hawaiian elf\", \"Parasol plant\", \"Gold Cappela\"]', 12, 30, 'All Purpose Potting Soil', 70, 90, 3, 6, 3, 4, 'Araliaceae', 25000, 100000),
(583, 'Strelitzia nicolai', '[\"White bird of paradise\"]', 12, 30, 'Indoor Potting Soil', 50, 85, 3, 3, 3, 2, 'Strelitziaceae', 25000, 100000),
(584, 'Zamioculcas zamifolia', '[\"Zz plant\"]', 12, 30, 'Indoor Potting Soil', 70, 90, 2, 3, 3, 2, 'Araceae', 10000, 25000),
(585, 'Yucca elephantipes', '[\"Spineless yucca\", \"Palm lily\"]', 12, 30, 'Indoor Potting Soil', 50, 85, 3, 10, 3, 3, 'Liliaceae', 25000, 100000);

-- --------------------------------------------------------

--
-- Table structure for table `plant_ailment`
--

CREATE TABLE `plant_ailment` (
  `plantID` int NOT NULL,
  `ailmentID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plant_ailment`
--

INSERT INTO `plant_ailment` (`plantID`, `ailmentID`) VALUES
(1, 1),
(3, 2),
(1, 3),
(5, 4),
(2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `plant_decoration`
--

CREATE TABLE `plant_decoration` (
  `plantDecorationID` int NOT NULL,
  `imagePointer` int NOT NULL,
  `static` int NOT NULL,
  `type` int NOT NULL,
  `cost` int NOT NULL,
  `1erColour` varchar(32) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Stored as hexadec',
  `2erColour` varchar(32) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Stored as hexadec'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plant_decoration`
--

INSERT INTO `plant_decoration` (`plantDecorationID`, `imagePointer`, `static`, `type`, `cost`, `1erColour`, `2erColour`) VALUES
(1, 101, 1, 1, 50, '#8B4513', '#FFFFFF'),
(2, 102, 0, 2, 75, '#000000', '#FFD700'),
(3, 103, 1, 1, 40, '#556B2F', '#FFFFFF'),
(4, 104, 0, 3, 120, '#2F4F4F', '#C0C0C0'),
(5, 105, 1, 2, 60, '#964B00', '#FFFFFF');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `roomID` int NOT NULL,
  `userID` int NOT NULL,
  `roomName` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `upperTemp` int NOT NULL,
  `lowerTemp` int NOT NULL,
  `lightLevel` int NOT NULL,
  `humidity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`roomID`, `userID`, `roomName`, `upperTemp`, `lowerTemp`, `lightLevel`, `humidity`) VALUES
(1, 1, 'Kitchen', 27, 18, 8, 80),
(2, 1, 'Living Room', 24, 18, 3, 55),
(3, 2, 'Bedroom', 22, 16, 2, 50),
(4, 3, 'Office', 25, 19, 3, 45),
(5, 4, 'Bathroom', 26, 20, 2, 75),
(6, 5, 'Kitchen', 23, 17, 3, 60);

-- --------------------------------------------------------

--
-- Table structure for table `room_decoration`
--

CREATE TABLE `room_decoration` (
  `roomDecorationID` int NOT NULL,
  `imagePointer` int NOT NULL,
  `static` tinyint(1) NOT NULL,
  `type` int NOT NULL,
  `cost` int NOT NULL,
  `1erColour` varchar(32) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'store as hexcode',
  `2erColour` varchar(32) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'store as hexcode'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room_decoration`
--

INSERT INTO `room_decoration` (`roomDecorationID`, `imagePointer`, `static`, `type`, `cost`, `1erColour`, `2erColour`) VALUES
(1, 201, 1, 1, 200, '#F5F5DC', '#8B4513'),
(2, 202, 0, 2, 150, '#D3D3D3', '#2F4F4F'),
(3, 203, 1, 1, 300, '#FFFFFF', '#000000'),
(4, 204, 0, 3, 250, '#98FB98', '#556B2F'),
(5, 205, 1, 2, 180, '#FAFAD2', '#8B0000');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int NOT NULL,
  `userName` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `DoB` date NOT NULL,
  `FName` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `SName` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `phoneNum` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `points` int NOT NULL,
  `addressLine1` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `addressLine2` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `region` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `postalCode` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `countryCode` char(2) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `userName`, `password`, `email`, `DoB`, `FName`, `SName`, `phoneNum`, `points`, `addressLine1`, `addressLine2`, `city`, `region`, `postalCode`, `countryCode`) VALUES
(1, 'DevUser', 'temp', 'dev@example.com', '2000-01-01', 'Dexter', 'Rowland', '07000000000', 0, '1 Example Street', NULL, 'London', 'Surrey', 'SW1A 1AA', 'GB'),
(2, 'Test User', '[REDACTED_HASH]', 'test@example.com', '1990-01-01', 'Test', 'User', '1234567890', 0, '123 Test Street', NULL, 'epsom', 'surrey', 'SW1A 1AA', 'GB'),
(3, 'PlantQueen', 'temp', 'plantq@email.com', '1998-03-21', 'Alice', 'Green', '07111111111', 120, '12 Ivy Lane', NULL, 'London', 'Greater London', 'SW19 1AA', 'GB'),
(4, 'UrbanJungle', 'temp', 'urban@email.com', '1995-11-02', 'Ben', 'Moss', '07222222222', 90, '45 Fern Road', 'Flat 2', 'Manchester', 'Greater Manchester', 'M1 4AB', 'GB'),
(5, 'LeafLover', 'temp', 'leaf@email.com', '2000-07-15', 'Chloe', 'Bloom', '07333333333', 45, '88 Palm Street', NULL, 'Bristol', 'Somerset', 'BS1 5TY', 'GB'),
(6, 'BotanyFan', 'temp', 'botany@email.com', '1997-01-09', 'Daniel', 'Reed', '07444444444', 200, '3 Oak Avenue', NULL, 'Leeds', 'Yorkshire', 'LS1 2BH', 'GB');

-- --------------------------------------------------------

--
-- Table structure for table `user_plants`
--

CREATE TABLE `user_plants` (
  `userPlantID` int NOT NULL,
  `plantID` int NOT NULL,
  `userID` int NOT NULL,
  `roomID` int NOT NULL,
  `plantName` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `recommendedLoc` int NOT NULL,
  `lastWatered` datetime NOT NULL,
  `lastFed` datetime NOT NULL,
  `lastPotted` datetime NOT NULL,
  `nextWatering` datetime NOT NULL,
  `nextFeeding` datetime NOT NULL,
  `nextPotting` datetime NOT NULL,
  `dateAdded` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_plants`
--

INSERT INTO `user_plants` (`userPlantID`, `plantID`, `userID`, `roomID`, `plantName`, `recommendedLoc`, `lastWatered`, `lastFed`, `lastPotted`, `nextWatering`, `nextFeeding`, `nextPotting`, `dateAdded`) VALUES
(1, 1, 1, 1, 'Big Monstera', 1, '2026-02-15 10:00:00', '2026-02-01 10:00:00', '2025-06-01 10:00:00', '2026-02-22 10:00:00', '2026-03-01 10:00:00', '2026-06-01 10:00:00', '2025-01-01 09:00:00'),
(2, 3, 2, 2, 'Bedroom Snake', 3, '2026-02-10 09:00:00', '2026-01-01 09:00:00', '2024-05-01 09:00:00', '2026-03-01 09:00:00', '2026-03-01 09:00:00', '2026-05-01 09:00:00', '2024-04-01 09:00:00'),
(3, 4, 3, 3, 'Office Pothos', 4, '2026-02-18 12:00:00', '2026-02-01 12:00:00', '2025-08-01 12:00:00', '2026-02-25 12:00:00', '2026-03-01 12:00:00', '2026-08-01 12:00:00', '2025-05-01 12:00:00'),
(4, 5, 4, 4, 'Humidity Queen', 5, '2026-02-19 08:00:00', '2026-02-10 08:00:00', '2025-09-01 08:00:00', '2026-02-24 08:00:00', '2026-02-24 08:00:00', '2026-09-01 08:00:00', '2025-06-01 08:00:00'),
(5, 2, 5, 5, 'Fiddle Fig', 2, '2026-02-14 11:00:00', '2026-01-30 11:00:00', '2025-07-01 11:00:00', '2026-02-24 11:00:00', '2026-02-28 11:00:00', '2026-07-01 11:00:00', '2025-02-01 11:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user_plant_decoration`
--

CREATE TABLE `user_plant_decoration` (
  `userPlantID` int NOT NULL,
  `plantDecorationID` int NOT NULL,
  `1erColour` varchar(32) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `2erColour` varchar(32) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_plant_decoration`
--

INSERT INTO `user_plant_decoration` (`userPlantID`, `plantDecorationID`, `1erColour`, `2erColour`) VALUES
(1, 1, '#8B4513', '#FFFFFF'),
(2, 2, '#000000', '#FFD700'),
(3, 3, '#556B2F', '#FFFFFF'),
(4, 4, '#2F4F4F', '#C0C0C0'),
(5, 5, '#964B00', '#FFFFFF');

-- --------------------------------------------------------

--
-- Table structure for table `user_room_decoration`
--

CREATE TABLE `user_room_decoration` (
  `roomID` int NOT NULL,
  `roomDecorationID` int NOT NULL,
  `1erColour` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `2erColour` varchar(32) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_room_decoration`
--

INSERT INTO `user_room_decoration` (`roomID`, `roomDecorationID`, `1erColour`, `2erColour`) VALUES
(1, 1, '#F5F5DC', '#8B4513'),
(2, 2, '#D3D3D3', '#2F4F4F'),
(3, 3, '#FFFFFF', '#000000'),
(4, 4, '#98FB98', '#556B2F'),
(5, 5, '#FAFAD2', '#8B0000');

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
  ADD KEY `roomID` (`roomID`),
  ADD KEY `user_plants_ibfk_4` (`recommendedLoc`);

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
  MODIFY `ailmentID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `plant`
--
ALTER TABLE `plant`
  MODIFY `plantID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=586;

--
-- AUTO_INCREMENT for table `plant_decoration`
--
ALTER TABLE `plant_decoration`
  MODIFY `plantDecorationID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `roomID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `room_decoration`
--
ALTER TABLE `room_decoration`
  MODIFY `roomDecorationID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_plants`
--
ALTER TABLE `user_plants`
  MODIFY `userPlantID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  ADD CONSTRAINT `user_plants_ibfk_3` FOREIGN KEY (`roomID`) REFERENCES `room` (`roomID`),
  ADD CONSTRAINT `user_plants_ibfk_4` FOREIGN KEY (`recommendedLoc`) REFERENCES `room` (`roomID`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
