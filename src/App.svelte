<script lang="ts">
	import { onMount } from 'svelte';
	import type { Course } from './lib/types';
	import { getData } from './lib/api';
	import FilterBar from './lib/FilterBar.svelte';
	import DataTable from './lib/DataTable.svelte';
	import StatsPanel from './lib/StatsPanel.svelte';

	let res = $state<Course[]>([]);
	let selectedUni = $state('');
	let selectedGrade = $state('');
	let sortBy = $state<{ col: keyof Course; ascending: boolean }>({
		col: 'id',
		ascending: true,
	});

	let univList = $derived([...new Set(res.map((c) => c.university))]);
	let gradesList = $derived([...new Set(res.map((c) => c.grade))]);

	onMount(async () => {
		res = await getData();
	});

	let filtered = $derived.by(() => {
		let result = res;
		if (selectedGrade && selectedUni) {
			result = result.filter(
				(c) => c.grade === selectedGrade && c.university === selectedUni,
			);
		} else if (selectedGrade) {
			result = result.filter((c) => c.grade === selectedGrade);
		} else if (selectedUni) {
			result = result.filter((c) => c.university === selectedUni);
		}
		return result;
	});

	let sorted = $derived.by(() => {
		const col = sortBy.col;
		const modifier = sortBy.ascending ? 1 : -1;
		return [...filtered].sort((a, b) => {
			const aVal = String(a[col] ?? '');
			const bVal = String(b[col] ?? '');
			const aNum = parseFloat(aVal.replace(/NA/g, '0'));
			const bNum = parseFloat(bVal.replace(/NA/g, '0'));
			if (!isNaN(aNum) || !isNaN(bNum)) {
				return aNum < bNum ? -1 * modifier : aNum > bNum ? 1 * modifier : 0;
			}
			return aVal < bVal ? -1 * modifier : aVal > bVal ? 1 * modifier : 0;
		});
	});

	let resLength = $derived(res.length);
	let masterLength = $derived(res.filter((c) => c.grade === 'Magister').length);
	let diplomaLength = $derived(res.filter((c) => c.grade === 'Diplomado').length);
	let cursosLength = $derived(res.filter((c) => c.grade === 'Curso').length);

	function handleSort(column: keyof Course) {
		if (sortBy.col === column) {
			sortBy.ascending = !sortBy.ascending;
		} else {
			sortBy.col = column;
			sortBy.ascending = true;
		}
	}

	function resetFilter() {
		selectedUni = '';
		selectedGrade = '';
	}
</script>

<header class="title">
	<h2>Data Science en Chile</h2>
	<p>Lista de cursos de Data Science en Chile 📈📊🇨🇱</p>
</header>

<div class="container">
	<main class="main-content">
		<section class="showcase">
			<div class="nes-container with-title is-centered">
				<p class="title">Filtros</p>
				<FilterBar
					bind:selectedUni
					bind:selectedGrade
					{univList}
					{gradesList}
				/>
				<button onclick={resetFilter} type="button" class="nes-btn is-error">
					Reset
				</button>
			</div>
		</section>

		<section class="topic">
			<div class="nes-table-responsive">
				<DataTable items={sorted} {sortBy} onSort={handleSort} />
			</div>
		</section>

		<section>
			<div class="nes-container with-title">
				<p class="title">Stats</p>
				<StatsPanel
					{resLength}
					{masterLength}
					{diplomaLength}
					{cursosLength}
				/>
			</div>
		</section>
	</main>
</div>

<a
	class="github-fork-ribbon"
	href="https://github.com/robsalasco/data_science_chile"
	data-ribbon="Fork me on GitHub"
	title="Fork me on GitHub"
>Fork me on GitHub</a>

<footer>
	<p>
		Made in <a href="https://svelte.dev" target="_blank" rel="noopener">Svelte</a>
		with ❤️ by
		<a href="https://twitter.com/robsalasco" target="_blank" rel="noopener">@robsalasco</a>
	</p>
</footer>

<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet" />
</svelte:head>

<style>
	.title {
		text-align: center;
		margin-top: 50px;
		margin-bottom: 30px;
	}

	main {
		padding: 1em;
		max-width: 980px;
		margin: 0 auto;
	}

	section {
		margin-bottom: 2.5rem;
	}

	footer {
		text-align: center;
		margin-bottom: 2rem;
	}
</style>
