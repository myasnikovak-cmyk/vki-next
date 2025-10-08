'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import Student from '../Student/Student';
import AddStudent from '../AddStudent/AddStudent';

const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate, addStudentMutate } = useStudents();

  const onDeleteHandler = (id: number): void => {
    deleteStudentMutate(id);
  }

  const onAddHandler = (student: StudentInterface): void => {
    addStudentMutate(student);
  }
  //console.log("Student Component Log")
  //console.log(students)
  return (
    <div>
      <AddStudent addStudent={onAddHandler}/>
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