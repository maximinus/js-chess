// tests for the board in Javascript chess

test('getIndex()', function() {
	equal(getIndex(0, 0), 0, "(0,0) -> 0");
	equal(getIndex(3, 4), 35 ,"(3,4) -> 35");
});

