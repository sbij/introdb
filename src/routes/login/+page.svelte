<script lang="ts">
  import { applyAction, enhance } from '$app/forms'
  import { pb } from '$lib/pocketbase'
</script>

<form
  method="POST"
  class=""
  use:enhance={() => {
    return async ({ result }) => {
      pb.authStore.loadFromCookie(document.cookie)
      await applyAction(result)
    }
  }}
>
  <h1 class="">Log in</h1>
  <div class="">
    <input
      type="email"
      name="email"
      placeholder="Email"
      class=""
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      class=""
    />
    <button class="">Log in</button>
  </div>
</form>