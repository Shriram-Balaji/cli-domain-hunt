"use strict";
const fetch = require("node-fetch");
const config = require("./config");
const chalk = require("chalk");
const { error, success, debug, httpUtil } = require("util-box");
const wait = require("./wait");

// fetch alternate domain-name suggestions
async function fetchSuggestions(input) {
	let reqUrl = httpUtil.makeQueryString({ domain: input }, `${config.API_ENDPOINT}/suggestions`);
	const stopSpinner = wait("Hunting Domain Suggestions");
	try {
		let res = await fetch(reqUrl);
		if (!/2[0-9]/.test(res.status)) {
			error("Error! Unable to fetch suggestions.", res.status);
		} else {
			let body = await res.json();
			console.log(
				` ${chalk.white(`
🌎  Here are some suggestions similar to ${chalk.cyan.underline(input)}`)} `
			);
			body.map(domains => {
				console.log(`${chalk.greenBright(domains.domain)} `);
			});
			stopSpinner();
		}
	} catch (err) {
		error(`Sorry! Unable to fetch suggestions due to Error ${err}`);
		stopSpinner();
	}
}

// check domain name availability
async function checkAvailability(input) {
	debug(`Checking availability for ${input}`);
	let reqUrl = httpUtil.makeQueryString({ domain: input }, `${config.API_ENDPOINT}/available`);
	const stopSpinner = wait("Hunting domain availability");
	try {
		let res = await fetch(reqUrl);
		if (!/2[0-9]/.test(res.status)) {
			debug(`Error! Expected 2xx, found ${res.status}`);
			error(`
			Unable to fetch Domain Availability!
			${res.status}`);
			stopSpinner();
		} else {
			let body = await res.json();
			if (body.available) {
				if (body.period > 1) body.numberofYears = "years";
				else body.numberofYears = "year";
				console.log(`
  ${chalk.bold.underline(`Available`)}
  Domain : ${chalk.greenBright.underline(body.domain)}
  Price  : ${chalk.white(body.price)} ${chalk.yellowBright(body.currency)}
  Period : ${chalk.white(body.period)} ${body.numberofYears}
`);
			} else {
				console.log(`
Oh no! That domain seems to be taken.
				`);
				fetchSuggestions(input);
			}
			stopSpinner();
		}
	} catch (err) {
		error(`
		Unable to Fetch domain availability ${err}`);
		stopSpinner();
	}
}

const performComparison = input => {
	debug(`comparing the ${input}`);
};

const app = (input, flags) => {
	if (flags.compare || flags.c) performComparison(input);
	if (flags.suggestions || flags.s) fetchSuggestions(input);
	else checkAvailability(input);
};

module.exports = app;
