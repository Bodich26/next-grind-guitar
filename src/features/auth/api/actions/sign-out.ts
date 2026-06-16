"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AUTH_META } from "@/../routes";
import { createClient } from "@/shared/lib/server";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect(`${AUTH_META.LOGIN}`);
}
