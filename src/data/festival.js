// Content for the first-draft landing page.
// Facts come from SifaResources/research/SIFA-RESEARCH.md. Entries marked `draft: true`
// are educated guesses (regions 5 & 6, programme times) to be confirmed by the client.

export const festival = {
  name: 'Sifa Gospel Fest',
  year: 2026,
  slogan: 'Kila mwenye pumzi na amsifu Bwana',
  sloganEn: 'Let everything that has breath praise the Lord',
  verse: 'Psalm 150:6',
  tagline: 'Ibada kubwa ya kusifu na kuabudu',
  organiser: 'QS Suma Mwaitenda',
}

export const nextStop = {
  draft: true,
  region: 'Dodoma',
  date: '2026-10-24T12:00:00+03:00',
  dateLabel: 'Saturday, 24 October 2026',
  shortDate: 'Sat 24 Oct 2026',
  venue: 'Viwanja vya Jamhuri, Dodoma',
  hours: '12:00 PM – 10:00 PM',
  youthTalk: 'Friday, 23 October 2026',
}

// Primary navigation from the client IA brief (SifaResources/ShortDesc.txt).
// `children` render as the theme's white dropdown panels; items with children get a chevron.
export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'The Festival', href: '#festival', children: [
    { label: 'About Sifa Gospel Fest', href: '#festival' },
    { label: 'Festival Experience', href: '#festival' },
    { label: 'Past Editions', href: '#tour' },
  ] },
  { label: "This Year's Event", href: '#programme', children: [
    { label: 'Event Overview', href: '#venue' },
    { label: 'Programme / Schedule', href: '#programme' },
    { label: 'Line-up', href: '#artists' },
    { label: '2026 Tour Route', href: '#tour' },
    { label: 'Sifa Youth Talk', href: '#passes' },
  ] },
  { label: 'Artists', href: '#artists' },
  { label: 'Partners', href: '#partners', children: [
    { label: 'Our Partners', href: '#partners' },
    { label: 'Become a Partner', href: '#contact' },
  ] },
  { label: 'Media', href: '#media', children: [
    { label: 'Photo Gallery', href: '#gallery' },
    { label: 'Videos', href: '#media' },
    { label: 'News', href: '#media' },
  ] },
  { label: 'Contact', href: '#contact' },
]

export const tour = [
  { region: 'Mbeya', date: 'Sat 5 Sep', venue: 'Mbeya City', status: 'done', image: '/images/poster-mbeya.jpg' },
  { region: 'Geita', date: 'Sat 19 Sep', venue: 'Geita Town', status: 'done', image: '/images/poster-geita.jpg' },
  { region: 'Mwanza', date: 'Sat 26 Sep', venue: 'Uwanja wa Furahisha, Ilemela', status: 'done', image: '/images/poster-mwanza.jpg' },
  { region: 'Arusha', date: 'Sat 10 Oct', venue: 'Viwanja vya Sinon', status: 'done', image: '/images/poster-arusha.jpg' },
  { region: 'Dodoma', date: 'Sat 24 Oct', venue: 'Viwanja vya Jamhuri', status: 'next', draft: true },
  { region: 'Dar es Salaam', date: 'Sat 7 Nov', venue: 'Grand Finale · TBC', status: 'finale', draft: true },
]

export const programme = [
  {
    id: 'youth',
    title: 'Sifa Youth Talk',
    subtitle: 'Friday · Day Before',
    items: [
      { time: '1:00 PM', title: 'Welcome & Opening Prayer', text: 'Doors open for students, graduates and young entrepreneurs. Free entry, all welcome.', image: '/images/youth-talk-mwanza.jpg' },
      { time: '1:30 PM', title: 'Career Development', text: 'Beyond certificates: what marketable skills do you carry? A session with QS Suma Mwaitenda.', image: '/images/suma-avatar.jpg' },
      { time: '3:00 PM', title: 'Entrepreneurship & Business Formalisation', text: 'Start, register and grow your business, with partners from BRELA and Equity Bank.', image: '/images/arusha-presser.jpg' },
      { time: '4:30 PM', title: 'Digital Skills & Talent Mentorship', text: 'Building your voice online and nurturing God-given talent, with gospel artists as mentors.', image: '/images/mwanza-interview.jpg' },
    ],
  },
  {
    id: 'festival',
    title: 'Festival Day',
    subtitle: 'Saturday · Main Stage',
    items: [
      { time: '12:00 PM', title: 'Gates Open', text: 'Free entry for everyone: families, believers and non-believers. Food and water vendors on site.', image: '/images/geita-crowd.jpg' },
      { time: '1:00 PM', title: 'Opening Praise & Local Choirs', text: 'Choirs and worship teams from the host region open the service of praise.', image: '/images/geita-stage.jpg' },
      { time: '3:00 PM', title: 'Emerging Artists Stage', text: 'Sifa gives a big platform to new gospel voices who have never had one before.', image: '/images/baraka-gmen.jpg' },
      { time: '6:00 PM', title: 'Word & Prayer for the Nation', text: 'A moment of prayer for peace, hope, salvation and healing in Tanzania.', image: '/images/hero-stage.jpg' },
      { time: '7:00 PM', title: 'Headline Worship', text: 'The nation’s favourite gospel ministers and bands lead the night of praise until 10 PM.', image: '/images/agape-band.jpg' },
    ],
  },
]

export const artists = [
  { name: 'Rose Muhando', role: 'Gospel Legend', image: '/images/artists/rose-muhando.jpg', video: 'KILAEtehQhE' },
  { name: 'Christina Shusho', role: 'Worship Minister', image: '/images/artists/christina-shusho.jpg' },
  { name: 'Upendo Nkone', role: 'Gospel Singer', image: '/images/artists/upendo-nkone.jpg' },
  { name: 'Boaz Danken', role: 'Worship Leader', image: '/images/artists/boaz-danken.jpg' },
  { name: 'Henrick Mruma', role: 'Gospel Singer', image: '/images/artists/henrick-mruma.jpg' },
  { name: 'Eliya Mwantondo', role: 'Gospel Singer', image: '/images/artists/eliya-mwantondo.jpg' },
  { name: 'Agape Gospel Band', role: 'Seben Praise Band', image: '/images/artists/agape-gospel-band.jpg', video: 'FskUhOF5nxE' },
  { name: 'Neema Gospel Choir', role: 'Choir', image: '/images/artists/neema-gospel-choir.jpg' },
]

export const alsoFeatured = ['Zabron Singers', 'Paul Clement', 'Obby Alpha', 'Bony Mwaitege', 'Ambwene Mwasongwe', 'Elia Mtishibi', 'Baraka Gmen', 'Come and Pray']

export const partners = ['Clouds Media', 'Global TV', 'Timeless Expedition', 'Talanta Sports', 'Event Set', 'Equity Bank', 'BRELA']

export const counters = [
  { value: 6, suffix: '', label: 'Regions' },
  { value: 25, suffix: '+', label: 'Gospel Artists' },
  { value: 136, suffix: 'K+', label: 'Views of one set' },
  { value: 0, prefix: 'TSh ', suffix: '', label: 'Entry Fee' },
]

export const voices = [
  { date: 'Arusha · Oct 2026', quote: 'We have seen big concerts of secular music, but for a long time gospel music has lacked a big stage that gives it value. We believe God has given us grace to create this platform.', name: 'Suma Mwaitenda', role: 'Festival Coordinator', image: '/images/suma-avatar.jpg' },
  { date: 'Arusha · 10 Oct 2026', quote: 'Today na today y’all. Arusha SIFA Gospel Festival is going down. Show up, show up, don’t miss y’all. Love you big Arusha!', name: 'Christina Shusho', role: 'Gospel Minister', image: '/images/artists/christina-shusho.jpg' },
  { date: 'Arusha · Oct 2026', quote: 'There is no entrance fee. We sell nothing but the Word of God, which is free to believers and non-believers alike.', name: 'Organising Committee', role: 'Sifa Gospel Fest', image: '/images/logo.png' },
  { date: 'Mwanza · Sep 2026', quote: 'We believe that in praise there is healing, and many people have continued to be healed through this service.', name: 'Suma Mwaitenda', role: 'Festival Coordinator', image: '/images/suma-avatar.jpg' },
]

export const videos = [
  { id: 'FskUhOF5nxE', title: 'Agape Gospel Band: 1 Hour Seben Mix', meta: 'Mwanza', category: 'Highlights' },
  { id: 'KILAEtehQhE', title: 'Rose Muhando: Hot Seben Praise', meta: 'Sifa Gospel Fest 2026', category: 'Highlights' },
  { id: 'XhYi949kti0', title: 'Mwanza: The Full Service of Praise', meta: 'Full live stream', category: 'Live' },
]

export const news = [
  { title: 'Sifa Gospel Fest lands in Arusha: top gospel singers to light up Sinon', source: 'Arusha Digital', date: 'October 2026', category: 'Announcement', image: '/images/arusha-presser.jpg', href: 'https://www.arushadigital.com/2026/10/tamasha-kubwa-la-sifa-gospel-fest-kutua.html' },
  { title: 'Mwanza ends with a bang as gospel stars light up Furahisha', source: 'Global Publishers', date: '27 September 2026', category: 'Recap', image: '/images/hero-stage.jpg', href: 'https://globalpublishers.co.tz/2026/09/27/sifa-gospel-fest-2026-yamalizika-kwa-kishindo-mwanza-mastaa-wa-gospel-wakiwasha-video/' },
  { title: 'Sifa Youth Talk connects young people with life opportunities', source: 'Global Publishers', date: '26 September 2026', category: 'Youth Talk', image: '/images/youth-talk-mwanza.jpg', href: 'https://globalpublishers.co.tz/2026/09/26/sifa-gospel-fest-2026-suma-awaunganisha-vijana-na-fursa-za-maisha-video/' },
]

// Five-image full-width strip (theme Home 5 portfolio strip)
export const photoStrip = [
  { src: '/images/stage-singer.jpg', alt: 'A worship leader with the band on the Mwanza stage' },
  { src: '/images/geita-crowd.jpg', alt: 'The crowd worshipping in Geita' },
  { src: '/images/rose-seben.jpg', alt: 'Rose Muhando with friends backstage' },
  { src: '/images/agape-band.jpg', alt: 'Agape Gospel Band on stage at night' },
  { src: '/images/geita-stage.jpg', alt: 'Worship team ministering in Geita' },
]

// "Ticket" cards: the festival is free, so these are passes / ways to take part.
export const passes = [
  { price: 'Free', desc: 'Festival Day', badge: 'Sat · Main Stage', items: ['Open-air praise & worship', 'Headline gospel ministers', 'Emerging artists stage', 'Prayer for the nation', 'Family friendly · all ages'], off: 0, cta: 'Count Me In' },
  { price: 'Free', desc: 'Sifa Youth Talk', badge: 'Fri · Day Before', items: ['Career development', 'Entrepreneurship & BRELA', 'Digital skills & mentorship', 'Mental health', 'Seats are limited'], off: 1, cta: 'Reserve a Seat', featured: true },
  { price: 'Live', desc: 'Watch Online', badge: 'YouTube · Clouds · Global TV', items: ['Full live stream', 'Replays on YouTube', 'Share with family abroad', 'Pray along at home', 'No travel needed'], off: 0, cta: 'Subscribe' },
  { price: 'Join', desc: 'Volunteer / Minister', badge: 'Choirs · Teams', items: ['Choirs & worship teams', 'Ushers & street teams', 'Media & photography', 'Prayer team', 'Apply per region'], off: 0, cta: 'Apply' },
]

export const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/sifagospelfest/', icon: 'instagram' },
  { name: 'Facebook', href: 'https://www.facebook.com/sifagospelfest', icon: 'facebook' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@sifagospelfest', icon: 'tiktok' },
  { name: 'YouTube', href: 'https://www.youtube.com/@SifaGospelFest', icon: 'youtube' },
]

// Draft contact details. phone/whatsapp stay null until the client confirms real numbers
// (components hide those rows while null).
export const contact = {
  email: 'info@sifagospelfest.co.tz',
  phone: null,
  whatsapp: null,
}
