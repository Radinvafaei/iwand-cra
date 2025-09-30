import { AxiosResponse } from "axios";
import httpClient from "../client";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCustomization = (shop: string) =>
  useQuery<AxiosResponse<any>>({
    queryFn: async () =>
      httpClient.request({
        method: "GET",
        url: "api/customization-config",
        params: { shop },
      }),
    queryKey: ["customization-config", shop],
  });

export const useUpdateCustomization = (shop: string) =>
  useMutation({
    mutationFn: async (data: any) =>
      httpClient.request({
        method: "POST",
        url: "api/customization-config",
        data,
        params: { shop },
      }),
    mutationKey: ["customization-config", shop],
  });
