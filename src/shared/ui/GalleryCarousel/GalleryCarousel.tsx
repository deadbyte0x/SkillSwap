import { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ChevronRightIcon from '../icons/ChevronRightIcon';
import styles from './GalleryCarousel.module.css';

type GalleryCarouselProps = {
  images: string[];
  // Сколько миниатюр показывать до появления оверлея "+N"
  maxThumbs?: number;
};

export const GalleryCarousel = ({ images, maxThumbs = 3 }: GalleryCarouselProps) => {
  // watchDrag: false — отключаем свайп/drag, навигация только через кнопки и клик по миниатюрам
  // loop: true — карусель зацикленная, после последнего слайда переходит на первый и наоборот
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, watchDrag: false });

  // Переключение на предыдущий/следующий слайд через API Embla
  const goToPrev = () => emblaApi?.scrollPrev();
  const goToNext = () => emblaApi?.scrollNext();
  // Переход к конкретному слайду по клику на миниатюру
  const goToSlide = (index: number) => emblaApi?.scrollTo(index);

  useEffect(() => {
    if (!emblaApi) return;

    // reInit пересчитывает внутреннее состояние карусели при ресайзе/пересборке
    const onReInit = () => emblaApi.reInit();

    emblaApi.on('reInit', onReInit);

    // Отписка от событий при размонтировании, чтобы избежать утечек памяти
    return () => {
      emblaApi.off('reInit', onReInit);
    };
  }, [emblaApi]);

  // Показываем только первые maxThumbs миниатюр, остальные скрываем за оверлеем "+N"
  const visibleThumbs = images.slice(0, maxThumbs);
  const remainingCount = images.length - maxThumbs;

  return (
    <div className={styles.wrapper}>
      {/* Левая часть: главное фото + кнопки навигации */}
      <div className={styles.mainArea}>
        {/* viewport — обязательный элемент Embla, к которому крепится ref */}
        <div className={styles.viewport} ref={emblaRef}>
          {/* container — обёртка слайдов, должен быть flex-контейнером */}
          <div className={styles.container}>
            {images.map((src, index) => (
              <div className={styles.slide} key={index}>
                <img src={src} alt={`Фото ${index + 1}`} className={styles.mainImage} />
              </div>
            ))}
          </div>
        </div>

        {/* Кнопка "назад" — та же иконка ChevronRightIcon, повёрнутая на 180deg через CSS */}
        <button
          type="button"
          className={styles.navButton}
          onClick={goToPrev}
          aria-label="Предыдущий слайд"
        >
          <ChevronRightIcon className={styles.iconPrev} width={16} height={16} />
        </button>

        {/* Кнопка "вперёд" — иконка без поворота */}
        <button
          type="button"
          className={styles.navButton}
          onClick={goToNext}
          aria-label="Следующий слайд"
        >
          <ChevronRightIcon className={styles.iconNext} width={16} height={16} />
        </button>
      </div>

      {/* Правая часть: колонка миниатюр */}
      <div className={styles.thumbs}>
        {visibleThumbs.map((src, index) => {
          // Оверлей "+N" рисуем только на последней видимой миниатюре, если есть скрытые фото
          const isLast = index === maxThumbs - 1 && remainingCount > 0;

          return (
            <button
              type="button"
              key={index}
              className={styles.thumbButton}
              onClick={() => goToSlide(index)}
            >
              <img src={src} alt={`Миниатюра ${index + 1}`} className={styles.thumbImage} />
              {isLast && (
                <span className={styles.thumbOverlay}>+{remainingCount}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};