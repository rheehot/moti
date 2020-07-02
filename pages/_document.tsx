import Document, { Main, NextScript, Html } from 'next/document';
import Helmet from 'react-helmet';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Head from 'next/head';

export default class CustomDocument extends Document<any> {
	static async getInitialProps(context: any): Promise<any> {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = context.renderPage;
		try {
			context.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />),
				});
			const initialProps = await Document.getInitialProps(context);
			const page = context.renderPage((App: any) => (props: any) => sheet.collectStyles(<App {...props} />));
			const styles = (
				<>
					{initialProps.styles}
					{sheet.getStyleElement()}
				</>
			);
			return {
				...initialProps,
				...page,
				styles,
				helmet: Helmet.renderStatic(),
			};
		} catch (error) {
			console.error(error);
			return null;
		} finally {
			sheet.seal();
		}
	}

	render() {
		// const { publicRuntimeConfig } = getConfig();
		const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
		const htmlAttrs = htmlAttributes.toComponent();
		const bodyAttrs = bodyAttributes.toComponent();
		return (
			<Html lang="ko" dir="ltr" {...htmlAttrs}>
				<Head>
					<link href="/static/reset.css" rel="stylesheet" />
					{this.props.styleTags}
					<meta charSet="utf-8" />
					<meta httpEquiv="x-ua-compatible" content="ie=edge" />
					<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
					<title>yuni-q</title>
					<meta name="description" content="yuni-q" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content="http://localhost:8080/" />
					<meta property="og:title" content="yuni-q" />
					<meta property="og:image" content="/static/favicon.png" />
					<meta property="og:description" content="yuni-q" />
					<meta property="og:site_name" content="yuni-q" />
					<meta property="og:locale" content="ko" />
					{Object.values(helmet).map((el: any) => el.toComponent())}
					<link rel="manifest" href="/static/manifest.json" />
					<link rel="shorcut icon" href="/static/favicon.png" />
					<meta name="theme-color" content="black" />
				</Head>
				<body {...bodyAttrs}>
					<Main />
					{process.env.NODE_ENV === 'production' && (
						<script src="https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated" />
					)}
					<NextScript />
				</body>
			</Html>
		);
	}
}
