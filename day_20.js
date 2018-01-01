/*

p0, v0, a

v_t = v_(t-1) + a
p_t = p_(t-1) + v_t

v1 = v0 + a
p1 = p0 + v1 = p0 + v0 + a

v2 = v1 + a = v0 + a + a = v0 + 2a
p2 = p1 + v2 = p0 + v0 + a + v0 + 2a = p0 + 2v0 + 3a

v3 = v2 + a = v0 + 2a + a = v0 + 3a

# OBS! fel nedan 4v0 ska vara 3v0, samt följdfel i p_t = ...:

p3 = p2 + v3 = p0 + 2v0 + 3a + v0 + 3a = p0 + 4v0 + 6a

p_t = p0 + (t+1)v0 + (t+2)(t+1)a/2 = p0 + t*v0 + v0 + (t^2 + t + 2t + 2)a/2 = ... => t^2 * a dominating term

# Dock stämmer det ju att t^2 blir den dominerande termen, så det blir ändå rätt slutsats..

abs(t^2 * ax) + abs(t^2 * ay) + abs(t^2 * az) = t^2 * (abs(ax) + abs(ay) + abs(az))

**** part 2 collisions ****

# wrong from above:
p_t = p0 + (t+1)v0 + (t+2)(t+1)a/2 =
p0 + t*v0 + v0 + (t^2 + t + t*2 + 2)a/2 =
p0 + t*v0 + v0 + (t^2*a/2 + t*a/2 + t*2*a/2 + 2*a/2) =
t^2*a/2 + t(v0 + 3a/2) + p0 + v0 + a

t^2*a/2 + t*(v0 + 3a/2) + p0 + v0 + a =
t^2*b/2 + t*(w0 + 3b/2) + q0 + w0 + b

t^2*(a-b)/2 + t*((v0 - w0) + 3(a-b)/2) + (p0-q0) + (v0-w0) + (a-b) = 0
A = (a-b)/2, B = ((v0 - w0) + 3(a-b)/2), C = (p0-q0) + (v0-w0) + (a-b) =>
A*t^2 + B*t + C = 0
t = (-B +- sqrt(B^2 - 4*A*C)) / (2*A)

B^2 − 4AC < 0 => There are no real roots.



t^2*a/2 + t*(v0 + 3a/2) + p0 + v0 + a =
t^2*b/2 + t*(w0 + 3b/2) + q0 + w0 + b

t^2*a/2 + t*(v0 + 3a/2) + p0 + v0 + a
- t^2*b/2 - t*(w0 + 3b/2) - q0 - w0 - b = 0 =
t^2 / 2 * (a - b) + t * ((v0 - w0) + 3 / 2 * (a - b)) + (p0 - q0) + (v0 - w0) + (a - b) =
t^2 / 2 * da + t * (dv + 3 / 2 * da) + dp + dv + da =
t^2 * (da / 2) + t * (dv + da * 3 / 2) + (dp + dv + da) =

# NEW TAKE:

# deriving v and p in terms of p0, v0, a

p0, v0, a

v = v(t) = v(t-1) + a
p = p(t) = p(t-1) + v(t)

v1 = v0 + a
p1 = p0 + v1 = p0 + v0 + a

v2 = v1 + a = v0 + a + a = v0 + 2*a
p2 = p1 + v2 = p0 + v0 + a + v0 + 2*a = p0 + 2*v0 + 3*a

v3 = v2 + a = v0 + 2*a + a = v0 + 3*a
p3 = p2 + v3 = p0 + 2*v0 + 3*a + v0 + 3*a = p0 + 3*v0 + 6*a

p4 = p3 + v4 = p0 + 3*v0 + 6*a + v0 + 4*a = p0 + 4*v0 + 10*a

v = v0 + t*a
p = p0 + t*v0 + t*(t + 1)*a/2

# t(p0, v0, a, p):

p = p0 + t*v0 + t*(t + 1)*a/2
t*v0 + t^2*a/2 + t*a/2 + p0 - p = 0
t^2*a/2 + t*(v0 + a/2) + p0 - p = 0
A = a/2, B = (v0 + a/2), C = p0 - p
t^2*A + t*B + C = 0

t = (-B ± √(B^2 - 4*A*C)) / (2*A)
discriminant: B^2 - 4*A*C

# collision:
p, q
p(t) = p = p0 + t*v0 + t*(t + 1)*a/2
q(t) = q = q0 + t*w0 + t*(t + 1)*b/2

p(t) = q(t) => t = ?

p0 + t*v0 + t*(t + 1)*a/2 = q0 + t*w0 + t*(t + 1)*b/2
p0 - q0 + t*v0 - t*w0 + t*(t + 1)*a/2 - t*(t + 1)*b/2 = 0
p0 - q0 + t*v0 - t*w0 + t*(t + 1)*a/2 - t*(t + 1)*b/2 =
(p0 - q0) + t*(v0 - w0) + t*(t + 1)*(a - b)/2

dp = p0 - q0, dv = v0 - w0, da = a - b =>
dp + t*dv + t*(t + 1)*da/2 = 0
dp + t*dv + t*(t + 1)*da/2 =
dp + t*dv + t^2*da/2 + t*da/2 =
t^2*(da/2) + t*(dv + da/2) + dp

# da = 0, dv = 0
t^2*(da/2) + t*(dv + da/2) + dp =
dp

# da = 0
t^2*(da/2) + t*(dv + da/2) + dp =
t*dv + dp

A = da/2, B = dv + da/2, C = dp =>
t = (-B ± √(B^2 - 4*A*C)) / (2*A)
discriminant: B^2 - 4*A*C




*/


const parse_input = input => {

  return input.replace(/\n$/).split("\n")
  .map(r => /^p=<\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)>,\s*v=<\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)>,\s*a=<\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)>/.exec(r))
  .map(m => m.map(s => parseInt(s, 10)))
  .map((m,i) => ({i,p:{x:m[1],y:m[2],z:m[3]},v:{x:m[4],y:m[5],z:m[6]},a:{x:m[7],y:m[8],z:m[9]}}));

};

const test_part_1 = () => {

  /* examine the "math"

  const fp = (p0,v0,a,t) => p0 + v0*(i+1) + a*(i+2)*(i+1)/2;

  let
    p0 = 11,
    v0 = 13,
    p = p0,
    v = v0,
    a = 17;

  for (var i = 0; i < 10; i++) {
    v = v + a;
    p = p + v;
    console.log(i, p, v, a, fp(p0, v0, a, i));
  } */

  const test_input =
`p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>
p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>
p=< 4,0,0>, v=< 1,0,0>, a=<-1,0,0>
p=< 2,0,0>, v=<-2,0,0>, a=<-2,0,0>
p=< 4,0,0>, v=< 0,0,0>, a=<-1,0,0>
p=<-2,0,0>, v=<-4,0,0>, a=<-2,0,0>
p=< 3,0,0>, v=<-1,0,0>, a=<-1,0,0>
p=<-8,0,0>, v=<-6,0,0>, a=<-2,0,0>
`;

  // console.log(parse_input(test_input));

  const manhattan_acceleration = particle =>
    Math.abs(particle.a.x) + Math.abs(particle.a.y) + Math.abs(particle.a.z);

  const find_slowest_particle = particles => {
    let slowest = null;

    for (p of particles) {

        if (slowest === null) {
          slowest = p;
        } else {
          if (manhattan_acceleration(p) < manhattan_acceleration(slowest)) {
            slowest = p;
          }
        }

    }

    return slowest;
  }


  let particles = // parse_input(test_input);
    parse_input(require("fs").readFileSync("day_20_input.txt", {encoding: "utf-8"}));

  let slowest = find_slowest_particle(particles);

  console.log(slowest);

};

// test_part_1();

const test_part_2 = () => {

  const find_collision_old = (p, q) => {
    /*

    t^2*(a-b)/2 + t*((v0 - w0) + 3(a-b)/2) + (p0-q0) + (v0-w0) + (a-b) = 0
    A = (a-b)/2, B = ((v0 - w0) + 3(a-b)/2), C = (p0-q0) + (v0-w0) + (a-b) =>
    A*t^2 + B*t + C = 0
    t = (-B +- sqrt(B^2 - 4*A*C)) / (2*A)

    B^2 − 4AC < 0 => There are no real roots.

    */

    let
      dpx = p.p.x - q.p.x,
      dvx = p.v.x - q.v.x,
      dax = p.a.x - q.a.x,
      A = dax / 2,
      B = dvx + 3 * dax / 2,
      C = dpx + dvx + dax;

    // console.log(dpx, dvx, dax);

    if (dax === 0) {
      // no difference in acceleration, so no quadratic function
      // B*t + C = 0 => t = -C / B
      // B==0 ?
      if (dvx == 0) {
        return null;
      }
      let t = -C / B;
      return Number.isInteger(t) ? t : null;
    } else if ((B**2 - 4*A*C) < 0) {
      return Number.NaN;
    } else {
      let rp = Math.sqrt(B**2 - 4*A*C);
      let t = [
        (-B + rp) / (2*A),
        (-B - rp) / (2*A)];
      return t;
    }

  };

  const get_position_at_time = (p, t) => {

    // p = p0 + t*v0 + t*(t + 1)*a/2
    return {
      x: p.p.x + t * p.v.x + t*(t+1)*p.a.x/2,
      y: p.p.y + t * p.v.y + t*(t+1)*p.a.y/2,
      z: p.p.z + t * p.v.z + t*(t+1)*p.a.z/2
    };

  };

  const find_collision = (p0, p1) => {

    const check_coordinate = (dp, dv, da) => {

      /* t^2*(da/2) + t*(dv + da/2) + dp = 0 */

      if (da === 0) {

        /* t*dv + dp = 0 */

        if (dv === 0) {

          /* dp = 0 */

          return dp === 0 ? true : [];

        } else {

            /* t*dv + dp = 0 => t = -dp / dv */

            let t = -dp / dv;

            return (t >= 0 && Number.isInteger(t)) ? [t] : [];

        }

      } else {

        /* t^2*(da/2) + t*(dv + da/2) + dp = 0 */

        let A = da/2, B = dv + da/2, C = dp;

        // discriminant
        let D = B**2 - 4*A*C;

        if (D < 0) {
          // no solution => no collision
          return [];
        } else if (D == 0) {
          // one solutions => collision if > 0
          let t = -B / (2 * A);
          return (t >= 0 && Number.isInteger(t)) ? [t] : [];
        } else {
          // two solutions => collision if any > 0
          let ts = [(-B + D) / (2 * A), (-B - D) / (2 * A)];
          return ts.filter(t => (t >= 0 && Number.isInteger(t)));
        }

        // t = (-B ± √(B^2 - 4*A*C)) / (2*A)
        // discriminant: B^2 - 4*A*C

      }


    };

    let dpx = p0.p.x - p1.p.x, dvx = p0.v.x - p1.v.x, dax = p0.a.x - p1.a.x;
    let txs = check_coordinate(dpx, dvx, dax);

    let dpy = p0.p.y - p1.p.y, dvy = p0.v.y - p1.v.y, day = p0.a.y - p1.a.y;
    let tys = check_coordinate(dpy, dvy, day);

    let dpz = p0.p.z - p1.p.z, dvz = p0.v.z - p1.v.z, daz = p0.a.z - p1.a.z;
    let tzs = check_coordinate(dpz, dvz, daz);

    // console.log(ts);

    try {
      let ts = txs.filter(tx => ((tys === true) || tys.some(ty => ty === tx)) && ((tzs === true) || tzs.some(tz => tz === tx)));
      return ts; //[ts, txs, tys, tzs];
    } catch (error) {
      console.error("error: ", error, txs, tys, tzs);
    }

  };

  const find_collisions = particles => {

    for (var t = 0; t < 1000000; t++) {

      let collisions = [];

      for (var i = 0; i < particles.length - 1; i++) {
        let p = particles[i];

        if (p.collision < t) {
          continue;
        }

        let p_pos = get_position_at_time(p, t);

        for (var j = i + 1; j < particles.length; j++) {
          let q = particles[j];

          if (q.collision < t) {
            continue;
          }

          let q_pos = get_position_at_time(q, t);

          if (p_pos.x === q_pos.x && p_pos.y === q_pos.y && p_pos.z === q_pos.z)
          {
            // console.log(`${i} -> ${j} @ ${t}`);
            // console.log(p_pos, q_pos);
            p.collision = t;
            q.collision = t;
          }

          /* let t = find_collision(p, q);

          if (t.some(() => true)) {
            console.log(`${i} -> ${j} @ ${t}`);
          } */





        }

      }

      process.stdout.write(`${t} ${particles.filter(p => !p.collision).length} \r`);

    }

    console.log();

    let non_collided = particles.filter(p => !p.collision).length;

    console.log(non_collided);

  };

  const test_input =
`p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>
p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>
p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>
p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>
`;

  var particles =
    // parse_input(test_input);
    parse_input(require("fs").readFileSync("day_20_input.txt", { encoding: "utf-8" }));

  //console.log(particles);

  console.log(particles.length);

  find_collisions(particles);

};

test_part_2();
