# Captions for Chapter 9: Forensic Epigenetics

This document contains the captions, textual placement anchors, and source attributions for all figures in Chapter 9 ("Forensic Epigenetics"). Every anchor quotes verbatim the end of a sentence in `טקסט פרקים/Chapter 09 Forensic Epigenetics – full.md`.

---

### Figure 9.1

- **File**: `Fig09-01_methylation-biology-bisulfite.png` / `Fig09-01_methylation-biology-bisulfite.svg`
- **Script**: `Fig09-01_methylation-biology-bisulfite.py`
- **Width**: Full text width (`FULL_W`, 16.0 cm)
- **Placement anchor**: Section 9.2, immediately following:
  > "...A minimum input reported for one assay is specific to its conversion kit, workflow, target design, and validation—not a universal threshold [Nau23, Woz21]."
- **Caption**:
  > **Figure 9.1. Biology of DNA methylation, CpG dinucleotides, and bisulfite conversion chemistry.** (A) Chemical modification: addition of a methyl group to the 5th carbon of cytosine yielding 5-methylcytosine (5mC), occurring predominantly in symmetrical CpG dinucleotides; promoter hypermethylation is typically associated with transcriptional repression, whereas bulk-tissue measurements reflect weighted averages across constituent cell types [Nau23, Vid18]. (B) Sodium bisulfite conversion biochemistry: treatment with sodium bisulfite hydrolytically deaminates unmethylated cytosines to uracil (replicated as thymine, T, during PCR amplification), whereas methylated cytosines (5mC) are chemically resistant and remain cytosine (replicated as C); the quantitative methylation fraction is calculated as $\beta = C / (C + T)$ from peak heights or digital read counts [Nau17, Woz21]. (C) Forensic trace constraints: bisulfite treatment induces severe hydrolytic fragmentation and recovery loss (>80–90% template degradation), reduces sequence complexity from four bases to effectively three (A, G, T), and creates stochastic amplification imbalance in low-template or degraded traces [Nau23, Woz21]. (D) Evidentiary boundary: DNA methylation modifies the chemical state of DNA without altering the underlying inherited nucleotide sequence; it provides investigative intelligence regarding cellular state without proving identity [Nau23, Vid18]. Simulated data for illustration. Source: Original illustration based on [Nau23, Vid18, Nau17, Woz21].

---

### Figure 9.2

- **File**: `Fig09-02_targeted-epigenetic-technologies.png` / `Fig09-02_targeted-epigenetic-technologies.svg`
- **Script**: `Fig09-02_targeted-epigenetic-technologies.py`
- **Width**: Full text width (`FULL_W`, 16.0 cm)
- **Placement anchor**: Section 9.2, immediately following:
  > "...Interpretation must match assay and instrument; conversion loss, uneven amplification, and low read depth can compound in low-template or degraded traces [Nau23, Woz21, Lee21]."
- **Caption**:
  > **Figure 9.2. Targeted epigenetic detection technologies: Pyrosequencing, SNaPshot, and Targeted MPS.** (A) Analytical platforms: (1) Pyrosequencing utilizes a DNA polymerase, ATP sulfurylase, and luciferase enzymatic cascade to emit light proportional to C or T incorporation across short targets, providing precise quantitative measurement in singleplex assays [Vid18, Fre20]; (2) SNaPshot minisequencing uses single-base primer extension with fluorescent dideoxynucleotides (ddNTPs) followed by capillary electrophoresis, enabling multiplexing but yielding semi-quantitative peak-height ratios influenced by dye response and instrument settings [Vid18, Fre20, Lee21]; (3) Targeted MPS sequences hundreds of thousands of bisulfite-converted PCR amplicons simultaneously, quantifying methylation directly from digital C versus T read depths with single-molecule resolution [Nau17, Woz21]; (4) MSRE assays utilize methylation-sensitive restriction endonucleases to detect cleavage patterns without bisulfite-induced DNA damage, restricted to specific recognition sites [Vid18]. (B) Platform non-interchangeability: raw methylation measurements display systematic shifts across instruments (e.g. 3130 vs 3500) and platforms, necessitating platform-specific calibration curves [Fre20, Lee21]. (C) Forensic compounding constraints: conversion loss, amplification bias, and low read depth compound in degraded or low-template traces [Nau23, Woz21, Lee21]. Source: Original illustration based on [Vid18, Fre20, Lee21, Nau17, Woz21, Nau23].

---

### Figure 9.3

- **File**: `Fig09-03_age-estimation-clocks-error.png` / `Fig09-03_age-estimation-clocks-error.svg`
- **Script**: `Fig09-03_age-estimation-clocks-error.py`
- **Width**: Full text width (`FULL_W`, 16.0 cm)
- **Placement anchor**: Section 9.3, immediately following:
  > "...The gap between a moderate mean error and a much larger individual error cautions against treating these workflow-specific results as tissue-independent rankings."
- **Caption**:
  > **Figure 9.3. Chronological age estimation: epigenetic clock models, key markers, and tissue error profiles.** (A) Recurrent forensic age markers: targeted panels monitor age-correlated CpGs; *ELOVL2, FHL2, KLF14, PDE4C*, and *TRIM59* consistently display progressive age-associated hypermethylation, whereas *MIR29B2CHG* (C1orf132) exhibits age-associated hypomethylation across lifespan [Nau23, Ref23, Zbi15b]. (B) Mathematical clock modeling: linear regression models assume constant rates of change, whereas quadratic and power models capture non-linear saturation at advanced ages (notably in *ELOVL2*) [Woz21, Bek15]; quantile regression generates calibrated prediction intervals reflecting heteroscedastic error distributions [Fre22]. (C) Multi-tissue Mean Absolute Error (MAE) benchmarks: held-out and inter-laboratory evaluations yield MAEs of 3.2–4.0 years for blood, 3.7–4.4 years for buccal swabs, 3.4 years for bone, ~5.4 years for semen, and ~4.9 years for dentin [Woz21, Hei25c, Sut24, Lee15b, Bek15]. (D) Casework prediction boundaries: cohort-level MAE is not an individual confidence bound; individual prediction errors can reach 10–15 years [Hei25c, Koo20], and predicting ages outside validated ranges represents unvalidated extrapolation [Nau17, Bek15]. (E) Reporting standards: reports must provide point estimates paired with validated prediction intervals, specify testing parameters, and emphasize that age estimates guide investigations without establishing identity [Fre22, Hei25c, Nau23]. Simulated data for illustration. Source: Original illustration based on [Nau23, Ref23, Zbi15b, Woz21, Bek15, Nau17, Fre22, Hei25c, Sut24, Lee15b, Koo20].

---

### Figure 9.4

- **File**: `Fig09-04_tissue-fluid-identification-dms.png` / `Fig09-04_tissue-fluid-identification-dms.svg`
- **Script**: `Fig09-04_tissue-fluid-identification-dms.py`
- **Width**: Full text width (`FULL_W`, 16.0 cm)
- **Placement anchor**: Section 9.4, immediately following:
  > "...If validated thresholds or reference patterns do not support a class, report inconclusive rather than force an assignment [Sij21, Sil16]."
- **Caption**:
  > **Figure 9.4. Forensic body fluid and tissue identification: DMSs vs conventional serology and RNA typing.** (A) Differentially methylated sites (DMSs): tissue-specific genomic loci display distinct methylation levels (e.g. unmethylated vs fully methylated) across target fluids, enabling discrimination of blood, semen, saliva, vaginal secretions, and menstrual blood [Fru11, For16, Sil16]. (B) Comparative methodology matrix: conventional serology targets proteins and enzymes, consuming separate sample portions without genetic linkage to the DNA donor [Sij21]; RNA typing detects expression profiles, but messenger RNA is highly susceptible to environmental degradation [Sij21, Ger24]; DNA methylation targets DNA directly, offering superior persistence and enabling co-extraction and co-amplification with forensic identity STRs from a single aliquot [Vid18, Sij21]. (C) Cellular mixture limitations: mixed biological stains produce intermediate, averaged methylation values that cannot assign a specific fluid type to a particular STR contributor in a mixed profile [Vid18, Sij21, Sil16]. (D) Evidentiary and reporting boundaries: identifying a body fluid provides source-level intelligence but does not prove the activity or circumstances of deposition [Sij21]; decision rules require reporting an inconclusive result rather than forcing an unvalidated classification [Sil16]. Source: Original illustration based on [Vid18, Sij21, Fru11, For16, Sil16, Ger24].

---

### Figure 9.5

- **File**: `Fig09-05_twin-differentiation-exposure-governance.png` / `Fig09-05_twin-differentiation-exposure-governance.svg`
- **Script**: `Fig09-05_twin-differentiation-exposure-governance.py`
- **Width**: Full text width (`FULL_W`, 16.0 cm)
- **Placement anchor**: Section 9.7, immediately following:
  > "...Results should be framed as investigative intelligence, not identification or proof of activity."
- **Caption**:
  > **Figure 9.5. Monozygotic twin discrimination, lifestyle exposure inference (smoking), and governance.** (A) Monozygotic twin differentiation: while MZ twins share identical inherited DNA sequences and identical standard STR profiles, somatic epigenetic divergence accumulates differential methylation over their lifetimes [Vid18, Vid17b, Li13]. (B) The discovery-to-trace challenge: candidate differential sites identified between twins in fresh reference blood frequently attenuate, disappear, or reverse in forensic bloodstain traces due to technical noise and cell composition shifts, establishing that twin differentiation remains an exploratory investigative lead rather than a validated identification method [Vid17b, Vid17c]. (C) Lifestyle exposure inference (smoking panel): the Maas 13-CpG panel achieves high discrimination for current smokers (AUC $\approx 0.91$) but modest discrimination for former smokers (AUC $\approx 0.70$) [Maa19]; signals are confounded by cessation duration, passive exposure, and cell heterogeneity [Maa19, Ger24]. (D) Governance, privacy, and evidentiary boundaries: methylation data can inadvertently disclose medical conditions or health predispositions, demanding statutory Privacy Impact Assessments (PIAs), purpose limitation to serious crimes, and independent judicial oversight [Sha18, Pal26]; epigenetic inferences represent investigative intelligence, never evidence of identity or activity [Pal26]. Simulated data for illustration. Source: Original illustration based on [Vid18, Vid17b, Li13, Vid17c, Maa19, Ger24, Sha18, Pal26].