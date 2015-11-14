fs = require 'fs'
cp = require 'child_process'

task 'build', ->

    source   = (fs.readFileSync 'src/jquery.github.template.js').toString()
    template = (fs.readFileSync 'src/template.html').toString()
    license = (fs.readFileSync 'src/license.txt').toString()

    template = template
        .replace(/[\r\n]+/g, '\\n')
        .replace(/"/g, '\\"')

    output = source.replace '{{template}}', template

    fs.writeFileSync 'src/jquery.github.js', output
    output = cp.execSync 'uglifyjs src/jquery.github.js'
    fs.writeFileSync 'src/jquery.github.min.js', license + output
