// Self-test of the ride physics without a browser:   node game/selftest.mjs
// - a key-pressing rider gets through all gates of both lanes and finishes in a plausible time
// - replaying the recorded inputs gives exactly the same run (deterministic)
// - pointing the board uphill gains no height beyond what the start push gives, then it turns downhill
// - riding straight down is a gate fault, holding one edge leaves the course: out at once, no time
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { makeTrack, start, step, DT, VERSION, trackHash, checksum, dsin, dcos, datan2 } from './physics.js';
import { pilot, fingerprint } from './autopilot.js';

const file = process.argv[2] || new URL('./tracks/ruhpolding_A2.json', import.meta.url);
const text = readFileSync(file, 'utf8');
const track = makeTrack(JSON.parse(text));

{ // the physics' own sin, cos, atan2 agree with Math to 1e-13 over the angles a run can reach
  let err = 0;
  for (let a = -40; a <= 40; a += 0.00137) {
    err = Math.max(err, Math.abs(dsin(a) - Math.sin(a)), Math.abs(dcos(a) - Math.cos(a)));
    for (const r of [1e-3, 1, 250]) err = Math.max(err, Math.abs(datan2(r * Math.sin(a), r * Math.cos(a)) - Math.atan2(Math.sin(a), Math.cos(a))));
  }
  for (const [y, x] of [[0, 0], [0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [-1, -1]]) err = Math.max(err, Math.abs(datan2(y, x) - Math.atan2(y, x)));
  assert.ok(err < 1e-13, `own sin/cos/atan2 off by ${err}`);
  console.log(`eigene sin/cos/atan2: größte Abweichung von Math ${err.toExponential(1)}`); }

function run(lane, keys) {                       // keys: function(state) or recorded Int8Array
  const s = start(track, lane), rec = [];
  let vmax = 0;
  while (!s.finished && s.t < 120) {
    const [e, w] = typeof keys === 'function' ? keys(s) : [keys[s.steps * 2] | 0, keys[s.steps * 2 + 1] | 0];
    rec.push(e, w); step(track, s, e, w); vmax = Math.max(vmax, s.v);
  }
  return { s, rec: Int8Array.from(rec), vmax };
}

for (const lane of [0, 1]) {
  const L = track.lanes[lane], a = run(lane, pilot(track, lane));
  assert.equal(a.s.fail, null, `${L.color}: ${a.s.fail}`);
  assert.equal(a.s.gate, L.gates.length);
  assert.ok(a.s.time > 15 && a.s.time < 60, `${L.color}: time ${a.s.time}`);
  const b = run(lane, a.rec);
  assert.equal(b.s.time, a.s.time); assert.equal(b.s.x, a.s.x); assert.equal(b.s.y, a.s.y); assert.equal(b.s.steps, a.s.steps);
  assert.equal(checksum(b.s), checksum(a.s)); assert.equal(fingerprint(track).split(' ')[lane], checksum(a.s));
  { const c = start(track, lane); step(track, c, 1, 0); assert.notEqual(checksum(c), checksum(start(track, lane)), 'checksum blind'); }
  console.log(`${L.color}: ${L.gates.length} Tore, ${a.s.time.toFixed(3)} s, max ${(a.vmax * 3.6).toFixed(0)} km/h, ` +
              `Wiederholung identisch (${a.s.steps} Schritte à ${(DT * 1000).toFixed(2)} ms)`);
}
{ const s = start(track, 0), z0 = track.ground(s.x, s.y); let zmax = z0; s.heading += Math.PI; s.vx = -s.vx; s.vy = -s.vy;
  for (let i = 0; i < 20 / DT && !s.finished; i++) { step(track, s, 0, 0); zmax = Math.max(zmax, track.ground(s.x, s.y)); }
  assert.ok(zmax - z0 < 0.6, `uphill: gained ${zmax - z0} m`); assert.ok(track.ground(s.x, s.y) < z0 - 1 || s.finished, 'does not come back down');
  console.log(`bergauf gestartet: höchstens ${(zmax - z0).toFixed(2)} m Höhe gewonnen, dann talwärts`); }
const straight = run(0, () => [0, 0]);
assert.match(straight.s.fail, /^Torfehler an Tor \d+$/); assert.equal(straight.s.time, null); assert.ok(straight.s.t < 10);
const left = run(0, () => [-30, 0]);                      // a little left edge all the way: a wide arc off the course
assert.equal(left.s.fail, 'Piste verlassen'); assert.equal(left.s.time, null);
{ // too fast for the arc: the edge slips and the board brakes (hockey stop), it does not carve on rails
  const s = start(track, 0); s.vx *= 5; s.vy *= 5; let slip = 0;
  for (let i = 0; i < 1 / DT; i++) { step(track, s, 127, 0); slip = Math.max(slip, Math.abs(s.slip)); }
  assert.ok(slip > 2 && s.v < 12, `no slip: ${slip}, v ${s.v}`);
  console.log(`15 m/s mit Vollkante: rutscht bis ${slip.toFixed(1)} m/s seitlich, nach 1 s noch ${s.v.toFixed(1)} m/s`); }
console.log(`geradeaus: ${straight.s.fail} nach ${straight.s.t.toFixed(1)} s, leicht links: ${left.s.fail} nach ${left.s.t.toFixed(1)} s -> ausgeschieden`);
// the page shows the same three values bottom left; they must match on every device
console.log(`Physik ${VERSION} · Strecke ${trackHash(text)} · Prüfsumme ${fingerprint(track)}\nselftest ok`);
