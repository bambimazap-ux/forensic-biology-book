# Captions for Chapter 8: Biogeographical Ancestry and Forensic DNA Intelligence

This document contains the captions, textual placement anchors, and source attributions for all figures in Chapter 8 ("Biogeographical Ancestry and Forensic DNA Intelligence"). Every anchor quotes verbatim the end of a sentence in `טקסט פרקים/Chapter 08 Biogeographical Ancestry and Forensic DNA Intelligence – full.md`.

---

### Figure 8.1

- **File**: `Fig08-01_clines-clusters-admixture.png` / `Fig08-01_clines-clusters-admixture.svg`
- **Script**: `Fig08-01_clines-clusters-admixture.py`
- **Width**: Full text width (`FULL_W`, 16.0 cm)
- **Placement anchor**: Section 8.1, immediately following:
  > "...The interpretation therefore remains bounded by the reference data and the model’s fit [Tve22, Law18]."
- **Caption**:
  > **Figure 8.1. Population structure, geographic clines versus discrete clusters, and admixture interpretation.** (A) Continuous clines versus discrete clusters: human allele frequencies vary continuously across geographic space through isolation-by-distance, whereas artificial clusters arise from uneven geographic sampling gaps; cluster boundaries represent model-dependent statistical partitions rather than natural biological categories [Ser04, Ros05]. (B) Model-based clustering principles: STRUCTURE uses Bayesian MCMC and ADMIXTURE uses maximum-likelihood estimation to infer cluster allele frequencies ($P$) and individual ancestry coefficients ($Q$), conditional on cluster number $K$ and assumptions of Hardy–Weinberg equilibrium and linkage equilibrium within clusters [Pri00c, Ale09]. (C) The admixture fallacy (Lawson tutorial): stacked bar plots represent genetic contributions relative to sampled clusters, not a person's literal pedigree or recent migrations; three entirely distinct demographic histories—(1) recent parental admixture, (2) ancient divergence with intermediate genetic drift, and (3) an unsampled geographic cline—produce the identical 50/50 admixture bar plot [Law18]. (D) Foundational forensic evidentiary principle: BGA inference provides an intelligence lead to narrow follow-up, conditional on represented reference groups; it does not establish identity, race, social identity, birthplace, culture, or individualize a suspect, and requires independent autosomal STR corroboration before operational action [Job22, Tve22]. Simulated data for illustration. Source: Original illustration based on [Job22, Tve22, Ser04, Pri00c, Ros05, Law18, Ale09].

---

### Figure 8.2

- **File**: `Fig08-02_aims-metrics-panel-design.png` / `Fig08-02_aims-metrics-panel-design.svg`
- **Script**: `Fig08-02_aims-metrics-panel-design.py`
- **Width**: Full text width (`FULL_W`, 16.0 cm)
- **Placement anchor**: Section 8.2, immediately following:
  > "...Even a panel evaluated across diverse samples may be intended only as a first-tier tool for broad regions, with finer resolution requiring better-targeted markers and sampling [Kid14]."
- **Caption**:
  > **Figure 8.2. Ancestry-informative markers (AIMs), informativeness metrics, and panel engineering.** (A) Quantitative informativeness metrics: pairwise allele-frequency difference ($\delta = |p_1 - p_2|$) captures pairwise contrast but misses multi-group dynamics; Rosenberg’s informativeness for assignment ($I_n$) measures expected Shannon entropy reduction across multi-group panels [Ros03]; Fisher information quantifies the curvature of the likelihood surface and dictates the asymptotic precision of estimated ancestry fractions [Pfa04]; Wright’s fixation index ($F_{ST}$) partitions variance among subgroups [Ros03]; effective allele number ($A_e$) reflects multi-allelic polymorphism rather than between-group discrimination [Che19e]; population-specific divergence (PSD) and cumulative PSD balance global panel representation to avoid regional bias [Phi14]. (B) Panel engineering and marker classes: balanced panel designs (EUROFORGEN Global AIM-SNP) select complementary markers to balance continental versus regional resolution, yet no panel can compensate for omitted or unrepresented reference populations [Phi14, Kid14]; bi-allelic SNPs feature low mutation rates and short amplicons but capped heterozygosity ($H \le 0.5$), whereas microhaplotypes combine multiple linked SNPs with zero stutter, providing high $I_n$ for resolving admixed DNA mixtures [Che19e]. (C) MPS multiplex integration and the inferential firewall: unified MPS systems (ForenSeq, MAPlex, VISAGE) co-amplify identity STRs, AIMs, and EVCs in a single library [Phi19, del21, Rui23], but co-amplification does not make inferences interchangeable—identity STRs individualize, AIMs yield population probabilities, and EVCs predict physical traits under separate legal standards [Ter24, Kay23]. Source: Original illustration based on [Ros03, Che19e, Pfa04, Phi14, Kid14, Ter24, Kay23, Phi19, del21, Rui23].

---

### Figure 8.3

- **File**: `Fig08-03_assignment-pca-outlier-testing.png` / `Fig08-03_assignment-pca-outlier-testing.svg`
- **Script**: `Fig08-03_assignment-pca-outlier-testing.py`
- **Width**: Full text width (`FULL_W`, 16.0 cm)
- **Placement anchor**: Section 8.3, immediately following:
  > "...Reporting should distinguish a visualization or cluster membership from classification against named references, state when several groups remain plausible, and permit a finding of poor fit rather than forcing a label [Tve22, Mog19, Kay23]."
- **Caption**:
  > **Figure 8.3. Statistical assignment methods, dimensionality reduction, and outlier/rejection testing.** (A) Statistical classification: likelihood ratio ranking evaluates candidate references by likelihood $Pr(\text{Profile} \mid \text{Pop}_k)$, while Bayesian classification computes posterior probabilities across evaluated groups under a closed-world assumption that ignores unrepresented populations [Tve22, Mog19]. (B) Dimensionality reduction versus classification: Principal Component Analysis (PCA) summarizes high-dimensional variance along orthogonal axes; PCA coordinates represent relative geometric spatial positions rather than posterior probabilities of individual origin, and 2D visual proximity does not establish cluster membership [Tve22, Kay23]. (C) Outlier and rejection testing (GenoGeographer framework): naïve maximum-likelihood ranking forces an assignment to the highest-likelihood candidate even when absolute likelihood is near zero, creating severe false-positive misclassification risks when the true source group is omitted [Mog19]; the GenoGeographer z-score rejection test assesses absolute goodness of fit against simulated reference distributions, permitting the system to report 'unassigned' when candidate groups fit poorly [Mog19], with hierarchical continental grouping reducing false calls [Jin18]. (D) Operational uncertainty and reporting standards: admixed profiles display substantial variance across marker sets [Per20]; degraded traces require validated missing-data protocols [Mog19]; reports must permit a finding of poor fit rather than forcing an unwarranted label, stating all plausible candidate groups transparently [Tve22, Mog19, Kay23]. Source: Original illustration based on [Tve22, Mog19, Kay23, Jin18, Per20].

---

### Figure 8.4

- **File**: `Fig08-04_fdp-hirisplex-performance-metrics.png` / `Fig08-04_fdp-hirisplex-performance-metrics.svg`
- **Script**: `Fig08-04_fdp-hirisplex-performance-metrics.py`
- **Width**: Full text width (`FULL_W`, 16.0 cm)
- **Placement anchor**: Section 8.5, immediately following:
  > "...These results may help narrow an investigative field, but they cannot identify anyone or warrant treating a category probability as a description of one individual."
- **Caption**:
  > **Figure 8.4. Forensic DNA phenotyping: continuous traits, prediction metrics (AUC, PPV, NPV), and probability vectors.** (A) FDP multiplexes and trait binning: standardized systems—IrisPlex (6 eye-colour SNPs) [Wal13], HIrisPlex (24 eye/hair SNPs) [Wal13], and HIrisPlex-S (41 eye/hair/skin SNPs) [Cha18]—bin continuous melanin variation into discrete reporting categories, subject to non-genetic modifiers such as ageing and solar exposure [Ter24]. (B) ROC discrimination across categories: receiver operating characteristic curves illustrate high discrimination for extreme categories (blue/brown eyes, AUC $\approx 0.95$) versus lower discrimination for intermediate shades (intermediate eyes, AUC $\approx 0.74$) across calling thresholds [Sch19]; crucially, AUC reflects category ranking capacity across thresholds, not percentage accuracy and not the probability that an individual possesses the trait [Sch19]. (C) Prevalence and the intermediate eye colour dilemma: positive and negative predictive values (PPV/NPV) depend heavily on base population prevalence; for intermediate eye colour (prevalence $\approx 10\%$, AUC = 0.74), PPV is near 0.09 (91% of positive calls are false) while NPV is near 0.96, demonstrating that positive predictions in low-prevalence categories are overwhelmingly false [Sch19]. (D) Mandatory probability vector reporting: forensic reports must present full probability vectors (e.g. 0.45 blue, 0.40 intermediate, 0.15 brown) rather than isolating a leading category, which conceals that there is a 55% combined chance the eyes are not blue [Cha18, Sch19]; category probabilities must never be reported as settled personal descriptions [Ter24]. (E) Evidentiary principles: FDP provides an intelligence lead to prioritize enquiries, never evidence of identity, cannot individualize any person, and mandates independent confirmation by autosomal STR profile comparison [Ter24, Sch19, Wal13]. Simulated data for illustration. Source: Original illustration based on [Wal13, Cha18, Ter24, Sch19].

---

### Figure 8.5

- **File**: `Fig08-05_intelligence-framework-case-governance.png` / `Fig08-05_intelligence-framework-case-governance.svg`
- **Script**: `Fig08-05_intelligence-framework-case-governance.py`
- **Width**: Full text width (`FULL_W`, 16.0 cm)
- **Placement anchor**: Section 8.7, immediately following:
  > "...BGA and EVC predictions are investigative leads, never evidence of identity and never a basis for individualization [Pou26, Scu19c, Scu18]."
- **Caption**:
  > **Figure 8.5. Investigative intelligence framework, casework case studies, and governance standards.** (A) Scudder four-stage intelligence-cycle pipeline: (1) define investigative question and target population scope, (2) synthesize genetic lead with collateral police intelligence (witnesses, CCTV, geography) to avoid investigative silos, (3) frame uncertainty transparently by communicating complete probability vectors and reference database limits to prevent false precision, and (4) require mandatory independent autosomal STR profile corroboration before coercive executive action [Scu19c]. (B) Casework lessons on false precision: in Operation Minstead (Delroy Grant), premature BGA over-specificity suggested a narrow Caribbean (Trinidadian) origin, misdirecting police resources across islands before subsequent analysis showed broad African/European admixture without advancing the investigation [Phi26]; in the EDNAP collaborative exercise, laboratories converged on unadmixed samples but diverged on complex admixed cases, with some analysts improperly using predicted skin tone to justify ancestry claims [Die26b]. (C) Governance standards, PIAs, and evidentiary boundaries: statutory Privacy Impact Assessments (PIAs) enforce necessity, proportionality, and purpose limitation, restricting BGA to serious crimes and prohibiting medical/health profiling or secondary data use [Scu18]; governance safeguards mitigate minority stigmatization, cognitive confirmation bias, and police tunnel vision during suspect prioritization [Wie18, Zie22]; cardinal forensic law dictates that BGA and FDP are strictly intelligence leads, never admissible evidence of identity, and can never individualize any person without autonomous autosomal STR matching [Pou26, Scu18]. Source: Original illustration based on [Scu19c, Phi26, Die26b, Scu18, Wie18, Zie22, Pou26].