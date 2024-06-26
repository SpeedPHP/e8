#!/usr/bin/env node
const commander = require('commander');
const program = new commander.Command();
const cookieWeb = require("./lib/cookie")
const clientCross = require("./lib/client")
const serverCross = require("./lib/server")
const package = require("./package.json")

program
  .name('e8')
  .description(package.description)
  .version(package.version)
  .usage("command [configuration file path]")

program
  .command('server')
  .description('Start server-side proxy service.')
  .argument('[path]', 'Configuration file path')
  .action((config) => {
    if(config === undefined || config == {}) {
      config = process.cwd() + "/config.json"
    }
    serverCross(config)
  })
program
  .command('client')
  .description('Start client link service.')
  .argument('[path]', 'Configuration file path')
  .action((config) => {
    if(config === undefined || config == {}) {
      config = process.cwd() + "/config.json"
    }
    clientCross(config)
  })
program
  .command('cookie')
  .description('Enable cookie proxy service.')
  .argument('[path]', 'Configuration file path')
  .action((config) => {
    if(config === undefined || config == {}) {
      config = process.cwd() + "/config.json"
    }
    cookieWeb(config)
  })
program.command('help', { isDefault: true })
  .description('Display help for e8 command.')
  .action(() => {
    program.help()
  })


program.parse(process.argv);
