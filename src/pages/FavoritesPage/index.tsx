import { useAppSelector } from '@/store/hooks.ts'
import { getAllSkills, getUsersByIds } from '@/features/data'
import { selectUser } from '@/features/auth'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import CatalogWithFilter from '@/widgets/CatalogWithFilter'
import { filterUsers } from '@/shared/lib/helpers.ts'
import { UserCardsSection } from '@/widgets/UserCardsSection'

export default function FavoritesPage() {
  const authUser = useAppSelector(selectUser)
  const favoriteUsers = useAppSelector((state) => getUsersByIds(state, authUser?.favoriteUserIds || []))
  const skills = useAppSelector(getAllSkills)
  return (
    <>
      <Header />
      <CatalogWithFilter>
        {(filter) => (
          <UserCardsSection
            title="Избранное"
            users={filterUsers(favoriteUsers, skills, filter)}
            skills={skills}
          />
        )}
      </CatalogWithFilter>
      <Footer />
    </>
  )
}
