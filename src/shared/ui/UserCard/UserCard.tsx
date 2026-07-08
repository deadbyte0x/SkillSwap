import styles from './UserCard.module.css';
import { Button } from '../Button';
import { LikeButton } from '../LikeButton';
import { Tag } from '../Tag';

interface UserCardProps {
  name: string;
  city: string;
  age: number;
  avatar: string | null;  // null - если нет аватара
  teachSkills: string[];     // массив навыков "может научить"
  learnSkills: string[];     // массив навыков "хочет научиться"
  onDetailsClick: () => void; // кнопка "Подробнее"
}

export const UserCard = ({ name, city, age, avatar, teachSkills, learnSkills, onDetailsClick }: UserCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.likeButton}>
        <LikeButton isActive={false} onClick={() => {}} />
      </div>
      {/* блок с аватаром и информацией о пользователе */}
      <div className={styles.user}>
        {avatar && <img src={avatar} alt={name} />}
        <div className={styles.userInfo}>
          <p className={styles.name}>{name}</p>
          <p className={styles.location}>{city}, {age} лет</p>
        </div>
      </div>

      {/* блок с навыками */}
      <div className={styles.skillsSection}>
        <div className={styles.skillsBlock}>
          <p>Может научить:</p>
          <div className={styles.skills}>
            {/* для каждого навыка из массива создаем Tag с этим навыком внутри */}
            {teachSkills.map(skill => (
              <Tag key={skill} category="plus">{skill}</Tag>
            ))}
          </div>
        </div>

        <div className={styles.skillsBlock}>
          <p>Хочет научиться:</p>
          <div className={styles.skills}>
            {/* показываем только первые два навыка */}
            {learnSkills.slice(0, 2).map(skill => <Tag key={skill} category="plus">{skill}</Tag>)}
            {/* если навыков больше 2 — показываем счётчик остальных */}
            {learnSkills.length > 2 && <Tag category="plus">+{learnSkills.length - 2}</Tag>}
          </div>
        </div>
      </div>

      {/* кнопка перехода на страницу пользователя */}
      <Button onClick={onDetailsClick}>Подробнее</Button>
    </div>
  );
};
