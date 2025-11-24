// ** React Imports
import { Link, useNavigate } from "react-router-dom";

// ** Third Party Components
// import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
	Row,
	Col,
	Form,
	Input,
	Label,
	Button,
	CardText,
	CardTitle,
	FormFeedback,
} from "reactstrap";

// ** Illustrations Imports
// import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
// import illustrationsLight from "@src/assets/images/pages/undraw_innovative_re_rr5i.svg";
import illustrationsLight from "@src/assets/images/pages/login.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import AuthService from "@src/common/services/AuthService";
import showErrorAlert from "@components/alert/showErrorAlert";
import companyLogo from "@src/assets/images/logo/company-logo.png";
import { useMutation } from "react-query";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";

// ** Configs
import themeConfig from "@configs/themeConfig";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebookF,
	faLinkedin,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { useState, useEffect } from "react";
import { useAuth } from "../utility/context/AuthProvider";
import { useLocaleContext } from "@src/providers/LocaleProvider";
import PreferredHomePageLocalService from "@src/common/services/PreferredHomePageLocalService";

const defaultValues = {
	password: "q1w2e3r4",
	loginEmail: "admin@admin.com",
	rememberMe: true,
};

const SocialButton = ({ children, size = 20 }) => {
	const [ishover, sethover] = useState(false);

	function MouseOver() {
		sethover(true);
	}
	function MouseOut() {
		sethover(false);
	}
	return (
		<Button
			className="d-flex justify-content-center align-items-center"
			style={{
				backgroundColor: "#fff",
				border: "none",
				fontSize: size,
				boxShadow: "0px 0px 5px 0px #dfdfd9",
				width: "35px",
				height: "35px",
				transform: ishover ? "scale(1.1)" : null,
				transition: "all 0.3s ease 0s",
			}}
			color="#000"
			onMouseOver={MouseOver}
			onMouseOut={MouseOut}
		>
			{children}
		</Button>
	);
};

const Login = () => {
	// ** Hooks
	const { logUserIn, user } = useAuth();
	const navigate = useNavigate();
	const { makeLocaleUrl } = useLocaleContext();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues });

	const source = illustrationsLight;

	const {
		mutate: loginMutation,
		isLoading,
		isSuccess,
	} = useMutation((data) => AuthService.Login(data.loginEmail, data.password), {
		onSuccess: (res) => {
			const { token, data, refreshToken } = res;
			logUserIn(data, token, refreshToken);
			// showSuccessAlert({description: 'Logged In Successfully'});
		},
		onError: (e) => {
			showErrorAlert({ description: e.response.data.message ?? undefined });
		},
	});

	const onSubmit = (data) => {
		const { loginEmail, password } = data;
		loginMutation({ loginEmail, password });
	};

	useEffect(() => {
		if (user) {
			const toGoPage = PreferredHomePageLocalService.extractValue();
			navigate(makeLocaleUrl(toGoPage));
		}
	}, []);

	return (
		<div className="auth-wrapper auth-cover">
			<Row className="auth-inner m-0">
				{/* <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
					<img src={logo} width='100px' height='100px' alt="logo" />
				</Link> */}

				<Link to={makeLocaleUrl("/home")} className="brand-logo">
					<h2 className="brand-text" style={{ color: "#004956" }}>
						{themeConfig.app.appName}
					</h2>
				</Link>

				<Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
					<div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
						<img
							className="img-fluid"
							src={source}
							alt="Login Cover"
							width="90%"
						/>
					</div>
				</Col>
				<Col
					className="d-flex align-items-center auth-bg px-2 p-lg-5"
					lg="4"
					sm="12"
				>
					<Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
						<CardTitle tag="h2" className="fw-bold mb-1">
							Welcome! 👋
						</CardTitle>
						<CardText className="mb-2">
							Please sign-in to your account and start managing your system
						</CardText>
						<Form
							className="auth-login-form mt-2"
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className="mb-1">
								<Label className="form-label" for="login-email">
									Email
								</Label>
								<Controller
									id="loginEmail"
									name="loginEmail"
									control={control}
									render={({ field }) => (
										<Input
											autoFocus
											type="email"
											placeholder="john@example.com"
											invalid={errors.loginEmail && true}
											{...field}
										/>
									)}
								/>
								{errors.loginEmail && (
									<FormFeedback>{errors.loginEmail.message}</FormFeedback>
								)}
							</div>
							<div className="mb-1">
								<div className="d-flex justify-content-between">
									<Label className="form-label" for="login-password">
										Password
									</Label>
								</div>
								<Controller
									id="password"
									name="password"
									control={control}
									render={({ field }) => (
										<InputPasswordToggle
											className="input-group-merge"
											invalid={errors.password && true}
											{...field}
										/>
									)}
								/>
							</div>
							{/*<div className="form-check mb-1">*/}
							{/*	<Controller*/}
							{/*		id="remember-me"*/}
							{/*		name="rememberMe"*/}
							{/*		control={control}*/}
							{/*		render={({ field }) => (*/}
							{/*			<Input*/}
							{/*				type="checkbox"*/}
							{/*				id="remember-me"*/}
							{/*				invalid={errors.loginEmail && true}*/}
							{/*				{...field}*/}
							{/*			/>*/}
							{/*		)}*/}
							{/*	/>*/}
							{/*	<Label className="form-check-label" for="remember-me">*/}
							{/*		Remember Me*/}
							{/*	</Label>*/}
							{/*</div>*/}
							{/*<Button type="submit" color="primary" block>*/}
							{/*	Sign in*/}
							{/*</Button>*/}
							<SubmitLoadingBtn
								isLoading={isLoading || isSuccess}
								text={"Login"}
								size={"large"}
								sx={{ width: "100%", mt: 2 }}
							/>
						</Form>

						<div className="divider my-2">
							{/* <div className="divider-text">or</div> */}
						</div>
						{/* <div className="auth-footer-btn d-flex justify-content-center gap-2">
							<Link
								to="https://www.facebook.com/SheenValueLLC/"
								target="_blank"
							>
								<SocialButton size="17px">
									<FontAwesomeIcon
										icon={faFacebookF}
										style={{ color: "#3b5998" }}
									/>
								</SocialButton>
							</Link>

							<Link
								to="https://www.linkedin.com/company/sheenvalue"
								target="_blank"
							>
								<SocialButton>
									<FontAwesomeIcon
										icon={faLinkedin}
										style={{ color: "#0e76a8" }}
									/>
								</SocialButton>
							</Link>

							<Link to="https://www.instagram.com/sheenvalue/" target="_blank">
								<SocialButton>
									<FontAwesomeIcon
										icon={faInstagram}
										style={{ color: "#ee2a7b" }}
									/>
								</SocialButton>
							</Link>
						</div> */}
						<div className="d-flex justify-content-center mt-2 align-items-centere">
							<Link to="https://www.araba.ae/" target="_blank">
								<img src={companyLogo} width="120px" alt="logo" />
							</Link>
						</div>
					</Col>
				</Col>
			</Row>
		</div>
	);
};

export default Login;
