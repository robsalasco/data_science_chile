<script lang="ts">
	import type { Course } from './types';

	interface Props {
		items: Course[];
		sortBy: { col: keyof Course; ascending: boolean };
		onSort: (col: keyof Course) => void;
	}

	let { items = [], sortBy, onSort }: Props = $props();

	const columns: { key: keyof Course; label: string }[] = [
		{ key: 'id', label: 'ID' },
		{ key: 'university', label: 'Universidad' },
		{ key: 'grade', label: 'Grado' },
		{ key: 'name', label: 'Nombre' },
		{ key: 'price', label: 'Precio' },
		{ key: 'moneda', label: 'Moneda' },
	];
</script>

<table class="nes-table is-bordered is-centered">
	<thead>
		<tr>
			{#each columns as { key, label }}
				<th onclick={() => onSort(key)}>
					{label}
					{#if sortBy.col === key}
						<span class="sort-indicator">{sortBy.ascending ? '▲' : '▼'}</span>
					{/if}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each items as row}
			<tr>
				<td>{row.id}</td>
				<td>{row.university}</td>
				<td>{row.grade}</td>
				<td><a href={row.url}>{row.name}</a></td>
				<td>{row.price}</td>
				<td>{row.moneda}</td>
			</tr>
		{:else}
			<tr>
				<td colspan="6" style="width:200%">
					<p style="text-align:center;">No hay información disponible</p>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.sort-indicator {
		margin-left: 4px;
		font-size: 0.7em;
	}

	th {
		cursor: pointer;
		user-select: none;
	}

	th:hover {
		opacity: 0.8;
	}
</style>
