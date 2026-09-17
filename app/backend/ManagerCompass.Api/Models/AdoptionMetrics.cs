namespace ManagerCompass.Api.Models;

public class TopicUsage
{
    public string Key { get; set; } = "";
    public string Label { get; set; } = "";
    public string Color { get; set; } = "";
    public int Count { get; set; }
}

/// <summary>
/// Directly answers two named evaluation criteria from the use-case brief: a "practical adoption
/// measure" (Automation & Scalability) and an "observable adoption measure" (Enterprise Readiness).
/// Synthetic today; in production these would be real event counts, not estimates.
/// </summary>
public class AdoptionMetrics
{
    public int ActiveManagers { get; set; }
    public int EligibleManagers { get; set; }
    public int QuestionsAnsweredThisWeek { get; set; }
    public double ChecklistCompletionRate { get; set; }
    public int EscalationsRoutedThisWeek { get; set; }
    public int MedianSecondsPerQuestion { get; set; }
    public List<int> WeeklyActiveTrend { get; set; } = new();
    public List<TopicUsage> TopTopics { get; set; } = new();
    public List<string> ProductionMeasurementPlan { get; set; } = new();
}
