import { useTranslation } from 'react-i18next'

type Job = { org: string; role: string; period: string; description: string }
type Course = { org: string; role: string; period: string }

export default function Experience() {
  const { t } = useTranslation()
  const jobs = t('experience.items', { returnObjects: true }) as Job[]
  const courses = t('experience.courses', { returnObjects: true }) as Course[]

  return (
    <div className="exp">
      <section className="paper">
        <span className="tape" aria-hidden="true" />
        <h2>{t('experience.title')}</h2>
        {jobs.map((j) => (
          <article key={j.org} className="job">
            <p className="current"><span className="dot" aria-hidden="true" />{t('experience.current')}</p>
            <h3>{j.role}</h3>
            <p className="org">{j.org}</p>
            <p className="period">{j.period}</p>
            <p>{j.description}</p>
          </article>
        ))}
      </section>

      <section className="paper paper-alt">
        <span className="tape" aria-hidden="true" />
        <h2>{t('experience.education')}</h2>
        <ul className="edu">
          {courses.map((c) => (
            <li key={c.org}>
              <p className="period">{c.period}</p>
              <h3>{c.role}</h3>
              <p className="org">{c.org}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
