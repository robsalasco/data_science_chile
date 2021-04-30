<script>
import { getData } from "./getfile";
import { onMount } from 'svelte';
let res;
let resLength;
let masterLength;
let diplomaLength;
let cursosLength;
let selectedUni;
let selectedGrade;
let coursesList = [];
let gradesList = [];
let univList = [];
onMount(async () => {
res = await getData();
coursesList = res;
gradesList = [...new Set(res.map(function(x) {return x.grade}))];
univList = [...new Set(res.map(function(x) {return x.university}))];
resLength = res.length
masterLength = res.filter(x => x.grade=='Magister').length
diplomaLength = res.filter(x => x.grade=='Diplomado').length
cursosLength = res.filter(x => x.grade=='Curso').length
});
function handleFilter() {
coursesList = res;
if (selectedUni == "" && selectedGrade == "") {
coursesList = res
} else if  (selectedGrade == "") {
coursesList = coursesList.filter((value) => value.university == selectedUni);
} else if (selectedUni == "") {
coursesList = coursesList.filter((value) => value.grade == selectedGrade);
} else if (selectedUni != "" && selectedGrade != "") {
coursesList = coursesList.filter((value) => value.grade == selectedGrade && value.university == selectedUni);
} else {
coursesList = res
}
}
function resetFilter() {
coursesList = res
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
        <div class="test">
          <div class="filter-element">
            <label for="default_select">Universidad</label>
            <div class="nes-select">
              <select bind:value={selectedUni} required id="default_select">
                <option value="" >Todos</option>
                {#each univList as uni}
                <option value={uni}>{uni}</option>
                {/each}
              </select>
            </div>
          </div>
          <div class="filter-element">
            <label for="default_select">Grado</label>
            <div class="nes-select">
              <select bind:value={selectedGrade} required id="default_select">
                <option value="">Todos</option>
                {#each gradesList as grade}
                <option value={grade}>{grade}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>
        <button on:click={handleFilter} type="button" class="nes-btn is-primary">Filtrar</button>
        <button on:click={resetFilter} type="button" class="nes-btn is-error">Reset</button>
      </div>
    </section>
    <section class="topic">
      <div class="nes-table-responsive">
        <table class="nes-table is-bordered is-centered">
          <thead>
            <tr>
              <th>ID</th>
              <th>University</th>
              <th>Grado</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Moneda</th>
            </tr>
          </thead>
          <tbody>
            {#each coursesList as row}
            <tr>
              <td>{row.id}</td>
              <td>{row.university}</td>
              <td>{row.grade}</td>
              <td><a href={row.url}>{row.name}</a></td>
              <td>{row.price}</td>
              <td>{row.moneda}</td>
            </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>
    <section>
      <div class="nes-container with-title">
        <p class="title">Stats</p>
        <p>Total de elementos: {resLength}</p>
        <p>Total de magisters: {masterLength}</p>
        <p>Total de diplomados: {diplomaLength}</p>
        <p>Total de cursos: {cursosLength}</p>
      </div>
    </section>
  </main>
</div>
<a class="github-fork-ribbon" href="https://github.com/robsalasco/data_science_chile" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>
<footer>
  <p>Made in <a href="https://svelte.dev" target="_blank" rel="noopener">Svelte</a> with ❤️ by <a href="https://twitter.com/robsalasco" target="_blank" rel="noopener">@robsalasco</a></p>
</footer>

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
.test {
display: flex;
flex-wrap: wrap;
justify-content: space-between;
}
.filter-element {
padding: 1rem 1.5rem;
width: 400px;
margin-bottom: 2rem;
}
footer {
text-align: center;
margin-bottom: 2rem;
}
</style>

<svelte:head>
<link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
</svelte:head>