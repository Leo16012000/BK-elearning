/*  Tao bang Faculty*/
CREATE TABLE `Faculty` (
    `FacultyId`     int     NOT NULL,
    `FacultyName`   varchar(255),
    PRIMARY KEY (`FacultyId`)
);

/* Tao bang Student */
CREATE TABLE `Student` (
    `StudentId`   int     NOT NULL,
    `StudentName`     varchar(255)    NOT NULL,
    `Sex`     varchar(10),
    `Bdate`   date,
    `Grade`   int     DEFAULT   1,
    `StateOfStudy`    varchar(255),
    `SFacultyId`      int     NOT NULL,
	`SCredit`   int     DEFAULT   0,
    PRIMARY KEY (`StudentId`),
    CONSTRAINT FK_SFacultyId FOREIGN KEY (`SFacultyId`) REFERENCES `Faculty`(`FacultyId`)
);

/* Tao bang Dependend */
CREATE TABLE `Dependend` (
    `DStudentId`    int     NOT NULL ,
    `DName`   varchar(255)    NOT NULL,
    `Relationship`    varchar(255),
    PRIMARY KEY (`DName`),
    CONSTRAINT FK_dsid FOREIGN KEY (`DStudentId`) REFERENCES `Student`(`StudentId`)
);

/* Tao bang Subject*/
CREATE TABLE `Subject` (
    `SubjectId`     int     NOT NULL,
    `SubjectName`     varchar(255)    NOT NULL,
    `CollegeCredit`   int,
    `SJFacultyId`     int     NOT NULL,
    PRIMARY KEY (`SubjectId`),
    CONSTRAINT FK_sjfacultyid FOREIGN KEY (`SJFacultyId`) REFERENCES `Faculty`(`FacultyId`)
);

/* Tao bang Register*/
CREATE TABLE `Semester` (
    `SemesterId`      int     NOT NULL,
    `Year`    varchar(20),
    `CreditFee`       int,
    PRIMARY KEY (`SemesterId`)
);

/* Tao bang Register*/
CREATE TABLE `Register` (
    `RStudentId`     int      NOT NULL,
    `RSubjectId`    int     NOT NULL,
    `RSemesterId`     int     NOT NULL,
    CONSTRAINT FK_RStudentID FOREIGN KEY (`RStudentId`) REFERENCES `Student`(`StudentId`),
    CONSTRAINT FK_RSubjectId FOREIGN KEY (`RSubjectId`) REFERENCES `Subject`(`SubjectId`),
    CONSTRAINT FK_RSemesterId FOREIGN KEY (`RSemesterId`) REFERENCES `Semester`(`SemesterId`)
);
/* Tao bang Teacher*/
CREATE TABLE `Teacher` (
    `TeacherId`   int     NOT NULL,
    `TeacherName`     varchar(255),
    `TFacultyId`  int     NOT NULL,
    PRIMARY KEY (`TeacherId`),
    CONSTRAINT FK_TFacultyId FOREIGN KEY (`TFacultyId`) REFERENCES `Faculty`(`FacultyId`)
);

/* Tao bang Class*/
CREATE TABLE `Class` (
    `ClassId`     int     NOT NULL,
    `CFalcility`  int,
    `CBuilding`   varchar(10),
    `CRoom`       int,
    `NumberOfStudent`     int	DEFAULT 0,
    `CSubjectId`      int     NOT NULL,
    `MainTeacher`     int     NOT NULL,
    PRIMARY KEY (`ClassId`),
    CONSTRAINT FK_CSubjectId FOREIGN KEY (`CSubjectId`) REFERENCES `Subject`(`SubjectId`),
    CONSTRAINT FK_MainTeacher FOREIGN KEY (`MainTeacher`) REFERENCES `Teacher`(`TeacherId`)
);

/* Tao bang TakeClass*/
CREATE TABLE `TakeClass` (
    `StudentId`   int         NOT NULL,
    `ClassId`     int         NOT NULL,
    `SemesterId`    int         NOT NULL,
    CONSTRAINT FK_tcStudentId FOREIGN KEY (`StudentId`) REFERENCES `Student`(`StudentId`),
    CONSTRAINT FK_tcClassId FOREIGN KEY (`ClassId`) REFERENCES `Class`(`ClassId`),
    CONSTRAINT FK_tcSemesterId FOREIGN KEY (`SemesterId`) REFERENCES `Semester`(`SemesterId`)
);

/* Tao bang Teach*/
CREATE TABLE `Teach` (
    `TClassId`    int     NOT NULL,
    `TTeacherId`  int     NOT NULL,
    `Week`        varchar(255),
    CONSTRAINT FK_TeachCId FOREIGN KEY (`TClassId`) REFERENCES `Class`(`ClassId`),
    CONSTRAINT FK_TeachTCId FOREIGN KEY (`TTeacherId`) REFERENCES `Teacher`(`TeacherId`)
);

/* Tao bang Undertake*/
CREATE TABLE `Undertake` (
    `USubjectId`      int     NOT NULL,
    `UTeacherId`     int     NOT NULL,
    `Role`    varchar(20),
    CONSTRAINT FK_USubjectId FOREIGN KEY (`USubjectId`) REFERENCES `Subject`(`SubjectId`),
    CONSTRAINT FK_UTeacherId FOREIGN KEY (`UTeacherId`) REFERENCES `Teacher`(`TeacherId`)
);

/* Tao bang TextBook*/
CREATE TABLE `TextBook` (
    `TextBookId`      int     NOT NULL,
    `TextBookName`    varchar(255),
    `YearOfRelease`   int,
    `PublishingHouseName`     varchar(255),
    `PublishingHouseOrigin`   varchar(255),
    PRIMARY KEY (`TextBookId`)
);

/* Tao bang TextBook*/
CREATE TABLE `Use` (
    `UseSubjectId`    int     NOT NULL,
    `UseTextBookId`   int     NOT NULL,
    CONSTRAINT FK_UseSubjectId FOREIGN KEY (`UseSubjectId`) REFERENCES `Subject`(`SubjectId`),
    CONSTRAINT FK_UseTextBookId FOREIGN KEY (`UseTextBookId`) REFERENCES `TextBook`(`TextBookId`)
);

