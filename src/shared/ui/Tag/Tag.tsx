import styles from './Tag.module.css';

export type TagCategory = 'foreign-languages' | 'education' | 'health' | 'business-career' | 'art' | 'home-comfort' | 'plus';

interface TagProps {
  category: TagCategory;
  children: React.ReactNode;
}

export const Tag = ({ category, children }: TagProps) => {
  return (
    <div className={`${styles.tag} ${styles[category]}`}>
      {children}
    </div>
  );
};
