"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import preview1 from "../assets/myprojectsection/preview1.png";
import preview2 from "../assets/myprojectsection/preview2.png";

function CornerArrow({ align }: { align: "left" | "right" }) {
	const side = align === "left" ? "left-4" : "right-4";

	return (
		<span
			className={`absolute ${side} bottom-3 inline-flex h-6 w-6 items-center justify-center rounded-full text-[#5a6275]`}
			aria-hidden="true"
		>
			<svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
				<path d="M14 5a1 1 0 0 1 1 1v3.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-3.3 3.29H20a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
				<path d="M4 13a5 5 0 0 1 5-5h3a1 1 0 1 1 0 2H9a3 3 0 1 0 0 6h6a1 1 0 1 1 0 2H9a5 5 0 0 1-5-5z" />
			</svg>
		</span>
	);
}

export default function SecondSection() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const wasVisibleRef = useRef(false);
	const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const titleText = "My Projects";
	const [typedTitle, setTypedTitle] = useState(titleText);
	const [cardAnimationCycle, setCardAnimationCycle] = useState(0);

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
		}, 85);
	};

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !wasVisibleRef.current) {
					startTypingAnimation();
					setCardAnimationCycle((prev) => prev + 1);
					wasVisibleRef.current = true;
				}

				if (!entry.isIntersecting) {
					wasVisibleRef.current = false;
				}
			},
			{ threshold: 0.15 }
		);

		observer.observe(section);

		return () => {
			observer.disconnect();
			if (typingTimerRef.current) {
				clearInterval(typingTimerRef.current);
				typingTimerRef.current = null;
			}
		};
	}, []);

	return (
		<section
			id="projects"
			ref={sectionRef}
			className="mt-10 w-full bg-[#d7d9e1] px-4 pb-14 pt-0 sm:mt-12 sm:px-6 md:mt-14 md:px-10 md:pt-0"
		>
			<div className="mx-auto w-full max-w-6xl">
				<h2 className="mb-5 text-center text-3xl font-semibold text-[#545c6e] md:mb-6 md:text-4xl">
					<span className="inline-block">{typedTitle}</span>
				</h2>

				<div className="space-y-7 md:space-y-10">
					<Link
						href="/allprojects"
						key={`lemivon-${cardAnimationCycle}`}
						className="block"
						aria-label="Open all projects page"
					>
						<article
							className="group relative mt-8 rounded-2xl bg-[#d7d9e1] px-5 pb-10 pt-6 transition-[background-color,box-shadow] duration-300 ease-out hover:bg-[#dfe2e8] hover:shadow-[0_16px_40px_rgba(62,76,98,0.26)] md:mt-18 md:px-8 md:pb-8"
							style={{ animation: "slideInCard 4000ms ease-out both" }}
						>
						<div className="grid items-center gap-4 transition-transform duration-300 ease-out group-hover:scale-[1.01] md:grid-cols-[1fr_1.8fr] md:gap-6">
							<div className="flex justify-center md:justify-start md:pl-13">
								<Image
									src={preview1}
									alt="Lemivon preview"
									width={380}
									height={230}
									className="h-auto w-48 object-contain md:w-60"
								/>
							</div>

							<div className="md:pr-15">
								<h3 className="text-3xl font-semibold text-[#0f8a9c]">Lemivon</h3>
								<p className="mt-2 text-justify text-base leading-relaxed text-[#29496c] md:text-lg">
									Lemivon is a modern study platform that uses AI to help users
									organize materials and improve learning efficiency. I was
									responsible for the backend development and contributed to
									parts of the frontend, ensuring a functional and user-friendly
									experience.
								</p>
							</div>
						</div>

						<CornerArrow align="right" />
						</article>
					</Link>

					<Link
						href="/allprojects"
						key={`tecnnect-${cardAnimationCycle}`}
						className="block"
						aria-label="Open all projects page"
					>
						<article
							className="group relative rounded-2xl bg-[#d7d9e1] px-5 pb-10 pt-6 transition-[background-color,box-shadow] duration-300 ease-out hover:bg-[#dfe2e8] hover:shadow-[0_16px_40px_rgba(62,76,98,0.26)] md:px-8 md:pb-8"
							style={{ animation: "slideInLeftRight 4000ms ease-out both" }}
						>
						<div className="grid items-center gap-4 transition-transform duration-300 ease-out group-hover:scale-[1.01] md:grid-cols-[1.8fr_1fr] md:gap-6">
							<div className="order-2 md:order-1 md:pl-15">
								<h3 className="text-3xl font-semibold text-[#a50817]">TecnnecT</h3>
								<p className="mt-2 text-justify text-base leading-relaxed text-[#29496c] md:text-lg">
									TecnecT is a web app for campus rentals, lost-and-found,
									and messaging, where I led development, handled the
									backend, and contributed to the frontend including system
									design, database, authentication, and messaging.
								</p>
							</div>

							<div className="order-1 flex justify-center md:order-2 md:justify-end md:pr-13">
								<Image
									src={preview2}
									alt="TecnnecT preview"
									width={380}
									height={230}
									className="h-auto w-48 object-contain md:w-60"
								/>
							</div>
						</div>

						<CornerArrow align="left" />
						</article>
					</Link>
				</div>
			</div>
		</section>
	);
}
