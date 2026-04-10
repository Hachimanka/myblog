"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import myLogo from "../assets/navbar/mylogo.png";

export default function Navbar() {
	const [isVisible, setIsVisible] = useState(true);
	const [isDarkMode, setIsDarkMode] = useState(false);

	const applyTheme = (dark: boolean) => {
		document.documentElement.classList.toggle("dark-mode", dark);
		document.body.classList.toggle("dark-mode", dark);
	};

	const toggleDarkMode = () => {
		setIsDarkMode((prev) => {
			const next = !prev;
			applyTheme(next);
			window.localStorage.setItem("theme", next ? "dark" : "light");
			return next;
		});
	};

	const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
		event.preventDefault();
		const target = document.getElementById(targetId);
		if (!target) return;

		const navOffset = 92;
		const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
		window.scrollTo({ top, behavior: "smooth" });
	};

	useEffect(() => {
		const savedTheme = window.localStorage.getItem("theme");
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;
		setIsDarkMode(shouldUseDark);
		applyTheme(shouldUseDark);
	}, []);

	useEffect(() => {
		const firstSection = document.getElementById("about");
		if (!firstSection) return;

		const updateNavbarVisibility = () => {
			const rect = firstSection.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			const visibleHeight = Math.max(
				0,
				Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
			);
			const visibleRatio = viewportHeight > 0 ? visibleHeight / viewportHeight : 0;

			// Keep navbar visible until first section reaches 50% visible.
			setIsVisible(visibleRatio > 0.5);
		};

		updateNavbarVisibility();
		window.addEventListener("scroll", updateNavbarVisibility, { passive: true });
		window.addEventListener("resize", updateNavbarVisibility);

		return () => {
			window.removeEventListener("scroll", updateNavbarVisibility);
			window.removeEventListener("resize", updateNavbarVisibility);
		};
	}, []);

	return (
		<header
			className={`fixed inset-x-0 top-0 z-50 w-full bg-[#49627a] text-white transition-transform duration-500 ease-out ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
		>
			<div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 md:px-8">
				<div className="flex items-center justify-end sm:justify-between">
					<nav className="hidden items-center gap-8 text-sm font-regular sm:flex">
						<a href="#aboutme" onClick={(event) => handleNavClick(event, "aboutme")} className="opacity-95 transition-opacity hover:opacity-100">
							About Me
						</a>
						<a href="#projects" onClick={(event) => handleNavClick(event, "projects")} className="opacity-95 transition-opacity hover:opacity-100">
							My Projects
						</a>
						<a href="#skills" onClick={(event) => handleNavClick(event, "skills")} className="opacity-95 transition-opacity hover:opacity-100">
							Skills
						</a>
						<a href="#contact" onClick={(event) => handleNavClick(event, "contact")} className="opacity-95 transition-opacity hover:opacity-100">
							Contact Me
						</a>
					</nav>

					<div className="flex items-center gap-3">
						<Image
							src={myLogo}
							alt="My logo"
							width={50}
							height={30}
							priority
							className="object-contain transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-110"
						/>

						<button
							type="button"
							onClick={toggleDarkMode}
							aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
							className="ml-1 -mr-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-white/20"
						>
							{isDarkMode ? (
								<svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
									<path d="M6.76 4.84 5.35 3.43 3.93 4.85l1.42 1.41zM1 13h3v-2H1zm10-9h2V1h-2zm9.07.85-1.41-1.42-1.41 1.42 1.41 1.41zM17.24 19.16l1.41 1.41 1.42-1.41-1.42-1.41zM20 13h3v-2h-3zM11 23h2v-3h-2zm-7.07-3.44 1.41 1.41 1.42-1.41-1.42-1.41zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10" />
								</svg>
							) : (
								<svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
									<path d="M21.75 15.5A9 9 0 0 1 12.5 2.25 10 10 0 1 0 21.75 15.5" />
								</svg>
							)}
						</button>
					</div>
				</div>

				<nav className="mt-3 grid grid-cols-2 gap-2 text-center text-sm font-semibold sm:hidden">
					<a href="#aboutme" onClick={(event) => handleNavClick(event, "aboutme")} className="rounded-md bg-white/10 px-3 py-2 transition-colors hover:bg-white/15">
						About Me
					</a>
					<a href="#projects" onClick={(event) => handleNavClick(event, "projects")} className="rounded-md bg-white/10 px-3 py-2 transition-colors hover:bg-white/15">
						My Projects
					</a>
					<a href="#skills" onClick={(event) => handleNavClick(event, "skills")} className="rounded-md bg-white/10 px-3 py-2 transition-colors hover:bg-white/15">
						Skills
					</a>
					<a href="#contact" onClick={(event) => handleNavClick(event, "contact")} className="rounded-md bg-white/10 px-3 py-2 transition-colors hover:bg-white/15">
						Contact Me
					</a>
				</nav>
			</div>
		</header>
	);
}
