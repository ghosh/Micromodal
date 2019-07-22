<script>
	import Header from './components/Header.svelte'
	import Content from './components/Content.svelte'
	import Aside from './components/Aside.svelte'
	import Main from './components/Main.svelte'
	export let name;
</script>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(.container) {
		max-width: 960px;
		margin: auto;
		padding: 0 20px;
	}
</style>

<Header />
<Content>
	<div slot="aside"><Aside/></div>
	<div slot="main"><Main/></div>
</Content>
