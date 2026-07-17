// TODO: реализовать страницу SkillPage

import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts'
import {
  getSimilarSkillsBySubcategoryId,
  getSkillById,
  getUserById,
  getUsersByIds,
} from '@/features/data'
import { ROUTES } from '@/shared/lib/constants.ts'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import styles from './SkillPage.module.css'
import { getAgeWord } from '@/shared/lib/helpers.ts'
import { UserTags } from '@/shared/ui/UserTags'
import { SkillCard } from '@/entities/skill/ui/SkillCard'
import { UsersCarousel } from '@/entities/user/ui'
import { Avatar } from '@/shared/ui/avatar'
import { UserCarouselItem } from '@/entities/user/ui/UsersCarousel.tsx'
import { User } from '@/shared/types'
import { selectIsUserLiked, selectUser, toggleFavoriteUser } from '@/features/auth'

export default function SkillPage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const skill = useAppSelector((state) => getSkillById(state, id as string))
  const user = useAppSelector((state) => getUserById(state, skill?.authorId ?? "-1"))
  const similarSkills = useAppSelector((state) =>
    getSimilarSkillsBySubcategoryId(state, skill?.subCategoryId ?? ''),
  ).filter((s) => s.id !== skill?.id)
  const similarUsers = useAppSelector((state) =>
    getUsersByIds(
      state,
      similarSkills.map((s) => s.authorId),
    ),
  )
  const authUser = useAppSelector(selectUser)
  const isLiked = useAppSelector((state) => selectIsUserLiked(state, user?.id || ''))
  const similarItems: UserCarouselItem[] = similarSkills.map((s) => {
    return { teachSkill: s, user: similarUsers.find((u) => u.id === s.authorId) as User }
  })
  if (!skill) {
    return <Navigate to={ROUTES.NOT_FOUND} replace/>
  }
  if (!user) {
    return <Navigate to={ROUTES.ERROR} replace />
  }

  const handleLikeClick = () => {
    if (!authUser) {
      return navigate(ROUTES.LOGIN)
    }

    dispatch(toggleFavoriteUser(user.id))
  }

  return (
    <>
      <Header />
      <div className={styles.body}>
        <main className={styles.main}>
          <div className={styles.userCard}>
            <div className={styles.userFullInfo}>
              <div className={styles.user}>
                {user.avatarUrl ? (
                  <Avatar image={user.avatarUrl} alt={user.name} />
                ) : (
                  <div className={styles.avatarPlaceholder} />
                )}
                <div className={styles.userInfo}>
                  <p className={styles.name}>{user.name}</p>
                  <p className={styles.location}>
                    {user.city}, {user.age} {getAgeWord(user.age)}
                  </p>
                </div>
              </div>
              <p className={styles.about}>{user.about}</p>
            </div>
            <UserTags user={user} teachSkill={skill} style={'skillPage'} />
          </div>
          <SkillCard skill={skill} onFavoriteToggle={handleLikeClick} isFavorite={isLiked}/>
        </main>
        <UsersCarousel items={similarItems} />
      </div>
      <Footer />
    </>
  )
}
