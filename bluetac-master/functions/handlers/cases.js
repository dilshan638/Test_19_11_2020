const { db } = require('../util/admin');

exports.getAllCases = (req, res) => {
  db.collection('cases')
    .orderBy('createdTime', 'desc')
    .get()
    .then((data) => {
      let cases = [];
      data.forEach((doc) => {
        cases.push({
          caseId: doc.id,
          ...doc.data()
        });
      });
      return res.json(cases);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.postOneCase = (req, res) => {
  // if (req.body.body.trim() === '') {
  //   return res.status(400).json({ body: 'Body must not be empty' });
  // }
  const newCase = {
    ...req.body,
    customerId: req.user.userId,
    customerId: req.user.imageUrl,
    createdTime: new Date().toISOString(),
  };

  db.collection('cases')
    .add(newCase)
    .then((doc) => {
      res.json({...newCase, caseId: doc.id});
    })
    .catch((err) => {
      res.status(500).json({ error: 'something went wrong' });
      console.error(err);
    });
};
// Fetch one case
exports.getCase = (req, res) => {
  let caseData = {};
  db.doc(`/cases/${req.params.caseId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Case not found' });
      }
      caseData = doc.data();
      caseData.caseId = doc.id;
      return res.json(caseData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// Delete a case
exports.deleteCase = (req, res) => {
  const document = db.doc(`/cases/${req.params.caseId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Case not found' });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: 'Unauthorized' });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: 'Case deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
