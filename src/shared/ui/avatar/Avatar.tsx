import styles from './avatar.module.css'
interface AvatarProps {
  image: string
}

export const Avatar = ({ image }: AvatarProps) => {
  return <img src={image} className={styles.avatar} />
}
