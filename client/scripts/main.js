/** @jsx plainJSX */

import oHoverable from 'o-hoverable';
import attachFastClick from 'fastclick';
import setUpOverlay from './set-up-overlay';
import ENABLE_ANIMATION from './enable-animation';


// make a quick look-up table for the stories
const storiesData = {};
spreadsheet.stories.forEach(story => {
  storiesData[story.slug] = story;
});


// wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // automatically make hover effects work on touch devices
  oHoverable.init();


  // remove the 300ms tap delay on mobile browsers
  attachFastClick(document.body);

  // grab key elements
  const main = document.querySelector('main');
  const newspaper = document.querySelector('.page-header__newspaper');
  const newspaperInner = document.querySelector('.page-header__newspaper__inner');
  const articleHeader = main.querySelector('.article-header');

  // make share links HTML (will be cloned and reused in a couple of places)
  let shareLinks;
  {
    const {tweet, urlToShare, linkedInShareTitle, linkedInShareSummary} = spreadsheet.options;

    const twitterLink = `https://twitter.com/home?status=${encodeURIComponent(tweet)}`;
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
    const linkedInLink = `https://www.linkedin.com/shareArticle?mini=true&url=http%3A//ft.com/eu-ref&title=${encodeURIComponent(linkedInShareTitle)}&summary=${encodeURIComponent(linkedInShareSummary)}&source=FT.com`;

    shareLinks = (
      <div class="share-links">
        <p>Share this on:</p>
        <ul>
          <li>
            <a class="share-links__link share-links__link--twitter" target="_blank" href={twitterLink}>
              <span>Twitter</span>
            </a>
          </li>
          <li>
            <a class="share-links__link share-links__link--facebook" target="_blank" href={facebookLink}>
              <span>Facebook</span>
            </a>
          </li>
          <li>
            <a class="share-links__link share-links__link--linked-in" target="_blank" href={linkedInLink}>
              <span>LinkedIn</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }

  // set up intro elements (headline etc.)
  {
    articleHeader.querySelector('.article-header__headline').textContent = spreadsheet.options.headline;
    articleHeader.querySelector('.article-header__standfirst').textContent = spreadsheet.options.standfirst;
    articleHeader.querySelector('.article-header__byline').textContent = spreadsheet.options.byline;
    articleHeader.querySelector('.article-header__date').innerText = spreadsheet.options.publishDate;
    articleHeader.querySelector('.article-header__share-links').appendChild(shareLinks.cloneNode(true));
  }


  // set up the overlay view
  const overlay = setUpOverlay();


  // render the main content
  const articleContent = <section class="article-content"/>;
  {
    articleContent.innerHTML = spreadsheet.content[0].content;

    // enhance all 'STORY: *' h1 elements into whatever

    // find all the 'story' placeholders in it and replace them with real story views
    const h1s = articleContent.querySelectorAll('h1');
    for (let i = 0, l = h1s.length; i < l; i++) {
      const placeholder = h1s[i];
      const [tag, slug] = placeholder.textContent.split(': ');
      if (tag !== 'STORY') continue;

      const {image, copy, date} = storiesData[slug];

      let figure;
      const article = (
        <article class="archive-reader">
          {figure = (
            <figure class="archive-reader__figure">
              <img src={image}/>
            </figure>
          )}
        </article>
      );

      figure.addEventListener('click', () => {
        overlay.show(figure, copy, new Date(date));
      });

      articleContent.replaceChild(article, placeholder);
    }

    // add the map
    {
      const mapPlaceholder = [].slice.apply(h1s).filter(h1 => h1.textContent.trim() === 'MAP')[0];

      let mapFigure;
      var map = <article class="archive-reader">
        {mapFigure = (
          <figure class="archive-reader__figure">
            <img src="images/old-map.png" height="500" />
          </figure>
        )}
      </article>

      mapFigure.addEventListener('click', () => {
        // console.log('map');
        overlay.showMap(mapFigure);
      });

      articleContent.replaceChild(map, mapPlaceholder);
    }

    // add the promo link
    {
      const para = articleContent.querySelectorAll('p')[spreadsheet.options.promoAfterPara];
      if (para) {
        para.parentNode.insertBefore((
          <a class="promo-link" href="http://blogs.ft.com/ftdata/2015/09/23/ft-digital-archive/">
            <img src="images/promo.png" />
            <div class="promo-link__text"><b>Find out more</b> about the <br/>FT Digital Archive</div>
          </a>
        ), para);
      }
    }

    // caption under image
    [].slice.apply(articleContent.querySelectorAll('p>img[title]:not([title=""])')).forEach(function (img) {
      const figure = <figure></figure>;

      img.parentNode.replaceChild(figure, img);

      figure.appendChild(img);
      figure.appendChild(<figcaption>{img.title}</figcaption>);
    });

    // add the closing share links
    articleContent.appendChild(
      <div class="article-content__share-links">
        {shareLinks.cloneNode(true)}
      </div>
    );
  }


  // inject the article content
  main.appendChild(articleContent);


  // make the parallax header thing work
  {
    if (ENABLE_ANIMATION) {
      let previousAmountScrolled;
      let _fixPaperPosition;

      const fixPaperPosition = () => {
        cancelAnimationFrame(_fixPaperPosition);

        _fixPaperPosition = requestAnimationFrame(() => {
          const maxScrollRange = 1000;
          const minOpacity = 0.5;
          const amountScrolled = pageYOffset <= maxScrollRange ? pageYOffset : maxScrollRange;

          if (previousAmountScrolled !== amountScrolled) {
            previousAmountScrolled = amountScrolled;

            const proportionScrolled = amountScrolled / maxScrollRange;

            let shiftDown = proportionScrolled * (maxScrollRange / 2);

            // let blur = proportionScrolled * 9;

            let opacity = 1 - proportionScrolled;
            if (opacity < minOpacity) opacity = minOpacity;

            newspaper.style.transform = `translate3d(0,${shiftDown}px,0)`;
            newspaperInner.style.opacity = opacity;
            // newspaper.style.webkitFilter = `blur(${blur}px)`;
          }
        });
      };

      document.addEventListener('scroll', fixPaperPosition);
      fixPaperPosition();
    }
  }

  // debugging
  // setTimeout(() => {
  //   document.querySelectorAll('[src="images/old-map.png"]')[0].parentNode.dispatchEvent(new Event('click'));
  // }, 100);
});
