import { useAppSelector } from '../../store/hooks';
import { Header } from '../../widgets/Header';
import { Footer } from '../../widgets/Footer';
import { ROUTES } from '../../shared/lib/constants'
import { getAllSkills, getUsersPopular, getUsersNewest, getUsersRecommended, } from '../../features/data';
import { UserCardsSection } from '../../widgets/UserCardsSection'
import { useNavigate } from 'react-router-dom'
import CatalogWithFilter from '@/widgets/CatalogWithFilter'
import { filterUsers } from '@/shared/lib/helpers.ts'
import { useState } from 'react'

export default function CatalogPage() {
  const navigate = useNavigate();

  const skills = useAppSelector(getAllSkills);

  // Получаем всех пользователей в нужном порядке
  const allPopularUsers = useAppSelector(getUsersPopular);
  const allNewestUsers = useAppSelector(getUsersNewest);
  const allRecommendedUsers = useAppSelector(getUsersRecommended);

  const [recommendedCount, setRecommendedCount] = useState(6)

  const handleShowMoreRecommended = () => {
    setRecommendedCount((prev) => prev + 6);
  }


  return (
    <>
      <Header />
      <CatalogWithFilter>
        {(filter) => (
          <>
            <UserCardsSection
              title="Популярное"
              users={filterUsers(allPopularUsers, skills, filter).slice(0, 3)}
              skills={skills}
              showSeeAllButton
              onSeeAllClick={() => {
                navigate(ROUTES.POPULAR)
              }}
            />

            <UserCardsSection
              title="Новое"
              users={filterUsers(allNewestUsers, skills, filter).slice(0, 3)}
              skills={skills}
              showSeeAllButton
              onSeeAllClick={() => {
                navigate(ROUTES.NEW)
              }}
            />

            <UserCardsSection
              title="Рекомендуем"
              users={filterUsers(allRecommendedUsers, skills, filter).slice(0, recommendedCount)}
              skills={skills}
              showMoreButton={recommendedCount < allRecommendedUsers.length}
              onShowMoreClick={handleShowMoreRecommended}
            />
          </>
        )}
      </CatalogWithFilter>
      <Footer />
    </>
  )
}
