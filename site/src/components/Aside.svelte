<script>
  const links = [
    {
      title: 'Introduction',
      path: '/#introduction'
    },
    {
      title: 'Installation',
      path: '/#installation'
    },
    {
      title: 'Usage',
      path: '/#usage'
    },
    {
      title: 'Configuration',
      path: '/#configuration'
    },
    {
      title: 'Styling',
      path: '/#styling'
    }
  ];
</script>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<nav>
  <ul>
    {#each links as link}
      <li>
        <a href="{link.path}">{link.title}</a>
      </li>
    {/each}
  </ul>
</nav>
