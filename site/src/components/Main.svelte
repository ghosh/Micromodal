<style>
  article {
    padding: 20px;
  }
</style>


<article class="fl dark-gray w-100 w-75-l pl5-l">
  <h1 class="f3 fw6 lh-title mb4 black heading" id="introduction">
    Introduction
  </h1>

  <h3 class="f4 fw4 lh-copy mv4 black-80">
    <strong>Micromodal.js</strong> is a lightweight, configurable and a11y-enabled modal library written in pure JavaScript
  </h3>

  <p class="lh-copy mv4 black-80">
    It enables you to create <a href="https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal" target="_blank" rel="noopener" class="blue underline no-underline-hover">WAI-ARIA guidelines</a> compliant modal dialogs, with confidence and with minimal configuration. At just 1.9kb minified and gzipped, its a tiny library for big change.
  </p>


  <div class="bg-washed-green tc">
    <div class="mv5 dib">

      <button class="f6 grow no-underline br2 ph4 pv3 dib white bg-dark-green bn"  data-custom-open="modal-1" role="button">
        Demo Modal
      </button>

    </div>
  </div>

  <p class="lh-copy mv4 black-80">
    Following are some of the interactions handled by the library:-
  </p>

  <ul class="lh-copy checkmark pl0 mv4">
    <li class="mv1">Closing modal on overlay click</li>
    <li class="mv1">Closing modal on <code>esc</code> button press</li>
    <li class="mv1">Toggling <code>aria-hidden</code> attribute on modal</li>
    <li class="mv1">Trapping tab focus within the modal</li>
    <li class="mv1">Maintaining focus position before and after toggling modal</li>
    <li class="mv1">Focusing on the first focusable element within the modal</li>
  </ul>



  <h2 class="f3 fw6 lh-title mt5 mb4 black heading" id="installation">
    Installation
  </h2>

  <p class="lh-copy mv4 black-80">
    Micromodal is available on <code>npm</code> and can be installed from the command line via npm or yarn
  </p>

  <pre><code class="language-js">
npm install micromodal --save // via npm
yarn add micromodal --save // via yarn
  </code></pre>

  <p class="lh-copy mv4 black-80">
    You can also download or link to the latest compiled version using the CDN.
  </p>

  <pre><code class="language-js">
https://unpkg.com/micromodal/dist/micromodal.min.js
  </code></pre>



  <h2 class="f3 fw6 lh-title mt5 mb4 black heading" id="usage">
    Usage
  </h2>

  <p class="lh-copy mv4 black-80">
    Designed to be easy to use, it does most of the heavy lifting behind the scenes and exposes a simple api to interact with the dom.
  </p>

  <p class="lh-copy mv4 black-80">
    Typically modals have an overlay which cover the rest of the content. To achieve this, it is normal to put the modal code just before the closing <code>body</code> tag, so that the modal overlay is relative to the body and covers the whole screen.
  </p>

  <h3 class="f4 fw6 mv4">
    1. Add the modal markup
  </h3>

  <p class="lh-copy mv4 black-80">
    The following html structure is expected for the modal to work. It can of course be extended to suit your needs. As an example of the customization, see the source code of the demo modal <a href="https://gist.github.com/ghosh/4f94cf497d7090359a5c9f81caf60699#file-micromodal-html" target="_blank" rel="noopener" class="blue underline no-underline-hover">here</a>.
  </p>

  <pre data-line="3" ><code class="language-html">
&lt;!-- [1] --&gt;
&lt;div id=&quot;modal-1&quot; aria-hidden=&quot;true&quot;&gt;

&lt;!-- [2] --&gt;
&lt;div tabindex=&quot;-1&quot; data-micromodal-close&gt;

&lt;!-- [3] --&gt;
&lt;div role=&quot;dialog&quot; aria-modal=&quot;true&quot; aria-labelledby=&quot;modal-1-title&quot; &gt;


&lt;header&gt;
  &lt;h2 id=&quot;modal-1-title&quot;&gt;
    Modal Title
  &lt;/h2&gt;

  &lt;!-- [4] --&gt;
  &lt;button aria-label=&quot;Close modal&quot; data-micromodal-close&gt;&lt;/button&gt;
&lt;/header&gt;

&lt;div id=&quot;modal-1-content&quot;&gt;
  Modal Content
&lt;/div&gt;

&lt;/div&gt;
&lt;/div&gt;
&lt;/div&gt;
  </code></pre>

  <ul class="ordered lh-copy pl0 mv4">
    <li class="pl4 pv3">
      This is the outermost container of the modal. It's job is to toggle the display of the modal. It is important that every modal have a unique <code>id</code>. By default the <code>aria-hidden</code> will be <code>true</code>. Micromodal takes care of toggling the value when required.
    </li>
    <li class="pl4 pv3">
      This is the <code>div</code> which acts as the overlay for the modal. Notice the <code>data-micromodal-close</code> on it. This is a special attribute which indicates that the element that it is on should trigger the close of the modal on click. If we remove that attribute, clicking on the overlay will not close the modal anymore.
    </li>
    <li class="pl4 pv3">
      The <code>role="dialog"</code> attribute is used to inform assistive technologies that content within is separate from the rest of the page. Additionally, the <code>aria-labelledby="modal-1-title"</code> attribute points to the <code>id</code> of the modal title. This is to help identify the purpose of the modal.
    </li>
    <li class="pl4 pv3">
      Ensuring that all buttons have a <code>aria-label</code> attribute which defines the action of the button. Notice the <code>data-micromodal-close</code> attribute is used on the button since we want to close the modal on press.
    </li>
  </ul>



  <h3 class="f4 fw6 mv4">
    2. Add micromodal.js
  </h3>

  <p class="lh-copy mv4 black-80">
    If you included the compiled file from the CDN into your project, you will have access to a <code>MicroModal</code> global variable, which you can use to instantiate the module.
  </p>

  <p class="lh-copy mv4 black-80">
    In cases with a modular workflow, you can directly import the module into your project.
  </p>

  <pre><code class="language-js">
import MicroModal from 'micromodal';  // es6 module
var MicroModal = require('micromodal'); // commonjs module
  </code></pre>

  <h3 class="f4 fw6 mv4">
    3. Use with data attributes
  </h3>

  <p class="lh-copy mv4 black-80">
    Set <code>data-micromodal-trigger="modal-1"</code> on an element, like a button or link, on whose click you want to show the modal. The value of the attribute, in this case <code>modal-1</code> should correspond to the <code>id</code> of the modal you want to toggle.
  </p>

  <p class="lh-copy mv4 black-80">
    Then instantiate the <code>MicroModal</code> module, so that it takes care of all the bindings for you.
  </p>

  <pre><code class="language-js">
MicroModal.init();
  </code></pre>


  <p class="lh-copy mv4 black-80">
    Example:-
  </p>

  <div class="bg-washed-green tc">
    <div class="mv5 dib">

      <a class="f5 fw6 db dark-green underline no-underline-hover js-modal-trigger" href="javascript:;">
        Trigger Modal
      </a>

    </div>
  </div>

  <h4 class="f5 fw6 mv4">
    3.1. Custom data attributes
  </h4>

  <p class="lh-copy mv4 black-80">
    You can also specify custom attributes to open and close modals. Set <code>data-custom-open="modal-1"</code> to any element on the page and pass it in <code>init</code> method as parameter of <code>openTrigger</code>.
  </p>

  <p class="lh-copy mv4 black-80">
    The working and usage is same as <code>data-micromodal-trigger</code>, but with your own defined data attribute, in this case it's <code>data-custom-open</code>
  </p>

  <p class="lh-copy mv4 black-80">
    Similarly, you can also define custom close attribute. Example:-
  </p>

  <pre><code class="language-html">
&lt;button data-custom-close="modal-1"&gt;close&lt;/button&gt;
  </code></pre>

  <h3 class="f4 fw6 mv4">
    4. Use with javascript
  </h3>

  <p class="lh-copy mv4 black-80">
    You can also trigger and close modals programmatically using the <code>show</code> and <code>close</code> methods on the <code>MicroModal</code> object. Example:-
  </p>

  <pre><code class="language-js">
MicroModal.show('modal-id'); // [1]
MicroModal.close('modal-id'); // [2]
  </code></pre>

  <ul class="ordered lh-copy pl0 mv4">
    <li class="pl4 pv3">
      The string passed to the <code>show</code> method must correspond to the <code>id</code> of the modal to be open. You can also pass in a config object in the <code>show</code> method and it will apply only to this modal.
    </li>
    <li class="pl4 pv3">
      The string passed to the <code>close</code> method must correspond to the <code>id</code> of the modal to be closed
    </li>
  </ul>

  <h2 class="f3 fw6 lh-title mt5 mb4 black heading" id="configuration">
    Configuration
  </h2>
  <p class="lh-copy mv4 black-80">
    The <code>init</code> and <code>show</code> method accepts an optional configuration object. This allows you to set custom callbacks and control behaviour of the modal. Example:-
  </p>

  <ul class="ordered lh-copy pl0 mv4">
    <li class="pl4 pv3">
      <strong class="fw5">onShow</strong> <code>function</code>
      <p>
        This is fired when the modal is opening. The function receives the modal object as the first parameter
      </p>
    </li>
    <li class="pl4 pv3">
      <strong class="fw5">onClose</strong> <code>function</code>
      <p>
        This is fired when the modal is closing. The function receives the modal object as the first parameter
      </p>
    </li>
    <li class="pl4 pv3">
      <strong class="fw5">openTrigger</strong> <code>string</code>
      <p>
        Custom data attribute to open modal. Default is <code>data-micromodal-trigger</code>
      </p>
    </li>
    <li class="pl4 pv3">
      <strong class="fw5">closeTrigger</strong> <code>string</code>
      <p>
        Custom data attribute to close modal. Default is <code>data-micromodal-close</code>
      </p>
    </li>
    <li class="pl4 pv3">
      <strong class="fw5">disableScroll</strong> <code>boolean</code>
      <p>
        This disables scrolling on the page while the modal is open. The default value is <code>false</code>
      </p>
    </li>
    <li class="pl4 pv3">
      <strong class="fw5">disableFocus</strong> <code>boolean</code>
      <p>
        Disable auto focus on first focusable element. Default is <code>false</code>
      </p>
    </li>
    <li class="pl4 pv3">
      <strong class="fw5">awaitCloseAnimation</strong> <code>boolean</code>
      <p>
        Set this to <code>true</code> if using css animations to hide the modal. This allows it to wait for the animation to finish before
        removing it from the DOM. Default is <code>false</code>
      </p>
    </li>
    <li class="pl4 pv3">
      <strong class="fw5">debugMode</strong> <code>boolean</code>
      <p>
        This option suppresses the console warnings if passed as <code>true</code>. The default value is <code>false</code>
      </p>
    </li>
  </ul>

  <h2 class="f3 fw6 lh-title mt5 mb4 black heading" id="styling">
    Styling
  </h2>

  <p class="lh-copy mv4 black-80">
    Micromodal does not make any stylistic choices about your modal and hence comes with no styling at all. It does not even toggle the visibility of the modal. You are free to style the modal in anyway you wish.
  </p>

  <p class="lh-copy mv4 black-80">
    At the very least, we recommend the following bit of <code>css</code> to toggle the modal.
  </p>

  <p class="lh-copy mv4 black-80">
    In case you do want some default styles to get started quickly, you can refer to the styles and the corresponding markup of the demo modal here:-
  </p>

  <p class="lh-copy fw6 db">
    <a href="https://gist.github.com/ghosh/4f94cf497d7090359a5c9f81caf60699" target="_blank" rel="noopener" class="blue underline no-underline-hover">Demo markup and styles.</a>
  </p>
</article>