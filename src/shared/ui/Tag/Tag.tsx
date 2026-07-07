import styles from './Tag.module.css';

interface TagProps {
  category: 'foreign-languages' | 'education' | 'health' | 'business-career' | 'art' | 'home-comfort' | 'plus'; // категория тега
  children: React.ReactNode; // текст тега
}

export const Tag = ({ category, children }: TagProps) => {
  return (
    <div className={`${styles.tag} ${styles[category]}`}>
      {children}
    </div>
  );
};
