import { renderHook } from "@testing-library/react";
import { useParams, useSearchParams } from "next/navigation";

import { useFunnelFromUrl } from "./use-funnel-from-url";
import useFunnelStore from "@/store";

jest.mock("next/navigation");
jest.mock("@/store");

describe("useFunnelFromUrl", () => {
	const mockParams = {
		page: "pageId",
	};
	const mockSearchParams = {
		get: jest.fn(),
	};

	beforeEach(() => {
		(useParams as jest.Mock).mockReturnValue(mockParams);
		(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("returns undefined when funnel is not found", () => {
		(useParams as jest.Mock).mockReturnValue({ funnelId: "nonexistent" });
		(useFunnelStore as any as jest.Mock).mockReturnValue(undefined);

		const { result } = renderHook(() => useFunnelFromUrl());

		expect(result.current.funnel).toBeUndefined();
		expect(result.current.page).toBeUndefined();
	});

	it("returns funnel and page when found", () => {
		const funnel = { id: "funnelId", pages: [{ id: "pageId" }] };
		mockSearchParams.get.mockReturnValue("pageId");
		(useParams as jest.Mock).mockReturnValue({ funnelId: "funnelId" });
		(useFunnelStore as any as jest.Mock).mockReturnValue(funnel);

		const { result } = renderHook(() => useFunnelFromUrl());

		expect(result.current.funnel).toEqual(funnel);
		expect(result.current.page).toEqual(funnel.pages[0]);
	});

	it("returns first page when page query param is not found", () => {
		const funnel = { id: "funnelId", pages: [{ id: "pageId1" }, { id: "pageId2" }] };
		mockSearchParams.get.mockReturnValue(undefined);
		(useParams as jest.Mock).mockReturnValue({ funnelId: "funnelId" });
		(useFunnelStore as any as jest.Mock).mockReturnValue(funnel);

		const { result } = renderHook(() => useFunnelFromUrl());

		expect(result.current.funnel).toEqual(funnel);
		expect(result.current.page).toEqual(funnel.pages[0]);
	});

	it("returns page with matching id when page query param is found", () => {
		const funnel = { id: "funnelId", pages: [{ id: "pageId1" }, { id: "pageId2" }] };

		mockSearchParams.get.mockReturnValue("pageId2");
		(useParams as jest.Mock).mockReturnValue({ funnelId: "funnelId" });
		(useFunnelStore as any as jest.Mock).mockReturnValue(funnel);

		const { result } = renderHook(() => useFunnelFromUrl());

		expect(result.current.funnel).toEqual(funnel);
		expect(result.current.page).toEqual(funnel.pages[1]);
	});
});