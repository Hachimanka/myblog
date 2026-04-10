"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import aboutA1 from "../assets/aboutme/A1.jpeg";
import aboutA2 from "../assets/aboutme/A2.jpeg";
import aboutA3 from "../assets/aboutme/A3.jpeg";
import aboutA4 from "../assets/aboutme/A4.jpeg";
import aboutA5 from "../assets/aboutme/A5.jpg";
import aboutA6 from "../assets/aboutme/A6.jpg";

export default function AboutMeSection() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const boxRef = useRef<HTMLDivElement | null>(null);
	const [progress, setProgress] = useState(0);
	const progressRef = useRef(0);
	const [textProgress, setTextProgress] = useState(0);
	const [isMainPictureHovered, setIsMainPictureHovered] = useState(false);
	const textProgressRef = useRef(0);
	const isPictureActivatedRef = useRef(false);
	const isLockedRef = useRef(false);
	const pageScrollLockedRef = useRef(false);
	const lockedScrollYRef = useRef(0);
	const lastStepAtRef = useRef(0);
	const clickTextRevealTimerRef = useRef<number | null>(null);
	const releaseAtRef = useRef(0);
	const releaseDirectionRef = useRef<0 | 1 | -1>(0);
	const RELEASE_DELAY_MS = 420;
	const WHEEL_STEP_COOLDOWN_MS = 28;
	const IMAGE_STEP = 0.05;
	const TEXT_STEP = 0.055;
	const BOX_FULLY_VISIBLE_TOLERANCE_PX = 6;

	const lockPageScroll = () => {
		if (pageScrollLockedRef.current) return;
		lockedScrollYRef.current = window.scrollY;
		document.body.style.position = "fixed";
		document.body.style.top = `-${lockedScrollYRef.current}px`;
		document.body.style.left = "0";
		document.body.style.right = "0";
		document.body.style.width = "100%";
		document.body.style.overflow = "hidden";
		pageScrollLockedRef.current = true;
	};

	const unlockPageScroll = () => {
		if (!pageScrollLockedRef.current) return;
		document.body.style.position = "";
		document.body.style.top = "";
		document.body.style.left = "";
		document.body.style.right = "";
		document.body.style.width = "";
		document.body.style.overflow = "";
		window.scrollTo(0, lockedScrollYRef.current);
		pageScrollLockedRef.current = false;
	};

	useEffect(() => {
		progressRef.current = progress;
	}, [progress]);

	useEffect(() => {
		textProgressRef.current = textProgress;
	}, [textProgress]);

	const applyTransitionFromDelta = (deltaY: number) => {
		const direction = Math.sign(deltaY);
		if (direction === 0) return false;

		const now = Date.now();
		if (now - lastStepAtRef.current < WHEEL_STEP_COOLDOWN_MS) return false;
		lastStepAtRef.current = now;

		const currentImage = progressRef.current;
		const currentText = textProgressRef.current;

		if (direction > 0) {
			if (currentImage < 1) {
				const nextImage = Math.max(0, Math.min(1, currentImage + IMAGE_STEP));
				progressRef.current = nextImage;
				setProgress(nextImage);
				return true;
			}

			if (currentText < 1) {
				const nextText = Math.max(0, Math.min(1, currentText + TEXT_STEP));
				textProgressRef.current = nextText;
				setTextProgress(nextText);

				if (nextText >= 1) {
					releaseDirectionRef.current = 1;
					releaseAtRef.current = Date.now() + RELEASE_DELAY_MS;
				}

				return true;
			}

			return false;
		}

		if (currentText > 0) {
			const nextText = Math.max(0, Math.min(1, currentText - TEXT_STEP));
			textProgressRef.current = nextText;
			setTextProgress(nextText);
			return true;
		}

		if (currentImage > 0) {
			const nextImage = Math.max(0, Math.min(1, currentImage - IMAGE_STEP));
			progressRef.current = nextImage;
			setProgress(nextImage);

			if (nextImage <= 0) {
				releaseDirectionRef.current = -1;
				releaseAtRef.current = Date.now() + RELEASE_DELAY_MS;
			}

			return true;
		}

		return false;
	};

	const onPictureClick = () => {
		isPictureActivatedRef.current = true;

		// Click should immediately trigger the staged transition sequence.
		if (progressRef.current < 1) {
			progressRef.current = 1;
			setProgress(1);
		}

		if (clickTextRevealTimerRef.current !== null) {
			window.clearTimeout(clickTextRevealTimerRef.current);
		}

		clickTextRevealTimerRef.current = window.setTimeout(() => {
			textProgressRef.current = 1;
			setTextProgress(1);
			releaseDirectionRef.current = 1;
			releaseAtRef.current = Date.now() + RELEASE_DELAY_MS;
		}, 220);
	};

	const onPictureMouseEnter = () => {
		setIsMainPictureHovered(true);
	};

	const onPictureMouseLeave = () => {
		setIsMainPictureHovered(false);
	};

	useEffect(() => {
		const onWindowWheel = (event: globalThis.WheelEvent) => {
			const section = sectionRef.current;
			const box = boxRef.current;
			if (!section) return;
			if (!box) return;

			const rect = section.getBoundingClientRect();
			const boxRect = box.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			const isSectionActive = rect.bottom > viewportHeight * 0.05 && rect.top < viewportHeight * 0.95;
			if (!isSectionActive) {
				isLockedRef.current = false;
				isPictureActivatedRef.current = false;
				unlockPageScroll();
				return;
			}

			const direction = Math.sign(event.deltaY);
			if (direction === 0) return;

			const currentProgress = progressRef.current;
			const currentTextProgress = textProgressRef.current;
			const isAboutCenterInView = rect.top <= viewportHeight * 0.55 && rect.bottom >= viewportHeight * 0.45;
			const isBoxFullyVisible =
				boxRect.top >= 5 + BOX_FULLY_VISIBLE_TOLERANCE_PX &&
				boxRect.bottom <= viewportHeight - BOX_FULLY_VISIBLE_TOLERANCE_PX;
			const boxCenterY = boxRect.top + boxRect.height / 2;
			const viewportCenterY = viewportHeight / 2;
			const isBoxCentered = Math.abs(boxCenterY - viewportCenterY) <= Math.max(48, viewportHeight * 0.07);
			const isTriggerView =
				isAboutCenterInView &&
				isBoxFullyVisible &&
				isBoxCentered &&
				isPictureActivatedRef.current;
			const downSequenceComplete = currentProgress >= 1 && currentTextProgress >= 1;
			const upSequenceComplete = currentProgress <= 0 && currentTextProgress <= 0;
			const needsSequenceForDirection = direction > 0 ? !downSequenceComplete : !upSequenceComplete;

			if (!isLockedRef.current && isTriggerView && needsSequenceForDirection) {
				isLockedRef.current = true;
			}

			if (!isLockedRef.current) {
				unlockPageScroll();
				return;
			}

			lockPageScroll();
			event.preventDefault();

			const canAdvance = direction > 0 && currentProgress < 1;
			const canAdvanceText = direction > 0 && currentProgress >= 1 && currentTextProgress < 1;
			const canReverseText = direction < 0 && currentTextProgress > 0;
			const canReverseImage = direction < 0 && currentTextProgress <= 0 && currentProgress > 0;
			const needsAnimationProgress = canAdvance || canAdvanceText || canReverseText || canReverseImage;

			if (needsAnimationProgress) {
				applyTransitionFromDelta(event.deltaY);
				return;
			}

			const sameDirectionAsRelease = releaseDirectionRef.current === (direction as 1 | -1);
			const releaseDelayActive = sameDirectionAsRelease && Date.now() < releaseAtRef.current;

			if (releaseDelayActive) {
				return;
			}

			isLockedRef.current = false;
			isPictureActivatedRef.current = false;
			unlockPageScroll();
		};

		window.addEventListener("wheel", onWindowWheel, { passive: false, capture: true });

		return () => {
			window.removeEventListener("wheel", onWindowWheel, { capture: true });
			unlockPageScroll();
			isPictureActivatedRef.current = false;
			if (clickTextRevealTimerRef.current !== null) {
				window.clearTimeout(clickTextRevealTimerRef.current);
				clickTextRevealTimerRef.current = null;
			}
		};
	}, []);

	const sceneOneOpacity = Math.max(0, 1 - progress * 1.15);
	const sceneTwoOpacity = Math.min(1, Math.max(0, (progress - 0.08) / 0.92));
	const textOpacity = Math.min(1, Math.max(0, (textProgress - 0.02) / 0.98));
	const textTranslateY = 46 * (1 - textOpacity);
	const heroLeft = 50 + 26 * sceneTwoOpacity;
	const heroTop = 50 + 2 * sceneTwoOpacity;
	const heroWidth = 220 + 140 * sceneTwoOpacity;
	const heroHeight = 296 + 184 * sceneTwoOpacity;

	return (
		<section id="aboutme" ref={sectionRef} className="w-full bg-[#d7d9e1] px-6 py-10 sm:px-10 md:px-16 md:py-14">
			<div className="mx-auto w-full max-w-5xl">
				<h2 className="text-center text-lg font-bold tracking-wide text-[#3f5e7f] sm:text-xl md:text-2xl">
					ABOUT ME
				</h2>

				<div
					ref={boxRef}
					className="relative mt-8 overflow-hidden px-5 py-8 sm:px-8 md:mt-10 md:px-12 md:py-12"
				>
					<div
						className="absolute inset-0 flex items-center justify-center px-4 py-6 sm:px-8 md:px-10"
						style={{
							pointerEvents: sceneOneOpacity > 0.02 ? "auto" : "none",
							opacity: sceneOneOpacity,
							transform: `translateX(${-70 * progress}px) scale(${1 - progress * 0.04})`,
							transition: "opacity 340ms cubic-bezier(0.22, 1, 0.36, 1), transform 340ms cubic-bezier(0.22, 1, 0.36, 1)",
						}}
					>
						<div className="relative h-90 w-full max-w-170">
							<div className="absolute left-14 top-6 h-28 w-28 rounded-full bg-[#6ea7d8]/30 blur-2xl" />
							<div className="absolute right-18 bottom-8 h-24 w-24 rounded-full bg-[#3f5e7f]/25 blur-2xl" />

							<div
								className="absolute left-8 top-14 z-10 h-36 w-52 cursor-pointer overflow-hidden rounded-[15px] transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105 sm:h-40 sm:w-56"
								onClick={onPictureClick}
							>
								<Image src={aboutA1} alt="About collage 1" fill className="object-cover" />
							</div>
							<div
								className="absolute right-8 top-16 z-10 h-36 w-52 cursor-pointer overflow-hidden rounded-[15px] transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105 sm:h-40 sm:w-56"
								onClick={onPictureClick}
							>
								<Image src={aboutA5} alt="About collage 2" fill className="object-cover" />
							</div>
							<div
								className="absolute bottom-8 left-10 z-10 h-36 w-52 cursor-pointer overflow-hidden rounded-[15px] transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105 sm:h-40 sm:w-56"
								onClick={onPictureClick}
							>
								<Image src={aboutA2} alt="About collage 3" fill className="object-cover" />
							</div>
							<div
								className="absolute bottom-8 right-10 z-10 h-36 w-52 cursor-pointer overflow-hidden rounded-[15px] transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105 sm:h-40 sm:w-56"
								onClick={onPictureClick}
							>
								<Image src={aboutA4} alt="About collage 4" fill className="object-cover" />
							</div>
						</div>
					</div>

					<div
						className="relative grid min-h-120 items-center gap-10 md:grid-cols-[1.2fr_0.9fr]"
						style={{
							pointerEvents: sceneTwoOpacity > 0.02 ? "auto" : "none",
							opacity: sceneTwoOpacity,
							transform: `translateX(${20 * (1 - sceneTwoOpacity)}px)`,
							transition: "opacity 340ms cubic-bezier(0.22, 1, 0.36, 1), transform 340ms cubic-bezier(0.22, 1, 0.36, 1)",
						}}
					>
						<div
							className="text-[#2f4f70]"
							style={{
								opacity: textOpacity,
								transform: `translateY(${textTranslateY}px)`,
								transition: "opacity 300ms cubic-bezier(0.22, 1, 0.36, 1), transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
							}}
						>
							<p className="text-6xl font-bold leading-none">+10</p>
							<p className="mt-1 text-[42px] font-semibold leading-tight">Programming</p>
							<p className="text-[42px] font-semibold leading-tight">Languages</p>
							<p className="text-[42px] font-semibold leading-tight">Experience</p>

							<p className="mt-10 text-5xl font-semibold leading-tight">Leonard L. Forrosuelo</p>
							<p className="mt-2 text-2xl font-semibold">BS Computer Engineering student</p>
							<p className="mt-5 max-w-170 text-lg leading-relaxed text-[#426285]">
								I am a curious and driven individual who enjoys exploring new ideas and
								improving my skills through hands-on experience. I find joy in creating
								useful solutions, working with others, and turning concepts into real
								applications. I am always eager to learn, grow, and take on challenges
								that help me become better in my field.
							</p>
						</div>

						<div className="relative mx-auto h-120 w-full max-w-90" />
					</div>

					<div
						className="absolute z-40 cursor-pointer overflow-hidden rounded-[15px]"
						onClick={onPictureClick}
						onMouseEnter={onPictureMouseEnter}
						onMouseLeave={onPictureMouseLeave}
						style={{
							left: `${heroLeft}%`,
							top: `${heroTop}%`,
							width: `${heroWidth}px`,
							height: `${heroHeight}px`,
							transform: `translate(-50%, -50%) scale(${isMainPictureHovered ? 1.06 : 1})`,
							transition: "left 340ms cubic-bezier(0.22, 1, 0.36, 1), top 340ms cubic-bezier(0.22, 1, 0.36, 1), width 340ms cubic-bezier(0.22, 1, 0.36, 1), height 340ms cubic-bezier(0.22, 1, 0.36, 1), transform 220ms ease-out",
						}}
					>
						<Image src={aboutA6} alt="Main about portrait" fill className="object-cover" />
					</div>
				</div>
			</div>
		</section>
	);
}
