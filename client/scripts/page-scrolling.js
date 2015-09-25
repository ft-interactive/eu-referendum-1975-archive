/**
 * Functions for disabling and re-enabling page scrolling. This is more complex
 * than just "overflow: hidden", because that would cause the viewport to jump
 * to the top.
 *
 * It relies on all page contents being wrapping inside two nested divs:
 *   <body>
 *     <div class="page-wrap-1">
 *       <div class="page-wrap-2">
 *         EVERYTHING
 *       </div>
 *     </div>
 *   </body>
 *
 * This is so the content can be artificially shifted up to give the impression
 * that the page is still 'scrolled' to a given point, even though the body's
 * scroll position is effectively zero when scrolling is disabled.
 */

const wrap1 = document.body.querySelector('.page-wrap-1');
const wrap2 = wrap1.querySelector('.page-wrap-2');

let scrollOffset;

// function to disable body scrolling
function disable() {
  // note the scroll offset
  scrollOffset = document.body.scrollTop;

  // add the class to lock the body scroll
  document.documentElement.classList.add('prevent-scrolling');

  // faux-scroll the page back up
  wrap2.style.top = '-' + scrollOffset + 'px';
}


// function to re-enable body scrolling
function enable() {
  // remove the class to unlock body scroll
  document.documentElement.classList.remove('prevent-scrolling');

  // flush paint queue
  wrap2.getBoundingClientRect();

  // remove the faux-scroll
  wrap2.style.top = '0';

  // revert to the original scrolltop
  document.body.scrollTop = scrollOffset;
}


export default {enable, disable};
