import {
  Modal,
  ModalIcon,
  ModalTitle,
  ModalSubtitle,
  ModalButton,
} from '@/shared/ui/Modal';
import {UserCircleIcon} from '@/shared/ui/icons';

interface RegistrationSuccessModalProps {
  onClose: () => void;
}

export const RegistrationSuccessModal = ({ onClose }: RegistrationSuccessModalProps) => {
  return (
    <Modal onModalClose={onClose} size="default">
      <ModalIcon>
        <UserCircleIcon width={100} height={100} />
      </ModalIcon>
      <ModalTitle>Ваше предложение создано</ModalTitle>
      <ModalSubtitle>Теперь вы можете предложить обмен</ModalSubtitle>
      <ModalButton onClick={onClose}>Готово</ModalButton>
    </Modal>
  );
};