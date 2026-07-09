import { Category } from '@/shared/types'

export const ROUTES = {
  HOME: '/',
  SKILL: '/skill/:id',
  PROFILE: '/profile',
  FAVORITES: '/favorites',
  CREATE: '/create',
  LOGIN: '/login',
  REGISTER: '/register',
} as const

export const SKILL_CATEGORIES: Category[] = [
  {
    id: 'business-career',
    name: 'Бизнес и карьера',
    subCategories: [
      { id: 'team-management', name: 'Управление командой', categoryId: 'business-career' },
      { id: 'marketing', name: 'Маркетинг и реклама', categoryId: 'business-career' },
      { id: 'sales', name: 'Продажи и переговоры', categoryId: 'business-career' },
      { id: 'personal-brand', name: 'Личный бренд', categoryId: 'business-career' },
      { id: 'resume-interview', name: 'Резюме и собеседование', categoryId: 'business-career' },
      { id: 'time-management', name: 'Тайм-менеджмент', categoryId: 'business-career' },
      { id: 'project-management', name: 'Проектное управление', categoryId: 'business-career' },
      { id: 'entrepreneurship', name: 'Предпринимательство', categoryId: 'business-career' },
    ],
  },
  {
    id: 'art',
    name: 'Творчество и искусство',
    subCategories: [
      { id: 'drawing', name: 'Рисование и иллюстрация', categoryId: 'art' },
      { id: 'photography', name: 'Фотография', categoryId: 'art' },
      { id: 'video-editing', name: 'Видеомонтаж', categoryId: 'art' },
      { id: 'music', name: 'Музыка и звук', categoryId: 'art' },
      { id: 'acting', name: 'Актёрское мастерство', categoryId: 'art' },
      { id: 'creative-writing', name: 'Креативное письмо', categoryId: 'art' },
      { id: 'art-therapy', name: 'Арт-терапия', categoryId: 'art' },
      { id: 'decor-diy', name: 'Декор и DIY', categoryId: 'art' },
    ],
  },
  {
    id: 'foreign-languages',
    name: 'Иностранные языки',
    subCategories: [
      { id: 'english', name: 'Английский', categoryId: 'foreign-languages' },
      { id: 'french', name: 'Французский', categoryId: 'foreign-languages' },
      { id: 'spanish', name: 'Испанский', categoryId: 'foreign-languages' },
      { id: 'german', name: 'Немецкий', categoryId: 'foreign-languages' },
      { id: 'chinese', name: 'Китайский', categoryId: 'foreign-languages' },
      { id: 'japanese', name: 'Японский', categoryId: 'foreign-languages' },
      {
        id: 'exam-prep',
        name: 'Подготовка к экзаменам (IELTS, TOEFL)',
        categoryId: 'foreign-languages',
      },
    ],
  },
  {
    id: 'education',
    name: 'Образование и развитие',
    subCategories: [
      { id: 'personal-development', name: 'Личностное развитие', categoryId: 'education' },
      { id: 'learning-skills', name: 'Навыки обучения', categoryId: 'education' },
      { id: 'cognitive-techniques', name: 'Когнитивные техники', categoryId: 'education' },
      { id: 'speed-reading', name: 'Скорочтение', categoryId: 'education' },
      { id: 'teaching-skills', name: 'Навыки преподавания', categoryId: 'education' },
      { id: 'coaching', name: 'Коучинг', categoryId: 'education' },
    ],
  },
  {
    id: 'home-comfort',
    name: 'Дом и уют',
    subCategories: [
      { id: 'cleaning-organization', name: 'Уборка и организация', categoryId: 'home-comfort' },
      { id: 'home-finance', name: 'Домашние финансы', categoryId: 'home-comfort' },
      { id: 'cooking', name: 'Приготовление еды', categoryId: 'home-comfort' },
      { id: 'houseplants', name: 'Домашние растения', categoryId: 'home-comfort' },
      { id: 'home-repair', name: 'Ремонт', categoryId: 'home-comfort' },
      { id: 'storage', name: 'Хранение вещей', categoryId: 'home-comfort' },
    ],
  },
  {
    id: 'health',
    name: 'Здоровье и лайфстайл',
    subCategories: [
      { id: 'yoga-meditation', name: 'Йога и медитация', categoryId: 'health' },
      { id: 'nutrition', name: 'Питание и ЗОЖ', categoryId: 'health' },
      { id: 'mental-health', name: 'Ментальное здоровье', categoryId: 'health' },
      { id: 'mindfulness', name: 'Осознанность', categoryId: 'health' },
      { id: 'fitness', name: 'Физические тренировки', categoryId: 'health' },
      { id: 'sleep-recovery', name: 'Сон и восстановление', categoryId: 'health' },
      { id: 'work-life-balance', name: 'Баланс жизни и работы', categoryId: 'health' },
    ],
  },
]

// Города численностью > 500тыс
export const Cities = [
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Екатеринбург',
  'Казань',
  'Красноярск',
  'Нижний Новгород ',
  'Челябинск',
  'Уфа',
  'Краснодар',
  'Самара',
  'Ростов-на-Дону',
  'Омск',
  'Воронеж',
  'Пермь',
  'Волгоград',
  'Саратов',
  'Тюмень',
  'Тольятти',
  'Махачкала',
  'Барнаул',
  'Ижевск',
  'Хабаровск',
  'Ульяновск',
  'Иркутск',
  'Владивосток',
  'Ярославль',
  'Ставрополь',
  'Севастополь',
  'Набережные Челны',
  'Томск',
  'Балашиха',
  'Кемерово',
  'Оренбург',
  'Новокузнецк',
  'Рязань',
]

export const CATEGORY_BY_ID = new Map(SKILL_CATEGORIES.map((c) => [c.id, c] as const))

export const SUBCATEGORY_BY_ID = new Map(
  SKILL_CATEGORIES.flatMap((c) => c.subCategories.map((s) => [s.id, s] as const)),
)


export const LOCAL_STORAGE_KEYS = {
  AUTH_USER: 'skillswap_auth_user',
  FAVORITES: 'skillswap_favorites',
  REQUESTS: 'skillswap_requests',
  THEME: 'skillswap_theme',
} as const
