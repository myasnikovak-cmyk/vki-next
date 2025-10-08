import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStudentsApi, deleteStudentApi, addStudentApi } from "@/api/studentsApi";
import type StudentInterface from "@/types/StudentInterface";

interface StudentHookInterface{
    students: StudentInterface[],
    deleteStudentMutate: (studentId: number) => void;
    addStudentMutate: (student: StudentInterface) => void;
}

const useStudents = (): StudentHookInterface => {
    const queryClient = useQueryClient();

  const { data, refetch } = useQuery({
    queryKey: ['students'],
    queryFn: () => getStudentsApi(),
    enabled: false,
  });

  /**
   * Мутация удаления студента
   */
  const deleteStudentMutate = useMutation({
    // вызов API delete
    mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    // оптимистичная мутация (обновляем данные на клиенте до API запроса delete)
    onMutate: async (studentId: number) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      // получаем данные из TanStackQuery
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      let updatedStudents = [...(previousStudents ?? [])] ;

      if (!updatedStudents) return;

      // помечаем удаляемую запись
      updatedStudents = updatedStudents.map((student: StudentInterface) => ({
        ...student,
        ...(student.id === studentId ? { isDeleted: true } : {}),
      }));
      // обновляем данные в TanStackQuery
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);

      return { previousStudents, updatedStudents };
    },
    onError: (err, variables, context) => {
      console.log('>>> deleteStudentMutate  err', err);
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
    },
    // обновляем данные в случаи успешного выполнения mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    onSuccess: async (studentId, variables, context) => {
      console.log('>>> deleteStudentMutate onSuccess', studentId, variables, context);
      refetch();
      // удаляем студента
      // const updatedStudents = context.updatedStudents.filter((student: StudentInterface) => student.id !== studentId);
      // queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);
    },
    onSettled: (data, error, variables, context) => {
    // вызывается после выполнения запроса в случаи удачи или ошибке
      console.log('>> deleteStudentMutate onSettled', data, error, variables, context);
    },
  });

  const addStudentMutate = useMutation({
    mutationFn: async (student: StudentInterface) => addStudentApi(student),

    onMutate: async (student: StudentInterface) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      // получаем данные из TanStackQuery
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      const updatedStudents = [...(previousStudents ?? [])];

      if (!updatedStudents) return;

      // добавляем временную запись
      const tempStudent = { ...student, id: -1 };
      updatedStudents.push(tempStudent);
      // обновляем данные в TanStackQuery
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);

      return { previousStudents, updatedStudents };
    },
    onError: (err, variables, context) => {
      console.log('>>> deleteStudentMutate  err', err);
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
    },
    // обновляем данные в случаи успешного выполнения mutationFn: async (student: StudentInterface) => addStudentApi(student)
    onSuccess: async (newStudent, variables, { previousStudents }) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });

      if (!previousStudents) {
        queryClient.setQueryData<StudentInterface[]>(['students'], [newStudent]);
        return;
      }

      const updatedStudents = [...previousStudents.filter(s => s.id !== -1), newStudent];
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);
    },
  });
  return {
    students: data ?? [],
    deleteStudentMutate: deleteStudentMutate.mutate,
    addStudentMutate: addStudentMutate.mutate
  };
};

export default useStudents;