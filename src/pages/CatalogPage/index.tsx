import { useState, useEffect } from 'react';
import styles from './CatalogPage.module.css';
import { Header } from '../../widgets/Header';
import { Footer } from '../../widgets/Footer';
import { SkillFilter } from '../../widgets/SkillFilter';
import { CityFilter } from '../../widgets/CityFilter';
import { GenderFilter } from '../../widgets/GenderFilter';
import { SkillTypeFilter } from '../../widgets/SkillTypeFilter';
import { SKILL_CATEGORIES, Cities } from '../../shared/lib/constants';


export default function CatalogPage() {
  return (
    <>
      <Header />
      <div className={styles.page}>
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
          {/* карточки пользователей будут здесь */}
        </main>
      </div>
      <Footer />
    </>
  );
}
