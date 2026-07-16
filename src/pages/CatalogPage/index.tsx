import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './CatalogPage.module.css';
import { Header } from '../../widgets/Header';
import { Footer } from '../../widgets/Footer';
import { SkillFilter } from '../../widgets/SkillFilter';
import { CityFilter } from '../../widgets/CityFilter';
import { GenderFilter } from '../../widgets/GenderFilter';
import { SkillTypeFilter } from '../../widgets/SkillTypeFilter';
import { SKILL_CATEGORIES, Cities, ROUTES } from '../../shared/lib/constants'
import { loadAllData, getAllSkills, getAllUsers, getUsersPopular, getUsersNewest, getUsersRecommended, } from '../../features/data';
import { UserCardsSection } from '../../widgets/UserCardsSection'
import { selectType, setType, toggleCategory, selectCategories, setGender, setCity, selectCity, selectGender } from '../../features/filters';
import type { User } from '../../shared/types';
import { useNavigate } from 'react-router-dom'

export default function CatalogPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const skills = useAppSelector(getAllSkills);
  const selectedType = useAppSelector(selectType);
  const selectedCategories = useAppSelector(selectCategories);
  const selectedGender = useAppSelector(selectGender);
  const selectedCity = useAppSelector(selectCity);
  const allUsers = useAppSelector(getAllUsers);

  const popularUsers = useAppSelector((state) =>
    getUsersPopular(state, 9, 0),
  );
  const newestUsers = useAppSelector((state) =>
    getUsersNewest(state, 9, 0),
  );

  const allRecommendedUsers = useAppSelector((state) =>
    getUsersRecommended(state, allUsers.length, 0),
  );

  useEffect(() => {
    dispatch(loadAllData());
  }, [dispatch]);

  // Возвращает пользователей, подходящих под выбранные фильтры
  const filterUsers = (users: User[]) => {
    return users.filter((user) => {
      const teachSkill = skills.find((skill) => skill.id === user.teachSkillId);

      // Фильтр по типу навыка
      if (selectedType === 'teach' && !teachSkill) {
        return false;
      }

      if (
        selectedType === 'learn' &&
        user.learnSubcategoryIds.length === 0
      ) {
        return false;
      }

      // Фильтр по выбранным навыкам
      if (selectedCategories.length > 0) {
        const hasTeachSkill =
          teachSkill &&
          selectedCategories.includes(teachSkill.subCategoryId);

        const hasLearnSkill = user.learnSubcategoryIds.some((id) =>
          selectedCategories.includes(id),
        );

        if (selectedType === 'teach' && !hasTeachSkill) {
          return false;
        }

        if (selectedType === 'learn' && !hasLearnSkill) {
          return false;
        }

        if (selectedType === 'all' && !hasTeachSkill && !hasLearnSkill) {
          return false;
        }
      }

      // Фильтр по полу
      if (selectedGender !== 'any' && user.sex !== selectedGender) {
        return false;
      }

      // Фильтр по городу
      if (selectedCity && user.city !== selectedCity) {
        return false;
      }

      return true;
    });
  };

  // Фильтруем упорядоченные списки и оставляем нужное количество карточек
  const popularUsers = filterUsers(allPopularUsers).slice(0, 3);
  const newestUsers = filterUsers(allNewestUsers).slice(0, 3);
  const recommendedUsers = filterUsers(allRecommendedUsers).slice(0, 9);

  return (
    <>
      <Header />
      <div className={styles.page}>
        {/* боковая панель с фильтрами */}
        <aside className={styles.filters}>
          <h2 className={styles.filtersTitle}>Фильтры</h2>
          <SkillTypeFilter
            onChange={(value) => {
              dispatch(setType(value));
            }}
          />
          <SkillFilter
            categories={SKILL_CATEGORIES}
            onCategoryChange={() => {}}
            onSubcategoryChange={(subcategoryId) => {
              // Добавляем или убираем выбранную подкатегорию в Redux
              dispatch(toggleCategory(subcategoryId));
            }}
          />
          <GenderFilter
            onChange={(value) => dispatch(setGender(value))}
          />
          <CityFilter
            cities={Cities.map((name) => ({
              id: name,
              name,
            }))}
            onCityChange={(city) => dispatch(setCity(city))}
          />
        </aside>

        <main className={styles.content}>
          <UserCardsSection
            title="Популярное"
            users={popularUsers}
            skills={skills}
            showSeeAllButton
            singleRow
            onSeeAllClick={() => {}}
          />

          <UserCardsSection
            title="Новое"
            users={newestUsers}
            skills={skills}
            showSeeAllButton
            singleRow
            onSeeAllClick={() => {}}
          />

          <UserCardsSection
            title="Рекомендуем"
            users={recommendedUsers}
            skills={skills}
          />
        </main>
      </div>
      <Footer />
    </>
  );
}
