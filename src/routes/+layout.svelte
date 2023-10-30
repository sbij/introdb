<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { currentUser, pb } from '$lib/pocketbase';
	import '../app.scss';
	import { page } from '$app/stores';
	//import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
</script>

<div id="fullpage">
	<header class="bg-white border-bottom border-dark-subtle">
		<div class="container maincontainer">
			<a href="/" class="text-decoration-none link-dark"><h1>introdb<span class="text-secondary">.mocob.org</span></h1></a>
		</div>
	</header>
	<div class="bg-lightgray">
		<div class="container maincontainer">
			<slot />
		</div>
	</div>
</div>

<style>
	header {
		padding-top: 30px;
		padding-bottom: 20px;
		margin-bottom: 30px;
	}
	.maincontainer {
		max-width: 720px;
	}
	#fullpage {
		background-color: #efefef;
		margin-bottom: 50px;
	}
</style>
