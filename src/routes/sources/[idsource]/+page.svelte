<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	console.log(data.sourceobj);
</script>



<div class="container">
	Source : {data.sourceobj.contenu}
	<br>
	<br>
	Utilisée pour la proposition : <a href="/propositions/{data.sourceobj.proposition}">{data.sourceobj.expand.proposition.contenu}</a>
</div>