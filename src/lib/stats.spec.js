var stats = require('./stats'),
    expect = require('expect.js');

describe('Stats', function() {
    describe('max()', function() {
        it('should be 1 when comparing 1 and 0', function() {
            expect(stats.max([1, 0])).to.be(1);
        });
        it('should be 2 when comparing 1, 2 and 0', function() {
            expect(stats.max([1, 2, 0])).to.be(2);
        });
    });

    describe('min()', function() {
        it('should be 0 when comparing 1, 0, 2', function() {
            expect(stats.min([1, 0, 2])).to.be(0);
        });
        it('should be -2 when comparing 1, -2, 2', function() {
            expect(stats.min([1, -2, 2])).to.be(-2);
        });
        it('should be 1 when comparing 1', function() {
            expect(stats.min([1])).to.be(1);
        });
    });

    describe('streaks()', function() {
        it('should be [[1,1], [2,2], [4,1]] when [1,2,4]', function() {
            var serie = [1,2,4],
                expected = [[1,1], [2,2], [4,1]];
            expect(stats.streaks(serie)).to.eql(expected);
        });
        it('should be [[1,1], [2,2], [4,1]] when [1,2,2,4]', function() {
            var serie = [1,2,2,4],
                expected = [[1,1], [2,2], [2,2], [4,1]];
            expect(stats.streaks(serie)).to.eql(expected);
        });
    });

    describe('longestStreak()', function() {
        it('should be 1 when set is [1]', function() {
            var givenStreak = stats.longestStreak([1,2,3,5,6]);
            expect(givenStreak).to.be(3);
        });
        it('should be 4 when set is [1,2,4,5,6,7,9,10,11]', function() {
            givenStreak = stats.longestStreak([1,2,4,5,6,7,9,10,11]);
            expect(givenStreak).to.be(4);
        });
        it('should be 2 when set is [1,2]', function() {
            var givenStreak = stats.longestStreak([1,2,3,5,6]);
            expect(givenStreak).to.be(3);
        });
        it('should be 4 when set is [1,2,4,5,6,7,9,10,11]', function() {
            givenStreak = stats.longestStreak([1,2,4,5,6,7,9,10,11]);
            expect(givenStreak).to.be(4);
        });
        it('should be 2 when set is [1,3,4]', function() {
            var givenStreak = stats.longestStreak([1,2,3,5,6]);
            expect(givenStreak).to.be(3);
        });
        it('should be 4 when set is [1,2,4,5,6,7,9,10,11]', function() {
            givenStreak = stats.longestStreak([1,2,4,5,6,7,9,10,11]);
            expect(givenStreak).to.be(4);
        });
        it('should be 3 when set is [1,2,4,5,6]', function() {
            var givenStreak = stats.longestStreak([1,2,3,5,6]);
            expect(givenStreak).to.be(3);
        });
        it('should be 4 when set is [1,2,4,5,6,7,9,10,11]', function() {
            givenStreak = stats.longestStreak([1,2,4,5,6,7,9,10,11]);
            expect(givenStreak).to.be(4);
        });
        it('should be 3 when set is [1,2,3,5,6]', function() {
            var givenStreak = stats.longestStreak([1,2,3,5,6]);
            expect(givenStreak).to.be(3);
        });
        it('should be 4 when set is [1,2,4,5,6,7,9,10,11]', function() {
            var givenStreak = stats.longestStreak([1,2,3,5,6]);
            expect(givenStreak).to.be(3);
        });
        it('should be 4 when set is [1,2,4,5,6,7,9,10,11]', function() {
            var givenStreak = stats.longestStreak([1,2,4,5,6,7,9,10,11]);
            expect(givenStreak).to.be(4);
        });
        it('should be 4 when set is [1,2,2,3,4]', function() {
            var givenStreak = stats.longestStreak([1,2,2,3,4]);
            expect(givenStreak).to.be(4);
        });
    });
    describe('facility()', function() {
        it('should be "foo" when closest to foo', function() {
            var facilities = [{
                    name: 'foo',
                    coordinates: [0, 0]
                }, {
                    name: 'bar',
                    coordinates: [1, 1]
                }],
                coordinates = [0, 0.5];
            expect(stats.facility(coordinates, facilities).name).to.be('foo');
        });
        it('should be "bar" when closest to bar', function() {
            var facilities = [{
                    name: 'foo',
                    coordinates: [0, 0]
                }, {
                    name: 'bar',
                    coordinates: [1, 1]
                }],
                coordinates = [1, 1.5];
            expect(stats.facility(coordinates, facilities).name).to.be('bar');
        });
    });
});
