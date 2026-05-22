import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
import "react-native-url-polyfill/auto";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables.");
}

const getTransport = () => {
  if (Platform.OS !== "web") return undefined;
  return require("ws");
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    transport: getTransport(),
  },
});