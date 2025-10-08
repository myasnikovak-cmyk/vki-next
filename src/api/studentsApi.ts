import { DELETE } from "@/app/api/students/[id]/route";
import StudentInterface from "@/types/StudentInterface";

export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const groups = await response.json() as StudentInterface[];
    return groups;
  }
  catch (err) {
    console.log('>>> getStudentsApi', err);
    return [] as StudentInterface[];
  }
};

export const deleteStudentApi = async (id: number): Promise<number> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const deleteId = await response.json() as number;
    return deleteId;
  }
  catch (err) {
    console.log('>>> deleteStudentsApi', err);
    return -1;
  }
}

export const addStudentApi = async(student: StudentInterface): Promise<StudentInterface> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    return response.json() as Promise<StudentInterface>;
  }
  catch(err) {
    console.log('>>> addStudentApi', err); 
    throw err;
  }
}
