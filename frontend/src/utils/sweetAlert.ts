import Swal from 'sweetalert2';
import { requestDelete, requestUpdate } from '../services/requests';
import { UserType } from '../types/userTypes';

export const showSuccessMessage = (text: string) => {
  Swal.fire({
    icon: 'success',
    title: text,
    showConfirmButton: true,
    confirmButtonColor: '#e06915',
  });
};

export const showErrorMessage = (text: string) => {
  Swal.fire({
    icon: 'error',
    title: text,
    showConfirmButton: true,
    confirmButtonColor: '#e06915',
  });
};

export const showNoCourseSelectedMessage = () => {
  Swal.fire({
    icon: 'error',
    title: 'Selecione um curso',
    showConfirmButton: true,
    confirmButtonColor: '#e06915',
  });
};

export const showSubscriptionMessage = (
  userId: string,
  courseId: string,
  subscribed: { [key: string]: boolean },
) => {
  Swal.fire({
    title: 'Você não está inscrito neste curso',
    text: 'Deseja se inscrever e receber emails sobre o curso?',
    showCancelButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não',
    confirmButtonColor: '#e06915',
  }).then((result) => {
    if (result.isConfirmed) {
      requestUpdate('/user-courses', {
        key: 'subscribed', value: true, userId, courseId,
      })
        .then(() => {
          Swal.fire({
            title: 'Inscrição realizada com sucesso!',
            icon: 'success',
            confirmButtonColor: '#e06915',
          });
          subscribed[courseId] = true;
          localStorage.setItem('subscribedCourses', JSON.stringify(subscribed));
        })
        .catch((error: any) => {
          if (error.isAxiosError) {
            console.error(error.response.data);
          }
        });
    }
  });
};

export const deleteUser = (
  id: number,
  index: number,
  setStudents: React.Dispatch<React.SetStateAction<UserType[]>>,
) => {
  Swal.fire({
    title: 'Você tem certeza?',
    text: 'Você não poderá reverter isso!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e06915',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      await requestDelete(`/profile/${id}`).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Usuário excluído com sucesso',
          showConfirmButton: true,
          confirmButtonColor: '#e06915',
        });
      });
      setStudents((prevStudents) => {
        const newStudents = [...prevStudents];
        newStudents.splice(index, 1);
        return newStudents;
      });
    }
  });
};

export const userEditedSuccessfully = () => {
  return Swal.fire({
    icon: 'success',
    title: 'Usuário atualizado com sucesso',
    showConfirmButton: true,
    confirmButtonColor: '#e06915',
  });
};

export const cantDeleteAdmin = () => {
  Swal.fire({
    icon: 'error',
    title: 'Não é possível excluir o ADMIN',
    showConfirmButton: true,
    confirmButtonColor: '#e06915',
  });
};
