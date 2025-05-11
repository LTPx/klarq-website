"use client";

import DesignersSection from "./designers-section";

export function HomeInformation() {
  return (
    <section className="container bg-green pt-[45px]">
      <div className="px-[40px]">
        <h2 className="text-[45px] leading-[52px]">
          En KLARQ diseñamos y ejecutamos con propósito. Al unir arquitectura,
          diseño de interiores y desarrollo inmobiliario bajo un mismo techo,
          creamos espacios que son coherentes, atemporalmente bellos y hechos
          para perdurar.
        </h2>
        <section className="pt-[140px]">
          <DesignersSection
            name={"Kimberley Díaz Jiménez"}
            profession={
              "–Arquitecta, Passivhaus Designer y cofundadora de KLARQ."
            }
            description={
              "Kimberley fundó KLARQ en 2017 junto a su marido, Lluís Oliva i Munar. Con una trayectoria de más de una década en el diseño de viviendas e interiores de lujo, hoy su pasión se centra en crear hogares únicos y contemporáneos, donde luz, armonía y belleza se funden en cada detalle. Como alma creativa de KLARQ, lidera las fases conceptuales y el diseño de piezas de interiorismo exclusivas, siempre fiel a su sello minimalista, mediterráneo y elegante. Con una visión innovadora y un profundo compromiso con la sostenibilidad, Kimberley combina creatividad y empatía para dar vida a espacios que se adaptan a la esencia de quienes los habitan."
            }
          />
        </section>
        <section className="pt-[240px] pb-[190px]">
          <div className="grid grid-cols-3">
            <span className="text-[26px] leading-[35px]">
              ¿Qué nos hace diferentes?
            </span>
            <p className="text-[35px] leading-[45px]">
              No solo diseñamos — ejecutamos. Con un enfoque holístico de
              principio a fin, aseguramos que tu visión se materialice con
              claridad, consistencia y creatividad.
            </p>
            <div></div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default HomeInformation;
