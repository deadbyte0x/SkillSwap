import styles from './UserCard.module.css';
import { Button } from '../Button';
import { LikeButton } from '../LikeButton';
import { Tag, TagCategory } from '../Tag';
import { getAgeWord } from '../../lib/helpers';
import { SUBCATEGORY_BY_ID } from '../../lib/constants';
import { User } from '../../types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectIsUserLiked, toggleFavoriteUser } from '@/features/auth';
import { getUserLikesCount } from '@/features/data';

interface UserCardProps {
  user: User;              
  teachSkill: {
    title: string;
    subCategoryId: string;
  };

  onDetailsClick: () => void;
}

// примерный лимит символов в одной строке тегов (подобрать под реальную верстку)
const MAX_CHARS_PER_ROW = 25;

// динамически считает, сколько тегов "хочет научиться" влезает без переноса,
// основываясь на суммарной длине их названий, а не на жёстком slice(0, 2)
const getVisibleLearnSkills = (subIds: string[]) => {
  const resolved = subIds.map((subId) => {
    const sub = SUBCATEGORY_BY_ID.get(subId);
    return {
      subId,
      name: sub?.name ?? subId,
      categoryId: (sub?.categoryId ?? 'plus') as TagCategory,
    };
  });

  let totalChars = 0;
  let visibleCount = 0;

  for (const skill of resolved) {
    const nextTotal = totalChars + skill.name.length;
    if (visibleCount > 0 && nextTotal > MAX_CHARS_PER_ROW) break;
    totalChars = nextTotal;
    visibleCount += 1;
  }

  // минимум 1 тег показываем всегда, даже если он длинный
  visibleCount = Math.max(visibleCount, 1);

  return {
    visible: resolved.slice(0, visibleCount),
    hiddenCount: resolved.length - visibleCount,
  };
};

export const UserCard = ({ user, teachSkill, onDetailsClick }: UserCardProps) => {
 
  const dispatch = useAppDispatch()
  const isLiked = useAppSelector((state) => selectIsUserLiked(state, user.id))
  const likeCount = useAppSelector((state) => getUserLikesCount(state,user.id))

  const handleLike = () => {
    dispatch(toggleFavoriteUser(user.id));
  }
   // получаем категорию навыка "может научить" для цвета тега
  const teachSub = SUBCATEGORY_BY_ID.get(teachSkill.subCategoryId);
  const teachCategoryId = (teachSub?.categoryId ?? 'plus') as TagCategory;

  // вычисляем видимые теги "хочет научиться" один раз перед рендером
  const { visible, hiddenCount } = getVisibleLearnSkills(user.learnSubcategoryIds);

  return (
    <div className={styles.card}>
      {/* блок с аватаром и информацией о пользователе */}
      <div className={styles.user}>
        {/* тернарник вместо && — рендерим заглушку avatarPlaceholder,
            если avatarUrl === null, чтобы .user не терял высоту 100px */}
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.name} />
        ) : (
          <div className={styles.avatarPlaceholder} />
        )}
        <div className={styles.userInfo}>
          <p className={styles.name}>{user.name}</p>
          <p className={styles.location}>{user.city}, {user.age} {getAgeWord(user.age)}</p>
        </div>
        <div className={styles.likeButton}>
          <LikeButton isActive={isLiked} onClick={handleLike} count={likeCount}/>
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
            {/* было slice(0, 2), теперь динамический расчёт по суммарной длине названий */}
            {visible.map(({ subId, name, categoryId }) => (
              <Tag key={subId} category={categoryId}>{name}</Tag>
            ))}
            {hiddenCount > 0 && (
              <Tag category="plus">+{hiddenCount}</Tag>
            )}
          </div>
        </div>
      </div>

      {/* кнопка перехода на страницу пользователя */}
      <Button onClick={onDetailsClick}>Подробнее</Button>
    </div>
  );
};