import React from "react";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="relative group/card bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-3xl p-8 border backdrop-blur-2xl hover:shadow-2xl hover:shadow-aurora/20 transition-all duration-300">
        <CardItem
          translateZ="50"
          className="text-2xl font-bold text-white"
        >
          Experience 3D Interaction
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-white/70 text-sm max-w-sm mt-3"
        >
          Hover over this card to unleash the power of CSS 3D perspective. Move your mouse around to see the interactive effect.
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-6">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1300&q=80"
            height="1000"
            width="1000"
            className="h-64 w-full object-cover rounded-2xl group-hover/card:shadow-xl border border-white/10"
            alt="Travel destination"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={20}
            as="a"
            href="#contact"
            className="px-4 py-2 rounded-xl text-xs font-normal text-white/80 hover:text-aurora transition-colors"
          >
            Learn more →
          </CardItem>
          <CardItem
            translateZ={20}
            as="a"
            href="#contact"
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-aurora via-skywave to-blossom text-white text-xs font-bold hover:shadow-lg hover:shadow-aurora/30 transition-all"
          >
            Get Started
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
