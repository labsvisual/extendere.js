var expect = chai.expect;

describe("Extendere", function() {

    describe( "Array", function() {

        describe( ".each()", function() {

            it( "should return every element in the array", function() {
                var arr = [ 1, 2, 3 ],
                    nea = [];

                arr.each( function( i ) {
                    nea.push( i );
                });

                expect( nea ).be.eql( [ 1, 2, 3 ] );

            });

        });

        describe( ".map()", function() {

            it( "should map every element after a filter", function() {

                var arr = [ 1, 2, 3 ],
                    nea = arr.map( function( element ) {
                        return element * 3;
                    });

                expect( nea ).be.eql( [ 3, 6, 9 ] );

            });

        });

        describe( ".sort()", function() {

            it( "should sort the array in ascending order", function() {

                var arr = [ 3, 2, 1 ],
                    nea = arr.sort();

                expect( nea ).to.eql( [ 1, 2, 3 ] );

            });

        });

        describe( ".indexOf()", function() {

            describe( "sorted", function() {

                it( "should return the correct index of the element", function() {

                    var arr = [ 1, 2, 3, 4 ,5, 6, 7, 8, 9 ],
                        pos = arr.indexOf( 5, true );

                    expect( pos ).to.equal( 4 );

                });

                it( "should return -1 when value not present", function() {

                    var arr = [ 1, 2, 3, 4 ,5, 6, 7, 8, 9 ],
                        pos = arr.indexOf( 11, true );

                    expect( pos ).to.equal( -1 );

                });

            });

            describe( "unsorted", function() {

                it( "should return the correct index of the element", function() {

                    var arr = [ 1, 2, 3, 4 ,5, 6, 7, 8, 9 ],
                        pos = arr.indexOf( 7, false );

                    expect( pos ).to.equal( 6 );

                });

                it( "should return -1 when value not present", function() {

                    var arr = [ 1, 2, 3, 4 ,5, 6, 7, 8, 9 ],
                        pos = arr.indexOf( 11, false );

                    expect( pos ).to.equal( -1 );

                });

            });

        });

        describe( ".first()", function() {

            describe( "without offset", function() {

                it( "should return the first element of the array", function() {

                    var arr = [ 1, 2, 3 ];
                    expect( arr.first() ).to.equal( 1 );

                });

            });

            describe( "with offset", function() {

                it( "should return the first two elements of the array", function() {

                    var arr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
                    expect( arr.first( 3 ) ).to.eql( [ 1, 2, 3 ] );

                });

            });

        });

        describe( ".last()", function() {

            describe( "without offset", function() {

                it( "should return the last element of the array", function() {

                    var arr = [ 1, 2, 3 ];
                    expect( arr.last() ).to.equal( 3 );

                });

            });

            describe( "with offset", function() {

                it( "should return the last two elements of the array", function() {

                    var arr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
                    expect( arr.last( 3 ) ).to.eql( [ 9, 10, 11 ] );

                });

            });

        });

        describe( ".flatten()", function() {

            it( "should flatten the array to the deepest level", function() {

                var arr = [ 1, 2, [ 3, 4, 5, [ 6, 7, 8 ] ] ],
                    ax  = arr.flatten();

                expect( ax ).to.eql( [ 1, 2, 3, 4, 5, 6, 7, 8 ] );

            });

        });

        describe( ".clean()", function() {

            it( "should return an array with all the falsy elements removed", function() {

                var arr = ( [ 0, 1, false, 2, '', 3, undefined, null, 0 / 0 ] ),
                    arx = arr.clean();

                expect( arx ).to.eql( [ 1, 2, 3 ] );

            });

        });

        describe( ".exists()", function() {

            it( "should return true when the array contains the element", function() {

                var arr = [ 1, 2, 3 ];

                expect( arr.exists( 3 ) ).to.be.true;

            });

            it( "should return false when the array contains the element", function() {

                var arr = [ 1, 2, 3 ];

                expect( arr.exists( 4 ) ).to.be.false;

            });

        });

        describe( ".union()", function() {

            it( "should return an array containing the union of the passed array", function() {

                var arr = [ 1, 2, 3 ]
                    arx = arr.union( [ 3, 4, 5 ] );

                expect( arx ).to.eql( [ 1, 2, 3, 4, 5 ] );

            });

            it( "should return an array containing the union of the passed arrays", function() {

                var arr = [ 1, 2, 3 ]
                    arx = arr.union( [ 3, 4, 5 ], [ 5, 6, 7 ], [ 5, 6, 7 ], [ 8, 9, 10 ] );

                expect( arx ).to.eql( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] );

            });

        });

        describe( ".intersect()", function() {

            it( "should return an array containing a list of the common elements", function() {

                var arr = [ 1, 2, 3 ],
                    arx = arr.intersect( [ 2, 3 ], [ 2, 3 ], [ 4, 5, 6, 7 ] );

                expect( arx ).to.eql( [ 2, 3 ] );

            });

        });

        describe( ".removeDuplicates()", function() {

            it( "should return an array without any duplicates", function() {

                var arr = [ 1, 2, 3, 2, 3, 2, 3, 4, 5, 6, 8, 2, 5, 7 ],
                    arx = [ 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1 ];

                expect( arr.removeDuplicates() ).to.eql( [ 1, 3, 4, 6, 8, 2, 5, 7 ] );
                expect( arx.removeDuplicates() ).to.eql( [ 2, 1 ] );

            });

        });

        describe( ".atRandom()", function() {

            it( "should return a single element at random", function() {

                var arr = [ 1, 2, 3 ],
                    arx = arr.atRandom(),
                    type = Object.prototype.toString.call( arx );

                expect( type ).to.be.equal( "[object Number]" );

            });

            it( "should return a list of elements with the given length at random", function() {

                var arr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 52 ],
                    arx = arr.atRandom( 5 ),
                    type = Object.prototype.toString.call( arx );

                expect( arx ).to.have.length( 5 );
                expect( type ).to.be.equal( "[object Array]" );

            });

        });

    });

    describe( "Object", function() {

        describe( ".allKeys()", function() {

            it ( "should get all the keys of an object", function() {

                var obj = {
                    "name": "John Doe",
                    "email": "abc@acme.com"
                };

                var arr = obj.allKeys();
                expect( arr ).to.eql( [ "name", "email" ] );

            });

        });

        describe( ".allValues()", function() {

            it ( "should get all the values of an object", function() {

                var obj = {
                    "name": "John Doe",
                    "email": "abc@acme.com"
                };

                var arr = obj.allValues();
                expect( arr ).to.eql( [ "John Doe", "abc@acme.com" ] );

            });

        });

        describe( ".mapObject()", function() {

            it ( "should get an object of the with processed values", function() {

                var obj = {
                    "age": 1,
                    "newAge": 10
                };

                var arr = obj.mapObject( function( key, val ) {
                    return val * 2;
                });

                expect( arr ).to.eql( { "age": 2, "newAge": 20 } );

            });

        });

        describe( ".extract()", function() {

            it ( "should get an array containing arrays with the key-value pairs", function() {

                var obj = {
                    "age": 1,
                    "newAge": 10
                };

                var arr = obj.extract();

                expect( arr ).to.eql( [ [ "age", 1 ], [ "newAge", 10 ] ] );

            });

        });

        describe( ".invert()", function() {

            it ( "should invert the relation between the key-value pairs", function() {

                var obj = {
                    "age": 1,
                    "newAge": 10
                };

                var arr = obj.invert();

                expect( arr ).to.eql( { 1: "age", 10: "newAge" } );

            });

        });

        describe( ".merge()", function() {

            it ( "should merge with the second object", function() {

                var obj1 = {
                    "foo": "bar"
                };

                var obj2 = {
                    "bar": "foo"
                };

                var arr = obj1.merge( obj2 );

                expect( arr ).to.eql( { "foo": "bar", "bar": "foo" } );

            });

        });

    });

    describe( "Math", function() {

        describe( ".round()", function() {

            it( "should return a 'n' decimal number", function() {

                var a = 3.123912491519541;

                expect( window.math.round( a, 5 ) ).to.equal( 3.12391 );
                expect( window.math.round( a, 6 ) ).to.equal( 3.123912 );
                expect( window.math.round( a, 7 ) ).to.equal( 3.1239125 );
                expect( window.math.round( a, 8 ) ).to.equal( 3.12391249 );

            });

        });

        describe( ".toRadians()", function() {

            it( "should return 2 radians when provided with 114.59 degrees", function() {

                var rad = window.math.toRadians( 114.592 );

                expect( rad ).to.equal( 2 );

            });

            it( "should return 2.0000077 radians when provided with 114.59 degrees and rounded to 8 decimal places", function() {

                var rad = window.math.toRadians( 114.592, 8 );

                expect( rad ).to.equal( 2.0000077 );

            });

        });

        describe( ".toDegrees()", function() {

            it( "should return 114.59 degrees when provided with 2 radians", function() {

                var rad = window.math.toDegrees( 2 );

                expect( rad ).to.equal( 114.59 );

            });

            it( "should return 114.59155903 degrees when provided with 2 radians and rounded to 8 decimal places", function() {

                var rad = window.math.toDegrees( 2, 8 );

                expect( rad ).to.equal( 114.59155903 );

            });

        });

    });

});
