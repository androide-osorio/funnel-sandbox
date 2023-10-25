import { useParams, useSearchParams } from "next/navigation";
import useFunnelStore from "@/store";

export function useFunnelFromUrl() {
  const params = useParams();
  const query = useSearchParams();
  const funnelId = params.funnelId;
  const funnel = useFunnelStore((state) =>
    state.funnels.find((f) => f.id === funnelId)
  );

  if (!funnel) {
    return { funnel: undefined, page: undefined };
  }

  const pageId = query.get("page") ?? funnel.pages[0].id;
  const page = funnel.pages.find((p) => p.id === pageId);

  return { funnel, page };
}
