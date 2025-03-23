//sıkıntılı

export function fixStatus(status: string): string {
  if (status === "todo") return "To-do";
  if (status === "progress") return "In Progress";
  if (status === "done") return "Done";
  if (status === "canceled") return "Canceled";
  return status;
}

export function fixPriority(priority: string): string {
  if (priority === "very_high") return "Very High";
  if (priority === "high") return "High";

  if (priority === "medium") return "Medium";
  if (priority === "low") return "Low";
  if (priority === "very_low") return "Very Low";

  return priority;
}
