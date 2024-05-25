<template>
  <div>
    <div class="flex items-center justify-center p-8">
      <q-form class="q-gutter-md <sm:w-full w-1/2 xl:w-1/3 text-center">
        <q-img src="/logo.drawio.svg" class="w-72"></q-img>

        <div>
          <q-btn-group spread>
            <q-btn
              color="positive"
              size="lg"
              :loading="loading"
              @click="signInWithOAuth()"
              >Login with Github
              <q-tooltip> Login with Github </q-tooltip>
            </q-btn>
          </q-btn-group>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
const supabase = useSupabaseClient();
const [loading, toggleLoading] = useToggle();
const user = useSupabaseUser();

const signInWithOAuth = async () => {
  toggleLoading();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/confirm",
    },
  });

  if (error) {
    showError(error.name + ": " + error.message);
    return;
  }

  if (user.value) {
    toggleLoading();
    await navigateTo("/");
  }
};
</script>

<style></style>
