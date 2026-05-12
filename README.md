# Node-JS

### Type module
If the user set the module on package.json to CommonJS he/she will need to use the import like this on any js file.

Example:
`const express = require('express')`

Else if the user set the type to Module like `"type": "module",` he/she will need to use the import like this on any js file.

`import express from 'express'`

