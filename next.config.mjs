import { withSentryConfig } from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin( './src/i18n/request.js' );

const nextConfig = {
				images: {
								domains: [ 'sandbox.airalo.com', 'uatagent.gigago.com', 'hn.ss.bfcplatform.vn', 'cdn.airalo.com','bss-api.skyfi.network' ],
				},
				experimental: {
								serverActions: {
												allowedOrigins: [
																'paymentv2.galaxypay.vn',
																'uat-paymentv2.galaxypay.vn'

												],
								},
				},
				webpack: (config, { isServer }) => {
								// Ignore canvas module on client side (used by pdfjs-dist)
								if (!isServer) {
												config.resolve.alias = {
																...config.resolve.alias,
																canvas: false,
												};
								}

								return config;
				},
};

export default withSentryConfig(withNextIntl(nextConfig), {
 // For all available options, see:
	// https://www.npmjs.com/package/@sentry/webpack-plugin#options

	org: "anphat",

 project: "javascript-nextjs",

 // Only print logs for uploading source maps in CI
	silent: !process.env.CI,

 // For all available options, see:
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

	// Upload a larger set of source maps for prettier stack traces (increases build time)
	widenClientFileUpload: true,

 // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
	// This can increase your server load as well as your hosting bill.
	// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
	// side errors will fail.
	tunnelRoute: "/monitoring",

 webpack: {
			treeshake: {
					removeDebugLogging: true,
			},
	},
});
