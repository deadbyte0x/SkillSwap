import { useAppSelector } from '@/store/hooks.ts'
import { getAllSkills, getUsersNewest } from '@/features/data'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import CatalogWithFilter from '@/widgets/CatalogWithFilter'
import { filterUsers } from '@/shared/lib/helpers.ts'
import { UserCardsSection } from '@/widgets/UserCardsSection'

export default function NewUsersPage() {
  const newestUsers = useAppSelector(getUsersNewest)
  const skills = useAppSelector(getAllSkills)
  return (
    <>
      <Header />
      <CatalogWithFilter>
        {(filter) => (
          <UserCardsSection
            title="Новое"
            users={filterUsers(newestUsers, skills, filter)}
            skills={skills}
          />
        )}
      </CatalogWithFilter>
      <Footer />
    </>
  )
}
