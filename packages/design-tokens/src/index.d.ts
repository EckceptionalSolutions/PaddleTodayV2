export interface SemanticColors {
  readonly rating: {
    readonly strong: string;
    readonly good: string;
    readonly fair: string;
    readonly noGo: string;
  };
  readonly status: {
    readonly live: string;
    readonly degraded: string;
    readonly offline: string;
  };
}

export interface SemanticRadii {
  readonly web: {
    readonly control: number;
    readonly card: number;
    readonly panel: number;
    readonly pill: number;
  };
  readonly native: {
    readonly control: number;
    readonly card: number;
    readonly panel: number;
    readonly pill: number;
  };
}

export interface SemanticSpacing {
  readonly web: {
    readonly xs: number;
    readonly sm: number;
    readonly md: number;
    readonly lg: number;
    readonly xl: number;
  };
  readonly native: {
    readonly xs: number;
    readonly sm: number;
    readonly md: number;
    readonly lg: number;
    readonly xl: number;
  };
}

export const semanticColors: SemanticColors;
export const semanticRadii: SemanticRadii;
export const semanticSpacing: SemanticSpacing;
export function semanticColorForRating(rating: string | null | undefined): string;
