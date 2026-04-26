export const triageScript = [
  {
    id: 1,
    bot: 'Kumusta po. Ano po ang pinaka-nararamdaman ninyo ngayon?',
    placeholder: 'I-type ang nararamdaman…',
    chips: [
      'Sumasakit ang puson ko',
      'Lagnat at panghihina',
      'Sakit ng ulo',
      'Buntis check-up',
    ],
  },
  {
    id: 2,
    user: 'Sumasakit ang puson ko mula kahapon.',
    bot: 'Salamat po. Gaano po katagal nang ganito?',
    chips: ['Today lang', '1-3 araw', 'Mahigit isang linggo'],
  },
  {
    id: 3,
    user: '1-3 araw na po.',
    bot: 'Gaano po kasakit, 1 hanggang 10?',
    chips: ['1-3 (banayad)', '4-6 (medyo malala)', '7-10 (sobra)'],
  },
  {
    id: 4,
    user: 'Mga 7 po. May lagnat din ako.',
    bot: 'Naiintindihan ko po. May ibang sintomas pa ba kayo? (pagsusuka, pagtatae, dugo)',
    chips: ['Wala naman', 'Pagsusuka', 'Pagtatae', 'May dugo'],
  },
  {
    id: 5,
    user: 'Wala naman po, lagnat lang at sakit.',
    bot: 'Salamat po. Sandali lang, hahanap na ako ng tamang serbisyo para sa inyo.',
    chips: [],
    final: true,
  },
];

export const recommendation = {
  service: 'OB-GYN Consultation',
  urgency: 'Urgent',
  rationale: [
    'Pananakit ng puson nang 2 araw at may lagnat ay senyales na kailangan ng eksaminasyon.',
    'Banayad-medyo urgent — hindi pa emergency, pero hindi rin pwedeng hayaan.',
    'Ang OB-GYN ang pinaka-tamang specialist para sa pananakit ng puson sa kababaihan.',
  ],
  alternatives: [
    {
      service: 'General Medicine',
      reason: 'Kung gusto muna ng general consult bago specialist.',
    },
    {
      service: 'Emergency Room',
      reason: 'Kung sumakit nang sobra (>8/10) o nagdugo.',
    },
  ],
};
