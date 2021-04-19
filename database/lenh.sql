/* Xem danh sach lop hoc cua moi mon hoc do minh phu trach o mot hoc ky */
    /* procedure */
DELIMITER //
CREATE PROCEDURE danhsachlop_sinhvien_hk (IN pStudentId INT,IN pSemesterId INT)
  BEGIN
    SELECT tc.ClassId AS ClassID, s.SubjectName AS SubjectName
    FROM takeclass AS tc, class as c, subject AS s
    WHERE tc.StudentId = pStudentId
        AND tc.SemesterId = pSemesterId
        AND tc.ClassId = c.ClassId
        AND c.CSubjectId = s.SubjectId;
  END;
//
DELIMITER ;
    /* call voi sinh vien: 2010365, hoc ky: 201 */
CALL danhsachlop_sinhvien_hk(2010365,201)