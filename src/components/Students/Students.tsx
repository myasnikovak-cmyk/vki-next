'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';

const Students = (): React.ReactElement => {
  const { students } = useStudents();
  console.log("Student Component Log")
  console.log(students)
  return (
    <div>
      {students.map((item : StudentInterface) => (
        <h1 key={item.id}>
            {item.first_name + ' '} 
            {item.group_name}
        </h1>
      ))}
    </div>
     );   
};

export default Students;