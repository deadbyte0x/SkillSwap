import styles from './UserTags.module.css';
import { Tag, TagCategory } from '../Tag';
import { SUBCATEGORY_BY_ID } from '../../lib/constants'
import { User } from '../../types';


interface UserTagsProps {
  user: User;
  teachSkill: {
    title: string;
    subCategoryId: string;
  };
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

export const UserTags = ({ user, teachSkill }: UserTagsProps) => {

   // получаем категорию навыка "может научить" для цвета тега
  const teachSub = SUBCATEGORY_BY_ID.get(teachSkill.subCategoryId);
  const teachCategoryId = (teachSub?.categoryId ?? 'plus') as TagCategory;

  // вычисляем видимые теги "хочет научиться" один раз перед рендером
  const { visible, hiddenCount } = getVisibleLearnSkills(user.learnSubcategoryIds);

  return (
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
  );
};
