console.log("React Router Config Loaded");
import { vercelPreset } from "@vercel/react-router/vite";

export default {
    ssr: true,
    presets: [vercelPreset()],
};
