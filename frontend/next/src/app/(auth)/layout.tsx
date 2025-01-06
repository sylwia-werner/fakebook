import { Header } from "@/components/Header/Header";
import { PropsWithChildren } from "react";
import $ from "./layout.module.scss";

export default function AuthLayout({ children }: PropsWithChildren) {
	return (
		<main>
			<Header />
			<div className={$.content}>{children}</div>
		</main>
	);
}
