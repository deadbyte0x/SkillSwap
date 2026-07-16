import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { UserCard } from '@/shared/ui/UserCard';
import { User } from '@/shared/types';
import { ChevronRightIcon } from '@/shared/ui/icons';
import styles from './UsersCarousel.module.css';

// один элемент карусели — все данные и хендлеры, которые требует UserCard
export interface UserCarouselItem {
  user: User;
  teachSkill: {
    title: string;
    subCategoryId: string;
  };
  isLiked: boolean;
  onLike: () => void;
  onDetailsClick: () => void;
}

interface UsersCarouselProps {
  items: UserCarouselItem[];
  title?: string; // заголовок секции, по умолчанию "Похожие предложения"
}

export const UsersCarousel = ({ items, title = 'Похожие предложения' }: UsersCarouselProps) => {
  // align: 'start' — карточки прилипают к левому краю при скролле
  // slidesToScroll: 1 — за один клик/свайп скроллим на одну карточку
  // containScroll: 'trimSnaps' — не даёт карусели скроллить дальше последней карточки с пустым хвостом
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  });

  // canScrollPrev изначально false — на старте показана только правая стрелка
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const goToPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const goToNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // пересчитываем флаги при каждой смене активного слайда (select) и при ресайзе/пересборке (reInit)
    const updateButtonsState = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    // стартовое состояние сразу после инициализации карусели
    updateButtonsState();

    emblaApi.on('select', updateButtonsState);
    emblaApi.on('reInit', updateButtonsState);

    // отписка от событий при размонтировании, чтобы избежать утечек памяти
    return () => {
      emblaApi.off('select', updateButtonsState);
      emblaApi.off('reInit', updateButtonsState);
    };
  }, [emblaApi]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.mainArea}>
        {/* viewport — обязательный элемент Embla, к которому крепится ref */}
        <div className={styles.viewport} ref={emblaRef}>
          {/* container — обёртка слайдов, должен быть flex-контейнером */}
          <div className={styles.container}>
            {items.map(({ user, teachSkill, onDetailsClick }) => (
              <div className={styles.slide} key={user.id}>
                <UserCard
                  user={user}
                  teachSkill={teachSkill}
                  onDetailsClick={onDetailsClick}
                />
              </div>
            ))}
          </div>
        </div>

        {/* кнопка "назад" — явный класс navButtonPrev */}
        {canScrollPrev && (
          <button
            type="button"
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            onClick={goToPrev}
            aria-label="Предыдущие карточки"
          >
            <ChevronRightIcon className={styles.iconPrev} width={16} height={16} />
          </button>
        )}

        {/* кнопка "вперёд" — явный класс navButtonNext */}
        {canScrollNext && (
          <button
            type="button"
            className={`${styles.navButton} ${styles.navButtonNext}`}
            onClick={goToNext}
            aria-label="Следующие карточки"
          >
            <ChevronRightIcon className={styles.iconNext} width={16} height={16} />
          </button>
        )}
      </div>
    </section>
  );
};
