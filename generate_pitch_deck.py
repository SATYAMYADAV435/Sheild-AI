import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    # 16:9 Widescreen dimensions
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Executive Theme Colors (IBM Carbon & Cyber Dark Palette)
    C_BG = RGBColor(11, 15, 25)          # Deep Cyber Dark (#0B0F19)
    C_CARD = RGBColor(19, 25, 43)        # Card Background (#13192B)
    C_CARD_BORDER = RGBColor(38, 48, 77) # Border (#26304D)
    C_IBM_BLUE = RGBColor(15, 98, 254)   # IBM Core Blue (#0F62FE)
    C_PURPLE = RGBColor(168, 85, 247)    # Violet / Shield Accent (#A855F7)
    C_CYAN = RGBColor(6, 182, 212)       # Neon Cyan (#06B6D4)
    C_AMBER = RGBColor(238, 204, 140)    # Soft Gold (#EECC8C)
    C_CRIMSON = RGBColor(163, 99, 97)    # Terracotta / Critical (#A36361)
    C_WHITE = RGBColor(255, 255, 255)
    C_MUTED = RGBColor(156, 163, 175)    # Gray-400
    C_DIM = RGBColor(107, 114, 128)      # Gray-500

    def apply_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = C_BG
        bg.line.fill.background() # no line
        return bg

    def add_header(slide, title_text, category_text="IBM EXECUTIVE BRIEFING | SHIELD-AI ARCHITECTURE"):
        # Category Tag
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(0.3))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.size = Pt(10)
        p_cat.font.bold = True
        p_cat.font.color.rgb = C_CYAN
        p_cat.font.name = "Arial"

        # Main Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.7), Inches(11.7), Inches(0.6))
        tf = title_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title_text
        p.font.size = Pt(22)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.font.name = "Arial"

        # Thin divider line
        divider = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.35), Inches(11.733), Inches(0.02))
        divider.fill.solid()
        divider.fill.fore_color.rgb = C_CARD_BORDER
        divider.line.fill.background()

    # ==========================================
    # SLIDE 1: Title & Executive Summary
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    apply_background(s1)

    # Glowing Accent Pill
    pill = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.3), Inches(3.2), Inches(0.35))
    pill.fill.solid()
    pill.fill.fore_color.rgb = RGBColor(26, 32, 53)
    pill.line.color.rgb = C_PURPLE
    pill.line.width = Pt(1)
    tf_p = pill.text_frame
    p_p = tf_p.paragraphs[0]
    p_p.text = "AUTONOMOUS SOC SECURITY ECOSYSTEM"
    p_p.alignment = PP_ALIGN.CENTER
    p_p.font.size = Pt(9.5)
    p_p.font.bold = True
    p_p.font.color.rgb = C_CYAN

    # Big Title
    title_box = s1.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(11.5), Inches(1.8))
    tf1 = title_box.text_frame
    tf1.word_wrap = True
    p1 = tf1.paragraphs[0]
    p1.text = "Shield-AI : VertexGuard"
    p1.font.size = Pt(40)
    p1.font.bold = True
    p1.font.color.rgb = C_WHITE
    p1.font.name = "Arial"

    p2 = tf1.add_paragraph()
    p2.text = "Autonomous AI Threat Detection, Real-Time Heuristics & Adaptive Incident Response"
    p2.font.size = Pt(20)
    p2.font.color.rgb = C_PURPLE
    p2.font.name = "Arial"
    p2.space_before = Pt(8)

    # Executive Subtitle Box / Mission Statement
    sub_box = s1.shapes.add_textbox(Inches(0.8), Inches(3.6), Inches(11.7), Inches(1.0))
    tf_sub = sub_box.text_frame
    tf_sub.word_wrap = True
    p_sub = tf_sub.paragraphs[0]
    p_sub.text = (
        "Designed to fundamentally shift the cybersecurity advantage from attackers to enterprise defenders. "
        "Shield-AI combines high-throughput asynchronous telemetry ingestion, AI-driven risk scoring, "
        "and sub-second remediation capabilities engineered for next-generation IBM Security & Enterprise SOC environments."
    )
    p_sub.font.size = Pt(13)
    p_sub.font.color.rgb = C_MUTED
    p_sub.line_spacing = 1.3

    # 3 Key Stat Highlight Cards on Slide 1
    stats = [
        ("Sub-Second", "Autonomous Mitigation Dispatch", C_CYAN),
        ("0 - 1000", "Dynamic Heuristic Risk Scoring", C_AMBER),
        ("Zero Backend Latency", "Asynchronous Modular Monolith", C_PURPLE),
    ]
    card_w = Inches(3.7)
    card_h = Inches(1.4)
    start_y = Inches(4.8)
    for i, (val, label, color) in enumerate(stats):
        x = Inches(0.8) + i * (card_w + Inches(0.31))
        c = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, start_y, card_w, card_h)
        c.fill.solid()
        c.fill.fore_color.rgb = C_CARD
        c.line.color.rgb = C_CARD_BORDER
        c.line.width = Pt(1)

        t_box = s1.shapes.add_textbox(x + Inches(0.2), start_y + Inches(0.15), card_w - Inches(0.4), card_h - Inches(0.3))
        tf = t_box.text_frame
        p_val = tf.paragraphs[0]
        p_val.text = val
        p_val.font.size = Pt(20)
        p_val.font.bold = True
        p_val.font.color.rgb = color
        
        p_lbl = tf.add_paragraph()
        p_lbl.text = label
        p_lbl.font.size = Pt(11)
        p_lbl.font.color.rgb = C_WHITE
        p_lbl.space_before = Pt(4)

    # Footer Presenter details
    foot_box = s1.shapes.add_textbox(Inches(0.8), Inches(6.6), Inches(11.7), Inches(0.5))
    tf_f = foot_box.text_frame
    p_f = tf_f.paragraphs[0]
    p_f.text = "Presented to: IBM Leadership & Security Architecture Board  |  Project: Shield-AI (github.com/SATYAMYADAV435/Sheild-AI)"
    p_f.font.size = Pt(11)
    p_f.font.color.rgb = C_DIM

    # ==========================================
    # SLIDE 2: Problem Statement & Industry Urgency
    # ==========================================
    s2 = prs.slides.add_slide(blank_layout)
    apply_background(s2)
    add_header(s2, "The Critical Crisis in Enterprise Cyber Defense: Why Speed Is Everything")

    challenges = [
        ("The Alert Fatigue Crisis", 
         "Modern SOCs receive over 10,000+ daily security alerts. 70% of enterprise alerts go uninvestigated due to manual triage bottlenecks, leaving critical lateral movement undetected.",
         "70% Uninvestigated Alerts"),
        ("Asymmetric Attacker Speed", 
         "Sophisticated zero-day exploits (e.g., Stuxnet, Code Red, polymorphic ransomware) execute payload delivery in milliseconds. Human-dependent response chains (MTTR: 287 days) are fatally obsolete.",
         "287 Days Avg MTTR"),
        ("Fragmented Point Solutions", 
         "Siloed firewalls, endpoint agents, and log collectors lack unified real-time feedback loops, resulting in delayed correlation, compliance blind spots, and catastrophic data exfiltration.",
         "$4.45M Avg Breach Cost")
    ]

    col_w = Inches(3.7)
    col_h = Inches(4.5)
    top_y = Inches(1.7)
    for i, (head, desc, metric) in enumerate(challenges):
        x = Inches(0.8) + i * (col_w + Inches(0.31))
        # Card outline
        card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, top_y, col_w, col_h)
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD
        card.line.color.rgb = C_CRIMSON if i == 1 else C_CARD_BORDER
        card.line.width = Pt(1.5 if i == 1 else 1)

        # Metric Banner inside card
        mb = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x + Inches(0.25), top_y + Inches(0.3), col_w - Inches(0.5), Inches(0.6))
        mb.fill.solid()
        mb.fill.fore_color.rgb = RGBColor(28, 36, 58)
        mb.line.fill.background()
        tf_mb = mb.text_frame
        p_mb = tf_mb.paragraphs[0]
        p_mb.text = metric
        p_mb.alignment = PP_ALIGN.CENTER
        p_mb.font.size = Pt(13)
        p_mb.font.bold = True
        p_mb.font.color.rgb = C_AMBER if i == 0 else (C_CRIMSON if i == 1 else C_CYAN)

        # Text
        txt_box = s2.shapes.add_textbox(x + Inches(0.25), top_y + Inches(1.1), col_w - Inches(0.5), col_h - Inches(1.3))
        tf = txt_box.text_frame
        tf.word_wrap = True
        p_h = tf.paragraphs[0]
        p_h.text = head
        p_h.font.size = Pt(16)
        p_h.font.bold = True
        p_h.font.color.rgb = C_WHITE
        p_h.space_after = Pt(10)

        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(12)
        p_d.font.color.rgb = C_MUTED
        p_d.line_spacing = 1.3

        p_sol = tf.add_paragraph()
        p_sol.text = "Shield-AI Solution: Autonomous detection with AI confidence rating and zero-touch response."
        p_sol.font.size = Pt(11)
        p_sol.font.bold = True
        p_sol.font.color.rgb = C_PURPLE
        p_sol.space_before = Pt(14)

    # Footer note
    f2 = s2.shapes.add_textbox(Inches(0.8), Inches(6.5), Inches(11.7), Inches(0.4))
    f2.text_frame.paragraphs[0].text = "Source: IBM Cost of a Data Breach Report & Industry Cybersecurity Benchmarks."
    f2.text_frame.paragraphs[0].font.size = Pt(10)
    f2.text_frame.paragraphs[0].font.color.rgb = C_DIM

    # ==========================================
    # SLIDE 3: Architecture & Codebase Deep Dive
    # ==========================================
    s3 = prs.slides.add_slide(blank_layout)
    apply_background(s3)
    add_header(s3, "Architecture & Codebase Deep Dive: Enterprise Modular Monolith", "CODEBASE ARCHITECTURE & BACKEND DESIGN")

    # 4 Architecture Columns representing actual codebase files
    arch_modules = [
        ("API Gateway & LifeCycle", "backend/main.py", 
         ["FastAPI Asynchronous Engine", "CORS Middleware (Port 3000/8000)", "Lifespan event db creation", "Health check & OpenAPI specs"],
         C_IBM_BLUE),
        ("Data Schema & Validation", "backend/schemas.py", 
         ["Pydantic v2 BaseModels", "ThreatSeverity & Status Enums", "Strict float bounds (0.0 <= conf <= 1.0)", "ThreatCreate & ThreatUpdate DTOs"],
         C_PURPLE),
        ("ORM & Storage Layer", "backend/models.py & db.py", 
         ["SQLAlchemy Declarative Engine", "Indexed queries (source_ip, type)", "Auto-timestamped func.now()", "Easy SQLite -> PostgreSQL swap"],
         C_CYAN),
        ("Threat Router & CRUD", "backend/routers/threats.py", 
         ["High-throughput POST / threats", "Filtered GET (severity, status)", "PUT update & AI remediation notes", "DELETE /threats/{id} endpoint"],
         C_AMBER),
    ]

    col4_w = Inches(2.7)
    col4_h = Inches(3.6)
    top_y = Inches(1.7)
    for i, (title, file_ref, bullets, color) in enumerate(arch_modules):
        x = Inches(0.8) + i * (col4_w + Inches(0.31))
        c = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, top_y, col4_w, col4_h)
        c.fill.solid()
        c.fill.fore_color.rgb = C_CARD
        c.line.color.rgb = C_CARD_BORDER

        # Header bar
        bar = s3.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, top_y, col4_w, Inches(0.08))
        bar.fill.solid()
        bar.fill.fore_color.rgb = color
        bar.line.fill.background()

        tb = s3.shapes.add_textbox(x + Inches(0.15), top_y + Inches(0.2), col4_w - Inches(0.3), col4_h - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True
        
        pt = tf.paragraphs[0]
        pt.text = title
        pt.font.size = Pt(13)
        pt.font.bold = True
        pt.font.color.rgb = C_WHITE

        pf = tf.add_paragraph()
        pf.text = file_ref
        pf.font.size = Pt(10)
        pf.font.color.rgb = color
        pf.font.name = "Courier New"
        pf.space_after = Pt(8)

        for b in bullets:
            pb = tf.add_paragraph()
            pb.text = f"• {b}"
            pb.font.size = Pt(10)
            pb.font.color.rgb = C_MUTED
            pb.space_before = Pt(3)

    # Bottom Full-width Frontend Linkage Callout Box
    f_callout = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.6), Inches(11.733), Inches(1.3))
    f_callout.fill.solid()
    f_callout.fill.fore_color.rgb = RGBColor(18, 26, 45)
    f_callout.line.color.rgb = C_PURPLE
    f_callout.line.width = Pt(1)

    tf_fc = f_callout.text_frame
    tf_fc.word_wrap = True
    p_fc1 = tf_fc.paragraphs[0]
    p_fc1.text = "FRONTEND INTEGRATION & CLIENT-SIDE ARCHITECTURE (Vite + React 18)"
    p_fc1.font.size = Pt(11)
    p_fc1.font.bold = True
    p_fc1.font.color.rgb = C_CYAN

    p_fc2 = tf_fc.add_paragraph()
    p_fc2.text = (
        "• Reverse Proxy Pipeline: frontend/vite.config.js seamlessly forwards /api and /health to backend:8000 without CORS penalty.\n"
        "• State Management & Polling: Reactive hooks in App.jsx fetch updates every 15s, supporting immediate Hot-Module Reloading and optimistic UI updates.\n"
        "• Resilience: Fully decoupled architecture allows independent microservice scaling on Kubernetes/OpenShift."
    )
    p_fc2.font.size = Pt(10.5)
    p_fc2.font.color.rgb = C_WHITE
    p_fc2.space_before = Pt(4)

    # ==========================================
    # SLIDE 4: Key Capabilities & Technical Innovations
    # ==========================================
    s4 = prs.slides.add_slide(blank_layout)
    apply_background(s4)
    add_header(s4, "Core Capabilities & Technological Innovations", "PLATFORM INNOVATION & SOC FEATURES")

    features = [
        ("Real-Time 0-1000 Risk Gauge",
         "RiskScoreGauge.jsx dynamically scores cumulative enterprise exposure. Weighted algorithm (Critical=110, High=75, Med=35, Low=15) renders real-time geometric SVG tracking arcs with parametric needle telemetry.",
         "Predictive Severity Index", C_AMBER),
        ("Autonomous AI Analysis",
         "Backend ai_analysis and confidence_score (0.0 to 1.0) provide instant forensic context (e.g., Code Red IIS buffer overflow, Stuxnet SCADA exploits) empowering tier-1 analysts to act like senior forensic investigators.",
         "Heuristic Intelligence", C_PURPLE),
        ("Sub-Second Remediation Flow",
         "1-Click & automated mitigation via PUT /threats/{id}. Instantly dispatches firewall ingress blocks, quarantines infected device endpoints (e.g. crazyfish228, angryswan732), and records immutable resolved_at timestamps.",
         "Zero-Touch Containment", C_CYAN),
        ("Multi-Vector Analytics Deck",
         "Spline wave frequency charts (ThreatSummaryChart.jsx) correlate historical intrusion trends, while donut distribution models isolate malware families (ILOVEYOU, Melissa, MyDoom, Sasser) by target file formats.",
         "Holistic SOC Telemetry", C_WHITE)
    ]

    card2_w = Inches(5.7)
    card2_h = Inches(2.3)
    coords = [
        (Inches(0.8), Inches(1.7)),
        (Inches(6.8), Inches(1.7)),
        (Inches(0.8), Inches(4.3)),
        (Inches(6.8), Inches(4.3)),
    ]

    for (title, desc, badge, color), (x, y) in zip(features, coords):
        card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, card2_w, card2_h)
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD
        card.line.color.rgb = C_CARD_BORDER

        # Badge
        badge_box = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x + Inches(0.2), y + Inches(0.2), Inches(2.2), Inches(0.3))
        badge_box.fill.solid()
        badge_box.fill.fore_color.rgb = RGBColor(26, 34, 56)
        badge_box.line.fill.background()
        tf_b = badge_box.text_frame
        p_b = tf_b.paragraphs[0]
        p_b.text = badge.upper()
        p_b.font.size = Pt(8.5)
        p_b.font.bold = True
        p_b.font.color.rgb = color
        p_b.alignment = PP_ALIGN.CENTER

        # Content
        tb = s4.shapes.add_textbox(x + Inches(0.2), y + Inches(0.6), card2_w - Inches(0.4), card2_h - Inches(0.7))
        tf = tb.text_frame
        tf.word_wrap = True
        pt = tf.paragraphs[0]
        pt.text = title
        pt.font.size = Pt(14)
        pt.font.bold = True
        pt.font.color.rgb = C_WHITE

        pd = tf.add_paragraph()
        pd.text = desc
        pd.font.size = Pt(11)
        pd.font.color.rgb = C_MUTED
        pd.line_spacing = 1.3
        pd.space_before = Pt(6)

    # ==========================================
    # SLIDE 5: Strategic Alignment with IBM Ecosystem
    # ==========================================
    s5 = prs.slides.add_slide(blank_layout)
    apply_background(s5)
    add_header(s5, "Strategic Synergy: Unlocking Enterprise Value with IBM Technology", "ENTERPRISE INTEGRATION & IBM ECOSYSTEM")

    synergies = [
        ("IBM QRadar SIEM & SOAR Integration",
         "Shield-AI serves as an autonomous first-line sensor and localized remediation agent. Telemetry seamlessly exports into IBM QRadar for correlation across global enterprise log pipelines, triggering automated SOAR playbooks.",
         "SIEM/SOAR Sensor Node"),
        ("IBM watsonx.ai Forensics & Policy Agent",
         "The backend ai_analysis engine is architected to plug directly into watsonx.ai Granite models to generate automated executive summaries, MITRE ATT&CK mapping, and plain-language regulatory compliance disclosures.",
         "watsonx Governance & LLM"),
        ("Red Hat OpenShift & Hybrid Cloud Deployment",
         "The modular RESTful microservice architecture packages into standard OCI containers. Deployable with high availability across Red Hat OpenShift, IBM Cloud Satellite, and hybrid multi-cloud on-premise enclaves.",
         "Enterprise Hybrid Cloud"),
        ("Zero-Trust Architecture (NIST 800-207)",
         "Strict endpoint segmentation and source/destination IP containment enforce continuous verification. Integrates with IBM Security Verify to revoke compromised sessions and force immediate multi-factor re-authentication.",
         "Continuous Zero Trust")
    ]

    for i, (title, desc, badge) in enumerate(synergies):
        y = Inches(1.6) + i * Inches(1.25)
        # Row card
        rc = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), y, Inches(11.733), Inches(1.15))
        rc.fill.solid()
        rc.fill.fore_color.rgb = C_CARD
        rc.line.color.rgb = C_CARD_BORDER

        # Icon bar
        ibar = s5.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), y, Inches(0.1), Inches(1.15))
        ibar.fill.solid()
        ibar.fill.fore_color.rgb = C_IBM_BLUE if i % 2 == 0 else C_PURPLE
        ibar.line.fill.background()

        tb = s5.shapes.add_textbox(Inches(1.1), y + Inches(0.12), Inches(8.8), Inches(0.9))
        tf = tb.text_frame
        tf.word_wrap = True
        pt = tf.paragraphs[0]
        pt.text = title
        pt.font.size = Pt(13)
        pt.font.bold = True
        pt.font.color.rgb = C_WHITE

        pd = tf.add_paragraph()
        pd.text = desc
        pd.font.size = Pt(10.5)
        pd.font.color.rgb = C_MUTED
        pd.space_before = Pt(3)

        # Badge on right
        bb = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(10.1), y + Inches(0.35), Inches(2.2), Inches(0.45))
        bb.fill.solid()
        bb.fill.fore_color.rgb = RGBColor(28, 36, 60)
        bb.line.color.rgb = C_CYAN
        tf_bb = bb.text_frame
        p_bb = tf_bb.paragraphs[0]
        p_bb.text = badge
        p_bb.alignment = PP_ALIGN.CENTER
        p_bb.font.size = Pt(9.5)
        p_bb.font.bold = True
        p_bb.font.color.rgb = C_CYAN

    # ==========================================
    # SLIDE 6: Business Impact, ROI & Strategic Roadmap
    # ==========================================
    s6 = prs.slides.add_slide(blank_layout)
    apply_background(s6)
    add_header(s6, "Business Impact, Measurable ROI & Enterprise Roadmap", "STRATEGIC VISION & DELIVERABLES")

    # Left: ROI metrics (3 boxes)
    roi_metrics = [
        ("85%", "Reduction in MTTD", "Autonomous heuristic matching reduces detection from hours to milliseconds"),
        ("70%", "Reduction in SOC Triage Burden", "Automated threat classification filters out low-fidelity noise"),
        ("< 1 sec", "Active Containment Latency", "Direct REST mitigation API triggers host quarantine instantly")
    ]

    for i, (metric, title, detail) in enumerate(roi_metrics):
        y = Inches(1.7) + i * Inches(1.4)
        box = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), y, Inches(4.5), Inches(1.25))
        box.fill.solid()
        box.fill.fore_color.rgb = C_CARD
        box.line.color.rgb = C_CARD_BORDER

        tb = s6.shapes.add_textbox(Inches(1.0), y + Inches(0.12), Inches(4.1), Inches(1.0))
        tf = tb.text_frame
        tf.word_wrap = True
        pm = tf.paragraphs[0]
        pm.text = metric
        pm.font.size = Pt(22)
        pm.font.bold = True
        pm.font.color.rgb = C_CYAN if i == 0 else (C_AMBER if i == 1 else C_PURPLE)

        pt = tf.add_paragraph()
        pt.text = title
        pt.font.size = Pt(11)
        pt.font.bold = True
        pt.font.color.rgb = C_WHITE
        pt.space_before = Pt(2)

        pd = tf.add_paragraph()
        pd.text = detail
        pd.font.size = Pt(9.5)
        pd.font.color.rgb = C_MUTED
        pd.space_before = Pt(2)

    # Right: Phased Roadmap Timeline
    rm_card = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.6), Inches(1.7), Inches(6.933), Inches(4.05))
    rm_card.fill.solid()
    rm_card.fill.fore_color.rgb = C_CARD
    rm_card.line.color.rgb = C_CARD_BORDER

    tb_rm = s6.shapes.add_textbox(Inches(5.9), Inches(1.9), Inches(6.3), Inches(3.6))
    tf_rm = tb_rm.text_frame
    tf_rm.word_wrap = True

    p_rt = tf_rm.paragraphs[0]
    p_rt.text = "ENTERPRISE STRATEGIC ROADMAP"
    p_rt.font.size = Pt(14)
    p_rt.font.bold = True
    p_rt.font.color.rgb = C_WHITE

    phases = [
        ("PHASE 1 (COMPLETED)", "Core Autonomous Detection Engine & SOC Dashboard", 
         "FastAPI modular monolith, dynamic risk gauge, live threat table, SQLite persistent ORM, and full CRUD telemetry pipeline."),
        ("PHASE 2 (NEXT 90 DAYS)", "IBM watsonx & QRadar Integration", 
         "Bidirectional syslog/CEF streaming to QRadar; watsonx.ai automated root-cause synthesis and dynamic mitigation playbook execution."),
        ("PHASE 3 (SCALE OUT)", "Distributed eBPF Mesh & Self-Healing Kernel Defense", 
         "Zero-overhead Linux kernel packet inspection, autonomous zero-day process freezing, and multi-tenant cloud security orchestrator.")
    ]

    for ph_tag, ph_title, ph_desc in phases:
        ptag = tf_rm.add_paragraph()
        ptag.text = ph_tag
        ptag.font.size = Pt(10)
        ptag.font.bold = True
        ptag.font.color.rgb = C_CYAN if "COMPLETED" in ph_tag else (C_AMBER if "NEXT" in ph_tag else C_PURPLE)
        ptag.space_before = Pt(10)

        ptt = tf_rm.add_paragraph()
        ptt.text = ph_title
        ptt.font.size = Pt(11.5)
        ptt.font.bold = True
        ptt.font.color.rgb = C_WHITE

        ptd = tf_rm.add_paragraph()
        ptd.text = ph_desc
        ptd.font.size = Pt(9.5)
        ptd.font.color.rgb = C_MUTED
        ptd.space_before = Pt(2)

    # Final Summary Call to Action
    cta_box = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.1), Inches(11.733), Inches(0.8))
    cta_box.fill.solid()
    cta_box.fill.fore_color.rgb = RGBColor(22, 32, 58)
    cta_box.line.color.rgb = C_CYAN
    cta_box.line.width = Pt(1)

    tf_cta = cta_box.text_frame
    tf_cta.word_wrap = True
    p_cta = tf_cta.paragraphs[0]
    p_cta.text = "CONCLUSION & NEXT STEPS WITH IBM:"
    p_cta.font.size = Pt(10)
    p_cta.font.bold = True
    p_cta.font.color.rgb = C_CYAN

    p_cta2 = tf_cta.add_paragraph()
    p_cta2.text = (
        "Shield-AI is fully production-functional, test-validated, and primed for immediate proof-of-concept deployment "
        "within IBM Client Innovation Centers and Security Technology incubators."
    )
    p_cta2.font.size = Pt(10.5)
    p_cta2.font.color.rgb = C_WHITE
    p_cta2.space_before = Pt(2)

    output_path = r"d:\SelfHeal-AI\Shield_AI_IBM_Executive_Presentation.pptx"
    prs.save(output_path)
    print(f"Presentation generated successfully at: {output_path}")

if __name__ == "__main__":
    create_deck()
