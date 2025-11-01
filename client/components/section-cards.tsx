import { CardTool, type Tool } from "@/components/ui/card-tool";
import qs from "qs";

async function loader(): Promise<Record<string, Tool>> {
  const query = qs.stringify(
    {
      populate: {
        logo: {
          fields: ["url", "name"],
        },
        illustration: {
          fields: ["url", "name"],
        },
      },
    },
    { encodeValuesOnly: true }
  );
  const path = `/api/tools?${query}`;
  const BASE_URL = "http://localhost:1337";
  const url = new URL(path, BASE_URL);

  const res = await fetch(url.href);
  const data = await res.json();
  return data.data as Record<string, Tool>;
}

export async function SectionCards() {
  const data = await loader();
  const tools = Object.values(data);

  if (!tools || tools.length === 0) {
    return <div className="px-4">No tools available</div>;
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {tools.map((tool) => (
        <CardTool
          key={tool.id ?? tool.documentId ?? tool.name}
          tool={tool}
          className="@container/card"
        />
      ))}
    </div>
  );
}
