"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import NavbarProjects from "../../../components/navbarprojects";
import arrowIcon from "../../../assets/navbar/arrow.png";
import studytaMain from "../../../assets/myprojectsection/StudyTa/S1.png";
import studytaQuickUi from "../../../assets/quickui/qstudyta.png";
import studytaS1 from "../../../assets/myprojectsection/StudyTa/S1.png";
import studytaS2 from "../../../assets/myprojectsection/StudyTa/S2.png";
import studytaS3 from "../../../assets/myprojectsection/StudyTa/S3.png";
import studytaS4 from "../../../assets/myprojectsection/StudyTa/S4.png";
import studytaS5 from "../../../assets/myprojectsection/StudyTa/S5.png";
import studytaS6 from "../../../assets/myprojectsection/StudyTa/S6.png";

export default function StudyTaProjectPage() {
	const galleryImages = [studytaS1, studytaS2, studytaS3, studytaS4, studytaS5, studytaS6];
	const titleText = "StudyTa";
	const [typedTitle, setTypedTitle] = useState("");
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const detailRefs = useRef<Array<HTMLDivElement | null>>([]);
	const wasVisibleRef = useRef(false);
	const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const [detailVisible, setDetailVisible] = useState<boolean[]>([false, false, false]);
	const mainPreviewRef = useRef<HTMLDivElement | null>(null);
	const [mainPreviewVisible, setMainPreviewVisible] = useState(false);
	const projectLinkRef = useRef<HTMLDivElement | null>(null);
	const [projectLinkVisible, setProjectLinkVisible] = useState(false);
	const quickUiRef = useRef<HTMLButtonElement | null>(null);
	const [quickUiVisible, setQuickUiVisible] = useState(false);
	const [isGalleryOpen, setIsGalleryOpen] = useState(false);
	const [galleryIndex, setGalleryIndex] = useState(0);
	const dragStartXRef = useRef<number | null>(null);
	const [dragOffset, setDragOffset] = useState(0);
	const [isDragging, setIsDragging] = useState(false);

	const showPrevious = () => {
		setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
	};

	const showNext = () => {
		setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
	};

	const previousIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
	const nextIndex = (galleryIndex + 1) % galleryImages.length;

	const onGalleryDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
		dragStartXRef.current = event.clientX;
		setIsDragging(true);
	};

	const onGalleryDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
		if (dragStartXRef.current === null) return;
		setDragOffset(event.clientX - dragStartXRef.current);
	};

	const onGalleryDragEnd = () => {
		if (dragStartXRef.current === null) return;

		const swipeThreshold = 70;
		if (dragOffset > swipeThreshold) {
			showPrevious();
		} else if (dragOffset < -swipeThreshold) {
			showNext();
		}

		dragStartXRef.current = null;
		setDragOffset(0);
		setIsDragging(false);
	};

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
			}, 110);
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
			{ threshold: 0.45 }
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
		const observer = new IntersectionObserver(
			(entries) => {
				setDetailVisible((prev) => {
					const next = [...prev];
					let changed = false;

					for (const entry of entries) {
						const idx = Number((entry.target as HTMLDivElement).dataset.detailIndex);
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
			{ threshold: 0.3 }
		);

		for (const detail of detailRefs.current) {
			if (detail) observer.observe(detail);
		}

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const mainPreview = mainPreviewRef.current;
		if (!mainPreview) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setMainPreviewVisible(entry.isIntersecting);
			},
			{ threshold: 0.35 }
		);

		observer.observe(mainPreview);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const projectLinkBlock = projectLinkRef.current;
		if (!projectLinkBlock) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setProjectLinkVisible(entry.isIntersecting);
			},
			{ threshold: 0.35 }
		);

		observer.observe(projectLinkBlock);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const quickUiButton = quickUiRef.current;
		if (!quickUiButton) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setQuickUiVisible(entry.isIntersecting);
			},
			{ threshold: 0.45 }
		);

		observer.observe(quickUiButton);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!isGalleryOpen) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") showPrevious();
			if (event.key === "ArrowRight") showNext();
			if (event.key === "Escape") setIsGalleryOpen(false);
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [isGalleryOpen]);

	useEffect(() => {
		if (isGalleryOpen) return;
		dragStartXRef.current = null;
		setDragOffset(0);
		setIsDragging(false);
	}, [isGalleryOpen]);

	return (
		<main className="min-h-screen bg-[#d7d9e1]">
			<NavbarProjects backgroundColor="#6F422B" backHref="/allprojects" />

			<div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:px-10">
				<h1 ref={titleRef} className="mb-12 text-center text-4xl font-semibold text-[#6F422B] md:mb-16 md:text-5xl">
					<span className="inline-block">{typedTitle}</span>
				</h1>

				<section className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-12">
					<div>
						<div ref={mainPreviewRef} className={`${mainPreviewVisible ? "slide-in-left-right" : "opacity-0"} group mx-auto w-full max-w-sm md:max-w-md`}>
							<Image
								src={studytaMain}
								alt="StudyTa dashboard preview"
								width={520}
								height={320}
								className="h-auto w-full object-contain transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105"
							/>
						</div>

						<div ref={projectLinkRef} className={`${projectLinkVisible ? "slide-in-bottom-up" : "opacity-0"} mt-5 text-center`}>
							<h2 className="text-xl font-semibold text-[#6F422B]">Project link</h2>
							<Link
								href="https://study-ta-blond.vercel.app/"
								target="_blank"
								rel="noreferrer"
								className="text-sm font-medium text-[#1b3553] underline-offset-2 hover:underline"
							>
								study-ta-blond.vercel.app
							</Link>
						</div>
					</div>

					<div className="space-y-8">
						<div
							ref={(el) => {
								detailRefs.current[0] = el;
							}}
							data-detail-index={0}
							className={detailVisible[0] ? "slide-in-card" : "opacity-0"}
						>
							<h2 className="text-2xl font-semibold text-[#6F422B] md:text-2xl">Description</h2>
							<p className="mt-2 text-justify text-lg leading-relaxed text-[#1b3553]">
								StudyTa is a modern study platform that helps users organize notes,
								track progress, and learn more efficiently. I worked on backend
								development and contributed to frontend implementation for a smooth user
								experience.
							</p>
						</div>

						<div
							ref={(el) => {
								detailRefs.current[1] = el;
							}}
							data-detail-index={1}
							className={detailVisible[1] ? "slide-in-card" : "opacity-0"}
						>
							<h2 className="text-2xl font-semibold text-[#6F422B] md:text-2xl">Role</h2>
							<p className="mt-2 text-justify text-lg leading-relaxed text-[#1b3553]">
								I focused on backend services, API integration, and data design while also
								contributing to frontend features and ensuring overall product stability.
							</p>
						</div>

						<div
							ref={(el) => {
								detailRefs.current[2] = el;
							}}
							data-detail-index={2}
							className={detailVisible[2] ? "slide-in-card" : "opacity-0"}
						>
							<h2 className="text-2xl font-semibold text-[#6F422B] md:text-2xl">Challenges and Solution</h2>
							<p className="mt-2 text-justify text-lg leading-relaxed text-[#1b3553]">
								A key challenge was handling study data efficiently while keeping the app
								responsive. I optimized backend workflows and improved data exchange to
								maintain smooth and reliable performance.
							</p>
						</div>
					</div>
				</section>

				<section className="mt-16 md:mt-20">
					<h2 className="text-center text-2xl font-semibold text-[#6F422B] md:text-xl">Quick UI</h2>
					<div className="mt-5 flex justify-center">
						<button
							ref={quickUiRef}
							type="button"
							onClick={() => {
								setGalleryIndex(0);
								setIsGalleryOpen(true);
							}}
							className={`${quickUiVisible ? "slide-in-left-right" : "opacity-0"} group relative inline-flex rounded-2xl bg-transparent p-3 transition-shadow duration-300 ease-out hover:shadow-[0_16px_36px_rgba(27,53,83,0.24)]`}
							aria-label="Open StudyTa gallery"
						>
							<Image
								src={studytaQuickUi}
								alt="StudyTa quick UI preview"
								width={760}
								height={420}
								className="h-auto w-32 object-contain transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105 md:w-40"
							/>

							<span className="pointer-events-none absolute bottom-2 right-2 inline-flex">
								<Image src={arrowIcon} alt="decorative arrow" width={16} height={16} className="h-4 w-4 object-contain" />
							</span>
						</button>
					</div>
				</section>
			</div>

			{isGalleryOpen && (
				<div
					className="fixed inset-0 z-70 flex items-center justify-center bg-[#1b3553]/35 px-4 backdrop-blur-[2px]"
					onClick={() => setIsGalleryOpen(false)}
				>
					<div
						className="relative w-full max-w-5xl rounded-3xl border border-white/55 bg-linear-to-br from-[#f6efe8]/88 via-[#f1e2d2]/86 to-[#ead7c4]/84 p-4 shadow-[0_20px_60px_rgba(27,53,83,0.22)] backdrop-blur-md md:p-6"
						onClick={(event) => event.stopPropagation()}
					>
						<button
							type="button"
							onClick={() => setIsGalleryOpen(false)}
							className="absolute right-3 top-3 rounded-md border border-[#6F422B]/30 bg-white/75 px-2.5 py-1 text-sm font-semibold text-[#1b3553] transition-colors hover:bg-white"
						>
							Close
						</button>

						<div className="relative mx-auto mt-6 w-full max-w-4xl select-none overflow-hidden rounded-2xl border border-white/70 bg-white/45 aspect-video">
							<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[22%] overflow-hidden rounded-l-2xl border-r border-white/40">
								<Image
									src={galleryImages[previousIndex]}
									alt={`StudyTa gallery image ${previousIndex + 1}`}
									width={1200}
									height={750}
									draggable={false}
									className="h-full w-full -translate-x-6 scale-[1.02] object-cover opacity-35 blur-[1px]"
								/>
								<div className="absolute inset-0 bg-linear-to-r from-white/70 to-white/20" />
							</div>

							<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[22%] overflow-hidden rounded-r-2xl border-l border-white/40">
								<Image
									src={galleryImages[nextIndex]}
									alt={`StudyTa gallery image ${nextIndex + 1}`}
									width={1200}
									height={750}
									draggable={false}
									className="h-full w-full translate-x-6 scale-[1.02] object-cover opacity-35 blur-[1px]"
								/>
								<div className="absolute inset-0 bg-linear-to-l from-white/70 to-white/20" />
							</div>

							<div
								className={`relative z-20 mx-auto h-full w-[64%] overflow-hidden rounded-xl border border-white/80 bg-white/65 shadow-[0_10px_28px_rgba(27,53,83,0.22)] ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
								onPointerDown={onGalleryDragStart}
								onPointerMove={onGalleryDragMove}
								onPointerUp={onGalleryDragEnd}
								onPointerLeave={onGalleryDragEnd}
								onPointerCancel={onGalleryDragEnd}
							>
								<Image
									src={galleryImages[galleryIndex]}
									alt={`StudyTa gallery image ${galleryIndex + 1}`}
									width={1200}
									height={750}
									draggable={false}
									className="absolute inset-0 h-full w-full object-contain transition-transform duration-150 ease-out"
									style={{ transform: `translateX(${dragOffset}px)` }}
								/>
							</div>

							<button
								type="button"
								onClick={showPrevious}
								className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-[#6F422B]/35 bg-white/80 p-2.5 text-[#1b3553] transition-colors hover:bg-white"
								aria-label="Previous image"
							>
								<Image src={arrowIcon} alt="Previous" width={16} height={16} className="h-4 w-4 object-contain" />
							</button>

							<button
								type="button"
								onClick={showNext}
								className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-[#6F422B]/35 bg-white/80 p-2.5 text-[#1b3553] transition-colors hover:bg-white"
								aria-label="Next image"
							>
								<Image src={arrowIcon} alt="Next" width={16} height={16} className="h-4 w-4 rotate-180 object-contain" />
							</button>
						</div>

						<div className="mt-4 flex items-center justify-center">
							<p className="rounded-full border border-[#6F422B]/35 bg-white/80 px-4 py-1.5 text-sm font-medium text-[#1b3553]">
								{galleryIndex + 1} / {galleryImages.length}
							</p>
						</div>
					</div>
				</div>
			)}
		</main>
	);
}
