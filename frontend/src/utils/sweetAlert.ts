import Swal from 'sweetalert2';
import { requestUpdate } from '../services/requests';

export const showSuccessMessage = (text: string) => {
  Swal.fire({
    icon: 'success',
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
