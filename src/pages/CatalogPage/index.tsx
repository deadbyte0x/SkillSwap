import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './CatalogPage.module.css';
import { Header } from '../../widgets/Header';
import { Footer } from '../../widgets/Footer';
import { SkillFilter } from '../../widgets/SkillFilter';
import { CityFilter } from '../../widgets/CityFilter';
import { GenderFilter } from '../../widgets/GenderFilter';
import { SkillTypeFilter } from '../../widgets/SkillTypeFilter';
import { UserCard } from '../../shared/ui/UserCard';
import { SKILL_CATEGORIES, Cities } from '../../shared/lib/constants';
import { loadAllData } from '../../features/data';
import { ChevronRightIcon } from '@/shared/ui'
import { Button } from '../../shared/ui/Button';

export default function CatalogPage() {
  const dispatch = useAppDispatch();

  const { users, skills } = useAppSelector((state) => state.data);

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
          {/* Секция "Рекомендуем" - все карточки */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Рекомендуем</h2>
              <Button
                variant="tertiary"
                iconRight={<ChevronRightIcon />}
                className={styles.seeAllButton}
                onClick={() => {}}
              >
                Смотреть все
              </Button>
            </div>

            <div className={styles.grid}>
              {users.map((user) => {
                const skill = skills.find((s) => s.id === user.teachSkillId);
                if (!skill) return null;

                return (
                  <UserCard
                    key={user.id}
                    user={user}
                    teachSkill={{ title: skill.title, subCategoryId: skill.subCategoryId }}
                    isLiked={false}
                    onLike={() => {}}
                    onDetailsClick={() => {}}
                  />
                );
              })}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
