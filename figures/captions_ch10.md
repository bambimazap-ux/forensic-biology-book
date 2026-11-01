# Captions for Chapter 10: Forensic Investigative Genetic Genealogy (FIGG)

---

### Figure 10.1 — Forensic SNP profiling technologies, data quality assessment, and harmonisation for FIGG

- **File**: `Fig10-01_snp-technologies-data-quality` (`.png` / `.svg`)
- **Placement**: Section 10.1, immediately following the sentence:
  > *"...Missing or erroneous calls can disrupt later comparisons, so a nominal marker count alone does not establish that a profile is reliable [Kli21, Vri21]."*
- **Caption**:
  **Figure 10.1: Forensic SNP profiling technologies, data quality assessment, and harmonisation for FIGG.**
  *(A)* Architectural contrast between routine forensic STR profiling (20–24 localized loci with discrete repeat-length alleles used for direct individual identification via national criminal DNA databases) and dense genome-wide SNP data ($\ge 500{,}000$ broadly distributed biallelic loci) required for detecting extended identity-by-descent (IBD) kinship tracts [Kli21, But12].
  *(B)* Analytical platforms applied to compromised casework evidence: (1) SNP microarrays (high throughput across fixed predefined sets of loci; compromised traces with $<1\text{ ng}$ DNA and severe fragmentation suffer precipitous call-rate collapse and distorted kinship classification) [Vri21]; (2) Whole-genome sequencing (WGS; library-based sequencing of short fragments bypassing per-locus design, but demanding bioinformatic variant calling and sequencing depth) [Kli21, Til21]; and (3) Targeted MPS and hybridization capture (e.g. ForenSeq Kintelligence, FORCE panel; enriching specific kinship SNPs from degraded skeletal remains where STRs fail) [Til18, Gor20, Wat25].
  *(C)* Forensic bioinformatic curation and harmonisation pipeline: raw data ingestion $\rightarrow$ empirical quality gating (call rate, concordance $>99\%$, read support, allelic balance) [Vri21] $\rightarrow$ cross-platform marker overlap filtering and genotype imputation using reference panels with residual uncertainty [Kli21] $\rightarrow$ receiving platform file formatting (e.g. GEDmatch / FamilyTreeDNA specifications).
  *(D)* Foundational technical principle: a nominal marker count alone does not establish reliability; compromised forensic traces demand empirical quality gating before upload, as erroneous calls break true IBD segments and create false kinship leads [Kli21, Vri21]. Simulated data markers indicated by `sim_tag()`.

---

### Figure 10.2 — Identity by descent (IBD), centimorgan metrics, and kinship classification limits

- **File**: `Fig10-02_ibd-centimorgans-kinship-limits` (`.png` / `.svg`)
- **Placement**: Section 10.2, immediately following the sentence:
  > *"...Database reports therefore provide an estimated range of relationships, not a definitive family relationship [Kli21, Gue21]."*
- **Caption**:
  **Figure 10.2: Identity by descent (IBD), centimorgan metrics, and kinship classification limits.**
  *(A)* Biological mechanism of IBD: meiotic crossing-over and homologous chromosomal recombination across successive generations (ancestors $\rightarrow$ children $\rightarrow$ grandchildren $\rightarrow$ great-grandchildren), showing progressive fragmentation of ancestral chromosome blocks into discrete shared IBD segments [Kli21, Huf11].
  *(B)* Centimorgan (cM) metrics and ERSA algorithm: definition of cM as a genetic map unit ($1\text{ cM} \approx 1\%$ recombination probability per meiosis; $\sim 1\text{ Mb}$ average; $\sim 3{,}500\text{ cM}$ autosomal total); contrast between aggregate total shared cM and individual segment length distributions; ERSA maximum likelihood framework jointly modeling segment counts and lengths to bypass the limitations of naive total-cM summing [Huf11, Kli21].
  *(C)* Overlapping kinship distributions and distant kinship drop-off: continuous overlapping probability density distributions of shared cM across 1st cousins (1C, expected ~874 cM), 1st cousins once removed (1C1R, ~437 cM), 2nd cousins (2C, ~229 cM), and 3rd cousins (3C, ~73 cM) [Huf11, Kli19]; zero-IBD drop-off bar chart detailing the biological reality that true genealogical relatives frequently share zero detectable IBD segments (~10% of 3rd cousins, ~50% of 4th cousins, and >85% of 5th cousins share 0 cM) [Huf11, Kli19].
  *(D)* Technical and demographic confounders: genotyping drop-out breaking segments, imputation noise creating false bridges, population endogamy / pedigree collapse inflating background IBD, and consumer database ancestral representation biases [Huf11, Erl18, Kli21].
  *(E)* Cardinal forensic reporting rule: database reports provide an estimated range of relationships, never a definitive family relationship, because inheritance and recombination are stochastic and preclude unique pedigree assignment from DNA alone [Kli21, Gue21]. Simulated data markers indicated by `sim_tag()`.

---

### Figure 10.3 — Family-tree construction, reverse triangulation, and investigative lead generation

- **File**: `Fig10-03_tree-construction-triangulation-leads` (`.png` / `.svg`)
- **Placement**: Section 10.3, immediately following the sentence:
  > *"...The aim is to find intersections among lines associated with separate match clusters and identify a family or branch consistent with the genetic and documentary evidence—not to infer an individual’s identity from a match label alone [Kli21, Gre19]."*
- **Caption**:
  **Figure 10.3: Family-tree construction, reverse triangulation, and investigative lead generation.**
  *(A)* Shared-match clustering: in-common-with (ICW) match matrix grouping database matches (M1–M6) into distinct ancestral clusters representing maternal lines (Cluster 1: M1–M3) and paternal lines (Cluster 2: M4–M6); zero cross-cluster sharing confirms independent lineages targeting separate ancestral couples [Kli21, Gre19].
  *(B)* Ascendancy research: tracing match family pedigrees backward generation by generation through primary historical documentary sources (civil vital registrations, censuses, church records, obituaries) to identify candidate Most Recent Common Ancestor (MRCA) couples [Kli21, Gre19, Kat20].
  *(C)* Descendancy research and reverse triangulation: tracing lines forward in time from MRCA Couple 1 (maternal) and MRCA Couple 2 (paternal) to identify branch intersections (target marriage between descendants of both clusters), narrowing candidate contributors to a specific candidate sibship [Kli21, Gre19, Ert22].
  *(D)* Pedigree disruptions and the Ertürk decision model: real-world divergences between biological and documentary genealogies (non-paternity events [NPE], unrecorded adoptions, missing archival records, endogamy) [Kat20]; Ertürk mathematical decision model balancing the probability of locating an intersection against exponential tree size and workload explosion [Ert22].
  *(E)* Foundational genealogical principle: a genealogical tree is an iterative, revisable hypothesis, not a definitive identification; reverse triangulation narrows investigative attention to a family, while direct confirmatory STR testing is strictly required before any source attribution [Kli21, Gre19]. Simulated data markers indicated by `sim_tag()`.

---

### Figure 10.4 — Operational casework architecture, landmark cases, and direct STR confirmation

- **File**: `Fig10-04_casework-architecture-landmark-cases` (`.png` / `.svg`)
- **Placement**: Section 10.4, immediately following the sentence:
  > *"...The family-tree work identified candidates for testing, while the STR comparison established which tested brother’s DNA corresponded to the evidentiary profile."*
- **Caption**:
  **Figure 10.4: Operational casework architecture, landmark cases, and direct STR confirmation.**
  *(A)* End-to-end operational FIGG casework pipeline across four sequential phases: (1) Lead exhaustion (routine STR profiling and uninformative CODIS search; eligibility gating under serious violent crime criteria); (2) Dense SNP data generation and upload (microarray / WGS / capture bioinformatic gating and permitted law-enforcement database matching); (3) Genealogy research and lead generation (IBD matching, ICW clustering, ascendancy to MRCAs, descendancy forward, and reverse triangulation to a candidate sibship); and (4) Confirmatory STR attribution (traditional police investigation, reference DNA collection via discarded items or consensual/warrant swabs, and autonomous confirmatory STR comparison) [Gue21, Til21, Wic25].
  *(B)* Landmark operational casework studies: (1) Golden State Killer investigation (DeAngelo case; 40-year cold case, distant relative match on GEDmatch $\rightarrow$ extensive tree building back to 1800s MRCAs $\rightarrow$ covert discarded-item DNA collection $\rightarrow$ direct confirmatory STR match) [Gue18, Phi18]; and (2) Linköping Swedish double-murder investigation (16-year cold case, degraded blood trace sequencing and imputation $\rightarrow$ genealogy narrowing to two brothers $\rightarrow$ reference STR swabs confirming the perpetrator) [Til21].
  *(C)* Dual casework application domains (cold-case violent crimes vs unidentified human remains / UHR) [Gre19, Dow22, Gre24]; the reporting denominator dilemma: public compilations document confirmed successes but omit undisclosed, abandoned, and failed attempts, precluding calculation of valid overall success rates [Dow22, Gre24].
  *(D)* Cardinal evidentiary firewall: FIGG produces an investigative lead, never proof of identity or guilt; arrest, prosecution, and identification require autonomous direct STR comparison, and source correspondence does not establish guilt or the activity that deposited the DNA [Gue21, Til21, Wic25]. Simulated data markers indicated by `sim_tag()`.

---

### Figure 10.5 — Relational genetic privacy, population identifiability, database security, and program governance

- **File**: `Fig10-05_relational-privacy-governance-security` (`.png` / `.svg`)
- **Placement**: Section 10.6, immediately following the sentence:
  > *"...Platform permission is not legal authorization, and a user’s setting is not consent on behalf of affected relatives [Scu19b, Ske20]."*
- **Caption**:
  **Figure 10.5: Relational genetic privacy, population identifiability, database security, and program governance.**
  *(A)* The relational privacy paradox: a single participant's database upload creates genetic visibility for hundreds of non-participating relatives (~850 identifiable 1st to 3rd cousins), reaching across branches and generations; individual consent cannot bind or authorize surveillance over relatives who never opted into genealogy services [Ram18, Scu19b].
  *(B)* Erlich population identifiability model and demographic filtering: mathematical relationship between genealogy database size and relative match probability ($\ge 60\%$ for 3rd cousins with 1M profiles; $\ge 90\%$ with 3M profiles in European populations) [Erl18]; demographic narrowing funnel showing how combining genetic matches with basic non-genetic clues (region within 100 miles, age bracket within 5 years, sex) narrows candidate pools from ~500 to 1–2 individuals [Erl18]; ancestral disparities reflecting commercial database bias toward European lineages [Erl18, Kat20].
  *(C)* Database security and upload attack vectors: Edge & Coop models of synthetic genotype uploads exploiting segment reporting thresholds (IBS tiling to reconstruct entire genomes of non-consenting participants; phase probing to infer unobserved heterozygous alleles) [Edg19].
  *(D)* Statutory governance standards and social legitimacy: comparing the 2019 DOJ Interim Policy with the NTVIC 2023/2025 guidelines (FIGG Responsible Authority, necessity and proportionality review, laboratory accreditation, and mandatory prompt destruction of third-party reference samples upon case closure) [Gue21, Wic23, Wic25]; public attitude gradients showing strong support for violent cold cases (>85%) but sharp drops for non-violent crimes or medical research databases, and widespread demand for explicit opt-in consent [Gue25, Dah24, Gue25b].
  *(E)* Cardinal governance principle: platform permission is not legal authorization, and a user's setting is not consent on behalf of affected relatives; FIGG operations require independent statutory oversight, strict purpose limitation, and prompt destruction of third-party samples [Scu19b, Ske20]. Simulated data markers indicated by `sim_tag()`.
