import { ConfigKeys } from "../types.ts";
import { isSsr } from "./helpers.ts";
import process from "process";

const BuildTimeVars: { [key: string]: string } = {
    'VITE_API_URL_CLIENT': import.meta.env.VITE_API_URL_CLIENT,
    'VITE_API_URL_SERVER': import.meta.env.VITE_API_URL_SERVER,
    'VITE_STRIPE_PUBLISHABLE_KEY': import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
    'VITE_I_HAVE_PURCHASED_A_LICENCE': import.meta.env.VITE_I_HAVE_PURCHASED_A_LICENCE,
    'VITE_FRONTEND_URL': import.meta.env.VITE_FRONTEND_URL,
};
export const getConfig = (key: ConfigKeys): string | undefined => {
    if (isSsr()) {
        const serverEnv = typeof process !== "undefined" && process.env ? process.env : {};
        return serverEnv[key] as string | undefined;
    }

    const clientEnv = typeof window !== "undefined" && window.hievents ? window.hievents : {};
    return BuildTimeVars[key] || clientEnv[key];
};
