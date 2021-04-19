--
-- Bẫy `class`
--
DELIMITER $$
CREATE TRIGGER `InsertNewClass` BEFORE INSERT ON `class` FOR EACH ROW BEGIN 
DECLARE rowcount INT; 
SELECT NEW.NumberOfStudent INTO rowcount; 
IF rowcount > 60 THEN 
SIGNAL sqlstate '45001' set message_text = "Number student for each class just only max is 60!";
END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `UpdateMemberClass` BEFORE UPDATE ON `class` FOR EACH ROW BEGIN
DECLARE rowcount INT;
SELECT OLD.NumberOfStudent INTO rowcount;
IF rowcount > 60 THEN
SIGNAL sqlstate '45001' set message_text = "This class is full!";
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------
--
-- Bẫy `student`
--
DELIMITER $$
CREATE TRIGGER `DeleteStudent` BEFORE DELETE ON `student` FOR EACH ROW BEGIN
DECLARE ID CHAR(15);
SET ID = OLD.StudentId;

DELETE FROM register
WHERE ID = RStudentId;

DELETE FROM takeclass
WHERE ID = StudentId;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `UpdateCredit` BEFORE UPDATE ON `student` FOR EACH ROW BEGIN

IF NEW.SCredit > 18 OR NEW.SCredit < 0 THEN
SIGNAL sqlstate '45001' set message_text = "Student cannot registers anymore!";
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------
--
-- Bẫy `subject`
--
DELIMITER $$
CREATE TRIGGER `CheckCollegeCredit` BEFORE INSERT ON `subject` FOR EACH ROW BEGIN
DECLARE credit INT;
SET credit = NEW.CollegeCredit;
IF credit > 4 OR credit < 1 THEN
SIGNAL sqlstate '45001' set message_text = "The College Credit must be from 1 to 4!";
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Bẫy `takeclass`
--
DELIMITER $$
CREATE TRIGGER `DecreaseNumberOfStudent` BEFORE DELETE ON `takeclass` FOR EACH ROW BEGIN
UPDATE class SET NumberOfStudent = NumberOfStudent - 1 WHERE ClassId = OLD.ClassId;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `IncreaseNumberOfStudent` BEFORE INSERT ON `takeclass` FOR EACH ROW BEGIN
UPDATE class SET NumberOfStudent = NumberOfStudent + 1 WHERE ClassID = new.ClassId;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TakeNewClass` BEFORE INSERT ON `takeclass` FOR EACH ROW BEGIN

DECLARE oldcredit INT;
DECLARE newcredit INT;
DECLARE newclass INT;

SELECT Credit FROM student 
WHERE StudentID = NEW.StudentID INTO oldcredit;

SELECT CSubjectId FROM class
WHERE ClassId = NEW.ClassId INTO newclass;

SELECT CollegeCredit from subject
WHERE newclass = SubjectId INTO newcredit;

UPDATE student
SET credit = oldcredit + newcredit 
WHERE StudentID = NEW.StudentID;

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `DeleteClass` BEFORE DELETE ON `takeclass` FOR EACH ROW BEGIN

DECLARE oldcredit INT;
DECLARE newcredit INT;
DECLARE newclass INT;

SELECT Credit FROM student 
WHERE StudentID = OLD.StudentID INTO oldcredit;

SELECT CSubjectId FROM class
WHERE ClassId = OLD.ClassId INTO newclass;

SELECT CollegeCredit from subject
WHERE newclass = SubjectId INTO newcredit;

UPDATE student
SET credit = oldcredit - newcredit 
WHERE StudentID = OLD.StudentID;

END
$$
DELIMITER ;
-- --------------------------------------------------------

--
-- Bẫy `undertake`
--
DELIMITER $$
CREATE TRIGGER `MainTeacherForSubject` BEFORE INSERT ON `undertake` FOR EACH ROW BEGIN

DECLARE countMain INT;
SELECT COUNT(UTeacherId) FROM undertake
WHERE(USubjectId = NEW.USubjectId AND
      Role = 'Main')
INTO countMain;

IF countMain > 0 THEN
SIGNAL sqlstate '45001' set message_text = "Subject can be only undertaked by 1 Main Teacher!";
END IF;

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Bẫy `use`
--
DELIMITER $$
CREATE TRIGGER `UseTextbook` BEFORE INSERT ON `use` FOR EACH ROW BEGIN

DECLARE useText INT;
SELECT COUNT(UseTextBookId)
FROM `use` 
WHERE NEW.UseSubjectId = UseSubjectId
INTO useText;

IF useText = 3 THEN
SIGNAL sqlstate '45001' set message_text = "Subject can only use from 1 to 3 Textbooks!";
END IF;

END
$$
DELIMITER ;

-- --------------------------------------------------------


-- --------------------------------------------------------
-- thêm vào chỉ mục của các bảng relationship
-- -------------------------------------------------------
ALTER TABLE `takeclass` ADD UNIQUE INDEX(StudentId, ClassId);

ALTER TABLE `register` ADD UNIQUE INDEX(RStudentId, RSubjectId);

ALTER TABLE `undertake` ADD UNIQUE INDEX(USubjectId, UTeacherId);

ALTER TABLE `teach` ADD UNIQUE INDEX(TClassId, TTeacherId);

ALTER TABLE `use` ADD UNIQUE INDEX(UseSubjectId, UseTextBookId);
