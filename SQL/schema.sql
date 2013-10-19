



-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Messages'
-- 
-- ---

DROP TABLE IF EXISTS `Messages`;
    
CREATE TABLE `Messages` (
  `messageId` TINYINT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(300) NOT NULL,
  `roomname` VARCHAR(20) NOT NULL DEFAULT 'lobby',
  `userId` TINYINT NOT NULL,
  `timestamp` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`messageId`)
);

-- ---
-- Table 'Users'
-- 
-- ---

DROP TABLE IF EXISTS `Users`;
    
CREATE TABLE `Users` (
  `userId` TINYINT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL DEFAULT 'anonymous',
  PRIMARY KEY (`userId`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Messages` ADD FOREIGN KEY (userId) REFERENCES `Users` (`userId`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Messages` (`messageId`,`text`,`roomname`,`userId`,`timestamp`) VALUES
-- ('','','','','');
-- INSERT INTO `Users` (`userId`,`username`) VALUES
-- ('','');

