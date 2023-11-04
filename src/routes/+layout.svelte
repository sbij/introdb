<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { currentUser, pb } from '$lib/pocketbase';
	import '../app.scss';
	import { page } from '$app/stores';
	//import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
</script>

<div>
	<div class="container fullpage">
		<header class="mt-4 mb-4">
			<a href="/" class="text-decoration-none"
				><div class="d-flex align-items-center p-3 my-3 text-white bg-primary rounded shadow-sm">
					<div class="lh-1">
						<h1 class="h5 mb-0 text-white lh-1">
							introdb<small class="text-light">.mocob.org</small>
						</h1>
						<!-- <small>Since 2011</small> -->
					</div>
				</div></a
			>
		</header>
		<div>
			<slot />
		</div>
		<footer class="mt-5">Footer</footer>
	</div>
</div>

<style>
	.fullpage {
		max-width: 720px;
	}
</style>
