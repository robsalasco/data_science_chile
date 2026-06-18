<script lang="ts">
	interface Props {
		selectedUni?: string;
		selectedGrade?: string;
		univList: string[];
		gradesList: string[];
	}

	let {
		selectedUni = $bindable(''),
		selectedGrade = $bindable(''),
		univList = [],
		gradesList = [],
	}: Props = $props();
</script>

<div class="sidebyside">
	<div class="filter-element">
		<label for="select-uni">Universidad</label>
		<div class="nes-select">
			<select bind:value={selectedUni} required id="select-uni">
				<option value="">Todos</option>
				{#each univList as uni}
					<option value={uni}>{uni}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="filter-element">
		<label for="select-grade">Grado</label>
		<div class="nes-select">
			<select bind:value={selectedGrade} required id="select-grade">
				<option value="">Todos</option>
				{#each gradesList as grade}
					<option value={grade}>{grade}</option>
				{/each}
			</select>
		</div>
	</div>
</div>

<style>
	.sidebyside {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.filter-element {
		padding: 1rem 1.5rem;
		width: 400px;
		margin-bottom: 2rem;
	}
</style>
