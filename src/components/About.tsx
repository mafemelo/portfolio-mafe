import { useTranslation } from 'react-i18next'
import { PHOTO, TOOLS } from '../data/config'

export default function About() {
  const { t } = useTranslation()
  return (
    <div className="about">
      <figure className="polaroid">
        <span className="tape" aria-hidden="true" />
        {PHOTO ? (
          <img src={PHOTO} alt={t('about.photoAlt')} />
        ) : (
          <div className="ph ph-photo">{t('about.photoPlaceholder')}</div>
        )}
        <figcaption>{t('about.caption')}</figcaption>
      </figure>

      <div className="about-text">
        <h2>{t('about.title')}</h2>
        <p>{t('about.text1')}</p>

        <h3>{t('about.tools')}</h3>
        <ul className="chips">
          {TOOLS.map((tool) => <li key={tool}>{tool}</li>)}
        </ul>
      </div>
    </div>
  )
}