import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pgzbdaikskfnzlpaukuu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjIzMzg2NDMyLCJleHAiOjE5Mzg5NjI0MzJ9.v_olNSJ3vgnnJfIpqFVY_nC2ge7Gko7rocCG9xGGgsg" ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzM4NjQzMiwiZXhwIjoxOTM4OTYyNDMyfQ.EAbxJ8z_DMYNi9ZhyUdo7SI37adFFfBKr1fRxDUxIh4" ||
  process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async (event) => {
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
