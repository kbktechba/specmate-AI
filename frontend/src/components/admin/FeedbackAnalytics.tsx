import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, HelpCircle, AlertOctagon, TrendingUp, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function FeedbackAnalytics() {
  const metrics = [
    { label: "Helpful Responses", value: "92.4%", icon: ThumbsUp, color: "text-green-600" },
    { label: "Not Helpful Responses", value: "7.6%", icon: ThumbsDown, color: "text-red-500" },
    { label: "Low-Confidence", value: "1,204", icon: AlertOctagon, color: "text-yellow-600" },
    { label: "Unanswered Questions", value: "342", icon: HelpCircle, color: "text-gray-500" },
  ];

  const topics = [
    { name: "Refund Policy", searches: "12,402", trend: "+12%" },
    { name: "WINK System Outage", searches: "8,921", trend: "+45%" },
    { name: "Printer Setup", searches: "6,400", trend: "-5%" },
    { name: "Order Tracking", searches: "5,102", trend: "+2%" },
  ];

  const categories = [
    { name: "IT Troubleshooting", percentage: "45%" },
    { name: "Order Lookup", percentage: "30%" },
    { name: "Policy Questions", percentage: "15%" },
    { name: "Store Operations", percentage: "10%" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Feedback & Analytics</h2>
        <p className="text-gray-500">Insights into user satisfaction and common queries.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <Card key={i}>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
              <m.icon size={32} className={m.color} />
              <p className="text-3xl font-bold">{m.value}</p>
              <p className="text-sm font-medium text-gray-500">{m.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={18} className="text-specsavers-green" />
              Most Searched Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topics.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-800">{t.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">{t.searches} searches</span>
                    <Badge variant={t.trend.startsWith('+') ? 'default' : 'secondary'} className={t.trend.startsWith('+') ? 'bg-green-100 text-green-800' : ''}>
                      {t.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag size={18} className="text-specsavers-green" />
              Most Common Issue Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((c, i) => (
                <div key={i} className="flex flex-col space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{c.name}</span>
                    <span className="text-gray-500">{c.percentage}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-specsavers-green" 
                      style={{ width: c.percentage }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
