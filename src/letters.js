const letters = [
    {subject: "Topic1", text: "TEXT!1"},
    {subject: "Topic2", text: "TEXT!2"},
    {subject: "Topic3", text: "TEXT!3"},
    { subject: "New Letter", text: "NEW LETTER TEXT WOW SUCH LETTER MUCH SPAM WOW" },
];

function getAll() {
    return letters;
}

module.exports = {
    getAll,
};