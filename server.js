import express, { static } from 'express';
import { join } from 'path';
const app = express();
app.use(static(__dirname + '/dist/i-admin'));
app.get('/*', function(req,res) {
  res.sendFile(join(__dirname+
    '/dist/i-admin/index.html'));});
app.listen(process.env.PORT || 8080);
