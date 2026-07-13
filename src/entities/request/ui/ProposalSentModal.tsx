import {
  Modal,
  ModalIcon,
  ModalTitle,
  ModalSubtitle,
  ModalButton,
} from '@/shared/ui/Modal';
import { NotificationIcon } from '@/shared/ui/icons';

interface ProposalSentModalProps {
  onClose: () => void;
}

export const ProposalSentModal = ({ onClose }: ProposalSentModalProps) => {
  return (
    <Modal onModalClose={onClose} size="medium">
      <ModalIcon>
        <NotificationIcon width={100} height={100} />
      </ModalIcon>
      <ModalTitle>Вы предложили обмен</ModalTitle>
      <ModalSubtitle>
        Теперь дождитесь подтверждения. Вам придёт уведомление
      </ModalSubtitle>
      <ModalButton onClick={onClose}>Готово</ModalButton>
    </Modal>
  );
};