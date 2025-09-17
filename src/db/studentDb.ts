import sqlite3 from 'sqlite3';

import type StudentInterface from '@/types/StudentInterface';

sqlite3.verbose();

export const getStudentsDb = async(): Promise<StudentInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');
  
  const students = await new Promise((resolve, reject) => {
    const sql = 'SELECT S.id, S.first_name, S.last_name, S.middle_name, C.name AS group_name FROM student S INNER JOIN class C ON S.groupId == C.id';
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
        db.close();
        return;
      }
      resolve(rows);
      db.close();
    });
  });
  console.log(students);
  return students as StudentInterface[]
}