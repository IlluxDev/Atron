#!/usr/bin/env node

import { Command } from "commander";

const atron = new Command();
atron.version("0.1.0");

const options = atron.opts();

atron.parse(process.argv);