import $ from "./LoginView.module.scss";

export const LoginView = () => {
	return (
		<section className={$.section}>
			<h1>Login</h1>
			<form className={$.form}>
				<input className={$.input} type="text" placeholder="Email" />
				<input className={$.input} type="text" placeholder="Password" />
				<button className={$.button}>Sign in</button>
			</form>
			<hr />
			<p>{`Don't have an account?`}</p>
			<button className={$.button}>Register</button>
		</section>
	);
};
