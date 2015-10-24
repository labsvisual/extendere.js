/*
 *      File Name: extendere.array.js
 *      File Description: Contains the extension functions for Arrays.
 *
 *      File Version: 1.0.0
 */

// -----------------------------------------------------------------------


Array.prototype.each = function( callback ) {

    var context = this;

    for( var i = 0; i < context.length; i++ ) {
        callback( context[ i ] );
    }

}


Array.prototype.map = function( filter ) {

    var context = this,
        retVal  = [];

    for( var i = 0; i < context.length; i++ ) {

        var element   = context[ i ],
            filtered  = filter( element );

        retVal.push( filtered );

    }

    return retVal;

}

Array.prototype.sort = function() {

    // https://www.nczonline.net/blog/2012/11/27/computer-science-in-javascript-quicksort/
    var context = this;

    var swap = function( items, firstIndex, secondIndex ){
        var temp = items[ firstIndex ];
        items[ firstIndex ] = items[ secondIndex ];
        items[ secondIndex ] = temp;
    }

    var partition = function( items, left, right ) {

        var pivot   = items[ Math.floor( ( right + left ) / 2 ) ],
            i       = left,
            j       = right;


        while ( i <= j ) {

            while ( items[ i ] < pivot ) {
                i++;
            }

            while ( items[ j ] > pivot ) {
                j--;
            }

            if ( i <= j ) {
                swap( items, i, j );
                i++;
                j--;
            }
        }

        return i;
    }

    var quickSort = function( items, left, right ) {

        var index;

        if (items.length > 1) {

            left = typeof left != "number" ? 0 : left;
            right = typeof right != "number" ? items.length - 1 : right;

            index = partition( items, left, right );

            if ( left < index - 1 ) {
                quickSort( items, left, index - 1 );
            }

            if ( index < right ) {
                quickSort( items, index, right );
            }

        }

        return items;
    }

    return quickSort( context );

}

Array.prototype.indexOf = function( item, isSorted ) {

    var binarySearch = function( array, item ) {

        var left  = 0,
    		right = array.length - 1,
    		mid,
    		element;

    	while( left <= right ) {

    		mid = Math.floor( ( left + right ) / 2, 10 );
    		element = array[ mid ];

    		if ( element < item  ) {

    			left = mid + 1;

    		} else if (element > item ) {

    			right = mid - 1;

    		} else {

    			return mid;

    		}

    	}

    	return -1;

    }

    return ( isSorted ) ? binarySearch( this, item ) : binarySearch( Array.prototype.sort.call( this ), item );

}

Array.prototype.first = function( numberOfElements ) {

    if ( !numberOfElements ){

        return this[ 0 ];

    } else {

        var count = ( numberOfElements == this.length ) ? numberOfElements - 1 : numberOfElements,
            ret   = [];

        for( var i = 0; i < count; i++) {

            ret.push( this[ i ] );

        }

        return ret;

    }

}

Array.prototype.last = function( numberOfElements ) {

    if ( !numberOfElements ){

        return this[ this.length - 1 ];

    } else {

        var count = ( numberOfElements == this.length ) ? numberOfElements - 1 : numberOfElements,
            ret   = [];

        for( var i = this.length - numberOfElements; i < this.length; i++) {

            ret.push( this[ i ] );

        }

        return ret;

    }

}

Array.prototype.flatten = function() {

    var ret = [],
        isArray = function( element ) {
            return Object.prototype.toString.call( element ) === '[object Array]';
        },
        flat = function( element ) {

            for( var i = 0; i < element.length; i++ ) {

                var currentElement = element[ i ];

                if ( isArray( currentElement ) ) {

                    flat( currentElement );

                } else {

                    ret.push( currentElement );

                }

            }

        };

    for( var i = 0; i < this.length; i++ ) {

        var currentElement = this[ i ];
        if ( isArray( currentElement ) ) {

            flat( currentElement );

        } else {
            ret.push( currentElement );
        }

    }

    return ret;

}

Array.prototype.clean = function() {

    var ret = [];
    for( var i = 0; i < this.length; i++ ) {

        var current = this[ i ];
        if ( current === false ||
             current === 0 ||
             current === "" ||
             current === null ||
             current === undefined ||
             isNaN( current ) ) {

             continue;

         } else { ret.push( current ); }

    }

    return ret;

}

Array.prototype.exists = function( element ) {

    return Array.prototype.indexOf.call( this, element ) > -1;

}

Array.prototype.union = function( secondArray ) {

    var ret     = this;

    for( var j = 0; j < arguments.length; j++ ) {

        var arr = arguments[ j ];
        for( var i = 0; i < arr.length; i++ ) {

            var current = arr[ i ];

            if( !ret.exists( current ) ){ ret.push( current ); }

        }

    }

    return ret;

}

Array.prototype.intersect = function( secondArray ) {

    var ret = [];
    for( var i = 0; i < this.length; i++ ) {

         var current = this[ i ];
         for( var j = 0; j < secondArray.length; j++ ) {

             var c = secondArray[ j ];
             if ( c === current ) {

                 ret.push( c );

             }

         }

    }

    return ret;

}

Array.prototype.atRandom = function( length ) {

    var getRandom = function( start, end ) {

        return ( Math.floor( Math.random() * ( start - end + 1 ) + end ) );

    }

    if ( !length ) {

        return this[ getRandom( 0, this.length - 1 ) ];

    } else {

        var ret = [];

        for( var i = 0; i < length; i++ ) {

            ret.push( this[ getRandom( 0, this.length - 1 ) ] );

        }

        return ret;

    }

}
