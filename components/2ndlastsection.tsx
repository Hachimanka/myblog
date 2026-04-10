import Image from "next/image";
import logo1 from "../assets/logos/logo1.png";
import logo2 from "../assets/logos/logo2.png";
import logo3 from "../assets/logos/logo3.png";

const organizationItems = [
	{
		logo: logo3,
		logoAlt: "CIT-U logo",
		title: "CIT-U Student",
		subtitle: "BS Computer Engineering",
	},
	{
		logo: logo2,
		logoAlt: "Google Developer's Club logo",
		title: "Google Developer's Club",
		subtitle: "Member 2025 - Present",
	},
	{
		logo: logo1,
		logoAlt: "Institute of Computer Engineer logo",
		title: "Institute of Computer Engineer",
		subtitle: "Commitee on internal affairs",
	},
];

export default function SecondLastSection() {
	return (
		<section className="w-full bg-[#d7d9e1] px-6 pb-12 pt-4 sm:px-10 md:px-16 md:pb-25 md:pt-6">
			<div className="mx-auto w-full max-w-6xl">
				<p className="text-center text-xl font-semibold text-[#505b6d] sm:text-2xl">
					"Passion powers my work, curiosity shapes my innovation."
				</p>

				<div className="mt-10 grid gap-8 sm:grid-cols-2 md:mt-12 md:grid-cols-3 md:gap-10">
					{organizationItems.map((item) => (
						<div key={item.title} className="flex items-center justify-center gap-3 sm:justify-start">
							<Image
								src={item.logo}
								alt={item.logoAlt}
								width={56}
								height={56}
								className="h-11 w-11 shrink-0 cursor-pointer rounded-[15px] object-contain transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-110 motion-safe:hover:animate-bounce active:scale-95 md:h-13 md:w-13"
							/>
							<div className="leading-tight text-[#4a5568]">
								<p className="text-lg font-semibold md:text-xl">{item.title}</p>
								<p className="mt-1 text-sm font-medium md:text-base">{item.subtitle}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
