/** @jsx plainJSX */

import pageScrolling from './page-scrolling';

export default function setUpOverlay() {
  // declare variables for key elements
  let overlay, overlayInner, overlayContent;

  // construct the overlay element itself
  overlay = (
    <div class="overlay overlay--hidden">
      {
        overlayInner = (
          <div class="overlay__inner">
            <div class="overlay__close-button">×</div>
            {overlayContent = <div class="overlay__content"/>}
          </div>
        )
      }
    </div>
  );

  // make show/hide functions
  let showing = false;

  function show(figure, copy, articleDate) {
    if (showing) return;
    showing = true;

    overlayContent.innerHTML = (
      '<div>' +
        `<p class="overlay__date">${ formatDate(articleDate) }</p>` +
        copy +
      '</div>'
    );

    overlay.classList.remove('overlay--hidden');
    overlay.classList.add('overlay--tinted');

    fixOverlayLayout();

    overlayContent.scrollTop = 0;

    pageScrolling.disable();

    document.documentElement.classList.add('showing-overlay');
  }

  function showMap() {
    // special version of 'show' that shows the map.
    if (showing) return;
    showing = true;

    overlayContent.innerHTML = '';
    overlayContent.appendChild(
      <div>
        <p class="overlay__date">{ formatDate(new Date(1975, 5, 8)) }</p>
        <h2>1975 EU Referendum result</h2>
        <ul class="key">
          <li><span class="key__colour" style="background:#B17F7F"></span>NO</li>
          <li><span class="key__colour" style="background:#91A1C7"></span>50–60% YES</li>
          <li><span class="key__colour" style="background:#526EA1"></span>60–70% YES</li>
          <li><span class="key__colour" style="background:#365885"></span>Over 70% YES</li>
        </ul>
        <img src="images/new-map.svg" class="new-map" />
      </div>
    );
        // <p class="map-note">The original map contained mistakes which have been corrected in the above version.</p>

    overlay.classList.remove('overlay--hidden');
    overlay.classList.add('overlay--tinted');

    overlay.classList.add('overlay--map');

    fixOverlayLayout();

    overlayContent.scrollTop = 0;

    pageScrolling.disable();

    document.documentElement.classList.add('showing-overlay');
  }

  function hide() {
    if (!showing) return;
    showing = false;

    overlay.classList.remove('overlay--tinted');
    overlay.classList.remove('overlay--map');
    overlay.classList.add('overlay--hidden');

    pageScrolling.enable();

    document.documentElement.classList.remove('showing-overlay');
  }

  // put it on the body
  document.body.appendChild(overlay);

  // add click handler to close it
  overlay.addEventListener('click', event => {
    const target = event.target || event.srcElement;
    if (target === overlay || target.classList.contains('overlay__close-button')) hide();
  });

  // escape to close overlay
  document.addEventListener('keydown', event => {
    if (event.keyCode === 27) hide();
  });

  // resize
  const minSides = screen.width < 400 ? 10 : 30;
  const marginTop = 45;
  const marginBottom = 15;

  function fixOverlayLayout() {
    let newWidth = window.innerWidth - (minSides * 2);
    if (newWidth > 800) newWidth = 800;

    let newHeight = window.innerHeight - (marginTop + marginBottom);

    overlayInner.style.width = newWidth + 'px';
    overlayInner.style.height = newHeight + 'px';
    overlayInner.style.marginTop = marginTop + 'px';
  }

  window.addEventListener('resize', fixOverlayLayout);


  // return an interface for showing/hiding
  return {show, showMap, hide};
}


var monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
];

function formatDate(date) {
  return (
    monthNames[date.getUTCMonth()] + ' ' +
    date.getUTCDate() + ', ' +
    date.getUTCFullYear()
  );
}
