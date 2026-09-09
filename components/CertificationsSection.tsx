'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { sectionText } from '@/lib/sectionI18n';
import { centerPath } from '@/lib/complianceLocale';
const cards = [
 ['IEC 62133-2 Safety Testing','Request safety documentation for the selected rechargeable coin cell model, capacity and version. Public availability requires a matched, reviewed report.','/compliance#battery-documentation'],
 ['UN 38.3 Transport Testing','Request the applicable test report and test summary for the battery version. Shipment requirements also depend on packaging and configuration.','/compliance#battery-documentation'],
 ['EU Battery Regulation','Ask about model-specific heavy-metals testing with reference to Regulation (EU) 2023/1542. Availability and scope must be confirmed.','/compliance#battery-documentation'],
 ['RoHS','Published charger reports reference Directive 2011/65/EU and (EU) 2015/863. Results apply to the tested materials, with the limits and methods stated in each report.','/compliance'],
 ['EMC','EMC test reports and Verification of Conformity are listed for three identified charger designs under Directive 2014/30/EU. Match the sample and report series.','/compliance'],
 ['MSDS / SDS','Request safety data documentation for the selected battery model and version. An SDS is a safety information document, not a product certification.','/compliance#battery-documentation']
];
export default function CertificationsSection() {
  const { lang } = useLanguage();
  return (
    <section id="certifications" className="evidence-home">
      <span className="evidence-eyebrow">{sectionText('MODEL-SPECIFIC DOCUMENTATION', lang)}</span>
      <h2>{sectionText('Compliance and test documentation', lang)}</h2>
      <p>{sectionText('Match the model, configuration and report number before using documentation for procurement. Charger test summaries are published; battery documents are checked against the requested version before release.', lang)}</p>
      <div className="evidence-grid">
        {cards.map(([title, description, href]) => (
          <article className="evidence-card" key={title}>
            <h3>{sectionText(title, lang)}</h3>
            <p>{sectionText(description, lang)}</p>
            <Link href={href.replace('/compliance', centerPath(lang))} className="evidence-link">
              {sectionText('Explore documentation →', lang)}
            </Link>
          </article>
        ))}
      </div>
      <Link className="btn-primary" href={centerPath(lang)}>{sectionText('Explore the Compliance Center →', lang)}</Link>
    </section>
  );
}
