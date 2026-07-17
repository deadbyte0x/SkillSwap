import { useAppSelector } from '@/store/hooks.ts'
import { getAllSkills, getUsersPopular } from '@/features/data'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import CatalogWithFilter from '@/widgets/CatalogWithFilter'
import { filterUsers } from '@/shared/lib/helpers.ts'
import { UserCardsSection } from '@/widgets/UserCardsSection'

export default function PopularPage() {
  const popularUsers = useAppSelector(getUsersPopular)
  const skills = useAppSelector(getAllSkills)
  return (
    <>
      <Header />
      <CatalogWithFilter>
        {(filter) => (
          <UserCardsSection
            title="Популярное"
            users={filterUsers(popularUsers, skills, filter)}
            skills={skills}
          />
        )}
      </CatalogWithFilter>
      <Footer />
    </>
  )
}
