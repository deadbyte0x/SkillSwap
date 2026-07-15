import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './CatalogPage.module.css';
import { Header } from '../../widgets/Header';
import { Footer } from '../../widgets/Footer';
import { SkillFilter } from '../../widgets/SkillFilter';
import { CityFilter } from '../../widgets/CityFilter';
import { GenderFilter } from '../../widgets/GenderFilter';
import { SkillTypeFilter } from '../../widgets/SkillTypeFilter';
import { SKILL_CATEGORIES, Cities } from '../../shared/lib/constants';
import { loadAllData, getAllSkills, getUsersNewest, getUsersPopular, getUsersRecommended,} from '../../features/data';
import { UserCardsSection } from '../../widgets/UserCardsSection'

export default function CatalogPage() {
  const dispatch = useAppDispatch();

  const skills = useAppSelector(getAllSkills);

  const popularUsers = useAppSelector((state) =>
    getUsersPopular(state, 3, 0),
  );
  const newestUsers = useAppSelector((state) =>
    getUsersNewest(state, 3, 0),
  );
  const recommendedUsers = useAppSelector((state) =>
    getUsersRecommended(state, 9, 0),
  );

  useEffect(() => {
    dispatch(loadAllData());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className={styles.page}>
        {/* боковая панель с фильтрами */}
        <aside className={styles.filters}>
          <h2 className={styles.filtersTitle}>Фильтры</h2>
          <SkillTypeFilter onChange={() => {}} />
          <SkillFilter
            categories={SKILL_CATEGORIES}
            onCategoryChange={() => {}}
            onSubcategoryChange={() => {}}
          />
          <GenderFilter onChange={() => {}} />
          <CityFilter
            cities={Cities.map((name, i) => ({ id: String(i), name }))}
            onCityChange={() => {}}
          />
        </aside>

        <main className={styles.content}>
          <UserCardsSection
            title="Популярное"
            users={popularUsers}
            skills={skills}
            showSeeAllButton
            onSeeAllClick={() => {}}
          />

          <UserCardsSection
            title="Новое"
            users={newestUsers}
            skills={skills}
            showSeeAllButton
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
