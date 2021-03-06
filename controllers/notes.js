var Note = require("../models/note.js");
var makeDate = require("../scripts/date.js");

module.exports = {
    get: function (query, cb) {
        Note.find({
            _headlineId: data._id,
        }, cb);
    },
    save: function (data, cb) {

        var newNote = {
            _headlineId: data._id,
            date: makeDate(),
            noteText: data.noteText
        };

        Note.create(newNote, function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                console.log(doc);
                cb(doc);
            }
        });
    },
    delete: function (data, cb) {
        Note.remove({
            _id: data.id
        }, cb);
    }
};