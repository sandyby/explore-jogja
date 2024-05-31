import photoSpot from '../../assets/prambanan-assets/photo-spot.jpg'
import sendratari from '../../assets/prambanan-assets/sendratari-ramayana-prambanan.jpg'
import museumPrambanan from '../../assets/prambanan-assets/museum-prambanan.jpg'

const PrambananDataSet = [
    {
        name: 'Foto',
        img: photoSpot,
        biaya: 0,
        energi: -5,
        happinessGet: 7
    },
    {
        name: 'Melihat Museum',
        img: museumPrambanan,
        biaya: 25000,
        energi: -13,
        happinessGet: 15
    },
    {
        name: 'Menyaksikan Sendratari Ramayana',
        img: sendratari,
        biaya: 144000,
        energi: -21,
        happinessGet: 48
    },
];

export default PrambananDataSet;
