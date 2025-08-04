import { useMemo } from "react";

export default function useGetShopName() {
    return useMemo(() => {
        if (typeof window === "undefined") return null;
        const params = new URLSearchParams(window.location.search);
        return params.get("shop");
    }, []);
}