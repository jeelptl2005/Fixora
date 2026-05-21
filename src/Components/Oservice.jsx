import React from 'react'
import './Oservice.css'
import ac from '../../assets/ac.jpg'
import cctv from '../../assets/cctv.jpg'
import paint from '../../assets/painting.jpg'
import pest from '../../assets/pest.jpg'
import internet from '../../assets/internet.jpg'
import appliance from '../../assets/appliance.jpg'
import carpanter from '../../assets/carpanter.jpg'
import clean from '../../assets/cleaning.jpg'
import plumbing from '../../assets/plumbing.jpg'
import electric from '../../assets/electric.jpg'

const cards = [
    { img: ac, title: 'AC Repair', desc: 'Fast & reliable AC repair at your doorstep' },
    { img: cctv, title: 'CCTV Installation', desc: 'Secure your home with professional CCTV setup' },
    { img: paint, title: 'Painting', desc: 'Interior & exterior painting done right' },
    { img: pest, title: 'Pest Control', desc: 'Safe & effective pest removal for your home' },
    { img: internet, title: 'Internet Setup', desc: 'Quick WiFi & networking installation' },
    { img: appliance, title: 'Appliance Repair', desc: 'Fix any home appliance with expert hands' },
    { img: carpanter, title: 'Carpenter', desc: 'Custom woodwork & furniture repair' },
    { img: clean, title: 'Cleaning', desc: 'Deep cleaning for a spotless home' },
    { img: plumbing, title: 'Plumbing', desc: 'Leaks, pipes & drainage fixed fast' },
    { img: electric, title: 'Electrical', desc: 'Safe wiring & electrical repairs at home' },
]

export const Oservice = () => {
  return (
    <section className="services-section">

      {/* ── Section Header ── */}
      <div className="services-header">
        <span className="services-eyebrow">What we offer</span>
        <h2 className="services-title">
          Our <span className="services-title__highlight">Services</span>
        </h2>
        <p className="services-sub">Professional home services at your doorstep</p>
      </div>

      {/* ── Infinite Scroll Track ── */}
      <div className="services-wrapper">
        {/* Original set */}
        <div className="services" aria-hidden="false">
          {cards.map((card, i) => (
            <div className="service" key={i}>
              <img src={card.img} alt={card.title} />
              <div className="caption">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless loop */}
        <div className="services" aria-hidden="true">
          {cards.map((card, i) => (
            <div className="service" key={i}>
              <img src={card.img} alt="" />
              <div className="caption">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}