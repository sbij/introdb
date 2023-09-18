<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	console.log(data.indivrecordobj);
</script>

<p>La proposition :</p>
<p>{data.indivrecordobj.contenu}</p>

