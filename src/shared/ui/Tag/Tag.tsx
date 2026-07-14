import styles from './Tag.module.css';
import clsx from 'clsx'

export type TagCategory = 'foreign-languages' | 'education' | 'health' | 'business-career' | 'art' | 'home-comfort' | 'plus';

interface TagProps {
  category: TagCategory;
  children: React.ReactNode;
}

export const Tag = ({ category, children }: TagProps) => {
  return (
    <div className={clsx(styles.tag, styles[category])}>
      {children}
    </div>
  );
};
