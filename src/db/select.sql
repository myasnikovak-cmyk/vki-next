-- Active: 1758095405747@@127.0.0.1@3306
SELECT S.id, S.first_name, S.last_name, S.middle_name, C.id, C.name
FROM student S
INNER JOIN class C ON S.groupId == C.id