import type { Project } from "./types";

/**
 * THE PROJECT CATALOGUE.
 *
 * - Order here = order on /projects.
 * - Homepage selection and order live in site.ts (`featured`).
 * - A project with `details` gets its own page at /projects/<slug>.
 * - Run `npm run validate` after editing: it checks slugs, links, categories
 *   and that every image file exists with the stated size.
 *
 * Every fact below comes from the CV, the project's repository/README, its
 * evaluation files or its reports. See README.md → "Adding a project".
 */
export const projects: Project[] = [
  // ───────────────────────────────────────────────────────────── AURA
  {
    slug: "aura-ecosystem",
    title: "AURA — AI Real-Estate Intelligence Ecosystem",
    tagline:
      "Three connected products that turn 1.25M Portuguese property records into explainable valuations, grounded LLM answers and executive decisions.",
    summary:
      "Industry capstone with FAIRBANK in Lisbon. As the sole engineer I built the data pipeline, the valuation models, the FastAPI services and the React/TypeScript interfaces of three integrated products: a valuation platform, a local LLM analytics assistant and an executive intelligence hub.",
    year: "2026",
    context: "Software Engineering capstone · industry partner FAIRBANK, Lisbon",
    role: "Sole engineer — data, machine learning, backend and frontend",
    award: "Capstone grade A (30 ECTS)",
    categories: ["software", "ai-ml", "data"],
    tech: [
      "Python",
      "FastAPI",
      "LightGBM",
      "CatBoost",
      "PyTorch (FT-Transformer)",
      "SHAP",
      "Polars",
      "DuckDB",
      "Ollama (Qwen)",
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "pytest",
    ],
    resources: [
      {
        kind: "docs",
        label: "Project documentation",
        href: "https://github.com/Achref47/AURA-Ecosystem",
        note: "public repository of reports, architecture and screenshots",
      },
      { kind: "video", label: "Official demo", href: "https://www.youtube.com/watch?v=7xLjv7RZoCM" },
      {
        kind: "source",
        label: "Early prototype (V4) source",
        href: "https://github.com/Achref47/Aura-real-estate-intelligence",
        note: "first public prototype, not the final products",
      },
    ],
    availabilityNote:
      "The source code of the three final products (Platform, Assistant, Intelligence Hub) is in private repositories and is not publicly available.",
    cover: {
      type: "image",
      src: "/projects/aura-ecosystem/platform-seller-dashboard.webp",
      width: 1600,
      height: 905,
      alt: "AURA Platform executive dashboard showing a Lisbon apartment's fair price of €263,378, a WAIT decision, confidence and market context.",
    },
    media: [
      {
        type: "youtube",
        videoId: "7xLjv7RZoCM",
        title: "AURA Ecosystem — official demo",
        poster: "/projects/aura-ecosystem/platform-seller-dashboard.webp",
        caption: "Walkthrough of the three products.",
      },
    ],
    metrics: [
      { value: "1.25M", label: "property records fused into a 174-feature panel (2019–2025)" },
      { value: "R² 0.968", label: "FT-Transformer on 360K held-out 2024–25 properties (MAPE 4.05%)" },
      { value: "355 / 0", label: "assistant tests passed / failed at freeze" },
      { value: "0%", label: "table or column hallucination in a 20-question live battery" },
    ],
    details: {
      overview: [
        "AURA (Adaptive Unified Real Estate Intelligence Engine) is my Software Engineering capstone, built during a six-month internship with FAIRBANK, a Portuguese PropTech company, for its Rezerva platform. It is one ecosystem made of three products that share a data foundation and can also run on their own.",
        "I was the only engineer on the project — from scraping and data integration to model training, API design, the LLM assistant and the user interfaces. The capstone received grade A.",
      ],
      problem: [
        "Property information in Portugal is spread across listings, macroeconomic series and geospatial, regulatory and tourism sources. Asking prices rarely match market value, and most valuation tools return a single number without saying how confident they are or why.",
        "The goal was valuations that a seller or analyst can audit — with an uncertainty band, an explanation and market context — and tools that refuse to answer rather than invent numbers when the data cannot support an answer.",
      ],
      solution: [
        "AURA AI Platform — a seller-facing valuation and decision engine: fair value, conformal price band, confidence, sale probability, time on market and a recommended action, next to read-only municipal market context.",
        "AURA AI Assistant — a local-first natural-language analytics assistant that turns questions into validated, read-only SQL and grounded explanations, and declines honestly when data is missing.",
        "AURA Intelligence Hub — an executive decision-support suite for portfolios: health, opportunities, benchmarking, comparison, strategy simulation, alerts and a decision ledger, computed only from real dataset aggregations.",
      ],
      contribution: [
        "Designed and built the data pipeline that fused listing, macroeconomic, geospatial, regulatory and tourism data for 41 municipalities; removed 44 leaking or redundant features.",
        "Trained and compared LightGBM, CatBoost and FT-Transformer valuation models on time-based splits, and packaged a LightGBM-primary runtime with conformal intervals and SHAP explanations.",
        "Built the FastAPI services, including model versioning with rollback, md5-verified model artifacts and PSI drift monitoring.",
        "Engineered the multi-agent assistant (intent routing, text-to-SQL, forecasting and comparison agents, RAG, governance gates) and its test suite.",
        "Built the React/TypeScript front ends and integrated the assistant into the platform through a FastAPI gateway.",
        "Ran the project with Scrum-style sprints, architecture decision records and validation reports for every sprint.",
      ],
      architecture: {
        intro:
          "One data foundation, three products. Predictive outputs and descriptive market context are kept on separate planes and only combined in the interface.",
        steps: [
          {
            title: "Data foundation",
            detail: "Scraped and integrated sources into a 1.25M-row, 174-feature panel; DuckDB and Polars for the analytical layers.",
          },
          {
            title: "Model training",
            detail: "LightGBM, CatBoost and FT-Transformer on time-based splits (train 2019–23, validate 2024, test 2025).",
          },
          {
            title: "Platform API",
            detail: "FastAPI: LightGBM-primary runtime, CQR conformal bands, SHAP explanations, decision engine, drift monitoring.",
          },
          {
            title: "Assistant",
            detail: "Orchestrator → schema-scoped SQL → allowlist validation → read-only DuckDB → confidence and governance gates.",
          },
          {
            title: "Intelligence Hub",
            detail: "FastAPI + Polars services behind one shared orchestrator; portfolio, benchmark, strategy and alert modules.",
          },
          {
            title: "Interfaces",
            detail: "React + TypeScript front ends; the assistant is embedded in the platform through a FastAPI gateway.",
          },
        ],
      },
      components: [
        {
          name: "AURA AI Platform",
          role: "Product 1 · Valuation & seller decisions",
          summary:
            "Enter a property and get a fair value with a conformal price band, confidence, sale probability, expected time on market and a SELL NOW / WAIT / REDUCE PRICE recommendation — with the reasons behind it and read-only market context for the municipality.",
          points: [
            "LightGBM-primary runtime with bias correction and CQR conformal bands; CatBoost used as a disagreement check.",
            "Explainability page (\"Why should I trust this?\") built on SHAP-based drivers and confidence signals.",
            "Model artifacts are md5-verified against a manifest at load time; release candidate passed 20/20 backend regression tests with a clean TypeScript build.",
            "Market, municipality, comparison, liquidity and opportunity pages over the contextual datasets.",
          ],
          tech: ["FastAPI", "LightGBM", "CatBoost", "SHAP", "scikit-learn", "React", "TypeScript", "Vite"],
          access: "Private repository — code not public",
          media: [
            {
              type: "image",
              src: "/projects/aura-ecosystem/platform-property-intelligence.webp",
              width: 1507,
              height: 1079,
              alt: "Property Intelligence page with a fair value of €263,378, its price band, a moderate confidence and time-on-market estimate.",
              caption: "Property intelligence: fair value, band, confidence and decision.",
            },
            {
              type: "image",
              src: "/projects/aura-ecosystem/platform-trust.webp",
              width: 1600,
              height: 896,
              alt: "Explainability and trust page listing the factors behind a valuation and the confidence breakdown.",
              caption: "\"Why should I trust this?\" — drivers and confidence behind a valuation.",
            },
            {
              type: "image",
              src: "/projects/aura-ecosystem/platform-heatmaps.webp",
              width: 1600,
              height: 742,
              alt: "Liquidity heatmap of Portuguese municipalities coloured from red to green.",
              caption: "Liquidity, volatility and tourism heatmaps across municipalities.",
            },
            {
              type: "image",
              src: "/projects/aura-ecosystem/platform-comparison.webp",
              width: 1600,
              height: 918,
              alt: "Municipality and regional comparison page with a head-to-head table.",
              caption: "Municipality and regional comparison.",
            },
          ],
        },
        {
          name: "AURA AI Assistant",
          role: "Product 2 · Natural-language analytics",
          summary:
            "Ask a question about Portuguese real-estate or tourism data and get validated SQL results with a grounded explanation — running entirely on a local LLM, and built to decline rather than fabricate.",
          points: [
            "Multi-agent orchestrator routes each question (intent → domain → SQL or specialist agent for forecasting and comparison).",
            "Generated SQL is validated against an allowlist of known tables and columns and executed read-only over eight curated DuckDB tables.",
            "Governance blocks destructive SQL and prompt-injection attempts; composite signals that cannot be recomputed are always declined.",
            "Benchmark-driven model policy on Ollama: qwen2.5-7B for standard and deep modes (won a 48-question accuracy benchmark), qwen3-4B for fast mode.",
          ],
          tech: ["Python", "FastAPI", "DuckDB", "Ollama", "Qwen", "RAG", "pytest", "React", "TypeScript"],
          access: "Private repository — code not public",
          media: [
            {
              type: "image",
              src: "/projects/aura-ecosystem/assistant-intro.webp",
              width: 1600,
              height: 904,
              alt: "AURA Assistant chat introducing its capabilities: forecasting, risk analysis, hotspot detection and comparisons.",
              caption: "The assistant describing what it can and cannot analyse.",
            },
            {
              type: "image",
              src: "/projects/aura-ecosystem/assistant-sql-answer.webp",
              width: 1600,
              height: 891,
              alt: "Assistant answering the average price per square metre in Lisboa (€5,846) and stating the data limitations.",
              caption: "A data answer computed from the dataset, with its limitations stated.",
            },
            {
              type: "image",
              src: "/projects/aura-ecosystem/assistant-governance.webp",
              width: 1600,
              height: 761,
              alt: "Assistant refusing a 'drop table' request with a governance message about destructive SQL.",
              caption: "Governance blocking a destructive SQL request.",
            },
            {
              type: "image",
              src: "/projects/aura-ecosystem/assistant-injection.webp",
              width: 1126,
              height: 748,
              alt: "Assistant declining a prompt-injection attempt asking it to reveal its hidden system prompt.",
              caption: "Prompt-injection attempt declined.",
            },
          ],
        },
        {
          name: "AURA Intelligence Hub",
          role: "Product 3 · Executive decision support",
          summary:
            "A deterministic, dataset-first suite for portfolio managers. Every number on screen is computed from real dataset aggregations — no forecasting model and no LLM in the scoring path — and missing data is reported instead of hidden.",
          points: [
            "React + TypeScript front end (React Query, Zustand, Tailwind) over FastAPI + Polars services.",
            "One shared orchestrator over market, tourism, volatility and spatial intelligence services (datasets of 2.07M and 4.69M rows).",
            "Scoring governance: registered scores are bounded to [0, 100] and all weights live in reviewable config modules.",
            "A process-level dataset cache cut a per-request market query from about 5.9 s to 0.18 s; every request carries a correlation ID and latency header.",
          ],
          tech: ["FastAPI", "Polars", "Pydantic", "React", "TypeScript", "React Query", "Zustand", "Tailwind CSS"],
          access: "Private repository — code not public",
          media: [
            {
              type: "image",
              src: "/projects/aura-ecosystem/hub-executive.webp",
              width: 1600,
              height: 770,
              alt: "Executive Decision Center showing portfolio health 39.6, three critical alerts, two opportunities and today's brief.",
              caption: "Executive Decision Center.",
            },
            {
              type: "image",
              src: "/projects/aura-ecosystem/hub-strategy-lab.webp",
              width: 1467,
              height: 792,
              alt: "Strategy Lab with a diversification score of 64.6, concentration by municipality and opportunity exposure.",
              caption: "Strategy Lab: concentration and exposure analysis.",
            },
            {
              type: "image",
              src: "/projects/aura-ecosystem/hub-compare.webp",
              width: 1486,
              height: 673,
              alt: "Comparison Center table comparing Lisboa and Sintra on opportunity, momentum, tourism, risk and confidence.",
              caption: "Side-by-side municipality comparison with confidence labels.",
            },
            {
              type: "image",
              src: "/projects/aura-ecosystem/hub-alerts.webp",
              width: 1545,
              height: 877,
              alt: "Alerts Center listing governance warnings and data-quality warnings for portfolio assets.",
              caption: "Alerts and explicit data-quality warnings.",
            },
          ],
        },
      ],
      decisions: [
        "Time-based splits instead of random ones, so validation measures predicting future prices rather than interpolating the past.",
        "Two planes that are never fused: predictive outputs (valuation, decision) stay separate from descriptive market context and are combined only in the interface — recorded as an architecture decision (ADR-009).",
        "Honesty over coverage: the assistant permanently declines five composite signals that cannot be recomputed, and reports volatility as UNKNOWN rather than a false LOW.",
        "Local-first LLM on Ollama keeps property data on the machine and removes per-request API cost; the default model was chosen by benchmark, not by size.",
      ],
      results: [
        "FT-Transformer valuation model: R² 0.968, MAPE 4.05% on 360K held-out 2024–25 properties; rolling validation R² 0.94.",
        "Assistant test suite: 355 passed, 0 failed, 96 skipped (guards for live-model paths); 0% table and column hallucination and 100% honest declines of unavailable signals in a 20-question live battery.",
        "Platform release candidate: zero critical defects, clean TypeScript build and 20/20 backend regression tests at freeze.",
        "Capstone grade A.",
      ],
      limitations: [
        "Assistant answers in standard mode are LLM-bound: about 42 s median on local hardware.",
        "The Intelligence Hub stores portfolios in a JSON file and authentication is disabled in the defense build; both have documented upgrade paths.",
        "Container, CI and authentication hardening for the platform were scheduled after the freeze.",
      ],
    },
  },

  // ───────────────────────────────────────────────────────────── Fuel Planner
  {
    slug: "fuel-planner-api",
    title: "Fuel Planner API",
    tagline: "A Django REST API that plans the cheapest fuel stops for a U.S. road trip, with one routing request per new trip.",
    summary:
      "Give it a start and a finish; it returns the route as GeoJSON, the cost-minimising fuel stops for a 500-mile-range vehicle and the total fuel cost. Built for a backend engineering take-home, with an exact optimiser verified against brute force and 495 tests.",
    year: "2026",
    context: "Backend engineering take-home assessment",
    role: "Sole developer",
    categories: ["software"],
    tech: ["Python", "Django", "Django REST Framework", "NumPy", "SciPy", "OSRM", "SQLite", "pytest", "GitHub Actions", "Render"],
    resources: [
      { kind: "source", label: "Source code", href: "https://github.com/Achref47/Fuel-Planner-API" },
      {
        kind: "live",
        label: "Live API (health check)",
        href: "https://fuel-planner-api.onrender.com/api/v1/health/",
        note: "synthetic demo data; free tier may take ~1 min to wake",
      },
      { kind: "video", label: "Demo video", href: "https://www.youtube.com/watch?v=frWYPvEN9MQ" },
    ],
    cover: {
      type: "image",
      src: "/projects/fuel-planner-api/architecture.webp",
      width: 1600,
      height: 800,
      alt: "Fuel Planner API request pipeline: request, validate, resolve locations, route, match stations, optimise.",
    },
    media: [
      {
        type: "youtube",
        videoId: "frWYPvEN9MQ",
        title: "Fuel Route Planner API — 4½-minute demo",
        poster: "/projects/fuel-planner-api/video-poster.webp",
      },
      {
        type: "image",
        src: "/projects/fuel-planner-api/architecture.webp",
        width: 1600,
        height: 800,
        alt: "Diagram of the six-stage request pipeline from the POST request to the dynamic-programming optimiser.",
        caption: "Request pipeline (from the demo video).",
      },
      {
        type: "image",
        src: "/projects/fuel-planner-api/optimizer.webp",
        width: 1600,
        height: 800,
        alt: "Excerpt of the optimiser source explaining the two facts that reduce the search space.",
        caption: "The two facts that make the dynamic programme exact and fast.",
      },
    ],
    metrics: [
      { value: "495", label: "tests, no network needed" },
      { value: "≈99.4%", label: "line coverage" },
      { value: "1 → 0", label: "routing calls for a new trip → the same trip again" },
      { value: "960", label: "random instances matched against exhaustive search" },
    ],
    details: {
      overview: [
        "A backend take-home that I treated as a production service: strict request validation, one consistent error format, rate limiting, a health endpoint, CI configuration and a public demo deployment on Render.",
      ],
      problem: [
        "The supplied fuel-price file lists about 6,600 U.S. stations with prices but no coordinates. The API has to place them on a map without geocoding each one, find the ones near a route, and choose stops that minimise total cost without ever running out of fuel — while calling the external routing service as little as possible.",
      ],
      solution: [
        "POST /api/v1/fuel-route/ accepts a city, ZIP code, coordinates or street address for each end, and returns the route geometry, each stop with gallons bought and cost, leg-by-leg fuel use and the total cost — or GeoJSON for a map.",
        "Station coordinates are derived offline from public U.S. gazetteer data; stations near the route are found with a KD-tree on the unit sphere after resampling the route every 0.5 mi.",
        "A dynamic programme chooses the cheapest feasible stops; a Decimal ledger replays the plan and refuses to return one that runs dry, overfills or fails to reconcile.",
        "One OSRM request per new trip, cached, with collapsing of simultaneous identical requests, throttling, timeouts and a distinct error for every failure mode.",
      ],
      architecture: {
        steps: [
          { title: "Validate", detail: "DRF serializers; unknown keys rejected; stable machine-readable error codes." },
          { title: "Resolve", detail: "Offline place table, ZIP or coordinates; Census geocoder only for street addresses." },
          { title: "Route", detail: "One OSRM request returns the full geometry; successes cached, failures never." },
          { title: "Match", detail: "Resample every 0.5 mi; KD-tree finds stations within the detour limit." },
          { title: "Optimise", detail: "Exact dynamic programme over candidates in route order, O(n·m·log m)." },
          { title: "Account", detail: "Decimal ledger re-simulates every leg before the response is built." },
        ],
      },
      decisions: [
        "Two facts shrink the search: stopping without buying never helps, and between two buying stops an optimal plan either fills the tank or buys just enough to arrive empty — so fuel on arrival takes one of three values.",
        "Money in Decimal with half-up rounding to the cent, so totals reconcile exactly.",
        "The private assessment CSV is never committed; the public demo runs on clearly labelled synthetic stations, and every demo response says so.",
        "The routing provider is replaceable through configuration; every response reports external calls and elapsed time so the 'one request per trip' claim is checkable.",
      ],
      results: [
        "Optimiser matches exhaustive search on 960 random instances and an independently written exact solver on 190 realistic instances; 15 property tests; 39 deliberately injected bugs were all caught.",
        "495 tests run without network access; about 99.4% line coverage.",
        "Optimiser runs in about 9 ms for 176 candidates; a repeated coast-to-coast request is served from cache in about 30–40 ms with zero external calls.",
      ],
      limitations: [
        "Station positions are city-level, so a station near the corridor edge can be missed or included.",
        "The public OSRM server is best-effort and rate-limited; contiguous U.S. only; range and mpg are fixed by the brief.",
      ],
    },
  },

  // ───────────────────────────────────────────────────────────── Spotter
  {
    slug: "spotter-weather-routing",
    title: "Spotter — Weather-Aware Truck Routing",
    tagline: "Ranks up to three truck routes by the forecast at each checkpoint's arrival time and by the weight of the load.",
    summary:
      "A React/TypeScript and Django REST Framework app: enter origin, destination, departure time and load weight, and it samples the forecast where the truck will be at each checkpoint, classifies the risk and recommends the safest route with a step-by-step explanation on a MapLibre map.",
    year: "2026",
    context: "Independent project",
    role: "Sole developer",
    categories: ["software", "data"],
    tech: ["React", "TypeScript", "Vite", "MapLibre GL", "Django", "Django REST Framework", "Mapbox Directions", "Open-Meteo", "Render"],
    resources: [
      { kind: "source", label: "Source code", href: "https://github.com/Achref47/spotter-weather-routing" },
      {
        kind: "live",
        label: "Live app",
        href: "https://spotter-web-hqv1.onrender.com",
        note: "free tier; try the simulated storm demo",
      },
      { kind: "video", label: "Walkthrough video", href: "https://youtu.be/ZtrUB_0MrGc" },
    ],
    cover: {
      type: "image",
      src: "/projects/spotter-weather-routing/video-poster.webp",
      width: 1280,
      height: 720,
      alt: "Spotter walkthrough thumbnail showing the route map interface.",
    },
    media: [
      {
        type: "youtube",
        videoId: "ZtrUB_0MrGc",
        title: "Weather-Aware Truck Routing — walkthrough",
        poster: "/projects/spotter-weather-routing/video-poster.webp",
        caption: "Recorded locally, with a short tour of the hosted deployment at the end.",
      },
    ],
    details: {
      overview: [
        "Route planners optimise for time. Spotter answers a different question for a truck driver: which route is safest, given the weather where the truck will actually be at each point of the trip?",
      ],
      problem: [
        "Weather risk depends on timing and on the vehicle. A forecast for 'now' says little about a checkpoint the truck reaches in six hours, and a crosswind that is manageable with a light load can be dangerous with a heavy one.",
      ],
      solution: [
        "Up to three distinct routes, with checkpoints every 10, 25 or 50 miles and an estimated arrival time at each.",
        "The forecast is sampled at each checkpoint's arrival time (batched requests), then wind, rain and snow are classified on a five-level scale with load-weight overrides for wind.",
        "Routes are ranked lexicographically — a safety gate, then fewest Severe miles, fewest High miles, lowest average risk and shortest time — and a 'Why this route?' panel shows exactly which criterion decided.",
        "Interactive map with route popups, a corridor heatmap with a 0–48 h forecast slider, a checkpoint table and a downloadable CSV trip report.",
        "A clearly labelled simulated storm demo that works without any weather service.",
      ],
      architecture: {
        steps: [
          { title: "Throttle", detail: "Per-client limit runs before any upstream call; returns 429 with a wait time." },
          { title: "Geocode", detail: "Nominatim resolves origin and destination." },
          { title: "Route", detail: "Mapbox Directions returns up to three alternatives." },
          { title: "Checkpoints", detail: "Points along each route with estimated arrival times." },
          { title: "Forecast", detail: "Open-Meteo, batched, matched to each arrival time." },
          { title: "Risk & rank", detail: "Pure domain functions classify risk, rank routes and build the heatmap." },
        ],
      },
      decisions: [
        "A lexicographic order instead of a weighted score, so a route with any No-Travel miles can never win while a safer one exists, and the explanation is exact.",
        "Missing weather values stay 'unknown' — they are never converted to Low or zero, and unknown miles are reported separately.",
        "All business rules live in pure domain functions with no network access; anything that talks to an outside service lives in a separate services layer.",
        "Stateless backend: no database or authentication; everything needed arrives in the request.",
      ],
      results: [
        "Deployed on Render (web app and API); the simulated storm demo runs on the hosted site.",
        "Backend tests cover risk thresholds and boundaries, load overrides, ranking, unknown handling, throttling and production settings; frontend tests cover validation, messages, map data, the explanation panel and CSV export (including formula-injection protection). No test calls an external API.",
      ],
      limitations: [
        "Arrival times use Mapbox's car profile, so truck ETAs are optimistic.",
        "Forecasts are grid-model estimates; on the free hosted tier the live weather quota can be exhausted, so live comparison may fail there while working locally.",
      ],
    },
  },

  // ───────────────────────────────────────────────────────────── ECG
  {
    slug: "ecg-arrhythmia-analysis",
    title: "ECG Arrhythmia Classification with GANs and Transformers",
    tagline: "Generated synthetic heartbeats with a GAN and tested whether they help a Transformer classify arrhythmias on MIT-BIH.",
    summary:
      "A PyTorch study on the MIT-BIH Arrhythmia Database: R-peak beat segmentation, a Wasserstein GAN that generates synthetic beats, and Transformer classifiers trained on raw, cleaned and GAN-augmented data — with attention-based explainability and a Streamlit demo app.",
    year: "2025",
    context: "Academic project",
    role: "Co-developer",
    team: "Two-person team: Achref Elarbi and Sahar Bahloul (equal contribution)",
    categories: ["ai-ml", "data"],
    tech: ["Python", "PyTorch", "Transformer encoder", "WGAN-GP", "WFDB", "NumPy", "scikit-learn", "Streamlit", "Jupyter"],
    resources: [{ kind: "source", label: "Notebook & code", href: "https://github.com/Achref47/ecg-arrhythmia-analysis" }],
    cover: {
      type: "image",
      src: "/projects/ecg-arrhythmia-analysis/attention-explainability.webp",
      width: 1600,
      height: 1067,
      alt: "ECG beat with attention highlights, an attention importance curve and an attention heatmap.",
    },
    media: [
      {
        type: "image",
        src: "/projects/ecg-arrhythmia-analysis/attention-explainability.webp",
        width: 1600,
        height: 1067,
        alt: "Four panels: an ECG beat with the top attention peaks on the QRS complex, the attention importance curve, the attention heatmap averaged over heads, and head-wise attention strength.",
        caption: "Beat-level explainability: attention concentrates on the QRS complex.",
      },
      {
        type: "image",
        src: "/projects/ecg-arrhythmia-analysis/confusion-matrix-raw.webp",
        width: 800,
        height: 600,
        alt: "Confusion matrix of the raw-data Transformer over six beat classes; most errors are minority classes predicted as normal.",
        caption: "Raw-data model, separate evaluation report on 2,841 beats (95.6% accuracy).",
      },
    ],
    metrics: [
      { value: "97.5%", label: "accuracy of the best (raw-data) Transformer on 2,641 held-out beats" },
      { value: "0.68", label: "macro-F1 across six imbalanced classes" },
      { value: "TS-FID 0.45", label: "fidelity of GAN-generated beats" },
    ],
    details: {
      overview: [
        "An end-to-end research workflow, from raw MIT-BIH records to an interactive Streamlit app that highlights abnormal beats on the waveform and aggregates beat predictions into rhythm-level observations. Built for education and research — not a diagnostic device.",
      ],
      problem: [
        "Arrhythmic beats are rare compared with normal beats, so classifiers tend to learn the majority class and look accurate while missing the beats that matter. We wanted to know whether GAN-generated beats would improve minority-class performance.",
      ],
      solution: [
        "Segmented heartbeats around R-peaks into fixed windows using WFDB annotations.",
        "Trained a Wasserstein GAN with gradient penalty to synthesise beats, evaluated with TS-FID, DTW, MSE and MAE.",
        "Trained the same Transformer encoder on three datasets — raw, cleaned, and mixed with GAN beats — and compared accuracy, per-class scores and confusion matrices.",
        "Added beat-level explainability from attention weights, rhythm-level inference and a Streamlit interface.",
      ],
      results: [
        "The raw-data model performed best: 97.46% accuracy and macro-F1 0.68 on 2,641 held-out beats. The cleaned and GAN-mixed models reached 90.8% and 89.1%.",
        "The honest finding: GAN augmentation did not help here — cleaning and mixing removed beat morphology the classifier relied on, and minority classes (notably atrial beats) suffered most.",
        "Macro-F1 is far below accuracy, which shows how much class imbalance inflates headline accuracy.",
      ],
      limitations: [
        "Single dataset (MIT-BIH) and a single lead; results vary between evaluation runs (a separate report on 2,841 beats gives 95.6%).",
        "Not clinically validated.",
      ],
    },
  },

  // ───────────────────────────────────────────────────────────── TaskFlow
  {
    slug: "taskflow-ai",
    title: "TaskFlow AI",
    tagline: "Full-stack project and task manager with JWT authentication and a Gemini-powered assistant.",
    summary:
      "A technical-test submission: a React front end and an Express/MySQL API where users register, sign in, create projects and manage tasks with status, priority and due date, plus an assistant for task-related questions.",
    year: "2025",
    context: "Technical test submission",
    role: "Sole developer",
    categories: ["software"],
    tech: ["React", "React Router", "Tailwind CSS", "Framer Motion", "Axios", "Node.js", "Express", "MySQL", "JWT", "bcrypt", "Google Gemini API"],
    resources: [{ kind: "source", label: "Source code", href: "https://github.com/Achref47/TaskFlow-AI" }],
    cover: {
      type: "image",
      src: "/projects/taskflow-ai/projects.webp",
      width: 1600,
      height: 766,
      alt: "TaskFlow AI 'My Projects' page with a form to add a project and five project cards.",
    },
    media: [
      {
        type: "image",
        src: "/projects/taskflow-ai/projects.webp",
        width: 1600,
        height: 766,
        alt: "Projects page with a create-project form, a search box and project cards.",
        caption: "Projects: create, search and open.",
      },
      {
        type: "image",
        src: "/projects/taskflow-ai/task-modal.webp",
        width: 1600,
        height: 766,
        alt: "Project modal for adding tasks with status, priority and due date, with sorting and filtering controls.",
        caption: "Tasks with status, priority, due date, sorting and filters.",
      },
      {
        type: "image",
        src: "/projects/taskflow-ai/assistant.webp",
        width: 1600,
        height: 766,
        alt: "TaskFlow AI assistant chat panel answering a user.",
        caption: "The Gemini-powered assistant.",
      },
      {
        type: "image",
        src: "/projects/taskflow-ai/login.webp",
        width: 1600,
        height: 766,
        alt: "Sign-in screen with email and password fields.",
        caption: "Authentication.",
      },
    ],
    details: {
      overview: [
        "A full-stack application written for a technical assessment. It is not deployed; it runs locally against MySQL.",
      ],
      solution: [
        "Registration and login with bcrypt-hashed passwords and JSON Web Tokens (one-hour expiry).",
        "Protected REST endpoints for creating and listing projects and for creating, updating and deleting tasks.",
        "All SQL goes through parameterised mysql2 queries.",
        "A chatbot route that forwards questions to Google's Gemini 1.5 Flash model.",
        "Responsive React interface with Tailwind CSS and Framer Motion transitions.",
      ],
      architecture: {
        steps: [
          { title: "React SPA", detail: "React Router pages; Axios sends the bearer token." },
          { title: "Express API", detail: "/auth, /projects, /tasks and /chatbot routes." },
          { title: "JWT check", detail: "Middleware verifies the token on project and task routes." },
          { title: "MySQL", detail: "Parameterised queries via mysql2 for users, projects and tasks." },
          { title: "Gemini", detail: "Chatbot requests go to Gemini 1.5 Flash." },
        ],
      },
      limitations: [
        "No automated test suite beyond the default scaffold.",
        "The token is stored in localStorage; HTTP-only cookies would be the next step.",
      ],
    },
  },

  // ───────────────────────────────────────────────────────────── Privilege Travel
  {
    slug: "privilege-travel-platform",
    title: "Privilege Travel — AI Travel-Booking Platform",
    tagline: "Flight and hotel booking with a Gemini chatbot, security alerting and an analytics admin dashboard.",
    summary:
      "Built during my internship at Privilege Travel in Tunis as the only full-stack developer in a three-person team: a React/Redux front end, Node.js/Express REST APIs and MySQL, with email vouchers, a Chart.js admin dashboard and a Google Gemini chatbot.",
    year: "2024–2025",
    context: "Internship · Privilege Travel, Tunis",
    role: "Full-stack developer and Scrum Master",
    team: "Three-person team",
    categories: ["software"],
    tech: ["React", "Redux", "Node.js", "Express", "MySQL", "JWT", "bcrypt", "Chart.js", "Google Gemini API"],
    resources: [],
    availabilityNote:
      "Company project: the source code and the full demo recording are not public. The screenshots are taken from my own demo recording.",
    cover: {
      type: "image",
      src: "/projects/privilege-travel-platform/hostels.webp",
      width: 1356,
      height: 640,
      alt: "Privilege Travel hostel listing with prices per night and booking buttons.",
    },
    media: [
      {
        type: "image",
        src: "/projects/privilege-travel-platform/hostels.webp",
        width: 1356,
        height: 640,
        alt: "Hostel listings for Miami and New York with ratings, dates and prices in Tunisian dinars.",
        caption: "Hostel search and booking.",
      },
      {
        type: "image",
        src: "/projects/privilege-travel-platform/admin-analytics.webp",
        width: 1356,
        height: 640,
        alt: "Admin dashboard with charts of the most booked hostels and flight routes and the TravelMate AI assistant panel.",
        caption: "Admin analytics and the TravelMate AI assistant.",
      },
      {
        type: "image",
        src: "/projects/privilege-travel-platform/faq.webp",
        width: 1356,
        height: 640,
        alt: "FAQ page with collapsible questions about booking flights and hostels.",
        caption: "Dynamic FAQ — a feature I proposed during sprint planning.",
      },
    ],
    metrics: [
      { value: "85%", label: "of chatbot requests resolved without staff help (pilot testing)" },
      { value: "92%", label: "test coverage on critical backend paths" },
      { value: "198 ms", label: "average API response time" },
    ],
    details: {
      overview: [
        "Privilege Travel is a Tunisian travel agency competing with global booking sites. I designed and built its booking platform end to end during my internship, and acted as Scrum Master for the team.",
      ],
      problem: [
        "Bookings were handled manually, which made customers wait for staff and made it hard for the agency to see what was selling. The agency needed self-service booking, quick answers to common questions and a secure admin back office.",
      ],
      solution: [
        "Complete booking lifecycle for flights and hostels: search, selection, confirmation and automatically emailed vouchers.",
        "A customer chatbot built on the Google Gemini API for questions such as finding flights or budget hotel recommendations.",
        "Account security: JWT authentication, bcrypt password hashing, lockout after repeated failed logins and IP-geolocation alerts to administrators.",
        "Admin dashboard with Chart.js analytics, user management, one-click booking confirmation and voucher generation, and an action history.",
      ],
      contribution: [
        "Designed and built the full stack (React/Redux, Node.js/Express, MySQL) as the only full-stack developer.",
        "Integrated the Gemini chatbot and built the security system.",
        "Acted as Scrum Master for four two-week sprints and mentored two teammates.",
      ],
      results: [
        "In pilot testing the chatbot resolved 85% of requests without staff help, and engagement was 47% higher than with the previous manual process.",
        "92% test coverage on critical backend paths and a 198 ms average API response time; more than 200 test bookings processed without errors.",
      ],
    },
  },

  // ───────────────────────────────────────────────────────────── PawPaw
  {
    slug: "pawpaw",
    title: "PawPaw — Pet Matchmaking App",
    tagline: "Cross-platform React Native app where pet owners create profiles, match, chat and share profiles by QR code.",
    summary:
      "An Expo / React Native app with Firebase authentication, pet profiles, matching, real-time chat over a Socket.IO server, QR-code profile sharing and a Gemini-powered pet-care chatbot. Awarded Second Prize.",
    year: "2024",
    context: "Academic project",
    role: "Developer",
    award: "Second Prize",
    categories: ["mobile"],
    tech: ["React Native", "Expo", "JavaScript", "Firebase Auth", "Socket.IO", "Node.js", "Google Gemini API", "React Navigation"],
    resources: [{ kind: "source", label: "Source code", href: "https://github.com/Achref47/PawPaww" }],
    cover: {
      type: "image",
      src: "/projects/pawpaw/screen-1.webp",
      width: 500,
      height: 1280,
      alt: "PawPaw welcome screen with paw prints and a Join Now button.",
    },
    media: [
      {
        type: "image",
        src: "/projects/pawpaw/screen-1.webp",
        width: 500,
        height: 1280,
        alt: "Welcome screen: 'Let's Get Started' with a Join Now button.",
        caption: "Onboarding.",
      },
      {
        type: "image",
        src: "/projects/pawpaw/screen-2.webp",
        width: 500,
        height: 1280,
        alt: "Login screen with email and password and Facebook and Google buttons.",
        caption: "Sign-in.",
      },
      {
        type: "image",
        src: "/projects/pawpaw/screen-4.webp",
        width: 500,
        height: 760,
        alt: "Settings screen with language, dark mode, location and notification options.",
        caption: "Settings, including dark mode.",
      },
    ],
    details: {
      overview: [
        "A social app for pet owners: create profiles for dogs, cats, birds and bunnies, discover other pets, match, and chat to arrange meetups. The project won Second Prize.",
      ],
      solution: [
        "Firebase Authentication for sign-up and login.",
        "Pet profile creation with photos, matching and a matches screen.",
        "Real-time chat backed by a Node.js Socket.IO server.",
        "QR-code profile sharing for in-person connections.",
        "An in-app chatbot built on the Google Gemini API for pet-care questions.",
        "Settings with dark mode, language and location preferences.",
      ],
      architecture: {
        steps: [
          { title: "Expo app", detail: "React Native screens with stack, tab and drawer navigation." },
          { title: "Firebase", detail: "Authentication." },
          { title: "Socket.IO server", detail: "Node.js server for real-time chat between matched owners." },
          { title: "Gemini API", detail: "Pet-care chatbot." },
        ],
      },
    },
  },

  // ───────────────────────────────────────────────────────────── Microbiome
  {
    slug: "microbiome-colorectal-cancer",
    title: "Colorectal Cancer Detection from Microbiome Data",
    tagline: "A full-stack research app pairing a sequencing pipeline with interpretable classifiers.",
    summary:
      "Developed a research application with an R/DADA2 sequencing pipeline, Random Forest and L1-regularised logistic regression classifiers, JWT/RBAC access control and AWS S3 storage. Received the Best Student Project Award.",
    year: "2025",
    context: "Academic project",
    role: "Developer",
    award: "Best Student Project Award",
    categories: ["data", "ai-ml", "software"],
    tech: ["R", "DADA2", "Random Forest", "Logistic regression (L1)", "JWT", "RBAC", "AWS S3"],
    resources: [],
    availabilityNote: "No public repository, demo or media — this entry is described from my CV.",
  },

  // ───────────────────────────────────────────────────────────── IBM labs
  {
    slug: "ibm-rag-agentic-ai-labs",
    title: "RAG & Agentic AI Labs — IBM Professional Certificate",
    tagline: "Hands-on labs: structured extraction with LLMs, multimodal retrieval with a vector database, and Model Context Protocol servers and clients.",
    summary:
      "Coursework repository for the IBM RAG and Agentic AI Professional Certificate: notebooks that extract structured JSON from text with LLMs, build multimodal retrieval with LangChain and ChromaDB, and implement an MCP server and client in Python.",
    year: "2026",
    context: "Professional certificate coursework (IBM · Coursera)",
    role: "Learner — lab implementations",
    categories: ["ai-ml"],
    tech: ["Python", "LangChain", "ChromaDB", "LLMs", "Model Context Protocol", "Jupyter"],
    resources: [
      { kind: "source", label: "Lab repository", href: "https://github.com/Achref47/IBM-RAG-and-Agentic-AI-Professional-Certificate" },
    ],
  },

  // ───────────────────────────────────────────────────────────── PatientPathway
  {
    slug: "patientpathway",
    title: "PatientPathway — Research-Lab Website & Admin Dashboard",
    tagline: "A React website with an Express/MySQL back office for managing team members, publications and projects.",
    summary:
      "A content website for a digital-health research group, extended from an open-source React template with a Node.js/Express API, a MySQL schema and a dashboard to create, edit and delete team members, publications and projects.",
    year: "2025",
    context: "Web application built on an open-source React template",
    role: "Developer",
    categories: ["software"],
    tech: ["React", "React Bootstrap", "Material UI", "Node.js", "Express", "MySQL"],
    resources: [{ kind: "source", label: "Source code", href: "https://github.com/Achref47/PatientPathway" }],
  },
];
