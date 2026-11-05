export default {
  fetch(request) {
    const target = new URL(request.url);
    if (target.hostname !== 'www.paddletoday.com') return new Response('Not found', { status: 404 });
    target.protocol = 'https:'; target.hostname = 'paddletoday.com'; target.port = '';
    return new Response(null, { status: 301, headers: { location: target.href, 'cache-control': 'public, max-age=300' } });
  },
};
