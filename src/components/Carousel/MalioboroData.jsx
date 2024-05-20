import bakpia from '../../assets/malioboro-assets/bakpia.png'
import krecek from '../../assets/malioboro-assets/krecek.png'
import kueApem from '../../assets/malioboro-assets/kue-apem.jpg'
import malioboro1 from '../../assets/malioboro-assets/malioboro-1.png'
import malioboro2 from '../../assets/malioboro-assets/malioboro-2.jpg'
import malioboro3 from '../../assets/malioboro-assets/malioboro-3.jpg'
import malioboro4 from '../../assets/malioboro-assets/malioboro-4.jpg'
import andong1 from '../../assets/malioboro-assets/andong-1.jpg'
import andong2 from '../../assets/malioboro-assets/andong-2.jpg'
import gudeg from '../../assets/malioboro-assets/gudeg.PNG'
import munggurMinang from '../../assets/malioboro-assets/munggur-minang.png'
import mieAyam from '../../assets/malioboro-assets/mie-ayam-kamehame.png'
import osengMercon from '../../assets/malioboro-assets/oseng-mercon.png'
import pasarMalioboro from '../../assets/malioboro-assets/pasar-malioboro.jpg'
import sateKlathak from '../../assets/malioboro-assets/sate-klathak.png'
import tiwul from '../../assets/malioboro-assets/tiwul.jpg'
import malioboroCropped1 from '../../assets/malioboro-assets/malioboro-cropped-1.jpg'
import malioboroCropped2 from '../../assets/malioboro-assets/malioboro-cropped-2.jpg'
import { useEffect } from 'react'

const MalioboroDataSet = [
    {
        name: 'Foto',
        img: malioboroCropped1,
        biaya: 0,
        energi: -5,
        happinessGet: 7
    },
    {
        name: 'Bakpia',
        img: bakpia,
        biaya: 3000,
        energi: 3,
        happinessGet: 5
    },
    {
        name: 'Kue Apem',
        img: kueApem,
        biaya: 3000,
        energi: 3,
        happinessGet: 5
    },
    {
        name: 'Nasi Goreng Munggur Minang',
        img: munggurMinang,
        biaya: 15000,
        energi: 12,
        happinessGet: 11
    },
    {
        name: 'Mie Ayam Kamehame',
        img: mieAyam,
        biaya: 18000,
        energi: 14,
        happinessGet: 12
    },
    {
        name: 'Tiwul',
        img: tiwul,
        biaya: 20000,
        energi: 35,
        happinessGet: 5
    },
    {
        name: 'Gudeg',
        img: gudeg,
        biaya: 23000,
        energi: 24,
        happinessGet: 15
    },
    {
        name: 'Sate Klathak',
        img: sateKlathak,
        biaya: 27000,
        energi: 16,
        happinessGet: 20
    },
    {
        name: 'Oseng Mercon',
        img: osengMercon,
        biaya: 34000,
        energi: 30,
        happinessGet: 21
    },
    {
        name: 'Sambel Goreng Krecek',
        img: krecek,
        biaya: 40000,
        energi: 36,
        happinessGet: 29
    },
    {
        name: 'Belanja di Pasar Malioboro',
        img: pasarMalioboro,
        biaya: 50000,
        energi: -5,
        happinessGet: 7
    },
    {
        name: 'Naik Andong',
        img: andong2,
        biaya: 150000,
        energi: -1,
        happinessGet: 30
    },
];

export default MalioboroDataSet;
