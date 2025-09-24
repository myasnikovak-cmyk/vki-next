'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import Student from '../Student/Student';

const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate } = useStudents();

  const onDeleteHandler = (id: number): void => {
    deleteStudentMutate(id);
  }
  //console.log("Student Component Log")
  //console.log(students)
  return (
    <div>
      {students.map((student : StudentInterface) => (
        <Student
        key={student.id}
        student={student}
        onDelete={() => onDeleteHandler(student.id)}
        />
      ))}
    </div>
     );   
};

export default Students;