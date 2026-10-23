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
    shortTitle: "AURA",
    tagline:
      "Three connected products that turn 1.25M Portuguese property records into explainable valuations, grounded LLM answers and executive decisions.",
    summary:
      "Industry capstone with FAIRBANK in Lisbon. As the sole engineer I built the data pipeline, the valuation models, the FastAPI services and the React/TypeScript interfaces of three integrated products: a valuation platform, a local LLM analytics assistant and an executive intelligence hub.",
    year: "2026",
    type: "industry",
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
      { value: "1.25M", label: "property records fused into a 174-feature panel (2019–2025)", context: "training and evaluation panel" },
      { value: "R² 0.968", label: "FT-Transformer on 360K held-out 2024–25 properties (MAPE 4.05%)", context: "time-based hold-out test set; rolling validation R² 0.94" },
      { value: "355 / 0", label: "assistant tests passed / failed at freeze", context: "pytest; 96 live-model tests skipped by design" },
      { value: "0%", label: "table or column hallucination in a 20-question live battery", context: "live acceptance run, standard mode" },
    ],
    details: {
      glance: {
        problem:
          "Portuguese property prices are hard to judge: the data is scattered, and most valuation tools return one number with no confidence and no reasons.",
        built:
          "Three connected products on one 1.25M-record data foundation: a valuation platform, a local LLM assistant that answers with verified SQL, and an executive decision dashboard.",
        outcome:
          "Delivered as the sole engineer and graded A; the valuation model reached R² 0.968 on 360K held-out properties.",
      },
      objectives: [
        "Valuations with an uncertainty band and an explanation, not a single number.",
        "Plain-language questions answered from real data, with honest refusals when the data cannot support an answer.",
        "A decision dashboard for portfolio managers computed only from real dataset aggregations.",
        "Three products that run independently but share one data foundation.",
      ],
      challenges: [
        "Leakage: 44 leaking or redundant features had to be found and removed before any validation result could be trusted.",
        "LLM honesty: stopping the assistant from inventing tables, columns or signals took a schema allowlist, read-only execution and governance gates — then a live question battery to prove it.",
        "Reproducible models: the trained artifacts only load with scikit-learn 1.7.2, so the runtime pins it and checks every artifact against an md5 manifest at start-up.",
      ],
      learnings: [
        "Validation design decided which results were believable more than model choice did.",
        "For an LLM feature, the refusal behaviour and its tests are part of the product.",
        "Decision records and a validation report per sprint kept a six-month solo project reviewable by supervisors.",
      ],
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
    shortTitle: "Fuel Planner API",
    tagline: "A Django REST API that plans the cheapest fuel stops for a U.S. road trip, with one routing request per new trip.",
    summary:
      "Give it a start and a finish; it returns the route as GeoJSON, the cost-minimising fuel stops for a 500-mile-range vehicle and the total fuel cost. Built for a backend engineering take-home, with an exact optimiser verified against brute force and 495 tests.",
    year: "2026",
    type: "assessment",
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
      { value: "495", label: "tests, no network needed", context: "pytest suite, external services mocked" },
      { value: "≈99.4%", label: "line coverage", context: "pytest-cov" },
      { value: "1 → 0", label: "routing calls for a new trip → the same trip again", context: "reported in every response" },
      { value: "960", label: "random instances matched against exhaustive search", context: "plus 190 against an independent solver" },
    ],
    details: {
      glance: {
        problem: "Find the cheapest places to refuel on a long U.S. road trip when the fuel-price list has no coordinates.",
        built:
          "A Django REST API that places about 6,600 stations offline, finds the ones near the route and picks the cheapest feasible stops with an exact optimiser.",
        outcome:
          "Checked against brute force on 960 instances, 495 offline tests, and a public demo API that answers real requests.",
      },
      objectives: [
        "Return the route, the fuel stops and the total cost for a 500-mile-range, 10-mpg vehicle.",
        "Make at most one routing request per new trip.",
        "Never return a plan that runs dry, overfills the tank or fails to add up to the cent.",
      ],
      challenges: [
        "Placing stations on a map without geocoding each one: coordinates come from an offline public-domain place table instead.",
        "Keeping the external routing service to one call per trip, with caching, request collapsing, throttling and a distinct error for each failure mode.",
        "Proving the optimiser is exact rather than 'probably right' — hence exhaustive search, an independent solver and property tests.",
      ],
      codeSample: {
        title: "A real request to the public demo",
        language: "bash",
        code: `curl -X POST https://fuel-planner-api.onrender.com/api/v1/fuel-route/ \\
  -H "Content-Type: application/json" \\
  -d '{"start": "Chicago, IL", "finish": "Dallas, TX", "options": {"geometry": "none"}}'

# response (abridged)
"summary": {
  "fuel_stops": 3,
  "route_distance_miles": 961.5,
  "fuel_purchased_gallons": 46.34,
  "total_fuel_cost": 144.29,
  "currency": "USD"
}`,
        caption:
          "Sent to the live demo on 23 October 2026. The public demo uses synthetic stations and invented prices, and every response says so.",
      },
      learnings: [
        "Comparing an optimiser with brute force and an independent solver gives far more confidence than hand-picked examples.",
        "Reporting external calls and timing in every response makes performance claims checkable by anyone.",
      ],
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
    shortTitle: "Spotter",
    tagline: "Ranks up to three truck routes by the forecast at each checkpoint's arrival time and by the weight of the load.",
    summary:
      "A React/TypeScript and Django REST Framework app: enter origin, destination, departure time and load weight, and it samples the forecast where the truck will be at each checkpoint, classifies the risk and recommends the safest route with a step-by-step explanation on a MapLibre map.",
    year: "2026",
    type: "independent",
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
        note: "hosted app loads; on 23 Oct 2026 route analysis failed (geocoding provider unavailable) — the video shows the full flow",
      },
      { kind: "video", label: "Walkthrough video", href: "https://youtu.be/ZtrUB_0MrGc" },
    ],
    cover: {
      type: "image",
      src: "/projects/spotter-weather-routing/live-app.webp",
      width: 1440,
      height: 900,
      alt: "Spotter's hosted app: a trip form (origin, destination, departure, load weight, checkpoint spacing) beside a map of North America and a risk legend.",
    },
    media: [
      {
        type: "youtube",
        videoId: "ZtrUB_0MrGc",
        title: "Weather-Aware Truck Routing — walkthrough",
        poster: "/projects/spotter-weather-routing/video-poster.webp",
        caption: "Recorded locally, with a short tour of the hosted deployment at the end.",
      },
      {
        type: "image",
        src: "/projects/spotter-weather-routing/live-app.webp",
        width: 1440,
        height: 900,
        alt: "Spotter's hosted app with the trip form, the 'Compare routes' and 'Run simulated storm demo' buttons, and a map with a risk legend.",
        caption: "The hosted app (screenshot taken 23 October 2026).",
      },
    ],
    details: {
      glance: {
        problem:
          "Route planners optimise for time, but a heavy truck's risk depends on the weather where it will actually be at each point of the trip.",
        built:
          "A React + Django app that samples the forecast at each checkpoint's arrival time, scores wind, rain and snow against load weight, and ranks up to three routes.",
        outcome:
          "A deployed app with an explained recommendation, a 0–48 h corridor heatmap and a test suite that never calls external services.",
      },
      challenges: [
        "One analysis needs 100–240 forecast locations, so requests are batched and throttled before any upstream call.",
        "Missing forecast values must never look safe: they stay 'unknown', are excluded from averages and are reported separately.",
        "Free-tier providers limit requests per IP, which a shared host hits quickly.",
      ],
      learnings: [
        "A live demo that depends on third-party APIs needs its own monitoring — the hosted analysis can fail while the app itself is up.",
        "A lexicographic ranking is easier to explain and to test than a weighted score.",
      ],
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
    shortTitle: "ECG arrhythmia study",
    tagline: "Generated synthetic heartbeats with a GAN and tested whether they help a Transformer classify arrhythmias on MIT-BIH.",
    summary:
      "A PyTorch study on the MIT-BIH Arrhythmia Database: R-peak beat segmentation, a Wasserstein GAN that generates synthetic beats, and Transformer classifiers trained on raw, cleaned and GAN-augmented data — with attention-based explainability and a Streamlit demo app.",
    year: "2025",
    type: "academic",
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
      fit: "contain",
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
      { value: "97.5%", label: "accuracy of the best (raw-data) Transformer on 2,641 held-out beats", context: "held-out evaluation; validation accuracy peaked at 96.6% during training" },
      { value: "0.68", label: "macro-F1 across six imbalanced classes", context: "same held-out set; minority classes remain hard" },
      { value: "TS-FID 0.45", label: "fidelity of GAN-generated beats", context: "synthetic vs real beats; lower is better" },
    ],
    details: {
      glance: {
        problem: "Abnormal heartbeats are rare in ECG recordings, so a classifier can look accurate while missing exactly the beats that matter.",
        built:
          "A PyTorch pipeline that segments MIT-BIH beats, generates synthetic minority beats with a GAN, and compares Transformer classifiers trained on raw, cleaned and GAN-balanced data.",
        outcome:
          "The raw-data model performed best (97.5% accuracy, macro-F1 0.68 on held-out beats); GAN balancing did not help — a documented negative result.",
      },
      learnings: [
        "On imbalanced data, report macro-F1 and per-class scores beside accuracy.",
        "Data augmentation has to be measured; here it removed signal the classifier needed.",
      ],
      overview: [
        "An end-to-end research workflow, from raw MIT-BIH records to an interactive Streamlit app that highlights abnormal beats on the waveform and aggregates beat predictions into rhythm-level observations. Built for education and research — not a diagnostic device.",
      ],
      problem: [
        "Arrhythmic beats are rare compared with normal beats, so classifiers tend to learn the majority class and look accurate while missing the beats that matter. We wanted to know whether GAN-generated beats would improve minority-class performance.",
      ],
      solution: [
        "Segmented Lead II heartbeats from MIT-BIH using the expert R-peak annotations: a 250-sample window per beat (100 before the peak, 150 after), with labels mapped to AAMI beat classes.",
        "Trained a 1-D Wasserstein GAN with gradient penalty on minority-class beats only, and used it to balance the training set; synthetic beats were scored with TS-FID, DTW, MSE and MAE.",
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
    type: "assessment",
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
      glance: {
        problem: "Build a secure, multi-user project and task manager as a technical test.",
        built:
          "A React front end and an Express/MySQL API with JWT authentication, project and task CRUD, and a Gemini chatbot route.",
        outcome: "A complete working submission, with its limitations (no test suite, token in localStorage) stated openly.",
      },
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
    shortTitle: "Privilege Travel",
    tagline: "Flight and hotel booking with a Gemini chatbot, security alerting and an analytics admin dashboard.",
    summary:
      "Built during my internship at Privilege Travel in Tunis as the only full-stack developer in a three-person team: a React/Redux front end, Node.js/Express REST APIs and MySQL, with email vouchers, a Chart.js admin dashboard and a Google Gemini chatbot.",
    year: "2024–2025",
    type: "internship",
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
      { value: "85%", label: "of chatbot requests resolved without staff help (pilot testing)", context: "internship report, pilot group" },
      { value: "92%", label: "test coverage on critical backend paths", context: "internship report" },
      { value: "198 ms", label: "average API response time", context: "internship report" },
    ],
    details: {
      glance: {
        problem: "A local travel agency handled bookings by hand and could not answer customers quickly.",
        built:
          "A full-stack booking platform — React/Redux, Node.js/Express, MySQL — with a Gemini chatbot, account-security alerts and an analytics back office.",
        outcome:
          "In pilot testing the chatbot resolved 85% of requests without staff help; 92% test coverage on critical backend paths.",
      },
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

  // ───────────────────────────────────────────────────────────── Visse à Vis (2022)
  {
    slug: "visse-a-vis-erp",
    title: "Visse à Vis — Smart ERP with RFID Access Control",
    shortTitle: "Visse à Vis",
    tagline:
      "A C++/Qt desktop ERP for construction companies, paired with an Arduino RFID time-clock and loyalty-card device.",
    summary:
      "Six-person team project: a Qt desktop application with finance, HR, project, stock and client modules, plus an Arduino device that reads RFID badges for employee check-in and customer loyalty cards. Best Project across the entire second-year (2A) cohort at ESPRIT's Bal des Projets 2022.",
    year: "2022",
    type: "academic",
    context: "Second-year (2A) engineering project · ESPRIT, Tunis",
    role: "Module owner in a six-person team",
    team: "Team MAYOC — six students, one application module each",
    award: "Best Project — entire 2A cohort (≈40 classes, 1,200+ students), ESPRIT Bal des Projets 2022",
    categories: ["software", "iot"],
    related: ["pawpaw", "privilege-travel-platform", "taskflow-ai"],
    tech: ["C++", "Qt", "Arduino", "RFID", "16×2 LCD", "Servo motor", "Buzzer"],
    resources: [],
    availabilityNote:
      "The source code is not public. Evidence: the team's project presentation, two demo videos (not published because they include third-party media) and the award certificate shown below.",
    cover: {
      type: "image",
      src: "/projects/visse-a-vis-erp/rfid-loyalty-box.webp",
      width: 1535,
      height: 872,
      alt: "Laser-cut wooden Visse à Vis box with an LCD reading 'Discount succeed', next to an Arduino, an RFID reader, a second LCD and a servo motor.",
    },
    media: [
      {
        type: "image",
        src: "/projects/visse-a-vis-erp/rfid-loyalty-box.webp",
        width: 1535,
        height: 872,
        alt: "The Arduino device: wooden enclosure with an LCD showing 'Discount succeed' after a loyalty card was read, with the RFID reader, wiring and servo beside it.",
        caption: "The smart part: an RFID loyalty card accepted by the Arduino device.",
      },
      {
        type: "image",
        src: "/projects/visse-a-vis-erp/time-clock-box.webp",
        width: 1535,
        height: 872,
        alt: "Close-up of the laser-cut wooden box engraved 'visse à vis' with a blue backlit LCD on the front.",
        caption: "The RFID time-clock enclosure, engraved with the project logo.",
      },
      {
        type: "image",
        src: "/projects/visse-a-vis-erp/app-menu.webp",
        width: 962,
        height: 705,
        alt: "Qt desktop application home screen with buttons for Project manager, Client, Finance manager, Stock, Configuration and HR manager.",
        caption: "The Qt application's role-based home screen.",
      },
      {
        type: "image",
        src: "/projects/visse-a-vis-erp/app-statistics.webp",
        width: 870,
        height: 485,
        alt: "Statistics screen with a pie chart of staff by profession.",
        caption: "Built-in statistics (staff by profession).",
      },
      {
        type: "image",
        src: "/projects/visse-a-vis-erp/app-payments.webp",
        width: 960,
        height: 395,
        alt: "Finance screen with a payments table listing invoice numbers, payment dates, totals and validation status, with a form on the left.",
        caption: "Finance module: payments with validation status.",
      },
      {
        type: "image",
        src: "/projects/visse-a-vis-erp/award-certificate.webp",
        width: 800,
        height: 503,
        alt: "ESPRIT Bal des Projets 2022 certificate: 'Meilleur Projet 2A — Félicitation à l'équipe MAYOC', Tunis, 3 June 2022.",
        caption: "Award certificate: Meilleur Projet 2A, Bal des Projets 2022.",
      },
    ],
    details: {
      glance: {
        problem:
          "A construction company's old software handled HR, finance, scheduling and stock poorly and still needed a lot of manual work.",
        built:
          "A five-module Qt desktop ERP plus an Arduino RFID device for employee check-in and customer loyalty cards.",
        outcome:
          "Best Project across the whole second-year cohort — around 40 classes and more than 1,200 students — at ESPRIT's Bal des Projets 2022.",
      },
      overview: [
        "Visse à Vis is the ERP our six-person team, MAYOC, built in the second year (2A) of the engineering programme at ESPRIT in Tunis. It targets building-construction companies and combines a desktop management application with a small connected device.",
        "The project won the Best Project award for the entire 2A cohort — not a single class, but the whole year group of about 40 classes and more than 1,200 students — at ESPRIT's Bal des Projets on 3 June 2022.",
      ],
      problem: [
        "The company the team worked with had outgrown its previous application: human-resources and financial management were weak (late payments, incomplete balance sheets), time was poorly managed, stock was either over- or under-stocked, and many tasks still needed manual intervention.",
      ],
      solution: [
        "Finance: detailed reports and balance sheets with history, invoice generation, discounts, Excel and PDF export, sorting, search and statistics.",
        "Employees (HR): staff statistics per department, leave requests that a manager accepts or refuses, leave planning, printable reports and login-protected accounts.",
        "Projects: statistics, a calendar, a map and a surface calculator.",
        "Stock and clients: identified items, detailed calculations, notifications, history, statistics, printing and Excel export.",
        "Interface: theme switching, translation, animations and sounds.",
        "Smart part: an Arduino device with an RFID reader, LCD, servo and buzzer that works as an RFID badge time-clock (recording arrivals and departures, with an alarm for unknown badges) and as a customer loyalty-card reader.",
      ],
      contribution: [
        "Owned one of the application's five modules (each team member owned one) and integrated it into the shared Qt application.",
        "Presented the project as part of team MAYOC at the Bal des Projets.",
      ],
      architecture: {
        steps: [
          { title: "Role-based home", detail: "One Qt desktop app; each role (project, client, finance, stock, HR, configuration) opens its own module." },
          { title: "Business modules", detail: "Forms, tables, search, sorting, statistics, PDF and Excel export in every module." },
          { title: "Arduino device", detail: "RFID reader, 16×2 LCD, servo and buzzer in a laser-cut wooden enclosure." },
          { title: "App ↔ device", detail: "The application has a dedicated Arduino screen used with the device." },
        ],
      },
      results: [
        "Best Project — whole 2A cohort, ESPRIT Bal des Projets 2022 (certificate dated 3 June 2022, awarded to team MAYOC).",
      ],
      limitations: [
        "The source code is not public, and the demo videos are not published because they include third-party media.",
        "No performance or usage measurements were documented.",
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
    type: "academic",
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
      glance: {
        problem: "Pet owners have no simple way to find suitable playmates for their pets nearby.",
        built:
          "A React Native (Expo) app with Firebase sign-in, pet profiles, matching, Socket.IO chat, QR-code profile sharing and a Gemini chatbot.",
        outcome: "Awarded Second Prize.",
      },
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
      "Developed a research application with an R/DADA2 sequencing pipeline, Random Forest and L1-regularised logistic regression classifiers, JWT/RBAC access control and AWS S3 storage. Presented at MedTech Project Day as an AI detection tool for colorectal cancer, where the team received the Best Student Project award for outstanding performance.",
    year: "2025",
    type: "academic",
    context: "Academic project",
    role: "Developer",
    team: "Student team — awarded together at MedTech Project Day",
    award: "Best Student Project — Outstanding Performance Award, MedTech Project Day",
    categories: ["data", "ai-ml", "software"],
    tech: ["R", "DADA2", "Random Forest", "Logistic regression (L1)", "JWT", "RBAC", "AWS S3"],
    resources: [],
    availabilityNote: "No public repository or demo — described from my CV. The photo is from the award at MedTech Project Day.",
    cover: {
      type: "image",
      src: "/projects/microbiome-colorectal-cancer/best-student-project-award.webp",
      width: 800,
      height: 1189,
      alt: "Achref Elarbi and teammates at MedTech Project Day holding Best Student Project certificates beside a 'Colorectal Cancer AI Detection' poster.",
      fit: "cover",
      position: "50% 34%",
    },
  },

  // ───────────────────────────────────────────────────────────── NYC weather
  {
    slug: "nyc-weather-forecasting",
    title: "NYC Temperature Forecasting — Model Comparison",
    shortTitle: "NYC weather forecasting",
    tagline:
      "Compared Random Forest, XGBoost, a Bi-LSTM and a ridge-stacked hybrid for New York City's daily maximum temperature using 20 years of NOAA data.",
    summary:
      "Coursework data-science project: cleaned 2005–2024 NOAA data for Central Park, engineered 62 features and compared five models on a 2023–24 hold-out. A later review found target leakage in several features, so the reported errors are not presented as forecasting skill.",
    year: "2025",
    type: "coursework",
    context: "Data science coursework (Software Engineering programme)",
    role: "Sole author",
    categories: ["data", "ai-ml"],
    tech: ["Python", "pandas", "scikit-learn", "XGBoost", "TensorFlow / Keras", "matplotlib"],
    resources: [],
    availabilityNote: "Coursework: the notebook, report and slides are not public.",
    details: {
      glance: {
        problem: "Forecast New York City's daily maximum temperature from historical weather observations.",
        built:
          "An end-to-end pipeline — NOAA data cleaning, 62 engineered features and a comparison of Random Forest, XGBoost, a Bi-LSTM, a weighted ensemble and a ridge-stacked hybrid on a time-based hold-out.",
        outcome:
          "The pipeline and comparison are complete; the near-perfect scores turned out to come from target leakage, which is the next thing to fix.",
      },
      overview: [
        "A data-science project on 20 years (2005–2024) of daily observations from the NOAA GHCN-D Central Park station: cleaning, exploratory analysis, feature engineering and a comparison of classical, tree-based, deep-learning and stacked models.",
      ],
      solution: [
        "Data cleaning with consistency checks (for example, minimum temperature never above maximum) and handling of missing values.",
        "62 engineered features: lags of 1, 7, 30 and 365 days, rolling statistics and seasonal indicators.",
        "Models: Random Forest, XGBoost, a bidirectional LSTM, a weighted ensemble and a ridge regression stacked on all model predictions.",
        "Time-based split: training 2005–2022, testing 2023–2024.",
      ],
      limitations: [
        "Several engineered features — daily temperature range, day-over-day change and unshifted rolling means — are computed from the same day's maximum temperature, the value being predicted. The reported errors (about 0.2 °C, R² 0.999) therefore reflect target leakage, not forecasting skill, and are not shown here as results.",
        "The models predict each day from lagged features; they were not evaluated as a genuine multi-week-ahead forecast.",
      ],
      learnings: [
        "Audit every feature for information from the prediction time before trusting a score — an R² of 0.999 on weather data is a warning sign, not a result.",
        "Next step: rebuild the features with strict shifting and evaluate a real multi-day forecast horizon against a persistence baseline.",
      ],
    },
  },

  // ───────────────────────────────────────────────────────────── IBM labs
  {
    slug: "ibm-rag-agentic-ai-labs",
    title: "RAG & Agentic AI Labs — IBM Professional Certificate",
    tagline: "Hands-on labs: structured extraction with LLMs, multimodal retrieval with a vector database, and Model Context Protocol servers and clients.",
    summary:
      "Coursework repository for the IBM RAG and Agentic AI Professional Certificate: notebooks that extract structured JSON from text with LLMs, build multimodal retrieval with LangChain and ChromaDB, and implement an MCP server and client in Python.",
    year: "2026",
    type: "coursework",
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
    type: "independent",
    context: "Web application built on an open-source React template",
    role: "Developer",
    categories: ["software"],
    tech: ["React", "React Bootstrap", "Material UI", "Node.js", "Express", "MySQL"],
    resources: [{ kind: "source", label: "Source code", href: "https://github.com/Achref47/PatientPathway" }],
  },
];
