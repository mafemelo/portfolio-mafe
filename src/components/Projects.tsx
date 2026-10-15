import { useTranslation } from 'react-i18next'
import { FaGithub } from 'react-icons/fa'
import { PROJECTS } from '../data/config'

export default function Projects() {
  const { t } = useTranslation()
  const items = [...PROJECTS].sort((a, b) => a.year - b.year) 

  return (
    <div>
      <h2>{t('projects.title')}</h2>
      <p className="lead">{t('projects.intro')}</p>

      <ol className="timeline">
        {items.map((p) => {
          const base = `projects.items.${p.id}`
          const badge = t(`${base}.badge`, { defaultValue: '' })
          return (
            <li key={p.id} className="tl-item">
              <span className="tl-year">{p.year}</span>
              <article className="project">
                <div className="frame">
                  {p.image ? (
                    <img src={p.image} alt={t(`${base}.name`)} loading="lazy" />
                  ) : (
                    <div className="ph ph-shot">{t('projects.imagePlaceholder')}</div>
                  )}
                </div>

                <div className="project-info">
                  <h3>{t(`${base}.name`)}</h3>
                  <p className="meta">{t(`${base}.meta`)}</p>
                  <p>{t(`${base}.description`)}</p>
                  {badge && <p className="badge">★ {badge}</p>}

                  <p className="mini">{t('projects.techs')}</p>
                  <ul className="chips">
                    {p.techs.map((x) => <li key={x}>{x}</li>)}
                  </ul>

                  <div className="actions">
                    <a className="btn btn-primary" href={p.repo} target="_blank" rel="noreferrer">
                      <FaGithub aria-hidden="true" /> {t('projects.repo')}
                    </a>
                    {p.demo && (
                      <a className="btn btn-ghost" href={p.demo} target="_blank" rel="noreferrer">
                        {t('projects.demo')} ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
