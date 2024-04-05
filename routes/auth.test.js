let testUserToken;
let testAdminToken;

beforeEach(async function () {
  const hashedPassword = await bcrypt.hash(
    "secret", BCRYPT_WORK_FACTOR);
  await db.query(`INSERT INTO users VALUES ('test', $1)`,
    [hashedPassword]);
  await db.query(`INSERT INTO users VALUES ('admin', $1)`,
    [hashedPassword]);

  // we'll need tokens for future requests
  const testUser = { username: "test" };
  const testAdmin = { username: "admin" };
  testUserToken = jwt.sign(testUser, SECRET_KEY);
  testAdminToken = jwt.sign(testAdmin, SECRET_KEY);
});