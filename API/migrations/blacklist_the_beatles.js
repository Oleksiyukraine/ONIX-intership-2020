// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongodb').ObjectID;

module.exports = {
  async up(db, client) {
    await db
      .collection('rooms')
      .updateMany(
        {},
        { $set: { partnerId: ObjectId('6105030641fd75069c32d1b0') } },
      );
  },

  async down(db, client) {
    await db.collection('rooms').updateMany({}, { $unset: { partnerId: '' } });
  },
};
