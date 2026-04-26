export const triageScript = [
  {
    id: 1,
    bot: 'Kumusta ang kalagayan ninyo? Alin dito ang pinaka-nararamdaman ninyo ngayon?',
    placeholder: 'I-type ang nararamdaman…',
    chips: [
      'Matinding uhaw at panghihina',
      'Pagkahilo at sakit ng ulo',
      'Mainit ang katawan',
      'Posibleng heatstroke',
    ],
  },
  {
    id: 2,
    user: 'Pagkahilo at sakit ng ulo mula kanina.',
    bot: 'Salamat. Gaano katagal na kayong may ganitong sintomas?',
    chips: ['Today lang', '1-3 araw', 'Mahigit isang linggo'],
  },
  {
    id: 3,
    user: '1-3 araw na.',
    bot: 'May alin pa sa mga sumusunod?',
    chips: ['1-3 (banayad)', '4-6 (medyo malala)', '7-10 (sobra)'],
  },
  {
    id: 4,
    user: 'May panghihina at sobrang uhaw.',
    bot: 'Naiintindihan ko. May warning signs ba tulad ng pagsusuka, pagkalito, o hirap huminga?',
    chips: ['Wala naman', 'Pagsusuka', 'Pagkalito', 'Hirap huminga'],
  },
  {
    id: 5,
    user: 'Wala naman, pero nanghihina pa rin.',
    bot: 'Salamat. Sandali lang, hahanap na ako ng tamang serbisyo para sa inyo.',
    chips: [],
    final: true,
  },
];

export const recommendation = {
  service: 'Emergency Heat Assessment',
  urgency: 'Urgent',
  waitNote: 'Posibleng heat-related illness — huwag patagalin',
  rationale: [
    'Ang kombinasyon ng matinding init, panghihina, at pagkahilo ay maaaring senyales ng heat exhaustion o heatstroke.',
    'Kapag may lagnat, pagkalito, o sobrang uhaw, kailangan ng agarang assessment para maiwasan ang komplikasyon.',
    'Mas mainam ang maagang hydration at cooling protocol sa ospital kaysa maghintay sa bahay.',
  ],
  alternatives: [
    {
      service: 'General Medicine',
      reason: 'Para sa initial evaluation kung banayad pa ang sintomas.',
    },
    {
      service: 'Emergency Room',
      reason: 'Kung may pagsusuka, pagkalito, o hirap huminga dahil sa sobrang init.',
    },
  ],
};
