/**
 * Normalizes a raw AI response string into a strict, typed JSON object based on the required schema.
 * - Extracts the first balanced JSON object
 * - Fixes common formatting issues (smart quotes, trailing commas, stray prefixes/suffixes)
 * - Coerces types where possible and fills missing fields with sensible defaults
 */

export type RiskLevel = "Low" | "Medium" | "High";

export interface AnalysisResult {
  project: {
    name: string;
    language: string;
    files: number;
    size_kb: number;
  };
  analysis: {
    complexity_score: number;
    component_hierarchy: {
      summary: string;
      issues: string[];
      examples: string[];
    };
    modularity: {
      summary: string;
      issues: string[];
      examples: string[];
    };
    outdated_code: {
      summary: string;
      issues: string[];
      examples: string[];
    };
    mixed_patterns: {
      summary: string;
      issues: string[];
      examples: string[];
    };
    legacy_state_management: {
      present: boolean;
      description: string;
      examples: string[];
    };
  };
  dependencies: {
    total: number;
    outdated: number;
    vulnerable: number;
    list: Array<{
      name: string;
      version: string;
      status: "up-to-date" | "outdated" | "vulnerable";
      issues: string[];
    }>;
  };
  vulnerabilities: {
    count: number;
    risk_level: RiskLevel;
    details: string[];
  };
  migration: {
    recommended_framework: string;
    suggested_tools: string[];
    strategy: {
      overview: string;
      benefits: string[];
      risks: string[];
      technical_considerations: string[];
    };
    phases: Array<{
      name: string;
      description: string;
      estimated_time_weeks: string;
      progress_percent: number;
      deliverables: string[];
      tools_used: string[];
    }>;
  };
  ai_tools: {
    legacy_analysis: {
      method: string;
      findings: string[];
    };
    dependency_mapping: {
      method: string;
      findings: string[];
    };
    complexity_scoring: {
      method: string;
      rationale: string;
    };
    anti_pattern_detection: {
      method: string;
      patterns_found: string[];
    };
  };
  progress: {
    completed_phases: number;
    total_phases: number;
    milestones: string[];
  };
}

type NormalizeResult =
  | { data: AnalysisResult; error?: undefined; raw: string }
  | { data: null; error: string; raw: string };

/**
 * Replace smart quotes and trim to the first balanced JSON object.
 */
function extractJson(text: string): string | null {
  // Replace smart quotes with standard quotes
  let cleaned = text.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");

  // Remove any leading content before the first opening brace
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace)
    return null;
  cleaned = cleaned.slice(firstBrace, lastBrace + 1);

  // Remove trailing commas inside objects/arrays
  cleaned = cleaned.replace(/,\s*([}\]])/g, "$1");

  // Remove markdown fences if present
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");

  // Trim control characters without using control-char regex (eslint-safe)
  cleaned = removeControlChars(cleaned);

  return cleaned.trim();
}

/**
 * Remove ASCII control characters safely (no-control-regex compliant).
 */
function removeControlChars(s: string): string {
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    // Keep printable characters (>= 32) except DEL (127)
    out += code >= 32 && code !== 127 ? s[i] : " ";
  }
  return out;
}

/**
 * Safely coerce to number.
 */
function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string") {
    const n = Number(value.trim());
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

/**
 * Safely coerce to string.
 */
function toString(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  return fallback;
}

/**
 * Ensure array of strings.
 */
function toStringArray(value: unknown, fallback: string[] = []): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => toString(v)).filter(Boolean);
  }
  return fallback;
}

/**
 * Map dependencies safely from unknown.
 */
function mapDependencies(
  list: unknown,
): AnalysisResult["dependencies"]["list"] {
  if (!Array.isArray(list)) return [];
  return list.map((raw: unknown) => {
    const d = raw as Record<string, unknown>;
    const statusRaw = d["status"];
    const status: "up-to-date" | "outdated" | "vulnerable" =
      statusRaw === "outdated" || statusRaw === "vulnerable"
        ? (statusRaw as "outdated" | "vulnerable")
        : "up-to-date";
    return {
      name: toString(d["name"]),
      version: toString(d["version"]),
      status,
      issues: toStringArray(d["issues"]),
    };
  });
}

/**
 * Map phases safely from unknown.
 */
function mapPhases(list: unknown): AnalysisResult["migration"]["phases"] {
  if (!Array.isArray(list)) return [];
  return list.map((raw: unknown) => {
    const p = raw as Record<string, unknown>;
    return {
      name: toString(p["name"]),
      description: toString(p["description"]),
      estimated_time_weeks: toString(p["estimated_time_weeks"]),
      progress_percent: toNumber(p["progress_percent"], 0),
      deliverables: toStringArray(p["deliverables"]),
      tools_used: toStringArray(p["tools_used"]),
    };
  });
}

/**
 * Normalize the parsed object into the expected schema and types.
 */
function coerceSchema(obj: unknown): AnalysisResult {
  const root = (obj ?? {}) as Record<string, unknown>;

  const project = (root["project"] ?? {}) as Record<string, unknown>;
  const analysis = (root["analysis"] ?? {}) as Record<string, unknown>;
  const dependencies = (root["dependencies"] ?? {}) as Record<string, unknown>;
  const vulnerabilities = (root["vulnerabilities"] ?? {}) as Record<
    string,
    unknown
  >;
  const migration = (root["migration"] ?? {}) as Record<string, unknown>;
  const ai_tools = (root["ai_tools"] ?? {}) as Record<string, unknown>;
  const progress = (root["progress"] ?? {}) as Record<string, unknown>;

  const component_hierarchy = (analysis["component_hierarchy"] ?? {}) as Record<
    string,
    unknown
  >;
  const modularity = (analysis["modularity"] ?? {}) as Record<string, unknown>;
  const outdated_code = (analysis["outdated_code"] ?? {}) as Record<
    string,
    unknown
  >;
  const mixed_patterns = (analysis["mixed_patterns"] ?? {}) as Record<
    string,
    unknown
  >;
  const legacy_state_management = (analysis["legacy_state_management"] ??
    {}) as Record<string, unknown>;

  const strategy = (migration["strategy"] ?? {}) as Record<string, unknown>;

  const legacy_analysis = (ai_tools["legacy_analysis"] ?? {}) as Record<
    string,
    unknown
  >;
  const dependency_mapping = (ai_tools["dependency_mapping"] ?? {}) as Record<
    string,
    unknown
  >;
  const complexity_scoring = (ai_tools["complexity_scoring"] ?? {}) as Record<
    string,
    unknown
  >;
  const anti_pattern_detection = (ai_tools["anti_pattern_detection"] ??
    {}) as Record<string, unknown>;

  const safe: AnalysisResult = {
    project: {
      name: toString(project["name"], "Unknown Project"),
      language: toString(project["language"], "Unknown"),
      files: toNumber(project["files"], 0),
      size_kb: toNumber(project["size_kb"], 0),
    },
    analysis: {
      complexity_score: toNumber(analysis["complexity_score"], 0),
      component_hierarchy: {
        summary: toString(component_hierarchy["summary"]),
        issues: toStringArray(component_hierarchy["issues"]),
        examples: toStringArray(component_hierarchy["examples"]),
      },
      modularity: {
        summary: toString(modularity["summary"]),
        issues: toStringArray(modularity["issues"]),
        examples: toStringArray(modularity["examples"]),
      },
      outdated_code: {
        summary: toString(outdated_code["summary"]),
        issues: toStringArray(outdated_code["issues"]),
        examples: toStringArray(outdated_code["examples"]),
      },
      mixed_patterns: {
        summary: toString(mixed_patterns["summary"]),
        issues: toStringArray(mixed_patterns["issues"]),
        examples: toStringArray(mixed_patterns["examples"]),
      },
      legacy_state_management: {
        present: Boolean(legacy_state_management["present"]),
        description: toString(legacy_state_management["description"]),
        examples: toStringArray(legacy_state_management["examples"]),
      },
    },
    dependencies: {
      total: toNumber(dependencies["total"], 0),
      outdated: toNumber(dependencies["outdated"], 0),
      vulnerable: toNumber(dependencies["vulnerable"], 0),
      list: mapDependencies(dependencies["list"]),
    },
    vulnerabilities: {
      count: toNumber(vulnerabilities["count"], 0),
      risk_level:
        vulnerabilities["risk_level"] === "Medium" ||
        vulnerabilities["risk_level"] === "High"
          ? (vulnerabilities["risk_level"] as RiskLevel)
          : "Low",
      details: toStringArray(vulnerabilities["details"]),
    },
    migration: {
      recommended_framework: toString(migration["recommended_framework"]),
      suggested_tools: toStringArray(migration["suggested_tools"]),
      strategy: {
        overview: toString(strategy["overview"]),
        benefits: toStringArray(strategy["benefits"]),
        risks: toStringArray(strategy["risks"]),
        technical_considerations: toStringArray(
          strategy["technical_considerations"],
        ),
      },
      phases: mapPhases(migration["phases"]),
    },
    ai_tools: {
      legacy_analysis: {
        method: toString(legacy_analysis["method"]),
        findings: toStringArray(legacy_analysis["findings"]),
      },
      dependency_mapping: {
        method: toString(dependency_mapping["method"]),
        findings: toStringArray(dependency_mapping["findings"]),
      },
      complexity_scoring: {
        method: toString(complexity_scoring["method"]),
        rationale: toString(complexity_scoring["rationale"]),
      },
      anti_pattern_detection: {
        method: toString(anti_pattern_detection["method"]),
        patterns_found: toStringArray(anti_pattern_detection["patterns_found"]),
      },
    },
    progress: {
      completed_phases: toNumber(progress["completed_phases"], 0),
      total_phases: toNumber(progress["total_phases"], 0),
      milestones: toStringArray(progress["milestones"]),
    },
  };

  return safe;
}

/**
 * Public normalizer: returns normalized AnalysisResult or an error.
 */
export function normalizeResponseTextToJson(text: string): NormalizeResult {
  const raw = text ?? "";
  const jsonText = extractJson(raw);
  if (!jsonText) {
    return {
      data: null,
      error: "Unable to extract JSON content from response.",
      raw,
    };
  }

  try {
    const parsed = JSON.parse(jsonText) as unknown;
    const normalized = coerceSchema(parsed);
    return { data: normalized, raw: jsonText };
  } catch (_e) {
    // Attempt a second pass: strip trailing commas again and retry
    const retried = jsonText.replace(/,\s*([}\]])/g, "$1");
    try {
      const parsed = JSON.parse(retried) as unknown;
      const normalized = coerceSchema(parsed);
      return { data: normalized, raw: retried };
    } catch (_err) {
      return {
        data: null,
        error: "Invalid JSON after normalization attempts.",
        raw: jsonText,
      };
    }
  }
}
