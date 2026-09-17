export interface TopicUsage {
  key: string;
  label: string;
  color: string;
  count: number;
}

export interface AdoptionMetrics {
  activeManagers: number;
  eligibleManagers: number;
  questionsAnsweredThisWeek: number;
  checklistCompletionRate: number;
  escalationsRoutedThisWeek: number;
  medianSecondsPerQuestion: number;
  weeklyActiveTrend: number[];
  topTopics: TopicUsage[];
  productionMeasurementPlan: string[];
}
