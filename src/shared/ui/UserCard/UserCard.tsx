import styles from './UserCard.module.css';
import { Button } from '../Button';
import { LikeButton } from '../LikeButton';
import { getAgeWord } from '../../lib/helpers';
import { ROUTES } from '../../lib/constants'
import { User } from '../../types';
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectIsUserLiked, selectUser, toggleFavoriteUser } from '@/features/auth'
import { getUserLikesCount } from '@/features/data';
import { useNavigate } from 'react-router-dom'
import { UserTags } from '@/shared/ui/UserTags'
import { Avatar } from '@/shared/ui/avatar'

interface UserCardProps {
  user: User;
  teachSkill: {
    title: string;
    subCategoryId: string;
  };

  onDetailsClick: () => void;
}

export const UserCard = ({ user, teachSkill, onDetailsClick }: UserCardProps) => {

  const dispatch = useAppDispatch()
  const isLiked = useAppSelector((state) => selectIsUserLiked(state, user.id))
  const likeCount = useAppSelector((state) => getUserLikesCount(state,user.id))
  const currentUser = useAppSelector(selectUser)
  const navigate = useNavigate()

  const handleLike = () => {
    if (!currentUser)
      return navigate(ROUTES.LOGIN);
    dispatch(toggleFavoriteUser(user.id));
  }

  return (
    <div className={styles.card}>
      {/* блок с аватаром и информацией о пользователе */}
      <div className={styles.user}>
        {/* тернарник вместо && — рендерим заглушку avatarPlaceholder,
            если avatarUrl === null, чтобы .user не терял высоту 100px */}
        {user.avatarUrl ? (
          <Avatar image={user.avatarUrl} alt={user.name} />
        ) : (
          <div className={styles.avatarPlaceholder} />
        )}
        <div className={styles.userInfo}>
          <p className={styles.name}>{user.name}</p>
          <p className={styles.location}>
            {user.city}, {user.age} {getAgeWord(user.age)}
          </p>
        </div>
        <div className={styles.likeButton}>
          <LikeButton isActive={isLiked} onClick={handleLike} count={likeCount} />
        </div>
      </div>

      {/* блок с навыками */}
      <UserTags user={user} teachSkill={teachSkill} />

      {/* кнопка перехода на страницу пользователя */}
      <Button onClick={onDetailsClick}>Подробнее</Button>
    </div>
  )
};
