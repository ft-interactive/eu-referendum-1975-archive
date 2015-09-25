// excludes most stuff except desktop from animation.

export default screen.width > 400 && !(
  navigator.userAgent.indexOf('iPad') > -1 ||
  navigator.userAgent.indexOf('iPhone') > -1 ||
  navigator.userAgent.indexOf('iPod') > -1 ||
  navigator.userAgent.indexOf('Android') > -1
);
