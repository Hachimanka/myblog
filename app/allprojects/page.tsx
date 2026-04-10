"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import preview1 from "../../assets/myprojectsection/preview1.png";
import preview2 from "../../assets/myprojectsection/preview2.png";
import preview3 from "../../assets/myprojectsection/preview3.png";
import preview4 from "../../assets/myprojectsection/preview4.png";
import NavbarProjects from "../../components/navbarprojects";

const projects = [
	{
		name: "Lemivon",
		accent: "#0f8a9c",
		description:
			"Lemivon is a modern study platform that uses AI to help users organize materials and improve learning efficiency. I was responsible for the backend development and contributed to parts of the frontend, ensuring a functional and user-friendly experience.",
		image: preview1,
		imageAlt: "Lemivon preview",
	},
	{
		name: "TecnnecT",
		accent: "#a50817",
		description:
			"TecnecT is a web app for campus rentals, lost-and-found, and messaging, where I led development, handled the backend, and contributed to the frontend including system design, database, authentication, and messaging.",
		image: preview2,
		imageAlt: "TecnnecT preview",
	},
	{
		name: "StudyTa",
		accent: "#6F422B",
		description:
			"StudyTa is a web-based study platform that helps students organize notes and review lessons easily. I developed the backend and some parts of the frontend, and led the overall development to ensure the system is efficient and well-built.",
		image: preview3,
		imageAlt: "StudyTa preview",
	},
	{
		name: "TLC engine",
		accent: "#006B5F",
		description:
			"TLC Engine is a scalable multi-tenant platform with role-based access and separate environments for each organization using unique URLs. I handled the backend and contributed to some frontend features while leading the overall project development.",
		image: preview4,
		imageAlt: "TLC engine preview",
	},
];

export default function AllProjectsPage() {
	const titleRef = useRef<HTMLDivElement | null>(null);
	const cardRefs = useRef<Array<HTMLElement | null>>([]);
	const wasVisibleRef = useRef(false);
	const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const titleText = "All Projects";
	const [typedTitle, setTypedTitle] = useState(titleText);
	const [cardVisible, setCardVisible] = useState<boolean[]>(() => projects.map(() => false));
	const cardSlideTiming = {
		animationDuration: "2000ms",
		animationTimingFunction: "ease-out",
		animationDelay: "0ms",
		animationFillMode: "both" as const,
	};

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
		}, 90);
	};

	useEffect(() => {
		const titleContainer = titleRef.current;
		if (!titleContainer) return;

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
			{ threshold: 0.35 }
		);

		observer.observe(titleContainer);

		return () => {
			observer.disconnect();
			if (typingTimerRef.current) {
				clearInterval(typingTimerRef.current);
				typingTimerRef.current = null;
			}
		};
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				setCardVisible((prev) => {
					const next = [...prev];
					let changed = false;

					for (const entry of entries) {
						const idx = Number((entry.target as HTMLElement).dataset.cardIndex);
						if (Number.isNaN(idx)) continue;

						if (entry.isIntersecting && !next[idx]) {
							next[idx] = true;
							changed = true;
						}

						if (!entry.isIntersecting && next[idx]) {
							next[idx] = false;
							changed = true;
						}
					}

					return changed ? next : prev;
				});
			},
			{ threshold: 0.22 }
		);

		for (const card of cardRefs.current) {
			if (card) observer.observe(card);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<main className="min-h-screen bg-[#d7d9e1]">
			<NavbarProjects />

			<div className="px-4 py-10 sm:px-6 md:px-10">
			<div className="mx-auto w-full max-w-6xl">
				<div ref={titleRef} className="mb-8 text-center">
					<h1 className="text-3xl font-semibold text-[#545c6e] md:text-4xl">
						<span className="inline-block">{typedTitle}</span>
					</h1>
				</div>

				<div className="space-y-7 md:space-y-8">
					{projects.map((project, index) => {
						const card = (
						<article
							key={project.name}
							ref={(el) => {
								cardRefs.current[index] = el;
							}}
							data-card-index={index}
							className={`rounded-2xl bg-[#dfe2e8] px-5 pb-8 pt-6 shadow-[0_10px_26px_rgba(62,76,98,0.16)] transition-[transform,box-shadow,opacity] duration-300 ease-out hover:scale-[1.015] hover:shadow-[0_18px_38px_rgba(62,76,98,0.24)] md:px-24 ${cardVisible[index] ? (index % 2 === 0 ? "slide-in-card" : "slide-in-left-right") : "opacity-0"} ${project.name === "Lemivon" || project.name === "TecnnecT" || project.name === "StudyTa" || project.name === "TLC engine" ? "cursor-pointer" : ""}`}
							style={cardSlideTiming}
						>
							<div className={`grid items-center gap-5 md:gap-6 ${index % 2 === 0 ? "md:grid-cols-[1fr_1.7fr]" : "md:grid-cols-[1.7fr_1fr]"}`}>
								<div className={`flex justify-center ${index % 2 === 0 ? "md:justify-start" : "md:order-2 md:justify-end"}`}>
									<Image
										src={project.image}
										alt={project.imageAlt}
										width={380}
										height={230}
										className="h-auto w-52 object-contain md:w-64"
									/>
								</div>
								<div className={index % 2 === 0 ? "" : "md:order-1"}>
									<h2 className="text-3xl font-semibold" style={{ color: project.accent }}>
										{project.name}
									</h2>
									<p className="mt-2 text-justify text-base leading-relaxed text-[#29496c] md:text-lg">
										{project.description}
									</p>
								</div>
							</div>
						</article>
						);

						if (project.name === "Lemivon") {
							return (
								<Link key={`${project.name}-link`} href="/projects/lemivon" className="block">
									{card}
								</Link>
							);
						}

						if (project.name === "TecnnecT") {
							return (
								<Link key={`${project.name}-link`} href="/projects/tecnnect" className="block">
									{card}
								</Link>
							);
						}

						if (project.name === "StudyTa") {
							return (
								<Link key={`${project.name}-link`} href="/projects/studyta" className="block">
									{card}
								</Link>
							);
						}

						if (project.name === "TLC engine") {
							return (
								<Link key={`${project.name}-link`} href="/projects/tlcengine" className="block">
									{card}
								</Link>
							);
						}

						return card;
					})}
				</div>
			</div>
			</div>
		</main>
	);
}
