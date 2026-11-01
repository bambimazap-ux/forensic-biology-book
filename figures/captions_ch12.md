# Captions for Chapter 12: Fingerprint Comparison, Validity and Automated Identification (AFIS/ABIS)

---

### Figure 12.1 — Ridge detail hierarchy and the ACE-V comparison methodology

- **File**: `Fig12-01_ridge-detail-acev-workflow` (`.png` / `.svg`)
- **Placement**: Section 12.1, immediately following the sentence:
  > *"...The relationship between examiner-marked minutiae and individualization decisions, and the limits of those annotations, is discussed in Section 12.2 [Ule14]."*
- **Caption**:
  **Figure 12.1: Ridge detail hierarchy and the ACE-V comparison methodology.**
  *(A)* The three hierarchical levels of friction-ridge detail: Level 1 (overall ridge flow, pattern orientation, core and delta landmarks; provides anatomical orientation and exclusion value, but cannot individualize a source alone); Level 2 (specific minutiae paths, bifurcations, ridge endings, dots, islands, and their spatial configurations; serves as the primary basis for individualization); and Level 3 (fine morphological features including pores, ridge edge contours, and incipient ridges; clarity-dependent and variable across deposition and recording conditions) [Bec20, Bec22, Mon19].
  *(B)* Latent impression quality and clarity mapping: how deposition dynamics (contact pressure, lateral slippage, angle), partiality, substrate texture, matrix thickness, and development background noise govern visible feature levels; clarity dictates observable detail and demonstrates that feature levels do not form a simple ladder of certainty [Bec20].
  *(C)* The linear ACE-V examination workflow: (1) Analysis (detailed examination and documentation of the questioned latent mark alone, assessing quality, distortion, and clarity prior to exemplar viewing to prevent backward confirmation bias); (2) Comparison (side-by-side search for correspondences and discrepancies across visible ridge paths); (3) Evaluation (formulating a conclusion based on observed detail); and (4) Verification (independent review by a second qualified examiner as an administrative and procedural safeguard against error, not an empirical proof of ground truth) [Dal18, Bec20, Ule14].
  *(D)* Three distinct decision boundaries: mandatory decoupling of (1) which physical features correspond or diverge, (2) whether the available information is sufficient to reach a conclusion, and (3) what source-level conclusion is reported [Ule14]. Examiner feature annotations represent subjective interpretations rather than objective physical ground truth [Ule14]. Simulated data markers indicated by `sim_tag()`.

---

### Figure 12.2 — Scientific validity, empirical error rates, and black/white box studies

- **File**: `Fig12-02_validity-error-rates-blackbox` (`.png` / `.svg`)
- **Placement**: Section 12.2, immediately following the sentence:
  > *"...PCAST limited that finding to prints comparable in quality and completeness to those studied; foundational validity did not establish validity as applied in a specific case or a universal error rate."*
- **Caption**:
  **Figure 12.2: Scientific validity, empirical error rates, and black/white box studies.**
  *(A)* Foundational judicial and scientific scrutiny: the National Research Council (NRC 2009) report establishing that pattern distinctiveness alone does not validate examiners' source conclusions, criticizing ACE-V as broadly specified, and rejecting claims of zero error rate [Cou09]; PCAST (2016) report evaluating empirical black-box studies, judging latent print analysis foundationally valid strictly as a subjective method with measurable, non-zero false positive rates, and limiting validity to prints comparable in quality and completeness to tested samples [Cor16].
  *(B)* The landmark FBI/Noblis black-box study (Ulery et al. 2011): testing 169 practicing examiners across known-mated and difficult non-mated pairs; response categorization into Individualization, Exclusion, Inconclusive, and No Value; critical denominator dependency demonstrating that calculated false positive and false negative rates vary significantly depending on whether denominators include all presentations, value comparisons only, or conclusive calls only [Ule11, Rob24]; inconclusive decisions are not errors [Rob24].
  *(C)* Consistency dimensions (Ulery et al. 2012): repeatability (within-examiner agreement over time on repeated trials) versus reproducibility (between-examiner agreement on identical pairs); substantial inconsistency observed on difficult, borderline, and inconclusive impressions; examiner consensus does not establish ground truth, and rare false positives resist simple repetition [Ule12].
  *(D)* White-box study findings and NGI comparisons: Ulery et al. (2014) demonstrating that marked corresponding minutiae counts track examiner sufficiency decisions, yet feature markup varies widely among examiners, proving that minutiae annotations are subjective visual interpretations rather than objective physical ground truth [Ule14]; Hicklin et al. (2025) testing comparisons returned from FBI NGI searches, showing rare false identifications clustering in specific examiners [Hic25b]; Robson et al. (2024) trial design guidelines regarding case selection, prevalence, response bias, and denominator transparency [Rob24, Bec25]. Simulated data markers indicated by `sim_tag()`.

---

### Figure 12.3 — Statistical and probabilistic models for fingerprint evidence

- **File**: `Fig12-03_statistical-models-frstat-slr` (`.png` / `.svg`)
- **Placement**: Section 12.3, immediately following the sentence:
  > *"...Critical reviews identify gaps in dependence and distortion models, representativeness, goodness-of-fit checks, and the interpretation of numerical outputs [Abr13, Neu20b, Neu20c]."*
- **Caption**:
  **Figure 12.3: Statistical and probabilistic models for fingerprint evidence.**
  *(A)* Spatial minutiae configuration Likelihood Ratios (Neumann et al. 2007, 2012): joint spatial point-process vectors combining general pattern frequencies with relative spatial configuration distances, avoiding naive independence assumptions; modeling within-source variation (finger-pad elasticity and examiner markup variability) against between-source background database distributions [Neu07, Neu12].
  *(B)* Score-Based Likelihood Ratios (SLRs): probability density ratio $LR = f(s\mid H_p) / f(s\mid H_d)$ derived from automated matcher similarity scores $s$ under prosecution ($H_p$) and defense ($H_d$) propositions [Neu20c]; information loss inherent in compressing multidimensional 2D spatial ridge configurations into a 1D scalar score; conditioning requirements ensuring reference training data match case propositions [Neu20c].
  *(C)* The FRStat similarity statistic and critique: Swofford et al. (2018) computing a global similarity score from annotated features and reporting a ratio of error-tail probabilities from mated and non-mated distributions [Swo18b]; Neumann's critique (2020) establishing that error-tail probability ratios are not evidential Likelihood Ratios, fail to model relative evidence densities, and may rely on non-mated reference distributions that do not capture the extreme high-similarity tails encountered in large database searches [Neu20b].
  *(D)* Four essential model validation requirements (Abraham et al. 2013, Neumann 2020): (1) accounting for spatial feature dependence among neighboring ridges; (2) realistic non-linear distortion and examiner markup variability; (3) representative background population databases fitting the alternative proposition; and (4) empirical calibration, goodness-of-fit checks, and explicit statement of model uncertainty [Abr13, Neu20c]. Simulated data markers indicated by `sim_tag()`.

---

### Figure 12.4 — Conclusion scales, evidential strength, and reporting standards

- **File**: `Fig12-04_conclusion-scales-reporting` (`.png` / `.svg`)
- **Placement**: Section 12.4, immediately following the sentence:
  > *"...Reporting should state the comparison’s findings and support in terms justified by the method and its validation."*
- **Caption**:
  **Figure 12.4: Conclusion scales, evidential strength, and reporting standards.**
  *(A)* Comparative conclusion frameworks: traditional three-category scale (Identification, Inconclusive, Exclusion) criticized for compressing evidential nuances, forcing artificial boundaries near thresholds, and implying absolute individualization [Bec20, Bec22]; contrasted with expanded ordinal strength-of-support scales adding graded statements (e.g. support for same source, strong support, inconclusive, support for different source) [Bec20, Car20b].
  *(B)* Empirical decision threshold shifts: experiments by Carter et al. (2020) and Busey et al. (2022) demonstrating that introducing expanded support categories reduces categorical "identification" decisions, with comparisons shifting to "support for common source"; demonstrates that category wording and availability modulate examiners' subjective decision thresholds without altering the underlying physical evidence [Car20b, Bus22].
  *(C)* Probabilistic calibration of examiner conclusions: Ypma (2024) empirical Likelihood Ratios derived from statement frequencies in known same-source and different-source trials (identifications strongly favor same source, exclusions favor different source, and inconclusive calls are not necessarily neutral) [Ypm24]; Morrison (2024) mapping categorical ACE decisions to Bayes factors using beta-binomial calibration modeling [Mor24].
  *(D)* Tripartite reporting separation and ethical standards: mandatory distinction in forensic reports among (1) observed physical ridge correspondences and discrepancies, (2) the examiner's structured categorical conclusion, and (3) any empirically supported measure of evidential strength [Bec20]; absolute prohibition of claims of infallibility, 100% certainty, or zero error rate; source attribution does not establish criminal guilt or activity of deposition [Bec20]. Simulated data markers indicated by `sim_tag()`.

---

### Figure 12.5 — Automated biometrics (AFIS/ABIS), NIST benchmarks, and the examiner–algorithm workflow

- **File**: `Fig12-05_afis-nist-benchmarks-workflow` (`.png` / `.svg`)
- **Placement**: Section 12.6, immediately following the sentence:
  > *"...Preserving the search record and separating retrieval from comparison allow reviewers to examine both the algorithmic hand-off and the human conclusion without conflating them."*
- **Caption**:
  **Figure 12.5: Automated biometrics (AFIS/ABIS), NIST benchmarks, and the examiner–algorithm workflow.**
  *(A)* Operational AFIS/ABIS system architecture: image ingestion, Region of Interest (ROI) segmentation, and automated feature extraction [Sin20c]; Cao & Jain (2017) complementary-template architecture fusing minutiae representations with deep texture and ridge skeleton templates to generate fused candidate rankings [Cao17, Jai11]; latent search challenges (partial area, distortion, background interference) necessitating examiner ROI and markup assistance [Sin20c].
  *(B)* NIST evaluation benchmarks: FpVTE 2003 evaluating 1:1 verification and 1:N identification on large tenprint datasets (not a benchmark for casework latents) [Wil04e]; ELFT Phase II testing automated feature extraction and one-to-many searches on casework latents against tenprint galleries, flagging AFIS-selection bias in casework sets [Ind09]; ELFT-EFS evaluating standardized examiner-marked Extended Feature Sets (EFS) alongside image data [Ind11].
  *(C)* The algorithmic hand-off and score interpretation: an AFIS similarity score is a search ranking metric, NOT a Likelihood Ratio, error probability, or source conclusion [Swo18b, Neu20c, Tay12]; candidate lists represent investigative hand-offs for independent examiner evaluation, not identifications, because large searches frequently return highly similar non-matches [Bec22, Tay12].
  *(D)* Cognitive and contextual bias in AFIS searches: Dror et al. (2012) candidate rank bias (top-ranked candidates receive disproportionate examiner attention, false identifications cluster at high ranks, while lower-ranked true matches risk premature search termination due to search satisfaction) [Dro12b, Tay12]; extraneous contextual bias from non-forensic case information altering examiner decisions (Dror et al. 2006) [Dro06b].
  *(E)* Procedural safeguards and transparency: independent blind verification, technical review, and complete preservation of the reviewable case record (searched image, marked ROI, candidate list, similarity scores, and examiner comparison notes) ensuring algorithmic retrieval remains strictly separated from human comparison [Tay12, Bec22]. Simulated data markers indicated by `sim_tag()`.
