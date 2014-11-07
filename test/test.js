var intersect = require('../'),
  test = require('tape'),
  glob = require('glob'),
  fs = require('fs');

var REGEN = true;

test('intersect -- featurecollection', function(t){
  glob.sync(__dirname + '/fixtures/in/*.json').forEach(function(input) {
      var fcs = JSON.parse(fs.readFileSync(input));
      var output = intersect(fcs[0], fcs[1]);
      if (REGEN) fs.writeFileSync(input.replace('/in/', '/out/'), JSON.stringify(output));
      t.deepEqual(output, JSON.parse(fs.readFileSync(input.replace('/in/', '/out/'))), input);
  });
  t.end();
});

test('intersect -- features', function(t){
  glob.sync(__dirname + '/fixtures/in/*.json').forEach(function(input) {
      var fcs = JSON.parse(fs.readFileSync(input));
      var output = intersect(fcs[0].features[0], fcs[1].features[0]);
      if (REGEN) fs.writeFileSync(input.replace('/in/', '/out/'), JSON.stringify(output));
      t.deepEqual(output, JSON.parse(fs.readFileSync(input.replace('/in/', '/out/'))), input);
  });
  t.end();
});

test('intersect -- geometries', function(t){
  glob.sync(__dirname + '/fixtures/in/*.json').forEach(function(input) {
      var fcs = JSON.parse(fs.readFileSync(input));
      var output = intersect(fcs[0].features[0].geometry, fcs[1].features[0].geometry);
      if (REGEN) fs.writeFileSync(input.replace('/in/', '/out/'), JSON.stringify(output));
      t.deepEqual(output, JSON.parse(fs.readFileSync(input.replace('/in/', '/out/'))), input);
  });
  t.end();
});

test('intersect -- no overlap', function(t){
  var noOverlap = JSON.parse(fs.readFileSync(__dirname+'/fixtures/no-overlap.geojson'));
  var output = intersect(noOverlap.features[0].geometry, noOverlap.features[1].geometry);
  t.deepEqual(output, []);
  t.end();
});