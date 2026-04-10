"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import figmaIcon from "../assets/masteredtech/figma.png";
import reactIcon from "../assets/masteredtech/react.png";
import typescriptIcon from "../assets/masteredtech/typescript.png";
import firebaseIcon from "../assets/masteredtech/firebase.png";
import supabaseIcon from "../assets/masteredtech/Supabase.png";
import microsoftIcon from "../assets/masteredtech/microsoft.png";
import mongodbIcon from "../assets/masteredtech/mongodb.png";
import htmlIcon from "../assets/masteredtech/html.png";

const masteredTechItems = [
	{ name: "FIGMA", icon: figmaIcon, alt: "Figma icon" },
	{ name: "REACTJS", icon: reactIcon, alt: "React icon" },
	{ name: "TYPESCRIPT", icon: typescriptIcon, alt: "TypeScript icon" },
	{ name: "FIREBASE", icon: firebaseIcon, alt: "Firebase icon" },
	{ name: "SUPABASE", icon: supabaseIcon, alt: "Supabase icon" },
	{ name: "MS 360", icon: microsoftIcon, alt: "Microsoft icon" },
	{ name: "MONGODB", icon: mongodbIcon, alt: "MongoDB icon" },
	{ name: "HTML/CSS/JS", icon: htmlIcon, alt: "HTML CSS JS icon" },
];

export default function MasteredTechSection() {
	const titleText = "MY MASTERED TECH STACK";
	const [typedTitle, setTypedTitle] = useState("");
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const marqueeTrackRef = useRef<HTMLDivElement | null>(null);
	const wasVisibleRef = useRef(false);
	const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		const titleElement = titleRef.current;
		if (!titleElement) return;

		const startTypingAnimation = () => {
			if (typingTimerRef.current) {
				clearInterval(typingTimerRef.current);
				typingTimerRef.current = null;
			}

			let index = 0;
			setTypedTitle("");

			typingTimerRef.current = setInterval(() => {
				index += 1;
				setTypedTitle(titleText.slice(0, index));

				if (index >= titleText.length && typingTimerRef.current) {
					clearInterval(typingTimerRef.current);
					typingTimerRef.current = null;
				}
			}, 80);
		};

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !wasVisibleRef.current) {
					startTypingAnimation();
					wasVisibleRef.current = true;
				}

				if (!entry.isIntersecting) {
					wasVisibleRef.current = false;
				}
			},
			{ threshold: 0.5 }
		);

		observer.observe(titleElement);

		return () => {
			observer.disconnect();
			if (typingTimerRef.current) {
				clearInterval(typingTimerRef.current);
				typingTimerRef.current = null;
			}
		};
	}, []);

	useEffect(() => {
		const track = marqueeTrackRef.current;
		if (!track) return;

		let frameId = 0;
		let resizeObserver: ResizeObserver | null = null;
		let halfTrackWidth = 0;
		let offset = 0;
		let lastTime = performance.now();
		const speedPxPerSecond = 55;

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
		<section id="skills" className="w-full bg-[#49627a] px-6 py-12 sm:px-10 md:px-16 md:py-14">
			<div className="mx-auto w-full max-w-5xl">
				<h2 ref={titleRef} className="text-center text-lg font-bold tracking-wide text-white sm:text-xl md:text-2xl">
					<span className="inline-block">{typedTitle}</span>
				</h2>

				<div className="mt-10 w-full overflow-hidden md:mt-12">
					<div
						ref={marqueeTrackRef}
						className="flex w-max items-center gap-10 will-change-transform"
					>
						{[...masteredTechItems, ...masteredTechItems].map((item, index) => (
							<div key={`${item.name}-${index}`} className="inline-flex shrink-0 items-center gap-3 whitespace-nowrap">
								<Image src={item.icon} alt={item.alt} width={34} height={34} className="h-8 w-8 object-contain md:h-9 md:w-9" />
								<span className="text-base font-semibold tracking-wide text-white/95 md:text-xl">{item.name}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
