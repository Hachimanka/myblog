"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import arrowIcon from "../assets/navbar/arrow.png";
import myLogo from "../assets/navbar/mylogo.png";

type NavbarProjectsProps = {
	backgroundColor?: string;
	backHref?: string;
};

export default function NavbarProjects({ backgroundColor = "#49627a", backHref = "/" }: NavbarProjectsProps) {
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

	useEffect(() => {
		const savedTheme = window.localStorage.getItem("theme");
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;
		setIsDarkMode(shouldUseDark);
		applyTheme(shouldUseDark);
	}, []);

	return (
		<header className="slide-in-top-down w-full text-white" style={{ backgroundColor }}>
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 md:px-8">
				<Link
					href={backHref}
					aria-label="Back to home"
					className="group inline-flex items-center text-white/90 transition-opacity hover:opacity-100"
				>
					<Image
						src={arrowIcon}
						alt="Back"
						width={16}
						height={16}
						className="h-4 w-4 object-contain transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-125"
					/>
				</Link>

				<div className="flex items-center gap-3">
					<Link href="/#about" aria-label="Go to first section" className="inline-flex items-center">
						<Image
							src={myLogo}
							alt="My logo"
							width={50}
							height={30}
							priority
							className="object-contain transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-110"
						/>
					</Link>

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
		</header>
	);
}
