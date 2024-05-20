import gardenArea from '../../assets/heha-sky-view-assets/garden-area.jpg'
import hehaAeroplane from '../../assets/heha-sky-view-assets/heha-aeroplane.jpg'
import skyGlass from '../../assets/heha-sky-view-assets/sky-glass.jpeg'
import cityLight from '../../assets/heha-sky-view-assets/jogja-city-light.JPG'
import skyBalloon from '../../assets/heha-sky-view-assets/sky-balloon.jpg'
import loveBox from '../../assets/heha-sky-view-assets/love-box.png'
import sunsetView from '../../assets/heha-sky-view-assets/sunset-view-2.jpg'
import reflecting from '../../assets/heha-sky-view-assets/reflecting-pool-and-sky-swing.png'

const HehaSkyViewDataSet = [
    {
        name: 'Jogja City Light',
        img: cityLight,
        biaya: 0,
        energi: -2,
        happinessGet: 5
    },
    {
        name: 'Sunset View',
        img: sunsetView,
        biaya: 0,
        energi: -5,
        happinessGet: 17
    },
    {
        name: 'HeHa Garden Area',
        img: gardenArea,
        biaya: 10000,
        energi: -5,
        happinessGet: 9
    },
    {
        name: 'Reflecting Pool & Sky Swing',
        img: reflecting,
        biaya: 10000,
        energi: -6,
        happinessGet: 23
    },
    {
        name: 'HeHa Aeroplane',
        img: hehaAeroplane,
        biaya: 20000,
        energi: -8,
        happinessGet: 14
    },
    {
        name: 'HeHa Sky Balloon',
        img: skyBalloon,
        biaya: 20000,
        energi: -5,
        happinessGet: 28
    },
    {
        name: 'Sky Glass',
        img: skyGlass,
        biaya: 30000,
        energi: -3,
        happinessGet: 41
    },
    {
        name: 'Love Box',
        img: loveBox,
        biaya: 30000,
        energi: -13,
        happinessGet: 78
    },
];

export default HehaSkyViewDataSet;
