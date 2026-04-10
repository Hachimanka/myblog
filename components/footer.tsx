import Image from "next/image";
import Link from "next/link";
import linkedinIcon from "../assets/footer/linkedin.png";
import facebookIcon from "../assets/footer/facebook.png";
import githubIcon from "../assets/footer/github.png";
import phoneIcon from "../assets/footer/phone.png";
import myLogo from "../assets/navbar/mylogo.png";

export default function Footer() {
	const linkHoverClass = "inline-block transition-transform duration-200 ease-out hover:scale-105 hover:-translate-y-0.5 motion-safe:hover:animate-bounce";
	const iconHoverClass = "h-3.5 w-3.5 object-contain transition-transform duration-200 ease-out group-hover:scale-110 group-hover:-translate-y-0.5 motion-safe:group-hover:animate-bounce";

	return (
		<footer id="contact" className="w-full bg-[#355477] px-6 py-8 text-white sm:px-10 md:px-16 md:py-10">
			<div className="mx-auto flex min-h-65 w-full max-w-6xl flex-col">
				<div className="flex items-start justify-between">
					<h2 className="text-3xl font-semibold tracking-wide">Contact Me</h2>
					<Image
						src={myLogo}
						alt="LLF logo"
						width={60}
						height={36}
						className="h-8 w-auto object-contain transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-105"
					/>
				</div>

				<div className="mt-auto border-t border-white/15 pt-6 md:pt-8">
					<div className="grid items-end gap-8 md:grid-cols-[1.35fr_1fr]">
					<div className="grid gap-y-3 md:grid-cols-[1fr_auto] md:gap-x-20">
						<div className="space-y-3">
							<div className="group flex items-center gap-3">
								<Image src={linkedinIcon} alt="LinkedIn" width={14} height={14} className={iconHoverClass} />
								<Link
									href="https://linkedin.com/in/leonard-forrosuelo-6411933a3"
									target="_blank"
									rel="noreferrer"
									className={`${linkHoverClass} whitespace-nowrap text-xs font-medium text-white/90 hover:text-white sm:text-sm`}
								>
									linkedin.com/in/leonard-forrosuelo-6411933a3
								</Link>
							</div>

							<div className="group flex items-center gap-3">
								<Image src={facebookIcon} alt="Facebook" width={14} height={14} className={iconHoverClass} />
								<Link
									href="https://web.facebook.com/forrosueloleonard.lape"
									target="_blank"
									rel="noreferrer"
									className={`${linkHoverClass} text-sm font-medium text-white/90 hover:text-white`}
								>
									web.facebook.com/forrosueloleonard.lape
								</Link>
							</div>
						</div>

						<div className="space-y-3 md:justify-self-end">
							<div className="group flex items-center gap-3">
								<Image src={githubIcon} alt="GitHub" width={14} height={14} className={iconHoverClass} />
								<Link
									href="https://github.com/Hachimanka"
									target="_blank"
									rel="noreferrer"
									className={`${linkHoverClass} text-sm font-medium text-white/90 hover:text-white`}
								>
									github.com/Hachimanka
								</Link>
							</div>

							<div className="flex items-center gap-3">
								<Image src={phoneIcon} alt="Phone" width={14} height={14} className="h-3.5 w-3.5 object-contain" />
								<p className="text-sm font-medium text-white/90">(+63)936-5314-156</p>
							</div>
						</div>
					</div>

					<div className="space-y-4 text-left md:text-right">
						<div className="space-y-1">
							<p className="text-sm font-regular leading-tight sm:text-base">Check out my portfolio repository here:</p>
							<Link
								href="https://github.com/Hachimanka/myblog.git"
                                    target="_blank"
                                    rel="noreferrer"
									className={`${linkHoverClass} text-sm font-regular text-white/90 underline underline-offset-2 hover:text-white`}
                                >
								Repository
							</Link>
						</div>

						<div className="space-y-1">
							<p className="text-sm font-regular leading-tight sm:text-base">Download my resume here:</p>
							<Link
								href="https://drive.google.com/drive/folders/1FNzOdgGRDz_RezNOV2jILQqXiCIJ6SgU?usp=drive_link"
								target="_blank"
								rel="noreferrer"
								className={`${linkHoverClass} text-sm font-regular text-white/90 underline underline-offset-2 hover:text-white`}
							>
								Resume
							</Link>
						</div>
					</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
