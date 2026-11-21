/* Supabase live news loader for العدل والمساواة نيوز.
   Add <script src="./supabase-news.js"></script> just before </body> in index.html.
   Uses only the public publishable key; database RLS must remain enabled. */
(() => {
  const URL = 'https://sqrrxfrwclmjvxhvmopl.supabase.co';
  const KEY = 'sb_publishable_Ky_uJQvshLeky1z3wyc42Q_yzweZGWh';
  if (!window.supabase?.createClient) {
    console.error('Supabase JS library missing. Load @supabase/supabase-js v2 first.');
    return;
  }
  const db = window.supabase.createClient(URL, KEY);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  })[c]);
  const date = value => {
    try { return new Intl.DateTimeFormat('ar-EG', {dateStyle:'medium', timeStyle:'short'}).format(new Date(value)); }
    catch { return ''; }
  };
  async function render() {
    const { data, error } = await db.from('news')
      .select('id,title,category,summary,body,published_at,source_url,is_breaking,is_published')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(30);
    if (error) { console.error('تعذر تحميل الأخبار من Supabase:', error.message); return; }
    if (!data?.length) return;
    const hero = document.querySelector('.hero');
    const side = document.querySelector('.side');
    const grid = document.querySelector('.sec .grid') || document.querySelector('.grid');
    const ticker = document.querySelector('.ticker span');
    const first = data[0];
    if (hero) {
      hero.innerHTML = '<span class="tag'+(first.is_breaking?' r':'')+'">'+esc(first.is_breaking?'عاجل':first.category)+'</span><h2>'+esc(first.title)+'</h2><p>'+esc(first.summary || (first.body || '').slice(0,180))+'</p><small>'+esc(date(first.published_at))+'</small>';
    }
    if (side) {
      const rest = data.slice(1,6);
      side.innerHTML = '<h3>أحدث الأخبار</h3>'+rest.map(n=>'<a href="#news-'+esc(n.id)+'">'+esc(n.title)+'<time>'+esc(date(n.published_at))+'</time></a>').join('');
    }
    if (grid) {
      grid.innerHTML = data.slice(1).map(n=>'<article class="card" id="news-'+esc(n.id)+'"><span class="tag'+(n.is_breaking?' r':'')+'">'+esc(n.is_breaking?'عاجل':n.category)+'</span><h4>'+esc(n.title)+'</h4><p>'+esc(n.summary || (n.body || '').slice(0,220))+'</p><time>'+esc(date(n.published_at))+'</time>'+(n.source_url?'<p><a href="'+esc(n.source_url)+'" target="_blank" rel="noopener noreferrer">المصدر</a></p>':'')+'</article>').join('');
    }
    if (ticker) ticker.textContent = data.filter(n=>n.is_breaking).slice(0,5).map(n=>n.title).join(' • ') || first.title;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, {once:true});
  else render();
})();
