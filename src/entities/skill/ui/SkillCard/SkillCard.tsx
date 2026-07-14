import type { TeachSkill } from '@/shared/types'
import { Button } from '@/shared/ui/Button'
import { GalleryCarousel } from '@/shared/ui/GalleryCarousel'
import { LikeButton } from '@/shared/ui/LikeButton'
import { ShareIcon, MoreSquareIcon } from '@/shared/ui/icons'
import { SkillInfo } from '../SkillInfo/SkillInfo'
import styles from './SkillCard.module.css'

interface SkillCardProps {
  skill: TeachSkill
  isFavorite?: boolean
  onFavoriteToggle?: () => void
  onShare?: () => void
  onMoreClick?: () => void
  onRequestSwap?: () => void
}

export function SkillCard({
  skill,
  isFavorite = false,
  onFavoriteToggle,
  onShare,
  onMoreClick,
  onRequestSwap,
}: SkillCardProps) {
  return (
    <div className={styles.root}>
      <div className={styles.actions}>
        <LikeButton isActive={isFavorite} onClick={onFavoriteToggle} />
        <button className={styles.actionButton} onClick={onShare} aria-label="Поделиться">
          <ShareIcon />
        </button>
        <button className={styles.actionButton} onClick={onMoreClick} aria-label="Ещё">
          <MoreSquareIcon />
        </button>
      </div>

      <div className={styles.left}>
        <SkillInfo skill={skill} />
        <Button onClick={onRequestSwap}>Предложить обмен</Button>
      </div>

      <div className={styles.right}>
        <GalleryCarousel images={skill.imageUrls} />
      </div>
    </div>
  )
}
