<style>
	.content {
		background-color: #F9F9FB;
    display: flex;
    min-height: 400px;
    margin-top: -100px;
    border-radius: 4px;
    box-shadow: 0 1px 1px 0 rgba(60,64,67,.08),0 1px 3px 1px rgba(60,64,67,.16);
	}

  aside {
    flex: 1;
    max-width: 280px;
  }

  main {
    flex: 1;
    background-color: #fff;
    border-radius: 0 4px 4px 0;
  }
</style>

<div class="container">
  <div class="content">
    <aside>
      <slot name="aside" class="aside" />
    </aside>
    <main>
      <slot name="main" />
    </main>
  </div>
</div>
