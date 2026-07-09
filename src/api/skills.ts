import type { TeachSkill } from '@/shared/types'

const BASE_URL = '/db'

export async function fetchSkills(): Promise<TeachSkill[]> {
  const response = await fetch(`${BASE_URL}/skills.json`)
  if (!response.ok) throw new Error('Failed to fetch skills')
  return response.json()
}

export async function fetchSkillById(id: string): Promise<TeachSkill | undefined> {
  const skills = await fetchSkills()
  return skills.find((skill) => skill.id === id)
}

export async function fetchSkillByUser(userId: string): Promise<TeachSkill | undefined> {
  const skills = await fetchSkills()
  return skills.find((skill) => skill.authorId === userId)
}
