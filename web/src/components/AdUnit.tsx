import styles from './AdUnit.module.css';

export interface AdUnitProps {
  headline: string;
  domain: string;
  desc: string;
  cta?: string;
  style?: React.CSSProperties;
}

export default function AdUnit({ headline, domain, desc, cta = 'Get Alerts', style }: AdUnitProps) {
  return (
    <div className={styles.wrap} style={style}>
      <div className={styles.inner}>
        <span className={styles.adTag}>Ad</span>
        <div className={styles.body}>
          <div className={styles.headline}>{headline}</div>
          <div className={styles.domain}>{domain}</div>
          <div className={styles.desc}>{desc}</div>
        </div>
        <span className={styles.cta}>{cta}</span>
      </div>
    </div>
  );
}
