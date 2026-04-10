"use client";

import Image from "next/image";
import { Damion } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import myFace from "../assets/firstpage/MyFace.png";
import myFace2 from "../assets/firstpage/myface2.png";
import myFace3 from "../assets/firstpage/myface3.png";
import myFace4 from "../assets/firstpage/myface4.png";
import facebookIcon from "../assets/footer/facebook.png";
import githubIcon from "../assets/footer/github.png";
import phoneIcon from "../assets/footer/phone.png";

const damion = Damion({
	weight: "400",
	subsets: ["latin"],
});

export default function FirstSection() {
	const [hoverReady, setHoverReady] = useState(false);
	const [visibleRatio, setVisibleRatio] = useState(1);
	const [isFaceHovered, setIsFaceHovered] = useState(false);
	const sectionRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const timer = setTimeout(() => setHoverReady(true), 3200);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const updateVisibleRatio = () => {
			const section = sectionRef.current;
			if (!section) return;

			const rect = section.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			const visibleHeight = Math.max(
				0,
				Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
			);
			const ratio = viewportHeight > 0 ? visibleHeight / viewportHeight : 0;
			setVisibleRatio(Math.max(0, Math.min(1, ratio)));
		};

		updateVisibleRatio();
		window.addEventListener("scroll", updateVisibleRatio, { passive: true });
		window.addEventListener("resize", updateVisibleRatio);

		return () => {
			window.removeEventListener("scroll", updateVisibleRatio);
			window.removeEventListener("resize", updateVisibleRatio);
		};
	}, []);

	const hoverClass = hoverReady ? "hover-shake" : "";
	const pictureMotionClass = hoverReady ? "hover-shake" : "slide-in-bottom-up";
	const darkBoxMotionClass = hoverReady ? "hover-shake" : "slide-in-card";
	const belowThresholdProgress = visibleRatio <= 0.5 ? Math.max(0, visibleRatio / 0.4) : 1;
	const sectionOpacity = 0.55 + 0.45 * belowThresholdProgress;
	const sectionBlurPx = 8 * (1 - belowThresholdProgress);

	return (
		<section
			id="about"
			ref={sectionRef}
			className="w-full min-h-[calc(110vh-64px)] overflow-x-hidden bg-[#d7d9e1] pb-2 pt-28 transition-[filter,opacity] duration-300 sm:pt-14 md:pb-4"
			style={{
				opacity: sectionOpacity,
				filter: `blur(${sectionBlurPx.toFixed(2)}px)`,
			}}
		>
			<div className="flex h-full w-full flex-col">
				<div className="relative z-0 -mt-28 -mb-10 px-4 pb-0 pt-0 sm:-mt-14 sm:-mb-12 sm:px-6 md:-mb-20 md:px-10 md:pt-2">
					<div className={`slide-in-top-down ${hoverClass} mx-auto h-34 w-[82%] rounded-b-md bg-[#4A6F76] sm:h-40 sm:w-[74%] md:h-74 md:w-[60%]`} />
				</div>

				<div className="relative z-30 mt-auto -translate-y-6 pb-0 md:translate-y-14">
					<div className="relative h-110 sm:h-120 md:h-95">
						<div className={`slide-in-left-right ${hoverClass} absolute bottom-0 left-0 h-68 w-[78%] rounded-r-md bg-[#b9c6d2] sm:h-76 sm:w-[72%] md:h-90 md:w-[46%]`} />
						<div className="pointer-events-none absolute left-[58%] top-[34%] h-60 w-60 -translate-x-1/2 rounded-full border border-white/20 sm:left-[56%] sm:h-68 sm:w-68 md:left-60 md:top-10 md:h-72 md:w-72 md:translate-x-0" />
						<div className="pointer-events-none absolute left-[58%] top-[38%] h-52 w-52 -translate-x-1/2 rounded-full border border-white/35 sm:left-[56%] sm:h-60 sm:w-60 md:left-71 md:top-21 md:h-50 md:w-50 md:translate-x-0" />

						<div
							className={`${pictureMotionClass} absolute -bottom-10 left-[60%] z-10 w-57.5 -translate-x-1/2 sm:left-[58%] sm:w-70 md:left-62 md:w-75 md:translate-x-0`}
							onMouseEnter={() => setIsFaceHovered(true)}
							onMouseLeave={() => setIsFaceHovered(false)}
						>
							<div>
								<Image
									src={isFaceHovered ? myFace4 : myFace}
									alt="Leonard profile"
									width={360}
									height={380}
									priority
									className="h-auto w-full object-contain mask-[linear-gradient(to_bottom,black_0%,black_86%,transparent_100%)]"
								/>
							</div>
							<div className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-[#d7d9e1]/30 backdrop-blur-[1px]" />
						</div>

						<article className={`${darkBoxMotionClass} absolute right-0 top-2 z-20 flex w-full min-h-56 flex-col rounded-md bg-[#758aa0] p-5 text-white sm:top-4 sm:min-h-60 sm:p-6 md:-top-20 md:min-h-105 md:w-[63%] md:justify-center md:p-10`}>
							<h1 className="w-full max-w-[92%] self-center text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
								<span className="typing-line inline-block align-top">
									<span className={`${damion.className} mr-2 text-4xl font-normal sm:text-5xl md:text-6xl`}>
										Hi!
									</span>
									<span className="ml-1 inline-block md:ml-2">I&apos;m Leonard,</span>
								</span>
							</h1>
							<p className="mt-2 w-full max-w-[92%] self-center text-base font-regular leading-6 text-white/90 sm:text-lg md:text-xl">
								and I am a passionate full-stack developer!
							</p>

							<p className="mt-2 w-full max-w-[92%] self-center text-base leading-7 md:mt-13 md:text-lg">
							I build web and mobile applications with a focus on backend
							development, including APIs, databases, and server-side logic.
							I have experience creating efficient and scalable systems while
							also having basic knowledge in UI design and full-stack
							development.
							</p>

							<div className="links-slide-in mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-white/90 md:mt-auto md:ml-10 md:gap-x-6 md:text-sm">
								<span className="inline-flex items-center gap-2">
									<Image src={facebookIcon} alt="Facebook" width={14} height={14} className="h-3.5 w-3.5 object-contain" />
									web.facebook.com/forrosueloleonard.lape
								</span>
								<span className="inline-flex items-center gap-2">
									<Image src={githubIcon} alt="GitHub" width={14} height={14} className="h-3.5 w-3.5 object-contain" />
									github.com/Hachimimaka
								</span>
								<span className="inline-flex items-center gap-2">
									<Image src={phoneIcon} alt="Phone" width={14} height={14} className="h-3.5 w-3.5 object-contain" />
									(+63)936-5314-156
								</span>
							</div>
						</article>
					</div>
				</div>
			</div>
		</section>
	);
}
