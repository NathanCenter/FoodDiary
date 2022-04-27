CREATE TABLE `UserProfile` (
  `Id` int PRIMARY KEY AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Height` varchar(255),
  `Weight` varchar(255),
  `FirebaseUserId` varchar(255) NOT NULL
);

CREATE TABLE `Food` (
  `Id` int PRIMARY KEY AUTO_INCREMENT,
  `FoodName` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Caloric` int NOT NULL,
  `ImageURL` varchar(255) NOT NULL
);

CREATE TABLE `FoodSchedule` (
  `Id` int PRIMARY KEY AUTO_INCREMENT,
  `UserProfileId` int NOT NULL,
  `FoodId` int NOT NULL,
  `Date` datetime NOT NULL,
  `Meal` varchar(255) NOT NULL
);

CREATE TABLE `Favorite` (
  `Id` int PRIMARY KEY AUTO_INCREMENT,
  `FoodId` int NOT NULL,
  `UserProfileId` int NOT NULL
);

ALTER TABLE `FoodSchedule` ADD FOREIGN KEY (`UserProfileId`) REFERENCES `UserProfile` (`Id`) ON DELETE CASCADE;

ALTER TABLE `Favorite` ADD FOREIGN KEY (`UserProfileId`) REFERENCES `UserProfile` (`Id`) ON DELETE CASCADE;

ALTER TABLE `Favorite` ADD FOREIGN KEY (`FoodId`) REFERENCES `Food` (`Id`) ON DELETE CASCADE;
