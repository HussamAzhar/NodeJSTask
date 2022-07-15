// importing DAL.js as module
const dal = require('./DAL');

//performing test for /get_users request from client
test('responds to /get_users', () => {
    const req = {};
    const res = {
        data: [],
        json: function (input) { this.data = input }
    };

    dal.fetchUsersFromDB(req, res);

    expect(res.data.length).toBeGreaterThan(-1);
    let userId = 7;
    if (res.data.length > 0) {
        res.data.forEach((user) => {
            expect(user).toEqual(
                expect.objectContaining({
                    userId,
                })
            );
            userId++;
        });
    }
});
