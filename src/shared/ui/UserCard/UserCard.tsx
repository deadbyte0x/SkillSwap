import styles from './UserCard.module.css';
import { Button } from '../Button';
import { LikeButton } from '../LikeButton';
import { Tag, TagCategory } from '../Tag';
import { getAgeWord } from '../../lib/helpers';
import { SUBCATEGORY_BY_ID } from '../../lib/constants';
import { User } from '../../types';

interface UserCardProps {
  user: User;                 // данные пользователя
  teachSkill: {               // навык отдельно, так как хранится в другой таблице
    title: string;
    subCategoryId: string;
  };
  isLiked: boolean;
  onLike: () => void;
  onDetailsClick: () => void;
}

export const UserCard = ({ user, teachSkill, isLiked, onLike, onDetailsClick }: UserCardProps) => {
  // получаем категорию навыка "может научить" для цвета тега
  const teachSub = SUBCATEGORY_BY_ID.get(teachSkill.subCategoryId);
  const teachCategoryId = (teachSub?.categoryId ?? 'plus') as TagCategory;
  return (
    <div className={styles.card}>
      {/* блок с аватаром и информацией о пользователе */}
      <div className={styles.user}>
        {user.avatarUrl && <img src={user.avatarUrl} alt={user.name} />}
        <div className={styles.userInfo}>
          <p className={styles.name}>{user.name}</p>
          <p className={styles.location}>{user.city}, {user.age} {getAgeWord(user.age)}</p>
        </div>
        <div className={styles.likeButton}>
          <LikeButton isActive={isLiked} onClick={onLike} />
        </div>
      </div>

      {/* блок с навыками */}
      <div className={styles.skillsSection}>
        <div className={styles.skillsBlock}>
          <p>Может научить:</p>
          <div className={styles.skills}>
            <Tag category={teachCategoryId}>{teachSkill.title}</Tag>
          </div>
        </div>

        <div className={styles.skillsBlock}>
          <p>Хочет научиться:</p>
          <div className={styles.skills}>
            {/* показываем первые два навыка с цветом категории */}
            {user.learnSubcategoryIds.slice(0, 2).map(subId => {
              const sub = SUBCATEGORY_BY_ID.get(subId);
              const categoryId = (sub?.categoryId ?? 'plus') as TagCategory;
              return <Tag key={subId} category={categoryId}>{sub?.name ?? subId}</Tag>;
            })}
            {/* если навыков больше 2 — показываем счётчик */}
            {user.learnSubcategoryIds.length > 2 && (
              <Tag category="plus">+{user.learnSubcategoryIds.length - 2}</Tag>
            )}
          </div>
        </div>
      </div>

      {/* кнопка перехода на страницу пользователя */}
      <Button onClick={onDetailsClick}>Подробнее</Button>
    </div>
  );
};
