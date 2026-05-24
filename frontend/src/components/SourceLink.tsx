import { ExternalLink } from "lucide-react";

interface SourceLinkProps {
  title: string;
  link: string;
}

export function SourceLink({ title, link }: SourceLinkProps) {
  return (
    <div className="mt-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-md p-2 flex items-center justify-between shadow-sm max-w-sm">
      <span className="font-medium text-gray-800">{title}</span>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-blue-600 hover:text-blue-800 hover:underline"
      >
        <span className="mr-1 text-xs">View source</span>
        <ExternalLink size={14} />
      </a>
    </div>
  );
}
