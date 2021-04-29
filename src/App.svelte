<script>
  import { getData } from "./getfile"; // import our pokemon api calls
  import { onMount } from 'svelte';
  
  let coursesList = [];
	
  onMount(async () => {
    const res = await getData();
    coursesList = res;
  });

  console.log(coursesList)

</script>
<header class="title">
  <h2>Data Science en Chile</h2>
  <p>Lista de cursos de Data Science en Chile 📈📊🇨🇱</p>
</header>
<div class="container">
  <main class="main-content">
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
  </main>
</div>
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
</style>

<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
</svelte:head>
