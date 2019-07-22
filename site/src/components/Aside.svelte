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
  ul {
    position: sticky;
    position: -webkit-sticky;
    top: 8px;
    padding-left: 0;
    list-style-type: none;
    margin: 40px 20px 0 20px;
  }

  ul li {
    padding-top: .5rem;
    padding-bottom: .5rem;
    line-height: 1.5;
    border-style: dotted;
    border-width: 1px;
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-color: rgba(0,0,0,.1);
    list-style-type: none;
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
