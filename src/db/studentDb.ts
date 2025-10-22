import { Student } from './entity/Student.entity';
import type StudentInterface from '@/types/StudentInterface';
import AppDataSource from './AppDataSource';

const studentRepository = AppDataSource.getRepository(Student);

/**
 * Получение студентов
 * @returns Promise<StudentInterface[]>
 */
export const getStudentsDb = async (): Promise<StudentInterface[]> => {
    return await studentRepository.find();
};

/**
 * Удаления студента
 *  * @param studentId ИД удаляемого студента
 * @returns
 */
export const deleteStudentDb = async (studentId: number): Promise<number> => {
    await studentRepository.delete(studentId);
  return studentId;
};

/**
 * Добавление студента
 * @param studentField поля студента
 * @returns
 */
export const addStudentDb = async (studentFields: Omit<StudentInterface, 'id'>): Promise<StudentInterface> => {
  const student = new Student();
  const newStudent = await studentRepository.save({
    ...student,
    ...studentFields,
  });

  return newStudent;
};