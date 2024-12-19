import { Card, CardContent } from "../ui/card";
import RecentActivities from "./recent-activities";

export default function RecentActivitiesWrapper() {
  return (
    <Card className="px-4 pt-2 flex-grow   flex flex-col">
      <CardContent className="py-0">
        <RecentActivities />
      </CardContent>
    </Card>
  );
}
