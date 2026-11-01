import glob
import os
import re
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CHAPTERS_DIR = os.path.join(BASE_DIR, "chapters")
FIGURES_DIR = os.path.join(BASE_DIR, "figures")
APPENDICES_DIR = os.path.join(BASE_DIR, "appendices")
PAPERS_DIR = os.path.join(BASE_DIR, "papers")
JS_DIR = os.path.join(BASE_DIR, "assets", "js")
CSS_DIR = os.path.join(BASE_DIR, "assets", "css")

print("Starting Unified Book Data Compilation with Chapter TOCs & Appendix B...")

# -------------------------------------------------------------
# 1. Parse Glossary (Appendix A)
# -------------------------------------------------------------
glossary = {}
glossary_file = os.path.join(APPENDICES_DIR, "Appendix_A_Unified_Glossary.md")
if os.path.exists(glossary_file):
    with open(glossary_file, "r", encoding="utf-8") as f:
        for line in f:
            m = re.match(r"^\|\s*([^|]+?)\s*\|\s*(.+?)\s*\|$", line.strip())
            if m:
                term, defn = m.group(1).strip(), m.group(2).strip()
                if not term.startswith(":-") and term.lower() != "term":
                    glossary[term] = defn
print(f"Loaded {len(glossary)} glossary terms.")

# Aliases
alias_to_canonical = {}
EXCLUDE_ACRONYMS = {"in", "at", "to", "or", "and", "the", "for", "of", "on", "as", "by", "is", "it", "an"}
COMMON_GENERIC_WORDS = {"trace", "match", "test", "source", "sample", "model"}

for canonical_term in glossary:
    alias_to_canonical[canonical_term] = canonical_term
    clean_t = re.sub(r"\s*\([^)]*\)", "", canonical_term).strip()
    if clean_t != canonical_term and len(clean_t) > 2:
        alias_to_canonical[clean_t] = canonical_term
    m_paren = re.findall(r"\(([^)]+)\)", canonical_term)
    for p_content in m_paren:
        acronym = p_content.strip()
        if len(acronym) >= 2 and acronym.lower() not in EXCLUDE_ACRONYMS:
            alias_to_canonical[acronym] = canonical_term

extra_aliases = {
    "Likelihood ratios": "Likelihood ratio (LR)",
    "Likelihood ratio": "Likelihood ratio (LR)",
    "Random match probability": "Random match probability (RMP)",
    "Random match probabilities": "Random match probability (RMP)",
    "Stutter": "Stutter",
    "Stutters": "Stutter",
    "Minutiae": "Minutiae",
    "Minutia": "Minutiae",
    "Heteroplasmy": "Heteroplasmy",
    "Heteroplasmies": "Heteroplasmy",
    "Epigenetic clock": "Epigenetic clock",
    "Epigenetic clocks": "Epigenetic clock",
    "Short tandem repeat": "Short tandem repeat (STR)",
    "Short tandem repeats": "Short tandem repeat (STR)",
    "Single nucleotide polymorphism": "Single nucleotide polymorphism (SNP)",
    "Single nucleotide polymorphisms": "Single nucleotide polymorphism (SNP)",
    "Capillary electrophoresis": "Capillary electrophoresis (CE)",
    "Alternative light source": "Alternative light source (ALS)",
    "Alternative light sources": "Alternative light source (ALS)",
    "Linear sequential unmasking": "Linear sequential unmasking (LSU)",
    "Massively parallel sequencing": "Massively parallel sequencing (MPS)",
    "Probabilistic genotyping": "Probabilistic genotyping (PG)",
    "Rapid DNA": "Rapid DNA",
    "Rapidly mutating Y-STR": "Rapidly mutating Y-STR (RM Y-STR)",
    "Rapidly mutating Y-STRs": "Rapidly mutating Y-STR (RM Y-STR)",
    "Y-STR": "Y-STR",
    "Y-STRs": "Y-STR",
    "mtDNA": "Mitochondrial DNA (mtDNA)",
    "MSY": "Non-recombining male-specific Y (MSY)",
    "CODIS": "CODIS",
    "YHRD": "Y-chromosome STR Haplotype Reference Database (YHRD)",
    "EMPOP": "EDNAP Mitochondrial DNA Population Database (EMPOP)"
}

for ea, can in extra_aliases.items():
    if can in glossary:
        alias_to_canonical[ea] = can

sorted_aliases = sorted(alias_to_canonical.keys(), key=lambda x: len(x), reverse=True)

# -------------------------------------------------------------
# 2. Master Bibliographic Reference Database & Local PDFs
# -------------------------------------------------------------
# Physical Local PDFs mapping
key_to_local_pdf = {}
for p in glob.glob(os.path.join(PAPERS_DIR, "**", "*.pdf"), recursive=True):
    fname = os.path.basename(p)
    rel_path = os.path.relpath(p, BASE_DIR).replace("\\", "/")
    m = re.match(r"^\[([A-Za-z0-9]+)\]\s*(.*)\.pdf$", fname)
    if m:
        k = m.group(1)
        key_to_local_pdf[k] = {
            "localPath": rel_path,
            "filename": fname,
            "title": m.group(2)
        }

# Butler Chapter PDFs mapping
for p in glob.glob(os.path.join(PAPERS_DIR, "**", "*.pdf"), recursive=True):
    fname = os.path.basename(p)
    rel_path = os.path.relpath(p, BASE_DIR).replace("\\", "/")
    m = re.search(r"Ch(\d+)", fname)
    if m:
        ch_num = int(m.group(1))
        bk = f"Butler_Ch{ch_num:02d}"
        key_to_local_pdf[bk] = {
            "localPath": rel_path,
            "filename": fname,
            "title": f"Butler 2012 Methodology - Chapter {ch_num}"
        }
    m_app = re.search(r"App(\d+)", fname)
    if m_app:
        app_num = int(m_app.group(1))
        bk = f"Butler_App{app_num}"
        key_to_local_pdf[bk] = {
            "localPath": rel_path,
            "filename": fname,
            "title": f"Butler 2012 Methodology - Appendix {app_num}"
        }

butler_key_mapping = {
    "But12": "Butler_Ch12",
    "But12b": "Butler_Ch06",
    "But12c": "Butler_Ch11",
    "But12d": "Butler_Ch08",
    "But12e": "Butler_Ch05",
    "But12f": "Butler_Ch04",
    "But12g": "Butler_Ch09",
    "But06c": "Butler_Ch05"
}
for bk, btarget in butler_key_mapping.items():
    if btarget in key_to_local_pdf and bk not in key_to_local_pdf:
        key_to_local_pdf[bk] = key_to_local_pdf[btarget]

print(f"Mapped {len(key_to_local_pdf)} citation keys to physical local PDFs.")

# Annotations from Appendix B (Further Reading)
further_reading_annotations = {}
appendix_b_file = os.path.join(APPENDICES_DIR, "Appendix_B_Further_Reading.md")
if os.path.exists(appendix_b_file):
    with open(appendix_b_file, "r", encoding="utf-8") as f:
        b_raw = f.read()
    parts = b_raw.split("# References")
    for block in re.split(r"(?m)^##\s+Chapter\s+", parts[0])[1:]:
        matches = re.findall(r"-\s+\\\[([A-Za-z0-9]+)\\\]\s*([^\n]+(?:\n[^\n\-]+)*)", block)
        for k, text in matches:
            further_reading_annotations[k] = text.strip().replace("\n", " ")

# Master Sources Mapping (Undermind exports and Hebrew chapters)
parent_dir = os.path.dirname(BASE_DIR)
undermind_dir = os.path.join(parent_dir, "טקסט פרקים", "ייצוא Undermind (מקורות ממוספרים)")
old_dir = os.path.join(parent_dir, "טקסט פרקים", "_ישן")

sources_map = {
    0: (os.path.join(old_dir, "פרק_0_מבוא_למדע_פורנזי_ולביולוגיה_פורנזית_–_מלא.md"), os.path.join(CHAPTERS_DIR, "Chapter 00 Introduction to forensic science and forensic biology – full.md")),
    1: (os.path.join(old_dir, "פרק_1_בדיקות_מקדימות_ומאשרות_לנוזלי_גוף_–_מלא.md"), os.path.join(CHAPTERS_DIR, "Chapter 01 Presumptive and confirmatory tests for body fluids – full.md")),
    2: (os.path.join(undermind_dir, "Chapter_2_Profile_characterization_–_full.md"), os.path.join(CHAPTERS_DIR, "Chapter 02 Profile Characterization – full.md")),
    3: (os.path.join(undermind_dir, "Chapter_3_DNA_mixture_interpretation_–_full.md"), os.path.join(CHAPTERS_DIR, "Chapter 03 DNA Mixture Interpretation – full.md")),
    4: (os.path.join(undermind_dir, "Chapter_4_Statistics_of_DNA_profile_analysis_–_full.md"), os.path.join(CHAPTERS_DIR, "Chapter 04 Statistics of DNA profile analysis – full.md")),
    5: (os.path.join(undermind_dir, "Chapter_5_Forensic_DNA_databases_–_full.md"), os.path.join(CHAPTERS_DIR, "Chapter 05 Forensic DNA databases – full.md")),
    6: (os.path.join(undermind_dir, "Chapter_6_Y-Chromosome_Analysis_–_full.md"), os.path.join(CHAPTERS_DIR, "Chapter 06 Y-Chromosome Analysis – full.md")),
    7: (os.path.join(undermind_dir, "Chapter_7_Mitochondrial_DNA_Analysis_–_full.md"), os.path.join(CHAPTERS_DIR, "Chapter 07 Mitochondrial DNA Analysis – full.md")),
    8: (os.path.join(undermind_dir, "Chapter_8_Biogeographical_Ancestry_and_Forensic_DNA_Intelligence_–_full.md"), os.path.join(CHAPTERS_DIR, "Chapter 08 Biogeographical Ancestry and Forensic DNA Intelligence – full.md")),
    9: (os.path.join(undermind_dir, "Chapter_9_Forensic_Epigenetics_–_full.md"), os.path.join(CHAPTERS_DIR, "Chapter 09 Forensic Epigenetics – full.md")),
    10: (os.path.join(undermind_dir, "Chapter_10_Forensic_Investigative_Genetic_Genealogy_(FIGG)_–_full.md"), os.path.join(CHAPTERS_DIR, "Chapter 10 Forensic Investigative Genetic Genealogy (FIGG) – full.md")),
    11: (os.path.join(undermind_dir, "Chapter_11_Fingerprints_Fundamentals_and_Development_–_full.md"), os.path.join(CHAPTERS_DIR, "Chapter 11 Fingerprints Fundamentals and Development – full.md")),
    12: (os.path.join(undermind_dir, "Chapter_12_Fingerprint_Comparison_Validity_and_Automated_Identification_–_full.md"), os.path.join(CHAPTERS_DIR, "Chapter 12 Fingerprint Comparison Validity and Automated Identification – full.md"))
}

master_raw_citations = {}

for ch_num, (src_file, eng_file) in sources_map.items():
    if not os.path.exists(src_file) or not os.path.exists(eng_file):
        continue
    with open(src_file, "r", encoding="utf-8") as f:
        src_txt = f.read()
    with open(eng_file, "r", encoding="utf-8") as f:
        eng_txt = f.read()

    m_src_ref = re.search(r"## References", src_txt)
    if not m_src_ref:
        continue
    ref_text = src_txt[m_src_ref.start():]
    src_body = src_txt[:m_src_ref.start()]

    entries = re.findall(r'\\\[(\d+)\\\]\s*([^\n]+(?:\n[^\n\\]+)*)', ref_text)
    ref_dict = {int(n): t.strip().replace("\n", " ") for n, t in entries}

    src_cite_occurrences = []
    for m in re.finditer(r"\\\[(\d+(?:\s*,\s*\d+)*)\\\]", src_body):
        for n in m.group(1).split(","):
            src_cite_occurrences.append(int(n.strip()))

    eng_cite_occurrences = []
    for m in re.finditer(r"\[([A-Za-z0-9]+(?:\s*,\s*[A-Za-z0-9]+)*)\]", eng_txt):
        for k in m.group(1).split(","):
            k = k.strip()
            if len(k) >= 3 and not k.isdigit():
                eng_cite_occurrences.append(k)

    if len(src_cite_occurrences) == len(eng_cite_occurrences):
        for n, k in zip(src_cite_occurrences, eng_cite_occurrences):
            if n in ref_dict and k not in master_raw_citations:
                master_raw_citations[k] = ref_dict[n]
    else:
        src_paras = [p.strip() for p in src_body.split("\n\n") if p.strip()]
        eng_paras = [p.strip() for p in eng_txt.split("\n\n") if p.strip()]
        for sp in src_paras:
            s_nums = []
            for m in re.finditer(r"\\\[(\d+(?:\s*,\s*\d+)*)\\\]", sp):
                for n in m.group(1).split(","):
                    s_nums.append(int(n.strip()))
            if not s_nums: continue
            
            for ep in eng_paras:
                e_keys = []
                for m in re.finditer(r"\[([A-Za-z0-9]+(?:\s*,\s*[A-Za-z0-9]+)*)\]", ep):
                    for k in m.group(1).split(","):
                        k = k.strip()
                        if len(k) >= 3 and not k.isdigit():
                            e_keys.append(k)
                if len(s_nums) == len(e_keys) and len(s_nums) > 0:
                    for n, k in zip(s_nums, e_keys):
                        if n in ref_dict and k not in master_raw_citations:
                            master_raw_citations[k] = ref_dict[n]

# Supplement with Appendix B formal references
if os.path.exists(appendix_b_file):
    with open(appendix_b_file, "r", encoding="utf-8") as f:
        b_raw = f.read()
    parts = b_raw.split("# References")
    if len(parts) > 1:
        for k, text in re.findall(r"\\\[([A-Za-z0-9]+)\\\]\s*(.+?)(?=\n\n\\\[|\Z)", parts[1], re.DOTALL):
            if k not in master_raw_citations:
                master_raw_citations[k] = text.strip().replace("\n", " ")

print(f"Collected {len(master_raw_citations)} master citation strings across all chapters.")

# Helper to parse citation into Title, Authors, Year, DOI
def parse_citation(citation_str, key):
    clean = citation_str.strip()
    
    # DOI extraction
    m_doi = re.search(r"https?://(?:dx\.)?doi\.org/(10\.\d{4,9}/[^\s\>\]\"\']+)", clean)
    if not m_doi:
        m_doi = re.search(r"\b(10\.\d{4,9}/[^\s\>\]\"\']+)", clean)
    doi = m_doi.group(1).rstrip(".,;)") if m_doi else None
    
    # Year extraction
    m_yr = re.search(r"\b(19\d\d|20\d\d)\b", clean)
    year = m_yr.group(1) if m_yr else ""
    
    # Title extraction
    title = ""
    m_title = re.search(r"[\"“]([^\r\n\"”]+)[\"”]", clean)
    if m_title:
        title = m_title.group(1).strip()
    else:
        parts = clean.split(",")
        title = parts[1].strip() if len(parts) >= 2 else clean
            
    # Authors extraction
    authors = ""
    if m_title:
        authors = clean[:m_title.start()].strip().rstrip(",").rstrip()
    else:
        parts = clean.split(",")
        authors = parts[0].strip()
        
    return {
        "authors": authors,
        "title": title,
        "year": year,
        "doi": doi,
        "fullCitation": clean
    }

# Build unified papers_map
papers_map = {}
for k, raw_cit in master_raw_citations.items():
    parsed = parse_citation(raw_cit, k)
    loc_info = key_to_local_pdf.get(k)
    
    papers_map[k] = {
        "key": k,
        "authors": parsed["authors"],
        "title": parsed["title"],
        "year": parsed["year"],
        "citation": parsed["fullCitation"],
        "doi": parsed["doi"],
        "annotation": further_reading_annotations.get(k, ""),
        "hasLocalPdf": loc_info is not None,
        "localPath": loc_info["localPath"] if loc_info else None,
        "filename": loc_info["filename"] if loc_info else None
    }

# Ensure all physical PDFs are represented
for k, loc_info in key_to_local_pdf.items():
    if k not in papers_map:
        papers_map[k] = {
            "key": k,
            "authors": "Forensic Literature Archive",
            "title": loc_info["title"],
            "year": "",
            "citation": loc_info["filename"],
            "doi": None,
            "annotation": further_reading_annotations.get(k, ""),
            "hasLocalPdf": True,
            "localPath": loc_info["localPath"],
            "filename": loc_info["filename"]
        }

local_pdf_count = sum(1 for p in papers_map.values() if p["hasLocalPdf"])
web_only_count = sum(1 for p in papers_map.values() if not p["hasLocalPdf"])
doi_count = sum(1 for p in papers_map.values() if p["doi"])
print(f"Master Papers Database: {len(papers_map)} total entries ({local_pdf_count} local PDFs, {web_only_count} web-only, {doi_count} with DOIs).")

# -------------------------------------------------------------
# 4. Parse Figures & Captions
# -------------------------------------------------------------
figures_map = {}
captions_files = glob.glob(os.path.join(FIGURES_DIR, "captions_ch*.md"))

for cf in sorted(captions_files):
    with open(cf, "r", encoding="utf-8") as f:
        text = f.read()
    sections = re.split(r"(?m)^#{2,3}\s+Figure\s+", text)[1:]
    for sec in sections:
        lines = sec.strip().split("\n")
        head_line = lines[0].strip()
        m_num = re.match(r"^([\d\.]+)", head_line)
        fig_num = m_num.group(1) if m_num else ""
        
        stem = None
        m_stem = re.search(r"Fig\d{2}-\d{2}_[a-zA-Z0-9_\-]+", sec)
        if m_stem:
            stem = m_stem.group(0)
        if not stem:
            continue
            
        anchor = ""
        m_anc = re.search(r"(?:-\s+\*\*Placement(?:\s+anchor)?\*\*|\b(?:Placement\s+anchor|Anchor|Placement)):\s*(.*?)(?=\n-\s+\*\*|\n\*\*Caption|\nCaption|\n###|\Z)", sec, re.DOTALL)
        if m_anc:
            raw_anc = m_anc.group(1).strip()
            m_q = re.search(r'[\"“]([^\r\n\"”]+)[\"”]', raw_anc)
            if m_q:
                anchor = m_q.group(1).replace("…", "").replace("...", "").replace("*", "").strip()
            else:
                anchor = raw_anc.replace("…", "").replace("...", "").replace("*", "").strip()
                
        caption = ""
        m_cap = re.search(r"(?:-\s+\*\*Caption\*\*:\s*|\bCaption:\s*)(?:>\s*)?(.*?)(?=(?:\n-\s+\*\*|\nInteractive|\n###|\Z))", sec, re.DOTALL)
        if m_cap:
            caption = m_cap.group(1).strip().replace("\n> ", " ").replace("\n", " ")
            
        figures_map[stem] = {
            "number": fig_num,
            "stem": stem,
            "anchor": anchor,
            "caption": caption,
            "svg": f"figures/{stem}.svg",
            "png": f"figures/{stem}.png"
        }
print(f"Loaded {len(figures_map)} figures.")

# -------------------------------------------------------------
# 5. Tokenize & Enrich Paragraphs
# -------------------------------------------------------------
def enrich_text_tokens(html_line, aliases_list, alias_map):
    def replace_citation(m):
        raw_keys = m.group(1)
        keys = [k.strip() for k in raw_keys.split(",")]
        pills = []
        for k in keys:
            p_obj = papers_map.get(k)
            has_local = bool(p_obj and p_obj.get("hasLocalPdf"))
            if has_local:
                pills.append(f'<span class="cite-pill has-local" data-key="{k}" title="📁 קובץ PDF מקומי זמין בתיקייה (Offline Document)" onclick="window.reader.showCitationModal(\'{k}\')"><span class="pill-icon">📄</span>[{k}]</span>')
            else:
                pills.append(f'<span class="cite-pill is-web" data-key="{k}" title="🌐 מקור מקוון (Web/DOI Only)" onclick="window.reader.showCitationModal(\'{k}\')"><span class="pill-icon">🌐</span>[{k}]</span>')
        return " ".join(pills)
        
    html_line = re.sub(r"\[([A-Za-z0-9]+(?:\s*,\s*[A-Za-z0-9]+)*)\]", replace_citation, html_line)
    tokens = re.split(r"(<[^>]+>)", html_line)
    
    for idx, tok in enumerate(tokens):
        if tok.startswith("<") or not tok.strip():
            continue
            
        for alias in aliases_list:
            if len(alias) < 3:
                continue
            if alias.lower() in COMMON_GENERIC_WORDS and alias.islower():
                continue
                
            flags = 0 if (alias.isupper() and len(alias) <= 5) else re.IGNORECASE
            pattern = r"\b(" + re.escape(alias) + r")\b"
            canonical = alias_map[alias]
            safe_canonical = canonical.replace("'", "\\'")
            
            def repl_concept(match_obj):
                matched_str = match_obj.group(1)
                return f'<span class="concept-term" data-term="{safe_canonical}" onclick="window.reader.showConceptModal(\'{safe_canonical}\')">{matched_str}</span>'
                
            if re.search(pattern, tok, flags=flags):
                tok = re.sub(pattern, repl_concept, tok, count=2, flags=flags)
                tokens[idx] = tok

    return "".join(tokens)

# -------------------------------------------------------------
# 6. Convert Markdown to HTML with Chapter Outline & Anchors
# -------------------------------------------------------------
def markdown_to_html(md_text, chapter_figs, chapter_sections, aliases_list, alias_map):
    paragraphs = md_text.split("\n\n")
    html_out = []
    inserted_figs = set()
    outline_inserted = False
    
    for para in paragraphs:
        para_clean = para.strip()
        if not para_clean:
            continue
            
        if para_clean.startswith("# "):
            title = para_clean[2:].strip()
            html_out.append(f"<h1 class='chapter-title'>{title}</h1>")
            
            # Insert Chapter Outline Card immediately following Chapter Title!
            if not outline_inserted and chapter_sections:
                links_html = []
                for s in chapter_sections:
                    sec_id = s["id"]
                    sec_num = s["num"]
                    sec_title = s["title"]
                    links_html.append(f'<a href="#{sec_id}" class="outline-sec-link" onclick="document.getElementById(\'{sec_id}\').scrollIntoView({{behavior:\'smooth\'}}); return false;"><span class="outline-sec-num">{sec_num}</span><span class="outline-sec-title">{sec_title}</span></a>')
                outline_links_str = "".join(links_html)
                outline_html = f"""
<div class="chapter-outline-card">
  <div class="outline-card-header">
    <div style="display:flex; align-items:center; gap:8px;">
      <span class="outline-card-icon">📋</span>
      <span class="outline-card-title">Chapter Outline & Table of Contents</span>
    </div>
    <span class="outline-card-meta">{len(chapter_sections)} Sections • {len(chapter_figs)} Figures</span>
  </div>
  <div class="outline-links-grid">
    {outline_links_str}
  </div>
</div>
"""
                html_out.append(outline_html)
                outline_inserted = True
            continue
            
        elif para_clean.startswith("## "):
            line = para_clean[3:].strip()
            m_sec = re.match(r"^([\d\.]+)\s+(.+)$", line)
            if m_sec:
                sec_id = f"sec-{m_sec.group(1).replace('.', '-')}"
                html_out.append(f"<h2 id='{sec_id}' class='section-heading'><span class='sec-num'>{m_sec.group(1)}</span> {m_sec.group(2)}</h2>")
            else:
                html_out.append(f"<h2 class='section-heading'>{line}</h2>")
            continue
        elif para_clean.startswith("### "):
            line = para_clean[4:].strip()
            html_out.append(f"<h3 class='subsection-heading'>{line}</h3>")
            continue
        elif para_clean.startswith("#### "):
            line = para_clean[5:].strip()
            html_out.append(f"<h4 class='subsubsection-heading'>{line}</h4>")
            continue
            
        if para_clean.startswith(">"):
            b_lines = [l.lstrip(">").strip() for l in para_clean.split("\n")]
            b_content = "<br>".join(b_lines)
            b_enriched = enrich_text_tokens(b_content, aliases_list, alias_map)
            html_out.append(f"<blockquote class='callout-quote'>{b_enriched}</blockquote>")
            continue
            
        if "|" in para_clean and "-|-" in para_clean:
            table_lines = [l.strip() for l in para_clean.split("\n") if l.strip()]
            t_html = ["<div class='table-responsive'><table class='book-table'>"]
            is_head = True
            for r_idx, t_line in enumerate(table_lines):
                if re.match(r"^\|?[\s\-:|]+\|?$", t_line):
                    is_head = False
                    continue
                cells = [c.strip() for c in t_line.strip("|").split("|")]
                tag = "th" if is_head else "td"
                enriched_cells = [enrich_text_tokens(c, aliases_list, alias_map) for c in cells]
                row_str = "".join([f"<{tag}>{c}</{tag}>" for c in enriched_cells])
                if is_head:
                    t_html.append(f"<thead><tr>{row_str}</tr></thead><tbody>")
                else:
                    t_html.append(f"<tr>{row_str}</tr>")
            t_html.append("</tbody></table></div>")
            html_out.append("\n".join(t_html))
            continue
            
        if re.match(r"^(\*|\-|\d+\.)\s+", para_clean):
            l_lines = para_clean.split("\n")
            is_ordered = re.match(r"^\d+\.", l_lines[0].strip())
            list_tag = "ol" if is_ordered else "ul"
            list_items = []
            for l_item in l_lines:
                m_li = re.match(r"^(\*|\-|\d+\.)\s+(.+)$", l_item.strip())
                content = m_li.group(2) if m_li else l_item.strip()
                content = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", content)
                content = re.sub(r"\*(.+?)\*", r"<em>\1</em>", content)
                content = re.sub(r"`(.+?)`", r"<code>\1</code>", content)
                content = enrich_text_tokens(content, aliases_list, alias_map)
                list_items.append(f"<li>{content}</li>")
            html_out.append(f"<{list_tag} class='book-list'>{''.join(list_items)}</{list_tag}>")
            continue

        p_text = para_clean
        p_text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", p_text)
        p_text = re.sub(r"\*(.+?)\*", r"<em>\1</em>", p_text)
        p_text = re.sub(r"`(.+?)`", r"<code>\1</code>", p_text)
        p_text = enrich_text_tokens(p_text, aliases_list, alias_map)
        
        html_out.append(f"<p class='book-p'>{p_text}</p>")
        
        for fig in chapter_figs:
            stem = fig["stem"]
            if stem in inserted_figs:
                continue
            anc = fig["anchor"]
            match_found = False
            if anc and len(anc) > 10:
                if anc.lower() in para.lower():
                    match_found = True
                else:
                    words = [w for w in re.findall(r"[A-Za-z0-9\-]+", anc) if len(w) > 3]
                    if len(words) >= 3:
                        phrase = " ".join(words[-4:])
                        if phrase.lower() in para.lower():
                            match_found = True
            if match_found:
                inserted_figs.add(stem)
                fig_card = f"""
<div class="figure-container" id="fig-{stem}">
  <div class="figure-header">
    <span class="fig-badge">Figure {fig['number']}</span>
    <span class="fig-stem-label">{stem}</span>
  </div>
  <div class="figure-media">
    <img src="{fig['svg']}" alt="Figure {fig['number']}" class="figure-img" onclick="window.reader.openFigureModal('{stem}')" loading="lazy" />
  </div>
  <div class="figure-actions">
    <button class="btn-fig-zoom" onclick="window.reader.openFigureModal('{stem}')"><span class="icon">🔍</span> Enlarge Vector (SVG)</button>
    <a href="{fig['png']}" target="_blank" class="btn-fig-download"><span class="icon">🖼️</span> High-Res PNG (300 dpi)</a>
  </div>
  <div class="figure-caption">
    <p>{fig['caption']}</p>
  </div>
</div>
"""
                html_out.append(fig_card)

    for fig in chapter_figs:
        stem = fig["stem"]
        if stem not in inserted_figs:
            fig_card = f"""
<div class="figure-container" id="fig-{stem}">
  <div class="figure-header">
    <span class="fig-badge">Figure {fig['number']}</span>
    <span class="fig-stem-label">{stem}</span>
  </div>
  <div class="figure-media">
    <img src="{fig['svg']}" alt="Figure {fig['number']}" class="figure-img" onclick="window.reader.openFigureModal('{stem}')" loading="lazy" />
  </div>
  <div class="figure-actions">
    <button class="btn-fig-zoom" onclick="window.reader.openFigureModal('{stem}')"><span class="icon">🔍</span> Enlarge Vector (SVG)</button>
    <a href="{fig['png']}" target="_blank" class="btn-fig-download"><span class="icon">🖼️</span> High-Res PNG (300 dpi)</a>
  </div>
  <div class="figure-caption">
    <p>{fig['caption']}</p>
  </div>
</div>
"""
            html_out.append(fig_card)
            
    return "\n\n".join(html_out)

# -------------------------------------------------------------
# 7. Process All 13 Chapters
# -------------------------------------------------------------
chapters_list = []
chapter_files = glob.glob(os.path.join(CHAPTERS_DIR, "Chapter * – full.md"))

def get_ch_num(path):
    m = re.search(r"Chapter\s+(\d+)", os.path.basename(path))
    return int(m.group(1)) if m else 999

chapter_files = sorted(chapter_files, key=get_ch_num)
total_concepts_inserted = 0

for cf in chapter_files:
    ch_num = get_ch_num(cf)
    fname = os.path.basename(cf)
    with open(cf, "r", encoding="utf-8") as f:
        raw_text = f.read()
        
    m_title = re.search(r"^#\s+(.+)$", raw_text, re.MULTILINE)
    title = m_title.group(1).strip() if m_title else fname.replace(".md", "")
    
    prefix = f"Fig{ch_num:02d}-"
    ch_figs = [f for stem, f in figures_map.items() if stem.startswith(prefix)]
    ch_figs = sorted(ch_figs, key=lambda x: x["number"])
    
    sections = []
    sec_matches = re.findall(r"^##\s+([\d\.]+)\s+(.+)$", raw_text, re.MULTILINE)
    for s_num, s_title in sec_matches:
        sections.append({
            "num": s_num.strip(),
            "title": s_title.strip(),
            "id": f"sec-{s_num.strip().replace('.', '-')}"
        })
        
    html_content = markdown_to_html(raw_text, ch_figs, sections, sorted_aliases, alias_to_canonical)
    concepts_count = len(re.findall(r'class="concept-term"', html_content))
    total_concepts_inserted += concepts_count
    
    chapters_list.append({
        "num": ch_num,
        "id": f"ch{ch_num:02d}",
        "title": title,
        "shortTitle": title.split(":")[-1].strip() if ":" in title else title,
        "sections": sections,
        "figuresCount": len(ch_figs),
        "conceptsCount": concepts_count,
        "htmlContent": html_content
    })
    print(f"Rendered Chapter {ch_num:02d}: {len(sections)} sections, {len(ch_figs)} figures, {concepts_count} concepts.")

print(f"Total interactive concept links: {total_concepts_inserted}")

# -------------------------------------------------------------
# 8. Export to assets/js/book_data.js
# -------------------------------------------------------------
book_data = {
    "title": "Forensic Biological Identification: From DNA to Fingerprints",
    "subtitle": "An Advanced Enriching Reading Pack for Computational Biology in Forensic Science",
    "institutional": {
        "agency": "Israel Police — Division of Identification and Forensic Science (DIFS / מז\"פ)",
        "department": "Research and Development Section (מדור מו\"פ)",
        "targetAudience": "Computational Biology Graduates & Forensic DNA / Pattern Specialists",
        "academicLevel": "MSc Level Advanced Forensic Curriculum",
        "logos": {
            "rnd": "assets/logos/logo_rnd_web.png",
            "difs": "assets/logos/logo_difs_web.png"
        }
    },
    "disclaimers": {
        "training": "For Internal Educational and Training Purposes Only — Israel Police, Division of Identification and Forensic Science (DIFS), Research & Development Section.",
        "aiDisclosure": "AI Disclosure & Integrity Statement: This educational reading pack was synthesized, researched, and structured with the assistance of advanced AI scientific tools, grounded rigorously and exclusively in peer-reviewed forensic literature. Final scientific validation, review, and oversight by DIFS R&D."
    },
    "chapters": chapters_list,
    "glossary": glossary,
    "figures": figures_map,
    "papers": papers_map
}

output_js_path = os.path.join(JS_DIR, "book_data.js")
with open(output_js_path, "w", encoding="utf-8") as f:
    f.write("// Forensic Biological Identification - Master Book Data Bundle\n")
    f.write("window.BOOK_DATA = ")
    json.dump(book_data, f, ensure_ascii=False)
    f.write(";\n")

print(f"Generated {output_js_path} (Size: {os.path.getsize(output_js_path):,} bytes).")
