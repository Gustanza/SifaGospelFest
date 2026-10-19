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

// Dodoma confirmed by the official Instagram on 18 Oct 2026 (Chinangali Park, 24/10/2026,
// "Saa 4 Asubuhi hadi Saa 4 Usiku" = 10 AM to 10 PM). Line-up is announced one minister per post:
// those artists carry `next: true` below.
// The Youth Talk date is still our guess (the day before, as in Mwanza and Arusha): unconfirmed.
export const nextStop = {
  region: 'Dodoma',
  date: '2026-10-24T10:00:00+03:00',
  end: '2026-10-24T22:00:00+03:00',
  dateLabel: 'Saturday, 24 October 2026',
  shortDate: 'Sat 24 Oct 2026',
  venue: 'Chinangali Park, Dodoma',
  hours: '10:00 AM – 10:00 PM',
  source: 'https://www.instagram.com/sifagospelfest/',
  youthTalk: 'Friday, 23 October 2026',
  youthTalkDraft: true,
}

// Primary navigation from the client IA brief (SifaResources/ShortDesc.txt).
// `children` render as the theme's white dropdown panels; items with children get a chevron.
// Order follows the page (Partners strip sits above Artists) so the scroll-spy underline steps left to right.
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
  { label: 'Partners', href: '#partners', children: [
    { label: 'Our Partners', href: '#partners' },
    { label: 'Become a Partner', href: '#contact' },
  ] },
  { label: 'Artists', href: '#artists' },
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
  { region: 'Dodoma', date: 'Sat 24 Oct', venue: 'Chinangali Park', status: 'next' },
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
      { time: '10:00 AM', title: 'Gates Open', text: 'Free entry for everyone: families, believers and non-believers. Food and water vendors on site.', image: '/images/geita-crowd.jpg' },
      { time: '1:00 PM', title: 'Opening Praise & Local Choirs', text: 'Choirs and worship teams from the host region open the service of praise.', image: '/images/geita-stage.jpg' },
      { time: '3:00 PM', title: 'Emerging Artists Stage', text: 'Sifa gives a big platform to new gospel voices who have never had one before.', image: '/images/baraka-gmen.jpg' },
      { time: '6:00 PM', title: 'Word & Prayer for the Nation', text: 'A moment of prayer for peace, hope, salvation and healing in Tanzania.', image: '/images/hero-stage.jpg' },
      { time: '7:00 PM', title: 'Headline Worship', text: 'The nation’s favourite gospel ministers and bands lead the night of praise until 10 PM.', image: '/images/agape-band.jpg' },
    ],
  },
]

// `next: true` = announced for the next stop (Dodoma) on the official Instagram, 18 Oct 2026.
// Those lead the grid. Ambwene's portrait is cropped from his official Dodoma poster.
export const artists = [
  { name: 'Upendo Nkone', role: 'Gospel Singer', image: '/images/artists/upendo-nkone.jpg', next: true },
  { name: 'Henrick Mruma', role: 'Gospel Singer', image: '/images/artists/henrick-mruma.jpg', next: true },
  { name: 'Ambwene Mwasongwe', role: 'Gospel Singer', image: '/images/artists/ambwene-mwasongwe.jpg', next: true },
  { name: 'Rose Muhando', role: 'Gospel Legend', image: '/images/artists/rose-muhando.jpg', video: 'KILAEtehQhE' },
  { name: 'Christina Shusho', role: 'Worship Minister', image: '/images/artists/christina-shusho.jpg' },
  { name: 'Boaz Danken', role: 'Worship Leader', image: '/images/artists/boaz-danken.jpg' },
  { name: 'Agape Gospel Band', role: 'Seben Praise Band', image: '/images/artists/agape-gospel-band.jpg', video: 'FskUhOF5nxE' },
  { name: 'Neema Gospel Choir', role: 'Choir', image: '/images/artists/neema-gospel-choir.jpg' },
]

export const alsoFeatured = ['Zabron Singers', 'Paul Clement', 'Eliya Mwantondo', 'Obby Alpha', 'Bony Mwaitege', 'Elia Mtishibi', 'Baraka Gmen', 'Come and Pray']

// Logos (client files, 19 Oct 2026) live in public/images/partners/ as single-tone white PNGs, trimmed to their ink.
// aspect = width / height of the trimmed logo; ink = share of that box that is painted (for optical sizing).
// Order alternates wide wordmarks and compact marks around the round Timeless emblem in the middle.
export const partners = [
  { name: 'Clouds Media Group', logo: '/images/partners/clouds-media.png', aspect: 3.78, ink: 0.37 },
  { name: 'Equity Bank', logo: '/images/partners/equity-bank.png', aspect: 1.546, ink: 0.41 },
  { name: 'Global TV', logo: '/images/partners/global-tv.png', aspect: 3.613, ink: 0.44 },
  { name: 'Timeless Expedition', logo: '/images/partners/timeless-expedition.png', aspect: 0.946, ink: 0.26 },
  { name: 'Talanta Sports', logo: '/images/partners/talanta-sports.png', aspect: 2.957, ink: 0.3 },
  { name: 'Event Set', logo: '/images/partners/event-set.png', aspect: 1.786, ink: 0.22 },
  { name: 'BRELA', logo: '/images/partners/brela.png', aspect: 4.224, ink: 0.46 },
]

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
  { title: 'Dodoma line-up: Upendo Nkone, Henrick Mruma and Ambwene Mwasongwe to minister at Chinangali Park', source: 'Sifa Gospel Fest', date: '18 October 2026', category: 'Line-up', image: '/images/poster-dodoma.jpg', href: 'https://www.instagram.com/p/Deod_STxDAy/' },
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
