<script lang="ts">
	interface Props {
		resLength: number;
		masterLength: number;
		diplomaLength: number;
		cursosLength: number;
	}

	let { resLength = 0, masterLength = 0, diplomaLength = 0, cursosLength = 0 }: Props =
		$props();
</script>

<p>Total de elementos: {resLength}</p>
<p>Total de magisters: {masterLength}</p>
<p>Total de diplomados: {diplomaLength}</p>
<p>Total de cursos: {cursosLength}</p>
