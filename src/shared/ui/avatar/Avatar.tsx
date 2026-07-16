import styles from './avatar.module.css'
interface AvatarProps {
  image: string
  alt?: string
}

export const Avatar = ({ image, alt }: AvatarProps) => {
  return <img src={image} className={styles.avatar} alt={alt ?? "User avatar"} />
}
