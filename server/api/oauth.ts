import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(config.supabaseUrl, config.supabaseKey);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "/jiuzhaigou",
    },
  });

  //  if (error) {
  //    showNotify(`${error?.name}: ${error?.message}`);
  //  }

  console.log(data, error);
  if (!data.url) {
    throw createError({
      statusCode: 400,
      message: "没有url",
    });
  }

  return sendRedirect(event, data.url);
});
