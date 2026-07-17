import { Header } from '@/widgets/Header'
import { Avatar } from '@/shared/ui/avatar'
import styles from './AboutPage.module.css'
import { Button } from '@/shared/ui/Button'

export default function AboutPage() {
  const contributors = [
    {
      name: 'Игорь',
      githubUrl:
        'https://github.com/PM-YandexPracticum/SkillSwap_51_4/pulls?q=is%3Apr+author%3AMasstran+is%3Aclosed',
      nickname: 'masstran',
      avatarUrl: 'https://avatars.githubusercontent.com/u/15689794?v=4',
    },
    {
      name: 'Алексей',
      githubUrl:
        'https://github.com/PM-YandexPracticum/SkillSwap_51_4/pulls?q=is%3Apr+is%3Aclosed+author%3Aalex-tech-88',
      nickname: 'alex-tech-88',
      avatarUrl: 'https://avatars.githubusercontent.com/u/228716167?v=4',
    },
    {
      name: 'Каролина',
      githubUrl:
        'https://github.com/PM-YandexPracticum/SkillSwap_51_4/pulls?q=is%3Apr+is%3Aclosed+author%3AKer-r',
      nickname: 'Ker-r',
      avatarUrl: 'https://avatars.githubusercontent.com/u/95733096?v=4',
    },
    {
      name: 'Руслан',
      githubUrl:
        'https://github.com/PM-YandexPracticum/SkillSwap_51_4/pulls?q=is%3Apr+is%3Aclosed+author%3Adeadbyte0x',
      nickname: 'deadbyte0x',
      avatarUrl: 'https://avatars.githubusercontent.com/u/213792721?v=4',
    },
    {
      name: 'Игорь',
      githubUrl:
        'https://github.com/PM-YandexPracticum/SkillSwap_51_4/pulls?q=is%3Apr+is%3Aclosed+author%3Aplayer1202',
      nickname: 'player1202',
      avatarUrl: 'https://avatars.githubusercontent.com/u/74718891?v=4',
    },
  ]
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Над проектом работали</h1>
        <div className={styles.body}>
          {contributors.map((c) => (
            <div key={c.name} className={styles.user}>
              <Avatar
                image={c.avatarUrl}
                alt={c.name}
              />
              <p className={styles.name}>{c.name}</p>
              <Button onClick={() => window.open(c.githubUrl, "_blank")} className={styles.location}>{c.nickname}</Button>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
