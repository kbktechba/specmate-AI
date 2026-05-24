import { Suspense } from "react";
import { ConnectorManagement } from "@/components/admin/ConnectorManagement";
import { KnowledgeIndex } from "@/components/admin/KnowledgeIndex";
import { HealthMonitoring } from "@/components/admin/HealthMonitoring";
import { AIConfiguration } from "@/components/admin/AIConfiguration";
import { AuditLogs } from "@/components/admin/AuditLogs";
import { FeedbackAnalytics } from "@/components/admin/FeedbackAnalytics";
import { RoleManagement } from "@/components/admin/RoleManagement";

export default async function AdminPage(props: { searchParams: Promise<{ tab?: string }> }) {
  const searchParams = await props.searchParams;
  const tab = searchParams.tab || "connectors";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Suspense fallback={<div className="h-32 flex items-center justify-center">Loading...</div>}>
        {tab === "connectors" && <ConnectorManagement />}
        {tab === "knowledge" && <KnowledgeIndex />}
        {tab === "health" && <HealthMonitoring />}
        {tab === "ai-config" && <AIConfiguration />}
        {tab === "audit" && <AuditLogs />}
        {tab === "analytics" && <FeedbackAnalytics />}
        {tab === "roles" && <RoleManagement />}
      </Suspense>
    </div>
  );
}
