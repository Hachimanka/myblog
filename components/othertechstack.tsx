"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import javaIcon from "../assets/experiencedtech/java.png";
import cIcon from "../assets/experiencedtech/c-lang.png";
import cppIcon from "../assets/experiencedtech/cpp.png";
import csharpIcon from "../assets/experiencedtech/csharp.png";
import pythonIcon from "../assets/experiencedtech/python.png";
import vercelIcon from "../assets/experiencedtech/vercel.png";
import sqlIcon from "../assets/experiencedtech/sql.png";
import arduinoIcon from "../assets/experiencedtech/arduino.png";

const experiencedLogos = [
	{ icon: javaIcon, alt: "Java logo" },
	{ icon: cIcon, alt: "C logo" },
	{ icon: cppIcon, alt: "C++ logo" },
	{ icon: csharpIcon, alt: "C# logo" },
	{ icon: pythonIcon, alt: "Python logo" },
	{ icon: vercelIcon, alt: "Vercel logo" },
	{ icon: sqlIcon, alt: "MySQL logo" },
	{ icon: arduinoIcon, alt: "Arduino logo" },
];

export default function OtherTechStack() {
	const marqueeTrackRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const track = marqueeTrackRef.current;
		if (!track) return;

		let frameId = 0;
		let resizeObserver: ResizeObserver | null = null;
		let halfTrackWidth = 0;
		let offset = 0;
		let lastTime = performance.now();
		const speedPxPerSecond = 60;

		const setup = () => {
			halfTrackWidth = track.scrollWidth / 2;
			offset = -halfTrackWidth;
			track.style.transform = `translateX(${offset}px)`;
		};

		const animate = (time: number) => {
			const deltaSeconds = (time - lastTime) / 1000;
			lastTime = time;
			offset += speedPxPerSecond * deltaSeconds;

			if (offset >= 0) {
				offset = -halfTrackWidth;
			}

			track.style.transform = `translateX(${offset}px)`;
			frameId = window.requestAnimationFrame(animate);
		};

		setup();

		if (typeof ResizeObserver !== "undefined") {
			resizeObserver = new ResizeObserver(() => {
				setup();
			});
			resizeObserver.observe(track);
		}

		frameId = window.requestAnimationFrame(animate);

		return () => {
			window.cancelAnimationFrame(frameId);
			resizeObserver?.disconnect();
		};
	}, []);

	return (
		<section className="w-full bg-[#49627a] px-6 py-10 sm:px-10 md:px-16 md:py-12">
			<div className="mx-auto w-full max-w-5xl overflow-hidden">
				<h2 className="text-center text-lg font-bold tracking-wide text-white sm:text-xl md:text-2xl">
					OTHER EXPERIENCED TECH STACK
				</h2>

				<div className="mt-8 sm:mt-10">
				<div ref={marqueeTrackRef} className="flex w-max items-center gap-14 will-change-transform">
					{[...experiencedLogos, ...experiencedLogos].map((item, index) => (
						<div key={`${item.alt}-${index}`} className="inline-flex h-12 w-16 shrink-0 items-center justify-center sm:h-14 sm:w-20">
							<Image src={item.icon} alt={item.alt} width={52} height={52} className="h-9 w-auto object-contain sm:h-10" />
						</div>
					))}
				</div>
				</div>
			</div>
		</section>
	);
}
