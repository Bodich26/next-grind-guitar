import { redirect } from "next/navigation";
import { z } from "zod";

export function validationData<T>(
  schema: z.ZodType<T>,
  data: unknown,
  redirectUrl: string
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(", ");
    return redirect(`${redirectUrl}?message=${message}`);
  }
  return result.data;
}
