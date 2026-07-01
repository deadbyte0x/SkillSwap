import SvgEye from '../icons/EyeIcon';
import SvgEyeSlash from '../icons/EyeSlashIcon';

interface EyeToggleProps {
  isVisible: boolean;
  onClick: () => void; // функция при нажатии
}

export const EyeToggle = ({ isVisible, onClick }: EyeToggleProps) => {
  return (
    <button onClick={onClick}>
      {/* если isVisible - показываем открытый глаз, иначе - закрытый */}
      {isVisible ? <SvgEye /> : <SvgEyeSlash />}
    </button>
  );
};
