export interface SubCategory {
  id: string
  name: string
  categoryId?: string
}

export interface Category {
  id: string
  name: string
  subCategories: SubCategory[]
}

// ─── Skill ───────────────────────────────────────────────
export type SkillType = 'teach' | 'learn'

export interface Skill {
  type: SkillType
  subCategoryId: string
}

export interface LearnSkill extends Skill {
  type: 'learn'
}

export interface TeachSkill {
  id: string
  title: string
  description: string
  type: 'teach'
  subCategoryId: string
  imageUrls: string[]
  authorId: string
  createdAt: string
}

// ─── User ────────────────────────────────────────────────
export interface User {
  id: string
  name: string
  about: string
  age: number
  sex: 'male' | 'female'
  email: string
  city: string
  avatarUrl: string | null
  createdAt: string
  teachSkillId: string
  learnSubcategoryIds: string[]
}

// ─── Request ─────────────────────────────────────────────
export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'inProgress' | 'done'

export interface SwapRequest {
  id: string
  skillId: string
  fromUserId: string
  toUserId: string
  status: RequestStatus
  createdAt: string
  updatedAt: string
}

// ─── Auth ────────────────────────────────────────────────
export interface AuthUser {
  id: string
  name: string
  email: string
  token: string
}
