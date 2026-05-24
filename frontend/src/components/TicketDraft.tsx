import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Ticket } from "lucide-react";

interface TicketDraftProps {
  draft: Record<string, any>;
}

export function TicketDraft({ draft }: TicketDraftProps) {
  if (!draft) return null;

  return (
    <Card className="mt-4 bg-white shadow-md border border-gray-200">
      <CardHeader className="bg-gray-50 border-b border-gray-200 pb-3">
        <CardTitle className="text-sm flex items-center gap-2 text-gray-800">
          <Ticket size={16} className="text-specsavers-green" />
          Support Ticket Draft
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 pb-4">
        <div className="space-y-2 text-sm text-gray-700">
          {Object.entries(draft).map(([key, value]) => {
            if (key === "Ticket Link") return null;
            return (
              <div key={key} className="grid grid-cols-3 gap-2">
                <span className="font-semibold text-gray-900 col-span-1">{key}:</span>
                <span className="col-span-2 text-gray-600">{value}</span>
              </div>
            );
          })}
        </div>
        
        {draft["Ticket Link"] && (
          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
            <a
              href={draft["Ticket Link"]}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-specsavers-green hover:bg-emerald-700 text-white text-xs font-medium py-2 px-4 rounded-md transition-colors shadow-sm"
            >
              Submit Ticket
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
